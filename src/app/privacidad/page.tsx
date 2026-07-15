import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description: "Cómo tratamos tus datos en ViajaJapón.",
  alternates: { canonical: "/privacidad" },
};

export default function Page() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <p className="kicker text-primary">Legal</p>
      <h1 className="mt-2 text-4xl font-bold sm:text-5xl">Política de privacidad</h1>
      <div className="mt-6 space-y-4 leading-relaxed text-fg-muted">
        <p>
          En ViajaJapón nos tomamos muy en serio tu privacidad. En cumplimiento del Reglamento (UE) 2016/679 del Parlamento Europeo y del Consejo (RGPD), te informamos sobre cómo tratamos tus datos personales.
        </p>
        
        <h2 className="text-2xl font-bold text-fg mt-8">Responsable del tratamiento</h2>
        <p>
          <strong>Titular:</strong> Sergio Morillo<br />
          <strong>Email:</strong> info@viajajapon.com
        </p>
        
        <h2 className="text-2xl font-bold text-fg mt-8">Finalidad y base legal</h2>
        <p>
          Recogemos tu dirección de correo electrónico única y exclusivamente si decides suscribirte voluntariamente a nuestra newsletter. La base legal es tu <strong>consentimiento expreso</strong> mediante doble confirmación (doble opt-in).
        </p>
        <p>
          Los correos se utilizarán únicamente para enviarte novedades de la web. No venderemos, alquilaremos ni cederemos tu correo a terceros.
        </p>
        
        <h2 className="text-2xl font-bold text-fg mt-8">Conservación de los datos</h2>
        <p>
          Tus datos se conservarán hasta que solicites la baja. Puedes darte de baja en cualquier momento haciendo clic en el enlace que aparece al final de cada correo que recibas de nosotros.
        </p>
        
        <h2 className="text-2xl font-bold text-fg mt-8">Tus derechos</h2>
        <p>
          Tienes derecho a acceder, rectificar o suprimir tus datos en cualquier momento. Para ejercer tus derechos, escríbenos a <strong>info@viajajapon.com</strong> indicando &quot;Protección de Datos&quot; en el asunto.
        </p>
      </div>
    </article>
  );
}
