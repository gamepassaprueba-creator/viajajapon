import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ArrowRight, CalendarDays, Check, MapPin, TrainFront, type LucideIcon } from "lucide-react";
import { PillarArticles, pillarHasContent } from "@/components/PillarIndex";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Destinos de Japón: guías por ciudad",
  description:
    "Guías de Tokio, Kioto, Osaka y más: qué ver, cómo moverte y dónde comer, con datos prácticos y actualizados.",
  alternates: { canonical: "/destinos" },
  ...(pillarHasContent("destinos") ? {} : { robots: { index: false, follow: true } }),
};

type CityCard = {
  img: string;
  alt: string;
  title: string;
  desc: string;
  tags: string[];
  href: string;
  cta: string;
};

const CITIES: CityCard[] = [
  {
    img: "/images/tokio.jpg",
    alt: "Vista urbana de Tokio con sus calles iluminadas",
    title: "Tokio",
    desc: "Casi todos los viajes empiezan (y acaban) aquí. La decisión importante no es qué ver, sino en qué barrio dormir para no vivir en el metro.",
    tags: ["Shibuya", "Shinjuku", "Asakusa", "Ueno"],
    href: "/destinos/donde-dormir-en-tokio",
    cta: "Dónde dormir en Tokio",
  },
  {
    img: "/images/kioto.jpg",
    alt: "Calle tradicional de Kioto con arquitectura histórica",
    title: "Kioto",
    desc: "El Japón de templos y calles históricas. Elegir bien la zona marca la diferencia entre pasear al salir del alojamiento o depender del bus.",
    tags: ["Gion", "Higashiyama", "Arashiyama"],
    href: "/destinos/donde-dormir-en-kioto",
    cta: "Dónde dormir en Kioto",
  },
  {
    img: "/images/osaka.jpg",
    alt: "Ambiente nocturno de Osaka con carteles luminosos",
    title: "Osaka",
    desc: "La ciudad del buen comer y del ambiente desenfadado: Dotonbori, el castillo y Universal Studios Japan.",
    tags: ["Dotonbori", "Namba", "Castillo"],
    href: "/destinos/que-ver-en-osaka",
    cta: "Qué ver en Osaka",
  },
];

type BaseFeature = {
  Icon: LucideIcon;
  color: string;
  bg: string;
  title: string;
  desc: ReactNode;
  bullets: string[];
  href: string;
  link: string;
};

const BASE_FEATURES: BaseFeature[] = [
  {
    Icon: MapPin,
    color: "text-primary",
    bg: "bg-red-100",
    title: "Cerca de una estación grande",
    desc: "Vas a entrar y salir de tu barrio varias veces al día. Dormir a un paseo de una estación importante te ahorra tiempo, cansancio y arrastrar la maleta de más.",
    bullets: [
      "A un paseo corto de la estación",
      "Con súper o konbini al lado",
      "Evita traslados con muchas escaleras",
    ],
    href: "/destinos/donde-dormir-en-tokio",
    link: "Ejemplo práctico: dormir en Tokio",
  },
  {
    Icon: TrainFront,
    color: "text-secondary",
    bg: "bg-blue-100",
    title: "Conexión Yamanote o shinkansen",
    desc: "En Tokio, la línea Yamanote conecta los barrios clave. Y si vas a cambiar de ciudad, comprueba que tu base llegue fácil a la estación del shinkansen.",
    bullets: [
      "En Tokio: pegado a la Yamanote",
      "Entre ciudades: acceso fácil al shinkansen",
      "Cuantos menos transbordos con maleta, mejor",
    ],
    href: "/logistica/japon-por-libre-primer-viaje",
    link: "Cómo moverte en tu primer viaje",
  },
  {
    Icon: CalendarDays,
    color: "text-amber-600",
    bg: "bg-amber-100",
    title: "Reserva pronto en temporada alta",
    desc: (
      <>
        En sakura y momiji los alojamientos bien situados vuelan. Consulta la{" "}
        <Link href="/logistica/mejor-epoca-viajar-japon" className="font-medium text-primary hover:underline">
          guía de la mejor época para viajar
        </Link>{" "}
        y muévete con margen.
      </>
    ),
    bullets: [
      "Sakura y momiji se agotan antes",
      "Prioriza tarifas con cancelación gratuita",
      "Cierra primero las noches, luego el detalle",
    ],
    href: "/logistica/reservas-japon-2026",
    link: "Qué reservar y cuándo",
  },
];

type NextStep = {
  title: string;
  desc: string;
  href: string;
};

