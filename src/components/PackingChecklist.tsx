"use client";

import { useEffect, useMemo, useState } from "react";
import { Printer, RotateCcw } from "lucide-react";

export interface PackingCategory {
  id: string;
  titulo: string;
  descripcion?: string;
  items: string[];
}

export interface SeasonClothing {
  id: string;
  etiqueta: string;
  items: string[];
}

/**
 * Checklist de equipaje interactiva: el progreso se guarda en el navegador
 * (localStorage), sin cuentas ni servidor. Imprimible con el botón o Ctrl+P.
 * Si recibe `temporadas`, muestra un selector que adapta la categoría de ropa
 * (id "ropa") a la estación elegida.
 */
export function PackingChecklist({
  categorias,
  temporadas,
  storageKey = "viajajapon-maleta",
}: {
  categorias: PackingCategory[];
  temporadas?: SeasonClothing[];
  storageKey?: string;
}) {
  const [store, setStore] = useState<{
    loaded: boolean;
    checked: Record<string, boolean>;
    temporada?: string;
  }>({ loaded: false, checked: {} });
  const { loaded, checked, temporada } = store;
  const setChecked = (updater: (prev: Record<string, boolean>) => Record<string, boolean>) =>
    setStore((s) => ({ ...s, checked: updater(s.checked) }));

  useEffect(() => {
    let initial: Record<string, boolean> = {};
    let temporadaGuardada: string | undefined;
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        const parsed = JSON.parse(raw);
        // Compatibilidad: la primera versión guardaba el mapa de checks a pelo.
        if (parsed && typeof parsed === "object" && "checked" in parsed) {
          initial = parsed.checked ?? {};
          temporadaGuardada = parsed.temporada;
        } else {
          initial = parsed ?? {};
        }
      }
    } catch {
      /* almacenamiento no disponible: la checklist funciona sin persistir */
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect -- localStorage no existe en SSR: hidratar el estado tras montar es el patrón estándar y el re-render es intencionado
    setStore({ loaded: true, checked: initial, temporada: temporadaGuardada });
  }, [storageKey]);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(storageKey, JSON.stringify({ checked, temporada }));
    } catch {
      /* idem */
    }
  }, [checked, temporada, loaded, storageKey]);

  // Si hay temporada elegida, la categoría "ropa" usa la lista de esa estación.
  const categoriasEfectivas = useMemo(() => {
    const season = temporadas?.find((t) => t.id === temporada);
    if (!season) return categorias;
    return categorias.map((c) =>
      c.id === "ropa" ? { ...c, titulo: `Ropa (${season.etiqueta.toLowerCase()})`, items: season.items } : c
    );
  }, [categorias, temporadas, temporada]);

  const keys = useMemo(
    () => categoriasEfectivas.flatMap((c) => c.items.map((item) => `${c.id}::${item}`)),
    [categoriasEfectivas]
  );
  const total = keys.length;
  const done = keys.filter((k) => checked[k]).length;
  const pct = total ? Math.round((done / total) * 100) : 0;

  return (
    <div className="my-8 rounded-lg border border-border bg-surface">
      {/* Cabecera con progreso global */}
      <div className="flex flex-wrap items-center gap-4 border-b border-border p-5">
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-fg">
            Tu maleta: <span className="nums">{done}/{total}</span>
          </p>
          <div
            role="progressbar"
            aria-valuenow={pct}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Progreso de la maleta"
            className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted"
          >
            <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${pct}%` }} />
          </div>
        </div>
        <div className="flex gap-2 print:hidden">
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-sm font-medium text-fg transition-colors hover:border-primary hover:text-primary"
          >
            <Printer size={15} aria-hidden="true" /> Imprimir
          </button>
          <button
            type="button"
            onClick={() => setChecked(() => ({}))}
            className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-sm font-medium text-fg-muted transition-colors hover:border-primary hover:text-primary"
          >
            <RotateCcw size={15} aria-hidden="true" /> Reiniciar
          </button>
        </div>
      </div>

      {/* Selector de temporada: adapta la categoría de ropa */}
      {temporadas && temporadas.length > 0 && (
        <div className="border-b border-border px-5 py-4">
          <p className="text-sm font-semibold text-fg">Ajusta la ropa a tu temporada:</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {temporadas.map((t) => {
              const activa = temporada === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  aria-pressed={activa}
                  onClick={() => setStore((s) => ({ ...s, temporada: activa ? undefined : t.id }))}
                  className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
                    activa
                      ? "border-primary bg-primary text-white"
                      : "border-border bg-surface text-fg-muted hover:border-primary hover:text-primary"
                  }`}
                >
                  {t.etiqueta}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Categorías, siempre visibles (también al imprimir) */}
      <div className="grid gap-x-8 gap-y-6 p-5 md:grid-cols-2">
        {categoriasEfectivas.map((cat) => {
          const catDone = cat.items.filter((item) => checked[`${cat.id}::${item}`]).length;
          return (
            <section key={cat.id} aria-label={cat.titulo}>
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="font-semibold text-fg">{cat.titulo}</h3>
                <span className="nums text-xs text-fg-muted">{catDone}/{cat.items.length}</span>
              </div>
              {cat.descripcion && <p className="mt-0.5 text-xs text-fg-muted">{cat.descripcion}</p>}
              <ul className="mt-2 space-y-1">
                {cat.items.map((item) => {
                  const k = `${cat.id}::${item}`;
                  const isChecked = !!checked[k];
                  return (
                    <li key={k}>
                      <label className="flex cursor-pointer items-start gap-2.5 rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-muted">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={(e) => setChecked((prev) => ({ ...prev, [k]: e.target.checked }))}
                          className="mt-0.5 size-4 shrink-0 accent-primary"
                        />
                        <span className={isChecked ? "text-fg-muted line-through" : "text-fg"}>{item}</span>
                      </label>
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
      </div>

      <p className="border-t border-border px-5 py-3 text-xs text-fg-muted print:hidden">
        El progreso se guarda solo en tu navegador. Nadie más lo ve, y se borra si limpias los datos del navegador.
      </p>
    </div>
  );
}
