import type { Metadata } from "next";
import { Libre_Caslon_Display, Inter } from "next/font/google";
import { SplashScreen } from "@/components/layout/SplashScreen";
import "./globals.css";

const libreCaslonDisplay = Libre_Caslon_Display({
  variable: "--font-libre-caslon",
  subsets: ["latin"],
  weight: "400",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.craftmint.in"),
  title: {
    default: "CraftMint LLP — Premium Decorative Surfaces & Architectural Finishes",
    template: "%s | CraftMint LLP",
  },
  description:
    "CraftMint LLP brings together premium decorative finishes, textures and architectural surfaces with material expertise and end-to-end project execution, working with Cameleo, Poland, and other European companies.",
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
    title: "CraftMint LLP — Crafted Surfaces. Distinctive Spaces.",
    description:
      "Premium decorative finishes, textures and architectural surfaces, brought together with material expertise and end-to-end execution.",
    siteName: "CraftMint LLP",
    type: "website",
    locale: "en_IN",
  },
  robots: { index: true, follow: true },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "CraftMint LLP",
  description:
    "CraftMint LLP operates in decorative surfaces, texture paints, decorative finishes, flooring and architectural materials, working with Cameleo, Poland, and other European companies.",
  url: "https://www.craftmint.in",
  areaServed: "IN",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${libreCaslonDisplay.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-ivory text-charcoal">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <SplashScreen />
        {children}
      </body>
    </html>
  );
}
