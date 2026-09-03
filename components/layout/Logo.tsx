import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * The supplied brand lockup is a transparent PNG, so it now drops cleanly
 * onto any surface (light navbar, dark footer) without the mix-blend-multiply
 * hack the old white-plate JPG needed.
 */
export function Logo({ variant = "light", className }: { variant?: "light" | "dark"; className?: string }) {
  return (
    <Link href="/" className={cn("flex items-center gap-3", className)}>
      <Image
        quality={95}
        src="/images/Logos/craftmint-logo.png"
        alt="Craftmint LLP"
        width={231}
        height={117}
        priority
        className={cn("h-12 w-auto md:h-14", variant === "dark" && "brightness-0 invert")}
      />
    </Link>
  );
}
