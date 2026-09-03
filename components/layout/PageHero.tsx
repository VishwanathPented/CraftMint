import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";

export function PageHero({
  eyebrow,
  title,
  description,
  image,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  image?: string;
}) {
  if (image) {
    return (
      <section className="relative flex h-[56vh] min-h-[420px] items-end bg-charcoal">
        <Image quality={95} src={image} alt="" fill priority sizes="100vw" className="object-cover opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/15 to-transparent" />
        <Container className="relative z-10 pb-14">
          <Eyebrow className="text-ivory/70">{eyebrow}</Eyebrow>
          <h1 className="mt-3 max-w-2xl font-display text-5xl text-ivory sm:text-6xl">{title}</h1>
          {description && <p className="mt-4 max-w-lg font-sans text-sm leading-relaxed text-ivory/80">{description}</p>}
        </Container>
      </section>
    );
  }

  return (
    <section className="py-20 lg:py-28">
      <Container>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="mt-3 max-w-2xl font-display text-5xl leading-[1.05] text-charcoal sm:text-6xl">{title}</h1>
        {description && <p className="mt-5 max-w-xl font-sans text-base leading-relaxed text-charcoal-soft">{description}</p>}
      </Container>
    </section>
  );
}
