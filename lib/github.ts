import { promises as fs } from "node:fs";
import path from "node:path";

async function fetchFileFromGitHub(filePath: string) {
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO;
  const branch = process.env.GITHUB_BRANCH || "main";

  if (!token || !repo) {
    throw new Error("Missing GITHUB_TOKEN or GITHUB_REPO env variables.");
  }

  const url = `https://api.github.com/repos/${repo}/contents/${filePath}?ref=${branch}`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "Niskigram-Web",
    },
    next: { revalidate: 0 },
  } as any);

  if (!response.ok) {
    if (response.status === 404) {
      return { content: "", sha: null };
    }
    throw new Error(`Failed to fetch ${filePath} from GitHub: ${response.statusText}`);
  }

  const data = await response.json();
  const content = Buffer.from(data.content, "base64").toString("utf8");
  return { content, sha: data.sha };
}

async function updateFileInGitHub(
  filePath: string,
  content: string,
  message: string,
  sha: string | null,
) {
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO;
  const branch = process.env.GITHUB_BRANCH || "main";

  if (!token || !repo) {
    throw new Error("Missing GITHUB_TOKEN or GITHUB_REPO env variables.");
  }

  const url = `https://api.github.com/repos/${repo}/contents/${filePath}`;
  const body: any = {
    message,
    content: Buffer.from(content, "utf8").toString("base64"),
    branch,
  };

  if (sha) {
    body.sha = sha;
  }

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github.v3+json",
      "Content-Type": "application/json",
      "User-Agent": "Niskigram-Web",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(
      `Failed to update ${filePath} in GitHub: ${err.message || response.statusText}`,
    );
  }
}

export async function readJsonFile<T>(
  relativePath: string,
  defaultValue: T,
  forceLive: boolean = false,
): Promise<{ data: T; sha: string | null }> {
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO;

  if (forceLive && token && repo) {
    try {
      const { content, sha } = await fetchFileFromGitHub(relativePath);
      if (!content) {
        return { data: defaultValue, sha: null };
      }
      return { data: JSON.parse(content) as T, sha };
    } catch (error) {
      console.error(`Error reading ${relativePath} live from GitHub:`, error);
    }
  }

  const localPath = path.join(/*turbopackIgnore: true*/ process.cwd(), relativePath);
  try {
    const raw = await fs.readFile(localPath, "utf8");
    return { data: JSON.parse(raw) as T, sha: null };
  } catch {
    return { data: defaultValue, sha: null };
  }
}

export async function writeJsonFile<T>(
  relativePath: string,
  data: T,
  commitMessage: string,
  sha: string | null = null,
): Promise<void> {
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO;
  const contentString = JSON.stringify(data, null, 2);

  if (token && repo) {
    let currentSha = sha;
    if (!currentSha) {
      try {
        const fileInfo = await fetchFileFromGitHub(relativePath);
        currentSha = fileInfo.sha;
      } catch {
        currentSha = null;
      }
    }
    await updateFileInGitHub(relativePath, contentString, commitMessage, currentSha);
    return;
  }

  const localPath = path.join(/*turbopackIgnore: true*/ process.cwd(), relativePath);
  await fs.mkdir(path.dirname(localPath), { recursive: true });
  await fs.writeFile(localPath, contentString, "utf8");
}
