import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function MaterialSwatchCard({
  image,
  alt,
  name,
  meta,
  href,
  priority,
  sizes = "(min-width: 1024px) 22vw, (min-width: 640px) 46vw, 92vw",
  className,
}: {
  image: string;
  alt: string;
  name: string;
  meta?: string;
  href?: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
}) {
  const content = (
    <>
      <div className="flex items-center justify-center bg-limestone p-6 sm:p-8">
        {/*
          Fixed frame, same on every card, so a row of mixed-aspect swatch
          crops still reads as a uniform grid. object-contain (never cover)
          means the source is scaled down to fit but never cropped, stretched
          or upscaled beyond its native pixels — narrower crops are simply
          matted by more of the ivory frame either side.
        */}
        <div className="relative h-32 w-full overflow-hidden border border-line/70 bg-ivory shadow-[0_1px_3px_rgba(33,30,26,0.08)] transition-shadow duration-300 ease-out group-hover/swatch:shadow-[0_6px_20px_-8px_rgba(33,30,26,0.25)] sm:h-36 lg:h-40">
          <Image
            quality={95}
            src={image}
            alt={alt}
            fill
            priority={priority}
            sizes={sizes}
            className="object-contain p-2 transition-transform duration-500 ease-out group-hover/swatch:scale-[1.03]"
          />
        </div>
      </div>
      <div className="mt-4">
        <h3 className="font-display text-lg text-charcoal">{name}</h3>
        {meta && <p className="mt-1 font-sans text-xs uppercase tracking-[0.1em] text-warm-grey">{meta}</p>}
      </div>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={cn("group/swatch focus-ring flex flex-col", className)}>
        {content}
      </Link>
    );
  }

  return <div className={cn("group/swatch flex flex-col", className)}>{content}</div>;
}
