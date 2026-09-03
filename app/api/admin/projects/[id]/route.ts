import { NextRequest, NextResponse } from "next/server";
import { projectsStore } from "@/lib/store";
import { slugify } from "@/lib/utils";

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json().catch(() => ({}));

  const patch = { ...body, updatedAt: new Date().toISOString() };
  if (patch.slug) patch.slug = slugify(patch.slug);
  if (patch.year !== undefined) patch.year = patch.year ? Number(patch.year) : null;

  const updated = await projectsStore.update(id, patch);
  if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(updated);
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await projectsStore.remove(id);
  return NextResponse.json({ ok: true });
}
