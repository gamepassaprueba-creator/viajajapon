import Link from "next/link";
import { SITE } from "@/lib/site";
import { MobileMenu } from "@/components/MobileMenu";

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

        {/* Menú móvil (details nativo + cierre al navegar) */}
        <MobileMenu items={SITE.nav} />
      </div>
    </header>
  );
}
