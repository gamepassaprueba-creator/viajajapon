/**
 * Marca de la casa: torii estilo myojin (kasagi curvado con las puntas
 * elevadas, pilares abiertos, nuki saliente). Hereda el color del texto
 * (currentColor): rojo en el navbar, blanco en el footer. La misma forma
 * alimenta el favicon (src/app/icon.svg) y el apple-icon — si se retoca
 * aquí, regenerar esos assets para que la marca no se desincronice.
 *
 * Wordmark: font-display resuelve a M PLUS 1p (ver globals.css). Antes usaba
 * Pacifico (script/cursiva) — leía "blog casual"; se sustituyó por un peso 900
 * con tracking ajustado para una identidad más firme, en línea con la dirección
 * de marca "moderno anime/manga".
 */
import Link from "next/link";

export function ToriiMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={className}>
      <g fill="currentColor">
        <path d="M2 6.6 Q16 9.2 30 6.6 L30 10 Q16 12.6 2 10 Z" />
        <path d="M7.2 11.2 L10.2 11.2 L9.4 28 L6.4 28 Z" />
        <path d="M21.8 11.2 L24.8 11.2 L25.6 28 L22.6 28 Z" />
        <rect x="4.4" y="15.2" width="23.2" height="2.4" rx="0.5" />
        <rect x="14.8" y="11.4" width="2.4" height="3.8" />
      </g>
    </svg>
  );
}

/**
 * Lockup completo (torii + wordmark) enlazando a la portada.
 * tono "oscuro" = sobre fondo claro (navbar); "claro" = sobre fondo oscuro (footer).
 */
export function Logo({ tono = "oscuro", className = "" }: { tono?: "oscuro" | "claro"; className?: string }) {
  const claro = tono === "claro";
  return (
    <Link href="/" className={`inline-flex items-center gap-2.5 ${className}`}>
      <ToriiMark className={`size-8 shrink-0 ${claro ? "text-white" : "text-primary"}`} />
      <span className="flex items-baseline gap-0.5">
        <span className={`font-display text-2xl font-black leading-none tracking-tighter ${claro ? "text-white" : "text-fg"}`}>ViajaJapón</span>
        <span className={`text-xs font-bold uppercase tracking-widest ${claro ? "text-white/40" : "text-primary"}`}>.com</span>
      </span>
    </Link>
  );
}
