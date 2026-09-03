import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { pillars } from "@/data/why-craftmint";

export function WhyCraftmint() {
  return (
    <section className="bg-limestone py-24 lg:py-32">
      <Container>
        <SectionHeading eyebrow="Why Craftmint" title="Material expertise, held to a craft standard" align="center" className="mx-auto" />
        <div className="mt-16 grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((pillar, i) => (
            <div key={pillar.title} className="border-t border-charcoal/15 pt-5">
              <span className="font-sans text-xs text-warm-grey">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-2 font-display text-2xl text-charcoal">{pillar.title}</h3>
              <p className="mt-2 max-w-xs font-sans text-sm leading-relaxed text-charcoal-soft">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
