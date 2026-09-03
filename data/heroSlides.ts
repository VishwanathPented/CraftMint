export type HeroSlide = {
  image: string;
  alt: string;
};

/**
 * Curated from the existing finish hero photography (see data/finishes.ts /
 * lib/generated/finish-assets.json) — a coherent spread of surface types for
 * the landing-page carousel, deliberately distinct from the finishes shown
 * immediately below in FeaturedFinishes.
 */
export const heroSlides: HeroSlide[] = [
  {
    image: "/images/textures/p30_img01.webp",
    alt: "Sculptural architectural concrete effect with bold trowel-worked relief",
  },
  {
    image: "/images/textures/p16_img01.webp",
    alt: "Dark, mineral-flecked concrete effect finish for commercial interiors",
  },
  {
    image: "/images/textures/p24_img01.webp",
    alt: "Mottled natural stone-effect wall finish in warm grey and beige",
  },
  {
    image: "/images/textures/p22_img01.webp",
    alt: "Polished stone-effect surface in deep blue-grey with fine mineral flecking",
  },
  {
    image: "/images/textures/p32_img01.webp",
    alt: "Heavily textured, hand-worked plaster finish with pronounced trowel plates",
  },
  {
    image: "/images/textures/p34_img01.webp",
    alt: "Fine, sand-textured mineral finish suited to interior and exterior walls",
  },
];
