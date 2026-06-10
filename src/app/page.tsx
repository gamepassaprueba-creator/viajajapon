import Image from "next/image";
import Link from "next/link";
import heroFuji from "../../public/images/hero-fuji.jpg";
import {
  Search, MapPin, ArrowRight, Check, Tag, Train, Wifi, Coins, Plug, Luggage, CalendarDays,
  Flower2, Utensils, Sparkles, Gamepad2, Clapperboard, Mountain, Trees,
} from "lucide-react";
import type { Metadata } from "next";
import { getYenRate } from "@/lib/fx";
import { getArticles } from "@/lib/content";
import { NewsletterForm } from "@/components/NewsletterForm";

export const revalidate = 21600;

export const metadata: Metadata = {
  title: { absolute: "ViajaJapón — Guía para viajar a Japón en 2026 (JR Pass, presupuesto y consejos)" },
  description:
    "Planifica tu viaje a Japón en 2026: calculadora del JR Pass, presupuesto en euros, reservas, transporte y gastronomía. Datos actualizados y experiencia real.",
  alternates: { canonical: "/" },
};

const ITIN = [
  { img: "/images/tokio.jpg", badge: "7 días", title: "Esencia de Japón", ruta: "Tokio, Kioto, Nara" },
  { img: "/images/kioto.jpg", badge: "10 días", title: "Ruta clásica", ruta: "Tokio, Hakone, Kioto, Osaka" },
  { img: "/images/osaka.jpg", badge: "15 días", title: "Japón profundo", ruta: "+ Hiroshima, Kanazawa" },
  { img: "/images/hero-fuji.jpg", badge: "1 mes", title: "Japón completo", ruta: "De Hokkaido a Okinawa" },
];

const DEST = [
  { img: "/images/tokio.jpg", title: "Tokio", desc: "Tradición y vanguardia en una experiencia única.", tags: ["Shibuya", "Shinjuku", "Akihabara", "Asakusa"] },
  { img: "/images/kioto.jpg", title: "Kioto", desc: "El corazón cultural, con miles de templos y santuarios.", tags: ["Fushimi Inari", "Kinkaku-ji", "Arashiyama", "Gion"] },
  { img: "/images/osaka.jpg", title: "Osaka", desc: "La ciudad del buen comer y el ambiente desenfadado.", tags: ["Dotonbori", "Kuromon", "Castillo", "Universal"] },
];

const CULTURA = [
  { img: "/images/festival.jpg", title: "Festivales (Matsuri)", desc: "Celebraciones llenas de color y tradición durante todo el año.", bullets: ["Gion Matsuri (Kioto) — julio", "Tanabata — julio", "Obon — agosto"] },
  { img: "/images/tea.jpg", title: "Ceremonia del té y etiqueta", desc: "Costumbres básicas para disfrutar Japón con respeto.", bullets: ["Saludos y reverencias", "Descalzarse en interiores", "Etiqueta en la mesa"] },
  { img: "/images/kimono.jpg", title: "Alquiler de kimono", desc: "Pasea por las calles históricas con un kimono tradicional.", bullets: ["Por horas o día completo", "Incluye peinado y accesorios", "Sesión fotográfica opcional"] },
  { img: "/images/bamboo.jpg", title: "Ryokan y onsen", desc: "Alójate a la japonesa: tatami, futón y baños termales.", bullets: ["Tatami y futón", "Baños termales (onsen)", "Cena kaiseki"] },
];

const DISHES = [
  { img: "/images/sushi.jpg", title: "Sushi", desc: "El clásico, en su país de origen.", lugar: "Tsukiji, Tokio", precio: "desde 1.000¥" },
  { img: "/images/ramen.jpg", title: "Ramen", desc: "Sopa de fideos; cada región, su versión.", lugar: "Por todo Japón", precio: "800–1.500¥" },
  { img: "/images/yatai.jpg", title: "Comida callejera", desc: "Takoyaki, okonomiyaki y más en los puestos (yatai).", lugar: "Dotonbori, Osaka", precio: "500–1.200¥" },
];

