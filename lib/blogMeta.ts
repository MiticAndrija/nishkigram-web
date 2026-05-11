export const blogCategories = [
  "Novosti",
  "Treninzi",
  "Ishrana",
  "Lifestyle",
  "Događaji",
  "Saveti",
] as const;

export type BlogCategory = (typeof blogCategories)[number];
export const defaultBlogCategories = [...blogCategories];

export function normalizeCategory(value?: string, categories: readonly string[] = blogCategories) {
  const trimmed = value?.trim() ?? "";
  return categories.find((category) => category === trimmed) ?? "";
}

export function normalizeTags(tags?: string[] | string) {
  const rawTags = Array.isArray(tags) ? tags : (tags ?? "").split(",");
  const seen = new Set<string>();
  const normalizedTags: string[] = [];

  for (const tag of rawTags) {
    const normalizedTag = tag.trim().replace(/\s+/g, " ").slice(0, 40);
    const key = normalizedTag.toLowerCase();

    if (normalizedTag && !seen.has(key)) {
      seen.add(key);
      normalizedTags.push(normalizedTag);
    }
  }

  return normalizedTags.slice(0, 12);
}
