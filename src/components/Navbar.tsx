import Link from "next/link";
import { SITE } from "@/lib/site";
import { Logo } from "@/components/Logo";
import { MobileMenu } from "@/components/MobileMenu";
import { YenIndicator } from "@/components/YenIndicator";

export async function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b-[3px] border-[#0a0a0a] bg-white/98 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2.5">
        <Logo />

        <div className="hidden items-center gap-6 md:flex">
          <nav aria-label="Principal" className="flex items-center gap-6">
            {SITE.nav.map((item) => (
              <Link key={item.href} href={item.href} className="font-mono text-xs font-black uppercase tracking-wide text-[#555] transition-colors hover:text-[#e1352e]">
                {item.label}
              </Link>
            ))}
          </nav>
          <YenIndicator />
        </div>

        {/* Cluster derecho en móvil: yen en vivo + buscador + hamburguesa */}
        <div className="flex items-center gap-0.5 md:hidden">
          {/* Yen mini en móvil */}
          <Link href="/cambio-yen-euro" className="hidden min-[380px]:flex items-center gap-1 border-[2px] border-[#0a0a0a] px-2 py-1">
            <span className="font-mono text-[9px] font-black text-[#e1352e]">¥ hoy</span>
          </Link>
          <Link href="/buscar" aria-label="Buscar" className="flex size-11 items-center justify-center text-[#0a0a0a]">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </Link>
          <MobileMenu items={SITE.nav} />
        </div>
      </div>
    </header>
  );
}
