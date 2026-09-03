import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * The supplied colourway/swatch photography (texture_swatches, material_samples,
 * unknown, wall_finishes folders) are short, wide crops — commonly ~978×276px,
 * some narrower. That's a real, fixed resolution ceiling: it isn't a card photo,
 * it's a strip.
 *
 * Displaying them with `object-fit: cover` inside a square or portrait box forces
 * the browser to scale the image up until its (short) height fills the box,
 * which is what was producing the blur — `sizes` alone can't fix this, because
 * next/image's `sizes` only budgets for the box's *width*, not for how far
 * `cover` will stretch a mismatched-aspect source to fill the height.
 *
 * This component uses `object-fit: contain` instead, so the swatch is never
 * asked to render past its native pixels — it letterboxes on a neutral
 * background rather than being cropped-and-blown-up. Use it anywhere a specific
 * colourway/swatch image is the point (colour pickers, the texture viewer) —
 * not for general finish/application photography, which has real resolution to
 * spare and should keep using `next/image` + `object-cover` directly.
 */
export function SwatchImage({
  src,
  alt,
  sizes,
  priority,
  className,
}: {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("absolute inset-0 bg-limestone", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        quality={95}
        sizes={sizes}
        priority={priority}
        className="object-contain"
      />
    </div>
  );
}
