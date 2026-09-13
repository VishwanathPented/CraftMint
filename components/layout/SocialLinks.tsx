import { contactInfo } from "@/data/contact";
import { cn } from "@/lib/utils";

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="7.8" cy="8.2" r="1.15" fill="currentColor" />
      <path d="M7.8 11v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path
        d="M12 11v6M12 13.4c0-1.6 1-2.6 2.3-2.6 1.5 0 2.2 1 2.2 2.8V17"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SocialLinks({ variant = "light", className }: { variant?: "light" | "dark"; className?: string }) {
  const linkClass = variant === "dark" ? "text-ivory/70 hover:text-ivory" : "text-charcoal-soft hover:text-charcoal";

  return (
    <div className={cn("flex items-center gap-4", className)}>
      <a
        href={contactInfo.instagram}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="CraftMint on Instagram"
        className={cn("transition-colors", linkClass)}
      >
        <InstagramIcon />
      </a>
      <a
        href={contactInfo.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="CraftMint on LinkedIn"
        className={cn("transition-colors", linkClass)}
      >
        <LinkedInIcon />
      </a>
    </div>
  );
}
