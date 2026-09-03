import { AdminShell } from "@/components/admin/AdminShell";
import { ProjectForm } from "@/components/admin/ProjectForm";

export default function NewProjectPage() {
  return (
    <AdminShell>
      <h1 className="font-display text-3xl text-charcoal">Add Project</h1>
      <div className="mt-8 max-w-3xl">
        <ProjectForm />
      </div>
    </AdminShell>
  );
}
