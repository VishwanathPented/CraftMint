import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { formatDate } from "@/lib/utils";
import { articlesStore } from "@/lib/store";

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
  return { title: article.title, description: article.excerpt };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) notFound();

  return (
    <article className="py-20 lg:py-28">
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
    </article>
  );
}
