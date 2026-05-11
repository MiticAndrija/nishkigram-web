"use client";

import { useState } from "react";
import BlogForm from "@/components/BlogForm";
import type { BlogPost } from "@/lib/blog";

type AdminBlogManagerProps = {
  initialPosts: BlogPost[];
};

export default function AdminBlogManager({ initialPosts }: AdminBlogManagerProps) {
  const [posts, setPosts] = useState(initialPosts);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const refreshPosts = async () => {
    setIsLoading(true);
    setError("");

    const response = await fetch("/api/admin/blog");

    if (!response.ok) {
      setError("Ne mogu da učitam objave.");
      setIsLoading(false);
      return;
    }

    const payload = (await response.json()) as { posts: BlogPost[] };
    setPosts(payload.posts);
    setEditingPost(null);
    setIsLoading(false);
  };

  const deletePost = async (id: string) => {
    if (!window.confirm("Da li sigurno brišete ovu objavu?")) {
      return;
    }

    const response = await fetch(`/api/admin/blog/${id}`, { method: "DELETE" });

    if (!response.ok) {
      setError("Brisanje nije uspelo.");
      return;
    }

    await refreshPosts();
  };

  const togglePublished = async (post: BlogPost) => {
    const response = await fetch(`/api/admin/blog/${post.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...post, published: !post.published }),
    });

    if (!response.ok) {
      setError("Promena statusa nije uspela.");
      return;
    }

    await refreshPosts();
  };

  return (
    <div className="grid gap-10">
      <BlogForm
        key={editingPost?.id ?? "new-post"}
        post={editingPost}
        onSaved={refreshPosts}
        onCancelEdit={() => setEditingPost(null)}
      />

      <section className="rounded-[1.5rem] border border-[#5c4a3d]/10 bg-[#fdfaf6] p-6">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#8b6f56]">
              Upravljanje
            </p>
            <h2 className="mt-2 font-serif text-3xl text-[#4a382b]">
              Sve objave
            </h2>
          </div>
          <form action="/api/admin/logout" method="post">
            <button className="rounded-lg border border-[#5c4a3d]/25 px-5 py-3 font-semibold text-[#5c4a3d] transition-colors hover:bg-[#5c4a3d]/8">
              Odjavi se
            </button>
          </form>
        </div>

        {isLoading ? (
          <p className="mt-6 rounded-lg bg-[#f4efe6] p-4 text-[#5c4a3d]/75">
            Učitavam objave...
          </p>
        ) : null}
        {error ? <p className="mt-6 font-semibold text-red-700">{error}</p> : null}

        <div className="mt-6 grid gap-4">
          {posts.length > 0 ? (
            posts.map((post) => (
              <article
                key={post.id}
                className="grid gap-4 rounded-[1rem] border border-[#5c4a3d]/10 bg-[#f4efe6] p-5 md:grid-cols-[1fr_auto]"
              >
                <div>
                  <div className="mb-2 flex flex-wrap gap-3 text-sm font-semibold text-[#5c4a3d]/65">
                    <span>{post.published ? "Objavljeno" : "Draft"}</span>
                    <span>/</span>
                    <span>{post.slug}</span>
                  </div>
                  <h3 className="font-serif text-2xl text-[#4a382b]">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-[#5c4a3d]/75">{post.excerpt}</p>
                </div>
                <div className="flex flex-wrap items-start gap-2 md:justify-end">
                  <button
                    type="button"
                    onClick={() => setEditingPost(post)}
                    className="rounded-md bg-[#5c4a3d] px-4 py-2 text-sm font-semibold text-[#fdfaf6]"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => togglePublished(post)}
                    className="rounded-md border border-[#5c4a3d]/25 px-4 py-2 text-sm font-semibold text-[#5c4a3d]"
                  >
                    {post.published ? "Unpublish" : "Publish"}
                  </button>
                  <button
                    type="button"
                    onClick={() => deletePost(post.id)}
                    className="rounded-md border border-red-900/20 px-4 py-2 text-sm font-semibold text-red-800"
                  >
                    Delete
                  </button>
                </div>
              </article>
            ))
          ) : (
            <p className="rounded-lg bg-[#f4efe6] p-5 text-[#5c4a3d]/75">
              Nema objava. Kreirajte prvu objavu kroz formu iznad.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
