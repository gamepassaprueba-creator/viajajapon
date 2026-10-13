import type { Metadata } from "next";
import { SITE } from "./site";

export const DEFAULT_OG_IMAGE = { url: "/images/hero-fuji.jpg", alt: "Monte Fuji con una pagoda y cerezos en flor" };

type SocialInput = {
  /** Ruta relativa de la página ("/logistica"); se resuelve contra metadataBase. */
  path: string;
  title: string;
  description: string;
  image?: { url: string; alt: string };
  type?: "website" | "article";
};

/**
 * Open Graph + Twitter completos para UNA URL.
 *
 * Next fusiona `metadata` de forma superficial: una página que no define `openGraph`
 * hereda el objeto ENTERO del layout (og:url y og:title de la home). Y si define
 * `openGraph` pero no `twitter`, Next no rellena twitter:title desde él porque ya hereda
 * el del layout. Por eso aquí van siempre los dos. El canonical se declara aparte, en la
 * propia página (lo exige el guardrail de canónicos).
 */
export function socialMeta(o: SocialInput): Pick<Metadata, "openGraph" | "twitter"> {
  const image = o.image ?? DEFAULT_OG_IMAGE;
  return {
    openGraph: {
      type: o.type ?? "website",
      locale: SITE.locale,
      siteName: SITE.name,
      url: o.path,
      title: o.title,
      description: o.description,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: o.title,
      description: o.description,
      images: [image.url],
    },
  };
}

type PageMeta = Metadata & { title: string | { absolute: string }; description: string };

/** Envuelve el `metadata` de una página fija con su Open Graph/Twitter propios. */
export function withSocial(path: string, meta: PageMeta): Metadata {
  const title = typeof meta.title === "string" ? meta.title : meta.title.absolute;
  return { ...meta, ...socialMeta({ path, title, description: meta.description }) };
}
