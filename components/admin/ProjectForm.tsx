"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { nanoid } from "nanoid";
import { Button } from "@/components/ui/Button";
import { SingleImageUploader, MultiImageUploader } from "@/components/admin/ImageUploader";
import { finishes } from "@/data/finishes";
import type { Project, ProjectType } from "@/types";

const PROJECT_TYPES: ProjectType[] = [
  "Residential",
  "Hospitality",
  "Restaurant",
  "Retail",
  "Office",
  "Commercial",
  "Villa",
  "Apartment",
  "Flooring",
  "Exterior",
];

type FormState = Partial<Project>;

export function ProjectForm({ project }: { project?: Project }) {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(
    project ?? {
      title: "",
      slug: "",
      location: "",
      city: "",
      state: "",
      country: "India",
      projectType: [],
      year: null,
      architect: "",
      designer: "",
      client: "",
      description: "",
      challenge: "",
      approach: "",
      solution: "",
      finishSlugs: [],
      productsUsed: "",
      colour: "",
      area: "",
      coverImage: "",
      galleryImages: [],
      detailImages: [],
      beforeAfterImages: [],
      videoUrl: "",
      featured: false,
      published: false,
    },
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function toggleType(type: ProjectType) {
    const current = form.projectType ?? [];
    set("projectType", current.includes(type) ? current.filter((t) => t !== type) : [...current, type]);
  }

  function toggleFinish(slug: string) {
    const current = form.finishSlugs ?? [];
    set("finishSlugs", current.includes(slug) ? current.filter((s) => s !== slug) : [...current, slug]);
  }

  async function save(publishState: boolean) {
    setSaving(true);
    setError(null);
    const payload = { ...form, published: publishState };

    try {
      const res = project
        ? await fetch(`/api/admin/projects/${project.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          })
        : await fetch("/api/admin/projects", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Something went wrong");
      }
      router.push("/admin/projects");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSaving(false);
    }
  }

  const inputClass = "focus-ring mt-1.5 w-full border-b border-line bg-transparent py-2 font-sans text-sm text-charcoal focus:border-charcoal";
  const labelClass = "font-sans text-xs uppercase tracking-[0.08em] text-warm-grey";
  const textareaClass = `${inputClass} resize-none`;

  return (
    <div className="flex flex-col gap-10">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Project title</label>
          <input value={form.title ?? ""} onChange={(e) => set("title", e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Slug</label>
          <input value={form.slug ?? ""} onChange={(e) => set("slug", e.target.value)} placeholder="auto-generated from title if blank" className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Location</label>
          <input value={form.location ?? ""} onChange={(e) => set("location", e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>City</label>
          <input value={form.city ?? ""} onChange={(e) => set("city", e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>State</label>
          <input value={form.state ?? ""} onChange={(e) => set("state", e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Country</label>
          <input value={form.country ?? ""} onChange={(e) => set("country", e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Year</label>
          <input type="number" value={form.year ?? ""} onChange={(e) => set("year", e.target.value ? Number(e.target.value) : null)} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Area</label>
          <input value={form.area ?? ""} onChange={(e) => set("area", e.target.value)} placeholder="e.g. 2,400 sq. ft." className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Architect</label>
          <input value={form.architect ?? ""} onChange={(e) => set("architect", e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Designer</label>
          <input value={form.designer ?? ""} onChange={(e) => set("designer", e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Client</label>
          <input value={form.client ?? ""} onChange={(e) => set("client", e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Colour</label>
          <input value={form.colour ?? ""} onChange={(e) => set("colour", e.target.value)} className={inputClass} />
        </div>
        <div className="sm:col-span-2">
          <label className={labelClass}>Products / finishes used (free text)</label>
          <input value={form.productsUsed ?? ""} onChange={(e) => set("productsUsed", e.target.value)} className={inputClass} />
        </div>
        <div className="sm:col-span-2">
          <label className={labelClass}>Video URL (optional)</label>
          <input
            value={form.videoUrl ?? ""}
            onChange={(e) => set("videoUrl", e.target.value)}
            placeholder="YouTube link showing the application process, e.g. https://youtube.com/watch?v=..."
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <p className={labelClass}>Project type</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {PROJECT_TYPES.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => toggleType(type)}
              className={`border px-3 py-1.5 font-sans text-xs transition-colors ${
                form.projectType?.includes(type) ? "border-charcoal bg-charcoal text-ivory" : "border-line text-charcoal-soft"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5">
        <div>
          <label className={labelClass}>Description</label>
          <textarea rows={3} value={form.description ?? ""} onChange={(e) => set("description", e.target.value)} className={textareaClass} />
        </div>
        <div>
          <label className={labelClass}>The Challenge</label>
          <textarea rows={3} value={form.challenge ?? ""} onChange={(e) => set("challenge", e.target.value)} className={textareaClass} />
        </div>
        <div>
          <label className={labelClass}>The Approach</label>
          <textarea rows={3} value={form.approach ?? ""} onChange={(e) => set("approach", e.target.value)} className={textareaClass} />
        </div>
        <div>
          <label className={labelClass}>The Result</label>
          <textarea rows={3} value={form.solution ?? ""} onChange={(e) => set("solution", e.target.value)} className={textareaClass} />
        </div>
      </div>

      <div>
        <p className={labelClass}>Finishes used</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {finishes.map((f) => (
            <button
              key={f.slug}
              type="button"
              onClick={() => toggleFinish(f.slug)}
              className={`border px-3 py-1.5 font-sans text-xs transition-colors ${
                form.finishSlugs?.includes(f.slug) ? "border-charcoal bg-charcoal text-ivory" : "border-line text-charcoal-soft"
              }`}
            >
              {f.name}
            </button>
          ))}
        </div>
      </div>

      <SingleImageUploader label="Cover image" value={form.coverImage ?? ""} onChange={(url) => set("coverImage", url)} />

      <MultiImageUploader
        label="Gallery images"
        values={(form.galleryImages ?? []).map((g) => g.url)}
        onChange={(urls) => set("galleryImages", urls.map((url) => ({ id: nanoid(), url })))}
      />

      <div className="flex items-center gap-6">
        <label className="flex items-center gap-2 font-sans text-sm text-charcoal">
          <input type="checkbox" checked={Boolean(form.featured)} onChange={(e) => set("featured", e.target.checked)} />
          Feature on homepage
        </label>
      </div>

      {error && <p className="font-sans text-xs text-terracotta">{error}</p>}

      <div className="flex gap-4 border-t border-line pt-6">
        <Button type="button" variant="secondary" size="lg" disabled={saving} onClick={() => save(false)}>
          Save as Draft
        </Button>
        <Button type="button" size="lg" disabled={saving} onClick={() => save(true)}>
          {saving ? "Saving…" : "Publish"}
        </Button>
      </div>
    </div>
  );
}
