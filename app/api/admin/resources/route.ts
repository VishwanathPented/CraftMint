import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { resourcesStore } from "@/lib/store";
import type { Resource } from "@/types";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  if (!body?.title) return NextResponse.json({ error: "Title is required" }, { status: 400 });

  const resource: Resource = {
    id: nanoid(),
    title: body.title,
    category: body.category,
    description: body.description ?? "",
    fileType: body.fileType ?? "PDF",
    fileUrl: body.fileUrl ?? "",
    published: Boolean(body.published),
  };
  await resourcesStore.create(resource);
  return NextResponse.json(resource);
}
