"use client";

import { useYenRate } from "@/lib/hooks/useYenRate";
import { CurrencyConverter } from "@/components/CurrencyConverter";

export function ClientConversorYen() {
  const { rate, date, live, isLoading } = useYenRate();
  const per100 = (100 / rate).toFixed(2);
  const updated = live && date !== "—" ? date : "2026-06-02";

  return (
    <>
      <div className="panel-manga mt-8 bg-white p-8 text-center" aria-live="polite">
        <p className="kicker text-[#555]">Cambio de referencia</p>
        <p className="nums mt-3 text-5xl font-black text-[#0a0a0a] sm:text-6xl">
          1€ = ¥{rate}
        </p>
        <p className="nums mt-3 text-[#555]">¥100 ≈ {per100}€</p>
        <p className="mt-4 font-mono text-[10px] text-[#999]">
          {isLoading ? (
            "Actualizando cambio..."
          ) : (
            <>Actualizado: {updated} · fuente: referencia BCE (Frankfurter){live ? "" : " · valor estimado (sin conexión)"}.</>
          )}
        </p>
      </div>

      <CurrencyConverter rate={rate} />
    </>
  );
}
