import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  Check,
  CreditCard,
  HandPlatter,
  MapPin,
  Store,
  UtensilsCrossed,
  Wallet,
} from "lucide-react";
import { PillarArticles, pillarHasContent } from "@/components/PillarIndex";
import ramenHero from "../../../public/images/ramen.jpg";

export const metadata: Metadata = {
  title: "Gastronomía y vida diaria en Japón",
  description:
    "Qué comer en Japón, dónde y a qué precio: platos imprescindibles, konbini y opciones para celíacos, veganos y halal. Con fotos reales.",
  alternates: { canonical: "/gastronomia" },
  ...(pillarHasContent("gastronomia") ? {} : { robots: { index: false, follow: true } }),
};

type Dish = {
  img: string;
  title: string;
  desc: string;
  lugar: string;
};

const DISHES: Dish[] = [
  {
    img: "/images/sushi.jpg",
    title: "Sushi",
    desc: "El clásico, en su país de origen: arroz avinagrado y pescado fresquísimo, del nigiri al maki. Pruébalo en una barra de sushi o en un kaiten (cinta giratoria), donde eliges los platos al vuelo.",
    lugar: "Barras de sushi y kaiten, en todo Japón",
  },
  {
    img: "/images/ramen.jpg",
    title: "Ramen",
    desc: "Sopa de fideos con caldo que cada región interpreta a su manera: shoyu, miso, tonkotsu... Se come en locales pequeños y rápidos, muchas veces pidiendo en una máquina de tickets en la entrada.",
    lugar: "Locales de ramen, por todo el país",
  },
  {
    img: "/images/yatai.jpg",
    title: "Comida callejera",
    desc: "Takoyaki, okonomiyaki, yakitori... Los puestos (yatai) y los mercados son la forma más divertida de picar de todo mientras paseas, sobre todo al caer la tarde.",
    lugar: "Puestos yatai y mercados, como Dotonbori en Osaka",
  },
];

type Feature = {
  Icon: LucideIcon;
  color: string;
  bg: string;
  title: string;
  desc: string;
  bullets: string[];
  href: string;
  link: string;
};

const FEATURES: Feature[] = [
  {
    Icon: UtensilsCrossed,
    color: "text-primary",
    bg: "bg-red-100",
    title: "Pedir sin saber japonés",
    desc: "Comer en Japón sin idioma es mucho más fácil de lo que parece: el sistema está pensado para que no haga falta hablar.",
    bullets: [
      "Máquinas de tickets: pagas, sacas el vale y lo entregas",
      "Réplicas de plástico en el escaparate: señala y listo",
      "Muchas cartas llevan fotos de cada plato",
    ],
    href: "/gastronomia/que-comer-en-japon",
    link: "Qué pedir en cada sitio",
  },
  {
    Icon: Store,
    color: "text-secondary",
    bg: "bg-blue-100",
    title: "Konbini y depachika",
    desc: "Las tiendas de conveniencia y las plantas de alimentación de los grandes almacenes son una despensa de calidad sorprendente.",
    bullets: [
      "Onigiri, bento y sándwiches listos para llevar",
      "Te calientan la comida allí mismo",
      "Depachika: la planta gourmet de los grandes almacenes",
    ],
    href: "/gastronomia/comer-barato-konbini-japon",
    link: "Guía del konbini",
  },
  {
    Icon: HandPlatter,
    color: "text-green-600",
    bg: "bg-green-100",
    title: "Etiqueta en la mesa",
    desc: "Unas pocas costumbres básicas bastan para comer con respeto y sentirte cómodo en cualquier restaurante.",
    bullets: [
      "No claves los palillos en el arroz",
      "Sorber el ramen no es de mala educación: es lo normal",
      "Evita comer mientras caminas por la calle",
    ],
    href: "/cultura/etiqueta-y-costumbres-japon",
    link: "Etiqueta y costumbres",
  },
];

type FinalLink = {
  Icon: LucideIcon;
  title: string;
  desc: string;
  href: string;
  link: string;
};

const FINAL_LINKS: FinalLink[] = [
  {
    Icon: Wallet,
    title: "¿Cuánto cuesta viajar a Japón?",
    desc: "La comida es solo una parte del presupuesto. Calcula cuánto te costará el viaje completo, partida a partida.",
    href: "/logistica/cuanto-cuesta-viajar-japon",
    link: "Ver la guía de presupuesto",
  },
  {
    Icon: CreditCard,
    title: "Cómo pagar en Japón",
    desc: "Efectivo, tarjeta o tarjetas IC: qué te van a aceptar en cada sitio y cómo evitar comisiones al pagar tus comidas.",
    href: "/logistica/como-pagar-en-japon",
    link: "Ver cómo pagar",
  },
];

