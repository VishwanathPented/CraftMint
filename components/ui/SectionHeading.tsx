import { cn } from "@/lib/utils";

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "block font-sans text-[11px] font-medium uppercase tracking-[0.28em] text-warm-grey",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  titleClassName,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
  titleClassName?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-4", align === "center" && "items-center text-center", className)}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2
        className={cn(
          "font-display text-4xl leading-[1.05] tracking-tight text-charcoal text-balance sm:text-5xl lg:text-6xl",
          titleClassName,
        )}
      >
        {title}
      </h2>
      {description && (
        <p className={cn("max-w-xl font-sans text-base leading-relaxed text-charcoal-soft", align === "center" && "mx-auto")}>
          {description}
        </p>
      )}
    </div>
  );
}
