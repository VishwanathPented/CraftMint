"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FinishCard } from "./FinishCard";
import { cn } from "@/lib/utils";
import {
  finishes,
  FINISH_CATEGORIES,
  TEXTURE_TYPES,
  SHEENS,
  FINISH_STYLES,
  APPLICATION_AREAS,
  COLOUR_FAMILIES,
} from "@/data/finishes";

type FilterKey = "category" | "texture" | "sheen" | "style" | "application" | "colour";

const FILTER_GROUPS: { key: FilterKey; label: string; options: readonly string[] }[] = [
  { key: "category", label: "Finish Type", options: FINISH_CATEGORIES },
  { key: "texture", label: "Texture", options: TEXTURE_TYPES },
  { key: "sheen", label: "Sheen", options: SHEENS },
  { key: "style", label: "Style", options: FINISH_STYLES },
  { key: "application", label: "Application", options: APPLICATION_AREAS },
  { key: "colour", label: "Colour Family", options: COLOUR_FAMILIES },
];

function readFilters(params: URLSearchParams): Record<FilterKey, string[]> {
  return {
    category: params.getAll("category"),
    texture: params.getAll("texture"),
    sheen: params.getAll("sheen"),
    style: params.getAll("style"),
    application: params.getAll("application"),
    colour: params.getAll("colour"),
  };
}

export function FinishExplorer() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState(() => readFilters(new URLSearchParams(searchParams.toString())));
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  function commit(next: Record<FilterKey, string[]>) {
    setFilters(next);
    const params = new URLSearchParams();
    for (const [key, values] of Object.entries(next)) {
      values.forEach((v) => params.append(key, v));
    }
    router.replace(params.toString() ? `/finishes?${params.toString()}` : "/finishes", { scroll: false });
  }

  function toggle(key: FilterKey, value: string) {
    const current = filters[key];
    const next = current.includes(value) ? current.filter((v) => v !== value) : [...current, value];
    commit({ ...filters, [key]: next });
  }

  function clearAll() {
    commit({ category: [], texture: [], sheen: [], style: [], application: [], colour: [] });
  }

  const results = useMemo(() => {
    return finishes.filter((f) => {
      if (filters.category.length && !filters.category.includes(f.category)) return false;
      if (filters.texture.length && !filters.texture.includes(f.textureType)) return false;
      if (filters.sheen.length && !filters.sheen.includes(f.sheen)) return false;
      if (filters.style.length && !filters.style.some((s) => f.styles.includes(s as never))) return false;
      if (filters.application.length && !filters.application.some((a) => f.applications.includes(a as never)))
        return false;
      if (filters.colour.length && !filters.colour.some((c) => f.colourFamilies.includes(c as never)))
        return false;
      return true;
    });
  }, [filters]);

  const activeCount = Object.values(filters).reduce((sum, arr) => sum + arr.length, 0);

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-[260px_1fr] lg:gap-16">
      <button
        type="button"
        onClick={() => setMobileFiltersOpen((v) => !v)}
        className="hairline flex items-center justify-between px-4 py-3 font-sans text-xs uppercase tracking-[0.1em] lg:hidden"
        aria-expanded={mobileFiltersOpen}
      >
        <span>Filters {activeCount > 0 && `(${activeCount})`}</span>
        <span aria-hidden>{mobileFiltersOpen ? "−" : "+"}</span>
      </button>

      <aside className={cn("flex-col gap-8 lg:flex", mobileFiltersOpen ? "flex" : "hidden")}>
        <div className="flex items-center justify-between">
          <p className="font-sans text-xs font-medium uppercase tracking-[0.18em] text-charcoal">Refine</p>
          {activeCount > 0 && (
            <button
              type="button"
              onClick={clearAll}
              className="font-sans text-xs uppercase tracking-[0.08em] text-warm-grey underline underline-offset-4 hover:text-charcoal"
            >
              Clear All
            </button>
          )}
        </div>

        {FILTER_GROUPS.map((group) => (
          <div key={group.key}>
            <p className="font-sans text-[11px] font-medium uppercase tracking-[0.2em] text-warm-grey">
              {group.label}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {group.options.map((option) => {
                const active = filters[group.key].includes(option);
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => toggle(group.key, option)}
                    aria-pressed={active}
                    className={cn(
                      "focus-ring border px-3 py-1.5 font-sans text-xs transition-colors",
                      active
                        ? "border-charcoal bg-charcoal text-ivory"
                        : "border-line text-charcoal-soft hover:border-charcoal",
                    )}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </aside>

      <div>
        <div className="flex items-center justify-between border-b border-line pb-4">
          <p className="font-sans text-sm text-charcoal-soft">
            {results.length} {results.length === 1 ? "finish" : "finishes"}
          </p>
        </div>

        {results.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-24 text-center">
            <p className="font-display text-2xl text-charcoal">No finishes match yet</p>
            <p className="max-w-sm font-sans text-sm text-charcoal-soft">
              More effects and colourways are added to the collection regularly. Try clearing a filter, or get
              in touch and we&rsquo;ll help you find the right surface.
            </p>
            <button
              type="button"
              onClick={clearAll}
              className="mt-2 font-sans text-xs uppercase tracking-[0.1em] text-charcoal underline underline-offset-4"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-12 sm:grid-cols-3">
            {results.map((finish) => (
              <FinishCard key={finish.id} finish={finish} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
