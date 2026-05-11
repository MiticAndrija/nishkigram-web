"use client";

import { FormEvent, useMemo, useState } from "react";
import BlogEditor from "@/components/BlogEditor";
import BlogPostContent from "@/components/BlogPostContent";
import type { BlogPost, BlogPostInput } from "@/lib/blog";

type BlogFormProps = {
  post?: BlogPost | null;
  onSaved: () => void;
  onCancelEdit: () => void;
};

const emptyForm: BlogPostInput = {
  title: "",
  slug: "",
  excerpt: "",
  author: "Niškigram",
  coverImage: "/images/nis-hero.png",
  contentHtml: "<p></p>",
  published: false,
};

function postToForm(post?: BlogPost | null): BlogPostInput {
  return post
    ? {
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        author: post.author,
        coverImage: post.coverImage,
        contentHtml: post.contentHtml,
        published: post.published,
      }
    : emptyForm;
}

function slugFromTitle(title: string) {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "dj")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function BlogForm({ post, onSaved, onCancelEdit }: BlogFormProps) {
  const [form, setForm] = useState<BlogPostInput>(() => postToForm(post));
  const [status, setStatus] = useState<"idle" | "saving" | "error">("idle");
  const [error, setError] = useState("");

  const previewDate = useMemo(() => new Date().toISOString(), []);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("saving");
    setError("");

    const endpoint = post ? `/api/admin/blog/${post.id}` : "/api/admin/blog";
    const method = post ? "PUT" : "POST";

    const response = await fetch(endpoint, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (!response.ok) {
      const payload = (await response.json()) as { error?: string };
      setStatus("error");
      setError(payload.error || "Čuvanje nije uspelo.");
      return;
    }

    setStatus("idle");
    setForm(emptyForm);
    onSaved();
  };

  return (
    <form
      onSubmit={submit}
      className="grid gap-7 rounded-[1.5rem] border border-[#5c4a3d]/10 bg-[#f4efe6] p-6 lg:grid-cols-[1.05fr_0.95fr]"
    >
      <div className="grid gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#8b6f56]">
            {post ? "Izmena objave" : "Nova objava"}
          </p>
          <h2 className="mt-2 font-serif text-3xl text-[#4a382b]">
            Blog forma
          </h2>
        </div>

        <label>
          <span className="mb-2 block font-semibold text-[#4a382b]">Naslov</span>
          <input
            value={form.title}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                title: event.target.value,
                slug: current.slug || slugFromTitle(event.target.value),
              }))
            }
            required
            className="w-full rounded-lg border border-[#5c4a3d]/20 bg-[#fdfaf6] px-4 py-3 text-[#4a382b] outline-none focus:ring-4 focus:ring-[#5c4a3d]/15"
          />
        </label>

        <div className="grid gap-4 md:grid-cols-2">
          <label>
            <span className="mb-2 block font-semibold text-[#4a382b]">Slug</span>
            <input
              value={form.slug}
              onChange={(event) =>
                setForm((current) => ({ ...current, slug: event.target.value }))
              }
              className="w-full rounded-lg border border-[#5c4a3d]/20 bg-[#fdfaf6] px-4 py-3 text-[#4a382b] outline-none focus:ring-4 focus:ring-[#5c4a3d]/15"
            />
          </label>
          <label>
            <span className="mb-2 block font-semibold text-[#4a382b]">Autor</span>
            <input
              value={form.author}
              onChange={(event) =>
                setForm((current) => ({ ...current, author: event.target.value }))
              }
              required
              className="w-full rounded-lg border border-[#5c4a3d]/20 bg-[#fdfaf6] px-4 py-3 text-[#4a382b] outline-none focus:ring-4 focus:ring-[#5c4a3d]/15"
            />
          </label>
        </div>

        <label>
          <span className="mb-2 block font-semibold text-[#4a382b]">Excerpt</span>
          <textarea
            value={form.excerpt}
            onChange={(event) =>
              setForm((current) => ({ ...current, excerpt: event.target.value }))
            }
            required
            rows={3}
            className="w-full rounded-lg border border-[#5c4a3d]/20 bg-[#fdfaf6] px-4 py-3 text-[#4a382b] outline-none focus:ring-4 focus:ring-[#5c4a3d]/15"
          />
        </label>

        <label>
          <span className="mb-2 block font-semibold text-[#4a382b]">
            Cover image URL
          </span>
          <input
            value={form.coverImage}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                coverImage: event.target.value,
              }))
            }
            className="w-full rounded-lg border border-[#5c4a3d]/20 bg-[#fdfaf6] px-4 py-3 text-[#4a382b] outline-none focus:ring-4 focus:ring-[#5c4a3d]/15"
          />
        </label>

        <label className="flex items-center gap-3 font-semibold text-[#4a382b]">
          <input
            type="checkbox"
            checked={form.published}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                published: event.target.checked,
              }))
            }
            className="h-5 w-5 accent-[#5c4a3d]"
          />
          Objavljeno
        </label>

        <div>
          <span className="mb-2 block font-semibold text-[#4a382b]">Sadržaj</span>
          <BlogEditor
            value={form.contentHtml}
            onChange={(contentHtml) =>
              setForm((current) => ({ ...current, contentHtml }))
            }
          />
        </div>

        {error ? <p className="font-semibold text-red-700">{error}</p> : null}

        <div className="flex flex-wrap gap-3">
          <button
            type="submit"
            disabled={status === "saving"}
            className="rounded-lg bg-[#5c4a3d] px-6 py-3 font-semibold text-[#fdfaf6] transition-colors hover:bg-[#47382f] disabled:opacity-60"
          >
            {status === "saving" ? "Čuvam..." : post ? "Sačuvaj izmene" : "Kreiraj objavu"}
          </button>
          {post ? (
            <button
              type="button"
              onClick={onCancelEdit}
              className="rounded-lg border border-[#5c4a3d]/25 px-6 py-3 font-semibold text-[#5c4a3d] transition-colors hover:bg-[#5c4a3d]/8"
            >
              Odustani
            </button>
          ) : null}
        </div>
      </div>

      <article className="rounded-[1.25rem] border border-[#5c4a3d]/10 bg-[#fdfaf6] p-6">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#8b6f56]">
          Preview
        </p>
        <h3 className="font-serif text-3xl text-[#4a382b]">
          {form.title || "Naslov objave"}
        </h3>
        <p className="mt-3 text-sm font-semibold text-[#5c4a3d]/65">
          {form.author || "Autor"} /{" "}
          {new Intl.DateTimeFormat("sr-RS").format(new Date(previewDate))}
        </p>
        <p className="mt-5 leading-7 text-[#5c4a3d]/75">
          {form.excerpt || "Kratak opis objave."}
        </p>
        <div className="mt-8 border-t border-[#5c4a3d]/10 pt-6">
          <BlogPostContent html={form.contentHtml} />
        </div>
      </article>
    </form>
  );
}
