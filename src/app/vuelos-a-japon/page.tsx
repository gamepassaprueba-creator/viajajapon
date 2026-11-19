import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AvionRuta } from "@/components/AvionRuta";
import { withSocial } from "@/lib/seo";
import { VUELOS, telegramHref, whatsappHref } from "@/data/vuelos";
import { VuelosForm } from "./VuelosForm";
import { DirectoLink } from "./DirectoLink";

// El formulario se apaga solo si el servicio está desactivado (GET /api/vuelos; ver src/data/vuelos.ts).
export const metadata: Metadata = withSocial("/vuelos-a-japon", {
  title: "Te mejoramos el precio de tu vuelo a Japón",
  description:
    "Dinos qué vuelo a Japón quieres y cuánto te sale. En menos de 24 horas te mandamos un código para comprarlo tú en iberia.com más barato o con más maletas.",
  alternates: { canonical: "/vuelos-a-japon" },
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
  const { nombre, pais, nif } = VUELOS.colaborador;
  const colaborador = nombre
    ? `${nombre} (${[pais && `empresa de ${pais}`, nif && `NIF ${nif}`].filter(Boolean).join(", ")})`
    : "pendiente de confirmar";

  return (
    <>
      <header className="relative overflow-hidden border-b-[3px] border-[#0a0a0a] bg-[#0a0a0a] text-white">
        <Image
          src="/images/hero-fuji.jpg"
          alt="El monte Fuji nevado detrás de la pagoda Chureito, con cerezos en flor"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[70%_40%] md:object-[center_40%]"
        />
        {/* Velo para leer el texto: de abajo arriba en móvil, de izquierda a derecha en escritorio. */}
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(10,10,10,0.92)_0%,rgba(10,10,10,0.6)_55%,rgba(10,10,10,0.15)_100%)] md:bg-[linear-gradient(90deg,rgba(10,10,10,0.88)_0%,rgba(10,10,10,0.7)_42%,rgba(10,10,10,0.05)_72%)]" />
        <RutaVuelo />
        <div className="relative mx-auto flex min-h-[340px] max-w-[1216px] flex-col justify-end gap-3.5 px-4 pb-6 pt-28 md:min-h-[460px] md:justify-center md:py-12">
          <div className="flex max-w-[660px] flex-col gap-3.5">
            <p className="kicker self-start bg-[#e1352e] px-2 py-1 text-white">Servicio · Vuelos a Japón</p>
            <h1 className="text-balance text-[28px] font-black leading-[1.05] sm:text-5xl md:text-[56px]">
              Te mejoramos el precio de tu vuelo a Japón
            </h1>
            <p className="text-sm leading-relaxed text-[#f0f0f0] sm:text-lg">
              Dinos qué vuelo quieres y cuánto te sale. En menos de {VUELOS.respuestaHoras} horas te mandamos un código para
              comprarlo tú mismo en iberia.com, más barato o con más maletas.
            </p>
            <ul className="mt-1 hidden list-none flex-wrap gap-2 p-0 sm:flex">
              {["Compras tú en iberia.com", "Billete y factura a tu nombre", "Ves tu ahorro neto antes de pagar"].map((c) => (
                <li key={c} className="border-2 border-white bg-white px-3 py-1.5 text-sm font-bold text-[#0a0a0a]">
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <span className="absolute bottom-1 right-1 rounded bg-black/55 px-1.5 py-0.5 text-[10px] leading-none text-white/90">
          Foto: bruchez, CC BY-SA 2.0
        </span>
      </header>

    <div className="mx-auto max-w-[1216px] px-4 py-12">
      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,680px)_1fr]">
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
        <b className="text-fg">Transparencia.</b> El código lo vende nuestro colaborador, {colaborador}, que es quien
        te escribe con el precio, y ViajaJapón cobra de él una comisión: a ti no te cuesta más. Antes de pagar sabes lo que cuesta el código y lo que ahorras, y el precio
        del vuelo lo ves en iberia.com. No somos Iberia ni una agencia de viajes: el billete es de Iberia y los cambios y
        cancelaciones se gestionan con ella.{" "}
        <Link href="/afiliados-divulgacion" className="underline underline-offset-2 hover:text-primary">
          Cómo nos financiamos
        </Link>
        .
      </p>
    </div>
    </>
  );
}

/** Ruta discontinua Madrid → Tokio con el avión, sobre la foto del banner. Solo decoración. */
function RutaVuelo() {
  return (
    <>
      <svg viewBox="0 0 375 300" preserveAspectRatio="xMidYMin slice" aria-hidden="true" className="absolute inset-0 h-full w-full md:hidden">
        <path className="vuelo-ruta" d="M 30 80 C 120 10, 260 10, 345 60" fill="none" stroke="#fff" strokeWidth="2.5" strokeDasharray="8 8" strokeLinecap="round" />
        <circle cx="30" cy="80" r="6" fill="#e1352e" stroke="#fff" strokeWidth="2.5" />
        <circle cx="345" cy="60" r="6" fill="#e1352e" stroke="#fff" strokeWidth="2.5" />
        <text x="30" y="62" textAnchor="middle" fill="#fff" fontFamily="var(--font-mono), monospace" fontSize="12" fontWeight="700">MAD</text>
        <text x="345" y="44" textAnchor="middle" fill="#fff" fontFamily="var(--font-mono), monospace" fontSize="12" fontWeight="700">TYO</text>
        <AvionRuta x={223} y={25} r={20} rumbo={3.5} borde={2.5} />
      </svg>
      <svg viewBox="0 0 1440 460" preserveAspectRatio="xMaxYMid slice" aria-hidden="true" className="absolute inset-0 hidden h-full w-full md:block">
        <path className="vuelo-ruta" d="M 900 370 C 1000 150, 1180 70, 1340 150" fill="none" stroke="#fff" strokeWidth="3" strokeDasharray="10 10" strokeLinecap="round" />
        <circle cx="900" cy="370" r="8" fill="#e1352e" stroke="#fff" strokeWidth="3" />
        <circle cx="1340" cy="150" r="8" fill="#e1352e" stroke="#fff" strokeWidth="3" />
        <text x="900" y="410" textAnchor="middle" fill="#fff" fontFamily="var(--font-mono), monospace" fontSize="18" fontWeight="700">MAD</text>
        <text x="1340" y="125" textAnchor="middle" fill="#fff" fontFamily="var(--font-mono), monospace" fontSize="18" fontWeight="700">TYO</text>
        <AvionRuta x={1121} y={137} r={32} rumbo={-20.8} />
      </svg>
    </>
  );
}
