import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre nosotros: la historia detrás de ViajaJapón",
  description:
    "ViajaJapón nació de un viaje real: 15 días por Japón cumpliendo el sueño que mi madre tenía desde niña, por su 70 cumpleaños. Quién escribe esto y por qué puedes fiarte.",
  alternates: { canonical: "/sobre-nosotros" },
};

export default function Page() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <p className="kicker text-primary">Sobre nosotros</p>
      <h1 className="mt-2 text-balance text-4xl font-bold sm:text-5xl">
        Esta web nació de un regalo de cumpleaños
      </h1>
      <div className="mt-6 space-y-4 text-lg leading-relaxed text-fg-muted">
        <p>
          En diciembre de 2024, por su 69 cumpleaños, le regalé a mi madre cumplir el sueño que tenía
          desde niña: <strong className="text-fg">ir a Japón</strong>. Un año después, por su 70
          cumpleaños, lo hicimos realidad: <strong className="text-fg">quince días recorriendo Japón
          juntos, madre e hijo</strong>, en diciembre de 2025. Lo planifiqué todo yo — vuelos, hoteles,
          trenes, reservas — y de esa planificación (y de sus aciertos y errores) nace esta web.
        </p>
        <p>
          Empezamos por Tokio, seguimos a Kioto, Osaka y Yokohama, y cerramos de nuevo en Tokio.
          Recorrimos Akihabara, Ueno, Shibuya y Shinjuku; subimos a la Torre de Tokio, al Skytree y al
          Shibuya Sky; comimos ramen literalmente todos los días — nos metíamos en cualquier sitio,
          porque en Japón cualquier sitio está rico. Mi madre, con sus 70 años recién cumplidos, subió
          el Fushimi Inari hasta arriba del todo y caminó horas cada día sin quejarse ni una vez: el
          Apple Watch no daba abasto. Su momento favorito del viaje, y lo sigue contando hoy: el templo
          Kiyomizu-dera iluminado de noche.
        </p>
        <p>
          Hubo de todo: un ryokan en Kioto con desayuno con ceremonia del té cuya dueña le regaló a mi
          madre una figurita de cristal "para la suerte"; un hotel en Yokohama que le cantó el
          cumpleaños feliz con tarta y cesta de frutas incluidas (todo era sorpresa, ella no sabía
          nada); y hasta un error con los billetes del tren bala que nos plantó en primera clase sin
          saberlo. Todo eso — lo que salió perfecto y lo que aprendimos a base de equivocarnos — está
          repartido por las guías de esta web.
        </p>
        <p>
          Tengo 35 años y, aunque la vida no siempre me ha tratado de la mejor manera, siempre he
          intentado mirar al futuro con ilusión. Aquel viaje fue mi forma de devolverle a mi madre un
          poco de todo lo que ella me ha dado desde que nací. Esta web es la continuación: ayudar a que
          tu viaje a Japón —el tuyo, el de tu familia, el que llevas años posponiendo— salga tan bien
          como salió el nuestro.
        </p>
      </div>

      <h2 className="mt-10 text-2xl font-bold">Por qué puedes fiarte de lo que lees aquí</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-lg leading-relaxed text-fg-muted">
        <li>
          <strong className="text-fg">Cifras ancladas y con fecha.</strong> Los precios (JR Pass,
          trenes, presupuestos) salen de tarifas verificadas, no de copiar otras webs — y cuando algo
          puede cambiar, te decimos que lo verifiques.
        </li>
        <li>
          <strong className="text-fg">La cuenta honesta, aunque venda menos.</strong> Nuestra{" "}
          <a href="/herramientas/jr-pass-calculadora" className="text-primary underline-offset-2 hover:underline">
            calculadora del JR Pass
          </a>{" "}
          le dice a la mayoría de viajeros que NO compren el pase, porque es la verdad.
        </li>
        <li>
          <strong className="text-fg">Experiencia real, señalizada.</strong> Lo vivido en nuestro viaje
          aparece en las guías como notas personales; lo que aún no hemos pisado, no lo fingimos.
        </li>
        <li>
          <strong className="text-fg">Transparencia.</strong> Algunas recomendaciones pueden contener
          enlaces de afiliado (
          <a href="/afiliados-divulgacion" className="text-primary underline-offset-2 hover:underline">
            aquí lo contamos
          </a>
          ); las fotos de terceros llevan siempre su crédito y licencia.
        </li>
      </ul>

      <p className="mt-8 text-lg leading-relaxed text-fg-muted">
        ¿Por dónde empezar? Por donde empezamos todos:{" "}
        <a href="/logistica/japon-por-libre-primer-viaje" className="text-primary underline-offset-2 hover:underline">
          Japón por libre: tu primer viaje
        </a>
        .
      </p>
    </article>
  );
}
