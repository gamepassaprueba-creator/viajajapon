"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * Menú móvil basado en <details> (accesible, funciona sin JS) con un único añadido
 * de cliente: cerrarse al navegar, porque con la navegación SPA de Next el detalle
 * quedaba abierto encima de la página nueva.
 */
export function MobileMenu({ items }: { items: ReadonlyArray<{ href: string; label: string }> }) {
  const ref = useRef<HTMLDetailsElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    ref.current?.removeAttribute("open");
  }, [pathname]);

  return (
    <details ref={ref} className="relative md:hidden [&_summary::-webkit-details-marker]:hidden">
      <summary aria-label="Abrir menú" className="flex size-11 cursor-pointer list-none items-center justify-center text-[#0a0a0a]">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16" /></svg>
      </summary>
      {/* Menú desplegable estilo manga: borde negro, sin radius, sombra offset */}
      <nav
        aria-label="Navegación móvil"
        className="absolute right-0 top-[calc(100%+4px)] z-50 w-64 border-[3px] border-[#0a0a0a] bg-white"
        style={{ boxShadow: "4px 4px 0 #e1352e" }}
      >
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="block border-b-[2px] border-[#0a0a0a] px-4 py-3.5 font-mono text-xs font-black uppercase tracking-wider text-[#0a0a0a] last:border-b-0 transition-colors hover:bg-[#e1352e] hover:text-white"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </details>
  );
}
