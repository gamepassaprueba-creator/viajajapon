"use client";

import { trackEvent } from "@/lib/analytics";

/** Botón de chat directo (WhatsApp o Telegram) que cuenta el clic en GA4. */
export function DirectoLink({ href, canal, label, dark }: { href: string; canal: string; label: string; dark?: boolean }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent("vuelos_contacto_directo", { canal })}
      className={`flex min-h-11 items-center justify-center border-2 border-[#0a0a0a] px-4 font-bold ${
        dark ? "bg-[#0a0a0a] text-white" : "bg-white text-[#0a0a0a]"
      }`}
    >
      {label}
    </a>
  );
}
