import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { getArticles } from "@/lib/content";

type CF = MetadataRoute.Sitemap[number]["changeFrequency"];

const CONTENT_PILLARS = ["logistica", "blog", "itinerarios", "destinos", "gastronomia", "cultura"] as const;
const EMERGENT_PILLARS = new Set(["itinerarios", "destinos", "gastronomia", "cultura"]);

export default function sitemap(): MetadataRoute.Sitemap {
  const fixed = new Date("2026-06-02");
  const trustUpdated = new Date("2026-08-16");
  const allMod = CONTENT_PILLARS.flatMap((p) => getArticles(p).map((a) => a.dateModified)).sort();
  const latest = allMod.length ? new Date(allMod[allMod.length - 1]) : fixed;
  const entries: MetadataRoute.Sitemap = [];

  const staticRoutes: { path: string; cf: CF; p: number; mod: Date }[] = [
    { path: "/", cf: "daily", p: 1, mod: latest },
    { path: "/herramientas/jr-pass-calculadora", cf: "monthly", p: 0.9, mod: fixed },
    { path: "/cambio-yen-euro", cf: "daily", p: 0.8, mod: latest },
    { path: "/blog", cf: "daily", p: 0.7, mod: latest },
    { path: "/logistica", cf: "weekly", p: 0.7, mod: latest },
    { path: "/sobre-nosotros", cf: "yearly", p: 0.3, mod: fixed },
    { path: "/contacto", cf: "yearly", p: 0.3, mod: trustUpdated },
    { path: "/politica-editorial", cf: "yearly", p: 0.3, mod: trustUpdated },
    { path: "/afiliados-divulgacion", cf: "yearly", p: 0.2, mod: fixed },
    { path: "/aviso-legal", cf: "yearly", p: 0.1, mod: fixed },
    { path: "/privacidad", cf: "yearly", p: 0.1, mod: fixed },
    { path: "/cookies", cf: "yearly", p: 0.1, mod: fixed },
  ];
  for (const r of staticRoutes) {
    entries.push({ url: `${SITE.url}${r.path}`, lastModified: r.mod, changeFrequency: r.cf, priority: r.p });
  }

  for (const pillar of CONTENT_PILLARS) {
    const posts = getArticles(pillar);
    if (EMERGENT_PILLARS.has(pillar) && posts.length > 0) {
      entries.push({ url: `${SITE.url}/${pillar}`, lastModified: latest, changeFrequency: "weekly", priority: 0.6 });
    }
    for (const a of posts) {
      entries.push({
        url: `${SITE.url}/${pillar}/${a.slug}`,
        lastModified: new Date(a.dateModified),
        changeFrequency: pillar === "blog" ? "weekly" : "monthly",
        priority: pillar === "blog" ? 0.6 : 0.8,
      });
    }
  }

  return entries;
}
