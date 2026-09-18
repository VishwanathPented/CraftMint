import finishAssets from "@/lib/generated/finish-assets.json";
import type {
  ApplicationArea,
  ColourFamily,
  DatasheetLink,
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
 * Names are the actual product names printed on each finish's page in
 * "Cameleo catalog Hi Res.pdf" (the title band at the top of the even/hero
 * page — e.g. page 4 reads "CONCRETE EFFECT  Classic Effect"), not
 * placeholders. `category` is set from the material named in that title;
 * everything else (texture/sheen/style/description) remains the original
 * design-led read of the photography.
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
  datasheets?: DatasheetLink[];
};

const CURATED: CuratedFinish[] = [
  {
    page: 5,
    name: "Concrete Effect — Classic Effect",
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
    datasheets: [
      { label: "Technical Data Sheet", url: "/datasheets/concrete-effect-classic-tds.pdf" },
    ],
  },
  {
    page: 7,
    name: "Concrete Effect — Smooth Effect",
    category: "Concrete",
    textureType: "Fine",
    sheen: "Matte",
    styles: ["Minimal", "Contemporary"],
    applications: ["Retail", "Residential"],
    colourFamilies: ["Beige", "Sand"],
    description:
      "A fine, tightly-worked plaster finish with a soft sandy grain — warm, even and unobtrusive against considered interior schemes.",
    characterNote:
      "A close, uniform grain with subtle directional hand-marks left by the trowel, catching light without ever appearing glossy.",
    datasheets: [
      { label: "Technical Data Sheet", url: "/datasheets/concrete-effect-smooth-tdse.pdf" },
    ],
  },
  {
    page: 9,
    name: "Concrete Effect Rough — Classic Effect",
    category: "Concrete",
    textureType: "Medium",
    sheen: "Satin",
    styles: ["Luxury", "Industrial"],
    applications: ["Retail", "Hospitality"],
    colourFamilies: ["Dark", "Grey"],
    description:
      "A deep charcoal textured plaster with a soft satin lift — dramatic in low light, ideal for feature walls and considered thresholds.",
    characterNote:
      "Dense, cloud-like texture with a faint sheen that shifts as light moves across the wall.",
    datasheets: [
      { label: "Technical Data Sheet", url: "/datasheets/concrete-effect-rough-tds.pdf" },
      { label: "Application (Effect) Data Sheet", url: "/datasheets/concrete-effect-rough-tdse.pdf" },
    ],
  },
  {
    page: 11,
    name: "Travertine Pearl — Oval Trowel Effect",
    category: "Stone",
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
    name: "Travertine Pearl — Grass Effect",
    category: "Stone",
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
    name: "Travertine Rough — Classic Effect",
    category: "Stone",
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
    name: "Travertine Rough Pearl — Classic Effect",
    category: "Stone",
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
    name: "Rust Effect — Classic Effect",
    category: "Metallic",
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
    name: "Patina Effect — Classic Effect",
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
    name: "Manhattan Dark — Classic Effect",
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
    datasheets: [
      { label: "Technical Data Sheet", url: "/datasheets/manhattan-tds.pdf" },
      { label: "Application (Effect) Data Sheet", url: "/datasheets/manhattan-light-dark-silver-tdse.pdf" },
    ],
  },
  {
    page: 25,
    name: "Manhattan Light — Classic Effect",
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
    datasheets: [
      { label: "Technical Data Sheet", url: "/datasheets/manhattan-tds.pdf" },
      { label: "Application (Effect) Data Sheet", url: "/datasheets/manhattan-light-dark-silver-tdse.pdf" },
    ],
  },
  {
    page: 27,
    name: "Venetian Stucco — Classic Effect",
    category: "Stucco",
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
    name: "Venetian Stucco — Pearl Effect",
    category: "Stucco",
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
    name: "Pearl Stucco — Classic Effect / Matt",
    category: "Stucco",
    textureType: "Sculptural",
    sheen: "Matte",
    styles: ["Industrial", "Contemporary"],
    applications: ["Commercial", "Exterior"],
    colourFamilies: ["Grey", "Dark"],
    description:
      "A sculptural architectural-concrete effect with strong directional relief — designed to read at scale, from a distance.",
    characterNote:
      "Bold trowel-worked ridges and planes that catch raking light, giving the surface real dimensional depth.",
    datasheets: [
      { label: "Technical Data Sheet", url: "/datasheets/pearl-stucco-matt-tds.pdf" },
      { label: "Application (Effect) Data Sheet", url: "/datasheets/pearl-stucco-matt-tdse.pdf" },
    ],
  },
  {
    page: 33,
    name: "Liquid Metals — Classic Effect",
    category: "Metallic",
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
    name: "Granite Effect — Classic Effect",
    category: "Stone",
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
    name: "Granite Effect — Classic Effect / White Base",
    category: "Stone",
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
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
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
    datasheets: curated.datasheets ?? [],
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
