import type { Metadata } from "next";
import Link from "next/link";
import { withSocial } from "@/lib/seo";
import { BudgetCalculator } from "./BudgetCalculator";
import { JsonLd } from "@/components/JsonLd";
import { faqLd } from "@/lib/jsonld";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SITE } from "@/lib/site";

export const metadata: Metadata = withSocial("/herramientas/calculadora-presupuesto", {
  title: { absolute: "Calculadora de presupuesto para Japón 2026 (en euros)" },
  description:
    "Calcula cuánto cuesta tu viaje a Japón según días, personas, estilo, temporada y ruta: total por persona con desglose de alojamiento, comida, shinkansen y vuelo.",
  alternates: { canonical: "/herramientas/calculadora-presupuesto" },
});

const FAQS = [
  {
    q: "¿Cuánto cuesta un viaje a Japón de 10 días?",
    a: "Con un estilo de punto medio, dos personas compartiendo habitación y la ruta Tokio-Kioto-Osaka, unos 1.100 € por persona en destino más el vuelo: alrededor de 2.000 € por persona con un vuelo de 850 € desde España. En temporada de cerezos o de otoño el alojamiento casi se duplica.",
  },
  {
    q: "¿De dónde salen las cifras?",
    a: "Del gasto diario por estilo de nuestra guía de cuánto cuesta viajar a Japón (40, 95 y 215 € por persona y día), de las tarifas oficiales del shinkansen con asiento reservado y de nuestras consultas de precios en Booking de octubre de 2026 para ajustar la temporada.",
  },
  {
    q: "¿Incluye el JR Pass?",
    a: "No: suma los billetes sueltos del shinkansen, que para la ruta clásica suelen salir más baratos que el pase. Para comprobarlo con tu ruta, usa la calculadora del JR Pass.",
  },
  {
    q: "¿Sirve si viajo desde México o Latinoamérica?",
    a: "Sí. El gasto en Japón es el mismo; solo cambia el vuelo. Escribe el precio de tu billete en el paso 6 y el total se ajusta.",
  },
];

export default function Page() {
  return (
    <article className="mx-auto max-w-7xl px-4 py-12">
      <Breadcrumbs
        items={[
          { name: "Inicio", href: "/" },
          { name: "Herramientas", href: "/herramientas" },
          { name: "Calculadora de presupuesto", href: "/herramientas/calculadora-presupuesto" },
        ]}
      />
      <header className="mt-4 flex max-w-[820px] flex-col gap-2.5">
        <p className="kicker text-primary">Herramienta · Presupuesto</p>
        <h1 className="text-balance text-4xl font-black leading-[1.05] sm:text-5xl">¿Cuánto me cuesta Japón? Calcúlalo en 30 segundos</h1>
        <p className="text-lg leading-relaxed text-fg-muted">
          Elige días, personas, estilo, temporada y ruta. Te damos el total por persona con el desglose y los precios de 2026,
          en euros y en yenes.
        </p>
      </header>

      <BudgetCalculator />

      <section className="mt-12 max-w-3xl">
        <h2 className="text-2xl font-bold">Cómo calculamos</h2>
        <p className="mt-3 leading-relaxed text-fg-muted">
          Partimos del gasto diario por persona de nuestra guía de{" "}
          <Link href="/logistica/cuanto-cuesta-viajar-japon" className="text-primary underline underline-offset-2">
            cuánto cuesta viajar a Japón
          </Link>{" "}
          (alojamiento, comida y transporte local). En cerezos y otoño multiplicamos el alojamiento por 1,8, que es una media
          prudente de lo que vimos en Booking: en el centro de Kioto la misma habitación cuesta cinco veces más que en febrero,
          y en Osaka apenas un 40 % más. Viajando solo, la habitación individual cuenta como 1,4 veces lo que paga cada persona compartiendo una doble. Los
          trenes son las tarifas oficiales del shinkansen con asiento reservado.
        </p>
      </section>

      <section className="mt-10 max-w-3xl">
        <h2 className="text-2xl font-bold">Preguntas frecuentes</h2>
        <dl className="mt-4 divide-y divide-border border-y border-border">
          {FAQS.map((f) => (
            <div key={f.q} className="py-4">
              <dt className="font-semibold text-fg">{f.q}</dt>
              <dd className="mt-1 text-sm leading-relaxed text-fg-muted">{f.a}</dd>
            </div>
          ))}
        </dl>
      </section>

      <JsonLd
        data={[
          faqLd(FAQS),
          {
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Calculadora de presupuesto para Japón",
            applicationCategory: "TravelApplication",
            operatingSystem: "Web",
            inLanguage: "es-ES",
            url: `${SITE.url}/herramientas/calculadora-presupuesto`,
            offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
          },
        ]}
      />
    </article>
  );
}
