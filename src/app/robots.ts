import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    // Las superficies auxiliares usan noindex a nivel de página/respuesta. Deben
    // seguir siendo rastreables para que Google pueda leer y aplicar esa regla.
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