export default function Page() {
  return (
    <div>
      {/* Hero */}
      <section className="relative isolate flex min-h-[24rem] items-center overflow-hidden sm:min-h-[28rem]">
        <Image
          src={ramenHero}
          alt="Cuenco de ramen japonés con fideos, huevo y chashu"
          fill
          priority
          placeholder="blur"
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-white/10" />
        <div className="relative mx-auto w-full max-w-7xl px-4 py-16">
          <div className="max-w-2xl">
            <p className="kicker text-primary">Gastronomía</p>
            <h1 className="mt-3 text-balance text-4xl font-bold leading-tight text-gray-900 sm:text-5xl">
              Comer en Japón: qué pedir y cuánto cuesta
            </h1>
            <p className="mt-6 text-pretty text-lg text-fg-muted">
              Comer increíble en Japón no es caro si sabes dónde: del sushi de barra al ramen de
              barrio, pasando por el konbini de la esquina. Aquí tienes qué probar, dónde pedirlo y
              cómo hacerlo sin hablar una palabra de japonés.
            </p>
          </div>
        </div>
      </section>

      {/* Los imprescindibles */}
      <section className="bg-surface py-16">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHead
            title="Los imprescindibles"
            sub="Tres experiencias que tienes que probar sí o sí en tu viaje, estés en la ciudad que estés."
          />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {DISHES.map((p) => (
              <Link
                key={p.title}
                href="/gastronomia/que-comer-en-japon"
                className="group overflow-hidden rounded-lg border border-border bg-surface shadow-md transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative h-48">
                  <Image
                    src={p.img}
                    alt={p.title}
                    fill
                    sizes="(max-width:1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <h3 className="mb-2 text-xl font-bold">{p.title}</h3>
                  <p className="mb-4 text-sm text-fg-muted">{p.desc}</p>
                  <p className="flex items-start gap-1 text-sm text-fg-muted">
                    <MapPin size={14} className="mt-0.5 shrink-0" aria-hidden="true" /> {p.lugar}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 font-medium text-primary">
                    Qué pedir y dónde <ArrowRight size={16} aria-hidden="true" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Comer bien gastando poco */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 items-center gap-8 rounded-lg bg-muted p-8 md:grid-cols-2 md:p-12">
            <div>
              <h2 className="mb-4 text-balance text-3xl font-bold">Comer bien gastando poco</h2>
              <p className="mb-4 text-pretty text-fg-muted">
                El gran truco del viajero en Japón es el konbini: en cualquier tienda de
                conveniencia encuentras onigiri, bento y platos preparados de una calidad que
                sorprende, por pocos euros. Perfecto para desayunos, picnics y esos días de
                caminar sin parar.
              </p>
              <p className="mb-6 text-pretty text-fg-muted">
                El otro secreto son los menús del mediodía: muchos restaurantes ofrecen al
                mediodía el mismo plato que sirven por la noche, a un precio mucho más amable. Si
                quieres probar un sitio bueno, ve a comer, no a cenar.
              </p>
              <ul className="mb-6 space-y-2">
                {[
                  "Konbini: comida lista para llevar a cualquier hora",
                  "Menús del mediodía (teishoku): completos y asequibles",
                  "Cadenas de donburi y udon: rápidas, ricas y baratas",
                ].map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm text-fg-muted">
                    <Check size={16} className="mt-0.5 shrink-0 text-primary" aria-hidden="true" />{" "}
                    {b}
                  </li>
                ))}
              </ul>
              <Link
                href="/gastronomia/comer-barato-konbini-japon"
                className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 font-medium text-white transition-colors hover:bg-primary-strong"
              >
                Cómo comer barato en Japón <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </div>
            <div className="relative h-72 overflow-hidden rounded-lg md:h-96">
              <Image
                src="/images/tea.jpg"
                alt="Té y dulces tradicionales servidos a la japonesa"
                fill
                sizes="(max-width:768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Cómo funciona comer en Japón */}
      <section className="bg-surface py-16">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHead
            title="Comer en Japón, sin complicaciones"
            sub="Lo que necesitas saber antes de sentarte a la mesa: pedir, comprar y comportarte como uno más."
          />
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((c) => (
              <div
                key={c.title}
                className="rounded-lg border border-border bg-surface p-6 shadow-md transition-all hover:-translate-y-1"
              >
                <div className={`mb-4 flex size-12 items-center justify-center rounded-lg ${c.bg} ${c.color}`}>
                  <c.Icon size={24} aria-hidden="true" />
                </div>
                <h3 className="mb-2 text-xl font-bold">{c.title}</h3>
                <p className="mb-4 text-fg-muted">{c.desc}</p>
                <ul className="mb-4 space-y-2">
                  {c.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm text-fg-muted">
                      <Check size={16} className={`mt-0.5 shrink-0 ${c.color}`} aria-hidden="true" />{" "}
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <Link href={c.href} className={`inline-flex items-center gap-1 font-medium ${c.color}`}>
                  {c.link} <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Todas las guías del pilar */}
      <PillarArticles pillar="gastronomia" heading="Guías para comer en Japón" />

      {/* Franja final: presupuesto y pagos */}
      <section className="bg-surface py-16">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHead
            title="Y para cuadrar las cuentas del viaje"
            sub="Saber qué vas a comer está genial; saber cómo pagarlo y cuánto pesa en tu presupuesto, todavía más."
          />
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {FINAL_LINKS.map((c) => (
              <Link
                key={c.href}
                href={c.href}
                className="group rounded-lg border border-border bg-surface p-6 shadow-md transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="mb-4 flex size-12 items-center justify-center rounded-lg bg-amber-100 text-amber-600">
                  <c.Icon size={24} aria-hidden="true" />
                </div>
                <h3 className="mb-2 text-xl font-bold transition-colors group-hover:text-primary">
                  {c.title}
                </h3>
                <p className="mb-4 text-fg-muted">{c.desc}</p>
                <span className="inline-flex items-center gap-1 font-medium text-primary">
                  {c.link} <ArrowRight size={16} aria-hidden="true" />
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
