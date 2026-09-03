import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { LinkButton } from "@/components/ui/Button";
import { finishes } from "@/data/finishes";

export function BespokeSection() {
  const image = finishes[8].heroImage;

  return (
    <section className="relative flex min-h-[560px] items-center overflow-hidden bg-charcoal py-24 lg:py-32">
      <Image quality={95} src={image} alt="A bespoke decorative finish colourway" fill sizes="100vw" className="object-cover opacity-30" />
      <Container className="relative z-10 text-center">
        <Eyebrow className="text-ivory/60">Bespoke Finishes</Eyebrow>
        <h2 className="mx-auto mt-3 max-w-2xl font-display text-4xl leading-[1.05] text-ivory sm:text-5xl">
          Your vision. Our surface.
        </h2>
        <p className="mx-auto mt-6 max-w-xl font-sans text-base leading-relaxed text-ivory/75">
          Some projects require a finish that isn&rsquo;t simply selected from a catalogue. Where available,
          Craftmint can explore custom colours, unique textures, special effects, feature surfaces, custom
          combinations and bespoke applications.
        </p>
        <LinkButton href="/bespoke" size="lg" className="mt-9 bg-ivory text-charcoal hover:bg-ivory/85">
          Discuss a Bespoke Project
        </LinkButton>
      </Container>
    </section>
  );
}
