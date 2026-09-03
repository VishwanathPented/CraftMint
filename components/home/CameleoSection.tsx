import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { LinkButton } from "@/components/ui/Button";
import { finishes } from "@/data/finishes";

export function CameleoSection() {
  const image = finishes[8].heroImage;

  return (
    <section className="py-24 lg:py-32">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
          <div className="relative order-2 aspect-[4/5] w-full overflow-hidden lg:order-1">
            <Image quality={95} src={image} alt="A decorative finish sourced through Craftmint's material partnerships" fill sizes="260vw" className="object-cover" />
          </div>
          <div className="order-1 lg:order-2">
            <Eyebrow>European Materials</Eyebrow>
            <h2 className="mt-3 font-display text-4xl leading-[1.05] text-charcoal sm:text-5xl">
              European materials, crafted for Indian spaces.
            </h2>
            <p className="mt-6 max-w-lg font-sans text-base leading-relaxed text-charcoal-soft">
              Craftmint works with Cameleo Deco Coatings, Poland, and imports selected materials from Poland
              for Indian projects. This partnership brings European decorative coating expertise together
              with Craftmint&rsquo;s own on-ground project execution — from material selection through to the
              finished surface.
            </p>
            <LinkButton href="/cameleo" size="lg" className="mt-8">
              Learn More
            </LinkButton>
          </div>
        </div>
      </Container>
    </section>
  );
}
