import { AdminShell } from "@/components/admin/AdminShell";
import { ArticlesManager } from "@/components/admin/ArticlesManager";
import { articlesStore } from "@/lib/store";

export default async function AdminArticlesPage() {
  const articles = await articlesStore.all();

  return (
    <AdminShell>
      <h1 className="font-display text-3xl text-charcoal">Journal Articles</h1>
      <p className="mt-2 font-sans text-sm text-charcoal-soft">Publish notes and stories to the public Journal.</p>
      <div className="mt-8">
        <ArticlesManager articles={articles} />
      </div>
    </AdminShell>
  );
}
