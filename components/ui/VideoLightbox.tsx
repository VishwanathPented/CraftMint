"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { cn } from "@/lib/utils";

export function VideoLightbox({
  youtubeId,
  title,
  label = "Watch Tutorial",
  className,
  imageClassName,
}: {
  youtubeId: string;
  title: string;
  label?: string;
  className?: string;
  imageClassName?: string;
}) {
  const [open, setOpen] = useState(false);
  const headingId = `video-${youtubeId}-title`;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Watch ${title} application video`}
        className={cn(
          "group/video focus-ring relative block w-full overflow-hidden bg-charcoal text-left",
          className,
        )}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- external YouTube thumbnail, not part of the optimized image pipeline */}
        <img
          src={`https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`}
          alt=""
          aria-hidden
          loading="lazy"
          className={cn(
            "h-full w-full object-cover opacity-90 transition-transform duration-700 ease-out group-hover/video:scale-[1.02]",
            imageClassName,
          )}
        />
        <div className="absolute inset-0 bg-charcoal/25 transition-colors duration-300 ease-out group-hover/video:bg-charcoal/35" />

        <span className="absolute inset-0 flex items-center justify-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full border border-ivory/70 text-ivory transition-all duration-300 ease-out group-hover/video:scale-105 group-hover/video:border-ivory">
            <svg width="14" height="16" viewBox="0 0 14 16" fill="currentColor" aria-hidden>
              <path d="M0 0L14 8L0 16V0Z" />
            </svg>
          </span>
        </span>

        <span className="absolute bottom-4 left-4 font-sans text-[11px] font-medium uppercase tracking-[0.18em] text-ivory/85">
          {label}
        </span>
      </button>

      <Modal open={open} onClose={() => setOpen(false)} labelledBy={headingId} className="max-w-4xl overflow-visible bg-charcoal p-0">
        <h2 id={headingId} className="sr-only">
          {title}
        </h2>
        <div className="relative aspect-video w-full">
          {open && (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`}
              title={title}
              className="absolute inset-0 h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close video"
            className="focus-ring absolute right-3 top-3 flex h-9 w-9 items-center justify-center bg-charcoal/60 text-ivory/80 transition-colors duration-300 ease-out hover:text-ivory"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path d="M1 1L15 15M15 1L1 15" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </Modal>
    </>
  );
}
