"use client";

import { useMemo, useState } from "react";
import { ProjectCard } from "./ProjectCard";
import { cn } from "@/lib/utils";
import type { Project, ProjectType } from "@/types";

const TYPES: (ProjectType | "All")[] = [
  "All",
  "Residential",
  "Hospitality",
  "Restaurant",
  "Retail",
  "Office",
  "Commercial",
  "Villa",
  "Apartment",
  "Flooring",
  "Exterior",
];

export function ProjectExplorer({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<(typeof TYPES)[number]>("All");

  const filtered = useMemo(() => {
    if (active === "All") return projects;
    return projects.filter((p) => p.projectType.includes(active as ProjectType));
  }, [projects, active]);

  return (
    <div>
      <div className="flex flex-wrap gap-2 border-b border-line pb-8">
        {TYPES.map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => setActive(type)}
            aria-pressed={active === type}
            className={cn(
              "border px-4 py-2 font-sans text-xs uppercase tracking-[0.08em] transition-colors",
              active === type ? "border-charcoal bg-charcoal text-ivory" : "border-line text-charcoal-soft hover:border-charcoal",
            )}
          >
            {type}
          </button>
        ))}
      </div>

      {filtered.length > 0 ? (
        <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2">
          {filtered.map((project, i) => (
            <div key={project.id} className={i % 3 === 0 ? "sm:col-span-2" : ""}>
              <ProjectCard project={project} size={i % 3 === 0 ? "lg" : "md"} />
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-14 flex flex-col items-center gap-3 py-20 text-center">
          <p className="font-display text-2xl text-charcoal">No projects in this category yet</p>
          <p className="max-w-sm font-sans text-sm text-charcoal-soft">
            Craftmint&rsquo;s project archive is growing. Check back soon, or start a project of your own.
          </p>
        </div>
      )}
    </div>
  );
}
