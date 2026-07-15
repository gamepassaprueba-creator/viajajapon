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
          En ViajaJapón utilizamos cookies para facilitar el uso y navegación a través del sitio web y para medir las estadísticas de uso.
        </p>
        <p>
          Una cookie es un pequeño fichero de texto que los sitios web instalan en tu ordenador o dispositivo móvil cuando los visitas.
        </p>
        
        <h2 className="text-2xl font-bold text-fg mt-8">¿Qué tipos de cookies usamos?</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Cookies técnicas (esenciales):</strong> Son aquellas estrictamente necesarias para el correcto funcionamiento de la página web (por ejemplo, para recordar tus preferencias de privacidad). Estas cookies no requieren consentimiento y se instalan automáticamente.</li>
          <li><strong>Cookies analíticas:</strong> Utilizamos herramientas respetuosas con la privacidad (como Cloudflare Web Analytics, que no usa cookies de seguimiento cruzado) para medir de forma anónima el rendimiento de la web.</li>
          <li><strong>Cookies publicitarias (AdSense):</strong> Si nos das tu consentimiento expreso mediante la plataforma de gestión del consentimiento (CMP), Google y sus socios tecnológicos certifcados instalarán cookies para mostrarte anuncios personalizados, medir su rendimiento y limitar el número de veces que ves un mismo anuncio.</li>
        </ul>

        <h2 className="text-2xl font-bold text-fg mt-8">Gestión de tus preferencias y retirada del consentimiento</h2>
        <p>
          Si has aceptado el uso de cookies publicitarias y deseas cambiar de opinión, puedes retirar o modificar tu consentimiento en cualquier momento abriendo nuevamente el panel de preferencias de privacidad (el botón para gestionar el consentimiento suele encontrarse fijo en el pie de página o en una esquina de la pantalla).
        </p>
        <p>
          Adicionalmente, puedes restringir, bloquear o borrar las cookies de cualquier sitio web utilizando la configuración general de tu navegador. Ten en cuenta que si bloqueas las cookies técnicas esenciales, es posible que algunas funciones de la web no operen correctamente.
        </p>
      </div>
    </article>
  );
}
