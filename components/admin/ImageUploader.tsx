"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

async function uploadFile(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error ?? "Upload failed");
  }
  const data = await res.json();
  return data.url as string;
}

export function SingleImageUploader({
  value,
  onChange,
  label,
}: {
  value: string;
  onChange: (url: string) => void;
  label: string;
}) {
  const [dragOver, setDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFiles(files: FileList | null) {
    const file = files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadFile(file);
      onChange(url);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <p className="font-sans text-xs uppercase tracking-[0.08em] text-warm-grey">{label}</p>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          handleFiles(e.dataTransfer.files);
        }}
        onClick={() => inputRef.current?.click()}
        className={cn(
          "relative mt-2 flex aspect-video w-full cursor-pointer items-center justify-center overflow-hidden border-2 border-dashed transition-colors",
          dragOver ? "border-charcoal bg-limestone" : "border-line hover:border-stone",
        )}
      >
        {value ? (
          <Image quality={95} src={value} alt="" fill sizes="400px" className="object-cover" />
        ) : (
          <p className="font-sans text-xs text-warm-grey">{uploading ? "Uploading…" : "Drop an image or click to upload"}</p>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp,image/avif"
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>
    </div>
  );
}

export function MultiImageUploader({
  values,
  onChange,
  label,
}: {
  values: string[];
  onChange: (urls: string[]) => void;
  label: string;
}) {
  const [dragOver, setDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setUploading(true);
    try {
      const urls = await Promise.all(Array.from(files).map(uploadFile));
      onChange([...values, ...urls]);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <p className="font-sans text-xs uppercase tracking-[0.08em] text-warm-grey">{label}</p>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          handleFiles(e.dataTransfer.files);
        }}
        onClick={() => inputRef.current?.click()}
        className={cn(
          "mt-2 flex min-h-24 w-full cursor-pointer items-center justify-center border-2 border-dashed p-4 transition-colors",
          dragOver ? "border-charcoal bg-limestone" : "border-line hover:border-stone",
        )}
      >
        <p className="font-sans text-xs text-warm-grey">{uploading ? "Uploading…" : "Drop images or click to upload multiple"}</p>
        <input
          ref={inputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp,image/avif"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>
      {values.length > 0 && (
        <div className="mt-3 grid grid-cols-4 gap-2">
          {values.map((url, i) => (
            <div key={url} className="group relative aspect-square overflow-hidden bg-limestone">
              <Image quality={95} src={url} alt="" fill sizes="100px" className="object-cover" />
              <button
                type="button"
                onClick={() => onChange(values.filter((_, idx) => idx !== i))}
                className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center bg-charcoal/80 text-[10px] text-ivory opacity-0 transition-opacity group-hover:opacity-100"
                aria-label="Remove image"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
