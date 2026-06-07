import { defaultBlogCategories } from "@/lib/blogMeta";
import { readJsonFile, writeJsonFile } from "@/lib/github";

const blogCategoriesPath = "data/blog-categories.json";

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

export async function getBlogCategories(forceLive = false) {
  const { data } = await readJsonFile<string[]>(
    blogCategoriesPath,
    defaultBlogCategories,
    forceLive,
  );
  return dedupeCategories(data);
}

export async function addBlogCategory(category: string) {
  const normalizedCategory = normalizeCategoryName(category);

  if (!normalizedCategory) {
    throw new Error("Naziv kategorije je obavezan.");
  }

  const { data: categories, sha } = await readJsonFile<string[]>(
    blogCategoriesPath,
    defaultBlogCategories,
    true,
  );
  const normalizedCategories = dedupeCategories(categories);
  const exists = normalizedCategories.some(
    (existingCategory) =>
      existingCategory.toLowerCase() === normalizedCategory.toLowerCase(),
  );

  if (exists) {
    throw new Error("Kategorija vec postoji.");
  }

  const nextCategories = dedupeCategories([...normalizedCategories, normalizedCategory]);
  await writeJsonFile(
    blogCategoriesPath,
    nextCategories,
    `Add blog category: ${normalizedCategory}`,
    sha,
  );
  return nextCategories;
}

export async function deleteBlogCategory(category: string) {
  const normalizedCategory = normalizeCategoryName(category);
  const { data: categories, sha } = await readJsonFile<string[]>(
    blogCategoriesPath,
    defaultBlogCategories,
    true,
  );
  const normalizedCategories = dedupeCategories(categories);
  const nextCategories = normalizedCategories.filter(
    (existingCategory) =>
      existingCategory.toLowerCase() !== normalizedCategory.toLowerCase(),
  );

  if (nextCategories.length === normalizedCategories.length) {
    throw new Error("Kategorija nije pronadjena.");
  }

  await writeJsonFile(
    blogCategoriesPath,
    nextCategories,
    `Delete blog category: ${normalizedCategory}`,
    sha,
  );
  return nextCategories;
}
