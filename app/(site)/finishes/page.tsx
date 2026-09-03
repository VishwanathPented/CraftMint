import { Suspense } from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FinishExplorer } from "@/components/finishes/FinishExplorer";

export const metadata: Metadata = {
  title: "Finishes — Decorative Wall Finishes & Textures",
  description:
    "Explore Craftmint's collection of decorative finishes — concrete, stone, metallic and mineral effects — filterable by texture, sheen, style and application.",
};

export default function FinishesPage() {
  return (
    <div className="py-16 lg:py-20">
      <Container>
        <SectionHeading
          eyebrow="The Collection"
          title="Explore our finishes"
          description="Filter by finish type, texture, sheen, style, application and colour family to find the surface for your space."
          className="max-w-2xl"
        />
        <div className="mt-14">
          <Suspense fallback={<div className="py-24 text-center font-sans text-sm text-warm-grey">Loading finishes…</div>}>
            <FinishExplorer />
          </Suspense>
        </div>
      </Container>
    </div>
  );
}
