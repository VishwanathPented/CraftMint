import Link from "next/link";
import { AdminShell } from "@/components/admin/AdminShell";
import { ProjectsTable } from "@/components/admin/ProjectsTable";
import { Button } from "@/components/ui/Button";
import { projectsStore } from "@/lib/store";

export default async function AdminProjectsPage() {
  const projects = await projectsStore.all();

  return (
    <AdminShell>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl text-charcoal">Projects</h1>
          <p className="mt-2 font-sans text-sm text-charcoal-soft">Add, edit, publish and feature project case studies.</p>
        </div>
        <Link href="/admin/projects/new">
          <Button>Add Project</Button>
        </Link>
      </div>
      <ProjectsTable projects={projects} />
    </AdminShell>
  );
}
