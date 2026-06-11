export const defaultCoverImage = "/images/nis-hero.png";

type ImageFields = {
  coverImage?: string;
  imageUrl?: string;
  image?: string;
};

export function getContentImageUrl(item: ImageFields) {
  return (
    item.coverImage?.trim() ||
    item.imageUrl?.trim() ||
    item.image?.trim() ||
    defaultCoverImage
  );
}

export function shouldUseUnoptimizedImage(src: string) {
  return src.startsWith("/images/") || src.startsWith("/uploads/blog/");
}
