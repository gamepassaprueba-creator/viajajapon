import { SITE } from "@/lib/site";
import { getArticles } from "@/lib/content";

// Feed RSS de noticias + guías. Se regenera en el build (y con ISR cada 6 h).
export const revalidate = 21600;

const esc = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

export async function GET() {
  const items = [
    ...getArticles("blog").map((a) => ({ ...a, path: `/blog/${a.slug}` })),
    ...getArticles("logistica").map((a) => ({ ...a, path: `/logistica/${a.slug}` })),
  ]
    .sort((a, b) => (a.dateModified < b.dateModified ? 1 : -1))
    .slice(0, 20);

  const lastBuild = items[0] ? new Date(items[0].dateModified).toUTCString() : new Date(0).toUTCString();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
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
