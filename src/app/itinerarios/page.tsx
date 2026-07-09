import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  Calculator,
  CalendarDays,
  Check,
  Coins,
  TrainFront,
} from "lucide-react";
import { PillarArticles, pillarHasContent } from "@/components/PillarIndex";
import { ItinerariosFiltro } from "@/components/ItinerariosFiltro";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Itinerarios por Japón: 7, 10, 15 días y 1 mes",
  description:
    "Itinerarios para Japón según la duración de tu viaje, con rutas, presupuesto y enlaces a la calculadora del JR Pass.",
  alternates: { canonical: "/itinerarios" },
  // Indexar solo cuando haya contenido publicado; si está vacío, noindex (evita thin content).
  ...(pillarHasContent("itinerarios") ? {} : { robots: { index: false, follow: true } }),
};

type Itinerario = {
  img: string;
  alt: string;
  badge: string;
  title: string;
  ruta: string;
  desc: string;
  href?: string;
};

const ITINERARIOS: Itinerario[] = [
  {
    img: "/images/tokio.jpg",
    alt: "Cruce de Shibuya en Tokio al atardecer",
    badge: "7 días",
    title: "Esencia de Japón",
    ruta: "Tokio, Kioto, Nara",
    desc: "Lo imprescindible si vas justo de días: lo grande de Tokio, lo clásico de Kioto y una escapada a Nara.",
    href: "/itinerarios/itinerario-japon-7-dias",
  },
  {
    img: "/images/kioto.jpg",
    alt: "Pagoda y calles tradicionales de Kioto",
    badge: "10 días",
    title: "Ruta clásica",
    ruta: "Tokio, Hakone, Kioto, Osaka",
    desc: "El recorrido más equilibrado para un primer viaje: ciudades, templos, vistas del Fuji y buena mesa.",
    href: "/itinerarios/itinerario-japon-10-dias",
  },
  {
    img: "/images/osaka.jpg",
    alt: "Carteles luminosos del barrio de Dotonbori en Osaka",
    badge: "15 días",
    title: "Japón profundo",
    ruta: "Tokio, Nikko, Kioto, Hiroshima, Kanazawa",
    desc: "El punto dulce: las imprescindibles más Nikko, Miyajima y Kanazawa, sin ritmo de gincana.",
    href: "/itinerarios/itinerario-japon-15-dias",
  },
  {
    img: "/images/hero-fuji.jpg",
    alt: "Monte Fuji con una pagoda y cerezos en flor",
    badge: "1 mes",
    title: "Japón completo",
    ruta: "Tokio, Kansai, Hiroshima y los Alpes",
    desc: "Cuatro semanas con base fija, días colchón y final a tu medida (Alpes, Hokkaido u Okinawa).",
    href: "/itinerarios/itinerario-japon-1-mes",
  },
];

type Feature = {
  Icon: typeof Calculator;
  color: string;
  bg: string;
  title: string;
  desc: string;
  bullets: string[];
  href?: string;
  link?: string;
};

const FEATURES: Feature[] = [
  {
    Icon: Calculator,
    color: "text-primary",
    bg: "",
    title: "Cifras ancladas a tarifas reales",
    desc: "Los trayectos en tren de cada itinerario se calculan con las tarifas reales de las rutas, no con estimaciones a ojo.",
    bullets: [
      "Cada trayecto, con su tarifa real",
      "Si una tarifa cambia, actualizamos la guía",
      "Sin redondeos para que cuadre el cuento",
    ],
  },
  {
    Icon: Coins,
    color: "text-[#0a0a0a]",
    bg: "",
    title: "Presupuesto en euros",
    desc: "Cada itinerario incluye su presupuesto pasado a euros con un cambio de referencia, para que sepas qué te cuesta de verdad.",
    bullets: [
      "Pensado para bolsillos españoles",
      "Cambio de referencia indicado en cada guía",
      "Desglose por conceptos, no una cifra suelta",
    ],
  },
  {
    Icon: TrainFront,
    color: "text-secondary",
    bg: "",
    title: "La cuenta honesta del JR Pass",
    desc: "En estas rutas el JR Pass casi nunca compensa, y te enseñamos la cuenta para que lo compruebes tú mismo.",
    bullets: [
      "Comparamos el pase con los billetes sueltos",
      "Te decimos cuándo sí y cuándo no",
      "Sin comisiones escondidas en el consejo",
    ],
    href: "/logistica/jr-pass-2026",
    link: "Leer la guía del JR Pass",
  },
];

type EnlaceUtil = { href: string; kicker: string; title: string; desc: string };