const EXPERIENCIAS = [
  { Icon: Utensils, title: "Clases de cocina", desc: "Aprende sushi o ramen con chefs locales." },
  { Icon: Sparkles, title: "Ceremonia del té", desc: "La tradición milenaria del matcha." },
  { Icon: MapPin, title: "Tours gastronómicos", desc: "Mercados y barrios de restaurantes." },
];

const ENTRET = [
  { img: "/images/akihabara.jpg", title: "Japón friki (otaku)", desc: "Manga, anime, videojuegos y cultura pop.", items: [{ Icon: Gamepad2, name: "Akihabara", note: "Barrio electrónico y otaku." }, { Icon: Clapperboard, name: "Museo Ghibli", note: "Las obras del estudio." }] },
  { img: "/images/tokio.jpg", title: "Parques temáticos", desc: "Algunos de los mejores del mundo.", items: [{ Icon: Sparkles, name: "Tokyo Disney / DisneySea", note: "DisneySea es exclusivo de Japón." }, { Icon: Clapperboard, name: "Universal Studios", note: "Super Nintendo World." }] },
  { img: "/images/bamboo.jpg", title: "Naturaleza y paisajes", desc: "Más allá de las ciudades.", items: [{ Icon: Mountain, name: "Monte Fuji", note: "El icónico volcán." }, { Icon: Trees, name: "Bambú de Arashiyama", note: "Un paseo mágico en Kioto." }] },
];

