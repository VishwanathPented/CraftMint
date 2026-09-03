"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { SingleImageUploader } from "@/components/admin/ImageUploader";
import type { Article } from "@/types";

export function ArticlesManager({ articles }: { articles: Article[] }) {
  const router = useRouter();
  const [form, setForm] = useState({ title: "", topic: "", excerpt: "", coverImage: "", body: "" });
  const [saving, setSaving] = useState(false);

  async function add(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    await fetch("/api/admin/articles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, published: true }),
    });
    setForm({ title: "", topic: "", excerpt: "", coverImage: "", body: "" });
    setSaving(false);
    router.refresh();
  }

  async function remove(id: string) {
    await fetch(`/api/admin/articles/${id}`, { method: "DELETE" });
    router.refresh();
  }

  async function togglePublished(a: Article) {
    await fetch(`/api/admin/articles/${a.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ published: !a.published }),
    });
    router.refresh();
  }

  const inputClass = "focus-ring mt-1.5 w-full border-b border-line bg-transparent py-2 font-sans text-sm text-charcoal focus:border-charcoal";
  const labelClass = "font-sans text-xs uppercase tracking-[0.08em] text-warm-grey";

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.4fr]">
      <form onSubmit={add} className="hairline flex flex-col gap-4 p-6">
        <p className="font-display text-lg text-charcoal">Add Article</p>
        <div>
          <label className={labelClass}>Title</label>
          <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Topic</label>
          <input value={form.topic} onChange={(e) => setForm({ ...form, topic: e.target.value })} placeholder="Decorative Finishes, Colour…" className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Excerpt</label>
          <input value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} className={inputClass} />
        </div>
        <SingleImageUploader label="Cover image" value={form.coverImage} onChange={(url) => setForm({ ...form, coverImage: url })} />
        <div>
          <label className={labelClass}>Body</label>
          <textarea rows={6} value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} className={`${inputClass} resize-none`} />
        </div>
        <Button type="submit" disabled={saving} className="mt-2 self-start">
          {saving ? "Adding…" : "Add Article"}
        </Button>
      </form>

      <div className="flex flex-col gap-3">
        {articles.map((a) => (
          <div key={a.id} className="hairline flex items-center justify-between gap-4 p-4">
            <div>
              <p className="font-sans text-sm font-medium text-charcoal">{a.title}</p>
              <p className="font-sans text-xs uppercase tracking-[0.08em] text-warm-grey">{a.topic}</p>
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={() => togglePublished(a)} className="hairline px-3 py-1.5 font-sans text-xs uppercase tracking-[0.06em] text-charcoal-soft">
                {a.published ? "Unpublish" : "Publish"}
              </button>
              <button type="button" onClick={() => remove(a.id)} className="border border-terracotta px-3 py-1.5 font-sans text-xs uppercase tracking-[0.06em] text-terracotta">
                Delete
              </button>
            </div>
          </div>
        ))}
        {articles.length === 0 && <p className="py-8 text-center font-sans text-sm text-warm-grey">No articles yet.</p>}
      </div>
    </div>
  );
}
