import Image from "next/image";
import Link from "next/link";
import type { ComponentProps } from "react";
import {
  ArrowRight,
  Baby,
  Beer,
  Building2,
  Bus,
  CalendarDays,
  Camera,
  Check,
  ChevronDown,
  Clock,
  CreditCard,
  CupSoda,
  Info,
  JapaneseYen,
  Landmark,
  Leaf,
  Lightbulb,
  Map,
  MapPin,
  Moon,
  Shield,
  Mountain,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Star,
  Sun,
  Ticket,
  TrainFront,
  TreePine,
  TriangleAlert,
  Users,
  UtensilsCrossed,
  Wallet,
  Wifi,
  X,
  type LucideIcon,
} from "lucide-react";
import { AffiliateBox } from "./AffiliateBox";
import { Charla } from "./Charla";
import { PackingChecklist } from "./PackingChecklist";
import { JsonLd } from "./JsonLd";
import { RelatedArticles } from "./RelatedArticles";
import { faqLd } from "@/lib/jsonld";

/** Id de ancla a partir del texto del encabezado (sin tildes, kebab-case). */
function slugify(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function headingText(children: React.ReactNode): string {
  if (typeof children === "string") return children;
  if (Array.isArray(children)) return children.map(headingText).join("");
  return "";
}

/** CTA reutilizable a la calculadora (para usar dentro de los MDX). */
export function CalculatorCTA() {
  return (
    <div className="my-6 rounded-lg border border-secondary/30 bg-secondary/5 p-5">
      <p className="font-semibold text-fg">Calcúlalo con tu ruta exacta</p>
      <p className="mt-1 text-sm text-fg-muted">La calculadora suma tus billetes reales y los compara con el pase, en euros.</p>
      <Link
        href="/herramientas/jr-pass-calculadora"
        className="mt-3 inline-flex rounded-sm bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-strong"
      >
        Abrir la calculadora →
      </Link>
    </div>
  );
}

/** Bloque de experiencia real del autor (E-E-A-T). Rellénalo con tu vivencia + foto. */
export function AuthorNote({ children }: { children: React.ReactNode }) {
  return <aside className="my-8 border-l-2 border-primary pl-4 italic text-fg-muted">{children}</aside>;
}

/** Índice de la guía: enlaces de ancla a los h2 (los ids se generan solos del texto). */
export function Toc({ items }: { items: { href: string; label: string }[] }) {
  return (
    <nav aria-label="En esta guía" className="my-6 rounded-lg border border-border bg-muted/60 p-5">
      <p className="kicker text-fg-muted">En esta guía</p>
      <ul className="mt-2 grid gap-1.5 sm:grid-cols-2">
        {items.map((i) => (
          <li key={i.href}>
            <a href={i.href} className="text-sm font-medium text-primary underline-offset-2 hover:underline">{i.label}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/** Ficha de datos clave al inicio del artículo (respuesta rápida / AEO). */
export function KeyFacts({ items }: { items: { label: string; value: string }[] }) {
  return (
    <div className="nums my-6 grid gap-x-6 gap-y-4 rounded-lg border border-border bg-muted/60 p-5 sm:grid-cols-2">
      {items.map((f) => (
        <div key={f.label}>
          <p className="kicker text-fg-muted">{f.label}</p>
          <p className="mt-0.5 font-semibold text-fg">{f.value}</p>
        </div>
      ))}
    </div>
  );
}

const INFOBOX_VARIANTS = {
  info: { Icon: Info, frame: "border-secondary/40 bg-secondary/5", icon: "text-secondary" },
  consejo: { Icon: Lightbulb, frame: "border-success/40 bg-success/5", icon: "text-success" },
  aviso: { Icon: TriangleAlert, frame: "border-primary/40 bg-primary/5", icon: "text-primary" },
} as const;

/** Caja destacada: variant "info" (azul), "consejo" (verde) o "aviso" (rojo). */
export function InfoBox({
  variant = "info",
  title,
  children,
}: {
  variant?: keyof typeof INFOBOX_VARIANTS;
  title?: string;
  children: React.ReactNode;
}) {
  const v = INFOBOX_VARIANTS[variant] ?? INFOBOX_VARIANTS.info;
  return (
    <aside className={`my-6 flex gap-3 rounded-lg border p-4 ${v.frame}`}>
      <v.Icon size={20} className={`mt-0.5 shrink-0 ${v.icon}`} aria-hidden="true" />
      <div className="min-w-0 text-sm leading-relaxed text-fg-muted [&>p]:mt-2 [&>p:first-child]:mt-0">
        {title && <p className="font-semibold text-fg">{title}</p>}
        {children}
      </div>
    </aside>
  );
}

/** Proceso numerado paso a paso. */
export function Steps({ items }: { items: { titulo: string; texto: string }[] }) {
  return (
    <ol className="my-6 space-y-4">
      {items.map((s, i) => (
        <li key={s.titulo} className="flex gap-4">
          <span aria-hidden="true" className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
            {i + 1}
          </span>
          <div className="min-w-0">
            <p className="font-semibold text-fg">{s.titulo}</p>
            {s.texto && <p className="mt-0.5 text-sm leading-relaxed text-fg-muted">{s.texto}</p>}
          </div>
        </li>
      ))}
    </ol>
  );
}

/**
 * Foto dentro del artículo, con pie y crédito de licencia (obligatorio para
 * imágenes CC de Wikimedia Commons; en fotos propias basta el caption).
 */
export function Foto({
  src,
  alt,
  caption,
  credito,
}: {
  src: string;
  alt: string;
  caption?: string;
  credito?: string;
}) {
  return (
    <figure className="my-6">
      <div className="relative aspect-video overflow-hidden rounded-lg bg-muted">
        <Image src={src} alt={alt} fill sizes="(max-width: 768px) 100vw, 768px" className="object-cover" />
      </div>
      {(caption || credito) && (
        <figcaption className="mt-2 text-xs text-fg-muted">
          {caption}
          {caption && credito ? " · " : ""}
          {credito && <>Foto: {credito}</>}
        </figcaption>
      )}
    </figure>
  );
}

/** Ruta del itinerario por etapas: timeline vertical numerado. */
export function RouteStops({ items }: { items: { ciudad: string; dias: string; nota?: string }[] }) {
  return (
    <ol className="my-6 space-y-0">
      {items.map((s, i) => (
        <li key={s.ciudad + i} className="relative flex gap-4 pb-6 last:pb-0">
          {i < items.length - 1 && (
            <span aria-hidden="true" className="absolute left-4 top-9 h-[calc(100%-1.75rem)] w-px -translate-x-1/2 bg-border" />
          )}
          <span aria-hidden="true" className="z-10 flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
            {i + 1}
          </span>
          <div className="min-w-0 pt-1">
            <p className="font-semibold text-fg">
              {s.ciudad} <span className="nums ml-1 font-normal text-fg-muted">· {s.dias}</span>
            </p>
            {s.nota && <p className="mt-0.5 text-sm leading-relaxed text-fg-muted">{s.nota}</p>}
          </div>
        </li>
      ))}
    </ol>
  );
}

/** Día del itinerario en acordeón nativo (details). El contenido va como markdown hijo. */
export function ItineraryDay({
  dia,
  titulo,
  ciudad,
  abierto = false,
  children,
}: {
  dia: number;
  titulo: string;
  ciudad: string;
  abierto?: boolean;
  children: React.ReactNode;
}) {
  return (
    <details open={abierto || undefined} className="group my-3 overflow-hidden rounded-lg border border-border bg-surface">
      <summary className="flex cursor-pointer list-none items-center gap-4 px-5 py-4 [&::-webkit-details-marker]:hidden">
        <span aria-hidden="true" className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
          {dia}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block font-semibold leading-snug text-fg">{titulo}</span>
          <span className="mt-0.5 block text-xs uppercase tracking-wider text-fg-muted">{ciudad}</span>
        </span>
        <ChevronDown size={18} className="shrink-0 text-fg-muted transition-transform group-open:rotate-180" aria-hidden="true" />
      </summary>
      <div className="border-t border-border px-5 pb-5 [&>p]:mt-3 [&>ul]:mt-3">{children}</div>
    </details>
  );
}

/** Preguntas frecuentes en acordeón nativo (details/summary: accesible, sin JS). */
export function FAQ({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="my-6 overflow-hidden rounded-lg border border-border bg-surface">
      {items.map((f) => (
        <details key={f.q} className="group border-b border-border last:border-b-0">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-semibold text-fg [&::-webkit-details-marker]:hidden">
            {f.q}
            <ChevronDown size={18} className="shrink-0 text-fg-muted transition-transform group-open:rotate-180" aria-hidden="true" />
          </summary>
          <p className="px-5 pb-5 text-sm leading-relaxed text-fg-muted">{f.a}</p>
        </details>
      ))}
      {/* FAQPage structured data → rich result de preguntas en Google */}
      <JsonLd data={faqLd(items)} />
    </div>
  );
}

/* ============================================================================
 * Kit de tarjetas (lenguaje visual de los mockups): grids de cards con foto,
 * stat-cards con icono, comparativas, do/don't y banda CTA. Todos "sangran"
 * más anchos que la columna de texto en pantallas grandes (BLEED) para que el
 * artículo respire como una landing y no como un documento.
 * ========================================================================== */

const BLEED = "lg:-mx-24 xl:-mx-44";

/** Iconos disponibles en los componentes MDX por nombre (clave en español). */
const ICONOS: Record<string, LucideIcon> = {
  reloj: Clock, yen: JapaneseYen, pin: MapPin, tren: TrainFront, bus: Bus,
  calendario: CalendarDays, estrella: Star, camara: Camera, montana: Mountain,
  comida: UtensilsCrossed, cerveza: Beer, te: CupSoda, hoja: Leaf, arbol: TreePine,
  sol: Sun, luna: Moon, personas: Users, edificio: Building2, templo: Landmark,
  ticket: Ticket, brillo: Sparkles, mapa: Map, cartera: Wallet, tarjeta: CreditCard,
  movil: Smartphone, info: Info, ninos: Baby, compras: ShoppingBag, escudo: Shield, wifi: Wifi,
};

function Icono({ nombre, className }: { nombre?: string; className?: string }) {
  const I = (nombre && ICONOS[nombre]) || Sparkles;
  return <I size={18} className={className} aria-hidden="true" />;
}

const TAG_STYLES = [
  "bg-red-100 text-red-800",
  "bg-blue-100 text-blue-800",
  "bg-green-100 text-green-800",
  "bg-purple-100 text-purple-800",
  "bg-amber-100 text-amber-800",
  "bg-pink-100 text-pink-800",
] as const;

/** Fila de tarjetas de datos clave con icono (cabeceras tipo mockup). */
export function StatCards({ items }: { items: { icon?: string; label: string; value: string; sub?: string }[] }) {
  return (
    <div className={`my-8 grid grid-cols-2 gap-4 lg:grid-cols-4 ${BLEED}`}>
      {items.map((s) => (
        <div key={s.label} className="rounded-xl border border-border bg-gradient-to-br from-muted/70 to-surface p-5 text-center shadow-sm">
          <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Icono nombre={s.icon} />
          </div>
          <p className="kicker text-fg-muted">{s.label}</p>
          <p className="nums mt-1 text-xl font-bold leading-tight text-primary">{s.value}</p>
          {s.sub && <p className="mt-1 text-xs text-fg-muted">{s.sub}</p>}
        </div>
      ))}
    </div>
  );
}

interface CardItem {
  title: string;
  desc: string;
  img?: string;
  alt?: string;
  credito?: string;
  jp?: string;
  tags?: string[];
  datos?: { icon?: string; texto: string }[];
  puntos?: string[];
  href?: string;
  cta?: string;
}

/**
 * Grid de tarjetas con foto, chips y filas de datos (el bloque estrella de los
 * mockups). El título de cada tarjeta es un h3 real con ancla (SEO intacto).
 */
export function Cards({ items, cols = 2 }: { items: CardItem[]; cols?: 2 | 3 }) {
  return (
    <div className={`my-8 grid gap-6 md:grid-cols-2 ${cols === 3 ? "lg:grid-cols-3" : ""} ${BLEED}`}>
      {items.map((c) => (
        <div key={c.title} className="group flex flex-col overflow-hidden rounded-xl border border-border bg-surface shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
          {c.img && (
            <div className="relative h-48 shrink-0 overflow-hidden">
              <Image src={c.img} alt={c.alt ?? c.title} fill sizes="(max-width:768px) 100vw, 420px" className="object-cover transition-transform duration-500 group-hover:scale-105" />
              {c.credito && (
                <span className="absolute bottom-1 right-1 rounded bg-black/55 px-1.5 py-0.5 text-[10px] leading-none text-white/90">
                  Foto: {c.credito}
                </span>
              )}
            </div>
          )}
          <div className="flex flex-1 flex-col p-6">
            <div className="flex items-start justify-between gap-3">
              <h3 id={slugify(c.title) || undefined} className="scroll-mt-24 text-lg font-bold leading-snug">{c.title}</h3>
              {c.jp && <span className="shrink-0 rounded-full bg-muted px-3 py-1 text-sm text-fg-muted">{c.jp}</span>}
            </div>
            <p className="mt-2 text-sm leading-relaxed text-fg-muted">{c.desc}</p>
            {c.tags && c.tags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {c.tags.map((t, i) => (
                  <span key={t} className={`rounded-full px-2.5 py-1 text-xs font-medium ${TAG_STYLES[i % TAG_STYLES.length]}`}>{t}</span>
                ))}
              </div>
            )}
            {c.puntos && c.puntos.length > 0 && (
              <ul className="mt-3 space-y-1.5">
                {c.puntos.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-sm text-fg-muted">
                    <Check size={15} className="mt-0.5 shrink-0 text-success" aria-hidden="true" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            )}
            {c.datos && c.datos.length > 0 && (
              <div className="mt-4 space-y-2 border-t border-border pt-4">
                {c.datos.map((d) => (
                  <div key={d.texto} className="flex items-start gap-2 text-sm text-fg-muted">
                    <Icono nombre={d.icon} className="mt-0.5 shrink-0 text-primary" />
                    <span>{d.texto}</span>
                  </div>
                ))}
              </div>
            )}
            {c.href && (
              <Link href={c.href} className="mt-4 inline-flex items-center gap-1.5 pt-1 text-sm font-semibold text-primary group-hover:underline">
                {c.cta ?? "Ver guía"} <ArrowRight size={15} aria-hidden="true" />
              </Link>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

/** Tarjetas comparativas (mirador A vs B vs C, pases, parques...). */
export function VsCards({ items }: { items: { title: string; badge?: string; precio?: string; destacado?: boolean; puntos: string[]; nota?: string }[] }) {
  return (
    <div className={`my-8 grid gap-6 md:grid-cols-3 ${BLEED}`}>
      {items.map((v) => (
        <div key={v.title} className={`relative flex flex-col rounded-xl border bg-surface p-6 shadow-sm ${v.destacado ? "border-2 border-primary" : "border-border"}`}>
          {v.badge && (
            <span className={`absolute -top-3 left-5 rounded-full px-3 py-1 text-xs font-bold ${v.destacado ? "bg-primary text-white" : "bg-muted text-fg-muted"}`}>
              {v.badge}
            </span>
          )}
          <h3 className="mt-1 text-lg font-bold">{v.title}</h3>
          {v.precio && <p className="nums mt-2 text-xl font-bold text-primary">{v.precio}</p>}
          <ul className="mt-4 flex-1 space-y-2">
            {v.puntos.map((p) => (
              <li key={p} className="flex items-start gap-2 text-sm text-fg-muted">
                <Check size={15} className="mt-0.5 shrink-0 text-success" aria-hidden="true" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
          {v.nota && <p className="mt-4 border-t border-border pt-3 text-xs text-fg-muted">{v.nota}</p>}
        </div>
      ))}
    </div>
  );
}

const COMPARATIVA_COLORS = {
  secondary: "bg-secondary/10 text-secondary",
  success: "bg-success/10 text-success",
  amber: "bg-amber-100 text-amber-700",
  primary: "bg-primary/10 text-primary",
} as const;

/**
 * Matriz comparativa tipo mockup: cabeceras con icono en círculo de color, filas
 * de característica (valor + subtítulo gris) y, opcionalmente, dos filas finales
 * de ✓ ventajas / ✗ inconvenientes por columna. En móvil hace scroll horizontal
 * (la matriz es ancha por diseño); en escritorio sangra a lo ancho (BLEED).
 */
export function Comparativa({
  caption,
  columnas,
  filas,
  ventajas,
  inconvenientes,
}: {
  caption?: string;
  columnas: { title: string; icon?: string; color?: keyof typeof COMPARATIVA_COLORS }[];
  filas: { label: string; valores: { value: string; sub?: string }[] }[];
  ventajas?: string[][];
  inconvenientes?: string[][];
}) {
  return (
    <figure className={`my-8 ${BLEED}`}>
      {caption && <figcaption className="mb-5 text-center text-xl font-bold text-fg sm:text-2xl">{caption}</figcaption>}
      <div className="overflow-x-auto rounded-2xl border border-border bg-surface shadow-sm">
        <table className="w-full min-w-[620px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/40">
              <th className="p-4 text-left align-bottom font-bold text-fg">Características</th>
              {columnas.map((c) => (
                <th key={c.title} className="p-4 text-center align-bottom font-bold text-fg">
                  <span className={`mx-auto mb-2 flex size-11 items-center justify-center rounded-full ${COMPARATIVA_COLORS[c.color ?? "secondary"]}`}>
                    <Icono nombre={c.icon} />
                  </span>
                  {c.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filas.map((f) => (
              <tr key={f.label} className="border-b border-border">
                <th scope="row" className="p-4 text-left font-semibold text-fg">{f.label}</th>
                {f.valores.map((v, i) => (
                  <td key={i} className="p-4 text-center align-top">
                    <span className="block font-semibold text-fg">{v.value}</span>
                    {v.sub && <span className="mt-0.5 block text-xs text-fg-muted">{v.sub}</span>}
                  </td>
                ))}
              </tr>
            ))}
            {ventajas && (
              <tr className="border-b border-border">
                <th scope="row" className="p-4 text-left align-top font-semibold text-fg">Principales ventajas</th>
                {ventajas.map((items, i) => (
                  <td key={i} className="p-4 align-top">
                    <ul className="space-y-1.5 text-left">
                      {items.map((it) => (
                        <li key={it} className="flex items-start gap-1.5 text-xs text-fg-muted">
                          <Check size={14} className="mt-0.5 shrink-0 text-success" aria-hidden="true" />
                          <span>{it}</span>
                        </li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>
            )}
            {inconvenientes && (
              <tr>
                <th scope="row" className="p-4 text-left align-top font-semibold text-fg">Principales inconvenientes</th>
                {inconvenientes.map((items, i) => (
                  <td key={i} className="p-4 align-top">
                    <ul className="space-y-1.5 text-left">
                      {items.map((it) => (
                        <li key={it} className="flex items-start gap-1.5 text-xs text-fg-muted">
                          <X size={14} className="mt-0.5 shrink-0 text-primary" aria-hidden="true" />
                          <span>{it}</span>
                        </li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </figure>
  );
}

/** Dos columnas qué hacer / qué evitar (etiqueta, normas...). */
export function DoDont({ hacer, evitar }: { hacer: { titulo: string; texto?: string }[]; evitar: { titulo: string; texto?: string }[] }) {
  const col = (items: { titulo: string; texto?: string }[], ok: boolean) => (
    <div className="rounded-xl border border-border bg-surface p-6 shadow-sm">
      <div className="mb-4 flex items-center gap-3">
        <span className={`flex size-10 items-center justify-center rounded-full ${ok ? "bg-success/10 text-success" : "bg-primary/10 text-primary"}`}>
          {ok ? <Check size={20} aria-hidden="true" /> : <X size={20} aria-hidden="true" />}
        </span>
        <h3 className="text-lg font-bold">{ok ? "Qué hacer" : "Qué evitar"}</h3>
      </div>
      <ul className="space-y-3">
        {items.map((i) => (
          <li key={i.titulo} className="flex items-start gap-2">
            {ok ? <Check size={15} className="mt-1 shrink-0 text-success" aria-hidden="true" /> : <X size={15} className="mt-1 shrink-0 text-primary" aria-hidden="true" />}
            <div>
              <p className="text-sm font-semibold text-fg">{i.titulo}</p>
              {i.texto && <p className="text-sm text-fg-muted">{i.texto}</p>}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
  return (
    <div className={`my-8 grid gap-6 md:grid-cols-2 ${BLEED}`}>
      {col(hacer, true)}
      {col(evitar, false)}
    </div>
  );
}

/** Banda CTA degradada de cierre de sección (como el final de los mockups). */
export function CTABand({ title, texto, href, cta, href2, cta2 }: { title: string; texto?: string; href: string; cta: string; href2?: string; cta2?: string }) {
  return (
    <div className={`my-10 rounded-2xl bg-gradient-to-br from-primary to-primary-strong p-8 text-center text-white shadow-lg sm:p-12 ${BLEED}`}>
      <p className="text-balance text-2xl font-bold sm:text-3xl">{title}</p>
      {texto && <p className="mx-auto mt-3 max-w-xl text-pretty text-white/90">{texto}</p>}
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link href={href} className="rounded-md bg-white px-6 py-3 font-semibold text-primary transition-colors hover:bg-gray-100">
          {cta}
        </Link>
        {href2 && cta2 && (
          <Link href={href2} className="rounded-md border-2 border-white/80 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10">
            {cta2}
          </Link>
        )}
      </div>
    </div>
  );
}

interface AcordeonItem {
  icon?: string;
  title: string;
  sub?: string;
  intro?: string;
  puntos?: string[];
  href?: string;
  cta?: string;
  abierto?: boolean;
}

/**
 * Acordeón de secciones (patrón del mockup de Preparativos): icono en cuadrado de
 * color + título + subtítulo, desplegable a un resumen con puntos y enlace a la
 * guía completa. Native <details> (accesible, sin JS). El tinte del icono alterna
 * rojo/azul como en el mockup.
 */
export function Acordeon({ items }: { items: AcordeonItem[] }) {
  return (
    <div className={`my-8 space-y-3 ${BLEED}`}>
      {items.map((it, i) => {
        const tint = i % 2 === 0 ? "bg-primary/10 text-primary" : "bg-secondary/10 text-secondary";
        return (
          <details key={it.title} open={it.abierto || undefined} className="group overflow-hidden rounded-xl border border-border bg-surface shadow-sm">
            <summary className="flex cursor-pointer list-none items-center gap-4 p-4 [&::-webkit-details-marker]:hidden">
              <span className={`flex size-12 shrink-0 items-center justify-center rounded-xl ${tint}`}>
                <Icono nombre={it.icon} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-bold leading-snug text-fg">{it.title}</span>
                {it.sub && <span className="mt-0.5 block text-sm text-fg-muted">{it.sub}</span>}
              </span>
              <ChevronDown size={20} className="shrink-0 text-fg-muted transition-transform group-open:rotate-180" aria-hidden="true" />
            </summary>
            <div className="border-t border-border px-4 pb-5 pt-4 sm:px-5">
              {it.intro && <p className="text-sm leading-relaxed text-fg-muted">{it.intro}</p>}
              {it.puntos && it.puntos.length > 0 && (
                <ul className="mt-3 space-y-2">
                  {it.puntos.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-sm text-fg-muted">
                      <Check size={15} className="mt-0.5 shrink-0 text-success" aria-hidden="true" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              )}
              {it.href && (
                <Link href={it.href} className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
                  {it.cta ?? "Leer la guía completa"} <ArrowRight size={15} aria-hidden="true" />
                </Link>
              )}
            </div>
          </details>
        );
      })}
    </div>
  );
}

export const mdxComponents = {
  h2: ({ children, ...p }: ComponentProps<"h2">) => (
    <h2 id={slugify(headingText(children)) || undefined} className="mt-10 scroll-mt-24 text-2xl font-bold" {...p}>
      {children}
    </h2>
  ),
  h3: ({ children, ...p }: ComponentProps<"h3">) => (
    <h3 id={slugify(headingText(children)) || undefined} className="mt-6 scroll-mt-24 text-xl font-bold" {...p}>
      {children}
    </h3>
  ),
  p: (p: ComponentProps<"p">) => <p className="mt-4 leading-relaxed text-fg-muted" {...p} />,
  ul: (p: ComponentProps<"ul">) => <ul className="mt-4 list-disc space-y-1 pl-5 text-fg-muted" {...p} />,
  ol: (p: ComponentProps<"ol">) => <ol className="mt-4 list-decimal space-y-1 pl-5 text-fg-muted" {...p} />,
  a: ({ href, ...p }: ComponentProps<"a">) => {
    const h = href ?? "#";
    // Enlaces internos (rutas propias o anclas) → next/link para navegación SPA.
    const isInternal = h.startsWith("/") || h.startsWith("#");
    if (isInternal) {
      return <Link href={h} className="text-primary underline-offset-2 hover:underline" {...p} />;
    }
    // Enlaces externos → nueva pestaña + rel sponsored/nofollow (cumple Google y disclosure de afiliados).
    return (
      <a
        href={h}
        target="_blank"
        rel="sponsored nofollow noopener noreferrer"
        className="text-primary underline-offset-2 hover:underline"
        {...p}
      />
    );
  },
  strong: (p: ComponentProps<"strong">) => <strong className="font-semibold text-fg" {...p} />,
  table: (p: ComponentProps<"table">) => (
    <div className="mt-4 overflow-x-auto rounded-lg border border-border">
      <table className="nums w-full text-sm" {...p} />
    </div>
  ),
  thead: (p: ComponentProps<"thead">) => <thead className="bg-muted text-left" {...p} />,
  th: (p: ComponentProps<"th">) => <th className="border-b border-border px-4 py-2 font-medium" {...p} />,
  td: (p: ComponentProps<"td">) => <td className="border-b border-border px-4 py-2" {...p} />,
  AffiliateBox,
  CalculatorCTA,
  AuthorNote,
  Toc,
  KeyFacts,
  InfoBox,
  Steps,
  FAQ,
  RouteStops,
  ItineraryDay,
  PackingChecklist,
  Foto,
  Charla,
  StatCards,
  Cards,
  VsCards,
  Comparativa,
  Acordeon,
  DoDont,
  CTABand,
  RelatedArticles,
};
