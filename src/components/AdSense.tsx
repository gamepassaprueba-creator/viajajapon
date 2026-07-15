"use client";

/**
 * AdSense.tsx — Componente de bloque de anuncio de Google AdSense.
 *
 * ESTADO ACTUAL: INACTIVO. Este componente no está montado en ningún layout ni página.
 *
 * REQUISITOS PREVIOS ANTES DE USARLO:
 * 1. Obtener aprobación de Google AdSense para viajajapon.com.
 * 2. Configurar y publicar una CMP certificada (Funding Choices / RGPD) desde el
 *    panel de AdSense > Privacidad y mensajes. Sin este paso no se pueden mostrar
 *    anuncios a usuarios del EEE de forma legal.
 * 3. Añadir NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-7277317479691987 como variable de
 *    entorno disponible durante el build de Next.js en GitHub Actions (no es
 *    suficiente añadirla como variable runtime del Worker; debe estar presente en
 *    el momento de ejecutar `next build` / `opennextjs-cloudflare build`).
 * 4. Crear al menos un bloque de anuncio en AdSense > Anuncios > Por unidad.
 * 5. Insertar <AdSense slot="SLOT_ID" /> en las páginas deseadas (no en legales
 *    ni en herramientas interactivas).
 *
 * RESPONSABILIDADES SEPARADAS:
 * - Este componente gestiona un único bloque de anuncio (<ins> + push).
 * - La carga global del script adsbygoogle.js debe hacerse en layout.tsx mediante
 *   next/script con strategy="afterInteractive", condicionada a que el cliente
 *   exista y el usuario haya dado consentimiento. Actualmente no está activa.
 * - Este componente NO carga el script global por sí solo para evitar cargas
 *   duplicadas si se usa en múltiples páginas.
 */

import { useEffect, useRef } from "react";

interface AdSenseProps {
  /** ID del slot de anuncio obtenido en AdSense > Anuncios > Por unidad de anuncio. */
  slot: string;
  format?: "auto" | "fluid" | "rectangle";
  responsive?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export function AdSense({
  slot,
  format = "auto",
  responsive = true,
  className = "",
  style,
}: AdSenseProps) {
  const adRef = useRef<HTMLModElement>(null);
  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

  useEffect(() => {
    if (!clientId || !slot) return;

    // Solo ejecutar push si el script global ya está cargado y el <ins> aún no fue procesado.
    if (
      typeof window !== "undefined" &&
      adRef.current &&
      adRef.current.getAttribute("data-adsbygoogle-status") !== "done"
    ) {
      try {
        // @ts-expect-error — adsbygoogle se inyecta en window por el script global de AdSense
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        if (process.env.NODE_ENV === "development") {
          console.error("[AdSense] Error al llamar a adsbygoogle.push():", e);
        }
      }
    }
  }, [clientId, slot]);

  // Sin cliente o slot: no renderizar nada en producción.
  if (!clientId || !slot) {
    if (process.env.NODE_ENV === "development") {
      return (
        <div
          className={`flex min-h-[250px] w-full items-center justify-center border-2 border-dashed border-gray-300 bg-gray-50 text-center text-sm text-gray-400 ${className}`}
        >
          <span>
            AdSense — bloque inactivo
            <br />
            <code className="text-xs">slot: {slot || "(sin slot)"}</code>
            <br />
            <code className="text-xs">NEXT_PUBLIC_ADSENSE_CLIENT: {clientId ? "✓" : "no configurada"}</code>
          </span>
        </div>
      );
    }
    return null;
  }

  return (
    // min-h-[250px] reserva espacio para reducir CLS mientras el anuncio carga.
    // Ajustar según el formato real del bloque cuando se active.
    <div className={`min-h-[250px] w-full overflow-hidden ${className}`}>
      <ins
        ref={adRef}
        className="adsbygoogle block"
        style={{ display: "block", ...style }}
        data-ad-client={clientId}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? "true" : "false"}
      />
    </div>
  );
}
