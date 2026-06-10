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
          [TODO con gestor — RGPD arts. 13-14]: responsable del tratamiento, datos recogidos (p. ej. email para la
          newsletter), finalidad y base legal (consentimiento), encargado del tratamiento (proveedor de email),
          conservación, y tus derechos (acceso, rectificación, supresión, etc.) y cómo ejercerlos.
        </p>
        <p>El alta a la newsletter es con doble opt-in y puedes darte de baja en cualquier email.</p>
      </div>
    </article>
  );
}
