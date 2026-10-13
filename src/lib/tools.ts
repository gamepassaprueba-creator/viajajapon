import { Calculator, Coins, Luggage, type LucideIcon } from "lucide-react";

export type Tool = {
  Icon: LucideIcon;
  title: string;
  desc: string;
  href: string;
  destacado?: boolean;
};

/** Herramientas propias (home, /herramientas y navegación). Mantener en orden de valor. */
export const HERRAMIENTAS: Tool[] = [
  { Icon: Calculator, title: "Calculadora JR Pass", desc: "Mete tu ruta y compara billetes sueltos contra el pase, en euros.", href: "/herramientas/jr-pass-calculadora", destacado: true },
  { Icon: Coins, title: "Cambio yen-euro", desc: "Tipo de referencia del BCE, actualizado a diario.", href: "/cambio-yen-euro" },
  { Icon: Luggage, title: "Checklist de maleta", desc: "Marca lo que llevas; se guarda en tu móvil y se imprime.", href: "/logistica/que-llevar-maleta-japon" },
];
