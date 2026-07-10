import Image from "next/image";
import Link from "next/link";
import heroFuji from "../../public/images/hero-fuji.jpg";
import { Search, MapPin, ArrowRight, Check, Train, Wifi, Coins, Plug, Luggage, CalendarDays, Route, Landmark, Utensils } from "lucide-react";
import { Charla } from "@/components/Charla";
import type { Metadata } from "next";
import { getYenRate } from "@/lib/fx";
import { getArticles } from "@/lib/content";
import { NewsletterForm } from "@/components/NewsletterForm";
import { SITE } from "@/lib/site";

export const revalidate = 21600;

export const metadata: Metadata = {
  title: { absolute: "ViajaJapón — Guía para viajar a Japón en 2026 (JR Pass, presupuesto y consejos)" },
  description: "Planifica tu viaje a Japón en 2026: calculadora del JR Pass, presupuesto en euros, reservas, transporte y gastronomía. Datos actualizados y experiencia real.",
  alternates: { canonical: "/" },
};

const ITIN = [
  { img: "/images/tokio.jpg",    badge: "7 días",  title: "Esencia de Japón",  ruta: "Tokio · Kioto · Nara",            href: "/itinerarios/itinerario-japon-7-dias" },
  { img: "/images/kioto.jpg",    badge: "10 días", title: "Ruta clásica",      ruta: "Tokio · Hakone · Kioto · Osaka",  href: "/itinerarios/itinerario-japon-10-dias" },
  { img: "/images/osaka.jpg",    badge: "15 días", title: "Japón profundo",    ruta: "+ Hiroshima · Kanazawa",          href: "/itinerarios/itinerario-japon-15-dias" },
  { img: "/images/hero-fuji.jpg",badge: "1 mes",   title: "Japón completo",    ruta: "Tokio · Kansai · Alpes · más",    href: "/itinerarios/itinerario-japon-1-mes" },
];

const DEST = [
  { img: "/images/tokio.jpg", title: "Tokio",  desc: "La megalópolis que nunca duerme.",           tags: ["Shibuya", "Shinjuku", "Akihabara", "Asakusa"],         href: "/destinos/que-ver-en-tokio" },
  { img: "/images/kioto.jpg", title: "Kioto",  desc: "Mil templos, geishas y el Japón eterno.",    tags: ["Fushimi Inari", "Kinkaku-ji", "Arashiyama", "Gion"],   href: "/destinos/que-ver-en-kioto" },
  { img: "/images/osaka.jpg", title: "Osaka",  desc: "Dotonbori, comida y buen rollo.",            tags: ["Dotonbori", "Namba", "Castillo", "USJ"],               href: "/destinos/que-ver-en-osaka" },
];

const ACCESOS = [
  { label: "Itinerarios",  href: "/itinerarios",                       Icon: Route,      color: "text-primary" },
  { label: "Preparativos", href: "/logistica/preparativos-viaje-japon",Icon: Luggage,    color: "text-[#0a0a0a]" },
  { label: "Destinos",     href: "/destinos",                          Icon: MapPin,     color: "text-[#0a0a0a]" },
  { label: "Comida",       href: "/gastronomia",                       Icon: Utensils,   color: "text-[#0a0a0a]" },
  { label: "Transporte",   href: "/logistica/jr-pass-2026",            Icon: Train,      color: "text-primary" },
  { label: "Cultura",      href: "/cultura",                           Icon: Landmark,   color: "text-[#0a0a0a]" },
];

