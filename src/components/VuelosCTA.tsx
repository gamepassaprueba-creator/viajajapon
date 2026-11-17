"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { trackEvent } from "@/lib/analytics";

// Entradas al servicio de vuelos desde las guías y la calculadora (diseño «Servicio · Te mejoramos el
// vuelo a Japón» del lienzo, apartado «Entradas desde el resto de la web»). No pintan nada si el
// servicio está apagado: lo decide GET /api/vuelos, que se consulta una sola vez por página y solo
// cuando el bloque está a punto de verse.

let disponible: Promise<boolean> | null = null;
function consultar(): Promise<boolean> {
  disponible ??= fetch("/api/vuelos", { cache: "no-store" })
    .then(async (res) => (res.ok ? ((await res.json()) as { available?: boolean }).available === true : false))
    .catch(() => false);
  return disponible;
}

/** true cuando el servicio está encendido; la consulta espera a que `ref` se acerque a la pantalla. */
export function useVuelosDisponible<T extends Element>() {
  const ref = useRef<T>(null);
  const [ok, setOk] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let activo = true;
    const obs = new IntersectionObserver(
      (entradas) => {
        if (!entradas.some((e) => e.isIntersecting)) return;
        obs.disconnect();
        consultar().then((v) => activo && setOk(v));
      },
      { rootMargin: "400px 0px" },
    );
    obs.observe(el);
    return () => {
      activo = false;
      obs.disconnect();
    };
  }, []);
  return { ref, ok };
}

/** Bloque para las guías (MDX): `<VuelosCTA />`. */
export function VuelosCTA({
  titulo = "¿Ya has mirado el vuelo? Te mejoramos el precio de Iberia",
  texto = "Dinos fechas y lo que te sale. En menos de 24 horas te mandamos un código para comprarlo tú en iberia.com, más barato o con más maletas.",
}: {
  titulo?: string;
  texto?: string;
}) {
  const { ref, ok } = useVuelosDisponible<HTMLDivElement>();
  const ruta = usePathname();
  return (
    <div ref={ref} className="not-prose">
      {ok && (
        <aside className="my-8 grid items-center gap-5 border-[3px] border-[#0a0a0a] bg-[#fff7f6] p-5 shadow-[6px_6px_0_#e1352e] sm:grid-cols-[1fr_auto] sm:p-6">
          <div className="flex flex-col gap-2">
            <span className="self-start bg-[#e1352e] px-1.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.08em] text-white">
              Vuelos
            </span>
            <p className="text-xl font-black leading-tight text-[#0a0a0a] sm:text-2xl">{titulo}</p>
            <p className="text-sm leading-relaxed text-[#333]">{texto}</p>
          </div>
          <Link
            href="/vuelos-a-japon"
            onClick={() => trackEvent("vuelos_cta_click", { origen: ruta ?? "" })}
            className="flex min-h-12 items-center justify-center border-[3px] border-[#0a0a0a] bg-[#e1352e] px-5 font-mono text-[13px] font-bold uppercase text-white"
          >
            Pedir mi precio →
          </Link>
        </aside>
      )}
    </div>
  );
}

/** Línea de la calculadora de presupuesto, junto a la barra del vuelo. */
export function VuelosLineaCalculadora({ vueloEur }: { vueloEur: string }) {
  const { ref, ok } = useVuelosDisponible<HTMLDivElement>();
  return (
    <div ref={ref}>
      {ok && (
        <Link
          href="/vuelos-a-japon"
          onClick={() => trackEvent("vuelos_cta_click", { origen: "calculadora-presupuesto" })}
          className="flex items-center justify-between gap-4 border-[2px] border-[#0a0a0a] px-4 py-3 hover:bg-[#f5f5f5]"
        >
          <span className="text-sm leading-snug">
            <b>Vuelo: {vueloEur} por persona.</b>{" "}
            <span className="text-fg-muted">¿Ya lo tienes mirado? Te mejoramos el precio de Iberia.</span>
          </span>
          <span className="whitespace-nowrap font-bold text-primary">Pedir precio →</span>
        </Link>
      )}
    </div>
  );
}
