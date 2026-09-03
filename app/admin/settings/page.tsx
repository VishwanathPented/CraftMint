import { AdminShell } from "@/components/admin/AdminShell";

export default function AdminSettingsPage() {
  return (
    <AdminShell>
      <h1 className="font-display text-3xl text-charcoal">Settings</h1>
      <p className="mt-2 max-w-2xl font-sans text-sm text-charcoal-soft">
        Admin access and data storage are currently configured through environment variables rather than
        this screen.
      </p>

      <div className="mt-8 flex flex-col gap-6 max-w-2xl">
        <div className="hairline p-6">
          <p className="font-display text-lg text-charcoal">Admin Password</p>
          <p className="mt-2 font-sans text-sm text-charcoal-soft">
            Set via the <code className="font-mono text-xs">ADMIN_PASSWORD</code> environment variable. Change it
            by updating your <code className="font-mono text-xs">.env.local</code> file (or your hosting
            provider&rsquo;s environment settings) and redeploying.
          </p>
        </div>
        <div className="hairline p-6">
          <p className="font-display text-lg text-charcoal">Data Storage</p>
          <p className="mt-2 font-sans text-sm text-charcoal-soft">
            Leads, sample requests, projects, resources and articles are currently stored as local JSON
            files under <code className="font-mono text-xs">lib/db/</code>. This is intended for local
            development and small-scale use — for production, connect a real database such as Supabase and
            replace the functions in <code className="font-mono text-xs">lib/store.ts</code>. No other file
            needs to change, since every page reads through that module.
          </p>
        </div>
        <div className="hairline p-6">
          <p className="font-display text-lg text-charcoal">Image Uploads</p>
          <p className="mt-2 font-sans text-sm text-charcoal-soft">
            Project and article images uploaded from this admin are stored under{" "}
            <code className="font-mono text-xs">public/uploads/</code>. For production hosting on a
            serverless platform, point this at object storage (e.g. Supabase Storage or S3) instead, since
            serverless filesystems are read-only at runtime.
          </p>
        </div>
      </div>
    </AdminShell>
  );
}
