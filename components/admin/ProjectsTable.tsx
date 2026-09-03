"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Project } from "@/types";

export function ProjectsTable({ projects }: { projects: Project[] }) {
  const router = useRouter();
  const [pending, setPending] = useState<string | null>(null);

  async function patch(id: string, body: Partial<Project>) {
    setPending(id);
    await fetch(`/api/admin/projects/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    setPending(null);
    router.refresh();
  }

  async function remove(id: string) {
    if (!confirm("Delete this project? This cannot be undone.")) return;
    setPending(id);
    await fetch(`/api/admin/projects/${id}`, { method: "DELETE" });
    setPending(null);
    router.refresh();
  }

  return (
    <div className="mt-8 flex flex-col gap-3">
      {projects.map((p) => (
        <div key={p.id} className="hairline flex flex-wrap items-center justify-between gap-4 p-4">
          <div>
            <p className="font-display text-lg text-charcoal">{p.title || "(untitled)"}</p>
            <p className="font-sans text-xs uppercase tracking-[0.08em] text-warm-grey">
              {p.published ? "Published" : "Draft"} {p.featured && "· Featured"} {p.location && `· ${p.location}`}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              disabled={pending === p.id}
              onClick={() => patch(p.id, { published: !p.published })}
              className="hairline px-3 py-1.5 font-sans text-xs uppercase tracking-[0.06em] text-charcoal-soft hover:border-charcoal"
            >
              {p.published ? "Unpublish" : "Publish"}
            </button>
            <button
              type="button"
              disabled={pending === p.id}
              onClick={() => patch(p.id, { featured: !p.featured })}
              className="hairline px-3 py-1.5 font-sans text-xs uppercase tracking-[0.06em] text-charcoal-soft hover:border-charcoal"
            >
              {p.featured ? "Unfeature" : "Feature"}
            </button>
            <Link href={`/admin/projects/${p.id}/edit`} className="hairline px-3 py-1.5 font-sans text-xs uppercase tracking-[0.06em] text-charcoal-soft hover:border-charcoal">
              Edit
            </Link>
            <button
              type="button"
              disabled={pending === p.id}
              onClick={() => remove(p.id)}
              className="border border-terracotta px-3 py-1.5 font-sans text-xs uppercase tracking-[0.06em] text-terracotta"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
      {projects.length === 0 && <p className="py-8 text-center font-sans text-sm text-warm-grey">No projects yet — add your first one.</p>}
    </div>
  );
}
