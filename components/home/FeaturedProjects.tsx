import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LinkButton } from "@/components/ui/Button";
import { ProjectCard } from "@/components/projects/ProjectCard";
import type { Project } from "@/types";

export function FeaturedProjects({ projects }: { projects: Project[] }) {
  return (
    <section className="py-24 lg:py-32">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Projects We've Brought To Life"
            title="Material, in place"
            className="max-w-2xl"
          />
          <LinkButton href="/projects" variant="secondary" className="shrink-0">
            View All Projects
          </LinkButton>
        </div>

        {projects.length > 0 ? (
          <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {projects.slice(0, 6).map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="mt-14 hairline flex flex-col items-center gap-4 px-6 py-20 text-center">
            <p className="font-display text-2xl text-charcoal">Our project archive is being curated</p>
            <p className="max-w-md font-sans text-sm text-charcoal-soft">
              Real project photography from Craftmint&rsquo;s work is being added here. In the meantime,
              explore the finishes and textures available for your own project.
            </p>
            <LinkButton href="/finishes" className="mt-2">
              Explore Finishes
            </LinkButton>
          </div>
        )}
      </Container>
    </section>
  );
}
