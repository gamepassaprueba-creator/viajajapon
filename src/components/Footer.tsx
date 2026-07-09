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
        {/* Cabecera del footer — como portada de cierre de revista */}
        <div className="border-b-2 border-white/20 px-6 py-4">
          <Logo tono="claro" />
        </div>
        {/* Grid de columnas con divisores */}
        <div className="grid grid-cols-1 divide-y-2 divide-white/10 sm:grid-cols-2 sm:divide-x-2 sm:divide-y-0 lg:grid-cols-4">
          <div className="p-6 lg:p-8">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-white/40 mb-3">La guía</p>
            <p className="text-sm leading-relaxed text-white/50">
              La mayor guía en español para planificar tu viaje a Japón. Datos reales, experiencia propia, sin relleno.
            </p>
          </div>
          {COLS.map((col) => (
            <div key={col.title} className="p-6 lg:p-8">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-white/40 mb-3">{col.title}</p>
              <ul className="space-y-2">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-sm text-white/60 transition-colors hover:text-white">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {/* Pie legal */}
        <div className="border-t-2 border-white/10 px-6 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="font-mono text-[10px] text-white/30">© 2026 ViajaJapón.com · Algunos enlaces son de afiliado. Verifica precios en la fuente oficial.</p>
            <div className="flex gap-4">
              <Link href="/aviso-legal" className="font-mono text-[10px] text-white/30 hover:text-white">Aviso legal</Link>
              <Link href="/privacidad" className="font-mono text-[10px] text-white/30 hover:text-white">Privacidad</Link>
              <Link href="/cookies" className="font-mono text-[10px] text-white/30 hover:text-white">Cookies</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
