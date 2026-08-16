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
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Almacenamiento técnico:</strong> usamos almacenamiento local para recordar tu
            elección sobre analítica y otros estados o preferencias funcionales. No se utiliza para
            rastrearte entre sitios.
          </li>
          <li>
            <strong>Cloudflare Web Analytics:</strong> mide tráfico de forma agregada y no instala
            cookies para realizar esa medición.
          </li>
          <li>
            <strong>Google Analytics 4:</strong> nos ayuda a conocer qué páginas se visitan, cómo se
            llega a ViajaJapón y cómo se utiliza la web. La etiqueta de Google Analytics no se carga
            hasta que eliges <em>Aceptar analítica</em>. Si rechazas, ViajaJapón no carga esa etiqueta.
          </li>
        </ul>

        <h2 className="text-2xl font-bold text-fg mt-8">Gestión de preferencias</h2>
        <p>
          Puedes aceptar o rechazar Google Analytics desde el aviso que aparece al visitar la web.
          También puedes cambiar tu decisión posteriormente mediante el enlace{" "}
          <strong>Preferencias de cookies</strong> situado en el pie de página.
        </p>

        <h2 className="text-2xl font-bold text-fg mt-8">Cookies publicitarias (previstas)</h2>
        <p>
          ViajaJapón tiene previsto incorporar Google AdSense para mostrar publicidad. Esa integración
          está separada del consentimiento de Google Analytics y no se activa con el botón de analítica.
          Antes de activar publicidad se implantará la plataforma de gestión del consentimiento (CMP)
          necesaria para ese uso. <strong>Actualmente no hay cookies publicitarias activas.</strong>
        </p>

        <p>
          También puedes restringir o eliminar cookies y almacenamiento local desde la configuración
          de tu navegador. Bloquear tecnologías técnicas esenciales puede impedir el correcto
          funcionamiento de algunas partes de la web.
        </p>

        <p className="text-xs text-fg-muted mt-8">Última actualización: 16 de agosto de 2026.</p>
      </div>
    </article>
  );
}
