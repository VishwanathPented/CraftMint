import { NextRequest, NextResponse } from "next/server";
import { sampleRequestsStore } from "@/lib/store";
import { sendAdminReplyEmail } from "@/lib/email";

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const req = await sampleRequestsStore.find(id);
  if (!req) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const body = await request.json().catch(() => ({}));
  const subject = (body.subject as string | undefined)?.trim();
  const message = (body.message as string | undefined)?.trim();
  if (!subject || !message) {
    return NextResponse.json({ error: "Subject and message are required" }, { status: 400 });
  }

  const result = await sendAdminReplyEmail({ to: req.email, subject, message });
  if (!result.ok) return NextResponse.json({ error: result.error || "Failed to send" }, { status: 502 });
  return NextResponse.json({ ok: true });
}
