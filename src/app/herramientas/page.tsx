import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { withSocial } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { HERRAMIENTAS } from "@/lib/tools";

export const metadata: Metadata = withSocial("/herramientas", {
  title: "Herramientas para planificar tu viaje a Japón",
  description:
    "Calculadora de presupuesto y del JR Pass en euros, cambio yen-euro actualizado y checklist de maleta imprimible: herramientas gratuitas y sin registro para organizar tu viaje a Japón.",
  alternates: { canonical: "/herramientas" },
});

const card = "border-[3px] border-[#0a0a0a] bg-white transition-all hover:translate-x-0.5 hover:translate-y-0.5";

export default function Page() {
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Herramientas de ViajaJapón",
    itemListElement: HERRAMIENTAS.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.title,
      url: `${SITE.url}${t.href}`,
    })),
  };

  return (
    <article className="mx-auto max-w-7xl px-4 py-12">
      <Breadcrumbs items={[{ name: "Inicio", href: "/" }, { name: "Herramientas", href: "/herramientas" }]} />
      <p className="kicker mt-4 text-primary">Herramientas</p>
      <h1 className="mt-2 text-balance text-4xl font-black text-[#0a0a0a] sm:text-5xl">
        Herramientas para planificar tu viaje a Japón
      </h1>
      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-fg-muted">
        Gratis, sin registro y con los mismos datos que usan nuestras guías: precios oficiales del JR Pass,
        tipo de cambio de referencia del BCE y la lista de equipaje de un viaje real en diciembre. Hacen las
        cuentas por ti para que decidas con números, no con intuición.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {HERRAMIENTAS.map(({ Icon, ...h }) => (
          <Link key={h.href} href={h.href} className={`${card} flex flex-col gap-2.5 p-6 ${h.destacado ? "bg-[#fff5f4]" : ""}`}>
            <Icon className={h.destacado ? "text-[#b71c1c]" : "text-[#0a0a0a]"} size={30} strokeWidth={2} aria-hidden="true" />
            <span className="text-lg font-black text-[#0a0a0a]">{h.title}</span>
            <span className="text-sm leading-relaxed text-fg-muted">{h.desc}</span>
            <span className="mt-auto inline-flex items-center gap-1 pt-2 font-mono text-xs font-bold uppercase tracking-wider text-primary">
              Abrir <ArrowRight size={16} aria-hidden="true" />
            </span>
          </Link>
        ))}
      </div>

      <section className="mt-12 max-w-3xl space-y-4 leading-relaxed text-fg-muted">
        <h2 className="text-2xl font-black text-[#0a0a0a]">Cómo las usamos nosotros</h2>
        <p>
          La <Link href="/herramientas/jr-pass-calculadora" className="font-semibold text-primary hover:underline">calculadora del JR Pass</Link> es
          la primera parada: marca los trayectos de tu ruta y te dice si el pase nacional, un pase regional o los billetes
          sueltos salen más baratos. Después, el <Link href="/cambio-yen-euro" className="font-semibold text-primary hover:underline">cambio yen-euro</Link> sirve
          para traducir cualquier precio que veas en Japón, y el <Link href="/logistica/que-llevar-maleta-japon" className="font-semibold text-primary hover:underline">checklist de maleta</Link> se
          guarda en tu móvil para repasarlo la noche antes de salir.
        </p>
        <p>
          Si una herramienta te da un resultado raro o crees que falta alguna, <Link href="/contacto" className="font-semibold text-primary hover:underline">escríbenos</Link>:
          las corregimos y ampliamos con lo que piden los lectores.
        </p>
      </section>

      <JsonLd data={itemList} />
    </article>
  );
}
