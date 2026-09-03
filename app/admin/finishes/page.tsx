import Image from "next/image";
import { AdminShell } from "@/components/admin/AdminShell";
import { finishes } from "@/data/finishes";

export default function AdminFinishesPage() {
  return (
    <AdminShell>
      <h1 className="font-display text-3xl text-charcoal">Finishes</h1>
      <p className="mt-2 max-w-2xl font-sans text-sm text-charcoal-soft">
        The finish library is currently sourced from the supplied catalogue photography and structured in{" "}
        <code className="font-mono text-xs">data/finishes.ts</code>. Names are placeholders pending the real
        product catalogue. Once official product names, SKUs and technical data are available, replace the
        entries there — every page on the site reads from this single source, so no other files need to
        change.
      </p>
      <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {finishes.map((f) => (
          <div key={f.id} className="hairline flex gap-4 p-4">
            <div className="relative h-16 w-16 shrink-0 overflow-hidden bg-limestone">
              <Image quality={95} src={f.heroImage} alt={f.name} fill sizes="128px" className="object-cover" />
            </div>
            <div>
              <p className="font-display text-lg text-charcoal">{f.name}</p>
              <p className="font-sans text-xs uppercase tracking-[0.08em] text-warm-grey">
                {f.category} · {f.swatches.length} colourways
              </p>
              <p className="mt-1 font-sans text-xs text-warm-grey">
                {f.published ? "Published" : "Draft"} {f.featured && "· Featured"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </AdminShell>
  );
}
