import type { Metadata } from "next";
import Link from "next/link";
import { getYenRate } from "@/lib/fx";
import { JsonLd } from "@/components/JsonLd";
import { SITE } from "@/lib/site";

export const revalidate = 21600; // refresca el dato en la MISMA URL (página viva)

export const metadata: Metadata = {
  title: "¿A cuánto está el yen hoy? Cambio yen-euro y qué significa para tu viaje",
  description:
    "Cambio yen japonés a euro actualizado (referencia BCE) y qué supone para el presupuesto de tu viaje a Japón. Con calculadora de presupuesto.",
  alternates: { canonical: "/cambio-yen-euro" },
};

const EMBED_CODE = `<iframe src="https://viajajapon.com/embed/cambio-yen" width="340" height="280" style="border:0;max-width:100%" title="Cambio yen-euro - ViajaJapon" loading="lazy"></iframe>
<p>Conversor del yen por <a href="https://viajajapon.com">ViajaJapon</a></p>`;

export default async function Page() {
  const { rate, date, live } = await getYenRate();
  const per100 = (100 / rate).toFixed(2); // € por ¥100
  const updated = live && date !== "—" ? date : "2026-06-02";

  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <p className="kicker text-primary">Datos · Dato vivo</p>
      <h1 className="mt-2 text-4xl font-bold sm:text-5xl">¿A cuánto está el yen hoy?</h1>

      <div className="mt-8 rounded-lg border border-border bg-surface p-8 text-center">
        <p className="kicker text-fg-muted">Cambio de referencia</p>
        <p className="nums mt-3 font-serif text-5xl font-bold text-fg sm:text-6xl">
          1€ = ¥{rate}
        </p>
        <p className="nums mt-3 text-fg-muted">¥100 ≈ {per100}€</p>
        <p className="mt-4 text-xs text-fg-muted">
          Actualizado: {updated} · fuente: referencia BCE (Frankfurter){live ? "" : " · valor estimado (sin conexión)"}.
          Es un tipo de referencia, no incluye comisiones de cambio de tu banco o tarjeta.
        </p>
      </div>

      <div className="mt-8 space-y-4 text-lg leading-relaxed text-fg-muted">
        <p>
          El yen se mueve a diario y es lo que más afecta al presupuesto de un viaje a Japón. Cuanto más débil
          está el yen frente al euro, más barato te sale todo sobre el terreno: comida, transporte, alojamiento y
          compras.
        </p>
        <p>
          Para traducirlo a tu viaje real, usa la{" "}
          <Link href="/herramientas/jr-pass-calculadora" className="text-primary underline-offset-2 hover:underline">
            calculadora de presupuesto y JR Pass
          </Link>
          : estima el coste total en euros con el cambio de hoy.
        </p>
      </div>

      <section className="mt-12 rounded-lg border border-border bg-muted p-6">
        <h2 className="text-xl font-bold">Pon este conversor en tu web</h2>
        <p className="mt-2 text-sm leading-relaxed text-fg-muted">
          ¿Tienes un blog o una web de viajes? Puedes incrustar este conversor del yen gratis. Copia y pega este
          código donde quieras que aparezca:
        </p>
        <pre className="mt-4 overflow-x-auto rounded-md border border-border bg-surface p-4 text-xs leading-relaxed text-fg">
          <code>{EMBED_CODE}</code>
        </pre>
        <p className="mt-2 text-xs text-fg-muted">
          Se actualiza solo con el cambio de referencia del BCE. Solo te pedimos mantener el enlace de atribución.
        </p>
      </section>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Cambio yen-euro hoy",
          inLanguage: "es-ES",
          url: `${SITE.url}/cambio-yen-euro`,
          dateModified: updated,
          mainEntity: {
            "@type": "Dataset",
            name: "Tipo de cambio EUR/JPY (referencia BCE)",
            description: `1 EUR = ${rate} JPY`,
            dateModified: updated,
          },
        }}
      />
    </article>
  );
}
