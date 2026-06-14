"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";

export interface ItinItem {
  img: string;
  alt: string;
  badge: string;
  title: string;
  ruta: string;
  desc: string;
  href?: string;
}

/**
 * Filtro de itinerarios por duración (chips interactivos, patrón del mockup).
 * Filtra de verdad las tarjetas reales; sin ratings, bookmarks ni "share" falsos.
 */
export function ItinerariosFiltro({ items }: { items: ItinItem[] }) {
  const filtros = ["Todos", ...items.map((i) => i.badge)];
  const [activo, setActivo] = useState("Todos");
  const visibles = activo === "Todos" ? items : items.filter((i) => i.badge === activo);

  return (
    <div>
      {/* Barra de filtro */}
      <div className="mb-8 rounded-xl border border-border bg-surface p-4 shadow-sm">
        <p className="mb-3 text-sm font-medium text-fg-muted">Filtrar por duración:</p>
        <div className="flex flex-wrap gap-2">
          {filtros.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setActivo(f)}
              aria-pressed={activo === f}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                activo === f ? "bg-primary text-white" : "bg-muted text-fg-muted hover:bg-border hover:text-fg"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Tarjetas (mismas que la rejilla original; sin degradar) */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {visibles.map((it) =>
          it.href ? (
            <Link
              key={it.badge}
              href={it.href}
              className="group overflow-hidden rounded-lg border border-border bg-surface shadow-md transition-all hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative h-48">
                <Image
                  src={it.img}
                  alt={it.alt}
                  fill
                  sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute left-3 top-3 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white shadow">
                  {it.badge}
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold">{it.title}</h3>
                <p className="mt-2 flex items-start gap-2 text-sm text-fg-muted">
                  <MapPin size={16} className="mt-0.5 shrink-0" aria-hidden="true" /> {it.ruta}
                </p>
                <p className="mt-2 text-sm text-fg-muted">{it.desc}</p>
                <span className="mt-4 inline-flex items-center gap-1 font-medium text-primary">
                  Ver itinerario <ArrowRight size={16} aria-hidden="true" />
                </span>
              </div>
            </Link>
          ) : (
            <div
              key={it.badge}
              className="overflow-hidden rounded-lg border border-border bg-surface opacity-70 shadow-md"
            >
              <div className="relative h-48">
                <Image
                  src={it.img}
                  alt={it.alt}
                  fill
                  sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
                  className="object-cover"
                />
                <span className="absolute left-3 top-3 rounded-full bg-muted px-3 py-1 text-xs font-semibold text-fg-muted shadow">
                  En preparación
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold">{it.title}</h3>
                <p className="mt-2 flex items-start gap-2 text-sm text-fg-muted">
                  <MapPin size={16} className="mt-0.5 shrink-0" aria-hidden="true" /> {it.ruta}
                </p>
                <p className="mt-2 text-sm text-fg-muted">{it.desc}</p>
              </div>
            </div>
          ),
        )}
      </div>
    </div>
  );
}
