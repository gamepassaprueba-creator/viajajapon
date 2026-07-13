"use client";

import { useState } from "react";

export function BudgetCalculator() {
  const [days, setDays] = useState(14);
  const [style, setStyle] = useState<"mochilero" | "medio" | "lujo">("medio");

  const dailyRates = {
    mochilero: 10000,
    medio: 20000,
    lujo: 40000,
  };

  const totalYen = days * dailyRates[style];
  const totalEur = Math.round(totalYen / 165); // Exchange rate reference

  return (
    <div className="panel-manga-red my-8 bg-white p-5 md:p-8">
      <div className="mb-6 border-b-[3px] border-[#0a0a0a] pb-4">
        <p className="kicker text-[#e1352e]">Calculadora interactiva</p>
        <h3 className="mt-1 text-2xl font-black text-[#0a0a0a]">Presupuesto en destino</h3>
        <p className="mt-2 text-sm text-[#555] leading-relaxed">Calcula cuánto gastarás en Japón (alojamiento, comida, transporte local y ocio). <strong className="text-[#0a0a0a]">Los vuelos no están incluidos.</strong></p>
      </div>
      
      <div className="space-y-6">
        <div>
          <label className="mb-3 block font-bold text-[#0a0a0a]">
            ¿Cuántos días vas a viajar? <span className="nums text-[#e1352e]">{days} días</span>
          </label>
          <input 
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

        <div>
          <label className="mb-3 block font-bold text-[#0a0a0a]">Estilo de viaje</label>
          <div className="grid grid-cols-3 gap-2">
            {(["mochilero", "medio", "lujo"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setStyle(s)}
                className={`border-[2px] border-[#0a0a0a] py-2 text-[10px] sm:text-xs font-black uppercase tracking-wider transition-colors ${
                  style === s ? "bg-[#0a0a0a] text-white" : "bg-[#f5f5f5] text-[#555] hover:bg-[#e0e0e0]"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 border-t-[3px] border-dashed border-[#0a0a0a] pt-6">
          <p className="text-sm font-bold text-[#0a0a0a] uppercase tracking-wide">Gasto estimado total:</p>
          <div className="mt-2 flex items-baseline gap-3">
            <span className="nums text-4xl font-black text-[#e1352e]">
              ¥{totalYen.toLocaleString("es-ES")}
            </span>
            <span className="nums text-lg font-bold text-[#555]">
              (≈ {totalEur.toLocaleString("es-ES")} €)
            </span>
          </div>
          <p className="mt-3 text-[11px] leading-relaxed text-[#555]">
            * Cálculo orientativo a un cambio de 1€ = ¥165. No incluye vuelos internacionales, pase JR nacional ni seguro de viaje.
          </p>
        </div>
      </div>
    </div>
  );
}
