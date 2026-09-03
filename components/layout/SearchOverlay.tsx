"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Modal } from "@/components/ui/Modal";
import { finishes } from "@/data/finishes";

export function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return finishes
      .filter(
        (f) =>
          f.name.toLowerCase().includes(q) ||
          f.category.toLowerCase().includes(q) ||
          f.styles.some((s) => s.toLowerCase().includes(q)) ||
          f.applications.some((a) => a.toLowerCase().includes(q)) ||
          f.colourFamilies.some((c) => c.toLowerCase().includes(q)),
      )
      .slice(0, 8);
  }, [query]);

  return (
    <Modal open={open} onClose={onClose} labelledBy="search-heading" className="max-w-2xl bg-ivory">
      <div className="p-6 md:p-8">
        <h2 id="search-heading" className="sr-only">
          Search finishes
        </h2>
        <div className="flex items-center gap-3 border-b border-line pb-4">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5" />
            <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search finishes, textures, colours…"
            className="w-full bg-transparent font-display text-xl text-charcoal placeholder:text-warm-grey focus:outline-none"
          />
        </div>
        <div className="mt-6 flex flex-col gap-1">
          {query.trim() && results.length === 0 && (
            <p className="py-6 text-center font-sans text-sm text-warm-grey">
              No finishes match &ldquo;{query}&rdquo; yet.
            </p>
          )}
          {results.map((finish) => (
            <Link
              key={finish.id}
              href={`/finishes/${finish.slug}`}
              onClick={onClose}
              className="flex items-center gap-4 rounded-sm p-2 transition-colors hover:bg-limestone"
            >
              <div className="relative h-14 w-14 shrink-0 overflow-hidden bg-limestone">
                <Image quality={95} src={finish.heroImage} alt={finish.name} fill sizes="112px" className="object-cover" />
              </div>
              <div>
                <p className="font-sans text-sm font-medium text-charcoal">{finish.name}</p>
                <p className="font-sans text-xs uppercase tracking-[0.1em] text-warm-grey">
                  {finish.category} · {finish.textureType}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Modal>
  );
}
