import type { Metadata, Viewport } from "next";
import { M_PLUS_1p, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/site";
import { Navbar } from "@/components/Navbar";
import { MobileTabBar } from "@/components/MobileTabBar";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { organizationLd, websiteLd } from "@/lib/jsonld";

// M PLUS 1p: sans japonesa contemporánea (dirección "moderno anime/manga"). 900 para
// titulares/logo, 400/500/700 para UI y cuerpo. JetBrains Mono para precios/kickers/fechas.
const mplus = M_PLUS_1p({ variable: "--font-mplus", subsets: ["latin"], weight: ["400", "500", "700", "900"], display: "swap" });
const jetbrains = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"], weight: "variable", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: `${SITE.name} — ${SITE.tagline}`, template: `%s · ${SITE.name}` },
  description: SITE.description,
  alternates: {
    canonical: "/",
    types: { "application/rss+xml": "/feed.xml" },
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    siteName: SITE.name,
    url: SITE.url,
    title: SITE.name,
    description: SITE.description,
    images: [{ url: "/images/hero-fuji.jpg", alt: "Monte Fuji con una pagoda y cerezos en flor" }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.name,
    description: SITE.description,
    images: ["/images/hero-fuji.jpg"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafb" },
    { media: "(prefers-color-scheme: dark)", color: "#131418" },
  ],
  // Permite que la tab bar inferior respete el área segura (notch/home indicator).
  viewportFit: "cover",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${mplus.variable} ${jetbrains.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col pb-[calc(4rem+env(safe-area-inset-bottom))] md:pb-0">
        <JsonLd data={[organizationLd(), websiteLd()]} />
        <a href="#contenido" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white">
          Saltar al contenido
        </a>
        <Navbar />
        <main id="contenido" className="flex-1">{children}</main>
        <Footer />
        <MobileTabBar />
      </body>
    </html>
  );
}
