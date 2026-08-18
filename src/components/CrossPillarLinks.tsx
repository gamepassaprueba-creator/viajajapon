import Link from "next/link";
import { getAllArticles, type ArticleMeta } from "@/lib/content";
import { categoriaDe } from "@/lib/categorias";
import { RELATED_CONTENT, contentKey } from "@/lib/related-content";

function articleKey(a: ArticleMeta) {
  return contentKey(a.pillar, a.slug);
}

export function CrossPillarLinks({ currentPillar, currentSlug }: { currentPillar: string; currentSlug: string }) {
  const all = getAllArticles();
  const currentKey = contentKey(currentPillar, currentSlug);
  const byKey = new Map(all.map((a) => [articleKey(a), a]));
  const selected: ArticleMeta[] = [];

  // 1) Enlaces editoriales explícitos hacia otros pilares. Los relacionados del mismo
  // pilar ya los cubre "Sigue leyendo", así evitamos duplicar tarjetas en la misma página.
  for (const key of RELATED_CONTENT[currentKey] ?? []) {
    const article = byKey.get(key);
    if (
      article &&
      article.pillar !== currentPillar &&
      articleKey(article) !== currentKey &&
      !selected.some((s) => articleKey(s) === key)
    ) {
      selected.push(article);
    }
    if (selected.length === 3) break;
  }

  // 2) Fallback: completar con contenido reciente, intentando diversificar pilares.
  const seenPillars = new Set(selected.map((a) => a.pillar));
  for (const article of all) {
    const key = articleKey(article);
    if (
      key === currentKey ||
      article.pillar === currentPillar ||
      selected.some((s) => articleKey(s) === key)
    ) continue;
    if (!seenPillars.has(article.pillar)) {
      selected.push(article);
      seenPillars.add(article.pillar);
    }
    if (selected.length === 3) break;
  }

  // 3) Si aún faltan enlaces, rellenar con otros pilares sin exigir diversidad.
  if (selected.length < 3) {
    for (const article of all) {
      const key = articleKey(article);
      if (
        key === currentKey ||
        article.pillar === currentPillar ||
        selected.some((s) => articleKey(s) === key)
      ) continue;
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
