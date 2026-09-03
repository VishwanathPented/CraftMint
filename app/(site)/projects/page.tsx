import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LinkButton } from "@/components/ui/Button";
import { ProjectExplorer } from "@/components/projects/ProjectExplorer";
import { projectsStore } from "@/lib/store";

export const metadata: Metadata = {
  title: "Projects — Architectural Finishes in Real Spaces",
  description: "Craftmint's project portfolio — decorative finishes, textures and architectural surfaces executed end-to-end.",
};

export default async function ProjectsPage() {
  const projects = (await projectsStore.all()).filter((p) => p.published);

  return (
    <div className="py-16 lg:py-20">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Portfolio"
            title="Projects we've brought to life"
            description="A growing archive of the spaces Craftmint has helped finish — from feature walls to full interiors."
            className="max-w-2xl"
          />
          <LinkButton href="/contact" variant="secondary" className="shrink-0">
            Start Your Project
          </LinkButton>
        </div>
        <div className="mt-14">
          <ProjectExplorer projects={projects} />
        </div>
      </Container>
    </div>
  );
}
