import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/layout/PageHero";
import { SwatchImage } from "@/components/finishes/SwatchImage";
import { finishes } from "@/data/finishes";

export const metadata: Metadata = {
  title: "Inspiration — Textures, Colours & Architectural Detail",
  description: "A visual gallery of textures, colours and architectural detail from the Craftmint material library.",
};

// "hero" entries are real interior/application photography (~1200px source) and
// can safely fill a tall masonry tile via object-cover. "swatch" entries are the
// short colourway crops (~978x276px) — asking them to fill the same tall tile
// would upscale them well past their native resolution, so they get a shorter
// tile and object-contain instead (see SwatchImage).
const gallery = [
  { image: finishes[0].heroImage, category: "Architecture", variant: "hero" as const },
  { image: finishes[3].swatches[0]?.image, category: "Textures", variant: "swatch" as const },
  { image: finishes[8].heroImage, category: "Materials", variant: "hero" as const },
  { image: finishes[9].swatches[4]?.image, category: "Colours", variant: "swatch" as const },
  { image: finishes[13].heroImage, category: "Architecture", variant: "hero" as const },
  { image: finishes[10].swatches[6]?.image, category: "Details", variant: "swatch" as const },
  { image: finishes[2].heroImage, category: "Interiors", variant: "hero" as const },
  { image: finishes[14].swatches[1]?.image, category: "Textures", variant: "swatch" as const },
  { image: finishes[5].swatches[0]?.image, category: "Colours", variant: "swatch" as const },
].filter((g): g is { image: string; category: string; variant: "hero" | "swatch" } => Boolean(g.image));

export default function InspirationPage() {
  return (
    <div>
      <PageHero
        eyebrow="Inspiration"
        title="Texture, colour and architectural detail"
        description="A visual gallery drawn from the Craftmint material library — for moodboards, specification and simple appreciation of material."
      />
      <Container className="pb-20 lg:pb-28">
        <div className="columns-2 gap-4 sm:columns-3 [&>*]:mb-4">
          {gallery.map((item, i) =>
            item.variant === "hero" ? (
              <div key={i} className="relative break-inside-avoid overflow-hidden">
                <Image
                  quality={95}
                  src={item.image}
                  alt={`${item.category} inspiration`}
                  width={600}
                  height={i % 3 === 0 ? 750 : 450}
                  sizes="(min-width: 640px) 66vw, 100vw"
                  className="w-full object-cover"
                />
                <span className="absolute left-3 top-3 bg-ivory/90 px-2.5 py-1 font-sans text-[10px] uppercase tracking-[0.1em] text-charcoal">
                  {item.category}
                </span>
              </div>
            ) : (
              <div key={i} className="relative aspect-[4/3] break-inside-avoid overflow-hidden">
                <SwatchImage src={item.image} alt={`${item.category} inspiration`} sizes="(min-width: 640px) 33vw, 50vw" />
                <span className="absolute left-3 top-3 z-10 bg-ivory/90 px-2.5 py-1 font-sans text-[10px] uppercase tracking-[0.1em] text-charcoal">
                  {item.category}
                </span>
              </div>
            ),
          )}
        </div>
      </Container>
    </div>
  );
}