const NEXT_STEPS: NextStep[] = [
  {
    title: "Itinerario de 7 días",
    desc: "La esencia de Japón si vas justo de tiempo.",
    href: "/itinerarios/itinerario-japon-7-dias",
  },
  {
    title: "Itinerario de 10 días",
    desc: "La ruta clásica con Tokio, Kioto y Osaka.",
    href: "/itinerarios/itinerario-japon-10-dias",
  },
  {
    title: "Japón por libre: primer viaje",
    desc: "Cómo organizarlo todo sin agencia y sin agobios.",
    href: "/logistica/japon-por-libre-primer-viaje",
  },
];

export default function Page() {
  return (
    <div>
      {/* Hero textual */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4">
          <Breadcrumbs items={[{ name: "Inicio", href: "/" }, { name: "Destinos", href: "/destinos" }]} className="mb-4" />
          <p className="kicker text-primary">Destinos</p>
          <h1 className="mt-2 max-w-3xl text-balance text-4xl font-bold sm:text-5xl">
            Destinos de Japón: dónde ir y dónde dormir
          </h1>
          <p className="mt-4 max-w-2xl text-pretty text-lg leading-relaxed text-fg-muted">
            Aquí no vas a encontrar un listado de postales. Son guías prácticas para decidir en qué
            barrio hacer base, cómo moverte entre ciudades y dónde dormir sin acabar lejos de todo.
            Lo que de verdad condiciona tu viaje.
          </p>
        </div>
      </section>

      {/* Las tres grandes */}
      <section className="bg-surface py-16">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHead
            title="Las tres grandes"
            sub="Tokio, Kioto y Osaka concentran casi todas las primeras visitas. La decisión clave en cada una: el barrio donde duermes."
          />
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {CITIES.map((c) => (
              <Link key={c.title} href={c.href} className="group relative block h-96 overflow-hidden rounded-lg shadow-md">
                <Image
                  src={c.img}
                  alt={c.alt}
                  fill
                  sizes="(max-width:768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                  <h3 className="text-2xl font-bold">{c.title}</h3>
                  <p className="mt-2 text-sm text-gray-200">{c.desc}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {c.tags.map((t) => (
                      <span key={t} className="rounded-full bg-white/20 px-2 py-1 text-xs backdrop-blur-sm">{t}</span>
                    ))}
                  </div>
                  <span className="mt-4 inline-flex items-center gap-2 rounded-md bg-white/15 px-4 py-2 text-sm font-semibold backdrop-blur-sm transition-colors group-hover:bg-white/25">
                    {c.cta} <ArrowRight size={16} aria-hidden="true" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Cómo elegir tu base */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHead
            title="Cómo elegir tu base"
            sub="Tres criterios sencillos que evitan el error más caro del viaje: un alojamiento bonito pero mal situado."
          />
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {BASE_FEATURES.map((f) => (
              <div key={f.title} className="rounded-lg bg-surface p-6 shadow-md transition-all hover:-translate-y-1">
                <div className={`mb-4 flex size-12 items-center justify-center rounded-lg ${f.bg} ${f.color}`}>
                  <f.Icon size={24} aria-hidden="true" />
                </div>
                <h3 className="mb-2 text-xl font-bold">{f.title}</h3>
                <p className="mb-4 text-fg-muted">{f.desc}</p>
                <ul className="mb-4 space-y-2">
                  {f.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm text-fg-muted">
                      <Check size={16} className={`mt-0.5 shrink-0 ${f.color}`} aria-hidden="true" /> <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <Link href={f.href} className={`inline-flex items-center gap-1 font-medium ${f.color}`}>
                  {f.link} <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Todas las guías del pilar */}
      <div className="bg-surface">
        <PillarArticles pillar="destinos" heading="Guías de destinos" />
      </div>

      {/* Franja final: siguientes pasos */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="rounded-lg bg-muted p-8 md:p-12">
            <div className="mb-8 text-center">
              <h2 className="text-balance text-3xl font-bold">¿Ya sabes dónde vas a dormir?</h2>
              <p className="mx-auto mt-4 max-w-2xl text-pretty text-fg-muted">
                El siguiente paso es la ruta: elige un itinerario según los días que tengas o repasa
                cómo organizar tu primer viaje por libre.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {NEXT_STEPS.map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  className="group rounded-lg border border-border bg-surface p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
                >
                  <h3 className="font-bold transition-colors group-hover:text-primary">{s.title}</h3>
                  <p className="mt-2 text-sm text-fg-muted">{s.desc}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                    Ver guía <ArrowRight size={16} aria-hidden="true" />
                  </span>
                </Link>
              ))}
            </div>
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
