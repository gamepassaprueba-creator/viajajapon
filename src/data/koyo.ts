/**
 * Momiji: coloración y caída de la hoja del arce (iroha-kaede) por ciudad, según la Agencia
 * Meteorológica de Japón (JMA). Fuentes, consultadas el 20-oct-2026:
 * - Coloración (かえで紅葉日): data.jma.go.jp/sakura/data/pdf/015.pdf
 * - Caída de la hoja (かえで落葉日): data.jma.go.jp/sakura/data/pdf/016.pdf
 * «Media» = valor normal 1991-2020. Coloración = primer día en que casi todo el árbol de muestra
 * está rojo; caída = primer día con ≈80 % de las hojas caídas. En Sapporo la JMA observa una
 * especie sustituta. Fechas "M/D". Al publicar la JMA las de 2026 (columna de phn_015.html),
 * añadir `color2026`.
 */
export type KoyoCiudad = {
  ciudad: string;
  colorMedia: string;
  caidaMedia: string;
  color2025: string;
};

// Ordenadas por la fecha media de coloración (de antes a después).
export const KOYO: KoyoCiudad[] = [
  { ciudad: "Sapporo", colorMedia: "10/28", caidaMedia: "11/5", color2025: "11/6" },
  { ciudad: "Nara", colorMedia: "11/21", caidaMedia: "12/5", color2025: "11/14" },
  { ciudad: "Sendai", colorMedia: "11/21", caidaMedia: "12/6", color2025: "11/20" },
  { ciudad: "Hiroshima", colorMedia: "11/22", caidaMedia: "12/9", color2025: "11/27" },
  { ciudad: "Kanazawa", colorMedia: "11/24", caidaMedia: "12/4", color2025: "11/25" },
  { ciudad: "Tokio", colorMedia: "11/28", caidaMedia: "12/13", color2025: "11/23" },
  { ciudad: "Nagoya", colorMedia: "11/28", caidaMedia: "12/11", color2025: "11/25" },
  { ciudad: "Osaka", colorMedia: "12/1", caidaMedia: "12/13", color2025: "12/4" },
  { ciudad: "Fukuoka", colorMedia: "12/1", caidaMedia: "12/14", color2025: "12/1" },
  { ciudad: "Kioto", colorMedia: "12/5", caidaMedia: "12/18", color2025: "12/10" },
];
