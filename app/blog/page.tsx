import Link from "next/link";
import BlogCard from "@/components/BlogCard";
import Navbar from "@/components/Navbar";
import { getPublishedPosts } from "@/lib/blog";

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const posts = await getPublishedPosts();

  return (
    <div className="min-h-screen bg-[#f4efe6] font-sans selection:bg-[#5c4a3d]/20">
      <Navbar />
      <main className="pt-24">
        <section className="px-6 pb-16 pt-16 md:px-10 md:pb-24">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
              <div className="max-w-3xl">
                <p className="mb-5 text-sm font-semibold uppercase tracking-[0.24em] text-[#8b6f56]">
                  Niškigram blog
                </p>
                <h1 className="font-serif text-5xl leading-tight text-[#4a382b] md:text-7xl">
                  Priče, vodiči i događaji iz Niša.
                </h1>
                <p className="mt-8 max-w-2xl text-xl leading-9 text-[#5c4a3d]/80">
                  Pregled objavljenih tekstova sa lokalnim preporukama,
                  razgovorima i gradskim vodičima.
                </p>
              </div>
              <Link
                href="/admin/blog"
                className="inline-flex w-fit items-center justify-center rounded-lg border border-[#5c4a3d]/25 px-6 py-3 font-semibold text-[#5c4a3d] transition-colors hover:bg-[#5c4a3d]/8"
              >
                Admin editor
              </Link>
            </div>

            {posts.length > 0 ? (
              <div className="mt-12 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="mt-12 rounded-[1.5rem] border border-[#5c4a3d]/10 bg-[#fdfaf6] p-10 text-center">
                <h2 className="font-serif text-3xl text-[#4a382b]">
                  Još nema objavljenih tekstova.
                </h2>
                <p className="mx-auto mt-4 max-w-xl leading-7 text-[#5c4a3d]/75">
                  Kada admin objavi prvi blog post, pojaviće se ovde kao javna
                  kartica sa slikom, autorom i datumom.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
