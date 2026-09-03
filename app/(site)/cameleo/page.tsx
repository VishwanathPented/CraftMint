import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { LinkButton } from "@/components/ui/Button";
import { PageHero } from "@/components/layout/PageHero";
import { VideoLightbox } from "@/components/ui/VideoLightbox";
import { finishes } from "@/data/finishes";
import { cameleoVideos } from "@/data/cameleoVideos";

export const metadata: Metadata = {
  title: "Cameleo Deco Coatings, Poland",
  description: "Craftmint works with Cameleo Deco Coatings, Poland, and imports selected materials from Poland for Indian projects.",
};

export default function CameleoPage() {
  return (
    <div>
      <PageHero eyebrow="European Materials" title="Crafted for Indian spaces." image={finishes[8].heroImage} />

      <section className="py-20 lg:py-28">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>The Partnership</Eyebrow>
            <p className="mt-4 font-display text-2xl leading-snug text-charcoal sm:text-3xl">
              Craftmint works with Cameleo Deco Coatings, Poland, and imports selected materials from Poland
              for Indian projects.
            </p>
            <p className="mt-6 font-sans text-base leading-relaxed text-charcoal-soft">
              This relationship brings European decorative coating material to Indian architecture and
              interiors, paired with Craftmint&rsquo;s own project execution on the ground — from material
              selection and sampling through to application and handover.
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
              materials Craftmint imports and applies on Indian projects.
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
        <Container className="mx-auto max-w-2xl text-center">
          <p className="font-sans text-sm leading-relaxed text-warm-grey">
            Craftmint LLP is an importer and project execution partner working with Cameleo Deco Coatings,
            Poland. Specific distribution status, product ranges and certifications are confirmed on
            request and will be detailed here as they are finalised.
          </p>
          <div className="mt-8 flex justify-center gap-4">
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
