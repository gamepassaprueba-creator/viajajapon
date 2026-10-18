import { FLORACION } from "@/data/sakura-floracion";

/**
 * Calendario de floración de los cerezos (diseño «Calendario de floración» del lienzo de Claude
 * Design). Una fila por ciudad sobre un eje del 15-mar al 10-may: barra rosa de inicio a plena flor
 * (media 1991-2020 de la JMA), punto rojo en la plena flor media y una marca negra en la plena flor
 * real de 2026. Posiciones en % para que el mismo dibujo sirva en móvil y escritorio.
 */
const INICIO = Date.UTC(2027, 2, 15);
const FIN = Date.UTC(2027, 4, 10);

function pct(md: string) {
  const [m, d] = md.split("/").map(Number);
  return ((Date.UTC(2027, m - 1, d) - INICIO) / (FIN - INICIO)) * 100;
}

function fecha(md: string) {
  const [m, d] = md.split("/").map(Number);
  return `${d} ${["ene", "feb", "mar", "abr", "may"][m - 1]}`;
}

const MARCAS = [
  { label: "15 mar", md: "3/15" },
  { label: "1 abr", md: "4/1" },
  { label: "15 abr", md: "4/15" },
  { label: "1 may", md: "5/1" },
];

export function FloracionCalendario({ titulo = "¿Cuándo florecen los cerezos en cada ciudad?" }: { titulo?: string }) {
  return (
    <aside className="panel-manga-red my-8 flex flex-col gap-3 bg-white p-4 sm:p-6">
      <p className="kicker text-[#e1352e]">Calendario de floración · datos JMA</p>
      <p className="text-lg font-black leading-snug text-[#0a0a0a] sm:text-[22px]">{titulo}</p>

      <div className="flex gap-3" aria-hidden="true">
        <span className="w-[74px] shrink-0 sm:w-[110px]" />
        <div className="relative h-4 flex-1">
          {MARCAS.map((m) => (
            <span
              key={m.md}
              className="absolute top-0 whitespace-nowrap font-mono text-[10px] font-bold text-fg-muted sm:text-[11px]"
              style={{ left: `${pct(m.md)}%` }}
            >
              {m.label}
            </span>
          ))}
        </div>
      </div>

      <ul className="flex flex-col">
        {FLORACION.map((c) => {
          const x1 = pct(c.inicioMedia);
          const x2 = pct(c.plenaMedia);
          const real = pct(c.plena2026);
          return (
            <li key={c.ciudad} className="flex h-8 items-center gap-3 sm:h-9">
              <span className="w-[74px] shrink-0 text-[13px] font-bold sm:w-[110px] sm:text-[15px]">{c.ciudad}</span>
              <div className="relative h-[22px] flex-1">
                <span
                  className="absolute top-[3px] h-4 border-2 border-[#0a0a0a] bg-[#f8c9c6]"
                  style={{ left: `${x1}%`, width: `max(${x2 - x1}%, 8px)` }}
                />
                <span
                  className="absolute top-[2px] h-3.5 w-3.5 -translate-x-1/2 rounded-full border-2 border-[#0a0a0a] bg-[#e1352e]"
                  style={{ left: `${x2}%` }}
                />
                <span className="absolute -top-[3px] h-7 w-[3px] -translate-x-1/2 bg-[#0a0a0a]" style={{ left: `${real}%` }} />
                <span className="sr-only">
                  {`${c.ciudad}: de media empieza a florecer el ${fecha(c.inicioMedia)} y llega a plena flor el ${fecha(c.plenaMedia)}; en 2026, plena flor el ${fecha(c.plena2026)}.`}
                </span>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-[11px] text-fg-muted sm:text-xs" aria-hidden="true">
        <span className="inline-flex items-center gap-1.5">
          <span className="h-3 w-[22px] border-2 border-[#0a0a0a] bg-[#f8c9c6]" />
          De inicio a plena flor (media 1991–2020)
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full border-2 border-[#0a0a0a] bg-[#e1352e]" />
          Plena flor, media
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-4 w-[3px] bg-[#0a0a0a]" />
          Plena flor real en 2026
        </span>
      </div>
      <p className="text-[11px] text-fg-muted">
        Fuente: Agencia Meteorológica de Japón (cerezo Somei-Yoshino). La floración real se adelanta o se retrasa hasta 1–2 semanas según el año.
      </p>
    </aside>
  );
}
