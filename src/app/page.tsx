import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Calculator, Coins, Luggage, ArrowRight } from "lucide-react";
import { NewsletterForm, NewsletterGate } from "@/components/NewsletterForm";
import { SITE } from "@/lib/site";
import { HomeYenBullet } from "./HomeYenComponents";

export const metadata: Metadata = {
  title: { absolute: "ViajaJapón — Guía para viajar a Japón en 2026 (JR Pass, presupuesto y consejos)" },
  description: "Planifica tu viaje a Japón en 2026: calculadora del JR Pass, presupuesto en euros, reservas, transporte y gastronomía. Datos actualizados y experiencia real.",
  alternates: { canonical: "/" },
};

const P = "/images/propias/";

const DIAS = [
  { label: "7 días", href: "/itinerarios/itinerario-japon-7-dias" },
  { label: "10 días", href: "/itinerarios/itinerario-japon-10-dias" },
  { label: "15 días", href: "/itinerarios/itinerario-japon-15-dias" },
  { label: "1 mes · el más leído", href: "/itinerarios/itinerario-japon-1-mes", destacado: true },
];

// Páginas con más impresiones en Search Console (revisar cada trimestre).
const MAS_LEIDO = [
  { kicker: "Nuevo sistema · 1 de noviembre", title: "Tax Free en Japón: cómo cambia el reembolso al salir del país", href: "/logistica/compras-y-tax-free-japon" },
  { kicker: "Checklist imprimible", title: "Qué llevar a Japón en la maleta", href: "/logistica/que-llevar-maleta-japon" },
  { kicker: "Dinero", title: "Cómo pagar en Japón: efectivo, tarjeta y Suica", href: "/logistica/como-pagar-en-japon" },
  { kicker: "Cultura", title: "Geiko, geisha y maiko: qué son y cómo verlas con respeto", href: "/cultura/geishas-y-maiko-japon" },
];

const HERRAMIENTAS = [
  { Icon: Calculator, title: "Calculadora JR Pass", desc: "Mete tu ruta y compara billetes sueltos contra el pase, en euros.", href: "/herramientas/jr-pass-calculadora", destacado: true },
  { Icon: Coins, title: "Cambio yen-euro", desc: "Tipo de referencia del BCE, actualizado a diario.", href: "/cambio-yen-euro" },
  { Icon: Luggage, title: "Checklist de maleta", desc: "Marca lo que llevas; se guarda en tu móvil y se imprime.", href: "/logistica/que-llevar-maleta-japon" },
];

const ITIN = [
  { img: `${P}tokio-torre-noche.jpg`, alt: "La Torre de Tokio iluminada de noche", badge: "7 días", title: "Esencia de Japón", ruta: "Tokio · Kioto · Nara", href: "/itinerarios/itinerario-japon-7-dias" },
  { img: `${P}kioto-kiyomizu-pagoda-horizontal.jpg`, alt: "La pagoda de Kiyomizu-dera iluminada de noche", badge: "10 días", title: "Ruta clásica", ruta: "Tokio · Hakone · Kioto · Osaka", href: "/itinerarios/itinerario-japon-10-dias" },
  { img: `${P}fushimi-inari-toriis-madre.jpg`, alt: "Túnel de toriis rojos de Fushimi Inari", badge: "15 días", title: "Japón profundo", ruta: "+ Hiroshima · Kanazawa", href: "/itinerarios/itinerario-japon-15-dias" },
  { img: `${P}osaka-castillo-noche.jpg`, alt: "El castillo de Osaka iluminado de noche", badge: "1 mes", title: "Japón completo", ruta: "Tokio · Kansai · Alpes · más", href: "/itinerarios/itinerario-japon-1-mes" },
];

const DESTINOS = [
  { img: `${P}meiji-portones-torii.jpg`, alt: "El gran torii del santuario Meiji en Tokio", title: "Tokio", desc: "Barrios, miradores y un plan de 3 días.", href: "/destinos/que-ver-en-tokio" },
  { img: `${P}kioto-yasaka-pagoda-noche.jpg`, alt: "La pagoda Yasaka iluminada de noche en Kioto", title: "Kioto", desc: "Templos, Gion y un plan de 2 días.", href: "/destinos/que-ver-en-kioto" },
  { img: `${P}osaka-dotonbori-glico-madre.jpg`, alt: "Una mujer imita la pose del cartel de Glico en Dotonbori, Osaka", title: "Osaka", desc: "Dotonbori, el castillo y qué comer.", href: "/destinos/que-ver-en-osaka" },
];

