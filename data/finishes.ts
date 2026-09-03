import finishAssets from "@/lib/generated/finish-assets.json";
import type {
  ApplicationArea,
  ColourFamily,
  Finish,
  FinishCategory,
  FinishStyle,
  Sheen,
  TextureType,
} from "@/types";

/**
 * Curated design metadata for each of the 17 finish groups recovered from the
 * supplied catalogue photography (see scripts/build-finish-assets.mjs).
 *
 * These are original design-led classifications derived from looking at the
 * actual texture/colour photography — not manufacturer specification sheets.
 * Names are deliberately placeholders (FINISH 01, 02 ...) until a real
 * product catalogue is supplied; everything here is structured so those
 * fields can be replaced later without touching the UI.
 */
type CuratedFinish = {
  page: number;
  name: string;
  category: FinishCategory;
  textureType: TextureType;
  sheen: Sheen;
  styles: FinishStyle[];
  applications: ApplicationArea[];
  colourFamilies: ColourFamily[];
  description: string;
  characterNote: string;
};

const CURATED: CuratedFinish[] = [
  {
    page: 5,
    name: "FINISH 01",
    category: "Concrete",
    textureType: "Medium",
    sheen: "Matte",
    styles: ["Industrial", "Contemporary"],
    applications: ["Hospitality", "Commercial"],
    colourFamilies: ["Grey", "Beige"],
    description:
      "A restrained concrete-effect surface with a soft, chalky grain — quietly architectural, built for spaces that let material do the talking.",
    characterNote:
      "Reads as raw poured concrete at a distance, resolving into a fine granular texture up close, with gentle tonal variation across the surface.",
  },
  {
    page: 7,
    name: "FINISH 02",
    category: "Stucco",
    textureType: "Fine",
    sheen: "Matte",
    styles: ["Minimal", "Contemporary"],
    applications: ["Retail", "Residential"],
    colourFamilies: ["Beige", "Sand"],
    description:
      "A fine, tightly-worked plaster finish with a soft sandy grain — warm, even and unobtrusive against considered interior schemes.",
    characterNote:
      "A close, uniform grain with subtle directional hand-marks left by the trowel, catching light without ever appearing glossy.",
  },
  {
    page: 9,
    name: "FINISH 03",
    category: "Textured",
    textureType: "Medium",
    sheen: "Satin",
    styles: ["Luxury", "Industrial"],
    applications: ["Retail", "Hospitality"],
    colourFamilies: ["Dark", "Grey"],
    description:
      "A deep charcoal textured plaster with a soft satin lift — dramatic in low light, ideal for feature walls and considered thresholds.",
    characterNote:
      "Dense, cloud-like texture with a faint sheen that shifts as light moves across the wall.",
  },
  {
    page: 11,
    name: "FINISH 04",
    category: "Concrete",
    textureType: "Rough",
    sheen: "Satin",
    styles: ["Industrial", "Artistic"],
    applications: ["Commercial", "Exterior"],
    colourFamilies: ["Brown", "Dark"],
    description:
      "A heavily worked sculptural concrete effect with visible trowel movement — an expressive, artisanal take on architectural concrete.",
    characterNote:
      "Deep relief and directional strokes with fine mineral flecking catching light at an angle.",
  },
  {
    page: 13,
    name: "FINISH 05",
    category: "Metallic",
    textureType: "Medium",
    sheen: "Mid-sheen",
    styles: ["Luxury", "Contemporary"],
    applications: ["Hospitality", "Residential"],
    colourFamilies: ["Dark", "Metallic"],
    description:
      "A brushed, linear metallic finish in deep charcoal — a refined surface for hospitality interiors that want quiet drama.",
    characterNote:
      "Fine directional striations run through the surface, giving a brushed-metal impression under warm lighting.",
  },
  {
    page: 15,
    name: "FINISH 06",
    category: "Mineral",
    textureType: "Fine",
    sheen: "Matte",
    styles: ["Natural", "Minimal"],
    applications: ["Residential", "Office"],
    colourFamilies: ["White", "Sand"],
    description:
      "A pale, fine-grain mineral finish that reads almost like natural limestone — calm, tactile and light-reflective.",
    characterNote:
      "An even, sandy grain in warm off-white with faint natural inclusions across the surface.",
  },
  {
    page: 17,
    name: "FINISH 07",
    category: "Concrete",
    textureType: "Medium",
    sheen: "Satin",
    styles: ["Industrial", "Contemporary"],
    applications: ["Commercial", "Office"],
    colourFamilies: ["Grey", "Dark"],
    description:
      "A dark, mineral-flecked concrete effect with a faint satin lift — a confident, grounded surface for commercial interiors.",
    characterNote:
      "Fine sparkle within a deep grey base, visible only as light crosses the surface.",
  },
  {
    page: 19,
    name: "FINISH 08",
    category: "Mineral",
    textureType: "Fine",
    sheen: "Satin",
    styles: ["Natural", "Organic"],
    applications: ["Residential", "Hospitality"],
    colourFamilies: ["Terracotta", "Brown"],
    description:
      "A warm, earth-toned mineral finish in terracotta — an organic counterpoint to cooler architectural materials.",
    characterNote:
      "Smooth underlying grain with soft cloud-like tonal movement, reminiscent of burnished clay.",
  },
  {
    page: 21,
    name: "FINISH 09",
    category: "Decorative",
    textureType: "Medium",
    sheen: "Polished",
    styles: ["Artistic", "Luxury"],
    applications: ["Hospitality", "Retail"],
    colourFamilies: ["Green", "Metallic"],
    description:
      "An artistic patina-effect finish moving between verdigris green and oxidised copper — a genuinely decorative, statement surface.",
    characterNote:
      "Organic, weathered colour transitions built up in layers, closer to a living material than a flat paint.",
  },
  {
    page: 23,
    name: "FINISH 10",
    category: "Stone",
    textureType: "Smooth",
    sheen: "Polished",
    styles: ["Luxury", "Contemporary"],
    applications: ["Commercial", "Retail"],
    colourFamilies: ["Blue", "Dark"],
    description:
      "A polished stone-effect surface in deep blue-grey with fine mineral flecking — closer to honed natural stone than paint.",
    characterNote:
      "A smooth, cool base with warm gold flecks caught within it, reading as a quarried stone under direct light.",
  },
  {
    page: 25,
    name: "FINISH 11",
    category: "Stone",
    textureType: "Medium",
    sheen: "Satin",
    styles: ["Natural", "Contemporary"],
    applications: ["Residential", "Commercial"],
    colourFamilies: ["Grey", "Beige"],
    description:
      "A mottled natural-stone effect in warm grey and beige — an approachable, grounded finish for larger wall areas.",
    characterNote:
      "Irregular mineral mottling across a mid-tone base, avoiding the repetition of a printed stone pattern.",
  },
  {
    page: 27,
    name: "FINISH 12",
    category: "Polished",
    textureType: "Fine",
    sheen: "Satin",
    styles: ["Luxury", "Contemporary"],
    applications: ["Residential", "Office"],
    colourFamilies: ["Dark", "Brown"],
    description:
      "A near-black fine finish with a soft satin depth — an assertive, minimal surface for feature walls and joinery backdrops.",
    characterNote:
      "Very fine, almost velvet-like grain, with a low sheen that deepens the colour rather than reflecting it.",
  },
  {
    page: 29,
    name: "FINISH 13",
    category: "Mineral",
    textureType: "Fine",
    sheen: "Matte",
    styles: ["Contemporary", "Natural"],
    applications: ["Hospitality", "Residential"],
    colourFamilies: ["Beige", "Sand"],
    description:
      "A soft, warm mineral plaster in pale cream — an easy, versatile neutral for interiors built around natural materials.",
    characterNote:
      "Consistent fine grain with gentle warmth, designed to sit quietly beside timber and stone.",
  },
  {
    page: 31,
    name: "FINISH 14",
    category: "Concrete",
    textureType: "Sculptural",
    sheen: "Matte",
    styles: ["Industrial", "Contemporary"],
    applications: ["Commercial", "Exterior"],
    colourFamilies: ["Grey", "Dark"],
    description:
      "A sculptural architectural-concrete effect with strong directional relief — designed to read at scale, from a distance.",
    characterNote:
      "Bold trowel-worked ridges and planes that catch raking light, giving the surface real dimensional depth.",
  },
  {
    page: 33,
    name: "FINISH 15",
    category: "Textured",
    textureType: "Heavy",
    sheen: "Matte",
    styles: ["Artistic", "Industrial"],
    applications: ["Commercial", "Hospitality"],
    colourFamilies: ["Grey", "Brown"],
    description:
      "A heavily textured, hand-worked surface with pronounced trowel plates — the most tactile and artisanal finish in the range.",
    characterNote:
      "Distinct overlapping trowel plates create a fractured, almost geological surface pattern.",
  },
  {
    page: 35,
    name: "FINISH 16",
    category: "Mineral",
    textureType: "Fine",
    sheen: "Matte",
    styles: ["Natural", "Minimal"],
    applications: ["Residential", "Exterior"],
    colourFamilies: ["Sand", "Beige"],
    description:
      "A fine, sand-textured mineral finish — an honest, weather-appropriate surface suited to both interior and exterior walls.",
    characterNote:
      "Even granular texture throughout, with a dry, natural sand-like appearance.",
  },
  {
    page: 37,
    name: "FINISH 17",
    category: "Concrete",
    textureType: "Fine",
    sheen: "Matte",
    styles: ["Contemporary", "Minimal"],
    applications: ["Residential", "Hospitality"],
    colourFamilies: ["Grey", "Dark"],
    description:
      "A fine, granular concrete effect in deep grey — a controlled, contemporary neutral for feature walls and full rooms alike.",
    characterNote:
      "Tight, sand-fine grain with subtle charcoal depth, reading as a refined architectural concrete.",
  },
];