export default async function Home() {
  const { rate } = await getYenRate();
  const month = new Date().getMonth();
  const season =
    month >= 2 && month <= 4
      ? "Primavera · temporada de sakura"
      : month >= 5 && month <= 7
        ? "Verano · festivales (matsuri)"
        : month >= 8 && month <= 10
          ? "Otoño · momiji (hojas rojas)"
          : "Invierno · onsen y nieve";

  const news = getArticles("blog");
  const featured = news[0];
  const rest = news.slice(1, 5);

  const PRACT = [
    { Icon: Train, color: "text-primary", bg: "bg-red-100", title: "JR Pass", desc: "Tren ilimitado, incluido el Shinkansen. Calcula si te sale a cuenta.", bullets: ["Para 7, 14 o 21 días", "Cómpralo antes de llegar", `Desde ¥50.000 (~${Math.round(50000 / rate)}€)`], href: "/herramientas/jr-pass-calculadora", link: "Calcular en la calculadora" },
    { Icon: Wifi, color: "text-secondary", bg: "bg-blue-100", title: "Internet en Japón", desc: "Conéctate desde que aterrizas.", bullets: ["eSIM (Holafly, Airalo)", "Pocket WiFi", "WiFi gratis en muchos sitios"], href: "/logistica/esim-japon", link: "Comparativa de eSIM" },
    { Icon: Coins, color: "text-green-600", bg: "bg-green-100", title: "Cambio de divisas", desc: "Euros a yenes y cómo pagar en Japón.", bullets: [`1€ ≈ ¥${rate} (en vivo)`, "Dónde cambiar", "Tarjetas y comisiones"], href: "/cambio-yen-euro", link: "Ver el cambio del yen" },
    { Icon: Plug, color: "text-purple-600", bg: "bg-purple-100", title: "Enchufes y electricidad", desc: "Carga tus dispositivos sin problemas.", bullets: ["Tipo A (dos clavijas planas)", "Voltaje 100V", "Adaptadores recomendados"], href: "/logistica", link: "Más información" },
    { Icon: Luggage, color: "text-amber-600", bg: "bg-amber-100", title: "Qué llevar en la maleta", desc: "Imprescindibles según la temporada.", bullets: ["Ropa por temporada", "Calzado cómodo", "Medicamentos y documentación"], href: "/logistica", link: "Lista completa" },
    { Icon: CalendarDays, color: "text-teal-600", bg: "bg-teal-100", title: "Mejor época para viajar", desc: "El mejor momento según tu plan.", bullets: ["Primavera: sakura (mar–abr)", "Otoño: momiji (nov)", "Temporadas altas y bajas"], href: "/logistica", link: "Guía por temporadas" },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="relative isolate flex min-h-[34rem] items-center overflow-hidden sm:min-h-[600px]">
        <Image src={heroFuji} alt="Monte Fuji con una pagoda y cerezos en flor" fill priority placeholder="blur" sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/70 to-white/10" />
        <div className="relative mx-auto w-full max-w-7xl px-4 py-16 sm:py-20">
          <div className="max-w-2xl">
            <span className="inline-block rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary-strong shadow-sm">
              {season}
            </span>
            <h1 className="mt-6 text-4xl font-bold leading-tight text-gray-900 sm:text-5xl">Planifica tu viaje a Japón en 2026</h1>
            <p className="mt-6 text-lg text-fg-muted">
              Todo lo que necesitas para planificar tu aventura: JR Pass, presupuesto, itinerarios, cultura y
              gastronomía — con datos reales y de este año.
            </p>
            <div className="mt-8">
              <Link href="/herramientas/jr-pass-calculadora" className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 font-semibold text-white shadow-md transition-colors hover:bg-primary-strong">
                Calcula si te compensa el JR Pass <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </div>
            <form action="/buscar" className="mt-4 flex max-w-xl items-center gap-2 rounded-lg bg-surface p-2 shadow-lg focus-within:ring-2 focus-within:ring-primary">
              <Search size={20} className="ml-2 text-gray-400" aria-hidden="true" />
              <label htmlFor="q" className="sr-only">Buscar en la guía</label>
              <input id="q" name="q" type="search" placeholder="¿Qué quieres descubrir sobre Japón?" className="flex-1 border-none bg-transparent px-2 py-2 text-fg outline-none" />
              <button type="submit" className="rounded-md bg-primary px-6 py-2 font-medium text-white transition-colors hover:bg-primary-strong">Buscar</button>
            </form>
            <div className="mt-8 flex flex-wrap gap-4">
              <HeroChip Icon={Coins} label="Yen hoy" value={`1€ = ¥${rate}`} />
              <HeroChip Icon={Flower2} label="Sakura" value="finales mar–abr" />
              <HeroChip Icon={Train} label="JR Pass" value="desde ¥50.000" />
            </div>
          </div>
        </div>
      </section>

      {/* Franja de confianza (E-E-A-T) */}
      <div className="border-b border-border bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-3 text-center text-sm text-fg-muted">
          ✓ Escrito por alguien que ha viajado a Japón · datos verificados y de 2026 ·{" "}
          <Link href="/sobre-nosotros" className="font-medium text-primary hover:underline">quiénes somos</Link>
        </div>
      </div>

      {/* Planifica */}
      <section id="planifica" className="bg-surface py-16">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHead title="Planifica tu aventura japonesa" sub="Itinerarios adaptados a la duración de tu viaje para aprovechar cada día." />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {ITIN.map((it) => (
              <Link key={it.badge} href="/itinerarios" className="group overflow-hidden rounded-lg border border-border bg-surface shadow-md transition-all hover:-translate-y-1 hover:shadow-xl">
                <div className="relative h-48">
                  <Image src={it.img} alt={it.title} fill sizes="(max-width:1024px) 50vw, 25vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="p-6">
                  <span className="inline-block rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-primary">{it.badge}</span>
                  <h3 className="mt-3 text-xl font-bold">{it.title}</h3>
                  <p className="mt-2 flex items-center gap-2 text-sm text-fg-muted"><MapPin size={16} aria-hidden="true" /> {it.ruta}</p>
                  <span className="mt-4 inline-flex items-center gap-1 font-medium text-primary">Ver itinerario <ArrowRight size={16} aria-hidden="true" /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Información práctica */}
      <section id="consejos" className="py-16">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHead title="Información práctica" sub="Todo lo que necesitas resolver antes de viajar, con datos de 2026." />
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {PRACT.map((c) => (
              <div key={c.title} className="rounded-lg bg-surface p-6 shadow-md transition-all hover:-translate-y-1">
                <div className={`mb-4 flex size-12 items-center justify-center rounded-lg ${c.bg} ${c.color}`}>
                  <c.Icon size={24} aria-hidden="true" />
                </div>
                <h3 className="mb-2 text-xl font-bold">{c.title}</h3>
                <p className="mb-4 text-fg-muted">{c.desc}</p>
                <ul className="mb-4 space-y-2">
                  {c.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm text-fg-muted"><Check size={16} className={`mt-0.5 shrink-0 ${c.color}`} aria-hidden="true" /> <span className="nums">{b}</span></li>
                  ))}
                </ul>
                <Link href={c.href} className={`inline-flex items-center gap-1 font-medium ${c.color}`}>{c.link} <ArrowRight size={16} aria-hidden="true" /></Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Últimas noticias */}
      {news.length > 0 && (
        <section className="bg-surface py-16">
          <div className="mx-auto max-w-7xl px-4">
            <div className="mb-8 flex items-baseline justify-between">
              <h2 className="text-3xl font-bold">Últimas noticias</h2>
              <Link href="/blog" className="text-sm text-primary underline-offset-2 hover:underline">Ver todo →</Link>
            </div>
            <div className="grid gap-8 lg:grid-cols-2">
              {featured && (
                <Link href={`/blog/${featured.slug}`} className="group flex flex-col rounded-xl border border-border bg-surface p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
                  <p className="kicker text-primary">{featured.kicker}</p>
                  <h3 className="mt-3 text-2xl font-bold leading-tight transition-colors group-hover:text-primary">{featured.title}</h3>
                  <p className="mt-3 flex-1 leading-relaxed text-fg-muted">{featured.excerpt}</p>
                  <p className="nums mt-4 text-xs text-fg-muted">
                    {new Intl.DateTimeFormat("es-ES", { day: "numeric", month: "short", year: "numeric" }).format(new Date(featured.dateModified))}
                    {featured.readingMinutes ? ` · ${featured.readingMinutes} min de lectura` : ""}
                  </p>
                </Link>
              )}
              <ul className="divide-y divide-border">
                {rest.map((p) => (
                  <li key={p.slug}>
                    <Link href={`/blog/${p.slug}`} className="group block py-4 first:pt-0">
                      <p className="kicker text-fg-muted">{p.kicker}</p>
                      <h3 className="mt-1 font-bold leading-snug transition-colors group-hover:text-primary">{p.title}</h3>
                      <p className="nums mt-1 text-xs text-fg-muted">
                        {new Intl.DateTimeFormat("es-ES", { day: "numeric", month: "short" }).format(new Date(p.dateModified))}
                        {p.readingMinutes ? ` · ${p.readingMinutes} min` : ""}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* Destinos */}
      <section id="destinos" className="bg-surface py-16">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHead title="Destinos imprescindibles" sub="Desde metrópolis bulliciosas hasta templos milenarios." />
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {DEST.map((d) => (
              <Link key={d.title} href="/destinos" className="group relative block h-96 overflow-hidden rounded-lg shadow-md">
                <Image src={d.img} alt={d.title} fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                  <h3 className="text-2xl font-bold">{d.title}</h3>
                  <p className="mt-2 text-sm text-gray-200">{d.desc}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {d.tags.map((t) => <span key={t} className="rounded-full bg-white/20 px-2 py-1 text-xs backdrop-blur-sm">{t}</span>)}
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/destinos" className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 font-medium text-white transition-colors hover:bg-primary-strong">Ver todos los destinos <ArrowRight size={18} aria-hidden="true" /></Link>
          </div>
        </div>
      </section>

      {/* Cultura */}
      <section id="cultura" className="py-16">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHead title="Cultura y costumbres" sub="Tradiciones para disfrutar al máximo tu experiencia." />
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {CULTURA.map((c) => (
              <div key={c.title} className="overflow-hidden rounded-lg bg-surface shadow-md">
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="flex flex-col justify-center p-6">
                    <h3 className="mb-3 text-xl font-bold">{c.title}</h3>
                    <p className="mb-4 text-fg-muted">{c.desc}</p>
                    <ul className="space-y-2">
                      {c.bullets.map((b) => (
                        <li key={b} className="flex items-center gap-2 text-sm text-fg-muted"><Check size={16} className="shrink-0 text-primary" aria-hidden="true" /> {b}</li>
                      ))}
                    </ul>
                    <Link href="/cultura" className="mt-4 inline-flex items-center gap-1 font-medium text-primary">Saber más <ArrowRight size={16} aria-hidden="true" /></Link>
                  </div>
                  <div className="relative h-56 md:h-auto">
                    <Image src={c.img} alt={c.title} fill sizes="(max-width:768px) 100vw, 25vw" className="object-cover" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gastronomía */}
      <section id="gastronomia" className="bg-surface py-16">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHead title="Gastronomía japonesa" sub="Un viaje a Japón es también un viaje culinario." />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {DISHES.map((p) => (
              <Link key={p.title} href="/gastronomia" className="group overflow-hidden rounded-lg border border-border bg-surface shadow-md transition-all hover:-translate-y-1 hover:shadow-xl">
                <div className="relative h-48">
                  <Image src={p.img} alt={p.title} fill sizes="(max-width:1024px) 50vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="p-5">
                  <h3 className="mb-2 text-xl font-bold">{p.title}</h3>
                  <p className="mb-4 text-sm text-fg-muted">{p.desc}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-fg-muted">
                    <span className="flex items-center gap-1"><MapPin size={14} aria-hidden="true" /> {p.lugar}</span>
                    <span className="nums flex items-center gap-1"><Tag size={14} aria-hidden="true" /> {p.precio}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-12 grid grid-cols-1 items-center gap-8 rounded-lg bg-muted p-8 md:grid-cols-2">
            <div>
              <h3 className="mb-4 text-2xl font-bold">Experiencias gastronómicas</h3>
              <p className="mb-6 text-fg-muted">No solo comer: vivir experiencias culinarias que solo Japón ofrece.</p>
              <div className="space-y-4">
                {EXPERIENCIAS.map((e) => (
                  <div key={e.title} className="flex items-start gap-3">
                    <div className="mt-1 flex size-10 items-center justify-center rounded-full bg-red-100 text-primary"><e.Icon size={18} aria-hidden="true" /></div>
                    <div>
                      <h4 className="font-bold">{e.title}</h4>
                      <p className="text-sm text-fg-muted">{e.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-72 overflow-hidden rounded-lg md:h-80">
              <Image src="/images/tea.jpg" alt="Experiencia gastronómica japonesa" fill sizes="(max-width:768px) 100vw, 50vw" className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Entretenimiento */}
      <section id="entretenimiento" className="py-16">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHead title="Japón para todos los gustos" sub="Del Japón más tradicional al más moderno y friki." />
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {ENTRET.map((e) => (
              <div key={e.title} className="overflow-hidden rounded-lg bg-surface shadow-md">
                <div className="relative h-56">
                  <Image src={e.img} alt={e.title} fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="mb-3 text-xl font-bold">{e.title}</h3>
                  <p className="mb-4 text-fg-muted">{e.desc}</p>
                  <div className="space-y-3">
                    {e.items.map((it) => (
                      <div key={it.name} className="flex items-start gap-2">
                        <it.Icon size={18} className="mt-0.5 shrink-0 text-primary" aria-hidden="true" />
                        <div>
                          <span className="font-medium">{it.name}</span>
                          <p className="text-sm text-fg-muted">{it.note}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-surface py-16">
        <div className="mx-auto max-w-4xl px-4">
          <div className="rounded-lg bg-muted p-8 shadow-md md:p-12">
            <div className="mb-8 text-center">
              <h2 className="mb-4 text-3xl font-bold">¿Planificando tu viaje a Japón?</h2>
              <p className="text-fg-muted">Suscríbete y recibe el checklist, consejos y novedades sobre Japón en tu correo.</p>
            </div>
            <NewsletterForm source="home" />
          </div>
        </div>
      </section>
    </div>
  );
}

function SectionHead({ title, sub }: { title: string; sub: string }) {
  return (
    <div className="mb-12 text-center">
      <h2 className="mb-4 text-3xl font-bold">{title}</h2>
      <p className="mx-auto max-w-2xl text-fg-muted">{sub}</p>
    </div>
  );
}

function HeroChip({ Icon, label, value }: { Icon: typeof Coins; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 rounded-lg bg-surface/80 p-3 shadow-sm backdrop-blur-sm">
      <Icon size={20} className="text-primary" aria-hidden="true" />
      <div>
        <p className="text-xs text-fg-muted">{label}</p>
        <p className="nums font-medium">{value}</p>
      </div>
    </div>
  );
}
