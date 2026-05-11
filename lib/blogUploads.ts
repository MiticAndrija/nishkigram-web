import { promises as fs } from "node:fs";
import path from "node:path";

type UploadedImageReference = {
  coverImage?: string;
  contentHtml?: string;
};

const uploadPublicPath = "/uploads/blog/";
const uploadDirectory = path.join(process.cwd(), "public", "uploads", "blog");
const maxUploadSizeBytes = 5 * 1024 * 1024;

const mimeExtensions = new Map([
  ["image/jpeg", "jpg"],
  ["image/png", "png"],
  ["image/webp", "webp"],
]);

const allowedExtensions = new Set(["jpg", "jpeg", "png", "webp"]);

export const blogImageUploadConfig = {
  maxUploadSizeBytes,
  uploadPublicPath,
  accept: ".jpg,.jpeg,.png,.webp",
};

function sanitizeBaseName(filename: string) {
  const parsed = path.parse(filename);
  const safeBase = parsed.name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);

  return safeBase || "blog-image";
}

function getOriginalExtension(filename: string) {
  return path.extname(filename).replace(".", "").toLowerCase();
}

function getSafeUploadPath(filename: string) {
  const targetPath = path.resolve(uploadDirectory, filename);
  const uploadRoot = path.resolve(uploadDirectory);

  if (!targetPath.startsWith(`${uploadRoot}${path.sep}`)) {
    throw new Error("Invalid upload path.");
  }

  return targetPath;
}

function getUploadFilenameFromUrl(imageUrl: string) {
  if (!imageUrl.startsWith(uploadPublicPath)) {
    return null;
  }

  const filename = decodeURIComponent(imageUrl.slice(uploadPublicPath.length));

  if (!filename || filename.includes("/") || filename.includes("\\")) {
    return null;
  }

  return filename;
}

export function validateBlogImageUpload(file: File) {
  const mimeExtension = mimeExtensions.get(file.type);
  const originalExtension = getOriginalExtension(file.name);

  if (!mimeExtension || !allowedExtensions.has(originalExtension)) {
    return "Podrzani formati su JPG, JPEG, PNG i WEBP.";
  }

  if (file.size <= 0) {
    return "Fajl je prazan.";
  }

  if (file.size > maxUploadSizeBytes) {
    return "Slika moze biti velika najvise 5 MB.";
  }

  return "";
}

export async function saveBlogImageUpload(file: File) {
  const validationError = validateBlogImageUpload(file);

  if (validationError) {
    throw new Error(validationError);
  }

  await fs.mkdir(uploadDirectory, { recursive: true });

  const extension = mimeExtensions.get(file.type) || "jpg";
  const safeBaseName = sanitizeBaseName(file.name);
  const filename = `${Date.now()}-${crypto.randomUUID()}-${safeBaseName}.${extension}`;
  const targetPath = getSafeUploadPath(filename);
  const buffer = Buffer.from(await file.arrayBuffer());

  await fs.writeFile(targetPath, buffer);

  return {
    url: `${uploadPublicPath}${filename}`,
    filename,
    size: file.size,
  };
}

function extractBlogUploadUrlsFromHtml(html = "") {
  const urls = new Set<string>();
  const imageSrcPattern = /<img\b[^>]*\bsrc=["']([^"']+)["'][^>]*>/gi;
  let match: RegExpExecArray | null;

  while ((match = imageSrcPattern.exec(html))) {
    const src = match[1];

    if (src.startsWith(uploadPublicPath)) {
      urls.add(src);
    }
  }

  return urls;
}

export function getBlogUploadUrls(reference: UploadedImageReference) {
  const urls = extractBlogUploadUrlsFromHtml(reference.contentHtml);

  if (reference.coverImage?.startsWith(uploadPublicPath)) {
    urls.add(reference.coverImage);
  }

  return urls;
}

export async function removeUploadedBlogImage(imageUrl: string) {
  const filename = getUploadFilenameFromUrl(imageUrl);

  if (!filename) {
    return false;
  }

  try {
    await fs.unlink(getSafeUploadPath(filename));
    return true;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return false;
    }

    throw error;
  }
}

export async function removeUnusedBlogUploads(
  removedReference: UploadedImageReference,
  remainingReferences: UploadedImageReference[],
) {
  const candidates = getBlogUploadUrls(removedReference);
  const stillUsed = new Set<string>();

  for (const reference of remainingReferences) {
    for (const imageUrl of getBlogUploadUrls(reference)) {
      stillUsed.add(imageUrl);
    }
  }

  await Promise.all(
    [...candidates]
      .filter((imageUrl) => !stillUsed.has(imageUrl))
      .map((imageUrl) => removeUploadedBlogImage(imageUrl)),
  );
}
