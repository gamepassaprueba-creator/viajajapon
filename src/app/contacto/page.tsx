import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contacto y correcciones",
  description:
    "Cómo contactar con ViajaJapón, proponer una corrección, avisar de un dato desactualizado o consultar una colaboración.",
  alternates: { canonical: "/contacto" },
};

const EMAIL = "info@viajajapon.com";

export default function Page() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <p className="kicker text-primary">Contacto</p>
      <h1 className="mt-2 text-balance text-4xl font-bold sm:text-5xl">Escríbenos</h1>
      <p className="mt-5 text-lg leading-relaxed text-fg-muted">
        ViajaJapón lo escribe y mantiene Sergio Morillo. Si has encontrado un precio desactualizado, un enlace roto,
        una norma que ha cambiado o cualquier error factual, nos interesa saberlo: corregir una guía es más útil que
        fingir que nunca se queda antigua.
      </p>

      <section className="mt-8 border-[2px] border-[#0a0a0a] bg-white p-6">
        <h2 className="text-2xl font-bold text-fg">Correo</h2>
        <p className="mt-3 leading-relaxed text-fg-muted">
          <a className="font-bold text-primary underline-offset-2 hover:underline" href={`mailto:${EMAIL}`}>
            {EMAIL}
          </a>
        </p>
        <p className="mt-2 text-sm leading-relaxed text-fg-muted">
          Para una corrección, indica la URL y, si puedes, enlaza la fuente oficial que contradice el dato publicado.
          Para colaboraciones comerciales, identifica claramente la empresa y la propuesta.
        </p>
      </section>

      <section className="mt-8 space-y-4 leading-relaxed text-fg-muted">
        <h2 className="text-2xl font-bold text-fg">Qué hacemos con una corrección</h2>
        <p>
          Revisamos el dato contra fuentes primarias u oficiales cuando existen. Si la corrección es válida,
          actualizamos la guía y su fecha de modificación. No aceptamos pagos para mantener información que sepamos
          que es incorrecta.
        </p>
        <p>
          Puedes consultar cómo investigamos, actualizamos y monetizamos el contenido en nuestra{" "}
          <Link href="/politica-editorial" className="text-primary underline-offset-2 hover:underline">
            política editorial
          </Link>
          .
        </p>
      </section>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Contacto y correcciones de ViajaJapón",
          url: `${SITE.url}/contacto`,
          inLanguage: "es-ES",
          mainEntity: {
            "@type": "Organization",
            name: SITE.name,
            url: SITE.url,
            email: EMAIL,
          },
        }}
      />
    </article>
  );
}
