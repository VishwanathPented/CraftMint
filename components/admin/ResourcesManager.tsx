"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import type { Resource, ResourceCategory } from "@/types";

const CATEGORIES: ResourceCategory[] = [
  "Technical Data",
  "Application Guides",
  "Colour Guides",
  "Brochures",
  "Installation Guides",
  "Maintenance",
  "Product Documents",
  "Specification Documents",
];

export function ResourcesManager({ resources }: { resources: Resource[] }) {
  const router = useRouter();
  const [form, setForm] = useState({ title: "", category: CATEGORIES[0], description: "", fileType: "PDF", fileUrl: "" });
  const [saving, setSaving] = useState(false);

  async function add(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    await fetch("/api/admin/resources", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, published: true }),
    });
    setForm({ title: "", category: CATEGORIES[0], description: "", fileType: "PDF", fileUrl: "" });
    setSaving(false);
    router.refresh();
  }

  async function remove(id: string) {
    await fetch(`/api/admin/resources/${id}`, { method: "DELETE" });
    router.refresh();
  }

  async function togglePublished(r: Resource) {
    await fetch(`/api/admin/resources/${r.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ published: !r.published }),
    });
    router.refresh();
  }

  const inputClass = "focus-ring mt-1.5 w-full border-b border-line bg-transparent py-2 font-sans text-sm text-charcoal focus:border-charcoal";
  const labelClass = "font-sans text-xs uppercase tracking-[0.08em] text-warm-grey";

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.4fr]">
      <form onSubmit={add} className="hairline flex flex-col gap-4 p-6">
        <p className="font-display text-lg text-charcoal">Add Resource</p>
        <div>
          <label className={labelClass}>Title</label>
          <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Category</label>
          <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value as ResourceCategory })} className={inputClass}>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>Description</label>
          <input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className={inputClass} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>File type</label>
            <input value={form.fileType} onChange={(e) => setForm({ ...form, fileType: e.target.value })} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>File URL</label>
            <input value={form.fileUrl} onChange={(e) => setForm({ ...form, fileUrl: e.target.value })} placeholder="/uploads/…" className={inputClass} />
          </div>
        </div>
        <Button type="submit" disabled={saving} className="mt-2 self-start">
          {saving ? "Adding…" : "Add Resource"}
        </Button>
      </form>

      <div className="flex flex-col gap-3">
        {resources.map((r) => (
          <div key={r.id} className="hairline flex items-center justify-between gap-4 p-4">
            <div>
              <p className="font-sans text-sm font-medium text-charcoal">{r.title}</p>
              <p className="font-sans text-xs uppercase tracking-[0.08em] text-warm-grey">{r.category}</p>
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={() => togglePublished(r)} className="hairline px-3 py-1.5 font-sans text-xs uppercase tracking-[0.06em] text-charcoal-soft">
                {r.published ? "Unpublish" : "Publish"}
              </button>
              <button type="button" onClick={() => remove(r.id)} className="border border-terracotta px-3 py-1.5 font-sans text-xs uppercase tracking-[0.06em] text-terracotta">
                Delete
              </button>
            </div>
          </div>
        ))}
        {resources.length === 0 && <p className="py-8 text-center font-sans text-sm text-warm-grey">No resources yet.</p>}
      </div>
    </div>
  );
}
