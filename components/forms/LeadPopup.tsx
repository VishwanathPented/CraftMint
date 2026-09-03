"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Modal } from "@/components/ui/Modal";
import { Button, LinkButton } from "@/components/ui/Button";

const DISMISS_KEY = "craftmint:lead-popup:dismissed";
const SHOWN_DELAY_MS = 9000;

export function LeadPopup() {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.sessionStorage.getItem(DISMISS_KEY)) return;

    const timer = window.setTimeout(() => setOpen(true), SHOWN_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, []);

  function dismiss() {
    setOpen(false);
    window.sessionStorage.setItem(DISMISS_KEY, "1");
  }

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
          source: "lead-popup",
          page: pathname,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Something went wrong. Please try again.");
      }
      setSubmitted(true);
      window.sessionStorage.setItem(DISMISS_KEY, "1");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      return;
    }
    setStatus("idle");
  }

  return (
    <Modal open={open} onClose={dismiss} labelledBy="lead-popup-heading" className="max-w-md">
      <div className="relative p-8 md:p-10">
        <button
          type="button"
          aria-label="Close"
          onClick={dismiss}
          className="focus-ring absolute right-5 top-5 flex h-8 w-8 items-center justify-center text-charcoal-soft hover:text-charcoal"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M6 6L18 18M18 6L6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        {!submitted ? (
          <>
            <span className="font-sans text-[11px] font-medium uppercase tracking-[0.24em] text-warm-grey">
              Craftmint LLP
            </span>
            <h2 id="lead-popup-heading" className="mt-3 font-display text-3xl leading-tight text-charcoal">
              Let&rsquo;s Create Your Surface
            </h2>
            <p className="mt-3 font-sans text-sm leading-relaxed text-charcoal-soft">
              Tell us a little about your project and discover the possibilities with Craftmint.
            </p>

            <form onSubmit={onSubmit} className="mt-7 flex flex-col gap-4">
              <div>
                <label htmlFor="popup-name" className="font-sans text-xs uppercase tracking-[0.08em] text-warm-grey">
                  Full name
                </label>
                <input
                  id="popup-name"
                  name="name"
                  type="text"
                  required
                  className="focus-ring mt-1.5 w-full border-b border-line bg-transparent py-2 font-sans text-sm text-charcoal focus:border-charcoal"
                />
              </div>
              <div>
                <label htmlFor="popup-email" className="font-sans text-xs uppercase tracking-[0.08em] text-warm-grey">
                  Email address
                </label>
                <input
                  id="popup-email"
                  name="email"
                  type="email"
                  required
                  className="focus-ring mt-1.5 w-full border-b border-line bg-transparent py-2 font-sans text-sm text-charcoal focus:border-charcoal"
                />
              </div>
              <div>
                <label htmlFor="popup-mobile" className="font-sans text-xs uppercase tracking-[0.08em] text-warm-grey">
                  Mobile number (optional)
                </label>
                <input
                  id="popup-mobile"
                  name="mobile"
                  type="tel"
                  className="focus-ring mt-1.5 w-full border-b border-line bg-transparent py-2 font-sans text-sm text-charcoal focus:border-charcoal"
                />
              </div>

              {error && <p className="font-sans text-xs text-terracotta">{error}</p>}

              <Button type="submit" size="lg" className="mt-2 w-full" disabled={status === "loading"}>
                {status === "loading" ? "Sending…" : "Get Started"}
              </Button>
              <button
                type="button"
                onClick={dismiss}
                className="font-sans text-xs uppercase tracking-[0.1em] text-warm-grey hover:text-charcoal"
              >
                Maybe later
              </button>
            </form>
          </>
        ) : (
          <div className="flex flex-col items-start gap-4 py-6">
            <span className="font-sans text-[11px] font-medium uppercase tracking-[0.24em] text-mint">
              Thank You
            </span>
            <p className="font-display text-2xl leading-snug text-charcoal">
              Your details have been received. A Craftmint team member will be in touch shortly.
            </p>
            <LinkButton href="/finishes" onClick={dismiss} size="lg" className="mt-2">
              Explore Finishes
            </LinkButton>
          </div>
        )}
      </div>
    </Modal>
  );
}
