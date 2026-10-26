import type { Metadata } from "next";
import { withSocial } from "@/lib/seo";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { SITE } from "@/lib/site";

export const metadata: Metadata = withSocial("/prensa", {
  title: "Prensa y colaboraciones",
  description:
    "Qué es ViajaJapón, qué datos propios pueden citarse, cómo proponer un artículo invitado o una colaboración y cómo contactar.",
  alternates: { canonical: "/prensa" },
});

const EMAIL = "info@viajajapon.com";
const link = "text-primary underline-offset-2 hover:underline";

export default function Page() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <p className="kicker text-primary">Transparencia</p>
      <h1 className="mt-2 text-balance text-4xl font-bold sm:text-5xl">Prensa y colaboraciones</h1>
      <p className="mt-5 text-lg leading-relaxed text-fg-muted">
        ViajaJapón es una web independiente en español para planificar un viaje a Japón por libre: itinerarios día a
        día, presupuesto en euros y herramientas que hacen las cuentas por ti. La escribe{" "}
        <strong className="text-fg">{SITE.author.name}</strong> desde España, a partir del viaje que hizo con su madre en
        diciembre de 2025 y de las fuentes oficiales japonesas.
      </p>

      <div className="mt-10 space-y-8 leading-relaxed text-fg-muted">
        <section>
          <h2 className="text-2xl font-bold text-fg">Qué encontrarás en la web</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>
              Más de 60 guías de destinos, itinerarios, logística, gastronomía y cultura, con fecha de actualización y
              fuentes.
            </li>
            <li>
              Herramientas gratuitas y sin registro, como la{" "}
              <Link href="/herramientas/jr-pass-calculadora" className={link}>
                calculadora del JR Pass
              </Link>{" "}
              con las tarifas de octubre de 2026.
            </li>
            <li>
              Calendarios por ciudad de la{" "}
              <Link href="/logistica/sakura-japon" className={link}>
                floración del cerezo
              </Link>{" "}
              y del{" "}
              <Link href="/logistica/momiji-japon" className={link}>
                momiji
              </Link>
              , elaborados con los datos de la Agencia Meteorológica de Japón.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-fg">Datos que puedes citar</h2>
          <p className="mt-3">
            Los calendarios, los presupuestos y las tablas de precios de las guías pueden citarse libremente enlazando a
            la página de origen. Cada cifra lleva su fecha y su fuente. Si necesitas el dato en otro formato o una
            aclaración, escríbenos.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-fg">Artículos invitados</h2>
          <p className="mt-3">
            Publicamos artículos de otros autores cuando aportan algo que nosotros no podemos contar igual de bien. Un
            ejemplo es{" "}
            <Link href="/destinos/seki" className={link}>
              la guía de Seki
            </Link>{" "}
            de Hamono Club. Las condiciones son estas:
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>El texto es original, pensado para el viajero y con sus fuentes.</li>
            <li>
              Lo editamos a nuestro formato y contrastamos sus datos con fuentes oficiales; el autor aprueba la versión
              final antes de publicarla.
            </li>
            <li>
              No cobramos ni pagamos por él. El autor firma con un enlace a su web marcado como nofollow, como pide
              Google para los artículos invitados. No hacemos intercambios de enlaces.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-fg">Marcas y empresas</h2>
          <p className="mt-3">
            Solo recomendamos productos y servicios que hemos probado o contrastado. No publicamos contenido pagado sin
            identificarlo como tal, y los enlaces de afiliación se señalan siempre. Más detalles en la{" "}
            <Link href="/politica-editorial" className={link}>
              política editorial
            </Link>{" "}
            y la{" "}
            <Link href="/afiliados-divulgacion" className={link}>
              divulgación de afiliados
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-fg">Logotipo y contacto</h2>
          <p className="mt-3">
            Puedes usar el{" "}
            <a href="/logo.png" className={link}>
              logotipo de ViajaJapón
            </a>{" "}
            para referirte a la web. Para entrevistas, datos o colaboraciones, escribe a{" "}
            <a href={`mailto:${EMAIL}`} className={link}>
              {EMAIL}
            </a>
            .
          </p>
        </section>
      </div>

      <p className="mt-10 text-xs text-fg-muted">Última actualización: 26 de octubre de 2026.</p>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Prensa y colaboraciones de ViajaJapón",
          url: `${SITE.url}/prensa`,
          inLanguage: "es-ES",
          about: { "@type": "Organization", name: SITE.name, url: SITE.url, email: EMAIL, logo: `${SITE.url}/logo.png` },
        }}
      />
    </article>
  );
}
