import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    // /buscar se rastrea para que el noindex de su metadata sea visible.
    // /embed es una utilidad sin valor como landing orgánica y se mantiene fuera del rastreo.
    rules: { userAgent: "*", allow: "/", disallow: ["/embed"] },
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
