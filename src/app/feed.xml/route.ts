import { SITE } from "@/lib/site";
import { getAllArticles } from "@/lib/content";

export const dynamic = "force-static";

// Feed RSS completo (todos los pilares, los 20 más recientes). Antes solo cubría blog+logística.

const esc = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

export async function GET() {
  const items = getAllArticles()
    .map((a) => ({ ...a, path: `/${a.pillar}/${a.slug}` }))
    .slice(0, 20);

  const lastBuild = items[0] ? new Date(items[0].dateModified).toUTCString() : new Date(0).toUTCString();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${esc(SITE.name)} — Noticias y guías para viajar a Japón</title>
    <link>${SITE.url}</link>
    <description>${esc(SITE.description)}</description>
    <language>es-ES</language>
    <lastBuildDate>${lastBuild}</lastBuildDate>
    <atom:link href="${SITE.url}/feed.xml" rel="self" type="application/rss+xml" />
${items
  .map(
    (it) => `    <item>
      <title>${esc(it.title)}</title>
      <link>${SITE.url}${it.path}</link>
      <guid isPermaLink="true">${SITE.url}${it.path}</guid>
      <pubDate>${new Date(it.dateModified).toUTCString()}</pubDate>
      <dc:creator>${esc(SITE.author.name)}</dc:creator>
      <description>${esc(it.excerpt || it.description)}</description>
    </item>`,
  )
  .join("\n")}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
