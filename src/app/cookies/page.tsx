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
          <li><strong>Cookies técnicas (esenciales):</strong> Son aquellas estrictamente necesarias para el correcto funcionamiento de la página web (por ejemplo, para recordar si ya has aceptado o rechazado el banner de cookies). Estas cookies no requieren consentimiento y se instalan automáticamente.</li>
          <li><strong>Cookies analíticas:</strong> Nos permiten medir y analizar la navegación de los usuarios de forma anónima para mejorar la web. Utilizamos herramientas respetuosas con la privacidad (como Cloudflare Web Analytics, que no usa cookies de seguimiento personal). Si en el futuro integramos analítica con cookies, solo se activarán si nos das tu consentimiento expreso en el aviso inicial.</li>
        </ul>

        <h2 className="text-2xl font-bold text-fg mt-8">Gestión de tus preferencias</h2>
        <p>
          Puedes modificar tus preferencias sobre las cookies en cualquier momento borrando el historial o los datos de navegación de tu navegador. Esto hará que el banner de aviso de cookies vuelva a aparecer en tu próxima visita, permitiéndote configurar de nuevo tu elección.
        </p>
        <p>
          Además, puedes restringir, bloquear o borrar las cookies de cualquier sitio web utilizando la configuración general de tu navegador. Ten en cuenta que si bloqueas las cookies técnicas esenciales, es posible que algunas funciones de la web no operen correctamente.
        </p>
      </div>
    </article>
  );
}
