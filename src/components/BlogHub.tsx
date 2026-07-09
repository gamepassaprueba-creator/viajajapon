"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CATEGORIAS } from "@/lib/categorias";

export interface HubItem {
  href: string;
  pillar: string;
  category: string; // etiqueta legible
  badge: string; // clases del chip
  title: string;
  excerpt: string;
  hero?: string;
  date: string; // ya formateada
  readingMinutes?: number;
}

/** Hub editorial con filtro por categoría (cliente). Las tarjetas enlazan a la
 *  URL canónica de cada artículo en su pilar; este índice solo descubre. */
export function BlogHub({ items }: { items: HubItem[] }) {
  const [activo, setActivo] = useState<string>("todos");

  // Solo mostramos pills de categorías que tienen al menos un artículo.
  const categorias = useMemo(
    () => CATEGORIAS.filter((c) => items.some((it) => it.pillar === c.pillar)),
    [items],
  );

  const visibles = useMemo(
    () => (activo === "todos" ? items : items.filter((it) => it.pillar === activo)),
    [items, activo],
  );

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filtrar por categoría">
        <Pill label="Todos" activo={activo === "todos"} onClick={() => setActivo("todos")} count={items.length} />
        {categorias.map((c) => (
          <Pill
            key={c.pillar}
            label={c.label}
            activo={activo === c.pillar}
            onClick={() => setActivo(c.pillar)}
            count={items.filter((it) => it.pillar === c.pillar).length}
          />
        ))}
      </div>

      {visibles.length === 0 ? (
        <p className="mt-10 text-center text-fg-muted">
          No hay artículos en esta categoría todavía. Prueba con{" "}
          <button onClick={() => setActivo("todos")} className="font-medium text-primary hover:underline">
            todas
          </button>
          .
        </p>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visibles.map((it) => (
            <Card key={it.href} item={it} />
          ))}
        </div>
      )}
    </div>
  );
}

function Pill({ label, activo, onClick, count }: { label: string; activo: boolean; onClick: () => void; count: number }) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={activo}
      onClick={onClick}
      className={`border-[2px] border-[#0a0a0a] px-4 py-2 font-mono text-[10px] font-black uppercase tracking-wide transition-colors ${
        activo
          ? "bg-[#0a0a0a] text-white"
          : "bg-white text-[#0a0a0a] hover:bg-[#0a0a0a] hover:text-white"
      }`}
    >
      {label} <span className={activo ? "text-white/80" : "text-fg-muted/70"}>({count})</span>
    </button>
  );
}

function Card({ item }: { item: HubItem }) {
  return (
    <Link
      href={item.href}
      className="panel-manga-dark group flex h-full flex-col overflow-hidden bg-white transition-all hover:translate-x-0.5 hover:translate-y-0.5"
    >
      <div className="relative aspect-[16/9] overflow-hidden border-b-[3px] border-[#0a0a0a] bg-[#f5f5f5]">
        {item.hero ? (
          <Image
            src={item.hero}
            alt=""
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-[#f5f5f5]">
            <span className="font-mono text-xs font-black uppercase tracking-widest text-[#ccc]">{item.category}</span>
          </div>
        )}
        <span className="tag-manga absolute left-0 top-0">{item.category}</span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="display-md text-base leading-snug text-[#0a0a0a] group-hover:text-[#e1352e]">{item.title}</h3>
        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-[#555]">{item.excerpt}</p>
        <p className="nums mt-4 font-mono text-[10px] text-[#999]">
          {item.date}
          {item.readingMinutes ? ` · ${item.readingMinutes} min` : ""}
        </p>
      </div>
    </Link>
  );
}