const ENLACES_UTILES: EnlaceUtil[] = [
  {
    href: "/logistica/cuanto-cuesta-viajar-japon",
    kicker: "Presupuesto",
    title: "¿Cuánto cuesta viajar a Japón?",
    desc: "El presupuesto completo de un viaje, partida a partida y en euros.",
  },
  {
    href: "/logistica/mejor-epoca-viajar-japon",
    kicker: "Cuándo ir",
    title: "La mejor época para viajar",
    desc: "Sakura, momiji, festivales y temporadas altas: elige bien tus fechas.",
  },
  {
    href: "/logistica/japon-por-libre-primer-viaje",
    kicker: "Primer viaje",
    title: "Japón por libre, sin agencia",
    desc: "Todo lo que necesitas saber para organizarlo tú mismo sin agobios.",
  },
];

const CHIPS: { Icon: typeof Coins; label: string }[] = [
  { Icon: Coins, label: "Presupuesto en euros" },
  { Icon: TrainFront, label: "Tarifas de tren verificadas" },
  { Icon: CalendarDays, label: "Plantillas adaptables" },
];

export default function Page() {
  return (
    <div>
      {/* Hero textual */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <Breadcrumbs items={[{ name: "Inicio", href: "/" }, { name: "Itinerarios", href: "/itinerarios" }]} className="mb-4 justify-center" />
          <p className="kicker text-primary">Itinerarios</p>
          <h1 className="mx-auto mt-3 max-w-3xl text-balance text-4xl font-bold leading-tight sm:text-5xl">
            Itinerarios por Japón día a día
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-fg-muted">
            Plantillas de viaje pensadas para que las adaptes a tu ritmo: cada día explicado, con el
            presupuesto en euros y los trayectos calculados con tarifas de tren reales. Nada de rutas
            imposibles copiadas de otro blog.
          </p>
          <ul className="mt-8 flex flex-wrap justify-center gap-3">
            {CHIPS.map((c) => (
              <li
                key={c.label}
                className="flex items-center gap-2 border border-border bg-surface px-4 py-2 text-sm font-medium text-fg"
              >
                <c.Icon size={16} className="text-primary" aria-hidden="true" />
                {c.label}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Elige según tus días */}
      <section className="bg-surface py-16">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHead
            title="Elige según tus días"
            sub="Cuatro plantillas según el tiempo que tengas. Empieza por la que más se acerque y ajústala a tu viaje."
          />
          <ItinerariosFiltro items={ITINERARIOS} />
        </div>
      </section>

      {/* Cómo están hechos */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHead
            title="Cómo están hechos estos itinerarios"
            sub="Lo que diferencia una plantilla útil de una lista bonita de sitios: las cuentas claras."
          />
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {FEATURES.map((f) => (
              <div key={f.title} className="panel-manga-dark bg-surface p-6">
                <div className={`mb-4 flex size-12 items-center justify-center ${f.color}`}>
                  <f.Icon size={24} aria-hidden="true" />
                </div>
                <h3 className="mb-2 text-xl font-bold">{f.title}</h3>
                <p className="mb-4 text-fg-muted">{f.desc}</p>
                <ul className="space-y-2">
                  {f.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm text-fg-muted">
                      <Check size={16} className={`mt-0.5 shrink-0 ${f.color}`} aria-hidden="true" /> {b}
                    </li>
                  ))}
                </ul>
                {f.href && f.link && (
                  <Link href={f.href} className={`mt-4 inline-flex items-center gap-1 font-medium ${f.color}`}>
                    {f.link} <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Banda CTA: calculadora del JR Pass */}
      <section className="bg-primary py-14">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h2 className="text-balance text-3xl font-bold text-white">
            ¿JR Pass sí o no? Haz la cuenta con tu ruta
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-white/90">
            Mete los trayectos de tu itinerario en la calculadora y compárala con el precio del pase,
            en euros. En dos minutos sales de dudas.
          </p>
          <Link
            href="/herramientas/jr-pass-calculadora"
            className="mt-8 inline-flex items-center gap-2 bg-white px-6 py-3 font-semibold text-primary transition-colors hover:bg-gray-100"
          >
            Abrir la calculadora del JR Pass <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* Todos los itinerarios publicados */}
      <PillarArticles pillar="itinerarios" heading="Todos los itinerarios" />

      {/* Enlaces útiles */}
      <section className="bg-surface py-16">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHead
            title="Antes de cerrar fechas"
            sub="Tres guías que conviene leer mientras decides cuántos días le dedicas a Japón."
          />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {ENLACES_UTILES.map((e) => (
              <Link
                key={e.href}
                href={e.href}
                className="group panel-manga-dark bg-surface p-6"
              >
                <p className="kicker text-fg-muted">{e.kicker}</p>
                <h3 className="mt-2 text-lg font-bold transition-colors group-hover:text-primary">{e.title}</h3>
                <p className="mt-2 text-sm text-fg-muted">{e.desc}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                  Leer la guía <ArrowRight size={16} aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function SectionHead({ title, sub }: { title: string; sub: string }) {
  return (
    <div className="mb-12 text-center">
      <h2 className="mb-4 text-balance text-3xl font-bold">{title}</h2>
      <p className="mx-auto max-w-2xl text-pretty text-fg-muted">{sub}</p>
    </div>
  );
}
