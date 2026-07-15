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
          dispositivo móvil cuando los visitas. Esta política describe qué cookies utiliza ViajaJapón
          y cuáles podrían activarse en el futuro.
        </p>

        <h2 className="text-2xl font-bold text-fg mt-8">Cookies actualmente en uso</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Cookies técnicas (esenciales):</strong> Necesarias para el funcionamiento básico
            de la web, por ejemplo para recordar tus preferencias de privacidad. No requieren
            consentimiento.
          </li>
          <li>
            <strong>Medición de rendimiento (Cloudflare Web Analytics):</strong> ViajaJapón utiliza
            Cloudflare Web Analytics para medir el tráfico de forma agregada. Este servicio{" "}
            <strong>no instala cookies</strong> ni rastrea a los usuarios entre sitios.
          </li>
        </ul>

        <h2 className="text-2xl font-bold text-fg mt-8">Cookies publicitarias (previstas)</h2>
        <p>
          ViajaJapón tiene previsto incorporar Google AdSense para mostrar publicidad. Cuando esa
          integración se active, Google y sus socios tecnológicos certificados podrán instalar cookies
          para mostrar anuncios, medir su rendimiento y limitar frecuencias. Antes de que eso ocurra
          se mostrará un aviso de consentimiento mediante una plataforma de gestión del consentimiento
          (CMP) certificada por Google. <strong>Actualmente no hay cookies publicitarias activas.</strong>
        </p>

        <h2 className="text-2xl font-bold text-fg mt-8">Gestión de preferencias</h2>
        <p>
          Cuando la CMP esté activa podrás retirar o modificar tu consentimiento en cualquier momento
          desde el panel de preferencias de privacidad, accesible desde el pie de página.
        </p>
        <p>
          También puedes restringir o eliminar cookies directamente desde la configuración de tu
          navegador. Bloquear las cookies técnicas esenciales puede impedir el correcto funcionamiento
          de algunas partes de la web.
        </p>

        <p className="text-xs text-fg-muted mt-8">Última actualización: julio de 2025.</p>
      </div>
    </article>
  );
}
