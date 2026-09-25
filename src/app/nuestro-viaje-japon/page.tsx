import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Nuestro viaje a Japón: 15 días, madre e hijo (diciembre de 2025)",
  description:
    "El viaje real que dio origen a ViajaJapón: 15 días por Tokio, Kioto, Osaka y Yokohama, lo que salió bien, los errores y lo que aprendimos al organizarlo por libre.",
  alternates: { canonical: "/nuestro-viaje-japon" },
};

const LESSONS = [
  {
    title: "Planificar mucho no significa llevar el viaje encorsetado",
    text: "Llevábamos cerrados los vuelos, hoteles, trenes importantes y algunas reservas, pero dejamos margen para entrar a comer donde nos apeteciera, cambiar el ritmo y repetir zonas que nos habían gustado. Ese equilibrio es el que intentamos trasladar a los itinerarios de la web.",
  },
  {
    title: "Moverse por Japón impone más antes del viaje que una vez allí",
    text: "El Shinkansen, el metro y las estaciones parecen complicados desde casa. Sobre el terreno, con el trayecto preparado y sabiendo qué billete necesitas, la logística se vuelve mucho más sencilla. También aprendimos a base de equivocarnos: un error con unos billetes del tren bala acabó llevándonos en una clase mejor de la que pensábamos.",
  },
  {
    title: "No hace falta perseguir restaurantes famosos para comer bien",
    text: "Durante esos quince días comimos ramen prácticamente a diario y muchas veces entramos simplemente donde nos gustaba el aspecto del local. Esa experiencia es la razón por la que nuestras guías de comida explican tipos de restaurantes y cómo pedir, en lugar de limitarse a listas de sitios de moda.",
  },
  {
    title: "El ritmo importa más que llenar el mapa de puntos",
    text: "Mi madre acababa de cumplir 70 años y aun así subió Fushimi Inari hasta arriba y caminó durante horas cada día. La clave no fue correr: fue ordenar bien las jornadas, alternar visitas y aceptar que un buen viaje no se mide por tachar el mayor número de lugares.",
  },
];

