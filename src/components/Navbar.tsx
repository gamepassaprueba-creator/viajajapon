import Link from "next/link";
import { SITE } from "@/lib/site";
import { Logo } from "@/components/Logo";
import { MobileMenu } from "@/components/MobileMenu";
import { YenIndicator } from "@/components/YenIndicator";

export async function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b-2 border-fg bg-bg/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2.5">
        <Logo />

        <div className="hidden items-center gap-6 md:flex">
          <nav aria-label="Principal" className="flex items-center gap-6">
            {SITE.nav.map((item) => (
              <Link key={item.href} href={item.href} className="text-sm font-black uppercase tracking-wide text-fg-muted transition-colors hover:text-primary">
                {item.label}
              </Link>
            ))}
          </nav>
          <YenIndicator />
        </div>

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
