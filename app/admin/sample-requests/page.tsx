import { AdminShell } from "@/components/admin/AdminShell";
import { SampleRequestsTable } from "@/components/admin/SampleRequestsTable";
import { sampleRequestsStore } from "@/lib/store";

export default async function AdminSampleRequestsPage() {
  const requests = await sampleRequestsStore.all();

  return (
    <AdminShell>
      <h1 className="font-display text-3xl text-charcoal">Sample Requests</h1>
      <p className="mt-2 font-sans text-sm text-charcoal-soft">Physical sample requests submitted from finish and sample-request pages.</p>
      <div className="mt-8">
        <SampleRequestsTable requests={requests} />
      </div>
    </AdminShell>
  );
}
