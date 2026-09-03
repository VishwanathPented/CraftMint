import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MaterialSwatchCard } from "@/components/finishes/MaterialSwatchCard";
import { finishes } from "@/data/finishes";

export function Approach() {
  const texture = finishes[4];

  return (
    <section className="py-24 lg:py-32">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <SectionHeading
            eyebrow="The Craftmint Approach"
            title="More than a finish. A material experience."
            description="Craftmint brings together premium decorative materials, refined surface techniques and experienced execution to create interiors and architectural spaces with depth, character and individuality."
          />
          <div className="relative aspect-[4/3] w-full self-end overflow-hidden lg:-mt-8">
            <Image
              quality={95}
              src={texture.heroImage}
              alt="Close application of a Craftmint-sourced decorative finish"
              fill
              sizes="160vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-4 lg:mt-24">
          {finishes.slice(0, 4).map((finish) => (
            <MaterialSwatchCard
              key={finish.id}
              image={finish.swatches[0]?.image ?? finish.heroImage}
              alt={`${finish.name} texture detail`}
              name={finish.name}
              meta={`${finish.category} · ${finish.textureType}`}
              href={`/finishes/${finish.slug}`}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
