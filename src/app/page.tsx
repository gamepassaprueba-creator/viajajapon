import Image from "next/image";
import Link from "next/link";
import heroFuji from "../../public/images/hero-fuji.jpg";
import {
  Search, MapPin, ArrowRight, Check, Tag, Train, Wifi, Coins, Plug, Luggage, CalendarDays,
  Flower2, Utensils, Sparkles, Gamepad2, Clapperboard, Mountain, Trees, Route, Landmark,
} from "lucide-react";
import type { Metadata } from "next";
import { getYenRate } from "@/lib/fx";
import { getArticles } from "@/lib/content";
import { NewsletterForm } from "@/components/NewsletterForm";
import { SITE } from "@/lib/site";

export const revalidate = 21600;

export const metadata: Metadata = {
  title: { absolute: "ViajaJapón — Guía para viajar a Japón en 2026 (JR Pass, presupuesto y consejos)" },
  description:
    "Planifica tu viaje a Japón en 2026: calculadora del JR Pass, presupuesto en euros, reservas, transporte y gastronomía. Datos actualizados y experiencia real.",
  alternates: { canonical: "/" },
};

const ITIN = [
  { img: "/images/tokio.jpg", badge: "7 días", title: "Esencia de Japón", ruta: "Tokio, Kioto, Nara", href: "/itinerarios/itinerario-japon-7-dias" },
  { img: "/images/kioto.jpg", badge: "10 días", title: "Ruta clásica", ruta: "Tokio, Hakone, Kioto, Osaka", href: "/itinerarios/itinerario-japon-10-dias" },
  { img: "/images/osaka.jpg", badge: "15 días", title: "Japón profundo", ruta: "+ Hiroshima, Kanazawa", href: "/itinerarios/itinerario-japon-15-dias" },
  { img: "/images/hero-fuji.jpg", badge: "1 mes", title: "Japón completo", ruta: "Tokio, Kansai, Hiroshima y los Alpes", href: "/itinerarios/itinerario-japon-1-mes" },
];

// Accesos rápidos (patrón móvil del mockup "Guía de Viaje"): atajos a las secciones clave.
const ACCESOS = [
  { label: "Itinerarios", href: "/itinerarios", Icon: Route, bg: "bg-red-100", color: "text-primary" },
  { label: "Preparativos", href: "/logistica/preparativos-viaje-japon", Icon: Luggage, bg: "bg-blue-100", color: "text-secondary" },
  { label: "Destinos", href: "/destinos", Icon: MapPin, bg: "bg-green-100", color: "text-green-600" },
  { label: "Comida", href: "/gastronomia", Icon: Utensils, bg: "bg-amber-100", color: "text-amber-600" },
  { label: "Transporte", href: "/logistica/jr-pass-2026", Icon: Train, bg: "bg-purple-100", color: "text-purple-600" },
  { label: "Cultura", href: "/cultura", Icon: Landmark, bg: "bg-pink-100", color: "text-pink-600" },
];

const DEST = [
  { img: "/images/tokio.jpg", title: "Tokio", desc: "Tradición y vanguardia en una experiencia única.", tags: ["Shibuya", "Shinjuku", "Akihabara", "Asakusa"], href: "/destinos/que-ver-en-tokio" },
  { img: "/images/kioto.jpg", title: "Kioto", desc: "El corazón cultural, con miles de templos y santuarios.", tags: ["Fushimi Inari", "Kinkaku-ji", "Arashiyama", "Gion"], href: "/destinos/que-ver-en-kioto" },
  { img: "/images/osaka.jpg", title: "Osaka", desc: "La ciudad del buen comer y el ambiente desenfadado.", tags: ["Dotonbori", "Kuromon", "Castillo", "Universal"], href: "/destinos/que-ver-en-osaka" },
];

