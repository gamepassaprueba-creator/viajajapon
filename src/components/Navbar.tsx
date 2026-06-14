import Link from "next/link";
import { SITE } from "@/lib/site";
import { Logo } from "@/components/Logo";
import { MobileMenu } from "@/components/MobileMenu";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Logo />

        <nav aria-label="Principal" className="hidden items-center gap-8 md:flex">
          {SITE.nav.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm font-medium text-fg-muted transition-colors hover:text-primary">
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Cluster derecho en móvil: buscador + menú hamburguesa */}
        <div className="flex items-center gap-1 md:hidden">
          <Link href="/buscar" aria-label="Buscar" className="flex size-11 items-center justify-center rounded-md text-fg">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </Link>
          {/* Menú móvil (details nativo + cierre al navegar) */}
          <MobileMenu items={SITE.nav} />
        </div>
      </div>
    </header>
  );
}
