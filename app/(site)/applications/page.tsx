import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { PageHero } from "@/components/layout/PageHero";
import { finishes } from "@/data/finishes";
import { projectsStore } from "@/lib/store";
import { getApplicationImage } from "@/lib/applicationImages";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Applications — Residential, Hospitality, Commercial & More",
  description: "Where CraftMint decorative finishes are used — residential, hospitality, commercial, retail, flooring and exterior applications.",
};

const groups = [
  {
    id: "residential",
    title: "Residential",
    description: "Villas, apartments, living rooms, bedrooms and feature walls.",
    sub: ["Villas", "Apartments", "Living Rooms", "Bedrooms", "Feature Walls"],
    image: finishes[5].heroImage,
  },
  {
    id: "hospitality",
    title: "Hospitality",
    description: "Hotels, restaurants, bars, resorts and spas.",
    sub: ["Hotels", "Restaurants", "Bars", "Resorts", "Spas"],
    image: finishes[2].heroImage,
  },
  {
    id: "commercial",
    title: "Commercial",
    description: "Offices, reception areas and corporate interiors.",
    sub: ["Offices", "Reception", "Corporate Interiors"],
    image: finishes[9].heroImage,
  },
  {
    id: "retail",
    title: "Retail",
    description: "Boutiques, showrooms and luxury retail environments.",
    sub: ["Boutiques", "Showrooms", "Luxury Retail"],
    image: finishes[1].heroImage,
  },
  {
    id: "flooring",
    title: "Flooring",
    description: "Seamless and decorative flooring across residential, hospitality, commercial and retail spaces.",
    sub: ["Residential", "Hospitality", "Commercial", "Retail"],
    image: finishes[9].heroImage,
  },
  {
    id: "exterior",
    title: "Exterior",
    description: "Architectural exterior surface solutions.",
    sub: ["Facades", "Boundary Walls", "Outdoor Feature Surfaces"],
    image: finishes[13].heroImage,
  },
];

export default async function ApplicationsPage() {
  const projects = (await projectsStore.all()).filter((p) => p.published);

  return (
    <div>
      <PageHero eyebrow="Applications" title="Wherever the surface matters." image={finishes[13].heroImage} />

      {groups.map((group, i) => (
        <section key={group.id} id={group.id} className={i % 2 === 1 ? "bg-limestone" : ""}>
          <Container className="py-16 lg:py-20">
            <div className={`grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center lg:gap-16 ${i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}`}>
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  quality={95}
                  src={getApplicationImage(projects, group.title, group.image)}
                  alt={group.title}
                  fill
                  sizes="160vw"
                  className="object-cover"
                />
              </div>
              <div>
                <Eyebrow>Application</Eyebrow>
                <h2 className="mt-3 font-display text-4xl text-charcoal">{group.title}</h2>
                <p className="mt-4 max-w-md font-sans text-base leading-relaxed text-charcoal-soft">{group.description}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {group.sub.map((s) => (
                    <span key={s} className="hairline px-3 py-1.5 font-sans text-xs uppercase tracking-[0.08em] text-charcoal-soft">
                      {s}
                    </span>
                  ))}
                </div>
                <Link
                  href={group.title === "Flooring" ? "/finishes?category=Flooring" : `/finishes?application=${group.title}`}
                  className="mt-6 inline-flex items-center gap-2 font-sans text-xs uppercase tracking-[0.1em] text-charcoal underline underline-offset-4 decoration-line hover:decoration-charcoal"
                >
                  View Related Finishes →
                </Link>
              </div>
            </div>
          </Container>
        </section>
      ))}
    </div>
  );
}
