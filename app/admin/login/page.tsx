"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Incorrect password");
      }
      router.push(searchParams.get("next") || "/admin");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-limestone px-6">
      <form onSubmit={onSubmit} className="w-full max-w-sm bg-ivory p-10 shadow-[0_24px_60px_-24px_rgba(33,30,26,0.35)]">
        <p className="font-display text-2xl text-charcoal">Craftmint Admin</p>
        <p className="mt-2 font-sans text-sm text-charcoal-soft">Sign in to manage leads, projects and content.</p>
        <div className="mt-8">
          <label htmlFor="password" className="font-sans text-xs uppercase tracking-[0.08em] text-warm-grey">
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="focus-ring mt-1.5 w-full border-b border-line bg-transparent py-2 font-sans text-sm text-charcoal focus:border-charcoal"
          />
        </div>
        {error && <p className="mt-3 font-sans text-xs text-terracotta">{error}</p>}
        <Button type="submit" size="lg" className="mt-8 w-full" disabled={loading}>
          {loading ? "Signing in…" : "Sign In"}
        </Button>
      </form>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
