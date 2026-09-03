import { Suspense } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { PageHero } from "@/components/layout/PageHero";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { finishes } from "@/data/finishes";

export const metadata: Metadata = {
  title: "Bespoke Finishes",
  description: "Custom colours, unique textures and bespoke surface possibilities for projects that need more than a catalogue finish.",
};

export default function BespokePage() {
  return (
    <div>
      <PageHero eyebrow="Bespoke Finishes" title="Your vision. Our surface." image={finishes[8].heroImage} />

      <section className="py-20 lg:py-28">
        <Container>
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
            <div>
              <Eyebrow>Beyond the Catalogue</Eyebrow>
              <p className="mt-4 font-display text-2xl leading-snug text-charcoal">
                Some projects require a finish that isn&rsquo;t simply selected from a catalogue.
              </p>
              <p className="mt-6 font-sans text-base leading-relaxed text-charcoal-soft">
                Where available, Craftmint can explore custom colours, unique textures, special effects,
                feature surfaces, custom combinations and bespoke applications — developed alongside your
                design team for a specific space.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-3">
                {["Custom Colours", "Unique Textures", "Special Effects", "Feature Surfaces", "Custom Combinations", "Bespoke Applications"].map((item) => (
                  <div key={item} className="hairline px-4 py-3 font-sans text-sm text-charcoal-soft">
                    {item}
                  </div>
                ))}
              </div>
              <p className="mt-6 font-sans text-xs text-warm-grey">
                Bespoke capability is assessed per project and confirmed with our material partners.
              </p>
            </div>
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image quality={95} src={finishes[8].heroImage} alt="An artistic decorative finish" fill sizes="260vw" className="object-cover" />
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-limestone py-20 lg:py-28">
        <Container>
          <div className="mx-auto max-w-xl">
            <Eyebrow className="text-center">Discuss a Bespoke Project</Eyebrow>
            <h2 className="mt-3 text-center font-display text-3xl text-charcoal">Tell us what you have in mind</h2>
            <div className="mt-10">
              <Suspense fallback={null}>
                <EnquiryForm source="bespoke-page" />
              </Suspense>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
