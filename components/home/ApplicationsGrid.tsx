import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { finishes } from "@/data/finishes";

const applications = [
  { title: "Residential", href: "/applications#residential", image: finishes[5].heroImage },
  { title: "Hospitality", href: "/applications#hospitality", image: finishes[2].heroImage },
  { title: "Commercial", href: "/applications#commercial", image: finishes[9].heroImage },
  { title: "Retail", href: "/applications#retail", image: finishes[1].heroImage },
];

export function ApplicationsGrid() {
  return (
    <section className="py-24 lg:py-32">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading eyebrow="Applications" title="Wherever the surface matters" className="max-w-2xl" />
          <Link
            href="/applications"
            className="font-sans text-xs uppercase tracking-[0.1em] text-charcoal underline underline-offset-4 decoration-line hover:decoration-charcoal"
          >
            View All Applications
          </Link>
        </div>
        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {applications.map((app) => (
            <Link key={app.title} href={app.href} className="group relative aspect-[3/4] overflow-hidden">
              <Image
                quality={95}
                src={app.image}
                alt={app.title}
                fill
                sizes="280vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-charcoal/25 transition-colors group-hover:bg-charcoal/10" />
              <span className="absolute bottom-5 left-5 font-display text-2xl text-ivory">{app.title}</span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
