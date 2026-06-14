"use client";

import { useState } from "react";

/**
 * Conversor euro ⇄ yen bidireccional (patrón del mockup "Dinero en Japón").
 * Usa el tipo de referencia en vivo que la página ya obtiene del BCE (prop rate),
 * así que no añade ninguna llamada de red. Escribe en cualquiera de los dos campos.
 */
export function CurrencyConverter({ rate }: { rate: number }) {
  const [eur, setEur] = useState("100");
  const [jpy, setJpy] = useState(String(Math.round(100 * rate)));

  const num = (v: string) => parseFloat(v.replace(",", ".").replace(/[^0-9.]/g, ""));

  function onEur(v: string) {
    setEur(v);
    const n = num(v);
    setJpy(Number.isFinite(n) ? String(Math.round(n * rate)) : "");
  }
  function onJpy(v: string) {
    setJpy(v);
    const n = num(v);
    setEur(Number.isFinite(n) ? (n / rate).toFixed(2) : "");
  }

  const field =
    "nums mt-1 w-full rounded-md border border-border bg-bg px-4 py-3 text-2xl font-bold text-fg outline-none focus:border-primary focus:ring-2 focus:ring-ring/40";

  return (
    <div className="mt-8 rounded-lg border border-border bg-surface p-6 shadow-sm">
      <p className="kicker text-fg-muted">Conversor</p>
      <div className="mt-3 grid items-end gap-3 sm:grid-cols-[1fr_auto_1fr]">
        <label className="block">
          <span className="text-sm font-medium text-fg-muted">Euros (€)</span>
          <input
            id="conv-eur"
            type="text"
            inputMode="decimal"
            autoComplete="off"
            value={eur}
            onChange={(e) => onEur(e.target.value)}
            aria-label="Cantidad en euros"
            className={field}
          />
        </label>
        <span aria-hidden="true" className="hidden select-none pb-3 text-center text-2xl text-fg-muted sm:block">⇄</span>
        <label className="block">
          <span className="text-sm font-medium text-fg-muted">Yenes (¥)</span>
          <input
            id="conv-jpy"
            type="text"
            inputMode="numeric"
            autoComplete="off"
            value={jpy}
            onChange={(e) => onJpy(e.target.value)}
            aria-label="Cantidad en yenes"
            className={field}
          />
        </label>
      </div>
      <p className="nums mt-3 text-xs text-fg-muted">
        Cambio aplicado: 1€ = ¥{rate}. Tipo de referencia (BCE), sin comisiones de tu banco o tarjeta.
      </p>
    </div>
  );
}
