import type { Metadata } from "next";
import { withSocial } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FlightQuoteForm } from "./FlightQuoteForm";

export const metadata: Metadata = {
  ...withSocial("/vuelos-japon", {
    title: "Solicitar presupuesto de vuelos a Japón",
    description: "Solicita una propuesta personalizada para volar a Japón según tus fechas, equipaje y aeropuerto de salida. Sin compromiso.",
    alternates: { canonical: "/vuelos-japon" },
  }),
  // No indexar hasta que el acuerdo comercial, el circuito de datos y la recepción
  // de presupuestos estén formalizados. No se anuncia como servicio operativo.
  robots: { index: false, follow: true },
};

export default function VuelosJaponPage() {
  return (
    <article className="mx-auto max-w-5xl px-4 py-10 sm:py-14">
      <Breadcrumbs items={[
        { name: "Inicio", href: "/" },
        { name: "Presupuesto de vuelos a Japón", href: "/vuelos-japon" },
      ]} />
      <div className="mt-6 max-w-3xl">
        <p className="kicker text-primary">ViajaJapón · En preparación</p>
        <h1 className="mt-3 text-balance text-4xl font-black leading-tight sm:text-5xl">¿Buscas vuelos a Japón? Cuéntanos tu viaje</h1>
        <p className="mt-4 text-lg leading-relaxed text-fg-muted">Estamos preparando un servicio de presupuestos personalizados. Cuando esté disponible, podrás consultar opciones con tus fechas, equipaje y preferencias, sin pagar nada por enviar la solicitud.</p>
      </div>
      <div className="mt-9 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_240px]">
        <FlightQuoteForm />
        <aside className="space-y-5">
          <section className="border-[3px] border-[#0a0a0a] bg-[#f5f5f5] p-4">
            <h2 className="text-lg font-black">Así funcionará</h2>
            <ol className="mt-3 list-decimal space-y-3 pl-5 text-sm leading-relaxed text-fg-muted">
              <li>Nos indicas la ruta, fechas y preferencias.</li>
              <li>Revisamos tu solicitud y, si es viable, buscamos una propuesta.</li>
              <li>Recibes las condiciones y el precio final antes de decidir.</li>
            </ol>
          </section>
          <p className="text-xs leading-relaxed text-fg-muted">No somos una aerolínea. Este formulario no muestra precios en tiempo real, no emite billetes y no procesa pagos. Las solicitudes solo se habilitarán cuando el servicio esté preparado.</p>
        </aside>
      </div>
    </article>
  );
}
