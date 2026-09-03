import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { articlesStore } from "@/lib/store";
import { slugify } from "@/lib/utils";
import type { Article } from "@/types";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  if (!body?.title) return NextResponse.json({ error: "Title is required" }, { status: 400 });

  const article: Article = {
    id: nanoid(),
    slug: body.slug ? slugify(body.slug) : slugify(body.title),
    title: body.title,
    topic: body.topic ?? "",
    excerpt: body.excerpt ?? "",
    coverImage: body.coverImage ?? "",
    body: body.body ?? "",
    published: Boolean(body.published),
    createdAt: new Date().toISOString(),
  };
  await articlesStore.create(article);
  return NextResponse.json(article);
}
