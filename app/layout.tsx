import type { Metadata } from "next";
import { Libre_Caslon_Display, Inter } from "next/font/google";
import { SplashScreen } from "@/components/layout/SplashScreen";
import { contactInfo } from "@/data/contact";
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
    default: "CraftMint LLP — Cameleo Decorative Finishes & Wall Textures in India",
    template: "%s | CraftMint LLP",
  },
  description:
    "CraftMint LLP works with Cameleo, Poland, bringing European decorative wall finishes, textures and architectural surfaces to Indian projects, with material expertise and end-to-end execution.",
  keywords: [
    "CraftMint",
    "CraftMint LLP",
    "Cameleo",
    "Cameleo India",
    "Cameleo decorative finishes",
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
    title: "CraftMint LLP — Cameleo Decorative Finishes & Wall Textures in India",
    description:
      "CraftMint LLP brings Cameleo, Poland's decorative coatings to Indian projects — premium wall finishes, textures and architectural surfaces with end-to-end execution.",
    siteName: "CraftMint LLP",
    type: "website",
    locale: "en_IN",
    url: "https://www.craftmint.in",
  },
  twitter: {
    card: "summary_large_image",
    title: "CraftMint LLP — Cameleo Decorative Finishes & Wall Textures in India",
    description:
      "CraftMint LLP brings Cameleo, Poland's decorative coatings to Indian projects — premium wall finishes, textures and architectural surfaces with end-to-end execution.",
  },
  alternates: {
    canonical: "/",
  },
  robots: { index: true, follow: true },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "CraftMint LLP",
  alternateName: ["CraftMint", "Craftmint Cameleo"],
  description:
    "CraftMint LLP operates in decorative surfaces, texture paints, decorative finishes, flooring and architectural materials, working with Cameleo, Poland, and other European companies.",
  url: "https://www.craftmint.in",
  logo: "https://www.craftmint.in/images/Logos/craftmint-logo.png",
  image: "https://www.craftmint.in/images/Logos/craftmint-logo-lockup.jpg",
  areaServed: "IN",
  email: contactInfo.email,
  telephone: contactInfo.phoneDisplay,
  address: {
    "@type": "PostalAddress",
    streetAddress: contactInfo.address.line1,
    addressLocality: contactInfo.address.city,
    addressRegion: contactInfo.address.state,
    postalCode: contactInfo.address.postalCode,
    addressCountry: "IN",
  },
  sameAs: [contactInfo.instagram, contactInfo.linkedin],
  knowsAbout: ["Cameleo decorative coatings", "Decorative wall finishes", "Architectural surfaces"],
};

// Google's documented signal for showing a "site name" (e.g. "CraftMint LLP")
// in search results instead of the bare domain — see
// https://developers.google.com/search/docs/appearance/site-names
const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "CraftMint LLP",
  alternateName: "CraftMint",
  url: "https://www.craftmint.in",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${libreCaslonDisplay.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-ivory text-charcoal">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <SplashScreen />
        {children}
      </body>
    </html>
  );
}
