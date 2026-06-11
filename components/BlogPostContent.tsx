import { sanitizeHtml } from "@/lib/sanitizeHtml";

export default function BlogPostContent({ html }: { html: string }) {
  return (
    <div
      className="blog-post-content mx-auto max-w-3xl text-lg leading-9 text-[#4a382b] [&_iframe]:my-8 [&_iframe]:aspect-video [&_iframe]:h-auto [&_iframe]:w-full [&_iframe]:rounded-2xl"
      dangerouslySetInnerHTML={{ __html: sanitizeHtml(html) }}
    />
  );
}
