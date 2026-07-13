"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      setShow(true);
    }
  }, []);

  if (!show) return null;

  const accept = () => {
    localStorage.setItem("cookie_consent", "accepted");
    setShow(false);
  };

  const reject = () => {
    localStorage.setItem("cookie_consent", "rejected");
    setShow(false);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] border-t-[3px] border-[#0a0a0a] bg-white p-4 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] md:p-6 pb-[calc(1rem+env(safe-area-inset-bottom))] md:pb-6">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="text-xs sm:text-sm text-[#0a0a0a] leading-relaxed">
          <p>
            Utilizamos cookies técnicas para el funcionamiento de la web y analíticas para entender cómo se usa. Puedes aceptar todas las cookies o rechazarlas. Tienes más información en nuestra <Link href="/cookies" className="font-bold underline hover:text-[#e1352e]">política de cookies</Link>.
          </p>
        </div>
        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row shrink-0">
          <button
            onClick={reject}
            className="border-[2px] border-[#0a0a0a] bg-[#f5f5f5] px-5 py-2.5 font-mono text-xs font-black uppercase tracking-wide text-[#0a0a0a] transition-colors hover:bg-[#e0e0e0]"
          >
            Rechazar
          </button>
          <button
            onClick={accept}
            className="border-[2px] border-[#0a0a0a] bg-[#e1352e] px-5 py-2.5 font-mono text-xs font-black uppercase tracking-wide text-white transition-colors hover:bg-[#b8271f]"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}
