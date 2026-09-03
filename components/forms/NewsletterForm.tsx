"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error();
      setStatus("done");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return <p className="font-sans text-sm text-mint">Thank you — you&rsquo;re on the list.</p>;
  }

  return (
    <form onSubmit={onSubmit} className="flex w-full max-w-md items-end gap-3 border-b border-ivory/25 pb-3">
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email address"
        className="w-full bg-transparent font-sans text-sm text-ivory placeholder:text-ivory/40 focus:outline-none"
      />
      <Button type="submit" variant="outline-light" size="md" disabled={status === "loading"}>
        {status === "loading" ? "Sending…" : "Subscribe"}
      </Button>
      {status === "error" && <p className="text-xs text-terracotta">Something went wrong.</p>}
    </form>
  );
}
