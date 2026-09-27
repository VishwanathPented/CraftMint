import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { LinkButton } from "@/components/ui/Button";
import { PageHero } from "@/components/layout/PageHero";
import { VideoLightbox } from "@/components/ui/VideoLightbox";
import { finishes } from "@/data/finishes";
import { cameleoVideos } from "@/data/cameleoVideos";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Cameleo Deco Coatings, Poland",
  description: "CraftMint works with Cameleo Deco Coatings, Poland, and imports selected materials from Poland for Indian projects.",
  alternates: { canonical: "/cameleo" },
};

const faqs = [
  {
    question: "What is Cameleo Deco Coatings?",
    answer:
      "Cameleo Deco Coatings is a Polish manufacturer of decorative coating systems, producing concrete-effect, metallic, stucco and stone-effect finishes for interior and exterior surfaces.",
  },
  {
    question: "Does CraftMint sell Cameleo Deco Coatings products in India?",
    answer:
      "CraftMint imports and applies Cameleo Deco Coatings materials for Indian projects. Specific distribution terms and product availability are confirmed with our team on request.",
  },
  {
    question: "Where can I see the full Cameleo Deco Coatings range?",
    answer:
      "The complete Cameleo Deco Coatings range is shown on their official site, cameleo.pl. CraftMint's finishes page shows the materials currently available for Indian projects.",
  },
];

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Cameleo Deco Coatings", item: `${SITE_URL}/cameleo` },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};

export default function CameleoPage() {
  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <PageHero eyebrow="Cameleo Deco Coatings · Poland" title="Cameleo Deco Coatings, crafted for Indian spaces." image={finishes[8].heroImage} />

      <section className="py-20 lg:py-28">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>The Partnership</Eyebrow>
            <p className="mt-4 font-display text-2xl leading-snug text-charcoal sm:text-3xl">
              CraftMint works with Cameleo Deco Coatings, Poland, and imports selected materials from Poland
              for Indian projects.
            </p>
            <p className="mt-6 font-sans text-base leading-relaxed text-charcoal-soft">
              This relationship brings European decorative coating material to Indian architecture and
              interiors, paired with CraftMint&rsquo;s own project execution on the ground — from material
              selection and sampling through to application and handover.
            </p>
            <p className="mt-6 font-sans text-base leading-relaxed text-charcoal-soft">
              Cameleo Deco Coatings produces decorative coating systems across concrete-effect, metallic,
              stucco and stone-effect categories — the same categories that make up CraftMint&rsquo;s{" "}
              <Link href="/finishes" className="underline underline-offset-2 hover:text-charcoal">
                finish collection
              </Link>
              .
            </p>
          </div>
        </Container>
      </section>

      <section className="py-4 lg:py-8">
        <Container>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[finishes[8], finishes[9], finishes[13]].map((f) => (
              <div key={f.id} className="relative aspect-[3/4] overflow-hidden">
                <Image quality={95} src={f.heroImage} alt={f.name} fill sizes="280vw" className="object-cover" />
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 lg:py-28">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>Application Techniques</Eyebrow>
            <h2 className="mt-3 font-display text-3xl text-charcoal sm:text-4xl">
              Watch the effects being made
            </h2>
            <p className="mt-4 font-sans text-sm leading-relaxed text-charcoal-soft">
              Official demonstrations from Cameleo Deco Coatings, Poland — the techniques behind the
              materials CraftMint imports and applies on Indian projects.
            </p>
          </div>
          <div className="mt-14 grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {cameleoVideos.map((video) => (
              <div key={video.id}>
                <VideoLightbox youtubeId={video.youtubeId} title={video.title} className="aspect-[4/5]" />
                <p className="mt-3 font-sans text-xs uppercase tracking-[0.1em] text-charcoal-soft">
                  {video.title}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 lg:py-28">
        <Container className="mx-auto max-w-2xl">
          <Eyebrow className="text-center">Frequently Asked</Eyebrow>
          <h2 className="mt-3 text-center font-display text-3xl text-charcoal sm:text-4xl">
            About the partnership
          </h2>
          <div className="mt-10 divide-y divide-line border-t border-line">
            {faqs.map((f) => (
              <div key={f.question} className="py-6">
                <h3 className="font-display text-lg text-charcoal">{f.question}</h3>
                <p className="mt-2 font-sans text-sm leading-relaxed text-charcoal-soft">
                  {f.question.includes("full Cameleo") ? (
                    <>
                      The complete Cameleo Deco Coatings range is shown on their official site,{" "}
                      <a
                        href="https://cameleo.pl"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline underline-offset-2 hover:text-charcoal"
                      >
                        cameleo.pl
                      </a>
                      . CraftMint&rsquo;s{" "}
                      <Link href="/finishes" className="underline underline-offset-2 hover:text-charcoal">
                        finishes page
                      </Link>{" "}
                      shows the materials currently available for Indian projects.
                    </>
                  ) : (
                    f.answer
                  )}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex justify-center gap-4">
            <LinkButton href="/finishes" size="lg">
              Explore Finishes
            </LinkButton>
            <LinkButton href="/contact" variant="secondary" size="lg">
              Ask a Question
            </LinkButton>
          </div>
        </Container>
      </section>
    </div>
  );
}
