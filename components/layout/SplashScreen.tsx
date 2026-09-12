"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const MIN_DISPLAY_MS = 600;
const FADE_MS = 500;

/**
 * Renders in the initial server HTML so it's visible before hydration on a
 * fresh load or reload, then fades out once the page (and its assets) have
 * finished loading.
 */
export function SplashScreen() {
  const [hidden, setHidden] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    const start = Date.now();

    const reveal = () => {
      const remaining = Math.max(MIN_DISPLAY_MS - (Date.now() - start), 0);
      window.setTimeout(() => setHidden(true), remaining);
    };

    if (document.readyState === "complete") {
      reveal();
    } else {
      window.addEventListener("load", reveal);
      return () => window.removeEventListener("load", reveal);
    }
  }, []);

  useEffect(() => {
    if (!hidden) return;
    const timeout = window.setTimeout(() => setRemoved(true), FADE_MS);
    return () => window.clearTimeout(timeout);
  }, [hidden]);

  if (removed) return null;

  return (
    <div
      aria-hidden
      className={cn(
        "fixed inset-0 z-[100] flex items-center justify-center bg-ivory transition-opacity ease-out",
        hidden ? "pointer-events-none opacity-0" : "opacity-100"
      )}
      style={{ transitionDuration: `${FADE_MS}ms` }}
    >
      <Image
        src="/images/Logos/craftmint-logo.png"
        alt="CraftMint"
        width={231}
        height={117}
        priority
        className="h-14 w-auto md:h-16"
      />
    </div>
  );
}
