import { AdminShell } from "@/components/admin/AdminShell";
import { LeadsTable } from "@/components/admin/LeadsTable";
import { leadsStore } from "@/lib/store";

export default async function AdminLeadsPage() {
  const leads = await leadsStore.all();

  return (
    <AdminShell>
      <h1 className="font-display text-3xl text-charcoal">Leads</h1>
      <p className="mt-2 font-sans text-sm text-charcoal-soft">
        Enquiries submitted through the site&rsquo;s lead popup, contact form and bespoke enquiry form.
      </p>
      <div className="mt-8">
        <LeadsTable leads={leads} />
      </div>
    </AdminShell>
  );
}
