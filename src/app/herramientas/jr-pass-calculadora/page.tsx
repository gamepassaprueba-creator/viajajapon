import type { Metadata } from "next";
import Link from "next/link";
import { getYenRate } from "@/lib/fx";
import { JrPassCalculator } from "./JrPassCalculator";
import { JsonLd } from "@/components/JsonLd";
import { faqLd } from "@/lib/jsonld";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SITE } from "@/lib/site";
import { affiliateUrl } from "@/lib/affiliates";

export const revalidate = 21600; // 6 h (refresca el cambio del yen en sitio)

export const metadata: Metadata = {
  title: "Calculadora JR Pass 2026: ¿te compensa? (en euros)",
  description:
    "Calcula en 30 segundos si el JR Pass te sale a cuenta según TU ruta, en euros y con precios 2026. Compara billetes sueltos, pase nacional y Kansai Wide.",
  alternates: { canonical: "/herramientas/jr-pass-calculadora" },
};

const FAQS = [
  {
    q: "¿Cuánto cuesta el JR Pass en 2026?",
    a: "El pase nacional ordinario cuesta ¥50.000 (7 días), ¥80.000 (14 días) y ¥100.000 (21 días). Está previsto que suba a ¥53.000/84.000/105.000 en octubre de 2026.",
  },
  {
    q: "¿Merece la pena el JR Pass tras la subida de precio?",
    a: "Depende de tu ruta. Para un viaje corto centrado en Tokio-Kioto-Osaka casi nunca compensa el pase nacional; suele salir más barato comprar billetes sueltos o un pase regional como el Kansai Wide. La calculadora lo resuelve con tu itinerario concreto.",
  },
  {
    q: "¿El JR Pass cubre el Nozomi y el Mizuho?",
    a: "El pase nacional permite usar Nozomi y Mizuho pagando un suplemento; en Hikari, Sakura y Kodama viaja sin coste extra. La calculadora asume tarifa de asiento reservado estándar.",
  },
];

export default async function Page() {
  const { rate, date, live } = await getYenRate();

  // Enlaces de afiliado resueltos en el servidor (las AFF_* son server-only, no NEXT_PUBLIC).
  const aff = {
    jrpass: affiliateUrl("jrpass"),
    civitatis: affiliateUrl("civitatis"),
    iati: affiliateUrl("iati"),
    holafly: affiliateUrl("holafly"),
  };

  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <Breadcrumbs items={[{ name: "Inicio", href: "/" }, { name: "Calculadora JR Pass 2026", href: "/herramientas/jr-pass-calculadora" }]} />
      <p className="kicker mt-4 text-primary">Herramienta · Transporte</p>
      <h1 className="mt-2 text-4xl font-bold sm:text-5xl">¿Merece la pena el JR Pass en 2026?</h1>
      <p className="mt-4 text-lg leading-relaxed text-fg-muted">
        Marca tu ruta y la calculadora suma los billetes sueltos reales, los compara con el pase nacional
        y los pases regionales, y te dice en una frase cuánto ahorras con cada opción — todo en euros y con
        precios de 2026.
      </p>

      <JrPassCalculator fx={rate} fxDate={date} fxLive={live} aff={aff} />

      <section className="mt-12">
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

      <p className="mt-8 text-sm text-fg-muted">
        ¿Buscas el desglose ruta por ruta?{" "}
        <Link href="/logistica/jr-pass-2026" className="text-primary underline-offset-2 hover:underline">
          Lee la guía del JR Pass 2026
        </Link>
        .
      </p>

      <JsonLd
        data={[
          faqLd(FAQS),
          {
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Calculadora JR Pass 2026",
            applicationCategory: "TravelApplication",
            operatingSystem: "Web",
            inLanguage: "es-ES",
            url: `${SITE.url}/herramientas/jr-pass-calculadora`,
            offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
          },
        ]}
      />
    </article>
  );
}
