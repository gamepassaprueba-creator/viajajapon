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
      className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
        activo ? "bg-primary text-white" : "bg-muted text-fg-muted hover:bg-border"
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
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-surface transition-all hover:-translate-y-1 hover:border-primary hover:shadow-lg"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-muted">
        {item.hero ? (
          <Image
            src={item.hero}
            alt=""
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-muted to-surface">
            <span className="font-serif text-lg font-bold text-fg-muted/50">{item.category}</span>
          </div>
        )}
        <span className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-xs font-semibold ${item.badge}`}>
          {item.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-serif text-lg font-bold leading-snug text-fg group-hover:text-primary">{item.title}</h3>
        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-fg-muted">{item.excerpt}</p>
        <p className="nums mt-4 text-xs text-fg-muted">
          {item.date}
          {item.readingMinutes ? ` · ${item.readingMinutes} min de lectura` : ""}
        </p>
      </div>
    </Link>
  );
}
