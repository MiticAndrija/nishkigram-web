import { readJsonFile, writeJsonFile } from "@/lib/github";

const recommendationCategoriesPath = "data/recommendation-categories.json";

export const defaultRecommendationCategories = [
  "Kafici",
  "Restorani",
  "Barovi",
  "Lepota & Wellness",
  "Aktivnosti",
  "Kupovina",
];

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

export async function getRecommendationCategories(forceLive = false) {
  const { data } = await readJsonFile<string[]>(
    recommendationCategoriesPath,
    defaultRecommendationCategories,
    forceLive,
  );
  return dedupeCategories(data);
}

export async function addRecommendationCategory(category: string) {
  const normalizedCategory = normalizeCategoryName(category);

  if (!normalizedCategory) {
    throw new Error("Naziv kategorije je obavezan.");
  }

  const { data: categories, sha } = await readJsonFile<string[]>(
    recommendationCategoriesPath,
    defaultRecommendationCategories,
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

  const nextCategories = dedupeCategories([
    ...normalizedCategories,
    normalizedCategory,
  ]);
  await writeJsonFile(
    recommendationCategoriesPath,
    nextCategories,
    `Add recommendation category: ${normalizedCategory}`,
    sha,
  );
  return nextCategories;
}

export async function updateRecommendationCategory(
  currentCategory: string,
  nextCategory: string,
) {
  const normalizedCurrentCategory = normalizeCategoryName(currentCategory);
  const normalizedNextCategory = normalizeCategoryName(nextCategory);

  if (!normalizedCurrentCategory || !normalizedNextCategory) {
    throw new Error("Naziv kategorije je obavezan.");
  }

  const { data: categories, sha } = await readJsonFile<string[]>(
    recommendationCategoriesPath,
    defaultRecommendationCategories,
    true,
  );
  const normalizedCategories = dedupeCategories(categories);
  const currentIndex = normalizedCategories.findIndex(
    (category) =>
      category.toLowerCase() === normalizedCurrentCategory.toLowerCase(),
  );

  if (currentIndex === -1) {
    throw new Error("Kategorija nije pronadjena.");
  }

  const duplicate = normalizedCategories.some(
    (category, index) =>
      index !== currentIndex &&
      category.toLowerCase() === normalizedNextCategory.toLowerCase(),
  );

  if (duplicate) {
    throw new Error("Kategorija vec postoji.");
  }

  const nextCategories = [...normalizedCategories];
  nextCategories[currentIndex] = normalizedNextCategory;

  await writeJsonFile(
    recommendationCategoriesPath,
    nextCategories,
    `Update recommendation category: ${normalizedCurrentCategory}`,
    sha,
  );
  return nextCategories;
}

export async function deleteRecommendationCategory(category: string) {
  const normalizedCategory = normalizeCategoryName(category);
  const { data: categories, sha } = await readJsonFile<string[]>(
    recommendationCategoriesPath,
    defaultRecommendationCategories,
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
    recommendationCategoriesPath,
    nextCategories,
    `Delete recommendation category: ${normalizedCategory}`,
    sha,
  );
  return nextCategories;
}
