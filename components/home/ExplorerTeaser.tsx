import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LinkButton } from "@/components/ui/Button";
import { APPLICATION_AREAS } from "@/data/finishes";

export function ExplorerTeaser() {
  return (
    <section className="py-24 lg:py-32">
      <Container>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
          <SectionHeading
            eyebrow="Finish Explorer"
            title="Filter by texture, sheen, style and space"
            description="Search the full Craftmint collection by finish type, texture, sheen, style, application and colour family — built for architects and designers moving from inspiration to specification."
          />
          <div>
            <div className="flex flex-wrap gap-2">
              {APPLICATION_AREAS.map((area) => (
                <Link
                  key={area}
                  href={`/finishes?application=${area}`}
                  className="hairline px-4 py-2 font-sans text-xs uppercase tracking-[0.08em] text-charcoal-soft transition-colors hover:border-charcoal hover:text-charcoal"
                >
                  {area}
                </Link>
              ))}
            </div>
            <LinkButton href="/finishes" size="lg" className="mt-8">
              Open Finish Explorer
            </LinkButton>
          </div>
        </div>
      </Container>
    </section>
  );
}