const assetByPage = new Map(finishAssets.map((g) => [g.page, g]));

function slugify(name: string) {
  return name.toLowerCase().replace(/\s+/g, "-");
}

export const finishes: Finish[] = CURATED.map((curated, index) => {
  const assets = assetByPage.get(curated.page);
  if (!assets) {
    throw new Error(`No generated assets found for finish page ${curated.page}`);
  }
  const [hero, ...restHero] = assets.heroImages;
  const swatches = assets.swatchImages.map((image, i) => ({
    id: `${slugify(curated.name)}-colour-${i + 1}`,
    image,
    label: `Colourway ${String(i + 1).padStart(2, "0")}`,
    colourFamily: curated.colourFamilies[i % curated.colourFamilies.length],
  }));

  return {
    id: `finish-${String(index + 1).padStart(2, "0")}`,
    slug: slugify(curated.name),
    name: curated.name,
    category: curated.category,
    textureType: curated.textureType,
    sheen: curated.sheen,
    styles: curated.styles,
    applications: curated.applications,
    colourFamilies: curated.colourFamilies,
    description: curated.description,
    characterNote: curated.characterNote,
    heroImage: hero,
    applicationImages: restHero,
    swatches,
    technicalNotes: {},
    featured: index < 6,
    published: true,
  };
});

