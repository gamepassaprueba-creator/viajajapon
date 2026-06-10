import Link from "next/link";

const COLS = [
  {
    title: "Planifica tu viaje",
    links: [
      { label: "Itinerarios", href: "/itinerarios" },
      { label: "JR Pass", href: "/herramientas/jr-pass-calculadora" },
      { label: "Transporte", href: "/logistica" },
      { label: "Mejor época para viajar", href: "/logistica" },
      { label: "Presupuesto", href: "/herramientas/jr-pass-calculadora" },
    ],
  },
  {
    title: "Destinos",
    links: [
      { label: "Tokio", href: "/destinos" },
      { label: "Kioto", href: "/destinos" },
      { label: "Osaka", href: "/destinos" },
      { label: "Hiroshima", href: "/destinos" },
      { label: "Hokkaido", href: "/destinos" },
    ],
  },
  {
    title: "Información útil",
    links: [
      { label: "Cultura y costumbres", href: "/cultura" },
      { label: "Gastronomía", href: "/gastronomia" },
      { label: "Cambio del yen", href: "/cambio-yen-euro" },
      { label: "Consejos prácticos", href: "/logistica" },
      { label: "Divulgación de afiliados", href: "/afiliados-divulgacion" },
    ],
  },
];

// Rellena `href` con tu perfil real y el enlace aparecerá solo. Sin URL no se renderiza
// (evita enlaces muertos href="#").
const SOCIAL: { name: string; href: string }[] = [
  { name: "Instagram", href: "" },
  { name: "YouTube", href: "" },
  { name: "X", href: "" },
  { name: "Facebook", href: "" },
];

export function Footer() {
  return (
    <footer className="bg-gray-900 pt-16 pb-8 text-white">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="mb-4 inline-flex items-baseline">
              <span className="font-display text-3xl text-white">ViajaJapón</span>
              <span className="ml-1 text-sm text-gray-400">.com</span>
            </Link>
            <p className="mb-6 text-gray-400">
              Tu guía completa para viajar a Japón: consejos, rutas, cultura y todo lo que necesitas — con datos
              de este año.
            </p>
            <div className="flex flex-wrap gap-2">
              {SOCIAL.filter((s) => s.href).map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-gray-800 px-3 py-1.5 text-xs font-medium transition-colors hover:bg-primary"
                >
                  {s.name}
                </a>
              ))}
            </div>
          </div>
          {COLS.map((col) => (
            <div key={col.title}>
              <h3 className="mb-4 text-lg font-bold">{col.title}</h3>
              <ul className="space-y-2">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-gray-400 transition-colors hover:text-white">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
          <p>© 2026 ViajaJapón.com · Contiene enlaces de afiliado. Verifica precios y normas en la fuente oficial antes de viajar.</p>
          <div className="mt-4 flex justify-center gap-4">
            <Link href="/aviso-legal" className="hover:text-white">Aviso legal</Link>
            <Link href="/privacidad" className="hover:text-white">Privacidad</Link>
            <Link href="/cookies" className="hover:text-white">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
