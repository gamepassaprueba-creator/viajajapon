import type { Metadata } from "next";
import Link from "next/link";
import { getAllArticles } from "@/lib/content";

export const metadata: Metadata = {
  title: "Buscar",
  robots: { index: false, follow: true },
};

interface SearchDoc {
  title: string;
  href: string;
  desc: string;
}

/** Índice de búsqueda: páginas clave + TODOS los artículos publicados (los borradores quedan fuera). */
function buildIndex(): SearchDoc[] {
  const fixed: SearchDoc[] = [
    { title: "Calculadora del JR Pass", href: "/herramientas/jr-pass-calculadora", desc: "Calcula si te compensa el JR Pass según tu ruta, en euros." },
    { title: "Cambio del yen hoy", href: "/cambio-yen-euro", desc: "A cuánto está el yen y qué supone para tu presupuesto." },
    { title: "Consejos prácticos para viajar a Japón", href: "/logistica", desc: "Transporte, eSIM, seguros, enchufes, maleta y mejor época." },
    { title: "Noticias y novedades de Japón", href: "/blog", desc: "Actualidad útil para tu viaje: yen, festivales y reservas." },
  ];
  // Todos los pilares, no solo logística/blog (antes dejaba 36 de 53 artículos sin indexar).
  const fromArticles: SearchDoc[] = getAllArticles().map((a) => ({
    title: a.title,
    href: `/${a.pillar}/${a.slug}`,
    desc: a.excerpt || a.description,
  }));
  return [...fixed, ...fromArticles];
}

export default async function Page({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q = "" } = await searchParams;
  const query = q.trim().toLowerCase();
  // Todas las palabras de la consulta deben aparecer en título o descripción.
  const terms = query.split(/\s+/).filter(Boolean);
  const results = terms.length
    ? buildIndex().filter((p) => {
        const hay = `${p.title} ${p.desc}`.toLowerCase();
        return terms.every((t) => hay.includes(t));
      })
    : [];

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-black text-[#0a0a0a]">Buscar{query ? `: "${q}"` : ""}</h1>
      <form action="/buscar" className="mt-4 flex max-w-xl items-center gap-0 border-[2px] border-[#0a0a0a] focus-within:border-[#e1352e]">
        <label htmlFor="q" className="sr-only">Buscar</label>
        <input id="q" name="q" type="search" defaultValue={q} placeholder="Busca en la guía…" className="flex-1 border-none bg-white px-4 py-3 text-[#0a0a0a] outline-none placeholder:text-[#999]" />
        <button type="submit" className="border-l-[2px] border-[#0a0a0a] bg-[#e1352e] px-5 py-3 font-mono text-xs font-black uppercase tracking-wide text-white transition-colors hover:bg-[#b8271f]">Buscar</button>
      </form>

      {query && (
        <p className="mt-5 font-mono text-xs text-[#999]">{results.length} resultado{results.length === 1 ? "" : "s"}.</p>
      )}
      <ul className="mt-4 space-y-3">
        {results.map((r) => (
          <li key={r.href}>
            <Link href={r.href} className="panel-manga-dark block bg-white p-4 transition-all hover:translate-x-0.5 hover:translate-y-0.5">
              <span className="font-black text-[#0a0a0a]">{r.title}</span>
              <span className="mt-1 block text-sm text-[#555]">{r.desc}</span>
            </Link>
          </li>
        ))}
        {query && results.length === 0 && (
          <li className="font-mono text-xs text-[#999]">Sin resultados. Prueba con "JR Pass", "yen" o "itinerario".</li>
        )}
      </ul>
    </div>
  );
}
