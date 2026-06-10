import Link from "next/link";
import { getYenRate } from "@/lib/fx";

export async function YenIndicator() {
  const { rate } = await getYenRate();
  return (
    <Link
      href="/cambio-yen-euro"
      className="kicker flex items-center gap-1 rounded-sm border border-border px-2 py-1 text-fg-muted transition-colors hover:border-primary hover:text-primary"
      title="Cambio yen / euro de hoy"
    >
      <span aria-hidden="true">¥</span>
      <span className="nums text-fg">{rate}</span>
      <span aria-hidden="true">/€</span>
      <span className="sr-only">Ver el cambio yen a euro de hoy</span>
    </Link>
  );
}
