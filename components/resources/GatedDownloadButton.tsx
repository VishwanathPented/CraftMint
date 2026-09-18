"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";

export function GatedDownloadButton({
  label,
  fileUrl,
  heading,
  category,
  source,
  page,
  variant = "secondary",
}: {
  label: string;
  fileUrl: string;
  heading: string;
  category?: string;
  source: string;
  page: string;
  variant?: "primary" | "secondary" | "ghost" | "outline-light";
}) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const headingId = `gated-download-${label.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}`;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError(null);
    const form = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          email: form.get("email"),
          mobile: form.get("mobile"),
          company: form.get("company"),
          source,
          page,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Something went wrong. Please try again.");
      }
      window.open(fileUrl, "_blank", "noopener,noreferrer");
      setOpen(false);
      setStatus("idle");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  const inputClass =
    "focus-ring mt-1.5 w-full border-b border-line bg-transparent py-2 font-sans text-sm text-charcoal focus:border-charcoal";
  const labelClass = "font-sans text-xs uppercase tracking-[0.08em] text-warm-grey";

  return (
    <>
      <Button type="button" variant={variant} onClick={() => setOpen(true)}>
        {label}
      </Button>

      <Modal open={open} onClose={() => setOpen(false)} labelledBy={headingId} className="max-w-md">
        <div className="relative p-8 md:p-10">
          <button
            type="button"
            aria-label="Close"
            onClick={() => setOpen(false)}
            className="focus-ring absolute right-5 top-5 flex h-8 w-8 items-center justify-center text-charcoal-soft hover:text-charcoal"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M6 6L18 18M18 6L6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>

          {category && (
            <span className="font-sans text-[11px] font-medium uppercase tracking-[0.24em] text-warm-grey">
              {category}
            </span>
          )}
          <h2 id={headingId} className="mt-3 font-display text-3xl leading-tight text-charcoal">
            {heading}
          </h2>
          <p className="mt-3 font-sans text-sm leading-relaxed text-charcoal-soft">
            Share a few details and your download will start right away.
          </p>

          <form onSubmit={onSubmit} className="mt-7 flex flex-col gap-4">
            <div>
              <label htmlFor={`${headingId}-name`} className={labelClass}>
                Full name
              </label>
              <input id={`${headingId}-name`} name="name" type="text" required className={inputClass} />
            </div>
            <div>
              <label htmlFor={`${headingId}-company`} className={labelClass}>
                Company name
              </label>
              <input id={`${headingId}-company`} name="company" type="text" required className={inputClass} />
            </div>
            <div>
              <label htmlFor={`${headingId}-mobile`} className={labelClass}>
                Phone number
              </label>
              <input id={`${headingId}-mobile`} name="mobile" type="tel" required className={inputClass} />
            </div>
            <div>
              <label htmlFor={`${headingId}-email`} className={labelClass}>
                Email address
              </label>
              <input id={`${headingId}-email`} name="email" type="email" required className={inputClass} />
            </div>

            {error && <p className="font-sans text-xs text-terracotta">{error}</p>}

            <Button type="submit" size="lg" className="mt-2 w-full" disabled={status === "loading"}>
              {status === "loading" ? "Preparing download…" : label}
            </Button>
          </form>
        </div>
      </Modal>
    </>
  );
}
