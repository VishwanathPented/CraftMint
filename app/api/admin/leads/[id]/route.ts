import { NextRequest, NextResponse } from "next/server";
import { leadsStore } from "@/lib/store";

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json().catch(() => ({}));
  const updated = await leadsStore.update(id, { status: body.status });
  if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(updated);
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await leadsStore.remove(id);
  return NextResponse.json({ ok: true });
}
