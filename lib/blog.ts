import { promises as fs } from "node:fs";
import path from "node:path";
import { getBlogCategories } from "@/lib/blogCategories";
import { removeUnusedBlogUploads } from "@/lib/blogUploads";
import { normalizeCategory, normalizeTags } from "@/lib/blogMeta";
import { sanitizeHtml } from "@/lib/sanitizeHtml";

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  author: string;
  category?: string;
  tags?: string[];
  coverImage: string;
  contentHtml: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
};

export type BlogPostInput = {
  title: string;
  slug?: string;
  excerpt: string;
  author: string;
  category?: string;
  tags?: string[];
  coverImage: string;
  contentHtml: string;
  published: boolean;
};

const blogDataPath = path.join(process.cwd(), "data", "blog-posts.json");

async function ensureBlogFile() {
  await fs.mkdir(path.dirname(blogDataPath), { recursive: true });

  try {
    await fs.access(blogDataPath);
  } catch {
    await fs.writeFile(blogDataPath, "[]", "utf8");
  }
}

function sortPosts(posts: BlogPost[]) {
  return [...posts].sort(
    (a, b) =>
      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
  );
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "dj")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function uniqueSlug(baseSlug: string, posts: BlogPost[], ignoredId?: string) {
  const base = baseSlug || "blog-post";
  let candidate = base;
  let index = 2;

  while (
    posts.some((post) => post.slug === candidate && post.id !== ignoredId)
  ) {
    candidate = `${base}-${index}`;
    index += 1;
  }

  return candidate;
}

export async function getAllPosts() {
  await ensureBlogFile();
  const raw = await fs.readFile(blogDataPath, "utf8");
  return sortPosts(JSON.parse(raw) as BlogPost[]);
}

export async function getPublishedPosts() {
  const posts = await getAllPosts();
  return posts.filter((post) => post.published);
}

export async function getPublishedPostBySlug(slug: string) {
  const posts = await getPublishedPosts();
  return posts.find((post) => post.slug === slug) ?? null;
}

export async function getPostById(id: string) {
  const posts = await getAllPosts();
  return posts.find((post) => post.id === id) ?? null;
}

async function writePosts(posts: BlogPost[]) {
  await ensureBlogFile();
  await fs.writeFile(blogDataPath, JSON.stringify(sortPosts(posts), null, 2), "utf8");
}

export async function createPost(input: BlogPostInput) {
  const posts = await getAllPosts();
  const categories = await getBlogCategories();
  const now = new Date().toISOString();
  const slug = uniqueSlug(slugify(input.slug || input.title), posts);

  const post: BlogPost = {
    id: crypto.randomUUID(),
    title: input.title.trim(),
    slug,
    excerpt: input.excerpt.trim(),
    author: input.author.trim(),
    category: normalizeCategory(input.category, categories),
    tags: normalizeTags(input.tags),
    coverImage: input.coverImage.trim() || "/images/nis-hero.png",
    contentHtml: sanitizeHtml(input.contentHtml),
    published: input.published,
    createdAt: now,
    updatedAt: now,
  };

  await writePosts([post, ...posts]);
  return post;
}

export async function updatePost(id: string, input: BlogPostInput) {
  const posts = await getAllPosts();
  const categories = await getBlogCategories();
  const existing = posts.find((post) => post.id === id);

  if (!existing) {
    return null;
  }

  const slug = uniqueSlug(slugify(input.slug || input.title), posts, id);
  const categoryOptions = existing.category
    ? [existing.category, ...categories]
    : categories;
  const updatedPost: BlogPost = {
    ...existing,
    title: input.title.trim(),
    slug,
    excerpt: input.excerpt.trim(),
    author: input.author.trim(),
    category: normalizeCategory(input.category, categoryOptions),
    tags: normalizeTags(input.tags),
    coverImage: input.coverImage.trim() || "/images/nis-hero.png",
    contentHtml: sanitizeHtml(input.contentHtml),
    published: input.published,
    updatedAt: new Date().toISOString(),
  };

  await writePosts(posts.map((post) => (post.id === id ? updatedPost : post)));
  return updatedPost;
}

export async function deletePost(id: string) {
  const posts = await getAllPosts();
  const deletedPost = posts.find((post) => post.id === id);
  const nextPosts = posts.filter((post) => post.id !== id);

  if (nextPosts.length === posts.length) {
    return false;
  }

  await writePosts(nextPosts);

  if (deletedPost) {
    try {
      await removeUnusedBlogUploads(deletedPost, nextPosts);
    } catch (error) {
      console.warn("Blog post deleted, but uploaded image cleanup failed.", error);
    }
  }

  return true;
}
