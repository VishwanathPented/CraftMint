"use client";

import { useEffect } from "react";
import Link from "next/link";
import { primaryNav, finishesMegaMenu } from "@/data/navigation";
import { cn } from "@/lib/utils";
import { LinkButton } from "@/components/ui/Button";

export function MobileNav({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div
      className={cn(
        "fixed inset-0 z-[90] bg-ivory transition-transform duration-500 ease-out lg:hidden",
        open ? "translate-x-0" : "translate-x-full pointer-events-none",
      )}
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation"
    >
      <div className="flex h-full flex-col overflow-y-auto px-6 pb-10 pt-24">
        <nav className="flex flex-col gap-1">
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className="border-b border-line py-4 font-display text-3xl text-charcoal"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="mt-8">
          <p className="font-sans text-[11px] font-medium uppercase tracking-[0.24em] text-warm-grey">
            Explore by application
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {finishesMegaMenu.byApplication.map((item) => (
              <Link
                key={item.label}
                href={`/finishes?${item.param}=${item.value}`}
                onClick={onClose}
                className="hairline px-4 py-2 font-sans text-xs uppercase tracking-[0.08em] text-charcoal-soft"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3">
          <LinkButton href="/sample-request" variant="primary" size="lg" onClick={onClose} className="w-full">
            Request a Sample
          </LinkButton>
          <LinkButton href="/contact" variant="secondary" size="lg" onClick={onClose} className="w-full">
            Enquire
          </LinkButton>
        </div>
      </div>
    </div>
  );
}
