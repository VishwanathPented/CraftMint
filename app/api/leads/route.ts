import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { leadSchema } from "@/lib/validation";
import { leadsStore } from "@/lib/store";
import type { Lead } from "@/types";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const parsed = leadSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid input" }, { status: 400 });
  }

  const lead: Lead = {
    id: nanoid(),
    name: parsed.data.name,
    email: parsed.data.email,
    mobile: parsed.data.mobile || "",
    timestamp: new Date().toISOString(),
    source: parsed.data.source,
    page: parsed.data.page,
    status: "New",
  };

  await leadsStore.create(lead);

  return NextResponse.json({ ok: true });
}
