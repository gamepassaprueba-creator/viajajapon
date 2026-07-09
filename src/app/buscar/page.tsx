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
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold">Buscar{query ? `: “${q}”` : ""}</h1>
      <form action="/buscar" className="mt-4 flex max-w-xl items-center gap-2 rounded-lg border border-border bg-surface p-2 focus-within:ring-2 focus-within:ring-primary">
        <label htmlFor="q" className="sr-only">Buscar</label>
        <input id="q" name="q" type="search" defaultValue={q} placeholder="Busca en la guía…" className="flex-1 border-none bg-transparent px-2 py-2 outline-none" />
        <button type="submit" className="rounded-md bg-primary px-5 py-2 font-medium text-white hover:bg-primary-strong">Buscar</button>
      </form>

      {query && (
        <p className="mt-6 text-sm text-fg-muted">{results.length} resultado{results.length === 1 ? "" : "s"}.</p>
      )}
      <ul className="mt-4 space-y-3">
        {results.map((r) => (
          <li key={r.href}>
            <Link href={r.href} className="block rounded-lg border border-border bg-surface p-4 transition-colors hover:border-primary">
              <span className="font-semibold text-fg">{r.title}</span>
              <span className="mt-1 block text-sm text-fg-muted">{r.desc}</span>
            </Link>
          </li>
        ))}
        {query && results.length === 0 && (
          <li className="text-fg-muted">No se encontraron resultados. Prueba con “JR Pass”, “yen” o “itinerario”.</li>
        )}
      </ul>
    </div>
  );
}
