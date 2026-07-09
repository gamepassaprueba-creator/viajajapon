import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbLd } from "@/lib/jsonld";

export interface BreadcrumbItem {
  name: string;
  href: string;
}

/**
 * Migas de pan reutilizables: pinta el <nav> visual y emite su propio JSON-LD
 * BreadcrumbList (vía breadcrumbLd) en el mismo sitio, para tener una única fuente
 * de verdad. Antes había dos breadcrumbs independientes e inconsistentes: el visual
 * de Article.tsx usaba meta.kicker como último nivel, y el JSON-LD usaba meta.title.
 *
 * variant="onDark": texto claro sobre overlay oscuro (hero a sangre con foto).
 * variant="onLight" (por defecto): texto muted sobre fondo claro (hubs, artículos sin hero).
 */
export function Breadcrumbs({
  items,
  variant = "onLight",
  className = "",
}: {
  items: BreadcrumbItem[];
  variant?: "onDark" | "onLight";
  className?: string;
}) {
  const onDark = variant === "onDark";
  return (
    <>
      <nav aria-label="Breadcrumb" className={`flex flex-wrap items-center gap-2 text-sm ${onDark ? "text-white/80" : "text-fg-muted"} ${className}`}>
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <span key={item.href} className="flex items-center gap-2">
              {i > 0 && <span aria-hidden="true">›</span>}
              {isLast ? (
                <span aria-current="page" className={`font-medium ${onDark ? "text-white" : "text-fg"}`}>{item.name}</span>
              ) : (
                <Link href={item.href} className={onDark ? "hover:text-white hover:underline" : "hover:text-primary hover:underline"}>
                  {item.name}
                </Link>
              )}
            </span>
          );
        })}
      </nav>
      <JsonLd data={breadcrumbLd(items.map((i) => ({ name: i.name, url: i.href })))} />
    </>
  );
}
