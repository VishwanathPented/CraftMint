"use client";

import { useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";

export function EnquiryForm({ source = "contact-page" }: { source?: string }) {
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const finishSlug = searchParams.get("finish");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError(null);
    const form = new FormData(e.currentTarget);
    const message = form.get("message") as string;

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          email: form.get("email"),
          mobile: form.get("mobile"),
          source,
          page: `${pathname}${finishSlug ? ` (finish: ${finishSlug})` : ""}${message ? ` — ${message}` : ""}`,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Something went wrong. Please try again.");
      }
      setStatus("done");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  if (status === "done") {
    return (
      <div className="hairline p-8 text-center">
        <p className="font-display text-2xl text-charcoal">Thank you.</p>
        <p className="mt-3 font-sans text-sm text-charcoal-soft">
          Your enquiry has been received. A Craftmint team member will be in touch shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="font-sans text-xs uppercase tracking-[0.08em] text-warm-grey">
            Full name
          </label>
          <input id="name" name="name" type="text" required className="focus-ring mt-1.5 w-full border-b border-line bg-transparent py-2 font-sans text-sm text-charcoal focus:border-charcoal" />
        </div>
        <div>
          <label htmlFor="email" className="font-sans text-xs uppercase tracking-[0.08em] text-warm-grey">
            Email address
          </label>
          <input id="email" name="email" type="email" required className="focus-ring mt-1.5 w-full border-b border-line bg-transparent py-2 font-sans text-sm text-charcoal focus:border-charcoal" />
        </div>
      </div>
      <div>
        <label htmlFor="mobile" className="font-sans text-xs uppercase tracking-[0.08em] text-warm-grey">
          Mobile number (optional)
        </label>
        <input id="mobile" name="mobile" type="tel" className="focus-ring mt-1.5 w-full border-b border-line bg-transparent py-2 font-sans text-sm text-charcoal focus:border-charcoal" />
      </div>
      <div>
        <label htmlFor="message" className="font-sans text-xs uppercase tracking-[0.08em] text-warm-grey">
          Tell us about your project
        </label>
        <textarea id="message" name="message" rows={4} className="focus-ring mt-1.5 w-full resize-none border-b border-line bg-transparent py-2 font-sans text-sm text-charcoal focus:border-charcoal" />
      </div>
      {error && <p className="font-sans text-xs text-terracotta">{error}</p>}
      <Button type="submit" size="lg" className="mt-2 self-start" disabled={status === "loading"}>
        {status === "loading" ? "Sending…" : "Send Enquiry"}
      </Button>
    </form>
  );
}
