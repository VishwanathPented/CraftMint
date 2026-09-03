import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { sampleRequestSchema } from "@/lib/validation";
import { sampleRequestsStore } from "@/lib/store";
import type { SampleRequest } from "@/types";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const parsed = sampleRequestSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid input" }, { status: 400 });
  }

  const record: SampleRequest = {
    id: nanoid(),
    name: parsed.data.name,
    email: parsed.data.email,
    mobile: parsed.data.mobile || "",
    company: parsed.data.company || "",
    projectType: parsed.data.projectType || "",
    projectLocation: parsed.data.projectLocation || "",
    finishSlug: parsed.data.finishSlug || "",
    colourSwatchId: parsed.data.colourSwatchId || "",
    estimatedArea: parsed.data.estimatedArea || "",
    message: parsed.data.message || "",
    timestamp: new Date().toISOString(),
    status: "New",
  };

  await sampleRequestsStore.create(record);

  return NextResponse.json({ ok: true });
}
