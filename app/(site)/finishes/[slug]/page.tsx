import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { LinkButton } from "@/components/ui/Button";
import { Accordion } from "@/components/ui/Accordion";
import { ColourExplorer } from "@/components/finishes/ColourExplorer";
import { FinishCard } from "@/components/finishes/FinishCard";
import { VideoLightbox } from "@/components/ui/VideoLightbox";
import { finishes, getFinishBySlug, getRelatedFinishes } from "@/data/finishes";
import { getFinishTechniqueVideo } from "@/data/cameleoVideos";

export function generateStaticParams() {
  return finishes.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const finish = getFinishBySlug(slug);
  if (!finish) return {};
  return {
    title: `${finish.name} — ${finish.category} Finish`,
    description: finish.description,
  };
}

export default async function FinishDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const finish = getFinishBySlug(slug);
  if (!finish) notFound();

  const related = getRelatedFinishes(finish);
  const techniqueVideo = getFinishTechniqueVideo(finish);

  return (
    <div>
      <section className="relative flex h-[70vh] min-h-[480px] items-end bg-charcoal">
        <Image
          quality={95}
          src={finish.heroImage}
          alt={`${finish.name} applied finish`}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/10 to-transparent" />
        <Container className="relative z-10 pb-14">
          <Eyebrow className="text-ivory/70">{finish.category} Finish</Eyebrow>
          <h1 className="mt-3 font-display text-5xl text-ivory sm:text-6xl">{finish.name}</h1>
          <p className="mt-4 max-w-lg font-sans text-sm leading-relaxed text-ivory/80">{finish.description}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <LinkButton href={`/sample-request?finish=${finish.slug}`} size="lg" className="bg-ivory text-charcoal hover:bg-ivory/85">
              Request Sample
            </LinkButton>
            <LinkButton href={`/contact?finish=${finish.slug}`} size="lg" variant="outline-light">
              Enquire About This Finish
            </LinkButton>
          </div>
        </Container>
      </section>

      <section className="py-20 lg:py-28">
        <Container>
          <Eyebrow>The Surface</Eyebrow>
          <p className="mt-3 max-w-2xl font-display text-2xl leading-snug text-charcoal sm:text-3xl">
            {finish.characterNote}
          </p>
          <div className="mt-10">
            <ColourExplorer finish={finish} />
          </div>
        </Container>
      </section>

      {finish.applicationImages.length > 0 && (
        <section className="py-20 lg:py-28">
          <Container>
            <Eyebrow>The Finish In Space</Eyebrow>
            <h2 className="mt-3 font-display text-3xl text-charcoal">Seen in application</h2>
            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {finish.applicationImages.map((img) => (
                <div key={img} className="relative aspect-[4/3] overflow-hidden bg-limestone">
                  <Image quality={95} src={img} alt={`${finish.name} in an interior application`} fill sizes="50vw" className="object-cover" />
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {techniqueVideo && (
        <section className="py-20 lg:py-28">
          <Container>
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
              <div className={finish.applicationImages.length > 0 ? "lg:order-2" : undefined}>
                <Eyebrow>Application Technique</Eyebrow>
                <h2 className="mt-3 font-display text-3xl text-charcoal">See how this effect is created</h2>
                <p className="mt-4 max-w-md font-sans text-sm leading-relaxed text-charcoal-soft">
                  A demonstration of this decorative technique from Cameleo, our European material partner,
                  whose coatings Craftmint imports and applies on Indian projects.
                </p>
              </div>
              <VideoLightbox
                youtubeId={techniqueVideo.youtubeId}
                title={techniqueVideo.title}
                label="Watch Application"
                className={finish.applicationImages.length > 0 ? "aspect-video lg:order-1" : "aspect-video"}
              />
            </div>
          </Container>
        </section>
      )}

      <section className="bg-limestone py-20 lg:py-28">
        <Container>
          <Eyebrow>Technical Information</Eyebrow>
          <h2 className="mt-3 font-display text-3xl text-charcoal">What to know before you specify</h2>
          <div className="mt-10 max-w-3xl">
            <Accordion
              items={[
                {
                  question: "Description",
                  answer: finish.description,
                },
                {
                  question: "Application",
                  answer:
                    "Application method and system build-up are confirmed with the Craftmint team at project stage, based on substrate and site conditions.",
                },
                {
                  question: "Surface Preparation",
                  answer: "Surface preparation requirements are assessed per project and confirmed prior to execution.",
                },
                {
                  question: "Coverage",
                  answer: "Coverage varies by substrate and application method — final figures are confirmed during specification.",
                },
                {
                  question: "Drying & Curing",
                  answer: "Drying and curing times are confirmed based on the specific system and site conditions used.",
                },
                {
                  question: "Maintenance",
                  answer: "General maintenance guidance is provided at handover; detailed care sheets are available on request.",
                },
                {
                  question: "Technical Data",
                  answer: "Full technical data sheets are being prepared and will be available for download here.",
                },
                {
                  question: "Sustainability",
                  answer: "Sustainability information is confirmed with our material partners and shared on request.",
                },
                {
                  question: "Installation",
                  answer: "Craftmint offers end-to-end execution — from substrate preparation through to final finishing — for this surface.",
                },
              ]}
            />
          </div>
          <div className="mt-8">
            <LinkButton href="/resources" variant="secondary">
              Download Technical Data
            </LinkButton>
          </div>
        </Container>
      </section>

      {related.length > 0 && (
        <section className="py-20 lg:py-28">
          <Container>
            <Eyebrow>Related Finishes</Eyebrow>
            <h2 className="mt-3 font-display text-3xl text-charcoal">You may also like</h2>
            <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-12 sm:grid-cols-3">
              {related.map((f) => (
                <FinishCard key={f.id} finish={f} />
              ))}
            </div>
          </Container>
        </section>
      )}

      <section className="bg-charcoal py-20 text-center lg:py-24">
        <Container>
          <h2 className="font-display text-3xl text-ivory sm:text-4xl">Ready to see it in person?</h2>
          <p className="mx-auto mt-3 max-w-md font-sans text-sm text-ivory/70">
            Request a physical sample of {finish.name} and evaluate it in your own space and light.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <LinkButton href={`/sample-request?finish=${finish.slug}`} size="lg" className="bg-ivory text-charcoal hover:bg-ivory/85">
              Request a Sample
            </LinkButton>
          </div>
        </Container>
      </section>
    </div>
  );
}
