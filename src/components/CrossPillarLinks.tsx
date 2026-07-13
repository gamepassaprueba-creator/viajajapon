import Link from "next/link";
import { getAllArticles } from "@/lib/content";
import { categoriaDe } from "@/lib/categorias";

export function CrossPillarLinks({ currentPillar, currentSlug }: { currentPillar: string; currentSlug: string }) {
  const all = getAllArticles();
  
  // Filtrar artículos que NO sean del pilar actual
  const otherPillars = all.filter(a => a.pillar !== currentPillar && a.slug !== currentSlug);
  
  // Seleccionar hasta 3 artículos, preferiblemente de pilares distintos
  const selected = [];
  const seenPillars = new Set();
  
  for (const a of otherPillars) {
    if (!seenPillars.has(a.pillar)) {
      selected.push(a);
      seenPillars.add(a.pillar);
    }
    if (selected.length === 3) break;
  }
  
  // Si no llegamos a 3 con pilares distintos, rellenamos con otros
  if (selected.length < 3) {
    for (const a of otherPillars) {
      if (!selected.some(s => s.slug === a.slug)) {
        selected.push(a);
        if (selected.length === 3) break;
      }
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
            <li key={a.slug}>
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
