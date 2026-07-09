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
      {/* ═══ HERO EDITORIAL — grid asimétrico, tipografía protagonista ═══
          Layout: columna izquierda texto puro | columna derecha foto panel */}
      <section className="border-b-2 border-fg bg-bg">
        <div className="mx-auto max-w-7xl">
          {/* Cabecera del hero — línea horizontal con issue number */}
          <div className="flex items-center justify-between border-b-2 border-fg px-4 py-2 sm:px-6">
            <span className="index-number">Edición 2026 · Guía de Japón</span>
            <span className="index-number">{season}</span>
          </div>

          {/* Grid asimétrico: 7/12 texto | 5/12 foto */}
          <div className="grid min-h-[80vh] grid-cols-1 lg:grid-cols-12">

            {/* Columna texto — tipografía protagonista */}
            <div className="flex flex-col justify-between border-b-2 border-fg p-6 lg:col-span-7 lg:border-b-0 lg:border-r-2 lg:p-10 xl:p-14">
              <div>
                {/* H1 mega — texto ES el diseño */}
                <h1 className="text-display-lg mt-4 text-[clamp(3.5rem,8vw,7rem)] leading-[0.9] text-fg">
                  <span className="block">La mayor</span>
                  <span className="block text-primary">guía de</span>
                  <span className="block">Japón</span>
                  <span className="block">en español.</span>
                </h1>

                <p className="mt-8 max-w-md text-base leading-relaxed text-fg-muted">
                  JR Pass, presupuesto, itinerarios, cultura y gastronomía — con datos reales y experiencia de primera mano.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href="/herramientas/jr-pass-calculadora" className="btn-editorial">
                    Calculadora JR Pass <ArrowRight size={14} aria-hidden="true" />
                  </Link>
                  <Link href="/itinerarios" className="btn-editorial-outline">
                    Ver itinerarios
                  </Link>
                </div>

                {/* Buscador minimalista */}
                <form action="/buscar" className="mt-6 flex max-w-md border-2 border-fg focus-within:border-primary">
                  <label htmlFor="q" className="sr-only">Buscar en la guía</label>
                  <input
                    id="q" name="q" type="search" autoComplete="off"
                    placeholder="Busca: JR Pass, Kioto, itinerario 10 días…"
                    className="flex-1 bg-transparent px-4 py-3 text-sm text-fg placeholder:text-fg-muted outline-none"
                  />
                  <button type="submit" aria-label="Buscar" className="border-l-2 border-fg bg-fg px-4 text-bg transition-colors hover:bg-primary hover:border-primary">
                    <Search size={16} aria-hidden="true" />
                  </button>
                </form>
              </div>

              {/* Datos duros al pie — estilo tabla de datos */}
              <div className="mt-10 grid grid-cols-3 border-t-2 border-fg">
                <div className="border-r-2 border-fg py-4 pr-4">
                  <p className="index-number">Yen hoy</p>
                  <p className="mt-1 font-mono text-2xl font-black text-fg">¥{rate}</p>
                  <p className="index-number mt-0.5 text-fg-muted">por euro</p>
                </div>
                <div className="border-r-2 border-fg px-4 py-4">
                  <p className="index-number">Sakura</p>
                  <p className="mt-1 font-mono text-2xl font-black text-fg">Mar–Abr</p>
                  <p className="index-number mt-0.5 text-fg-muted">temporada</p>
                </div>
                <div className="pl-4 py-4">
                  <p className="index-number">JR Pass</p>
                  <p className="mt-1 font-mono text-2xl font-black text-fg">¥50k</p>
                  <p className="index-number mt-0.5 text-fg-muted">desde 7 días</p>
                </div>
              </div>
            </div>

            {/* Columna foto — panel duro sin border-radius */}
            <div className="relative min-h-[40vh] lg:col-span-5 lg:min-h-0">
              <Image
                src={heroFuji}
                alt="Monte Fuji con una pagoda y cerezos en flor"
                fill priority placeholder="blur"
                sizes="(max-width:1024px) 100vw, 42vw"
                className="object-cover object-center"
              />
              {/* Crédito foto */}
              <span className="absolute bottom-2 right-2 bg-black/60 px-1.5 py-0.5 font-mono text-[9px] text-white/70">
                © Wikimedia Commons
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FRANJA DE AUTORÍA ═══ */}
      <div className="border-b-2 border-fg bg-fg">
        <div className="mx-auto max-w-7xl px-4 py-2.5">
          <p className="font-mono text-xs text-white/60">
            ✓ Escrito por{" "}
            <Link href="/sobre-nosotros" className="font-bold text-primary hover:underline">{SITE.author.name}</Link>
            {" "}· datos verificados 2026 ·{" "}
            <Link href="/sobre-nosotros" className="text-white/60 hover:text-white">quiénes somos →</Link>
          </p>
        </div>
      </div>

      {/* ═══ ACCESOS RÁPIDOS — fila de íconos como índice ═══ */}
      <section aria-label="Accesos rápidos" className="border-b-2 border-fg bg-surface">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-3 divide-x-2 divide-fg sm:grid-cols-6">
            {ACCESOS.map((a, i) => (
              <Link key={a.label} href={a.href} className="group flex flex-col items-center gap-2 px-4 py-5 transition-colors hover:bg-fg hover:text-bg">
                <a.Icon size={22} className={`${a.color} group-hover:text-bg`} aria-hidden="true" />
                <span className="index-number group-hover:text-bg">{String(i + 1).padStart(2, "0")}</span>
                <span className="index-number group-hover:text-bg">{a.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ ITINERARIOS — grid editorial con foto panel ═══ */}
      <section id="planifica" className="border-b-2 border-fg bg-bg py-0">
        <div className="mx-auto max-w-7xl">
          {/* Cabecera de sección como portada de revista */}
          <div className="flex items-center justify-between border-b-2 border-fg px-6 py-3">
            <span className="text-display text-sm text-fg">Itinerarios</span>
            <Link href="/itinerarios" className="index-number hover:text-primary">Ver todos →</Link>
          </div>
          <div className="grid grid-cols-1 divide-y-2 divide-fg sm:grid-cols-2 sm:divide-x-2 sm:divide-y-0 lg:grid-cols-4">
            {ITIN.map((it) => (
              <Link key={it.badge} href={it.href} className="group flex flex-col overflow-hidden transition-colors hover:bg-fg">
                <div className="relative h-48 overflow-hidden border-b-2 border-fg">
                  <Image src={it.img} alt={it.title} fill sizes="(max-width:1024px) 50vw, 25vw" className="object-cover transition-transform duration-700 group-hover:scale-105 group-hover:brightness-75" />
                  <span className="tag-editorial-red absolute left-0 top-0">{it.badge}</span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-display text-xl text-fg group-hover:text-bg">{it.title}</h3>
                  <p className="mt-2 flex items-center gap-1.5 font-mono text-xs text-fg-muted group-hover:text-bg/70"><MapPin size={10} aria-hidden="true" /> {it.ruta}</p>
                  <span className="mt-4 index-number text-primary group-hover:text-primary">Ver →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ DESTINOS — grid asimétrico con fotos panel ═══ */}
      <section id="destinos" className="border-b-2 border-fg bg-surface py-0">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-between border-b-2 border-fg px-6 py-3">
            <span className="text-display text-sm text-fg">Destinos</span>
            <Link href="/destinos" className="index-number hover:text-primary">Ver todos →</Link>
          </div>
          {/* Grid: foto grande izquierda (col-span-2) + 2 fotos apiladas derecha */}
          <div className="grid grid-cols-1 md:grid-cols-3">
            {DEST.map((d, i) => (
              <Link
                key={d.title}
                href={d.href}
                className={`group relative overflow-hidden border-b-2 border-fg last:border-b-0 md:border-b-0 ${i < 2 ? "md:border-r-2" : ""} block`}
              >
                <div className={`relative ${i === 0 ? "h-72 md:h-[28rem]" : "h-52 md:h-56"} overflow-hidden`}>
                  <Image src={d.img} alt={d.title} fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-105 group-hover:brightness-75" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <h3 className="text-display text-2xl text-white">{d.title}</h3>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {d.tags.map((t) => <span key={t} className="tag-editorial bg-white/20 text-white" style={{background:"rgba(255,255,255,0.2)"}}>{t}</span>)}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ INFORMACIÓN PRÁCTICA — tabla de datos ═══ */}
      <section id="consejos" className="border-b-2 border-fg bg-bg py-0">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-between border-b-2 border-fg px-6 py-3">
            <span className="text-display text-sm text-fg">Información práctica</span>
          </div>
          <div className="grid grid-cols-1 divide-y-2 divide-fg sm:grid-cols-2 sm:divide-x-2 sm:divide-y-0 lg:grid-cols-3">
            {PRACT.map((c, i) => (
              <div key={c.title} className={`flex flex-col p-6 ${i > 2 ? "border-t-2 border-fg" : ""}`}>
                <div className="flex items-start justify-between">
                  <div className={`flex size-10 items-center justify-center border-2 border-fg bg-surface ${c.color}`}>
                    <c.Icon size={18} aria-hidden="true" />
                  </div>
                  <span className="index-number">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="mt-4 text-lg font-black text-fg">{c.title}</h3>
                <p className="mt-1 text-sm text-fg-muted">{c.desc}</p>
                <ul className="mt-4 space-y-1.5">
                  {c.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 font-mono text-xs text-fg-muted">
                      <span className="mt-0.5 text-primary">▸</span>
                      <span className="nums">{b}</span>
                    </li>
                  ))}
                </ul>
                <Link href={c.href} className="mt-auto pt-5 index-number text-primary hover:underline">{c.link} →</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ ÚLTIMAS NOTICIAS — lista editorial ═══ */}
      {news.length > 0 && (
        <section className="border-b-2 border-fg bg-surface py-0">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-center justify-between border-b-2 border-fg px-6 py-3">
              <span className="text-display text-sm text-fg">Últimas noticias</span>
              <Link href="/blog" className="index-number hover:text-primary">Ver todo →</Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Noticia destacada */}
              {featured && (
                <Link href={`/blog/${featured.slug}`} className="group border-b-2 border-fg p-6 transition-colors hover:bg-fg md:border-b-0 md:border-r-2">
                  <span className="tag-editorial-red">{featured.kicker}</span>
                  <h3 className="mt-4 text-display text-xl text-fg group-hover:text-bg sm:text-2xl">{featured.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-fg-muted group-hover:text-bg/70">{featured.excerpt}</p>
                  <p className="nums mt-4 font-mono text-xs text-fg-muted group-hover:text-bg/50">
                    {new Intl.DateTimeFormat("es-ES", { day: "numeric", month: "short", year: "numeric" }).format(new Date(featured.dateModified))}
                    {featured.readingMinutes ? ` · ${featured.readingMinutes} min` : ""}
                  </p>
                </Link>
              )}
              {/* Lista secundaria */}
              <ul className="divide-y-2 divide-fg">
                {rest.map((p) => (
                  <li key={p.slug}>
                    <Link href={`/blog/${p.slug}`} className="group flex items-start gap-4 p-5 transition-colors hover:bg-fg">
                      <div className="flex-1">
                        <p className="index-number text-fg-muted group-hover:text-bg/60">{p.kicker}</p>
                        <h3 className="mt-1 font-black leading-snug text-fg group-hover:text-bg">{p.title}</h3>
                        <p className="nums mt-1 font-mono text-xs text-fg-muted group-hover:text-bg/50">
                          {new Intl.DateTimeFormat("es-ES", { day: "numeric", month: "short" }).format(new Date(p.dateModified))}
                          {p.readingMinutes ? ` · ${p.readingMinutes} min` : ""}
                        </p>
                      </div>
                      <span className="shrink-0 font-mono text-xs text-fg-muted group-hover:text-bg/60">→</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* ═══ CULTURA + GASTRONOMÍA — fila compacta ═══ */}
      <section className="border-b-2 border-fg bg-surface py-0">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 divide-y-2 divide-fg md:grid-cols-2 md:divide-x-2 md:divide-y-0">
            {/* Cultura */}
            <div>
              <div className="flex items-center justify-between border-b-2 border-fg px-6 py-3">
                <span className="text-display text-sm text-fg">Cultura</span>
                <Link href="/cultura" className="index-number hover:text-primary">Explorar →</Link>
              </div>
              <div className="divide-y-2 divide-fg">
                {CULTURA.slice(0, 2).map((c) => (
                  <Link key={c.title} href={c.href} className="group grid grid-cols-2 transition-colors hover:bg-fg">
                    <div className="flex flex-col justify-between p-5">
                      <div>
                        <h3 className="font-black text-fg group-hover:text-bg">{c.title}</h3>
                        <p className="mt-1.5 text-xs text-fg-muted group-hover:text-bg/60">{c.desc}</p>
                      </div>
                      <span className="mt-3 index-number text-primary">Leer →</span>
                    </div>
                    <div className="relative h-32 border-l-2 border-fg overflow-hidden">
                      <Image src={c.img} alt={c.title} fill sizes="20vw" className="object-cover transition-transform duration-500 group-hover:scale-105 group-hover:brightness-75" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            {/* Gastronomía */}
            <div>
              <div className="flex items-center justify-between border-b-2 border-fg px-6 py-3">
                <span className="text-display text-sm text-fg">Gastronomía</span>
                <Link href="/gastronomia" className="index-number hover:text-primary">Explorar →</Link>
              </div>
              <div className="divide-y-2 divide-fg">
                {DISHES.slice(0, 2).map((p) => (
                  <Link key={p.title} href="/gastronomia/que-comer-en-japon" className="group grid grid-cols-2 transition-colors hover:bg-fg">
                    <div className="flex flex-col justify-between p-5">
                      <div>
                        <h3 className="font-black text-fg group-hover:text-bg">{p.title}</h3>
                        <p className="mt-1.5 text-xs text-fg-muted group-hover:text-bg/60">{p.desc}</p>
                      </div>
                      <p className="mt-2 font-mono text-xs text-fg-muted group-hover:text-bg/50">
                        <span className="nums">{p.precio}</span> · {p.lugar}
                      </p>
                    </div>
                    <div className="relative h-32 border-l-2 border-fg overflow-hidden">
                      <Image src={p.img} alt={p.title} fill sizes="20vw" className="object-cover transition-transform duration-500 group-hover:scale-105 group-hover:brightness-75" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ NEWSLETTER — bloque editorial sólido ═══ */}
      <section className="border-b-2 border-fg bg-fg">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="border-b-2 border-white/20 p-8 md:border-b-0 md:border-r-2 md:p-10">
              <span className="tag-editorial-red">Newsletter</span>
              <h2 className="mt-4 text-display text-3xl text-white sm:text-4xl">¿Planificando tu viaje a Japón?</h2>
              <p className="mt-3 text-sm text-white/60">Checklist, consejos y novedades. Sin spam, sin relleno.</p>
            </div>
            <div className="flex items-center p-8 md:p-10">
              <NewsletterForm source="home" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// SectionHead ya no se usa en la nueva home editorial — se mantiene por si acaso
function SectionHead({ title, sub }: { title: string; sub: string }) {
  return (
    <div className="mb-10 border-accent-left">
      <h2 className="text-display text-2xl text-fg sm:text-3xl">{title}</h2>
      <p className="mt-2 max-w-2xl text-pretty text-sm text-fg-muted">{sub}</p>
    </div>
  );
}
