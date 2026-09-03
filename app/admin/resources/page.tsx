import { AdminShell } from "@/components/admin/AdminShell";
import { ResourcesManager } from "@/components/admin/ResourcesManager";
import { resourcesStore } from "@/lib/store";

export default async function AdminResourcesPage() {
  const resources = await resourcesStore.all();

  return (
    <AdminShell>
      <h1 className="font-display text-3xl text-charcoal">Resources</h1>
      <p className="mt-2 font-sans text-sm text-charcoal-soft">
        Technical data, guides and downloads shown on the public Resources page.
      </p>
      <div className="mt-8">
        <ResourcesManager resources={resources} />
      </div>
    </AdminShell>
  );
}
