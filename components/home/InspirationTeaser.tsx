import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { finishes } from "@/data/finishes";

export function InspirationTeaser() {
  const images = [finishes[9].heroImage, finishes[10].heroImage, finishes[15].heroImage, finishes[6].heroImage];

  return (
    <section className="py-24 lg:py-32">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading eyebrow="Inspiration & Journal" title="For the eye, and for the brief" className="max-w-2xl" />
          <div className="flex gap-6">
            <Link href="/inspiration" className="font-sans text-xs uppercase tracking-[0.1em] text-charcoal underline underline-offset-4 decoration-line hover:decoration-charcoal">
              Inspiration
            </Link>
            <Link href="/journal" className="font-sans text-xs uppercase tracking-[0.1em] text-charcoal underline underline-offset-4 decoration-line hover:decoration-charcoal">
              Journal
            </Link>
          </div>
        </div>
        <div className="mt-14 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {images.map((src, i) => (
            <div key={src + i} className={`relative aspect-square overflow-hidden bg-limestone ${i === 1 ? "lg:mt-8" : ""} ${i === 2 ? "lg:-mt-8" : ""}`}>
              <Image
                quality={95}
                src={src}
                alt="CraftMint decorative finish detail"
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
