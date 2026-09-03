import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { LinkButton } from "@/components/ui/Button";
import { finishes } from "@/data/finishes";

export function AboutTeaser() {
  return (
    <section className="py-24 lg:py-32">
      <Container>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="relative aspect-[3/4] overflow-hidden lg:col-span-1">
            <Image quality={95} src={finishes[3].heroImage} alt="Sculptural concrete effect texture, close detail" fill sizes="280vw" className="object-cover" />
          </div>
          <div className="flex flex-col justify-center gap-6 lg:col-span-2 lg:pl-10">
            <Eyebrow>About Craftmint</Eyebrow>
            <h2 className="max-w-xl font-display text-4xl leading-[1.05] text-charcoal sm:text-5xl">
              We believe surfaces can define a space.
            </h2>
            <p className="max-w-xl font-sans text-base leading-relaxed text-charcoal-soft">
              Craftmint LLP operates in decorative surfaces, texture paints, decorative finishes, flooring
              and architectural materials — working with material, craft, design and execution as one
              continuous discipline, from first sample to finished wall.
            </p>
            <div>
              <LinkButton href="/about" size="lg">
                Our Story
              </LinkButton>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
