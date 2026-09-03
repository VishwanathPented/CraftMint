import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LinkButton } from "@/components/ui/Button";
import { FinishCard } from "@/components/finishes/FinishCard";
import { finishes } from "@/data/finishes";

export function FeaturedFinishes() {
  const featured = finishes.filter((f) => f.featured).slice(0, 8);

  return (
    <section className="py-24 lg:py-32">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Explore Our Finishes"
            title="Textures worth touching"
            description="Discover textures, colours and surface effects designed to transform architectural spaces."
            className="max-w-2xl"
          />
          <LinkButton href="/finishes" variant="secondary" className="shrink-0">
            View All Finishes
          </LinkButton>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-x-5 gap-y-12 sm:grid-cols-3 lg:grid-cols-4">
          {featured.map((finish, i) => (
            <FinishCard key={finish.id} finish={finish} priority={i < 4} />
          ))}
        </div>
      </Container>
    </section>
  );
}
