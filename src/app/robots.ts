import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    // /buscar debe ser rastreable para que Google pueda leer su meta noindex.
    // /embed sigue fuera del rastreo porque es una superficie auxiliar embebible.
    rules: { userAgent: "*", allow: "/", disallow: ["/embed"] },
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
