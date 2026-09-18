import sharp from "sharp";
import { mkdirSync } from "node:fs";

const OUT_DIR = "public/images/card_crops";
mkdirSync(OUT_DIR, { recursive: true });

// `out` matches the finish's hero page (what data/finishes.ts references),
// `src` is the actual source file to crop from — usually the hero
// application photo, but for a few hero photos where no clean square patch
// exists (busy retail/restaurant scenes), a same-colourway close-up swatch
// instead.
const crops = [
  { out: "p04_img01", src: "public/images/textures/p04_img01.webp", left: 680, top: 0, size: 520 },
  { out: "p06_img01", src: "public/images/textures/p06_img01.webp", left: 340, top: 0, size: 520 },
  { out: "p08_img01", src: "public/images/textures/p08_img01.webp", left: 680, top: 180, size: 190 },
  { out: "p10_img01", src: "public/images/textures/p10_img01.webp", left: 720, top: 93, size: 480 },
  { out: "p12_img01", src: "public/images/textures/p12_img01.webp", left: 360, top: 0, size: 480 },
  { out: "p14_img01", src: "public/images/texture_swatches/p15_img01.webp", left: 351, top: 0, size: 276 },
  { out: "p16_img01", src: "public/images/textures/p16_img01.webp", left: 0, top: 0, size: 520 },
  { out: "p18_img01", src: "public/images/textures/p18_img01.webp", left: 0, top: 0, size: 520 },
  { out: "p20_img01", src: "public/images/material_samples/p21_img01.webp", left: 184, top: 0, size: 610 },
  { out: "p22_img01", src: "public/images/textures/p22_img01.webp", left: 0, top: 0, size: 520 },
  { out: "p24_img01", src: "public/images/textures/p24_img01.webp", left: 0, top: 0, size: 520 },
  { out: "p26_img01", src: "public/images/texture_swatches/p27_img01.webp", left: 92, top: 0, size: 276 },
  { out: "p28_img01", src: "public/images/textures/p28_img01.webp", left: 0, top: 0, size: 520 },
  { out: "p30_img01", src: "public/images/textures/p30_img01.webp", left: 740, top: 0, size: 460 },
  { out: "p32_img01", src: "public/images/textures/p32_img01.webp", left: 0, top: 207, size: 460 },
  { out: "p34_img01", src: "public/images/textures/p34_img01.webp", left: 0, top: 0, size: 520 },
  { out: "p36_img01", src: "public/images/textures/p36_img01.webp", left: 0, top: 0, size: 460 },
];

for (const c of crops) {
  const output = `${OUT_DIR}/${c.out}-card.webp`;
  await sharp(c.src)
    .extract({ left: c.left, top: c.top, width: c.size, height: c.size })
    .resize(900, 900)
    .webp({ quality: 90 })
    .toFile(output);
  console.log("wrote", output);
}
