import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { getSupabase, UPLOADS_BUCKET } from "@/lib/supabase";

const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/avif"]);
const MAX_SIZE = 10 * 1024 * 1024; // 10MB

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }
  if (!ALLOWED_TYPES.has(file.type)) {
    return NextResponse.json({ error: "Unsupported file type" }, { status: 400 });
  }
  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: "File is too large (max 10MB)" }, { status: 400 });
  }

  const ext = file.type.split("/")[1];
  const filename = `projects/${nanoid()}.${ext}`;

  const supabase = getSupabase();
  const { error } = await supabase.storage.from(UPLOADS_BUCKET).upload(filename, file, {
    contentType: file.type,
    cacheControl: "31536000",
  });
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const { data } = supabase.storage.from(UPLOADS_BUCKET).getPublicUrl(filename);
  return NextResponse.json({ url: data.publicUrl });
}
