import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/layout/PageHero";
import { resourcesStore } from "@/lib/store";
import type { ResourceCategory } from "@/types";

export const metadata: Metadata = {
  title: "Resources — Technical Data, Guides & Downloads",
  description: "Technical data, application guides, colour guides and specification documents for Craftmint finishes.",
};

const CATEGORIES: ResourceCategory[] = [
  "Technical Data",
  "Application Guides",
  "Colour Guides",
  "Brochures",
  "Installation Guides",
  "Maintenance",
  "Product Documents",
  "Specification Documents",
];

export default async function ResourcesPage() {
  const resources = (await resourcesStore.all()).filter((r) => r.published);

  return (
    <div>
      <PageHero
        eyebrow="Resources"
        title="Technical resources & downloads"
        description="Technical data sheets, application guides and specification documents — added as they are finalised with our material partners."
      />
      <Container className="pb-20 lg:pb-28">
        {resources.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {resources.map((r) => (
              <a key={r.id} href={r.fileUrl} className="hairline flex flex-col gap-2 p-6 transition-colors hover:border-charcoal">
                <span className="font-sans text-[11px] uppercase tracking-[0.16em] text-warm-grey">{r.category}</span>
                <span className="font-display text-xl text-charcoal">{r.title}</span>
                <span className="font-sans text-sm text-charcoal-soft">{r.description}</span>
                <span className="mt-2 font-sans text-xs uppercase tracking-[0.1em] text-charcoal">
                  Download {r.fileType} →
                </span>
              </a>
            ))}
          </div>
        ) : (
          <div className="hairline flex flex-col items-center gap-3 px-6 py-20 text-center">
            <p className="font-display text-2xl text-charcoal">Resources are being prepared</p>
            <p className="max-w-md font-sans text-sm text-charcoal-soft">
              Technical data sheets, application guides and specification documents will appear here as
              they are confirmed with our material partners.
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {CATEGORIES.map((c) => (
                <span key={c} className="hairline px-3 py-1.5 font-sans text-xs uppercase tracking-[0.08em] text-warm-grey">
                  {c}
                </span>
              ))}
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}