export default async function Home() {
  const { rate } = await getYenRate();
  const month = new Date().getMonth();
  const season =
    month >= 2 && month <= 4 ? "Primavera · sakura" :
    month >= 5 && month <= 7 ? "Verano · matsuri" :
    month >= 8 && month <= 10 ? "Otoño · momiji" : "Invierno · onsen";

  const news = getArticles("blog");
  const featured = news[0];

  const PRACT = [
    { Icon: Train,       color: "text-primary",    title: "JR Pass",             desc: "Tren ilimitado incluyendo el Shinkansen.",  bullets: ["Para 7, 14 o 21 días", "Cómpralo antes de salir", `Desde ¥50.000 (~${Math.round(50000/rate)}€)`], href: "/herramientas/jr-pass-calculadora", link: "Calcular" },
    { Icon: Wifi,        color: "text-[#2d4fe0]",  title: "Internet",            desc: "Conectado desde que aterrizas.",            bullets: ["eSIM Holafly o Airalo", "Pocket WiFi", "WiFi gratis en muchos sitios"], href: "/logistica/esim-japon", link: "Comparar eSIM" },
    { Icon: Coins,       color: "text-[#15803d]",  title: "Dinero",              desc: "Euros a yenes y cómo pagar bien.",          bullets: [`1€ ≈ ¥${rate} ahora`, "Tarjeta sin comisiones (Revolut)", "Tax-free compras"], href: "/cambio-yen-euro", link: "Ver cambio" },
    { Icon: Luggage,     color: "text-[#c07c00]",  title: "Maleta",              desc: "Lo que no puede faltarte.",                bullets: ["Checklist interactiva", "Ropa por temporada", "Qué no pasa la aduana"], href: "/logistica/que-llevar-maleta-japon", link: "Ver lista" },
    { Icon: CalendarDays,color: "text-[#7c3aed]",  title: "Cuándo ir",           desc: "La mejor época para cada plan.",            bullets: ["Sakura: mar–abr", "Otoño momiji: nov", "Evitar Golden Week"], href: "/logistica/mejor-epoca-viajar-japon", link: "Ver guía" },
    { Icon: Plug,        color: "text-[#0a0a0a]",  title: "Enchufes",            desc: "Tipo A, dos clavijas planas, 100V.",         bullets: ["Compatible con España", "Sin adaptador si es solo carga", "Voltaje 100V — verifica"], href: "/logistica", link: "Más info" },
  ];

  return (
    <main>

      {/* ══════════════════════════════════════════
          HERO: foto panel de manga + tipografía XXL
          Split: texto izquierda / foto derecha
          ══════════════════════════════════════════ */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl">

          {/* Tira superior: season + buscador (solo desktop; móvil lo tiene más abajo) */}
          <div className="flex items-center justify-between gap-4 border-b-[3px] border-[#0a0a0a] px-4 py-2 sm:px-5">
            <span className="font-mono text-[10px] font-black uppercase tracking-[0.15em] text-[#e1352e]">
              {season} · 2026
            </span>
            <form action="/buscar" className="hidden max-w-xs flex-1 items-center border-[2px] border-[#0a0a0a] sm:flex">
              <label htmlFor="hero-q" className="sr-only">Buscar en la guía</label>
              <input
                id="hero-q" name="q" type="search" autoComplete="off"
                placeholder="Busca: JR Pass, Kioto…"
                className="flex-1 bg-transparent px-3 py-1.5 text-xs text-[#0a0a0a] placeholder:text-[#999] outline-none"
              />
              <button type="submit" aria-label="Buscar" className="border-l-[2px] border-[#0a0a0a] bg-[#e1352e] px-3 py-1.5 text-white">
                <Search size={14} aria-hidden="true" />
              </button>
            </form>
          </div>

          {/* ── MÓVIL: foto arriba, texto abajo ─────────────────────
              En móvil la foto va primero (impacto inmediato),
              el texto debajo. En desktop: grid lado a lado. */}
          <div className="grid grid-cols-1 lg:grid-cols-[55fr_45fr]">

            {/* Foto — móvil primera, desktop segunda columna */}
            <div className="relative order-first h-[58vw] min-h-[240px] border-b-[3px] border-[#0a0a0a] lg:order-last lg:border-b-0 lg:border-l-[3px] lg:h-auto">
              <Image
                src={heroFuji}
                alt="Monte Fuji con pagoda y cerezos"
                fill priority placeholder="blur"
                sizes="(max-width:1024px) 100vw, 45vw"
                className="object-cover object-center"
              />
              {/* Título superpuesto sobre la foto solo en móvil */}
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/70 via-black/20 to-transparent p-4 lg:hidden">
                <h1 className="display-xl text-white" style={{ fontSize: "clamp(2.8rem, 12vw, 4.5rem)" }}>
                  <span className="block">La guía de</span>
                  <span className="block text-[#ff5b4e]">Japón</span>
                  <span className="block">en español.</span>
                </h1>
              </div>
              <span className="absolute bottom-2 right-2 border border-white/40 bg-black/50 px-1.5 py-0.5 font-mono text-[9px] text-white/70">
                © Wikimedia Commons
              </span>
            </div>

            {/* Columna texto — desktop: izquierda; móvil: debajo de la foto */}
            <div className="order-last flex flex-col justify-between border-b-[3px] border-[#0a0a0a] p-5 lg:order-first lg:border-b-0 lg:border-r-[3px] lg:p-10 xl:p-14">
              <div>
                {/* H1 solo visible en desktop (en móvil va sobre la foto) */}
                <h1
                  className="display-xl hidden text-[#0a0a0a] lg:block"
                  style={{ fontSize: "clamp(3.2rem, 7.5vw, 6.5rem)" }}
                >
                  <span className="block">La guía de</span>
                  <span className="block text-[#e1352e]">Japón</span>
                  <span className="block">en español.</span>
                </h1>

                <p className="mt-4 text-sm leading-relaxed text-[#555] lg:mt-6 lg:max-w-sm lg:text-base">
                  JR Pass, presupuesto, itinerarios, cultura y gastronomía con datos reales y experiencia de primera mano.
                </p>

                {/* CTAs — en móvil apilados, en desktop en fila */}
                <div className="mt-5 flex flex-col gap-3 sm:flex-row lg:mt-8">
                  <Link href="/herramientas/jr-pass-calculadora" className="btn-primary justify-center sm:justify-start">
                    Calculadora JR Pass <ArrowRight size={14} aria-hidden="true" />
                  </Link>
                  <Link href="/itinerarios" className="btn-outline justify-center sm:justify-start">
                    Ver itinerarios
                  </Link>
                </div>

                {/* Buscador móvil (solo móvil, debajo de los CTAs) */}
                <form action="/buscar" className="mt-4 flex items-center border-[2px] border-[#0a0a0a] sm:hidden">
                  <label htmlFor="hero-q-mob" className="sr-only">Buscar en la guía</label>
                  <input
                    id="hero-q-mob" name="q" type="search" autoComplete="off"
                    placeholder="Busca: JR Pass, Kioto, onsen…"
                    className="flex-1 bg-transparent px-3 py-2.5 text-sm text-[#0a0a0a] placeholder:text-[#999] outline-none"
                  />
                  <button type="submit" aria-label="Buscar" className="border-l-[2px] border-[#0a0a0a] bg-[#e1352e] px-4 py-2.5 text-white">
                    <Search size={16} aria-hidden="true" />
                  </button>
                </form>
              </div>

              {/* Datos en vivo — 3 chips horizontales */}
              <div className="mt-6 grid grid-cols-3 divide-x-[2px] divide-[#0a0a0a] border-[2px] border-[#0a0a0a] lg:mt-10">
                <div className="px-3 py-2.5 lg:px-4 lg:py-3">
                  <p className="font-mono text-[8px] font-black uppercase tracking-widest text-[#999]">Yen hoy</p>
                  <p className="nums mt-0.5 font-mono text-base font-black text-[#0a0a0a] lg:text-xl">¥{rate}</p>
                  <p className="font-mono text-[8px] text-[#999]">por euro</p>
                </div>
                <div className="px-3 py-2.5 lg:px-4 lg:py-3">
                  <p className="font-mono text-[8px] font-black uppercase tracking-widest text-[#999]">Sakura</p>
                  <p className="nums mt-0.5 font-mono text-base font-black text-[#0a0a0a] lg:text-xl">Mar–Abr</p>
                  <p className="font-mono text-[8px] text-[#999]">temporada</p>
                </div>
                <div className="px-3 py-2.5 lg:px-4 lg:py-3">
                  <p className="font-mono text-[8px] font-black uppercase tracking-widest text-[#999]">JR Pass</p>
                  <p className="nums mt-0.5 font-mono text-base font-black text-[#0a0a0a] lg:text-xl">¥50k</p>
                  <p className="font-mono text-[8px] text-[#999]">desde 7 días</p>
                </div>
              </div>
            </div>
          </div>

          {/* Franja de autoría */}
          <div className="border-t-[3px] border-[#0a0a0a] bg-[#0a0a0a] px-5 py-2.5">
            <p className="font-mono text-[11px] text-white/60">
              ✓ Escrito por{" "}
              <Link href="/sobre-nosotros" className="font-black text-[#e1352e] hover:underline">{SITE.author.name}</Link>
              {" "}· datos verificados 2026 ·{" "}
              <Link href="/sobre-nosotros" className="text-white/40 hover:text-white">quiénes somos →</Link>
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          ACCESOS RÁPIDOS — barra de iconos
          ══════════════════════════════════════════ */}
      <section aria-label="Accesos rápidos" className="border-b-[3px] border-[#0a0a0a] bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-3 divide-x-[3px] divide-[#0a0a0a] sm:grid-cols-6">
            {ACCESOS.map((a) => (
              <Link
                key={a.label}
                href={a.href}
                className="group flex flex-col items-center gap-2 px-4 py-5 transition-colors hover:bg-[#e1352e]"
              >
                <a.Icon size={22} className={`${a.color} group-hover:text-white`} aria-hidden="true" />
                <span className="font-mono text-[9px] font-black uppercase tracking-wider text-[#0a0a0a] group-hover:text-white">
                  {a.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          VIÑETA MADRE-HIJO — protagonismo total
          Panel manga: marco negro, globos de texto
          ══════════════════════════════════════════ */}
      <section className="border-b-[3px] border-[#0a0a0a] bg-white py-8 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-5">
          {/* Cabecera de sección estilo etiqueta de cómic */}
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <span className="tag-manga">De nuestro viaje</span>
            <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-[#999]">
              Dic. 2025 · madre e hijo
            </span>
          </div>

          {/* Grid: cita grande + viñetas */}
          {/* Viñetas: scroll horizontal snap en móvil, grid en desktop */}
          <div
            className="flex gap-5 overflow-x-auto pb-2 lg:grid lg:grid-cols-2 lg:overflow-visible lg:pb-0"
            style={{ scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" }}
          >
            {/* Viñeta 1 */}
            <div
              className="panel-manga-red w-[88vw] shrink-0 bg-white p-5 sm:p-6 lg:w-auto"
              style={{ scrollSnapAlign: "start" }}
            >
              <div className="mb-4 border-b-[2px] border-[#0a0a0a] pb-3">
                <span className="font-mono text-[9px] font-black uppercase tracking-widest text-[#e1352e]">
                  Kioto · noche de diciembre
                </span>
              </div>
              <Charla lineas={[
                { quien: "madre", texto: "El Kiyomizu-dera de noche, iluminado. De todo el viaje, me quedo con eso." },
                { quien: "hijo",  texto: "Y el Fushimi Inari te lo subiste hasta arriba del todo, con 70 años recién cumplidos. Así que lo de «madruga y sube» va en serio: si pudo ella, puedes tú." },
              ]} />
            </div>

            {/* Viñeta 2 */}
            <div
              className="panel-manga-red w-[88vw] shrink-0 bg-white p-5 sm:p-6 lg:w-auto"
              style={{ scrollSnapAlign: "start" }}
            >
              <div className="mb-4 border-b-[2px] border-[#0a0a0a] pb-3">
                <span className="font-mono text-[9px] font-black uppercase tracking-widest text-[#e1352e]">
                  Por todo Japón · 15 días
                </span>
              </div>
              <Charla lineas={[
                { quien: "hijo",  texto: "En nuestros 15 días comimos ramen literalmente todos los días, y nos metíamos en cualquier sitio sin mirar reseñas." },
                { quien: "madre", texto: "Porque cualquiera estaba rico." },
              ]} />
            </div>
          </div>

          {/* CTA hacia sobre-nosotros */}
          <div className="mt-8 text-center">
            <Link href="/sobre-nosotros" className="btn-outline">
              Conoce nuestra historia <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          ITINERARIOS — paneles manga con foto
          ══════════════════════════════════════════ */}
      <section id="planifica" className="border-b-[3px] border-[#0a0a0a] bg-[#f5f5f5] py-8 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-5">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <span className="tag-dark">Itinerarios</span>
              <h2 className="display-md mt-2 text-2xl text-[#0a0a0a] sm:text-3xl lg:text-4xl">¿Cuántos días tienes?</h2>
            </div>
            <Link href="/itinerarios" className="font-mono text-xs font-black uppercase tracking-wide text-[#e1352e] hover:underline">
              Ver todos →
            </Link>
          </div>
          {/* Scroll horizontal en móvil (snap), grid en desktop */}
          <div className="flex gap-4 overflow-x-auto pb-1 sm:grid sm:grid-cols-2 sm:overflow-visible sm:pb-0 lg:grid-cols-4"
               style={{ scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" }}>
            {ITIN.map((it) => (
              <Link
                key={it.badge}
                href={it.href}
                className="panel-manga-dark group flex w-[72vw] shrink-0 flex-col bg-white sm:w-auto"
                style={{ scrollSnapAlign: "start" }}
              >
                <div className="relative h-40 overflow-hidden border-b-[3px] border-[#0a0a0a]">
                  <Image
                    src={it.img} alt={it.title} fill
                    sizes="(max-width:640px) 72vw, (max-width:1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="tag-manga absolute left-0 top-0">{it.badge}</span>
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <h3 className="display-md text-lg text-[#0a0a0a]">{it.title}</h3>
                  <p className="mt-1 flex items-center gap-1.5 font-mono text-[10px] text-[#777]">
                    <MapPin size={10} aria-hidden="true" /> {it.ruta}
                  </p>
                  <span className="mt-auto pt-3 font-mono text-[10px] font-black uppercase tracking-wide text-[#e1352e]">
                    Ver día a día →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          DESTINOS — tres paneles de foto
          ══════════════════════════════════════════ */}
      <section id="destinos" className="border-b-[3px] border-[#0a0a0a] bg-white py-8 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-5">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <span className="tag-dark">Destinos</span>
              <h2 className="display-md mt-2 text-2xl text-[#0a0a0a] sm:text-3xl lg:text-4xl">Las ciudades imprescindibles</h2>
            </div>
            <Link href="/destinos" className="font-mono text-xs font-black uppercase tracking-wide text-[#e1352e] hover:underline">
              Todos →
            </Link>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-1 md:grid md:grid-cols-3 md:overflow-visible md:pb-0"
               style={{ scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" }}>
            {DEST.map((d) => (
              <Link
                key={d.title}
                href={d.href}
                className="panel-manga-dark group block w-[80vw] shrink-0 md:w-auto"
                style={{ scrollSnapAlign: "start" }}
              >
                <div className="relative h-56 overflow-hidden border-b-[3px] border-[#0a0a0a]">
                  <Image
                    src={d.img} alt={d.title} fill
                    sizes="(max-width:768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="bg-white p-4">
                  <h3 className="display-md text-2xl text-[#0a0a0a]">{d.title}</h3>
                  <p className="mt-1 text-sm text-[#555]">{d.desc}</p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {d.tags.map((t) => (
                      <span key={t} className="border border-[#0a0a0a] font-mono text-[9px] font-bold uppercase px-1.5 py-0.5 text-[#0a0a0a]">{t}</span>
                    ))}
                  </div>
                  <span className="mt-3 block font-mono text-[10px] font-black uppercase tracking-wide text-[#e1352e]">
                    Explorar →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          INFO PRÁCTICA — grid de tarjetas
          ══════════════════════════════════════════ */}
      <section id="consejos" className="border-b-[3px] border-[#0a0a0a] bg-[#f5f5f5] py-8 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-5">
          <div className="mb-6">
            <span className="tag-dark">Antes de salir</span>
            <h2 className="display-md mt-2 text-2xl text-[#0a0a0a] sm:text-3xl lg:text-4xl">Lo que hay que saber</h2>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PRACT.map((c, i) => (
              <div key={c.title} className="panel-manga bg-white p-5">
                <div className="flex items-start justify-between">
                  <c.Icon size={22} className={c.color} aria-hidden="true" />
                  <span className="font-mono text-[9px] font-black text-[#ccc]">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="mt-3 text-lg font-black text-[#0a0a0a]">{c.title}</h3>
                <p className="mt-1 text-sm text-[#555]">{c.desc}</p>
                <ul className="mt-3 space-y-1">
                  {c.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-1.5 font-mono text-[10px] text-[#777]">
                      <span className="mt-0.5 text-[#e1352e] leading-none">▸</span>
                      <span className="nums">{b}</span>
                    </li>
                  ))}
                </ul>
                <Link href={c.href} className="mt-4 block font-mono text-[10px] font-black uppercase tracking-wide text-[#e1352e] hover:underline">
                  {c.link} →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          NOTICIAS — si existen
          ══════════════════════════════════════════ */}
      {featured && (
        <section className="border-b-[3px] border-[#0a0a0a] bg-white py-8 sm:py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-5">
            <div className="mb-6 flex items-end justify-between">
              <div>
                <span className="tag-dark">Actualidad</span>
                <h2 className="display-md mt-2 text-2xl text-[#0a0a0a] sm:text-3xl lg:text-4xl">Novedades de Japón</h2>
              </div>
              <Link href="/blog" className="font-mono text-xs font-black uppercase tracking-wide text-[#e1352e] hover:underline">
                Ver todo →
              </Link>
            </div>
            <Link href={`/blog/${featured.slug}`} className="panel-manga-red group block bg-white p-6 sm:p-8">
              <span className="tag-manga">{featured.kicker}</span>
              <h3 className="display-md mt-4 text-2xl text-[#0a0a0a] sm:text-3xl group-hover:text-[#e1352e]">
                {featured.title}
              </h3>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#555]">{featured.excerpt}</p>
              <span className="mt-4 block font-mono text-[10px] font-black uppercase tracking-wide text-[#e1352e]">
                Leer nota →
              </span>
            </Link>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════
          NEWSLETTER — bloque de cierre
          ══════════════════════════════════════════ */}
      <section className="bg-[#0a0a0a] py-8 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-5">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-12">
            <div>
              <span className="tag-manga">Newsletter</span>
              <h2 className="display-md mt-4 text-2xl text-white sm:text-3xl lg:text-4xl">¿Planificando tu viaje?</h2>
              <p className="mt-2 text-sm text-white/50">Checklist, consejos y novedades. Sin spam.</p>
            </div>
            <div className="flex items-center">
              <NewsletterForm source="home" />
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
