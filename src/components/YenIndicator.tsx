"use client";

import Link from "next/link";
import { useYenRate } from "@/lib/hooks/useYenRate";

export function YenIndicator() {
  const { rate, isLoading } = useYenRate();
  return (
    <Link
      href="/cambio-yen-euro"
      className="kicker flex items-center gap-1 rounded-sm border border-border px-2 py-1 text-fg-muted transition-colors hover:border-primary hover:text-primary"
      title="Cambio yen / euro de hoy"
    >
      <span aria-hidden="true">¥</span>
      <span className="nums text-fg">{rate}</span>
      <span aria-hidden="true">/€</span>
      <span className="sr-only">{isLoading ? "Cargando cambio yen a euro de hoy" : "Ver el cambio yen a euro de hoy"}</span>
    </Link>
  );
}
