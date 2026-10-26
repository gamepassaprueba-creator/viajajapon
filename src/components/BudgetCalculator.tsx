"use client";

import { useState } from "react";
import Link from "next/link";
import { BUDGET_PER_DAY, DEFAULT_FX, PROFILE_LABEL, type Profile } from "@/data/jrpass";

/**
 * Mini calculadora incrustada en la guía «Cuánto cuesta viajar a Japón»: gasto en destino según días
 * y estilo. Usa los mismos datos que la tabla de la guía y que la calculadora completa
 * (/herramientas/calculadora-presupuesto): BUDGET_PER_DAY a ¥185/€ (40/95/215 €/día). Antes usaba
 * cifras propias (¥10.000/20.000/40.000 al día a ¥165/€) que contradecían la tabla de la misma guía.
 */

const PROFILES = Object.keys(PROFILE_LABEL) as Profile[];
const miles = (n: number) => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ".");

export function BudgetCalculator() {
  const [days, setDays] = useState(14);
  const [profile, setProfile] = useState<Profile>("medio");

  const b = BUDGET_PER_DAY[profile];
  const totalYen = days * (b.lodging + b.food + b.local);
  const totalEur = totalYen / DEFAULT_FX;
  const full = `/herramientas/calculadora-presupuesto?d=${days}&n=2&p=${profile}&t=normal&r=clasica&v=850`;

  return (
    <div className="panel-manga-red my-8 bg-white p-5 md:p-8">
      <div className="mb-6 border-b-[3px] border-[#0a0a0a] pb-4">
        <p className="kicker text-[#d32f2f]">Calculadora rápida</p>
        <h3 className="mt-1 text-2xl font-black text-[#0a0a0a]">Presupuesto en destino</h3>
        <p className="mt-2 text-sm leading-relaxed text-[#555]">
          Lo que gastarás en Japón por persona: alojamiento compartiendo habitación doble, comida, transporte local y extras.{" "}
          <strong className="text-[#0a0a0a]">Sin vuelos ni shinkansen.</strong>
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <label htmlFor="bc-days" className="mb-3 block font-bold text-[#0a0a0a]">
            ¿Cuántos días vas a viajar? <span className="nums text-[#d32f2f]">{days} días</span>
          </label>
          <input
            id="bc-days"
            type="range"
            min="5"
            max="30"
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
            className="w-full accent-[#e1352e]"
          />
          <div className="mt-1 flex justify-between font-mono text-xs text-[#555]">
            <span>5 d</span>
            <span>15 d</span>
            <span>30 d</span>
          </div>
        </div>

        <fieldset>
          <legend className="mb-3 block font-bold text-[#0a0a0a]">Estilo de viaje</legend>
          <div className="grid grid-cols-3 gap-2">
            {PROFILES.map((p) => (
              <button
                key={p}
                type="button"
                aria-pressed={profile === p}
                onClick={() => setProfile(p)}
                className={`min-h-11 border-[2px] border-[#0a0a0a] py-2 text-[11px] font-black uppercase tracking-wider transition-colors sm:text-xs ${
                  profile === p ? "bg-[#0a0a0a] text-white" : "bg-[#f5f5f5] text-[#0a0a0a] hover:bg-[#e0e0e0]"
                }`}
              >
                {PROFILE_LABEL[p]}
              </button>
            ))}
          </div>
        </fieldset>

        <div className="mt-6 border-t-[3px] border-dashed border-[#0a0a0a] pt-6">
          <p className="text-sm font-bold uppercase tracking-wide text-[#0a0a0a]">Gasto estimado en destino, por persona:</p>
          <div className="mt-2 flex flex-wrap items-baseline gap-x-3">
            <span className="nums text-4xl font-black text-[#0a0a0a]">{miles(totalEur)} €</span>
            <span className="nums text-lg font-bold text-[#555]">(≈ ¥{miles(totalYen)})</span>
          </div>
          <p className="mt-3 text-[11px] leading-relaxed text-[#555]">
            Cálculo orientativo a ¥185/€, con las mismas cifras de la tabla de esta guía. No incluye vuelos, shinkansen, JR Pass ni seguro.
          </p>
          <Link href={full} className="btn-primary mt-4 inline-flex text-sm">
            Calcular con ruta, temporada y vuelo <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
