import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { LinkButton } from "@/components/ui/Button";
import { FinishCard } from "@/components/finishes/FinishCard";
import { VideoLightbox } from "@/components/ui/VideoLightbox";
import { projectsStore } from "@/lib/store";
import { finishes } from "@/data/finishes";
import { extractYouTubeId } from "@/lib/youtube";

async function getProject(slug: string) {
  const all = await projectsStore.all();
  return all.find((p) => p.slug === slug && p.published);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return {};
  return { title: project.title, description: project.description };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  const usedFinishes = finishes.filter((f) => project.finishSlugs.includes(f.slug));
  const videoId = extractYouTubeId(project.videoUrl);

  return (
    <div>
      <section className="relative flex h-[70vh] min-h-[480px] items-end bg-charcoal">
        {project.coverImage && (
          <Image quality={95} src={project.coverImage} alt={project.title} fill priority sizes="100vw" className="object-cover opacity-90" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/10 to-transparent" />
        <Container className="relative z-10 pb-14">
          <Eyebrow className="text-ivory/70">{project.projectType.join(" · ")}</Eyebrow>
          <h1 className="mt-3 font-display text-5xl text-ivory sm:text-6xl">{project.title}</h1>
          <p className="mt-3 font-sans text-sm text-ivory/75">
            {project.location} {project.year ? `· ${project.year}` : ""}
          </p>
        </Container>
      </section>

      <section className="py-20 lg:py-28">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <Eyebrow>The Project</Eyebrow>
              <p className="mt-4 font-display text-2xl leading-snug text-charcoal">{project.description}</p>
            </div>
            <dl className="grid grid-cols-2 gap-6 self-start border-t border-line pt-6 lg:col-span-1 lg:border-t-0 lg:border-l lg:pl-10 lg:pt-0">
              {[
                ["Architect", project.architect],
                ["Designer", project.designer],
                ["Client", project.client],
                ["Area", project.area],
                ["Colour", project.colour],
                ["Products Used", project.productsUsed],
              ]
                .filter(([, v]) => v)
                .map(([label, value]) => (
                  <div key={label}>
                    <dt className="font-sans text-[11px] uppercase tracking-[0.16em] text-warm-grey">{label}</dt>
                    <dd className="mt-1 font-sans text-sm text-charcoal">{value}</dd>
                  </div>
                ))}
            </dl>
          </div>

          {(project.challenge || project.approach || project.solution) && (
            <div className="mt-16 grid grid-cols-1 gap-10 border-t border-line pt-16 sm:grid-cols-3">
              {project.challenge && (
                <div>
                  <Eyebrow>The Challenge</Eyebrow>
                  <p className="mt-3 font-sans text-sm leading-relaxed text-charcoal-soft">{project.challenge}</p>
                </div>
              )}
              {project.approach && (
                <div>
                  <Eyebrow>The Approach</Eyebrow>
                  <p className="mt-3 font-sans text-sm leading-relaxed text-charcoal-soft">{project.approach}</p>
                </div>
              )}
              {project.solution && (
                <div>
                  <Eyebrow>The Result</Eyebrow>
                  <p className="mt-3 font-sans text-sm leading-relaxed text-charcoal-soft">{project.solution}</p>
                </div>
              )}
            </div>
          )}
        </Container>
      </section>

      {project.galleryImages.length > 0 && (
        <section className="pb-20 lg:pb-28">
          <Container>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {project.galleryImages.map((img) => (
                <div key={img.id} className="relative aspect-[4/3] overflow-hidden bg-limestone">
                  <Image quality={95} src={img.url} alt={img.caption || project.title} fill sizes="50vw" className="object-cover" />
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {usedFinishes.length > 0 && (
        <section className="bg-limestone py-20 lg:py-28">
          <Container>
            <Eyebrow>Finishes Used</Eyebrow>
            <h2 className="mt-3 font-display text-3xl text-charcoal">The materials behind the project</h2>
            <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-12 sm:grid-cols-3">
              {usedFinishes.map((f) => (
                <FinishCard key={f.id} finish={f} />
              ))}
            </div>
          </Container>
        </section>
      )}

      {videoId && (
        <section className="py-20 lg:py-28">
          <Container>
            <Eyebrow>The Process</Eyebrow>
            <h2 className="mt-3 font-display text-3xl text-charcoal">See how it was created</h2>
            <div className="mt-10 max-w-3xl">
              <VideoLightbox
                youtubeId={videoId}
                title={`${project.title} — application process`}
                label="Watch the Process"
                className="aspect-video"
              />
            </div>
          </Container>
        </section>
      )}

      <section className="bg-charcoal py-20 text-center lg:py-24">
        <Container>
          <h2 className="font-display text-3xl text-ivory sm:text-4xl">Have a similar space in mind?</h2>
          <div className="mt-8 flex justify-center gap-4">
            <LinkButton href="/contact" size="lg" className="bg-ivory text-charcoal hover:bg-ivory/85">
              Start Your Project
            </LinkButton>
          </div>
        </Container>
      </section>
    </div>
  );
}
