"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import type { Lead, LeadStatus } from "@/types";

const STATUSES: LeadStatus[] = ["New", "Contacted", "Qualified", "Converted", "Closed"];

export function LeadsTable({ leads }: { leads: Lead[] }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<LeadStatus | "All">("All");
  const [sortDesc, setSortDesc] = useState(true);
  const [pending, setPending] = useState<string | null>(null);

  const rows = useMemo(() => {
    let result = [...leads];
    if (statusFilter !== "All") result = result.filter((l) => l.status === statusFilter);
    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter((l) => l.name.toLowerCase().includes(q) || l.email.toLowerCase().includes(q));
    }
    result.sort((a, b) => (sortDesc ? +new Date(b.timestamp) - +new Date(a.timestamp) : +new Date(a.timestamp) - +new Date(b.timestamp)));
    return result;
  }, [leads, query, statusFilter, sortDesc]);

  async function updateStatus(id: string, status: LeadStatus) {
    setPending(id);
    await fetch(`/api/admin/leads/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setPending(null);
    router.refresh();
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <input
          type="text"
          placeholder="Search by name or email…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="focus-ring hairline w-64 max-w-full bg-transparent px-3 py-2 font-sans text-sm text-charcoal"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as LeadStatus | "All")}
          className="focus-ring hairline bg-transparent px-3 py-2 font-sans text-sm text-charcoal"
        >
          <option value="All">All statuses</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={() => setSortDesc((v) => !v)}
          className="hairline px-3 py-2 font-sans text-xs uppercase tracking-[0.08em] text-charcoal-soft"
        >
          Sort: {sortDesc ? "Newest" : "Oldest"}
        </button>
      </div>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[720px] border-collapse font-sans text-sm">
          <thead>
            <tr className="border-b border-line text-left text-xs uppercase tracking-[0.08em] text-warm-grey">
              <th className="py-3 pr-4">Name</th>
              <th className="py-3 pr-4">Email</th>
              <th className="py-3 pr-4">Mobile</th>
              <th className="py-3 pr-4">Source</th>
              <th className="py-3 pr-4">Date</th>
              <th className="py-3 pr-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((lead) => (
              <tr key={lead.id} className="border-b border-line/60 align-top">
                <td className="py-3 pr-4 text-charcoal">{lead.name}</td>
                <td className="py-3 pr-4 text-charcoal-soft">{lead.email}</td>
                <td className="py-3 pr-4 text-charcoal-soft">{lead.mobile || "—"}</td>
                <td className="py-3 pr-4 text-charcoal-soft">{lead.source}</td>
                <td className="py-3 pr-4 text-charcoal-soft">{new Date(lead.timestamp).toLocaleDateString("en-IN")}</td>
                <td className="py-3 pr-4">
                  <select
                    value={lead.status}
                    disabled={pending === lead.id}
                    onChange={(e) => updateStatus(lead.id, e.target.value as LeadStatus)}
                    className={cn(
                      "focus-ring border-0 bg-transparent font-sans text-xs uppercase tracking-[0.06em]",
                      lead.status === "New" && "text-mint",
                    )}
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={6} className="py-8 text-center text-warm-grey">
                  No leads match.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
