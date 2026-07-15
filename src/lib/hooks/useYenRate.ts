"use client";

import { useState, useEffect } from "react";
import { DEFAULT_FX } from "@/data/jrpass";

export interface YenRate {
  rate: number;
  date: string;
  live: boolean;
  isLoading: boolean;
}

const CACHE_KEY = "fx_rate_v1";
const TTL = 6 * 60 * 60 * 1000; // 6 horas

// Controladores globales para deduplicación
let fetchPromise: Promise<YenRate> | null = null;

// Validación robusta del rate
function isValidRate(r: unknown): boolean {
  return typeof r === "number" && Number.isFinite(r) && r > 50 && r < 500;
}

export function useYenRate() {
  const [data, setData] = useState<YenRate>({
    rate: DEFAULT_FX,
    date: "—", // En fallback o primera carga no garantizamos la fecha
    live: false,
    isLoading: false,
  });

  useEffect(() => {
    let mounted = true;

    async function loadRate() {
      // 1. Intentar leer caché válido
      try {
        const cached = window.localStorage.getItem(CACHE_KEY);
        if (cached) {
          const parsed = JSON.parse(cached);
          if (parsed && isValidRate(parsed.rate) && typeof parsed.timestamp === "number") {
            if (Date.now() - parsed.timestamp < TTL) {
              if (mounted) {
                setData({ rate: parsed.rate, date: typeof parsed.date === "string" ? parsed.date : "—", live: true, isLoading: false });
              }
              return;
            }
          }
        }
      } catch {
        // Ignorar JSON corrupto o errores de localStorage
      }

      // 2. Si no hay petición en curso, iniciar una
      if (!fetchPromise) {
        fetchPromise = fetch("https://api.frankfurter.dev/v1/latest?base=EUR&symbols=JPY")
          .then((res) => {
            if (!res.ok) throw new Error("API error");
            return res.json();
          })
          .then((json: Record<string, unknown>) => {
            const rate = (json?.rates as Record<string, unknown>)?.JPY;
            if (!isValidRate(rate)) throw new Error("Formato inválido o tasa fuera de rango");
            const validRate = rate as number;
            const newRate = Math.round(validRate * 100) / 100;
            const result = { rate: newRate, date: typeof json.date === "string" ? json.date : "—", live: true, isLoading: false };
            
            try {
              window.localStorage.setItem(
                CACHE_KEY,
                JSON.stringify({ rate: newRate, date: result.date, timestamp: Date.now() })
              );
            } catch {
              // Ignore quota exceeded etc
            }
            return result;
          })
          .catch(() => {
            return { rate: DEFAULT_FX, date: "—", live: false, isLoading: false };
          })
          .finally(() => {
            fetchPromise = null;
          });
      }

      // 3. Esperar a la promesa global
      try {
        const result = await fetchPromise;
        if (mounted && result) {
          setData(result);
        }
      } catch {
        // Fallback genérico por si falla el await (no debería por el catch interno)
        if (mounted) {
          setData({ rate: DEFAULT_FX, date: "—", live: false, isLoading: false });
        }
      }
    }

    loadRate();

    return () => {
      mounted = false;
    };
  }, []);

  return data;
}
