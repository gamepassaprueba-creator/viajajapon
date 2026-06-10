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
      <summary aria-label="Abrir menú" className="flex size-11 cursor-pointer list-none items-center justify-center rounded-md text-fg">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16" /></svg>
      </summary>
      <nav aria-label="Navegación móvil" className="absolute right-0 top-12 z-50 w-60 rounded-lg border border-border bg-surface p-2 shadow-lg">
        {items.map((item) => (
          <Link key={item.href} href={item.href} className="block rounded-md px-3 py-2 text-sm font-medium text-fg-muted transition-colors hover:bg-muted hover:text-primary">
            {item.label}
          </Link>
        ))}
      </nav>
    </details>
  );
}
