const allowedTags = new Set([
  "p",
  "h2",
  "h3",
  "strong",
  "em",
  "ul",
  "ol",
  "li",
  "a",
  "img",
  "br",
]);

function cleanUrl(value: string) {
  const trimmed = value.trim();

  if (
    trimmed.startsWith("/") ||
    trimmed.startsWith("#") ||
    trimmed.startsWith("https://") ||
    trimmed.startsWith("http://") ||
    trimmed.startsWith("mailto:")
  ) {
    return trimmed.replace(/"/g, "&quot;");
  }

  return "";
}

function getAttribute(attributes: string, name: string) {
  const pattern = new RegExp(`${name}\\s*=\\s*["']([^"']*)["']`, "i");
  return attributes.match(pattern)?.[1] ?? "";
}

export function sanitizeHtml(input: string) {
  return input
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, "")
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<\/?([a-z0-9]+)([^>]*)>/gi, (match, rawTag, attributes) => {
      const tag = rawTag.toLowerCase();
      const isClosing = match.startsWith("</");

      if (!allowedTags.has(tag)) {
        return "";
      }

      if (isClosing) {
        return tag === "br" || tag === "img" ? "" : `</${tag}>`;
      }

      if (tag === "a") {
        const href = cleanUrl(getAttribute(attributes, "href"));
        return href
          ? `<a href="${href}" target="_blank" rel="noopener noreferrer">`
          : "<a>";
      }

      if (tag === "img") {
        const src = cleanUrl(getAttribute(attributes, "src"));
        const alt = getAttribute(attributes, "alt").replace(/"/g, "&quot;");
        return src ? `<img src="${src}" alt="${alt}" />` : "";
      }

      return tag === "br" ? "<br />" : `<${tag}>`;
    })
    .replace(/\s(on[a-z]+|style|class|id)=["'][^"']*["']/gi, "")
    .replace(/javascript:/gi, "");
}
