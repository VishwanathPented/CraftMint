import type { MetadataRoute } from "next";
import { finishes } from "@/data/finishes";
import { projectsStore, articlesStore } from "@/lib/store";

const BASE_URL = "https://www.craftmint.in";

const staticRoutes = [
  "",
  "/finishes",
  "/projects",
  "/applications",
  "/process",
  "/about",
  "/cameleo",
  "/bespoke",
  "/resources",
  "/journal",
  "/inspiration",
  "/sample-request",
  "/contact",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projects, articles] = await Promise.all([projectsStore.all(), articlesStore.all()]);
  const publishedProjects = projects.filter((p) => p.published);
  const publishedArticles = articles.filter((a) => a.published);

  return [
    ...staticRoutes.map((route) => ({
      url: `${BASE_URL}${route}`,
      lastModified: new Date(),
    })),
    ...finishes.map((f) => ({
      url: `${BASE_URL}/finishes/${f.slug}`,
      lastModified: new Date(),
    })),
    ...publishedProjects.map((p) => ({
      url: `${BASE_URL}/projects/${p.slug}`,
      lastModified: p.updatedAt,
    })),
    ...publishedArticles.map((a) => ({
      url: `${BASE_URL}/journal/${a.slug}`,
      lastModified: a.createdAt,
    })),
  ];
}
