import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "CraftMint LLP — Cameleo Decorative Finishes",
    short_name: "CraftMint",
    description:
      "CraftMint LLP brings Cameleo, Poland's decorative wall finishes and architectural surfaces to Indian projects.",
    start_url: "/",
    display: "standalone",
    background_color: "#f7f3ec",
    theme_color: "#211e1a",
    icons: [
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
