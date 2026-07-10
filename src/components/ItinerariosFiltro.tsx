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
      <div className="mb-8 border-[2px] border-[#0a0a0a] bg-white p-4">
        <p className="mb-3 font-mono text-[10px] font-black uppercase tracking-widest text-[#555]">Filtrar por duración:</p>
        <div className="flex flex-wrap gap-2">
          {filtros.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setActivo(f)}
              aria-pressed={activo === f}
              className={`border-[2px] px-4 py-2 font-mono text-[10px] font-black uppercase tracking-wide transition-colors ${
                activo === f
                  ? "border-[#0a0a0a] bg-[#0a0a0a] text-white"
                  : "border-[#0a0a0a] bg-white text-[#0a0a0a] hover:bg-[#e1352e] hover:border-[#e1352e] hover:text-white"
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
              className="panel-manga-dark group flex flex-col overflow-hidden bg-white transition-all hover:translate-x-0.5 hover:translate-y-0.5"
            >
              <div className="relative h-44 overflow-hidden border-b-[3px] border-[#0a0a0a]">
                <Image
                  src={it.img}
                  alt={it.alt}
                  fill
                  sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="tag-manga absolute left-0 top-0">{it.badge}</span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="display-md text-lg text-[#0a0a0a]">{it.title}</h3>
                <p className="mt-1.5 flex items-center gap-1.5 font-mono text-[10px] text-[#777]">
                  <MapPin size={10} aria-hidden="true" /> {it.ruta}
                </p>
                <p className="mt-2 text-sm text-[#555]">{it.desc}</p>
                <span className="mt-auto pt-3 font-mono text-[10px] font-black uppercase tracking-wide text-[#e1352e]">
                  Ver itinerario <ArrowRight size={12} className="inline" aria-hidden="true" />
                </span>
              </div>
            </Link>
          ) : (
            <div
              key={it.badge}
              className="flex flex-col overflow-hidden border-[2px] border-[#ccc] bg-white opacity-60"
            >
              <div className="relative h-44 overflow-hidden border-b-[2px] border-[#ccc]">
                <Image
                  src={it.img}
                  alt={it.alt}
                  fill
                  sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
                  className="object-cover grayscale"
                />
                <span className="tag-dark absolute left-0 top-0 opacity-70">En preparación</span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="display-md text-lg text-[#0a0a0a]">{it.title}</h3>
                <p className="mt-1.5 flex items-center gap-1.5 font-mono text-[10px] text-[#999]">
                  <MapPin size={10} aria-hidden="true" /> {it.ruta}
                </p>
                <p className="mt-2 text-sm text-[#999]">{it.desc}</p>
              </div>
            </div>
          ),
        )}
      </div>
    </div>
  );
}
