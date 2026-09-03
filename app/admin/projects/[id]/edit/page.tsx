import { notFound } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { ProjectForm } from "@/components/admin/ProjectForm";
import { projectsStore } from "@/lib/store";

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await projectsStore.find(id);
  if (!project) notFound();

  return (
    <AdminShell>
      <h1 className="font-display text-3xl text-charcoal">Edit Project</h1>
      <div className="mt-8 max-w-3xl">
        <ProjectForm project={project} />
      </div>
    </AdminShell>
  );
}
