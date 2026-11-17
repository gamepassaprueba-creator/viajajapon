"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plane, X } from "lucide-react";
import { readAnalyticsConsent, trackEvent } from "@/lib/analytics";

// Aviso discreto del servicio de vuelos en los itinerarios (diseño «Aviso de vuelos en los
// itinerarios» del lienzo). Reglas para no ser intrusivo (pautas de Google sobre intersticiales):
// - solo aparece tras leer un tercio de la página, nunca al entrar;
// - nunca mientras el banner de cookies esté sin contestar;
// - si el lector lo cierra o pulsa el botón, no vuelve a salir en 14 días;
// - con el servicio apagado (GET /api/vuelos → available: false) no aparece.

const CLAVE = "vj-aviso-vuelos";
const PAUSA_MS = 14 * 24 * 3600 * 1000;

function silenciadoHasta(): number {
  try {
    return Number(window.localStorage.getItem(CLAVE) ?? "0");
  } catch {
    return 0;
  }
}

function silenciar() {
  try {
    window.localStorage.setItem(CLAVE, String(Date.now() + PAUSA_MS));
  } catch {
    // Sin almacenamiento: el aviso puede volver en la siguiente visita, no pasa nada.
  }
}

export function AvisoVuelos() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (silenciadoHasta() > Date.now()) return;
    let hecho = false;

    const comprobar = () => {
      if (hecho) return;
      const recorrido = window.scrollY + window.innerHeight;
      if (recorrido < document.documentElement.scrollHeight / 3) return;
      // El banner de cookies ocupa la misma franja: esperamos a que el lector decida.
      if (readAnalyticsConsent() === null) return;
      hecho = true;
      window.removeEventListener("scroll", comprobar);
      fetch("/api/vuelos", { cache: "no-store" })
        .then(async (res) => (res.ok ? ((await res.json()) as { available?: boolean }).available === true : false))
        .then((ok) => {
          if (!ok) return;
          setVisible(true);
          trackEvent("vuelos_aviso_view");
        })
        .catch(() => {});
    };

    window.addEventListener("scroll", comprobar, { passive: true });
    return () => window.removeEventListener("scroll", comprobar);
  }, []);

  if (!visible) return null;

  const cerrar = () => {
    silenciar();
    trackEvent("vuelos_aviso_close");
    setVisible(false);
  };
  const ir = () => {
    silenciar();
    trackEvent("vuelos_aviso_click");
  };

  return (
    <aside
      aria-label="Servicio de vuelos a Japón"
      className="fixed inset-x-2.5 bottom-[calc(76px+env(safe-area-inset-bottom))] z-40 print:hidden md:inset-x-auto md:bottom-6 md:right-6 md:w-[340px]"
    >
      {/* Móvil: franja compacta encima de la barra inferior. */}
      <div className="grid grid-cols-[44px_1fr_36px] items-center gap-2.5 border-[3px] border-[#0a0a0a] bg-white p-2.5 shadow-[4px_4px_0_#e1352e] md:hidden">
        <span aria-hidden="true" className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#0a0a0a] bg-[#e1352e]">
          <Plane className="h-5 w-5 text-white" strokeWidth={2.5} />
        </span>
        <Link href="/vuelos-a-japon" onClick={ir} className="flex flex-col gap-0.5 text-[#0a0a0a]">
          <b className="text-sm leading-tight">¿Vas a viajar a Japón?</b>
          <span className="text-xs leading-snug text-[#333]">Te mejoramos el precio de tu vuelo con Iberia →</span>
        </Link>
        <button type="button" onClick={cerrar} aria-label="Cerrar el aviso" className="flex h-9 w-9 items-center justify-center border-2 border-[#0a0a0a] bg-white">
          <X className="h-4 w-4" strokeWidth={3} />
        </button>
      </div>

      {/* Escritorio: tarjeta en la esquina con la foto del Fuji. */}
      <div className="hidden flex-col border-[3px] border-[#0a0a0a] bg-white shadow-[6px_6px_0_#e1352e] md:flex">
        <div className="relative h-[88px] overflow-hidden bg-[#0a0a0a]">
          <Image src="/images/hero-fuji.jpg" alt="" fill sizes="340px" className="object-cover object-[center_35%] opacity-85" />
          <svg viewBox="0 0 340 88" aria-hidden="true" className="absolute inset-0 h-full w-full">
            <path className="vuelo-ruta" d="M 30 70 C 110 10, 230 10, 310 44" fill="none" stroke="#fff" strokeWidth="2.5" strokeDasharray="7 7" strokeLinecap="round" />
            <circle cx="30" cy="70" r="5" fill="#e1352e" stroke="#fff" strokeWidth="2" />
            <circle cx="310" cy="44" r="5" fill="#e1352e" stroke="#fff" strokeWidth="2" />
          </svg>
          <span aria-hidden="true" className="absolute left-[52%] top-[8px] flex h-8 w-8 rotate-[16deg] items-center justify-center rounded-full border-2 border-white bg-[#e1352e]">
            <Plane className="h-4 w-4 text-white" strokeWidth={2.5} />
          </span>
          <button type="button" onClick={cerrar} aria-label="Cerrar el aviso" className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center border-2 border-[#0a0a0a] bg-white">
            <X className="h-4 w-4" strokeWidth={3} />
          </button>
        </div>
        <div className="flex flex-col gap-2.5 p-4">
          <b className="text-[19px] leading-tight">¿Pensando en viajar a Japón?</b>
          <p className="text-sm leading-normal text-[#333]">
            Te mejoramos el precio de tu vuelo directo Madrid–Tokio con Iberia. Respuesta en menos de 24 h.
          </p>
          <Link
            href="/vuelos-a-japon"
            onClick={ir}
            className="flex min-h-11 items-center justify-center border-[3px] border-[#0a0a0a] bg-[#e1352e] font-mono text-xs font-bold uppercase text-white"
          >
            Ver cómo funciona →
          </Link>
          <span className="text-[11px] text-[#555]">Si lo cierras, no vuelve a salir en 14 días.</span>
        </div>
      </div>
    </aside>
  );
}
