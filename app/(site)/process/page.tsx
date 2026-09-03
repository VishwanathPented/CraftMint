import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { LinkButton } from "@/components/ui/Button";
import { PageHero } from "@/components/layout/PageHero";
import { processSteps } from "@/data/process";
import { finishes } from "@/data/finishes";

export const metadata: Metadata = {
  title: "Our Process — From Material to Finished Space",
  description: "How Craftmint takes a project from consultation and sampling through to specification, sourcing and professional execution.",
};

export default function ProcessPage() {
  return (
    <div>
      <PageHero
        eyebrow="Our Process"
        title="From material to finished space."
        description="Craftmint can support a project from finish selection through to execution — a project partner, not merely a material supplier."
        image={finishes[13].heroImage}
      />

      <section className="py-20 lg:py-28">
        <Container>
          <div className="grid grid-cols-1 gap-x-10 gap-y-16 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step) => (
              <div key={step.step} className="border-t border-line pt-6">
                <span className="font-display text-2xl text-mint">{step.step}</span>
                <h2 className="mt-3 font-display text-2xl text-charcoal">{step.title}</h2>
                <p className="mt-3 font-sans text-sm leading-relaxed text-charcoal-soft">{step.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-charcoal py-20 text-center lg:py-24">
        <Container>
          <Eyebrow className="text-ivory/60">Ready When You Are</Eyebrow>
          <h2 className="mx-auto mt-3 max-w-lg font-display text-3xl text-ivory sm:text-4xl">
            Every project starts with a conversation.
          </h2>
          <div className="mt-8 flex justify-center gap-4">
            <LinkButton href="/contact" size="lg" className="bg-ivory text-charcoal hover:bg-ivory/85">
              Start Your Project
            </LinkButton>
          </div>
        </Container>
      </section>
    </div>
  );
}
