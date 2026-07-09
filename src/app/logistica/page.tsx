import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  CalendarDays,
  Calculator,
  Coins,
  FileCheck,
  Plane,
  TrainFront,
  Wifi,
  type LucideIcon,
} from "lucide-react";
import { PillarArticles, pillarHasContent } from "@/components/PillarIndex";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Viajes prácticos: logística para tu viaje a Japón",
  description:
    "Transporte, JR Pass, eSIM, seguros, reservas y trámites: todo lo práctico y actualizado para planificar tu viaje a Japón en 2026.",
  alternates: { canonical: "/logistica" },
  ...(pillarHasContent("logistica") ? {} : { robots: { index: false, follow: true } }),
};

type Tema = {
  Icon: LucideIcon;
  color: string;
  bg: string;
  title: string;
  desc: string;
  links: { href: string; label: string }[];
};

const TEMAS: Tema[] = [
  {
    Icon: FileCheck,
    color: "text-primary",
    bg: "bg-red-100",
    title: "Antes de ir",
    desc: "Los trámites y reservas que conviene dejar atados antes de subirte al avión.",
    links: [
      { href: "/logistica/visado-japon-2026", label: "Visado y requisitos de entrada" },
      { href: "/logistica/seguro-viaje-japon", label: "Seguro de viaje: qué cubrir" },
      { href: "/logistica/reservas-japon-2026", label: "Qué reservar y con cuánta antelación" },
    ],
  },
  {
    Icon: Coins,
    color: "text-green-600",
    bg: "bg-green-100",
    title: "Dinero",
    desc: "Cómo pagar, cuánto presupuestar y cómo sacar el máximo partido a tus euros.",
    links: [
      { href: "/logistica/como-pagar-en-japon", label: "Cómo pagar en Japón" },
      { href: "/logistica/cuanto-cuesta-viajar-japon", label: "Cuánto cuesta viajar a Japón" },
      { href: "/cambio-yen-euro", label: "Cambio yen–euro en vivo" },
    ],
  },
  {
    Icon: TrainFront,
    color: "text-secondary",
    bg: "bg-blue-100",
    title: "Transporte",
    desc: "Del Shinkansen al metro de Tokio: muévete por Japón sin perderte ni pagar de más.",
    links: [
      { href: "/logistica/jr-pass-2026", label: "JR Pass: la guía completa" },
      { href: "/logistica/como-comprar-jr-pass", label: "Cómo comprar el JR Pass" },
      { href: "/logistica/suica-iphone", label: "Suica en el iPhone" },
    ],
  },
  {
    Icon: Wifi,
    color: "text-purple-600",
    bg: "bg-purple-100",
    title: "Conectividad",
    desc: "Llega con internet funcionando: mapas, traductor y reservas desde el primer minuto.",
    links: [{ href: "/logistica/esim-japon", label: "eSIM para Japón: comparativa" }],
  },
  {
    Icon: CalendarDays,
    color: "text-amber-600",
    bg: "bg-amber-100",
    title: "Cuándo viajar",
    desc: "Sakura, momiji, festivales o nieve: cada temporada cambia el viaje por completo.",
    links: [{ href: "/logistica/mejor-epoca-viajar-japon", label: "Mejor época para viajar a Japón" }],
  },
  {
    Icon: Plane,
    color: "text-teal-600",
    bg: "bg-teal-100",
    title: "Desde Latinoamérica",
    desc: "Si vuelas desde México u otro país de Latinoamérica, tu logística tiene sus propias claves.",
    links: [
      { href: "/logistica/japon-desde-mexico-y-latinoamerica", label: "Japón desde México y Latinoamérica" },
    ],
  },
];

export default function Page() {
  return (
    <div>
      {/* Hero */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
            <div>
              <Breadcrumbs items={[{ name: "Inicio", href: "/" }, { name: "Consejos", href: "/logistica" }]} className="mb-4" />
              <p className="kicker text-primary">Consejos</p>
              <h1 className="mt-3 text-balance text-4xl font-bold leading-tight sm:text-5xl">
                La logística de tu viaje a Japón, resuelta
              </h1>
              <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-fg-muted">
                Esta es la parte que cambia cada año y que casi nadie actualiza: visados, JR Pass,
                reservas, eSIM, seguros y formas de pago. Aquí lo tienes ordenado por temas, con
                guías revisadas para 2026 y enlaces a las herramientas, para que resuelvas cada duda
                en minutos y vuelvas a lo importante: disfrutar del viaje.
              </p>
            </div>
            <Link
              href="/logistica/japon-por-libre-primer-viaje"
              className="group relative block h-72 overflow-hidden rounded-lg shadow-md sm:h-80"
            >
              <Image
                src="/images/tokio.jpg"
                alt="Cruce de Shibuya en Tokio al atardecer, lleno de gente y carteles luminosos"
                fill
                sizes="(max-width:1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                <span className="inline-block rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary-strong">
                  Empieza aquí
                </span>
                <h2 className="mt-3 text-2xl font-bold">Japón por libre: tu primer viaje</h2>
                <p className="mt-2 text-sm text-gray-200">
                  La guía paraguas que ordena todo lo demás: qué decidir, en qué orden y qué guía
                  leer en cada paso.
                </p>
                <span className="mt-3 inline-flex items-center gap-1 font-medium">
                  Leer la guía <ArrowRight size={16} aria-hidden="true" />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Por temas */}
      <section className="bg-surface py-16">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHead
            title="Por temas"
            sub="Seis frentes que conviene cerrar antes de volar. Entra al que te toque hoy: cada guía va al grano y está al día."
          />
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {TEMAS.map((t) => (
              <div key={t.title} className="rounded-lg bg-surface p-6 shadow-md transition-all hover:-translate-y-1">
                <div className={`mb-4 flex size-12 items-center justify-center rounded-lg ${t.bg} ${t.color}`}>
                  <t.Icon size={24} aria-hidden="true" />
                </div>
                <h3 className="mb-2 text-xl font-bold">{t.title}</h3>
                <p className="mb-4 text-fg-muted">{t.desc}</p>
                <ul className="space-y-2">
                  {t.links.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className={`inline-flex items-start gap-2 text-sm font-medium ${t.color} underline-offset-2 hover:underline`}
                      >
                        <ArrowRight size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA calculadora */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 items-center gap-8 rounded-lg bg-muted p-8 md:grid-cols-[auto_1fr_auto] md:p-12">
            <div className="flex size-14 items-center justify-center rounded-lg bg-red-100 text-primary">
              <Calculator size={28} aria-hidden="true" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">¿Te compensa el JR Pass?</h2>
              <p className="mt-2 max-w-2xl text-pretty text-fg-muted">
                Depende de tu ruta, y la respuesta no es la misma para todos. Mete tus trayectos en
                la calculadora y compara el precio del pase con los billetes sueltos, en euros.
              </p>
            </div>
            <Link
              href="/herramientas/jr-pass-calculadora"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 font-semibold text-white shadow-md transition-colors hover:bg-primary-strong"
            >
              Abrir la calculadora <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Todas las guías */}
      <div className="bg-surface">
        <PillarArticles pillar="logistica" heading="Todas las guías prácticas" />
      </div>
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
