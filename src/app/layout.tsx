import type { Metadata, Viewport } from "next";
import Script from "next/script";
import localFont from "next/font/local";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/site";
import { Navbar } from "@/components/Navbar";
import { MobileTabBar } from "@/components/MobileTabBar";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { CookieBanner } from "@/components/CookieBanner";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { organizationLd, websiteLd } from "@/lib/jsonld";

// M PLUS 1p (OFL): sans japonesa contemporánea (dirección "moderno anime/manga"). 900 para
// titulares/logo, 400/500/700 para UI y cuerpo. Se autoaloja SOLO el subconjunto latino
// (4 woff2 de ~18 KB en src/fonts, los mismos ficheros que sirve Google Fonts). Con
// next/font/google el build precargaba los ~120 trozos japoneses de cada peso: 359
// <link rel="preload"> y 377 KB de CSS bloqueante en cada página. Los glifos japoneses
// que aparezcan en el texto caen a la pila del sistema (ver .font-jp en globals.css).
// JetBrains Mono para precios/kickers/fechas.
const mplus = localFont({
  src: [
    { path: "../fonts/mplus1p-latin-400.woff2", weight: "400", style: "normal" },
    { path: "../fonts/mplus1p-latin-500.woff2", weight: "500", style: "normal" },
    { path: "../fonts/mplus1p-latin-700.woff2", weight: "700", style: "normal" },
    { path: "../fonts/mplus1p-latin-900.woff2", weight: "900", style: "normal" },
  ],
  variable: "--font-mplus",
  display: "swap",
  adjustFontFallback: "Arial",
  // El loader exige literales (no variables): rango latino tal cual lo sirve Google Fonts.
  declarations: [
    {
      prop: "unicode-range",
      value:
        "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD",
    },
  ],
});
// Sin preload: solo pinta kickers y botones pequeños, y su fallback está ajustado en métricas. Era la
// fuente más pesada (41 KB) y la primera en la cola, compitiendo con el CSS y el H1 (LCP).
const jetbrains = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"], weight: "variable", display: "swap", preload: false });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: `${SITE.name} — ${SITE.tagline}`, template: `%s · ${SITE.name}` },
  description: SITE.description,
  authors: [{ name: SITE.author.name, url: SITE.author.url }],
  creator: SITE.author.name,
  publisher: SITE.name,
  // No definir un canonical global aquí: Metadata se hereda entre segmentos y una
  // ruta que olvide sobrescribirlo podría terminar señalando por error a la home.
  // La home, hubs, páginas estáticas y artículos indexables declaran el suyo.
  alternates: {
    types: { "application/rss+xml": "/feed.xml" },
  },
  manifest: "/manifest.json",
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
  // Metaetiqueta de verificación de cuenta Google AdSense.
  // No carga ningún script ni activa anuncios; es solo para que Google
  // pueda verificar la propiedad del dominio durante la solicitud de AdSense.
  other: {
    "google-adsense-account": "ca-pub-7277317479691987",
    // Verificacion de propiedad del dominio en Pinterest (etiqueta publica).
    "p:domain_verify": "41185f2b22afdeee5ec9712d22d0fe6a",
    // Verificación de Bing Webmaster Tools (sitemap, IndexNow y URL Submission de Bing).
    "msvalidate.01": "19B0771F4AA464314CB76CC73C175AB4",
  },
};

export const viewport: Viewport = {
  themeColor: "#fafafb",
  viewportFit: "cover",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${mplus.variable} ${jetbrains.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col pb-[calc(4rem+env(safe-area-inset-bottom))] md:pb-0">
        <JsonLd data={[organizationLd(), websiteLd()]} />
        <GoogleAnalytics />
        {process.env.NEXT_PUBLIC_CF_ANALYTICS_TOKEN && (
          <Script defer src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon={`{"token": "${process.env.NEXT_PUBLIC_CF_ANALYTICS_TOKEN}"}`} />
        )}
        <a href="#contenido" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white">
          Saltar al contenido
        </a>
        <Navbar />
        <main id="contenido" className="flex-1">{children}</main>
        <Footer />
        {/* GA4 usa consentimiento propio y no se carga antes de aceptar analítica.
            La integración publicitaria de AdSense seguirá requiriendo su CMP certificada. */}
        <CookieBanner />
        <MobileTabBar />
      </body>
    </html>
  );
}
