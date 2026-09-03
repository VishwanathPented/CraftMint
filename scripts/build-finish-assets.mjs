// Scans public/images and groups the supplied catalogue photography into
// finish groups by their source page number. This is a one-time/rerunnable
// build step, not a runtime dependency — output is committed as JSON so the
// app never touches the filesystem at request time.
//
// Rule: every odd "page" (05, 07, 09 ... 37) becomes one finish. Its colour
// swatches are every image sharing that page number (regardless of which
// subfolder it landed in). Its hero/application photo is the image from the
// preceding even page in /textures, plus any extra large image sharing the
// odd page number itself (some pages had two large photos).
import { readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const IMAGES_ROOT = join(process.cwd(), "public", "images");
const SWATCH_DIRS = ["texture_swatches", "material_samples", "unknown", "wall_finishes"];
const HERO_DIR = "textures";

function listFiles(dir) {
  try {
    return readdirSync(join(IMAGES_ROOT, dir)).filter((f) => f.toLowerCase().endsWith(".webp"));
  } catch {
    return [];
  }
}

function pageOf(filename) {
  const m = filename.match(/^p(\d+)_img\d+\.webp$/i);
  return m ? parseInt(m[1], 10) : null;
}

const heroFiles = listFiles(HERO_DIR);
const heroByPage = new Map();
for (const f of heroFiles) {
  const p = pageOf(f);
  if (p == null) continue;
  if (!heroByPage.has(p)) heroByPage.set(p, []);
  heroByPage.get(p).push(`/images/${HERO_DIR}/${f}`);
}

const swatchesByPage = new Map();
for (const dir of SWATCH_DIRS) {
  for (const f of listFiles(dir)) {
    const p = pageOf(f);
    if (p == null) continue;
    if (!swatchesByPage.has(p)) swatchesByPage.set(p, []);
    swatchesByPage.get(p).push(`/images/${dir}/${f}`);
  }
}

const oddPages = [...swatchesByPage.keys()].sort((a, b) => a - b);

const groups = oddPages.map((page) => {
  const heroPage = page - 1;
  const hero = (heroByPage.get(heroPage) ?? []).sort();
  const ownPageHero = (heroByPage.get(page) ?? []).sort(); // extra large photos filed under the same page
  const swatches = (swatchesByPage.get(page) ?? []).sort();
  return {
    page,
    heroImages: [...hero, ...ownPageHero],
    swatchImages: swatches,
  };
});

writeFileSync(
  join(process.cwd(), "lib", "generated", "finish-assets.json"),
  JSON.stringify(groups, null, 2) + "\n",
);

console.log(`Wrote ${groups.length} finish groups to lib/generated/finish-assets.json`);
for (const g of groups) {
  console.log(`  page ${g.page}: ${g.heroImages.length} hero, ${g.swatchImages.length} swatches`);
}
