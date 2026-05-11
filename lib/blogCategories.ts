import { promises as fs } from "node:fs";
import path from "node:path";
import { defaultBlogCategories } from "@/lib/blogMeta";

const blogCategoriesPath = path.join(process.cwd(), "data", "blog-categories.json");

function normalizeCategoryName(value: string) {
  return value.trim().replace(/\s+/g, " ").slice(0, 40);
}

function dedupeCategories(categories: string[]) {
  const seen = new Set<string>();
  const normalizedCategories: string[] = [];

  for (const category of categories) {
    const normalizedCategory = normalizeCategoryName(category);
    const key = normalizedCategory.toLowerCase();

    if (normalizedCategory && !seen.has(key)) {
      seen.add(key);
      normalizedCategories.push(normalizedCategory);
    }
  }

  return normalizedCategories;
}

async function ensureBlogCategoriesFile() {
  await fs.mkdir(path.dirname(blogCategoriesPath), { recursive: true });

  try {
    await fs.access(blogCategoriesPath);
  } catch {
    await fs.writeFile(
      blogCategoriesPath,
      JSON.stringify(defaultBlogCategories, null, 2),
      "utf8",
    );
  }
}

async function writeBlogCategories(categories: string[]) {
  await ensureBlogCategoriesFile();
  await fs.writeFile(
    blogCategoriesPath,
    JSON.stringify(dedupeCategories(categories), null, 2),
    "utf8",
  );
}

export async function getBlogCategories() {
  await ensureBlogCategoriesFile();
  const raw = await fs.readFile(blogCategoriesPath, "utf8");
  return dedupeCategories(JSON.parse(raw) as string[]);
}

export async function addBlogCategory(category: string) {
  const normalizedCategory = normalizeCategoryName(category);

  if (!normalizedCategory) {
    throw new Error("Naziv kategorije je obavezan.");
  }

  const categories = await getBlogCategories();
  const exists = categories.some(
    (existingCategory) =>
      existingCategory.toLowerCase() === normalizedCategory.toLowerCase(),
  );

  if (exists) {
    throw new Error("Kategorija vec postoji.");
  }

  const nextCategories = [...categories, normalizedCategory];
  await writeBlogCategories(nextCategories);
  return nextCategories;
}

export async function deleteBlogCategory(category: string) {
  const normalizedCategory = normalizeCategoryName(category);
  const categories = await getBlogCategories();
  const nextCategories = categories.filter(
    (existingCategory) =>
      existingCategory.toLowerCase() !== normalizedCategory.toLowerCase(),
  );

  if (nextCategories.length === categories.length) {
    throw new Error("Kategorija nije pronadjena.");
  }

  await writeBlogCategories(nextCategories);
  return nextCategories;
}
