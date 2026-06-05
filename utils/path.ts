/**
 * Prefixes a path with the base path if in production.
 * This is required for Next.js static exports on GitHub Pages because Next.js
 * does not automatically prepend basePath to string-based image sources.
 */
export function getAssetPath(src: string): string {
  if (!src) return "";
  if (src.startsWith("http://") || src.startsWith("https://") || src.startsWith("//")) {
    return src;
  }
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  // Ensure we don't double slash
  const cleanSrc = src.startsWith("/") ? src : `/${src}`;
  return `${basePath}${cleanSrc}`;
}
