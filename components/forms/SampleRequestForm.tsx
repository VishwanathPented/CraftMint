"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button, LinkButton } from "@/components/ui/Button";
import { finishes } from "@/data/finishes";

export function SampleRequestForm() {
  const searchParams = useSearchParams();
  const preselectedFinish = searchParams.get("finish") ?? "";
  const [finishSlug, setFinishSlug] = useState(preselectedFinish);
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const selectedFinish = finishes.find((f) => f.slug === finishSlug);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError(null);
    const form = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/sample-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          email: form.get("email"),
          mobile: form.get("mobile"),
          company: form.get("company"),
          projectType: form.get("projectType"),
          projectLocation: form.get("projectLocation"),
          finishSlug,
          colourSwatchId: form.get("colourSwatchId"),
          estimatedArea: form.get("estimatedArea"),
          message: form.get("message"),
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
      <div className="hairline p-10 text-center">
        <p className="font-display text-2xl text-charcoal">Thank you.</p>
        <p className="mx-auto mt-3 max-w-sm font-sans text-sm text-charcoal-soft">
          Your sample request has been received. A Craftmint team member will confirm details and
          dispatch shortly.
        </p>
        <LinkButton href="/finishes" size="lg" className="mt-6">
          Explore More Finishes
        </LinkButton>
      </div>
    );
  }

  const inputClass =
    "focus-ring mt-1.5 w-full border-b border-line bg-transparent py-2 font-sans text-sm text-charcoal focus:border-charcoal";
  const labelClass = "font-sans text-xs uppercase tracking-[0.08em] text-warm-grey";

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>
            Full name
          </label>
          <input id="name" name="name" type="text" required className={inputClass} />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>
            Email address
          </label>
          <input id="email" name="email" type="email" required className={inputClass} />
        </div>
        <div>
          <label htmlFor="mobile" className={labelClass}>
            Mobile number
          </label>
          <input id="mobile" name="mobile" type="tel" className={inputClass} />
        </div>
        <div>
          <label htmlFor="company" className={labelClass}>
            Company / Studio
          </label>
          <input id="company" name="company" type="text" className={inputClass} />
        </div>
        <div>
          <label htmlFor="projectType" className={labelClass}>
            Project type
          </label>
          <input id="projectType" name="projectType" type="text" placeholder="Residential, Hospitality…" className={inputClass} />
        </div>
        <div>
          <label htmlFor="projectLocation" className={labelClass}>
            Project location
          </label>
          <input id="projectLocation" name="projectLocation" type="text" className={inputClass} />
        </div>
        <div>
          <label htmlFor="finishSlug" className={labelClass}>
            Selected finish
          </label>
          <select
            id="finishSlug"
            name="finishSlug"
            value={finishSlug}
            onChange={(e) => setFinishSlug(e.target.value)}
            className={inputClass}
          >
            <option value="">Not sure yet</option>
            {finishes.map((f) => (
              <option key={f.slug} value={f.slug}>
                {f.name} — {f.category}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="colourSwatchId" className={labelClass}>
            Selected colour
          </label>
          <select id="colourSwatchId" name="colourSwatchId" defaultValue="" className={inputClass} disabled={!selectedFinish}>
            <option value="">{selectedFinish ? "Any colourway" : "Select a finish first"}</option>
            {selectedFinish?.swatches.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="estimatedArea" className={labelClass}>
            Estimated area
          </label>
          <input id="estimatedArea" name="estimatedArea" type="text" placeholder="e.g. 400 sq. ft." className={inputClass} />
        </div>
      </div>
      <div>
        <label htmlFor="message" className={labelClass}>
          Message
        </label>
        <textarea id="message" name="message" rows={4} className={`${inputClass} resize-none`} />
      </div>
      {error && <p className="font-sans text-xs text-terracotta">{error}</p>}
      <Button type="submit" size="lg" className="mt-2 self-start" disabled={status === "loading"}>
        {status === "loading" ? "Sending…" : "Request Sample"}
      </Button>
    </form>
  );
}
