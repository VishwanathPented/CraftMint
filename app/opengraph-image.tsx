import { ImageResponse } from "next/og";
import { join } from "node:path";
import { readFile } from "node:fs/promises";

export const alt = "CraftMint LLP — Cameleo Decorative Finishes & Wall Textures in India";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

const logoData = await readFile(join(process.cwd(), "public/images/Logos/craftmint-logo.png"), "base64");
const logoSrc = `data:image/png;base64,${logoData}`;

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#f7f3ec",
          padding: 80,
        }}
      >
        <img src={logoSrc} width={520} style={{ objectFit: "contain" }} />
        <div
          style={{
            marginTop: 40,
            fontSize: 34,
            color: "#211e1a",
            letterSpacing: 1,
            textAlign: "center",
          }}
        >
          Premium Decorative Finishes · Cameleo Partner, Poland
        </div>
      </div>
    ),
    { ...size },
  );
}
