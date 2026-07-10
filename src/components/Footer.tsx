import Link from "next/link";
import { Logo } from "@/components/Logo";

const COLS = [
  {
    title: "Planifica tu viaje",
    links: [
      { label: "Itinerario de 7 días", href: "/itinerarios/itinerario-japon-7-dias" },
      { label: "Itinerario de 10 días", href: "/itinerarios/itinerario-japon-10-dias" },
      { label: "Calculadora del JR Pass", href: "/herramientas/jr-pass-calculadora" },
      { label: "Cuánto cuesta viajar a Japón", href: "/logistica/cuanto-cuesta-viajar-japon" },
      { label: "Mejor época para viajar", href: "/logistica/mejor-epoca-viajar-japon" },
    ],
  },
  {
    title: "Destinos",
    links: [
      { label: "Dónde dormir en Tokio", href: "/destinos/donde-dormir-en-tokio" },
      { label: "Dónde dormir en Kioto", href: "/destinos/donde-dormir-en-kioto" },
      { label: "Japón por libre (empieza aquí)", href: "/logistica/japon-por-libre-primer-viaje" },
      { label: "Desde México y Latinoamérica", href: "/logistica/japon-desde-mexico-y-latinoamerica" },
      { label: "Todos los destinos", href: "/destinos" },
    ],
  },
  {
    title: "Información útil",
    links: [
      { label: "Cultura y costumbres", href: "/cultura" },
      { label: "Gastronomía", href: "/gastronomia" },
      { label: "Cómo pagar en Japón", href: "/logistica/como-pagar-en-japon" },
      { label: "Cambio del yen", href: "/cambio-yen-euro" },
      { label: "Consejos prácticos", href: "/logistica" },
      { label: "Divulgación de afiliados", href: "/afiliados-divulgacion" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t-2 border-fg bg-fg text-white">
      <div className="mx-auto max-w-7xl">
        {/* Cabecera */}
        <div className="flex items-center justify-between border-b-2 border-white/20 px-4 py-4 sm:px-6">
          <Logo tono="claro" />
          <p className="hidden font-mono text-[9px] text-white/30 sm:block">La mayor guía de Japón en español</p>
        </div>

        {/* Grid: en móvil 2×2, en desktop 4 columnas */}
        <div className="grid grid-cols-2 divide-x-2 divide-y-2 divide-white/10 lg:grid-cols-4 lg:divide-y-0">
          {COLS.map((col) => (
            <div key={col.title} className="p-4 sm:p-6 lg:p-8">
              <p className="mb-3 font-mono text-[9px] font-bold uppercase tracking-[0.15em] text-white/40">{col.title}</p>
              <ul className="space-y-2">
                {col.links.slice(0, 4).map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-xs text-white/60 transition-colors hover:text-white sm:text-sm">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          {/* 4ª columna en desktop: columna vacía que rellena el espacio del logo */}
          <div className="hidden p-8 lg:block">
            <p className="mb-3 font-mono text-[9px] font-bold uppercase tracking-[0.15em] text-white/40">La guía</p>
            <p className="text-sm leading-relaxed text-white/40">
              Datos reales, experiencia propia, sin relleno.
            </p>
          </div>
        </div>

        {/* Pie legal */}
        <div className="border-t-2 border-white/10 px-4 py-4 sm:px-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="font-mono text-[9px] text-white/30">© 2026 ViajaJapón.com · Algunos enlaces son de afiliado.</p>
            <div className="flex gap-3">
              <Link href="/aviso-legal" className="font-mono text-[9px] text-white/30 hover:text-white">Legal</Link>
              <Link href="/privacidad" className="font-mono text-[9px] text-white/30 hover:text-white">Privacidad</Link>
              <Link href="/cookies" className="font-mono text-[9px] text-white/30 hover:text-white">Cookies</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
