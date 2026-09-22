import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { FinishCard } from "@/components/finishes/FinishCard";
import { formatDate } from "@/lib/utils";
import { articlesStore } from "@/lib/store";
import { finishes } from "@/data/finishes";
import { SITE_URL, absoluteUrl } from "@/lib/seo";

export const revalidate = 60;

async function getArticle(slug: string) {
  const all = await articlesStore.all();
  return all.find((a) => a.slug === slug && a.published);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: `/journal/${article.slug}` },
  };
}

// Deterministic per-article pick so different articles surface different finishes,
// without needing an explicit finish/article relation in the data model.
function relatedFinishesFor(slug: string, count = 3) {
  const offset = slug.split("").reduce((sum, ch) => sum + ch.charCodeAt(0), 0) % finishes.length;
  return Array.from({ length: count }, (_, i) => finishes[(offset + i) % finishes.length]);
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) notFound();

  const relatedFinishes = relatedFinishesFor(article.slug);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Journal", item: `${SITE_URL}/journal` },
      { "@type": "ListItem", position: 3, name: article.title, item: `${SITE_URL}/journal/${article.slug}` },
    ],
  };

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    image: absoluteUrl(article.coverImage),
    datePublished: article.createdAt,
    author: { "@type": "Organization", name: "CraftMint LLP", url: SITE_URL },
    publisher: {
      "@type": "Organization",
      name: "CraftMint LLP",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/images/Logos/craftmint-logo.png` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/journal/${article.slug}` },
  };

  return (
    <article className="py-20 lg:py-28">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <Container className="max-w-3xl">
        <p className="font-sans text-xs uppercase tracking-[0.16em] text-warm-grey">
          {article.topic} · {formatDate(article.createdAt)}
        </p>
        <h1 className="mt-3 font-display text-4xl leading-tight text-charcoal sm:text-5xl">{article.title}</h1>
        <div className="relative mt-10 aspect-[16/9] overflow-hidden bg-limestone">
          <Image quality={95} src={article.coverImage} alt={article.title} fill sizes="768px" className="object-cover" />
        </div>
        <div className="mt-10 max-w-none font-sans text-base leading-relaxed whitespace-pre-line text-charcoal-soft">
          {article.body}
        </div>
      </Container>

      <Container className="mt-20 max-w-5xl border-t border-line pt-16 lg:mt-28 lg:pt-20">
        <Eyebrow>Explore The Material Library</Eyebrow>
        <h2 className="mt-3 font-display text-3xl text-charcoal">Finishes to consider</h2>
        <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-12 sm:grid-cols-3">
          {relatedFinishes.map((f) => (
            <FinishCard key={f.id} finish={f} />
          ))}
        </div>
        <div className="mt-10">
          <Link
            href="/projects"
            className="font-sans text-xs uppercase tracking-[0.1em] text-charcoal underline underline-offset-4 decoration-line hover:decoration-charcoal"
          >
            See these finishes in completed projects
          </Link>
        </div>
      </Container>
    </article>
  );
}