const CULTURA = [
  { img: "/images/festival.jpg", title: "Festivales (Matsuri)", desc: "Celebraciones llenas de color y tradición durante todo el año.", bullets: ["Gion Matsuri (Kioto) — julio", "Tanabata — julio", "Obon — agosto"], href: "/cultura" },
  { img: "/images/tea.jpg", title: "Ceremonia del té y etiqueta", desc: "Costumbres básicas para disfrutar Japón con respeto.", bullets: ["Saludos y reverencias", "Descalzarse en interiores", "Etiqueta en la mesa"], href: "/cultura/etiqueta-y-costumbres-japon" },
  { img: "/images/kimono.jpg", title: "Alquiler de kimono", desc: "Pasea por las calles históricas con un kimono tradicional.", bullets: ["Por horas o día completo", "Incluye peinado y accesorios", "Sesión fotográfica opcional"], href: "/cultura" },
  { img: "/images/bamboo.jpg", title: "Ryokan y onsen", desc: "Alójate a la japonesa: tatami, futón y baños termales.", bullets: ["Tatami y futón", "Baños termales (onsen)", "Cena kaiseki"], href: "/cultura/onsen-guia-practica" },
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
  { img: "/images/akihabara.jpg", title: "Japón friki (otaku)", desc: "Manga, anime, videojuegos y cultura pop.", href: "/cultura/japon-friki-guia-otaku", items: [{ Icon: Gamepad2, name: "Akihabara", note: "Barrio electrónico y otaku." }, { Icon: Clapperboard, name: "Museo Ghibli", note: "Las obras del estudio." }] },
  { img: "/images/tokio.jpg", title: "Parques temáticos", desc: "Algunos de los mejores del mundo.", href: "/destinos/parques-tematicos-japon", items: [{ Icon: Sparkles, name: "Tokyo Disney / DisneySea", note: "DisneySea es exclusivo de Japón." }, { Icon: Clapperboard, name: "Universal Studios", note: "Super Nintendo World." }] },
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
    { Icon: Luggage, color: "text-amber-600", bg: "bg-amber-100", title: "Qué llevar en la maleta", desc: "Imprescindibles según la temporada.", bullets: ["Checklist interactiva", "Ropa por temporada", "Qué no deja pasar la aduana"], href: "/logistica/que-llevar-maleta-japon", link: "Lista completa" },
    { Icon: CalendarDays, color: "text-teal-600", bg: "bg-teal-100", title: "Mejor época para viajar", desc: "El mejor momento según tu plan.", bullets: ["Primavera: sakura (mar–abr)", "Otoño: momiji (nov)", "Temporadas altas y bajas"], href: "/logistica/mejor-epoca-viajar-japon", link: "Guía por temporadas" },
  ];

  return (
    <div>
      {/* HERO — overlay negro 70%, tipografía display 900, layout brutal */}
      <section className="relative isolate overflow-hidden">
        <Image src={heroFuji} alt="Monte Fuji con una pagoda y cerezos en flor" fill priority placeholder="blur" sizes="100vw" className="object-cover object-center" />
        {/* Overlay negro oscuro — queremos foto pero sin que borre el texto */}
        <div className="absolute inset-0 bg-black/65" />
        {/* Línea de acento roja diagonal — rasgo manga */}
        <div className="absolute inset-y-0 left-0 w-1.5 bg-primary" />

        <div className="relative mx-auto w-full max-w-7xl px-6 py-20 sm:py-28 lg:py-32">
          {/* Kicker con forma de punta de flecha */}
          <span className="tag-manga mb-6 inline-block">{season}</span>

          {/* H1 brutal — peso 900, tamaño enorme, leading comprimido */}
          <h1 className="text-display max-w-4xl text-5xl text-white sm:text-7xl lg:text-8xl">
            <span className="block">Planifica tu</span>
            <span className="block text-primary">viaje a Japón</span>
            <span className="block">en 2026</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">
            JR Pass, presupuesto, itinerarios, cultura y gastronomía — con datos reales y de este año.
          </p>

          {/* CTAs en fila */}
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/herramientas/jr-pass-calculadora"
              className="panel-manga inline-flex items-center gap-2 bg-primary px-6 py-3 text-sm font-black uppercase tracking-wide text-white transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none"
            >
              Calculadora JR Pass <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <Link
              href="/itinerarios"
              className="panel-manga inline-flex items-center gap-2 bg-surface px-6 py-3 text-sm font-black uppercase tracking-wide text-fg transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none"
            >
              Ver itinerarios
            </Link>
          </div>

          {/* Buscador */}
          <form action="/buscar" className="mt-8 flex max-w-lg items-center gap-0 overflow-hidden border-2 border-white/80 bg-white/10 backdrop-blur-sm focus-within:border-primary focus-within:bg-white/15">
            <label htmlFor="q" className="sr-only">Buscar en la guía</label>
            <Search size={18} className="ml-4 shrink-0 text-white/60" aria-hidden="true" />
            <input id="q" name="q" type="search" autoComplete="off" placeholder="Buscar en la guía…" className="flex-1 border-none bg-transparent px-3 py-3 text-sm text-white placeholder:text-white/40 outline-none" />
            <button type="submit" className="bg-primary px-5 py-3 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-primary-strong">Buscar</button>
          </form>

          {/* Chips de datos en vivo */}
          <div className="mt-8 flex flex-wrap gap-3">
            <HeroChip Icon={Coins} label="Yen hoy" value={`1€ = ¥${rate}`} />
            <HeroChip Icon={Flower2} label="Sakura" value="finales mar–abr" />
            <HeroChip Icon={Train} label="JR Pass" value="desde ¥50.000" />
          </div>
        </div>
      </section>

      {/* Franja de confianza — fondo fg (tinta), texto blanco, rompe con el hero */}
      <div className="bg-fg">
        <div className="mx-auto max-w-7xl px-4 py-2.5 text-center text-sm text-white/70">
          ✓ Escrito por{" "}
          <Link href="/sobre-nosotros" className="font-bold text-primary hover:underline">{SITE.author.name}</Link>
          {" "}· datos verificados y de 2026 ·{" "}
          <Link href="/sobre-nosotros" className="font-medium text-white/70 hover:text-white">quiénes somos</Link>
        </div>
      </div>

      {/* Accesos rápidos */}
      <section aria-label="Accesos rápidos" className="border-b-2 border-fg bg-surface py-6">
        <div className="mx-auto max-w-3xl px-4">
          <p className="mb-5 text-center font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-fg-muted">Acceso directo</p>
          <ul className="grid grid-cols-3 gap-3 sm:grid-cols-6">
            {ACCESOS.map((a) => (
              <li key={a.label}>
                <Link href={a.href} className="group flex flex-col items-center gap-1.5 text-center">
                  <span className={`panel-manga-sm flex size-14 items-center justify-center bg-surface ${a.color} transition-all group-hover:translate-x-0.5 group-hover:translate-y-0.5 group-hover:shadow-none`}>
                    <a.Icon size={24} aria-hidden="true" />
                  </span>
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-fg-muted group-hover:text-fg">{a.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Itinerarios */}
      <section id="planifica" className="bg-bg py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-8 flex items-end justify-between">
            <div className="border-accent-left">
              <p className="font-mono text-xs font-bold uppercase tracking-widest text-primary">Itinerarios</p>
              <h2 className="mt-1 text-display text-3xl text-fg sm:text-4xl">Planifica tu aventura</h2>
            </div>
            <Link href="/itinerarios" className="hidden font-mono text-xs font-bold uppercase tracking-wide text-fg-muted hover:text-primary sm:block">Ver todos →</Link>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {ITIN.map((it) => (
              <Link key={it.badge} href={it.href} className="panel-manga group flex flex-col overflow-hidden bg-surface transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none">
                <div className="relative h-44 overflow-hidden">
                  <Image src={it.img} alt={it.title} fill sizes="(max-width:1024px) 50vw, 25vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  <span className="absolute left-0 top-3 bg-primary px-3 py-1 font-mono text-xs font-bold uppercase tracking-wide text-white">{it.badge}</span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-lg font-black leading-tight text-fg">{it.title}</h3>
                  <p className="mt-1.5 flex items-center gap-1.5 text-xs font-mono text-fg-muted"><MapPin size={12} aria-hidden="true" /> {it.ruta}</p>
                  <span className="mt-auto pt-4 font-mono text-xs font-bold uppercase tracking-wide text-primary group-hover:underline">Ver itinerario →</span>
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
              <Link key={d.title} href={d.href} className="group relative block h-96 overflow-hidden rounded-lg shadow-md">
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
                    <Link href={c.href} className="mt-4 inline-flex items-center gap-1 font-medium text-primary">Saber más <ArrowRight size={16} aria-hidden="true" /></Link>
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
              <Link key={p.title} href="/gastronomia/que-comer-en-japon" className="group overflow-hidden rounded-lg border border-border bg-surface shadow-md transition-all hover:-translate-y-1 hover:shadow-xl">
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
            {ENTRET.map((e) => {
              const card = (
                <>
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
                    {"href" in e && e.href && (
                      <span className="mt-4 inline-flex items-center gap-1 font-medium text-primary">
                        Leer la guía <ArrowRight size={16} aria-hidden="true" />
                      </span>
                    )}
                  </div>
                </>
              );
              return "href" in e && e.href ? (
                <Link key={e.title} href={e.href} className="group block overflow-hidden rounded-lg bg-surface shadow-md transition-all hover:-translate-y-1 hover:shadow-xl">
                  {card}
                </Link>
              ) : (
                <div key={e.title} className="overflow-hidden rounded-lg bg-surface shadow-md">
                  {card}
                </div>
              );
            })}
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
    <div className="mb-10 border-accent-left">
      <h2 className="text-display text-2xl text-fg sm:text-3xl">{title}</h2>
      <p className="mt-2 max-w-2xl text-pretty text-sm text-fg-muted">{sub}</p>
    </div>
  );
}

function HeroChip({ Icon, label, value }: { Icon: typeof Coins; label: string; value: string }) {
  return (
    <div className="panel-manga-sm flex items-center gap-3 bg-black/50 px-4 py-2.5 backdrop-blur-sm">
      <Icon size={18} className="text-primary" aria-hidden="true" />
      <div>
        <p className="font-mono text-[10px] uppercase tracking-widest text-white/50">{label}</p>
        <p className="nums text-sm font-bold text-white">{value}</p>
      </div>
    </div>
  );
}
