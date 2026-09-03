import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { LinkButton } from "@/components/ui/Button";
import { PageHero } from "@/components/layout/PageHero";
import { finishes } from "@/data/finishes";

export const metadata: Metadata = {
  title: "About Craftmint LLP",
  description:
    "Craftmint LLP operates in decorative surfaces, texture paints, decorative finishes, flooring and architectural materials, working with Cameleo Deco Coatings, Poland.",
};

const focusAreas = ["Material", "Craft", "Design", "Execution", "Detail"];

export default function AboutPage() {
  return (
    <div>
      <PageHero
        eyebrow="About Craftmint"
        title="We believe surfaces can define a space."
        image={finishes[3].heroImage}
      />

      <section className="py-20 lg:py-28">
        <Container>
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
            <div>
              <Eyebrow>Our Story</Eyebrow>
              <p className="mt-4 font-display text-2xl leading-snug text-charcoal">
                Craftmint LLP operates in decorative surfaces, texture paints, decorative finishes, flooring
                and architectural materials.
              </p>
              <p className="mt-6 font-sans text-base leading-relaxed text-charcoal-soft">
                Craftmint works with Cameleo Deco Coatings, Poland, importing selected materials and
                bringing them to Indian projects through professional execution — connecting European
                decorative coating expertise with on-ground project delivery, from first sample to
                finished wall.
              </p>
            </div>
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image quality={95} src={finishes[8].heroImage} alt="A Craftmint-sourced decorative finish applied in an interior" fill sizes="260vw" className="object-cover" />
            </div>
          </div>

          <div className="mt-20 grid grid-cols-2 gap-8 border-t border-line pt-12 sm:grid-cols-5">
            {focusAreas.map((area) => (
              <p key={area} className="font-display text-xl text-charcoal">
                {area}
              </p>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-limestone py-20 lg:py-28">
        <Container>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[finishes[0], finishes[11], finishes[14]].map((f) => (
              <div key={f.id} className="relative aspect-[3/4] overflow-hidden">
                <Image quality={95} src={f.heroImage} alt={f.name} fill sizes="280vw" className="object-cover" />
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 text-center lg:py-28">
        <Container>
          <h2 className="mx-auto max-w-lg font-display text-3xl text-charcoal sm:text-4xl">
            Working with architects, designers and homeowners across India.
          </h2>
          <div className="mt-8 flex justify-center gap-4">
            <LinkButton href="/cameleo" variant="secondary" size="lg">
              About Cameleo
            </LinkButton>
            <LinkButton href="/contact" size="lg">
              Get in Touch
            </LinkButton>
          </div>
        </Container>
      </section>
    </div>
  );
}
