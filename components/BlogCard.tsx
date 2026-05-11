import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/lib/blog";

function formatDate(value: string) {
  return new Intl.DateTimeFormat("sr-RS", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group overflow-hidden rounded-[1.5rem] border border-[#5c4a3d]/10 bg-[#fdfaf6] shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative h-64 bg-[#e8e0d5]">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          sizes="(min-width: 768px) 33vw, 100vw"
          className="object-cover object-bottom transition-transform duration-500 group-hover:scale-105"
          unoptimized={post.coverImage.startsWith("/images/")}
        />
      </div>
      <div className="p-7">
        <div className="mb-4 flex flex-wrap items-center gap-3 text-sm font-semibold text-[#5c4a3d]/65">
          <span>{post.author}</span>
          <span aria-hidden="true">/</span>
          <time dateTime={post.createdAt}>{formatDate(post.createdAt)}</time>
        </div>
        <h2 className="font-serif text-3xl leading-tight text-[#4a382b]">
          {post.title}
        </h2>
        <p className="mt-4 leading-7 text-[#5c4a3d]/75">{post.excerpt}</p>
      </div>
    </Link>
  );
}
