export const SITE_URL = "https://www.craftmint.in";

export function absoluteUrl(path: string) {
  return path.startsWith("http") ? path : `${SITE_URL}${path}`;
}
