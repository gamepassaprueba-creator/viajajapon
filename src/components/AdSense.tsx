"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";

interface AdSenseProps {
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
    // Protección contra inserciones duplicadas (Next.js react strict mode y soft navigation)
    if (typeof window !== "undefined" && adRef.current && clientId) {
      if (adRef.current.getAttribute("data-adsbygoogle-status") !== "done") {
        try {
          // @ts-expect-error - adsbygoogle is added by the AdSense script
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) {
          console.error("Error al inicializar AdSense", e);
        }
      }
    }
  }, [slot, clientId]); 

  if (!clientId) {
    if (process.env.NODE_ENV === "development") {
      return (
        <div className={`flex min-h-[250px] w-full items-center justify-center border-2 border-dashed border-gray-300 bg-gray-50 text-sm text-gray-400 ${className}`}>
          AdSense Placeholder (Slot: {slot})<br />
          Configura NEXT_PUBLIC_ADSENSE_CLIENT
        </div>
      );
    }
    return null; // En producción, no mostrar nada si no hay ID para evitar huecos blancos
  }

  return (
    <div className={`overflow-hidden min-h-[250px] flex justify-center ${className}`}>
      {/* El script se inyecta globalmente solo la primera vez que se monta el componente */}
      <Script
        id="adsbygoogle-script"
        strategy="afterInteractive"
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}`}
        crossOrigin="anonymous"
      />
      <ins
        ref={adRef}
        className="adsbygoogle block w-full"
        style={{ minWidth: "250px", ...style }}
        data-ad-client={clientId}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? "true" : "false"}
      />
    </div>
  );
}
