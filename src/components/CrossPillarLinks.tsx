import Link from "next/link";
import { getAllArticles, type ArticleMeta } from "@/lib/content";
import { categoriaDe } from "@/lib/categorias";

/**
 * Enlaces editoriales dirigidos para páginas con demanda demostrada en Search Console.
 * El valor usa `pillar/slug`; si un artículo desaparece o pasa a borrador, simplemente
 * se ignora y entra el fallback automático.
 */
const TOPICAL_LINKS: Record<string, string[]> = {
  "cultura/geishas-y-maiko-japon": [
    "destinos/que-ver-en-kioto",
    "destinos/donde-dormir-en-kioto",
    "cultura/kimono",
  ],
  "destinos/que-ver-en-kioto": [
    "cultura/geishas-y-maiko-japon",
    "destinos/donde-dormir-en-kioto",
    "cultura/festivales-de-japon",
  ],
  "destinos/donde-dormir-en-kioto": [
    "destinos/que-ver-en-kioto",
    "cultura/geishas-y-maiko-japon",
    "itinerarios/itinerario-japon-15-dias",
  ],
  "cultura/festivales-de-japon": [
    "logistica/mejor-epoca-viajar-japon",
    "itinerarios/itinerario-japon-1-mes",
    "destinos/que-ver-en-kioto",
  ],
  "logistica/compras-y-tax-free-japon": [
    "logistica/como-pagar-en-japon",
    "logistica/cuanto-cuesta-viajar-japon",
    "itinerarios/itinerario-japon-1-mes",
  ],
  "logistica/como-pagar-en-japon": [
    "logistica/compras-y-tax-free-japon",
    "logistica/cuanto-cuesta-viajar-japon",
    "logistica/suica-iphone",
  ],
  "itinerarios/itinerario-japon-1-mes": [
    "cultura/geishas-y-maiko-japon",
    "logistica/compras-y-tax-free-japon",
    "destinos/donde-dormir-en-kioto",
  ],
  "itinerarios/itinerario-japon-15-dias": [
    "destinos/donde-dormir-en-kioto",
    "logistica/compras-y-tax-free-japon",
    "logistica/jr-pass-2026",
  ],
};

function articleKey(a: ArticleMeta) {
  return `${a.pillar}/${a.slug}`;
}

export function CrossPillarLinks({ currentPillar, currentSlug }: { currentPillar: string; currentSlug: string }) {
  const all = getAllArticles();
  const currentKey = `${currentPillar}/${currentSlug}`;
  const byKey = new Map(all.map((a) => [articleKey(a), a]));
  const selected: ArticleMeta[] = [];

  // 1) Enlaces editoriales explícitos cuando tenemos una relación semántica fuerte.
  for (const key of TOPICAL_LINKS[currentKey] ?? []) {
    const article = byKey.get(key);
    if (article && articleKey(article) !== currentKey && !selected.some((s) => articleKey(s) === key)) {
      selected.push(article);
    }
    if (selected.length === 3) break;
  }

  // 2) Fallback: completar con contenido reciente, intentando diversificar pilares.
  const seenPillars = new Set(selected.map((a) => a.pillar));
  for (const article of all) {
    const key = articleKey(article);
    if (key === currentKey || selected.some((s) => articleKey(s) === key)) continue;
    if (!seenPillars.has(article.pillar)) {
      selected.push(article);
      seenPillars.add(article.pillar);
    }
    if (selected.length === 3) break;
  }

  // 3) Si aún faltan enlaces, rellenar sin exigir pilar distinto.
  if (selected.length < 3) {
    for (const article of all) {
      const key = articleKey(article);
      if (key === currentKey || selected.some((s) => articleKey(s) === key)) continue;
      selected.push(article);
      if (selected.length === 3) break;
    }
  }

  if (selected.length === 0) return null;

  return (
    <section className="mt-8 border-t-[3px] border-[#0a0a0a] pt-8">
      <h2 className="display-md text-xl text-[#0a0a0a]">Descubre más sobre Japón</h2>
      <ul className="mt-4 grid gap-4 sm:grid-cols-3">
        {selected.map((a) => {
          const cat = categoriaDe(a.pillar);
          return (
            <li key={`${a.pillar}/${a.slug}`}>
              <Link
                href={`${cat.basePath}/${a.slug}`}
                className="panel-manga-red flex h-full flex-col bg-white p-4 transition-all hover:translate-x-0.5 hover:translate-y-0.5"
              >
                <span className="kicker text-[#e1352e]">{cat.label}</span>
                <span className="mt-1 font-black text-[#0a0a0a]">{a.title}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
