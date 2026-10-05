import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { SITE } from "@/lib/site";
import { getAllArticles } from "@/lib/content";

export const metadata: Metadata = {
  title: "Sobre nosotros: la historia detrás de ViajaJapón",
  description:
    "ViajaJapón nació de un viaje real: 15 días por Japón con mi madre por su 70 cumpleaños. Soy Sergio (Madrid); quién escribe esto y por qué fiarte.",
  alternates: { canonical: "/sobre-nosotros" },
};

export default function Page() {
  const publishedGuides = getAllArticles().length;

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
          Mi madre siempre decía que su sueño era viajar a Japón. Durante el covid hubo momentos en los
          que me asusté de verdad y pensé que quizá ya sería tarde para hacer ese viaje con ella. Me
          prometí que, si salíamos de aquello, lo prepararía por todos los medios. Tras unos años
          ahorrando lo suficiente, me metí en Canva y le hice un folleto con una foto de los dos en la
          portada y un título: «Nuestro viaje soñado a Japón». Dentro iban tips del viaje, lo típico de
          allí y cuánto dura el vuelo desde Madrid. Cuando lo abrió no se lo creía: tuvo que leerlo
          varias veces y se emocionó.
        </p>
        <p>
          Nos dimos un año de margen para encontrar la fecha ideal a buen precio. Durante meses, Google
          Flights me mandó cada día los precios. Yo quería la máxima comodidad para mi madre, así que
          solo vuelos directos, y esperaba una buena oferta de Iberia desde Madrid. Una noche, a las 4
          o 5 de la madrugada, sin poder dormir, me llegó el aviso: vuelo directo de Iberia para
          diciembre por <strong className="text-fg">690 € cada uno, ida y vuelta</strong>, cuando los
          avisos que recibía rara vez bajaban de 1.000 €. Salté de la cama, me fui al ordenador y
          compré los dos billetes. Unas horas después llamé a mi madre: ya teníamos los vuelos a
          Japón. Reservamos con al menos seis meses de antelación y salimos el 30 de noviembre de 2025
          y aterrizamos en Narita el 1 de diciembre.
        </p>
        <p>
          Los hoteles los reservé en Booking, con la opción de reserva sin pago por adelantado, para
          poder ajustar el plan si hacía falta. Las maletas nos las prestó la familia. Durante meses mi
          madre y yo nos mandamos mensajes de WhatsApp: «ya quedan 5 meses», «un día menos para estar
          en Japón», «3 meses y nos vamos». Cada vez que nos veíamos, los nervios y los preparativos.
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
          madre una figurita de cristal «para la suerte»; un hotel en Yokohama que le cantó el
          cumpleaños feliz con tarta y cesta de frutas incluidas (todo era sorpresa, ella no sabía
          nada); y hasta un error con los billetes del tren bala que nos plantó en primera clase sin
          saberlo. Todo eso — lo que salió perfecto y lo que aprendimos a base de equivocarnos — está
          repartido por las guías de esta web.
        </p>
        <p>
          Soy <strong className="text-fg">Sergio</strong>, tengo 35 años y vivo en Madrid.
          Aunque la vida no siempre me ha tratado de la mejor manera, siempre he intentado mirar al
          futuro con ilusión. Aquel viaje fue mi forma de devolverle a mi madre un
          poco de todo lo que ella me ha dado desde que nací. Esta web es la continuación: ayudar a que
          tu viaje a Japón —el tuyo, el de tu familia, el que llevas años posponiendo— salga tan bien
          como salió el nuestro.
        </p>
      </div>

      <section className="mt-10 border-[2px] border-[#0a0a0a] bg-[#f5f5f5] p-6">
        <p className="font-mono text-[10px] font-black uppercase tracking-widest text-primary">Proyecto editorial vivo</p>
        <p className="mt-2 text-lg leading-relaxed text-fg-muted">
          Hoy ViajaJapón reúne <strong className="text-fg">{publishedGuides} guías y artículos publicados</strong>.
          El proyecto no republica artículos de terceros: el punto de partida fue nuestro viaje y, a partir de ahí,
          documentación, actualización y revisión editorial. Si quieres ver la parte que sí vivimos
          personalmente, hemos dejado el recorrido y sus aprendizajes en{" "}
          <Link href="/nuestro-viaje-japon" className="text-primary underline-offset-2 hover:underline">
            nuestro viaje a Japón
          </Link>
          .
        </p>
      </section>

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
        <Link href="/logistica/japon-por-libre-primer-viaje" className="text-primary underline-offset-2 hover:underline">
          Japón por libre: tu primer viaje
        </Link>
        .
      </p>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ProfilePage",
          mainEntity: {
            "@type": "Person",
            name: SITE.author.name,
            url: `${SITE.url}/sobre-nosotros`,
            homeLocation: { "@type": "Place", name: "Madrid, España" },
            description:
              "Autor de ViajaJapón. Viajó quince días por Japón con su madre en diciembre de 2025 y vuelca esa experiencia real en las guías de la web.",
            knowsAbout: ["Viajes a Japón", "JR Pass", "Tokio", "Kioto", "planificación de viajes"],
          },
        }}
      />
    </article>
  );
}
