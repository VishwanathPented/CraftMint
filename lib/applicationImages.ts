import type { Project } from "@/types";

/**
 * Maps each application category to the real project whose photography best
 * represents it, so e.g. "Commercial" shows an actual commercial-office
 * project rather than a generic finish swatch photo.
 */
const APPLICATION_PROJECT_SLUGS: Record<string, string> = {
  Residential: "apartment-interiors",
  Hospitality: "restaurant-hospitality-interiors",
  Commercial: "commercial-office-fitout",
  Retail: "retail-store-interiors",
  Flooring: "flooring-showcase",
  Exterior: "exterior-facade-finishes",
};

export function getApplicationImage(projects: Project[], title: string, fallback: string): string {
  const slug = APPLICATION_PROJECT_SLUGS[title];
  const project = slug ? projects.find((p) => p.slug === slug && p.published) : undefined;
  return project?.coverImage || fallback;
}
