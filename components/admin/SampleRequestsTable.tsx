"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { LeadStatus, SampleRequest } from "@/types";
import { finishes } from "@/data/finishes";

const STATUSES: LeadStatus[] = ["New", "Contacted", "Qualified", "Converted", "Closed"];

export function SampleRequestsTable({ requests }: { requests: SampleRequest[] }) {
  const router = useRouter();
  const [pending, setPending] = useState<string | null>(null);

  async function updateStatus(id: string, status: LeadStatus) {
    setPending(id);
    await fetch(`/api/admin/sample-requests/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setPending(null);
    router.refresh();
  }

  return (
    <div className="flex flex-col gap-4">
      {requests.map((req) => {
        const finish = finishes.find((f) => f.slug === req.finishSlug);
        return (
          <div key={req.id} className="hairline p-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="font-display text-lg text-charcoal">{req.name}</p>
                <p className="font-sans text-sm text-charcoal-soft">
                  {req.email} {req.mobile && `· ${req.mobile}`}
                </p>
                {req.company && <p className="font-sans text-xs text-warm-grey">{req.company}</p>}
              </div>
              <select
                value={req.status}
                disabled={pending === req.id}
                onChange={(e) => updateStatus(req.id, e.target.value as LeadStatus)}
                className="focus-ring hairline bg-transparent px-3 py-1.5 font-sans text-xs uppercase tracking-[0.06em]"
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4 font-sans text-xs text-charcoal-soft sm:grid-cols-4">
              <p>
                <span className="text-warm-grey">Finish: </span>
                {finish?.name ?? "Not specified"}
              </p>
              <p>
                <span className="text-warm-grey">Project: </span>
                {req.projectType || "—"}
              </p>
              <p>
                <span className="text-warm-grey">Location: </span>
                {req.projectLocation || "—"}
              </p>
              <p>
                <span className="text-warm-grey">Area: </span>
                {req.estimatedArea || "—"}
              </p>
            </div>
            {req.message && <p className="mt-3 font-sans text-sm text-charcoal-soft">&ldquo;{req.message}&rdquo;</p>}
            <p className="mt-3 font-sans text-[11px] text-warm-grey">{new Date(req.timestamp).toLocaleString("en-IN")}</p>
          </div>
        );
      })}
      {requests.length === 0 && <p className="py-8 text-center font-sans text-sm text-warm-grey">No sample requests yet.</p>}
    </div>
  );
}
