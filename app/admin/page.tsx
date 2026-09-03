import Link from "next/link";
import { AdminShell } from "@/components/admin/AdminShell";
import { leadsStore, sampleRequestsStore, projectsStore, resourcesStore, articlesStore } from "@/lib/store";
import { finishes } from "@/data/finishes";

export default async function AdminDashboard() {
  const [leads, samples, projects, resources, articles] = await Promise.all([
    leadsStore.all(),
    sampleRequestsStore.all(),
    projectsStore.all(),
    resourcesStore.all(),
    articlesStore.all(),
  ]);

  const stats = [
    { label: "New Leads", value: leads.filter((l) => l.status === "New").length, href: "/admin/leads" },
    { label: "Sample Requests", value: samples.length, href: "/admin/sample-requests" },
    { label: "Published Projects", value: projects.filter((p) => p.published).length, href: "/admin/projects" },
    { label: "Finishes", value: finishes.length, href: "/admin/finishes" },
    { label: "Resources", value: resources.length, href: "/admin/resources" },
    { label: "Articles", value: articles.length, href: "/admin/articles" },
  ];

  return (
    <AdminShell>
      <h1 className="font-display text-3xl text-charcoal">Dashboard</h1>
      <p className="mt-2 font-sans text-sm text-charcoal-soft">An overview of enquiries and content.</p>

      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {stats.map((s) => (
          <Link key={s.label} href={s.href} className="hairline flex flex-col gap-2 p-5 transition-colors hover:border-charcoal">
            <span className="font-display text-3xl text-charcoal">{s.value}</span>
            <span className="font-sans text-xs uppercase tracking-[0.08em] text-warm-grey">{s.label}</span>
          </Link>
        ))}
      </div>

      <div className="mt-14">
        <h2 className="font-display text-xl text-charcoal">Recent Leads</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse font-sans text-sm">
            <thead>
              <tr className="border-b border-line text-left text-xs uppercase tracking-[0.08em] text-warm-grey">
                <th className="py-3 pr-4">Name</th>
                <th className="py-3 pr-4">Email</th>
                <th className="py-3 pr-4">Source</th>
                <th className="py-3 pr-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {leads.slice(0, 6).map((lead) => (
                <tr key={lead.id} className="border-b border-line/60">
                  <td className="py-3 pr-4 text-charcoal">{lead.name}</td>
                  <td className="py-3 pr-4 text-charcoal-soft">{lead.email}</td>
                  <td className="py-3 pr-4 text-charcoal-soft">{lead.source}</td>
                  <td className="py-3 pr-4 text-charcoal-soft">{lead.status}</td>
                </tr>
              ))}
              {leads.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-6 text-center text-warm-grey">
                    No leads yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminShell>
  );
}
