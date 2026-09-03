import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/types";

export function ProjectCard({ project, size = "md" }: { project: Project; size?: "md" | "lg" }) {
  return (
    <Link href={`/projects/${project.slug}`} className="group flex flex-col">
      <div
        className={`relative w-full overflow-hidden bg-limestone ${
          size === "lg" ? "aspect-[16/11]" : "aspect-[4/5]"
        }`}
      >
        {project.coverImage ? (
          <Image
            quality={95}
            src={project.coverImage}
            alt={project.title}
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center font-sans text-xs uppercase tracking-[0.1em] text-warm-grey">
            Image coming soon
          </div>
        )}
      </div>
      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-2xl text-charcoal">{project.title}</h3>
          <p className="mt-1 font-sans text-xs uppercase tracking-[0.1em] text-warm-grey">
            {project.location} {project.year ? `· ${project.year}` : ""}
          </p>
        </div>
        <span aria-hidden className="mt-1 font-sans text-sm text-charcoal transition-transform group-hover:translate-x-1">
          →
        </span>
      </div>
    </Link>
  );
}
