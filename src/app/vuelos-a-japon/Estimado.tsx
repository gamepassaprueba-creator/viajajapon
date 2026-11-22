"use client";

import { useEffect, useRef } from "react";
import { trackEvent } from "@/lib/analytics";
import { VUELOS, VUELOS_ESTIMADO, calcularEstimado, euros } from "@/data/vuelos";

/**
 * Caja «Tu precio estimado con nuestro colaborador» bajo el precio del formulario (diseño
 * «VuelosEstimado» del lienzo). Tres estados: sin precio, con estimación y «no compensa».
 * Sin regla en VUELOS_ESTIMADO no pinta nada.
 */
export function Estimado({ precio, personas }: { precio: string; personas: number }) {
  const e = calcularEstimado(precio, personas);
  const visto = useRef(false);

  useEffect(() => {
    if (e && !visto.current) {
      visto.current = true;
      trackEvent("vuelos_estimado_view", { compensa: e.compensa ? "si" : "no" });
    }
  }, [e]);

  if (!VUELOS_ESTIMADO) return null;

  if (!e) {
    return (
      <div className="flex flex-col gap-1.5 border-[3px] border-dashed border-[#0a0a0a] bg-[#f5f5f5] p-3.5">
        <b className="text-[15px] leading-snug">Escribe lo que te sale en iberia.com y te calculamos al momento tu precio estimado.</b>
        <span className="text-xs text-fg-muted">¿Aún no lo has mirado? Déjalo vacío y te lo buscamos nosotros.</span>
      </div>
    );
  }

  if (!e.compensa) {
    return (
      <div role="status" className="flex flex-col gap-1.5 border-[3px] border-[#0a0a0a] bg-white p-3.5">
        <b className="text-[15px] leading-snug">
          Con {euros(e.precio)} el ahorro sería de menos de {euros(VUELOS_ESTIMADO.ahorroMinimo)}.
        </b>
        <span className="text-sm leading-normal">
          Puedes enviarlo igual: nuestro colaborador lo mira y, si no hay forma de mejorarlo, te lo dice sin compromiso.
        </span>
      </div>
    );
  }

  const pct = Math.round(VUELOS_ESTIMADO.descuento * 100);
  const desglose = VUELOS_ESTIMADO.codigo !== null;
  return (
    <section aria-label="Tu precio estimado" role="status" className="flex flex-col border-[3px] border-[#0a0a0a] bg-[#fff7f6]">
      <div className="flex items-center justify-between gap-3 bg-[#0a0a0a] px-3 py-2.5 text-white sm:px-4">
        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.08em] sm:text-[11px]">
          Tu precio estimado<span className="hidden sm:inline"> con nuestro colaborador</span>
        </span>
        <span className="bg-[#e1352e] px-1.5 py-0.5 font-mono text-[10px] font-bold sm:text-[11px]">ORIENTATIVO</span>
      </div>
      <div className="grid sm:grid-cols-2">
        <div className="hidden flex-col gap-2.5 border-r-2 border-[#0a0a0a] p-4 text-[15px] sm:flex">
          <span className="flex justify-between gap-3">
            <span>Precio en iberia.com</span>
            <b className="font-mono">{euros(e.precio)}</b>
          </span>
          <span className="flex justify-between gap-3">
            <span>{desglose ? `Descuento del código (${pct} %)` : `Ahorro estimado (al menos un ${pct} %)`}</span>
            <b className="font-mono text-[#1a7f37]">{euros(-e.descuento)}</b>
          </span>
          {desglose && (
            <span className="flex justify-between gap-3">
              <span>Lo que cuesta el código</span>
              <b className="font-mono">+{euros(e.coste)}</b>
            </span>
          )}
          <span className="flex justify-between gap-3 border-t-2 border-dashed border-[#0a0a0a] pt-2.5">
            <b>Pagarías en total</b>
            <b className="font-mono">{euros(e.total)}</b>
          </span>
        </div>
        <div className="flex flex-col justify-center gap-1 bg-white p-3.5 sm:p-4">
          <span className="text-xs text-fg-muted sm:text-[13px]">Por persona</span>
          <span className="font-mono text-[34px] font-bold leading-none sm:text-[40px]">≈ {euros(e.porPersona)}</span>
          <span className="text-xs text-fg-muted sm:text-[13px]">en vez de {euros(e.precioPorPersona)} en iberia.com</span>
          <span className="mt-1.5 self-start border-2 border-[#1a7f37] px-2.5 py-1 text-sm font-bold text-[#1a7f37]">
            Ahorras ≈ {euros(e.ahorro)}
            {personas > 1 ? " en total" : ""}
          </span>
        </div>
      </div>
      <details className="border-t-2 border-[#0a0a0a] sm:hidden">
        <summary className="flex min-h-11 cursor-pointer items-center px-3 text-[13px] font-bold">Ver la cuenta</summary>
        <p className="m-0 px-3 pb-3 text-[13px] leading-relaxed">
          {desglose
            ? `iberia.com: ${euros(e.precio)} · código −${pct} %: ${euros(-e.descuento)} · coste del código: +${euros(e.coste)} · total: ${euros(e.total)}`
            : `iberia.com: ${euros(e.precio)} · ahorro estimado (al menos un ${pct} %): ${euros(-e.descuento)} · total: ${euros(e.total)}`}
        </p>
      </details>
      <p className="m-0 border-t-2 border-[#0a0a0a] px-3 py-2.5 text-[11px] leading-normal text-[#333] sm:px-4 sm:text-xs">
        Calculado con la regla de nuestro colaborador ({VUELOS.colaborador.nombre}) sobre el precio que has escrito. El precio final te
        lo confirma él antes de que pagues nada, y puede cambiar si iberia.com cambia el precio.
      </p>
    </section>
  );
}
