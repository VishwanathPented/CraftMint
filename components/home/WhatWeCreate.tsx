import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { finishes } from "@/data/finishes";

const categories = [
  {
    title: "Interior Finishes",
    description: "Decorative surfaces for residential, hospitality, retail and commercial interiors.",
    href: "/finishes?application=Residential",
    image: finishes[2].heroImage,
    span: "lg:col-span-2",
  },
  {
    title: "Exterior Finishes",
    description: "Architectural textures and surface solutions built for the outdoors.",
    href: "/finishes?application=Exterior",
    image: finishes[13].heroImage,
    span: "",
  },
  {
    title: "Decorative Flooring",
    description: "Seamless and decorative floor finishes.",
    href: "/finishes?category=Flooring",
    image: finishes[9].heroImage,
    span: "",
  },
  {
    title: "Textured Surfaces",
    description: "Tactile surfaces with depth and character.",
    href: "/finishes?category=Textured",
    image: finishes[14].heroImage,
    span: "",
  },
  {
    title: "Special Effects",
    description: "Concrete, stone, metallic, stucco and artistic effects.",
    href: "/finishes?category=Decorative",
    image: finishes[8].heroImage,
    span: "",
  },
  {
    title: "Bespoke Finishes",
    description: "Custom surface possibilities for specific projects.",
    href: "/bespoke",
    image: finishes[11].heroImage,
    span: "lg:col-span-2",
  },
];

export function WhatWeCreate() {
  return (
    <section className="bg-limestone py-24 lg:py-32">
      <Container>
        <SectionHeading eyebrow="What We Create" title="Six ways to bring a surface to life" />
        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat) => (
            <Link
              key={cat.title}
              href={cat.href}
              className={`group relative flex aspect-[4/5] flex-col justify-end overflow-hidden ${cat.span}`}
            >
              <Image
                quality={95}
                src={cat.image}
                alt={cat.title}
                fill
                sizes="260vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/10 to-transparent" />
              <div className="relative z-10 p-6">
                <h3 className="font-display text-2xl text-ivory">{cat.title}</h3>
                <p className="mt-2 max-w-xs font-sans text-sm text-ivory/75 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {cat.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
