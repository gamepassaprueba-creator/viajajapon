import Link from "next/link";
import { SITE } from "@/lib/site";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-baseline">
          <span className="font-display text-3xl leading-none text-primary">ViajaJapón</span>
          <span className="ml-1 text-sm text-fg-muted">.com</span>
        </Link>

        <nav aria-label="Principal" className="hidden items-center gap-8 md:flex">
          {SITE.nav.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm font-medium text-fg-muted transition-colors hover:text-primary">
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Menú móvil (nativo, accesible, sin JS de cliente) */}
        <details className="relative md:hidden [&_summary::-webkit-details-marker]:hidden">
          <summary aria-label="Abrir menú" className="flex size-11 cursor-pointer list-none items-center justify-center rounded-md text-fg">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16" /></svg>
          </summary>
          <nav aria-label="Navegación móvil" className="absolute right-0 top-12 z-50 w-60 rounded-lg border border-border bg-surface p-2 shadow-lg">
            {SITE.nav.map((item) => (
              <Link key={item.href} href={item.href} className="block rounded-md px-3 py-2 text-sm font-medium text-fg-muted transition-colors hover:bg-muted hover:text-primary">
                {item.label}
              </Link>
            ))}
          </nav>
        </details>
      </div>
    </header>
  );
}
