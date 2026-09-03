import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { LinkButton } from "@/components/ui/Button";
import { processSteps } from "@/data/process";

export function ProcessSection() {
  return (
    <section className="bg-charcoal py-24 text-ivory lg:py-32">
      <Container>
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
          <div>
            <Eyebrow className="text-ivory/60">From Material To Finished Space</Eyebrow>
            <h2 className="mt-3 max-w-lg font-display text-4xl leading-[1.05] sm:text-5xl">
              A project partner, not merely a material supplier.
            </h2>
          </div>
          <LinkButton href="/process" variant="outline-light" className="shrink-0">
            Our Full Process
          </LinkButton>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-4">
          {processSteps.map((s) => (
            <div key={s.step} className="border-t border-ivory/20 pt-5">
              <span className="font-display text-lg text-mint">{s.step}</span>
              <h3 className="mt-2 font-display text-xl">{s.title}</h3>
              <p className="mt-2 font-sans text-sm leading-relaxed text-ivory/65">{s.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
