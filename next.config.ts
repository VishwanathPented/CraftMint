import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Material/texture fidelity matters a lot on this site — Next's default
    // optimizer quality (75) visibly softens fine surface grain. Raise the
    // ceiling and use a higher quality on every <Image>.
    qualities: [75, 90, 95, 100],
    // AVIF was tried here but this Next.js version's AVIF encoder silently
    // re-renders at ~75% of the requested/native resolution regardless of
    // the `w` parameter (verified: identical WebP requests return full
    // native pixels, AVIF requests for the same source come back scaled
    // down) — the opposite of what we want on a texture-detail site.
    // WebP (Next's own default) doesn't have this problem, so we stay there.
    formats: ["image/webp"],
  },
};

export default nextConfig;