export function getFinishBySlug(slug: string) {
  return finishes.find((f) => f.slug === slug);
}

export function getRelatedFinishes(finish: Finish, count = 3) {
  return finishes
    .filter((f) => f.id !== finish.id && f.category === finish.category)
    .concat(finishes.filter((f) => f.id !== finish.id && f.category !== finish.category))
    .filter((f, i, arr) => arr.findIndex((x) => x.id === f.id) === i)
    .slice(0, count);
}

export const FINISH_CATEGORIES: FinishCategory[] = [
  "Decorative",
  "Textured",
  "Polished",
  "Concrete",
  "Stone",
  "Metallic",
  "Stucco",
  "Mineral",
  "Flooring",
  "Exterior",
];

export const TEXTURE_TYPES: TextureType[] = ["Smooth", "Fine", "Medium", "Rough", "Heavy", "Sculptural"];

export const SHEENS: Sheen[] = ["Matte", "Satin", "Mid-sheen", "Polished", "Gloss"];

export const FINISH_STYLES: FinishStyle[] = [
  "Minimal",
  "Natural",
  "Industrial",
  "Luxury",
  "Organic",
  "Contemporary",
  "Artistic",
];

export const APPLICATION_AREAS: ApplicationArea[] = [
  "Residential",
  "Hospitality",
  "Retail",
  "Office",
  "Commercial",
  "Exterior",
  "Floor",
];

export const COLOUR_FAMILIES: ColourFamily[] = [
  "White",
  "Beige",
  "Sand",
  "Grey",
  "Brown",
  "Terracotta",
  "Green",
  "Blue",
  "Dark",
  "Metallic",
];