export default function Page() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <Breadcrumbs
        items={[
          { name: "Inicio", href: "/" },
          { name: "Nuestro viaje", href: "/nuestro-viaje-japon" },
        ]}
      />

      <p className="kicker mt-4 text-primary">Experiencia real · diciembre de 2025</p>
      <h1 className="mt-2 text-balance text-4xl font-black sm:text-5xl">
        El viaje de 15 días que acabó convirtiéndose en ViajaJapón
      </h1>

      <div className="mt-6 space-y-5 text-lg leading-relaxed text-fg-muted">
        <p>
          ViajaJapón no empezó como un proyecto de contenidos. Empezó con un regalo. En diciembre de
          2024 le regalé a mi madre, por su 69 cumpleaños, el viaje que llevaba años queriendo hacer.
          Un año después, ya con 70 recién cumplidos, nos fuimos juntos a Japón durante quince días.
        </p>
        <p>
          El recorrido fue <strong className="text-fg">Tokio → Kioto → Osaka → Yokohama → Tokio</strong>.
          Lo organicé por libre: vuelos, hoteles, trenes y reservas. Después de volver me di cuenta de
          que gran parte del trabajo que había hecho para nosotros podía servir a otras personas si lo
          explicaba con las cifras, errores y contexto que yo había echado de menos al preparar el viaje.
        </p>
        <p>
          Esta página cuenta solo lo que vivimos nosotros. En el resto de ViajaJapón distinguimos entre
          experiencia propia y documentación: si no hemos estado personalmente en un lugar, no fingimos
          lo contrario y contrastamos la información con fuentes adecuadas.
        </p>
      </div>

      <section className="mt-10 border-y-[3px] border-[#0a0a0a] py-8">
        <p className="kicker text-primary">Los recuerdos que acabaron dentro de las guías</p>
        <div className="mt-5 space-y-6 text-lg leading-relaxed text-fg-muted">
          <p>
            En Tokio pasamos por Akihabara, Ueno, Shibuya y Shinjuku; subimos a la Torre de Tokio, al
            Skytree y a Shibuya Sky. En Kioto, mi madre subió Fushimi Inari hasta arriba. Su recuerdo
            favorito de todo el viaje sigue siendo <strong className="text-fg">Kiyomizu-dera iluminado de noche</strong>.
          </p>
          <p>
            Dormimos en un ryokan de Kioto donde el desayuno incluyó una ceremonia del té. La dueña
            terminó regalándole a mi madre una pequeña figura de cristal para la suerte. En Yokohama,
            el hotel preparó una tarta, una cesta de fruta y le cantaron el cumpleaños feliz sin que
            ella supiera que yo había organizado nada.
          </p>
          <p>
            También hubo errores. El más recordado fue con unos billetes del tren bala: no entendimos
            bien lo que habíamos comprado y acabamos viajando en una clase superior sin saberlo al
            principio. Es exactamente el tipo de detalle que intentamos convertir después en una
            explicación útil, no esconderlo para parecer expertos infalibles.
          </p>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-3xl font-black">Cuatro cosas que aprendimos y hoy forman parte de la web</h2>
        <div className="mt-6 grid gap-4">
          {LESSONS.map((lesson, index) => (
            <div key={lesson.title} className="border-[2px] border-[#0a0a0a] bg-white p-5">
              <p className="font-mono text-[10px] font-black uppercase tracking-widest text-primary">
                Aprendizaje {index + 1}
              </p>
              <h3 className="mt-2 text-xl font-black text-fg">{lesson.title}</h3>
              <p className="mt-2 leading-relaxed text-fg-muted">{lesson.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10 border-[2px] border-[#0a0a0a] bg-[#f5f5f5] p-6">
        <h2 className="text-2xl font-black">Dónde se ve esa experiencia en ViajaJapón</h2>
        <p className="mt-3 leading-relaxed text-fg-muted">
          El viaje no convierte automáticamente cada artículo en experiencia de primera mano. Por eso
          lo señalamos cuando corresponde y documentamos el resto. Si estás preparando tu primer viaje,
          estas son las piezas que mejor recogen lo que aprendimos organizándolo:
        </p>
        <ul className="mt-4 space-y-2">
          <li>
            <Link href="/logistica/japon-por-libre-primer-viaje" className="font-bold text-primary hover:underline">
              Japón por libre: cómo organizar tu primer viaje
            </Link>
          </li>
          <li>
            <Link href="/itinerarios/itinerario-japon-15-dias" className="font-bold text-primary hover:underline">
              Itinerario de Japón en 15 días
            </Link>
          </li>
          <li>
            <Link href="/destinos/que-ver-en-tokio" className="font-bold text-primary hover:underline">
              Qué ver en Tokio
            </Link>
          </li>
          <li>
            <Link href="/destinos/que-ver-en-kioto" className="font-bold text-primary hover:underline">
              Qué ver en Kioto
            </Link>
          </li>
          <li>
            <Link href="/politica-editorial" className="font-bold text-primary hover:underline">
              Cómo verificamos y actualizamos las guías
            </Link>
          </li>
        </ul>
      </section>

      <p className="mt-8 text-sm leading-relaxed text-fg-muted">
        Escrito por{" "}
        <Link href="/sobre-nosotros" className="font-bold text-fg underline-offset-2 hover:underline">
          {SITE.author.name}
        </Link>
        . Si quieres corregir un dato o preguntarnos por cómo preparamos una guía, puedes hacerlo desde{" "}
        <Link href="/contacto" className="text-primary underline-offset-2 hover:underline">
          Contacto y correcciones
        </Link>
        .
      </p>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "Nuestro viaje a Japón: 15 días, madre e hijo",
          description:
            "El viaje real de diciembre de 2025 que dio origen a ViajaJapón y los aprendizajes que se convirtieron en sus guías.",
          inLanguage: "es-ES",
          datePublished: "2026-09-25",
          dateModified: "2026-09-25",
          mainEntityOfPage: `${SITE.url}/nuestro-viaje-japon`,
          author: {
            "@type": "Person",
            name: SITE.author.name,
            url: SITE.author.url,
          },
          publisher: {
            "@type": "Organization",
            name: SITE.name,
            url: SITE.url,
          },
        }}
      />
    </article>
  );
}
