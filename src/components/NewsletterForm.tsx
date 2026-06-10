"use client";

import { useId, useState } from "react";

type Status = "idle" | "loading" | "ok" | "error";

export interface NewsletterFormProps {
  /** De dónde viene el alta (se guarda como campo en MailerLite para atribución). */
  source: string;
  /** "row" = email + botón en línea (home). "stack" = apilado (barras laterales). */
  layout?: "row" | "stack";
  buttonLabel?: string;
  placeholder?: string;
  /** Texto bajo el formulario (privacidad/lead magnet). */
  note?: string;
}

export function NewsletterForm({
  source,
  layout = "row",
  buttonLabel = "Suscribirme",
  placeholder = "tu@email.com",
  note = "Doble opt-in. Puedes darte de baja en cualquier momento.",
}: NewsletterFormProps) {
  const id = useId();
  const [email, setEmail] = useState("");
  const [hp, setHp] = useState(""); // honeypot anti-bots
  const [status, setStatus] = useState<Status>("idle");
  const [msg, setMsg] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "loading") return;
    if (hp) {
      // Bot rellenó el honeypot: fingir éxito sin enviar.
      setStatus("ok");
      setMsg("¡Listo! Revisa tu correo para confirmar la suscripción.");
      return;
    }
    setStatus("loading");
    setMsg("");
    try {
      const res = await fetch("/api/suscribir", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setStatus("ok");
        setMsg(
          data.already
            ? "Ya estabas suscrito. ¡Gracias!"
            : "¡Listo! Revisa tu correo para confirmar la suscripción.",
        );
        setEmail("");
      } else {
        setStatus("error");
        setMsg(
          data.error === "email"
            ? "Revisa el correo: no parece válido."
            : "No hemos podido suscribirte ahora mismo. Inténtalo en un momento.",
        );
      }
    } catch {
      setStatus("error");
      setMsg("Problema de conexión. Inténtalo de nuevo.");
    }
  }

  if (status === "ok") {
    return (
      <p role="status" className="rounded-lg bg-success/10 px-4 py-3 text-center text-sm font-medium text-success">
        {msg}
      </p>
    );
  }

  const isRow = layout === "row";

  return (
    <div>
      <form
        onSubmit={onSubmit}
        className={isRow ? "mx-auto flex max-w-xl flex-col gap-4 md:flex-row" : "flex flex-col gap-3"}
        noValidate
      >
        <label htmlFor={id} className="sr-only">
          Tu correo electrónico
        </label>
        <input
          id={id}
          name="email"
          type="email"
          inputMode="email"
          required
          autoComplete="email"
          spellCheck={false}
          placeholder={placeholder}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={status === "error"}
          disabled={status === "loading"}
          className="flex-1 rounded-lg border border-border bg-surface px-4 py-3 shadow-sm disabled:opacity-60"
        />
        {/* Honeypot: oculto a humanos, los bots lo rellenan. */}
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={hp}
          onChange={(e) => setHp(e.target.value)}
          aria-hidden="true"
          className="hidden"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="rounded-md bg-primary px-6 py-3 font-medium text-white transition-colors hover:bg-primary-strong disabled:opacity-60"
        >
          {status === "loading" ? "Enviando…" : buttonLabel}
        </button>
      </form>
      <p
        role={status === "error" ? "alert" : undefined}
        className={`mt-3 text-center text-xs ${status === "error" ? "text-danger" : "text-fg-muted"}`}
      >
        {status === "error" ? msg : note}
      </p>
    </div>
  );
}
