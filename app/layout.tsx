import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz", "SOFT", "WONK"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.craftmint.in"),
  title: {
    default: "Craftmint LLP — Premium Decorative Surfaces & Architectural Finishes",
    template: "%s | Craftmint LLP",
  },
  description:
    "Craftmint LLP brings together premium decorative finishes, textures and architectural surfaces with material expertise and end-to-end project execution, working with Cameleo Deco Coatings, Poland.",
  keywords: [
    "decorative wall finishes India",
    "texture paint",
    "luxury wall textures",
    "decorative plaster",
    "polished plaster",
    "concrete wall finish",
    "metallic wall finish",
    "seamless flooring",
    "architectural finishes",
    "designer wall textures",
  ],
  openGraph: {
    title: "Craftmint LLP — Crafted Surfaces. Distinctive Spaces.",
    description:
      "Premium decorative finishes, textures and architectural surfaces, brought together with material expertise and end-to-end execution.",
    siteName: "Craftmint LLP",
    type: "website",
    locale: "en_IN",
  },
  robots: { index: true, follow: true },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Craftmint LLP",
  description:
    "Craftmint LLP operates in decorative surfaces, texture paints, decorative finishes, flooring and architectural materials, working with Cameleo Deco Coatings, Poland.",
  url: "https://www.craftmint.in",
  areaServed: "IN",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-ivory text-charcoal">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
