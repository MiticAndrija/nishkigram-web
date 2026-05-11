"use client";

import { useMemo, useState } from "react";
import BlogCard from "@/components/BlogCard";
import type { BlogPost } from "@/lib/blog";

type BlogSearchProps = {
  posts: BlogPost[];
  categories: string[];
};

function stripHtml(value: string) {
  return value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function getSearchText(post: BlogPost) {
  return [
    post.title,
    post.excerpt,
    post.author,
    post.category ?? "",
    ...(post.tags ?? []),
    stripHtml(post.contentHtml),
  ]
    .join(" ")
    .toLowerCase();
}

export default function BlogSearch({ posts, categories }: BlogSearchProps) {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const normalizedQuery = query.trim().toLowerCase();

  const searchablePosts = useMemo(
    () =>
      posts.map((post) => ({
        post,
        searchText: getSearchText(post),
      })),
    [posts],
  );

  const filteredPosts = useMemo(() => {
    return searchablePosts
      .filter(({ post, searchText }) => {
        const matchesQuery =
          !normalizedQuery || searchText.includes(normalizedQuery);
        const matchesCategory =
          !selectedCategory || post.category === selectedCategory;

        return matchesQuery && matchesCategory;
      })
      .map(({ post }) => post);
  }, [normalizedQuery, searchablePosts, selectedCategory]);

  return (
    <section className="mt-12">
      <div className="rounded-[1.25rem] border border-[#5c4a3d]/10 bg-[#fdfaf6] p-4 shadow-sm md:p-5">
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setSelectedCategory("")}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                selectedCategory
                  ? "border-[#5c4a3d]/20 text-[#5c4a3d] hover:bg-[#5c4a3d]/8"
                  : "border-[#5c4a3d] bg-[#5c4a3d] text-[#fdfaf6]"
              }`}
            >
              Sve
            </button>
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                  selectedCategory === category
                    ? "border-[#5c4a3d] bg-[#5c4a3d] text-[#fdfaf6]"
                    : "border-[#5c4a3d]/20 text-[#5c4a3d] hover:bg-[#5c4a3d]/8"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <label className="flex-1">
            <span className="sr-only">Pretrazi blog objave</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Pretrazi blog objave..."
              className="w-full rounded-lg border border-[#5c4a3d]/20 bg-[#f4efe6] px-4 py-3 text-[#4a382b] outline-none transition-shadow placeholder:text-[#5c4a3d]/45 focus:ring-4 focus:ring-[#5c4a3d]/15"
            />
          </label>
          <div className="flex items-center justify-between gap-3 md:justify-end">
            <p className="text-sm font-semibold text-[#5c4a3d]/65">
              {filteredPosts.length} / {posts.length} objava
            </p>
            {query ? (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="rounded-lg border border-[#5c4a3d]/25 px-4 py-2 text-sm font-semibold text-[#5c4a3d] transition-colors hover:bg-[#5c4a3d]/8"
              >
                Ocisti
              </button>
            ) : null}
          </div>
          </div>
        </div>
      </div>

      {filteredPosts.length > 0 ? (
        <div className="mt-8 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="mt-8 rounded-[1.5rem] border border-[#5c4a3d]/10 bg-[#fdfaf6] p-10 text-center">
          <h2 className="font-serif text-3xl text-[#4a382b]">
            Nema pronadjenih blog objava.
          </h2>
          <p className="mx-auto mt-4 max-w-xl leading-7 text-[#5c4a3d]/75">
            Probajte drugu rec, autora ili deo teksta koji trazite.
          </p>
        </div>
      )}
    </section>
  );
}
