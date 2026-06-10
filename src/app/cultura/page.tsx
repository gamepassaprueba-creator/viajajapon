import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Check } from "lucide-react";
import { PillarArticles, pillarHasContent } from "@/components/PillarIndex";

export const metadata: Metadata = {
  title: "Cultura y costumbres de Japón",
  description:
    "Etiqueta, festivales, ryokan, onsen y alquiler de kimono: lo que necesitas saber para disfrutar la cultura japonesa con respeto.",
  alternates: { canonical: "/cultura" },
  ...(pillarHasContent("cultura") ? {} : { robots: { index: false, follow: true } }),
};

type Tema = {
  img: string;
  alt: string;
  title: string;
  desc: string;
  bullets: string[];
  href: string | null;
  cta?: string;
  badge?: string;
};

const TEMAS: Tema[] = [
  {
    img: "/images/tea.jpg",
    alt: "Ceremonia del té japonesa con utensilios tradicionales",
    title: "Etiqueta y costumbres",
    desc: "Las normas no escritas que todo el mundo sigue en Japón. Con dominar cuatro gestos básicos vas sobrado: nadie espera que seas perfecto, solo que lo intentes.",
    bullets: ["Descalzarse en interiores", "Colas ordenadas en andenes y tiendas", "Silencio en el tren"],
    href: "/cultura/etiqueta-y-costumbres-japon",
    cta: "Guía de etiqueta",
  },
  {
    img: "/images/bamboo.jpg",
    alt: "Bosque de bambú de Arashiyama en Kioto",
    title: "Onsen y baños",
    desc: "Bañarte en un onsen impone la primera vez, pero el ritual es más sencillo de lo que parece. Te contamos cómo hacerlo bien desde el primer minuto.",
    bullets: ["Protocolo paso a paso", "Qué pasa si llevas tatuajes", "Dónde probarlo por primera vez"],
    href: "/cultura/onsen-guia-practica",
    cta: "Guía práctica de onsen",
  },
  {
    img: "/images/festival.jpg",
    alt: "Festival japonés (matsuri) con farolillos y ambiente tradicional",
    title: "Festivales (matsuri)",
    desc: "Si tu viaje coincide con un matsuri, cámbialo todo para verlo: calles tomadas, carrozas, yukata y puestos de comida. Es el Japón más vivo.",
    bullets: ["Gion Matsuri (Kioto) — julio", "Tanabata — julio", "Obon — agosto"],
    href: "/blog/tanabata-2026-festivales",
    cta: "Tanabata 2026",
  },
  {
    img: "/images/kimono.jpg",
    alt: "Mujer con kimono tradicional japonés",
    title: "Kimono y tradición",
    desc: "Pasear con kimono por los barrios históricos es una de las experiencias más fotogénicas del viaje. Estamos preparando la guía completa.",
    bullets: ["Por horas o día completo", "Incluye peinado y accesorios", "Sesión fotográfica opcional"],
    href: null,
    badge: "Guía en preparación",
  },
];

const GESTOS: { title: string; desc: string }[] = [
  {
    title: "Quítate los zapatos donde toque",
    desc: "En casas, ryokan, templos y algunos restaurantes. Si ves un escalón en la entrada y zapatillas alineadas, ya sabes lo que hay que hacer.",
  },
  {
    title: "No comas andando por la calle",
    desc: "Cómprate el dulce o el takoyaki y disfrútalo parado junto al puesto. Comer caminando se considera de mala educación.",
  },
  {
    title: "Silencio en el tren",
    desc: "El móvil en modo silencio y nada de llamadas. Los vagones japoneses son zonas de calma y se agradece muchísimo.",
  },
  {
    title: "Llévate tu basura",
    desc: "Apenas hay papeleras públicas: lleva una bolsita y tira todo al volver al hotel, como hacen los propios japoneses.",
  },
  {
    title: "No dejes propina",
    desc: "En Japón no se deja propina; puede resultar incluso incómodo. El buen servicio ya va incluido, sin extras.",
  },
];

const SIGUE: { img: string; alt: string; kicker: string; title: string; desc: string; href: string }[] = [
  {
    img: "/images/sushi.jpg",
    alt: "Piezas de sushi japonés recién preparadas",
    kicker: "Gastronomía",
    title: "Qué comer en Japón",
    desc: "Los platos que no te puedes perder y cómo pedirlos sin miedo.",
    href: "/gastronomia/que-comer-en-japon",
  },
  {
    img: "/images/tokio.jpg",
    alt: "Calles de Tokio con carteles luminosos",
    kicker: "Logística",
    title: "Japón por libre: tu primer viaje",
    desc: "Todo lo que necesitas para organizarlo tú mismo, paso a paso.",
    href: "/logistica/japon-por-libre-primer-viaje",
  },
];