const DORMIR = [
  { img: `${P}kioto-ryokan-kagihei-futones.jpg`, alt: "Futones sobre tatami en un ryokan de Kioto", kicker: "Kioto", title: "Dónde alojarse en Kioto: mejores zonas", desc: "Centro, estación, Gion o el truco de dormir en Osaka.", href: "/destinos/donde-dormir-en-kioto" },
  { img: `${P}tokio-hotel-habitacion-tatami.jpg`, alt: "Habitación de hotel en Tokio con tarima de tatami", kicker: "Tokio", title: "Dónde dormir en Tokio por barrios", desc: "La regla de oro: una estación bien conectada.", href: "/destinos/donde-dormir-en-tokio" },
];

const card = "border-[3px] border-[#0a0a0a] bg-white transition-all hover:translate-x-0.5 hover:translate-y-0.5";

export default async function Home() {
  return (
    <main>
      {/* ══════════ HERO + PLANIFICADOR EN 3 PASOS ══════════ */}
      <section className="border-b-[3px] border-[#0a0a0a] bg-white">
        <div className="mx-auto grid max-w-7xl lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
          <div className="flex flex-col gap-5 px-4 py-10 sm:py-14 lg:pr-10">
            <p className="kicker text-primary">Guía práctica · revisada en octubre de 2026</p>
            <h1 className="text-balance text-4xl font-black leading-[1.02] tracking-tight text-[#0a0a0a] sm:text-5xl lg:text-[64px]">
              Planifica Japón <span className="text-[#e1352e]">por libre</span>, con números reales.
            </h1>
            <p className="max-w-xl text-pretty text-base leading-relaxed text-[#3d3d3d] sm:text-lg">
              Itinerarios día a día, presupuesto en euros y la calculadora que te dice si el JR Pass te compensa.
              Hecho por una familia que lo ha recorrido. <span className="nums whitespace-nowrap text-sm text-fg-muted">(<HomeYenBullet />)</span>
            </p>

            <div className="flex flex-col gap-4 border-[3px] border-[#0a0a0a] bg-white p-5 shadow-[6px_6px_0_#0a0a0a]">
              <p className="kicker text-[#0a0a0a]">Tu viaje en 3 pasos</p>
              <div className="flex flex-col gap-2.5">
                <span className="text-[15px] font-bold">1 · ¿Cuántos días tienes?</span>
                <div className="flex flex-wrap gap-2">
                  {DIAS.map((d) => (
                    <Link
                      key={d.href}
                      href={d.href}
                      className={`inline-flex min-h-11 items-center border-[2px] border-[#0a0a0a] px-4 text-sm font-bold ${d.destacado ? "bg-[#0a0a0a] text-white" : "bg-white text-[#0a0a0a] hover:bg-[#f5f5f5]"}`}
                    >
                      {d.label}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="grid gap-2.5 sm:grid-cols-2">
                <Link href="/logistica/cuanto-cuesta-viajar-japon" className="flex flex-col gap-1 border-[2px] border-[#0a0a0a] p-3.5 hover:bg-[#f5f5f5]">
                  <span className="text-[15px] font-bold text-[#0a0a0a]">2 · ¿Cuánto cuesta?</span>
                  <span className="text-[13px] text-fg-muted">De 40 a 215 € al día en destino</span>
                </Link>
                <Link href="/herramientas/jr-pass-calculadora" className="flex flex-col gap-1 border-[2px] border-[#0a0a0a] bg-[#d32f2f] p-3.5 text-white hover:bg-[#b71c1c]">
                  <span className="text-[15px] font-black">3 · ¿Me compensa el JR Pass?</span>
                  <span className="text-[13px]">Calcúlalo con tu ruta →</span>
                </Link>
              </div>
            </div>
          </div>
          <figure className="relative m-0 min-h-[360px] border-t-[3px] border-[#0a0a0a] lg:min-h-[560px] lg:border-l-[3px] lg:border-t-0">
            <Image
              src={`${P}asakusa-pagoda-sensoji.jpg`}
              alt="La pagoda de cinco pisos de Senso-ji con un ginkgo amarillo, en Asakusa"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 600px"
              className="object-cover object-[center_30%]"
            />
            <figcaption className="kicker absolute bottom-4 left-4 border-[2px] border-[#0a0a0a] bg-white px-2.5 py-1.5 text-[11px] text-[#0a0a0a]">
              Senso-ji, Asakusa · foto de nuestro viaje, dic. 2025
            </figcaption>
          </figure>
        </div>
      </section>

      {/* ══════════ QUIÉN ESCRIBE ══════════ */}
      <section className="bg-[#0a0a0a] text-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-7 gap-y-4 px-4 py-6">
          <div className="flex">
            <Image src="/avatares/sergio.webp" alt={SITE.author.name} width={52} height={52} className="size-13 rounded-full border-[2px] border-white object-cover" />
            <Image src="/avatares/madre-foto.webp" alt="Su madre, compañera de viaje" width={52} height={52} className="-ml-3.5 size-13 rounded-full border-[2px] border-white object-cover" />
          </div>
          <p className="min-w-0 flex-[1_1_420px] text-[15px] leading-relaxed text-white/90">
            <strong className="text-white">{SITE.author.name}</strong> y su madre recorrieron Japón en diciembre de 2025.
            Aquí cuentan lo que funcionó, lo que pagaron y lo que harían distinto; las cifras se contrastan con fuentes oficiales.
          </p>
          <Link href="/sobre-nosotros" className="kicker border-b-[2px] border-[#e1352e] pb-0.5 text-white">
            Nuestro viaje →
          </Link>
        </div>
      </section>

      {/* ══════════ LO MÁS LEÍDO ══════════ */}
      <section className="mx-auto max-w-7xl px-4 pb-6 pt-12 sm:pt-14">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <h2 className="text-3xl font-black text-[#0a0a0a] sm:text-[34px]">Lo que más se lee este mes</h2>
          <Link href="/logistica" className="kicker text-primary">Todas las guías →</Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Link href="/itinerarios/itinerario-japon-1-mes" className={`${card} flex flex-col sm:col-span-2 lg:col-span-1 lg:row-span-2`}>
            <span className="relative block h-60 border-b-[3px] border-[#0a0a0a] sm:h-72 lg:h-80">
              <Image src={`${P}kioto-higashiyama-noche.jpg`} alt="Calle de Higashiyama de noche con la pagoda Yasaka al fondo" fill sizes="(max-width: 1024px) 100vw, 420px" className="object-cover" />
            </span>
            <span className="flex flex-col gap-2 p-5">
              <span className="kicker text-primary">Itinerario · 30 días</span>
              <span className="text-2xl font-black leading-tight text-[#0a0a0a]">Un mes en Japón: el itinerario completo, semana a semana</span>
              <span className="text-[15px] leading-relaxed text-fg-muted">Cuatro bases fijas, presupuesto del mes y por qué el JR Pass de 21 días no compensa.</span>
            </span>
          </Link>
          {MAS_LEIDO.map((a) => (
            <Link key={a.href} href={a.href} className={`${card} flex flex-col gap-2 p-5`}>
              <span className="kicker text-primary">{a.kicker}</span>
              <span className="text-xl font-black leading-snug text-[#0a0a0a]">{a.title}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ══════════ HERRAMIENTAS ══════════ */}
      <section className="mx-auto max-w-7xl px-4 py-10">
        <h2 className="text-3xl font-black text-[#0a0a0a] sm:text-[34px]">Herramientas que no encontrarás en otras guías</h2>
        <p className="mb-5 mt-1.5 text-base text-fg-muted">Gratis y sin registro. Hacen las cuentas por ti.</p>
        <div className="grid gap-4 md:grid-cols-3">
          {HERRAMIENTAS.map(({ Icon, ...h }) => (
            <Link key={h.href} href={h.href} className={`${card} flex flex-col gap-2.5 p-6 ${h.destacado ? "bg-[#fff5f4]" : ""}`}>
              <Icon className={h.destacado ? "text-[#b71c1c]" : "text-[#0a0a0a]"} size={30} strokeWidth={2} aria-hidden="true" />
              <span className="text-lg font-black text-[#0a0a0a]">{h.title}</span>
              <span className="text-sm leading-relaxed text-fg-muted">{h.desc}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ══════════ ITINERARIOS ══════════ */}
      <section className="border-y-[3px] border-[#0a0a0a] bg-[#f5f5f5]">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <h2 className="text-3xl font-black text-[#0a0a0a] sm:text-[34px]">Itinerarios día a día</h2>
            <Link href="/itinerarios" className="kicker text-primary">Todos los itinerarios →</Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {ITIN.map((it) => (
              <Link key={it.href} href={it.href} className={`${card} flex flex-col`}>
                <span className="relative block h-40 border-b-[3px] border-[#0a0a0a]">
                  <Image src={it.img} alt={it.alt} fill sizes="(max-width: 640px) 100vw, 300px" className="object-cover" />
                </span>
                <span className="flex flex-col gap-1 p-4">
                  <span className="kicker text-primary">{it.badge}</span>
                  <span className="text-lg font-black text-[#0a0a0a]">{it.title}</span>
                  <span className="text-[13px] text-fg-muted">{it.ruta}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ DESTINOS ══════════ */}
      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <h2 className="text-3xl font-black text-[#0a0a0a] sm:text-[34px]">Las tres ciudades del primer viaje</h2>
          <Link href="/destinos" className="kicker text-primary">Más destinos →</Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {DESTINOS.map((d) => (
            <Link key={d.href} href={d.href} className={`${card} flex flex-col`}>
              <span className="relative block h-56 border-b-[3px] border-[#0a0a0a]">
                <Image src={d.img} alt={d.alt} fill sizes="(max-width: 768px) 100vw, 400px" className="object-cover" />
              </span>
              <span className="flex items-center justify-between gap-3 p-4">
                <span>
                  <span className="block text-xl font-black text-[#0a0a0a]">{d.title}</span>
                  <span className="text-sm text-fg-muted">{d.desc}</span>
                </span>
                <ArrowRight size={20} className="shrink-0 text-[#0a0a0a]" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ══════════ DÓNDE DORMIR ══════════ */}
      <section className="mx-auto max-w-7xl px-4 pb-12">
        <h2 className="text-3xl font-black text-[#0a0a0a] sm:text-[34px]">¿Dónde dormir?</h2>
        <p className="mb-5 mt-1.5 text-base text-fg-muted">La decisión que más te cambia el viaje: zonas, para quién es cada una y qué renuncias.</p>
        <div className="grid gap-4 md:grid-cols-2">
          {DORMIR.map((d) => (
            <Link key={d.href} href={d.href} className={`${card} flex min-h-40`}>
              <span className="relative block w-2/5 shrink-0 border-r-[3px] border-[#0a0a0a]">
                <Image src={d.img} alt={d.alt} fill sizes="(max-width: 768px) 40vw, 240px" className="object-cover" />
              </span>
              <span className="flex flex-col justify-center gap-1.5 p-4 sm:p-5">
                <span className="kicker text-primary">{d.kicker}</span>
                <span className="text-lg font-black leading-snug text-[#0a0a0a] sm:text-xl">{d.title}</span>
                <span className="text-sm text-fg-muted">{d.desc}</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ══════════ POR QUÉ ESTA GUÍA ══════════ */}
      <section className="border-t-[3px] border-[#0a0a0a]">
        <div className="mx-auto flex max-w-3xl flex-col gap-4 px-4 py-14">
          <p className="kicker text-primary">Por qué esta guía</p>
          <h2 className="text-3xl font-black leading-tight text-[#0a0a0a]">Lo que necesitas decidir, en el orden en que lo vas a decidir</h2>
          <p className="text-[17px] leading-relaxed text-[#333]">
            La guía de viaje a Japón que nos habría gustado tener. Planificar Japón no es elegir templos: es decidir
            cuántos días, dónde dormir, si el JR Pass compensa y cuánto dinero llevar. Por eso está ordenada así. Cada
            cifra (pases, trenes, cambio del yen) se revisa contra la fuente oficial y lleva su fecha; cuando algo
            cambia, como el Tax Free el 1 de noviembre de 2026, lo actualizamos.
          </p>
          <p className="text-[17px] leading-relaxed text-[#333]">
            Y cuando contamos algo en primera persona es porque lo vivimos en nuestro viaje de diciembre de 2025: el
            ryokan de Kioto, el castillo de Himeji casi vacío o la iluminación nocturna de Kiyomizu-dera.
          </p>
          <Link href="/politica-editorial" className="kicker text-primary">Cómo trabajamos →</Link>
        </div>
      </section>

      {/* ══════════ NEWSLETTER (solo si hay proveedor configurado) ══════════ */}
      <NewsletterGate>
        <section className="bg-[#0a0a0a] py-8 sm:py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-5">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-12">
              <div>
                <span className="tag-manga">Newsletter</span>
                <h2 className="display-md mt-4 text-2xl text-white sm:text-3xl lg:text-4xl">¿Planificando tu viaje?</h2>
                <p className="mt-2 text-sm text-white/70">Checklist, consejos y novedades. Sin spam.</p>
              </div>
              <div className="flex items-center">
                <NewsletterForm source="home" />
              </div>
            </div>
          </div>
        </section>
      </NewsletterGate>
    </main>
  );
}
