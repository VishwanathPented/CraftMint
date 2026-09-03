import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { projectsStore } from "@/lib/store";
import { slugify } from "@/lib/utils";
import type { Project } from "@/types";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  if (!body?.title) {
    return NextResponse.json({ error: "Title is required" }, { status: 400 });
  }

  const now = new Date().toISOString();
  const project: Project = {
    id: nanoid(),
    slug: body.slug ? slugify(body.slug) : slugify(body.title),
    title: body.title,
    location: body.location ?? "",
    city: body.city ?? "",
    state: body.state ?? "",
    country: body.country ?? "India",
    projectType: body.projectType ?? [],
    year: body.year ? Number(body.year) : null,
    architect: body.architect ?? "",
    designer: body.designer ?? "",
    client: body.client ?? "",
    description: body.description ?? "",
    challenge: body.challenge ?? "",
    approach: body.approach ?? "",
    solution: body.solution ?? "",
    finishSlugs: body.finishSlugs ?? [],
    productsUsed: body.productsUsed ?? "",
    colour: body.colour ?? "",
    area: body.area ?? "",
    coverImage: body.coverImage ?? "",
    galleryImages: body.galleryImages ?? [],
    detailImages: body.detailImages ?? [],
    beforeAfterImages: body.beforeAfterImages ?? [],
    videoUrl: body.videoUrl ?? "",
    featured: Boolean(body.featured),
    published: Boolean(body.published),
    createdAt: now,
    updatedAt: now,
  };

  await projectsStore.create(project);
  return NextResponse.json(project);
}
