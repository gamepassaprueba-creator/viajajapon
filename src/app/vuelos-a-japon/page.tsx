import type { Metadata } from "next";
import Link from "next/link";
import { withSocial } from "@/lib/seo";
import { VUELOS, telegramHref, whatsappHref } from "@/data/vuelos";
import { VuelosForm } from "./VuelosForm";
import { DirectoLink } from "./DirectoLink";

// Servicio APAGADO hasta que el titular lo active (ver src/data/vuelos.ts). Mientras tanto la
// página no se indexa, no está en el sitemap y ninguna guía enlaza aquí.
export const metadata: Metadata = withSocial("/vuelos-a-japon", {
  title: "Te mejoramos el precio de tu vuelo a Japón",
  description:
    "Dinos qué vuelo a Japón quieres y cuánto te sale. En menos de 24 horas te mandamos un código para comprarlo tú en iberia.com más barato o con más maletas.",
  alternates: { canonical: "/vuelos-a-japon" },
  robots: { index: false, follow: true },
});

const PASOS = [
  { t: "Nos cuentas tu vuelo.", d: "Fechas, personas y el precio que has visto. Si tienes una captura, mejor." },
  {
    t: `Te contestamos en menos de ${VUELOS.respuestaHoras} h.`,
    d: "Con el precio final, lo que cuesta el código y lo que ahorras de verdad. O diciéndote que esta vez no podemos mejorarlo.",
  },
  {
    t: "Compras tú en iberia.com.",
    d: `Tienes ${VUELOS.validezHoras} horas: después el precio puede cambiar o agotarse las plazas.`,
  },
];

export default function Page() {
  const wa = whatsappHref();
  const tg = telegramHref();
  const colaborador = VUELOS.colaborador.nombre
    ? `${VUELOS.colaborador.nombre} (NIF ${VUELOS.colaborador.nif})`
    : "pendiente de confirmar";

  return (
    <div className="mx-auto max-w-[1216px] px-4 py-12">
      <header className="flex max-w-[860px] flex-col gap-3">
        <p className="kicker text-primary">Servicio · Vuelos a Japón</p>
        <h1 className="text-balance text-4xl font-black leading-[1.05] sm:text-5xl">Te mejoramos el precio de tu vuelo a Japón</h1>
        <p className="text-lg leading-relaxed text-fg-muted">
          Dinos qué vuelo quieres y cuánto te sale. En menos de {VUELOS.respuestaHoras} horas te mandamos un código para
          comprarlo tú mismo en iberia.com, más barato o con más maletas.
        </p>
        <ul className="mt-1 flex list-none flex-wrap gap-2 p-0">
          {["Compras tú en iberia.com", "Billete y factura a tu nombre", "Ves tu ahorro neto antes de pagar"].map((c) => (
            <li key={c} className="border-2 border-[#0a0a0a] px-3 py-1.5 text-sm font-bold">
              {c}
            </li>
          ))}
        </ul>
      </header>

      <div className="mt-10 grid items-start gap-8 lg:grid-cols-[minmax(0,680px)_1fr]">
        <VuelosForm />

        <aside className="flex flex-col gap-5">
          <section className="flex flex-col gap-3.5 border-[3px] border-[#0a0a0a] bg-white p-5">
            <h2 className="text-[22px] font-black">Cómo funciona</h2>
            <ol className="m-0 flex list-none flex-col gap-3 p-0">
              {PASOS.map((p, i) => (
                <li key={p.t} className="grid grid-cols-[36px_1fr] items-start gap-3">
                  <span className="flex h-9 w-9 items-center justify-center bg-[#e1352e] font-mono font-bold text-white">{i + 1}</span>
                  <span className="text-[15px] leading-normal">
                    <b>{p.t}</b> {p.d}
                  </span>
                </li>
              ))}
            </ol>
          </section>

          <section className="grid gap-5 border-[3px] border-[#0a0a0a] bg-[#f5f5f5] p-5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            <div>
              <h2 className="text-base font-black">Lo que hacemos</h2>
              <ul className="mt-2 list-disc pl-[18px] text-sm leading-relaxed">
                <li>Mejorar el precio de Iberia</li>
                <li>Conseguir más maletas facturadas cuando se puede</li>
                <li>Decirte claro si no compensa</li>
              </ul>
            </div>
            <div>
              <h2 className="text-base font-black">Lo que no hacemos</h2>
              <ul className="mt-2 list-disc pl-[18px] text-sm leading-relaxed">
                <li>No vendemos billetes: el código lo vende nuestro colaborador</li>
                <li>No somos Iberia ni una agencia de viajes</li>
                <li>Cambios y cancelaciones: con Iberia, según tu tarifa</li>
              </ul>
            </div>
          </section>

          <section className="border-[3px] border-[#0a0a0a] bg-white p-5">
            <p className="text-sm leading-relaxed">
              <b>Así volamos nosotros.</b> Hemos volado a Japón varias veces con nuestro colaborador y todo ha ido perfecto.
              En uno de esos viajes, además, pudimos facturar más maletas de las que incluía la tarifa.
            </p>
          </section>
        </aside>
      </div>

      {(wa || tg) && (
        <section className="mt-10 grid items-center gap-3 border-[3px] border-[#0a0a0a] bg-white p-5 md:grid-cols-[1fr_auto_auto]">
          <p className="text-[15px] leading-normal">
            <b>¿Prefieres escribirnos?</b> Se abre el chat con el mensaje ya preparado: solo tienes que rellenar tus fechas.
          </p>
          {wa && <DirectoLink href={wa} canal="whatsapp" label="WhatsApp" dark />}
          {tg && <DirectoLink href={tg} canal="telegram" label="Telegram" />}
        </section>
      )}

      <p className="mt-10 border-t-[3px] border-[#0a0a0a] pt-3.5 text-[13px] leading-relaxed text-fg-muted">
        <b className="text-fg">Transparencia.</b> El código lo vende nuestro colaborador, {colaborador}, y ViajaJapón cobra
        de él una comisión: a ti no te cuesta más. Antes de pagar sabes lo que cuesta el código y lo que ahorras, y el precio
        del vuelo lo ves en iberia.com. No somos Iberia ni una agencia de viajes: el billete es de Iberia y los cambios y
        cancelaciones se gestionan con ella.{" "}
        <Link href="/afiliados-divulgacion" className="underline underline-offset-2 hover:text-primary">
          Cómo nos financiamos
        </Link>
        .
      </p>
    </div>
  );
}
