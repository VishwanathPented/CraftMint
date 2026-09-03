"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { SwatchImage } from "@/components/finishes/SwatchImage";
import { cn } from "@/lib/utils";
import type { Finish } from "@/types";

export function ColourExplorer({ finish }: { finish: Finish }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [viewerOpen, setViewerOpen] = useState(false);
  const active = finish.swatches[activeIndex] ?? finish.swatches[0];

  return (
    <div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
        <button
          type="button"
          onClick={() => setViewerOpen(true)}
          className="focus-ring group relative aspect-[16/10] w-full overflow-hidden bg-limestone"
          aria-label="Open large texture view"
        >
          <SwatchImage
            src={active?.image ?? finish.heroImage}
            alt={`${finish.name}, ${active?.label ?? "primary colourway"}`}
            sizes="(min-width: 1024px) 60vw, 100vw"
            className="inset-8 transition-transform duration-700 group-hover:scale-[1.03] sm:inset-12"
          />
          <span className="absolute bottom-4 right-4 bg-ivory/90 px-3 py-1.5 font-sans text-[11px] uppercase tracking-[0.1em] text-charcoal opacity-0 transition-opacity group-hover:opacity-100">
            View Large ↗
          </span>
        </button>

        <div>
          <p className="font-sans text-[11px] font-medium uppercase tracking-[0.2em] text-warm-grey">
            Colour Options ({finish.swatches.length})
          </p>
          <div className="mt-4 grid grid-cols-5 gap-2 lg:grid-cols-4">
            {finish.swatches.map((swatch, i) => (
              <button
                key={swatch.id}
                type="button"
                onClick={() => setActiveIndex(i)}
                aria-pressed={i === activeIndex}
                aria-label={swatch.label}
                className={cn(
                  "focus-ring relative aspect-square overflow-hidden border-2 transition-colors",
                  i === activeIndex ? "border-charcoal" : "border-transparent hover:border-stone",
                )}
              >
                <SwatchImage src={swatch.image} alt="" sizes="70px" />
              </button>
            ))}
          </div>
          <div className="mt-5 space-y-1.5 font-sans text-sm text-charcoal-soft">
            <p>
              <span className="text-warm-grey">Selected: </span>
              {active?.label}
            </p>
            <p>
              <span className="text-warm-grey">Texture: </span>
              {finish.textureType}
            </p>
            <p>
              <span className="text-warm-grey">Sheen: </span>
              {finish.sheen}
            </p>
            <p>
              <span className="text-warm-grey">Application: </span>
              {finish.applications.join(", ")}
            </p>
          </div>
        </div>
      </div>

      <Modal open={viewerOpen} onClose={() => setViewerOpen(false)} labelledBy="viewer-heading" className="max-w-5xl bg-charcoal">
        <div className="relative aspect-[16/10] w-full">
          <SwatchImage
            src={active?.image ?? finish.heroImage}
            alt={`${finish.name}, ${active?.label ?? "primary colourway"}, enlarged`}
            sizes="90vw"
          />
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4 p-6 text-ivory">
          <h3 id="viewer-heading" className="font-display text-xl">
            {finish.name} — {active?.label}
          </h3>
          <div className="flex gap-6 font-sans text-xs uppercase tracking-[0.1em] text-ivory/70">
            <span>{finish.textureType}</span>
            <span>{finish.sheen}</span>
            <span>{active?.colourFamily}</span>
          </div>
        </div>
      </Modal>
    </div>
  );
}
