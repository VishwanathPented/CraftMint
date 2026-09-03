import { NextRequest, NextResponse } from "next/server";
import { articlesStore } from "@/lib/store";
import { slugify } from "@/lib/utils";

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json().catch(() => ({}));
  if (body.slug) body.slug = slugify(body.slug);
  const updated = await articlesStore.update(id, body);
  if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(updated);
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await articlesStore.remove(id);
  return NextResponse.json({ ok: true });
}
