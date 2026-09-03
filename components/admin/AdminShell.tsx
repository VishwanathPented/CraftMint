"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const links = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/leads", label: "Leads" },
  { href: "/admin/sample-requests", label: "Sample Requests" },
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/finishes", label: "Finishes" },
  { href: "/admin/resources", label: "Resources" },
  { href: "/admin/articles", label: "Articles" },
  { href: "/admin/settings", label: "Settings" },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen bg-ivory">
      <aside className="hidden w-64 shrink-0 flex-col border-r border-line bg-limestone/60 p-6 lg:flex">
        <Link href="/" className="font-display text-xl text-charcoal">
          Craftmint <span className="text-mint">Admin</span>
        </Link>
        <nav className="mt-10 flex flex-col gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-sm px-3 py-2 font-sans text-sm transition-colors",
                pathname === link.href ? "bg-charcoal text-ivory" : "text-charcoal-soft hover:bg-charcoal/5",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <button
          type="button"
          onClick={logout}
          className="mt-auto rounded-sm px-3 py-2 text-left font-sans text-sm text-charcoal-soft hover:bg-charcoal/5"
        >
          Log out
        </button>
      </aside>
      <div className="flex-1 overflow-x-hidden">
        <div className="flex items-center justify-between border-b border-line p-4 lg:hidden">
          <span className="font-display text-lg text-charcoal">Craftmint Admin</span>
          <button type="button" onClick={logout} className="font-sans text-xs uppercase tracking-[0.08em] text-charcoal-soft">
            Log out
          </button>
        </div>
        <main className="p-6 lg:p-10">{children}</main>
      </div>
    </div>
  );
}
