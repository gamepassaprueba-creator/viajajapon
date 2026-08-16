import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política editorial: fuentes, actualizaciones y correcciones",
  description:
    "Cómo se crea y verifica el contenido de ViajaJapón: experiencia propia, fuentes oficiales, actualizaciones, correcciones, IA y monetización.",
  alternates: { canonical: "/politica-editorial" },
};

export default function Page() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <p className="kicker text-primary">Transparencia</p>
      <h1 className="mt-2 text-balance text-4xl font-bold sm:text-5xl">Política editorial</h1>
      <p className="mt-5 text-lg leading-relaxed text-fg-muted">
        ViajaJapón mezcla experiencia de primera mano y documentación. No hemos estado personalmente en cada lugar
        del país ni pretendemos haberlo hecho. Cuando una recomendación nace de nuestro viaje a Japón lo señalamos;
        cuando depende de tarifas, leyes, calendarios o datos externos, la contrastamos con fuentes adecuadas.
      </p>

      <div className="mt-10 space-y-8 leading-relaxed text-fg-muted">
        <section>
          <h2 className="text-2xl font-bold text-fg">Quién escribe</h2>
          <p className="mt-3">
            El responsable editorial es <strong className="text-fg">Sergio Morillo</strong>. Puedes conocer el viaje
            que dio origen al proyecto, qué partes fueron experiencia propia y qué criterios seguimos en{" "}
            <Link href="/sobre-nosotros" className="text-primary underline-offset-2 hover:underline">
              Sobre nosotros
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-fg">Fuentes y verificación</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>
              Para <strong className="text-fg">visados, entrada, impuestos, transporte y normas</strong>, priorizamos
              organismos públicos, operadores oficiales y documentación primaria.
            </li>
            <li>
              Los <strong className="text-fg">precios y tipos de cambio</strong> se acompañan de fecha o contexto y se
              presentan como referencia cuando pueden variar.
            </li>
            <li>
              En temas donde una fuente oficial no responde a una pregunta práctica, podemos complementar con
              experiencia propia y fuentes secundarias fiables, diferenciando hechos de recomendaciones.
            </li>
            <li>
              Las guías sensibles al tiempo muestran una fecha de actualización. Esa fecha cambia cuando hay una
              revisión material, no por una actualización automática vacía.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-fg">Uso de herramientas de IA</h2>
          <p className="mt-3">
            Podemos utilizar herramientas de inteligencia artificial como apoyo para investigación, organización,
            comparación de fuentes, edición técnica o revisión. No las tratamos como fuente factual. Las afirmaciones
            que pueden cambiar —por ejemplo precios, reglas de entrada o calendarios— deben contrastarse con una fuente
            externa adecuada antes de publicarse o actualizarse.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-fg">Correcciones</h2>
          <p className="mt-3">
            Si detectas un error, escríbenos. Revisamos la información y, cuando procede, corregimos el contenido y su
            fecha de modificación. No ocultamos una corrección válida porque una versión anterior fuese nuestra.
          </p>
          <p className="mt-3">
            El canal está en{" "}
            <Link href="/contacto" className="text-primary underline-offset-2 hover:underline">
              Contacto y correcciones
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-fg">Afiliados, publicidad e independencia</h2>
          <p className="mt-3">
            ViajaJapón puede financiarse mediante publicidad y enlaces de afiliación. Una comisión no cambia el precio
            para el lector y no convierte automáticamente a un proveedor en recomendado. Cuando una herramienta o una
            comparación concluye que una compra no compensa, esa conclusión debe mantenerse aunque reduzca los ingresos.
            Consulta también nuestra{" "}
            <Link href="/afiliados-divulgacion" className="text-primary underline-offset-2 hover:underline">
              divulgación de afiliados
            </Link>
            .
          </p>
        </section>
      </div>

      <p className="mt-10 text-xs text-fg-muted">Última actualización: 16 de agosto de 2026.</p>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Política editorial de ViajaJapón",
          url: `${SITE.url}/politica-editorial`,
          inLanguage: "es-ES",
          about: {
            "@type": "Organization",
            name: SITE.name,
            url: SITE.url,
          },
        }}
      />
    </article>
  );
}
