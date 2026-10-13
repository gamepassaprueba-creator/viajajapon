"use client";

import { useEffect, useMemo, useState } from "react";
import { ArticleCard } from "@/components/ArticleCard";
import type { ArticleMeta } from "@/lib/content";
import { formatDate } from "@/lib/format";

/** Minúsculas y sin diacríticos: "Kioto" encuentra "kioto" y "ramén" encuentra "ramen". */
const fold = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

export function SearchClient({ articles }: { articles: ArticleMeta[] }) {
  const [query, setQuery] = useState("");

  // Lee ?q= al montar (el buscador de /blog y los enlaces compartidos llegan con él).
  // No usamos useSearchParams: exigiría <Suspense> y dejaría el formulario fuera del HTML.
  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("q");
    // eslint-disable-next-line react-hooks/set-state-in-effect -- estado inicial desde la URL tras hidratar
    if (q) setQuery(q);
  }, []);

  // Refleja la búsqueda en la URL (sin recargar) para poder compartirla o volver atrás.
  useEffect(() => {
    const t = setTimeout(() => {
      const q = query.trim();
      const search = q ? `?q=${encodeURIComponent(q)}` : "";
      if (window.location.search !== search) {
        window.history.replaceState(null, "", search || window.location.pathname);
      }
    }, 300);
    return () => clearTimeout(t);
  }, [query]);

  const filtered = useMemo(() => {
    const q = fold(query).trim();
    if (!q) return [];

    return articles.filter((a) => {
      const matchTitle = fold(a.title).includes(q);
      const matchDesc = fold(a.excerpt || a.description || "").includes(q);
      const matchPillar = fold(a.pillar).includes(q);
      return matchTitle || matchDesc || matchPillar;
    });
  }, [query, articles]);

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:py-16">
      <div className="mb-8">
        <label htmlFor="search" className="sr-only">Buscar artículos</label>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-[#0a0a0a]">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </div>
          <input
            id="search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="¿Qué estás buscando? (ej. Kioto, JR Pass, ramen...)"
            className="w-full border-[3px] border-[#0a0a0a] bg-white p-4 pl-12 text-lg font-black text-[#0a0a0a] outline-none transition-shadow focus:shadow-[4px_4px_0_#e1352e] placeholder:font-normal placeholder:text-[#555]"
            autoFocus
          />
        </div>
      </div>

      {query.trim() && (
        <div className="mb-4">
          <p className="font-mono text-sm font-black uppercase text-[#555]">
            {filtered.length} {filtered.length === 1 ? "resultado" : "resultados"}
          </p>
        </div>
      )}

      {filtered.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((a) => (
            <ArticleCard
              key={a.slug}
              href={`/${a.pillar}/${a.slug}`}
              kicker={a.kicker}
              title={a.title}
              excerpt={a.excerpt || a.description}
              date={formatDate(a.dateModified)}
            />
          ))}
        </div>
      )}

      {query.trim() && filtered.length === 0 && (
        <div className="panel-manga-dark mt-8 p-8 text-center bg-white">
          <p className="text-xl font-black text-[#0a0a0a]">No hemos encontrado nada para {'"'}{query}{'"'}</p>
          <p className="mt-2 text-[#555]">Prueba con otra palabra clave o navega por las categorías.</p>
        </div>
      )}
    </div>
  );
}