export default function Page() {
  return (
    <div>
      {/* Hero */}
      <section className="relative isolate flex min-h-[24rem] items-center overflow-hidden sm:min-h-[28rem]">
        <Image
          src="/images/festival.jpg"
          alt="Festival tradicional japonés con farolillos encendidos"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-white/10" />
        <div className="relative mx-auto w-full max-w-7xl px-4 py-16">
          <div className="max-w-2xl">
            <span className="inline-block rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary shadow-sm">
              Cultura
            </span>
            <h1 className="mt-6 text-balance text-4xl font-bold leading-tight text-gray-900 sm:text-5xl">
              Cultura y costumbres de Japón para viajeros
            </h1>
            <p className="mt-6 text-pretty text-lg text-fg-muted">
              Lo que necesitas saber para disfrutar Japón sin meter la pata: etiqueta, onsen, festivales y
              tradición. Sin sermones ni listas interminables de prohibiciones — solo lo que de verdad
              importa cuando estás allí.
            </p>
          </div>
        </div>
      </section>

      {/* Temas */}
      <section className="bg-surface py-16">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHead
            title="Los grandes temas"
            sub="Cuatro puertas de entrada a la cultura japonesa, pensadas para que las vivas durante tu viaje."
          />
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {TEMAS.map((t) => (
              <div
                key={t.title}
                className={`overflow-hidden rounded-lg border border-border bg-surface shadow-md ${t.href ? "" : "opacity-70"}`}
              >
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="flex flex-col justify-center p-6">
                    <h3 className="mb-3 text-xl font-bold">{t.title}</h3>
                    <p className="mb-4 text-fg-muted">{t.desc}</p>
                    <ul className="space-y-2">
                      {t.bullets.map((b) => (
                        <li key={b} className="flex items-center gap-2 text-sm text-fg-muted">
                          <Check size={16} className="shrink-0 text-primary" aria-hidden="true" /> {b}
                        </li>
                      ))}
                    </ul>
                    {t.href ? (
                      <Link href={t.href} className="mt-4 inline-flex items-center gap-1 font-medium text-primary">
                        {t.cta} <ArrowRight size={16} aria-hidden="true" />
                      </Link>
                    ) : (
                      <span className="mt-4 inline-flex w-fit rounded-full bg-muted px-3 py-1 text-xs font-semibold text-fg-muted">
                        {t.badge}
                      </span>
                    )}
                  </div>
                  <div className="relative h-56 md:h-auto">
                    <Image
                      src={t.img}
                      alt={t.alt}
                      fill
                      sizes="(max-width:768px) 100vw, 25vw"
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5 gestos */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHead
            title="5 gestos que te hacen quedar bien"
            sub="No hace falta memorizar un manual: con estos cinco detalles los japoneses notarán que vas con respeto."
          />
          <ul className="mx-auto max-w-3xl space-y-6">
            {GESTOS.map((g) => (
              <li key={g.title} className="flex items-start gap-4 rounded-lg bg-surface p-5 shadow-md">
                <div className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600">
                  <Check size={20} aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-bold">{g.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-fg-muted">{g.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Todas las guías */}
      <div className="bg-surface py-4">
        <PillarArticles pillar="cultura" heading="Guías de cultura" />
      </div>

      {/* Sigue planificando */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHead
            title="Sigue planificando tu viaje"
            sub="La cultura se disfruta más con el estómago lleno y la logística resuelta."
          />
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            {SIGUE.map((s) => (
              <Link key={s.href} href={s.href} className="group relative block h-64 overflow-hidden rounded-lg shadow-md">
                <Image
                  src={s.img}
                  alt={s.alt}
                  fill
                  sizes="(max-width:640px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-200">{s.kicker}</p>
                  <h3 className="mt-1 text-2xl font-bold">{s.title}</h3>
                  <p className="mt-1 text-sm text-gray-200">{s.desc}</p>
                  <span className="mt-3 inline-flex items-center gap-1 font-medium">
                    Leer la guía <ArrowRight size={16} aria-hidden="true" />
                  </span>
                </div>
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
