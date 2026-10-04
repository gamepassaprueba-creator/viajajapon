import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de cookies",
  description: "Uso de cookies en ViajaJapón.",
  alternates: { canonical: "/cookies" },
};

export default function Page() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <p className="kicker text-primary">Legal</p>
      <h1 className="mt-2 text-4xl font-bold sm:text-5xl">Política de cookies</h1>
      <div className="mt-6 space-y-4 leading-relaxed text-fg-muted">
        <p>
          Una cookie es un pequeño fichero de texto que los sitios web instalan en tu ordenador o
          dispositivo móvil cuando los visitas. Esta política describe las tecnologías de medición y
          almacenamiento que utiliza ViajaJapón.
        </p>

        <h2 className="text-2xl font-bold text-fg mt-8">Tecnologías actualmente en uso</h2>
        <div className="overflow-x-auto border-[2px] border-[#0a0a0a]">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted">
              <tr>
                <th className="px-3 py-2">Nombre</th>
                <th className="px-3 py-2">Titular</th>
                <th className="px-3 py-2">Finalidad</th>
                <th className="px-3 py-2">Duración</th>
                <th className="px-3 py-2">¿Requiere consentimiento?</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-border">
                <td className="px-3 py-2"><code>cookie_consent</code>, <code>cookie_consent_at</code> (almacenamiento local)</td>
                <td className="px-3 py-2">ViajaJapón</td>
                <td className="px-3 py-2">Recordar si aceptaste o rechazaste la analítica y cuándo.</td>
                <td className="px-3 py-2">12 meses</td>
                <td className="px-3 py-2">No (técnica)</td>
              </tr>
              <tr className="border-t border-border">
                <td className="px-3 py-2">Otras claves de almacenamiento local (p. ej. progreso de la checklist de equipaje)</td>
                <td className="px-3 py-2">ViajaJapón</td>
                <td className="px-3 py-2">Guardar preferencias y estados de herramientas que usas.</td>
                <td className="px-3 py-2">Hasta que las borres</td>
                <td className="px-3 py-2">No (técnica)</td>
              </tr>
              <tr className="border-t border-border">
                <td className="px-3 py-2"><code>_ga</code></td>
                <td className="px-3 py-2">Google (Google Analytics 4)</td>
                <td className="px-3 py-2">Distinguir visitantes de forma estadística.</td>
                <td className="px-3 py-2">2 años</td>
                <td className="px-3 py-2">Sí (analítica)</td>
              </tr>
              <tr className="border-t border-border">
                <td className="px-3 py-2"><code>_ga_NGK9K8DWYP</code></td>
                <td className="px-3 py-2">Google (Google Analytics 4)</td>
                <td className="px-3 py-2">Mantener el estado de la sesión de analítica.</td>
                <td className="px-3 py-2">2 años</td>
                <td className="px-3 py-2">Sí (analítica)</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          La etiqueta de Google Analytics no se carga hasta que eliges <em>Aceptar analítica</em>. Si
          rechazas, ViajaJapón no carga esa etiqueta ni instala las cookies <code>_ga</code>. Google
          puede tratar estos datos en Estados Unidos; más detalle en la{" "}
          <a href="/privacidad" className="underline hover:text-primary">
            política de privacidad
          </a>
          .
        </p>

        <h2 className="text-2xl font-bold text-fg mt-8">Gestión de preferencias</h2>
        <p>
          Puedes aceptar o rechazar Google Analytics desde el aviso que aparece al visitar la web.
          También puedes cambiar tu decisión posteriormente mediante el enlace{" "}
          <strong>Preferencias de cookies</strong> situado en el pie de página; si retiras el
          consentimiento, borramos las cookies <code>_ga</code> de tu navegador. Pasados 12 meses te
          volvemos a preguntar.
        </p>

        <h2 className="text-2xl font-bold text-fg mt-8">Cookies publicitarias</h2>
        <p>
          <strong>Actualmente no hay cookies ni tecnologías publicitarias activas.</strong> La decisión
          sobre Google Analytics solo controla medición analítica y no concede consentimiento para
          publicidad. Si incorporamos publicidad en el futuro, actualizaremos esta política antes de
          activarla y añadiremos los controles de consentimiento que correspondan.
        </p>

        <p>
          También puedes restringir o eliminar cookies y almacenamiento local desde la configuración
          de tu navegador. Bloquear tecnologías técnicas esenciales puede impedir el correcto
          funcionamiento de algunas partes de la web.
        </p>

        <p className="text-xs text-fg-muted mt-8">Última actualización: 4 de octubre de 2026.</p>
      </div>
    </article>
  );
}
