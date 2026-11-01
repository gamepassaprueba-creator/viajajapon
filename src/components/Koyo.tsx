import { KOYO } from "@/data/koyo";

/**
 * Calendario del momiji (diseño «Calendario del momiji» del lienzo de Claude Design, gemelo del
 * de la floración). Una fila por ciudad sobre un eje del 20-oct al 31-dic: barra naranja de la
 * coloración a la caída de la hoja (media 1991-2020 de la JMA), punto rojo en la coloración media
 * y una marca negra en la coloración real de 2025. Posiciones en % para móvil y escritorio.
 */
const INICIO = Date.UTC(2026, 9, 20);
const FIN = Date.UTC(2026, 11, 31);

function pct(md: string) {
  const [m, d] = md.split("/").map(Number);
  return ((Date.UTC(2026, m - 1, d) - INICIO) / (FIN - INICIO)) * 100;
}

function fecha(md: string) {
  const [m, d] = md.split("/").map(Number);
  return `${d} ${["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"][m - 1]}`;
}

const MARCAS = [
  { label: "1 nov", md: "11/1" },
  { label: "15 nov", md: "11/15" },
  { label: "1 dic", md: "12/1" },
  { label: "15 dic", md: "12/15" },
];

export function KoyoCalendario({ titulo = "¿Cuándo se ponen rojos los arces en cada ciudad?" }: { titulo?: string }) {
  return (
    <aside className="panel-manga-red my-8 flex flex-col gap-3 bg-white p-4 sm:p-6">
      <p className="kicker text-[#d32f2f]">Calendario del momiji · datos JMA</p>
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
        {KOYO.map((c) => {
          const x1 = pct(c.colorMedia);
          const x2 = pct(c.caidaMedia);
          const real = pct(c.color2025);
          return (
            <li key={c.ciudad} className="flex h-8 items-center gap-3 sm:h-9">
              <span className="w-[74px] shrink-0 text-[13px] font-bold sm:w-[110px] sm:text-[15px]">{c.ciudad}</span>
              <div className="relative h-[22px] flex-1">
                <span
                  className="absolute top-[3px] h-4 border-2 border-[#0a0a0a] bg-[#f4b183]"
                  style={{ left: `${x1}%`, width: `max(${x2 - x1}%, 8px)` }}
                />
                <span
                  className="absolute top-[2px] h-3.5 w-3.5 -translate-x-1/2 rounded-full border-2 border-[#0a0a0a] bg-[#e1352e]"
                  style={{ left: `${x1}%` }}
                />
                <span className="absolute -top-[3px] h-7 w-[3px] -translate-x-1/2 bg-[#0a0a0a]" style={{ left: `${real}%` }} />
                <span className="sr-only">
                  {`${c.ciudad}: de media los arces se ponen rojos el ${fecha(c.colorMedia)} y pierden la hoja hacia el ${fecha(c.caidaMedia)}; en 2025 se pusieron rojos el ${fecha(c.color2025)}.`}
                </span>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-[11px] text-fg-muted sm:text-xs" aria-hidden="true">
        <span className="inline-flex items-center gap-1.5">
          <span className="h-3 w-[22px] border-2 border-[#0a0a0a] bg-[#f4b183]" />
          De la coloración a la caída de la hoja (media 1991–2020)
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full border-2 border-[#0a0a0a] bg-[#e1352e]" />
          Coloración, media
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-4 w-[3px] bg-[#0a0a0a]" />
          Coloración real en 2025
        </span>
      </div>
      <p className="text-[11px] text-fg-muted">
        Fuente: Agencia Meteorológica de Japón (arce iroha-kaede; en Sapporo, una especie sustituta). Mide un árbol de muestra
        en cada observatorio: los jardines y montes famosos pueden adelantarse o retrasarse.
      </p>
    </aside>
  );
}
