// Reads the real pixel dimensions of every image under public/images and
// writes them to lib/generated/image-dimensions.json, keyed by the same
// "/images/..." path used throughout data/finishes.ts.
//
// This exists so swatch/sample crops — which come in several genuinely
// different aspect ratios (see components/finishes/SwatchImage.tsx) — can be
// displayed at their exact native proportions (a CSS aspect-ratio box sized
// to the real w/h) instead of being forced into a fixed-aspect card and
// either letterboxed (object-contain) or cropped (object-cover).
//
// One-time/rerunnable build step, not a runtime dependency — output is
// committed as JSON, same pattern as build-finish-assets.mjs.
import { readdirSync, writeFileSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";
import sharp from "sharp";

const IMAGES_ROOT = join(process.cwd(), "public", "images");

function walk(dir) {
  const entries = readdirSync(dir);
  const files = [];
  for (const entry of entries) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      files.push(...walk(full));
    } else if (/\.(webp|jpe?g|png)$/i.test(entry)) {
      files.push(full);
    }
  }
  return files;
}

const files = walk(IMAGES_ROOT);
const dimensions = {};

for (const file of files) {
  const { width, height } = await sharp(file).metadata();
  if (!width || !height) continue;
  const publicPath = "/images/" + relative(IMAGES_ROOT, file).split(sep).join("/");
  dimensions[publicPath] = { width, height };
}

writeFileSync(
  join(process.cwd(), "lib", "generated", "image-dimensions.json"),
  JSON.stringify(dimensions, null, 2) + "\n",
);

console.log(`Wrote dimensions for ${Object.keys(dimensions).length} images to lib/generated/image-dimensions.json`);
