import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/layout/PageHero";
import { articlesStore } from "@/lib/store";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Journal — Notes on Material, Colour & Craft",
  description: "Craftmint's journal — notes on decorative finishes, texture, colour, architecture and craftsmanship.",
};

const topics = [
  "Decorative Finishes",
  "Texture Inspiration",
  "Interior Design",
  "Colour",
  "Architecture",
  "Flooring",
  "Material Selection",
  "Craftsmanship",
];

export default async function JournalPage() {
  const articles = (await articlesStore.all()).filter((a) => a.published);

  return (
    <div>
      <PageHero
        eyebrow="Journal"
        title="Notes on material, colour and craft"
        description="Perspectives on decorative finishes, texture, colour and architecture from the Craftmint team."
      />
      <Container className="pb-20 lg:pb-28">
        <div className="flex flex-wrap gap-2 border-b border-line pb-8">
          {topics.map((t) => (
            <span key={t} className="hairline px-3 py-1.5 font-sans text-xs uppercase tracking-[0.08em] text-charcoal-soft">
              {t}
            </span>
          ))}
        </div>

        {articles.length > 0 ? (
          <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((a) => (
              <Link key={a.id} href={`/journal/${a.slug}`} className="group flex flex-col">
                <div className="relative aspect-[4/3] overflow-hidden bg-limestone">
                  <Image quality={95} src={a.coverImage} alt={a.title} fill sizes="33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <p className="mt-4 font-sans text-xs uppercase tracking-[0.1em] text-warm-grey">
                  {a.topic} · {formatDate(a.createdAt)}
                </p>
                <h3 className="mt-2 font-display text-xl text-charcoal">{a.title}</h3>
                <p className="mt-2 font-sans text-sm text-charcoal-soft">{a.excerpt}</p>
              </Link>
            ))}
          </div>
        ) : (
          <div className="mt-14 hairline flex flex-col items-center gap-3 px-6 py-20 text-center">
            <p className="font-display text-2xl text-charcoal">The journal is just getting started</p>
            <p className="max-w-md font-sans text-sm text-charcoal-soft">
              Stories on material, colour, craftsmanship and decorative technique will be published here.
            </p>
          </div>
        )}
      </Container>
    </div>
  );
}
