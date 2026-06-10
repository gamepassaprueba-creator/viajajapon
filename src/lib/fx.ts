import { DEFAULT_FX } from "@/data/jrpass";

export interface YenRate {
  /** ¥ por 1 €. */
  rate: number;
  /** Fecha del dato de cambio (la que publica el BCE). */
  date: string;
  /** Si se obtuvo en vivo o es el valor de respaldo. */
  live: boolean;
}

/**
 * Tipo de cambio EUR→JPY desde Frankfurter (referencia BCE, gratis, sin key).
 * Cacheado vía ISR (revalida cada 6 h). Si falla, usa el valor de respaldo.
 */
export async function getYenRate(): Promise<YenRate> {
  try {
    const res = await fetch("https://api.frankfurter.dev/v1/latest?base=EUR&symbols=JPY", {
      next: { revalidate: 21600, tags: ["fx"] },
    });
    if (!res.ok) throw new Error(`Frankfurter ${res.status}`);
    const data = (await res.json()) as { date: string; rates: { JPY: number } };
    const rate = data?.rates?.JPY;
    if (!rate || typeof rate !== "number") throw new Error("Respuesta FX inválida");
    return { rate: Math.round(rate * 100) / 100, date: data.date, live: true };
  } catch {
    return { rate: DEFAULT_FX, date: "—", live: false };
  }
}
