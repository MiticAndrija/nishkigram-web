import { sanitizeHtml } from "@/lib/sanitizeHtml";

export default function BlogPostContent({ html }: { html: string }) {
  return (
    <div
      className="blog-post-content mx-auto max-w-3xl text-lg leading-9 text-[#4a382b]"
      dangerouslySetInnerHTML={{ __html: sanitizeHtml(html) }}
    />
  );
}
