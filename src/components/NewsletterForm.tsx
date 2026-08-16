"use client";

import { useEffect, useId, useState } from "react";
import { trackEvent } from "@/lib/analytics";

type Status = "idle" | "loading" | "ok" | "error";
type Availability = "checking" | "available" | "unavailable";

export interface NewsletterFormProps {
  source: string;
  layout?: "row" | "stack";
  buttonLabel?: string;
  placeholder?: string;
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
  const [hp, setHp] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [msg, setMsg] = useState("");
  const [availability, setAvailability] = useState<Availability>("checking");

  useEffect(() => {
    let active = true;

    fetch("/api/suscribir", { cache: "no-store" })
      .then(async (res) => {
        if (!res.ok) return false;
        const data = (await res.json().catch(() => ({}))) as { available?: boolean };
        return data.available === true;
      })
      .then((available) => {
        if (active) setAvailability(available ? "available" : "unavailable");
      })
      .catch(() => {
        if (active) setAvailability("unavailable");
      });

    return () => {
      active = false;
    };
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (availability !== "available" || status === "loading") return;
    if (hp) {
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

        if (!data.already) {
          trackEvent("newsletter_signup", {
            source,
            page_path: `${window.location.pathname}${window.location.search}`,
          });
        }

        setEmail("");
        return;
      }

      if (data.error === "config") {
        setAvailability("unavailable");
        setStatus("idle");
        return;
      }

      setStatus("error");
      setMsg(
        data.error === "email"
          ? "Revisa el correo: no parece válido."
          : "No hemos podido suscribirte ahora mismo. Inténtalo en un momento.",
      );
    } catch {
      setStatus("error");
      setMsg("Problema de conexión. Inténtalo de nuevo.");
    }
  }

  if (availability === "checking") {
    return <div className="h-12" aria-hidden="true" />;
  }

  if (availability === "unavailable") {
    return (
      <p className="border-[2px] border-[#0a0a0a] bg-[#f5f5f5] px-4 py-3 text-center text-sm text-fg-muted">
        La newsletter estará disponible próximamente.
      </p>
    );
  }

  if (status === "ok") {
    return (
      <p role="status" className="border-[2px] border-[#15803d] bg-[#f0fdf4] px-4 py-3 text-center text-sm font-bold text-[#15803d]">
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
          className="flex-1 border-[2px] border-[#0a0a0a] bg-white px-4 py-3 text-[#0a0a0a] placeholder:text-[#999] outline-none focus:border-[#e1352e] disabled:opacity-60"
        />
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
          className="btn-primary disabled:opacity-60"
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
