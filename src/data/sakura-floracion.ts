/**
 * Floración de los cerezos (Somei-Yoshino) por ciudad, según la Agencia Meteorológica de Japón (JMA).
 * Fuentes: data.jma.go.jp/sakura/data/sakura003_07.html (inicio, 開花) y sakura004_07.html
 * (plena floración, 満開), consultadas el 18-oct-2026. «Media» = valor normal 1991-2020.
 * Inicio = 5-6 flores abiertas en el árbol de muestra; plena = ~80 % abiertas.
 * Fechas en formato "M/D". Al publicar la JMA las de 2027, añadir `plena2027`.
 */
export type FloracionCiudad = {
  ciudad: string;
  inicioMedia: string;
  plenaMedia: string;
  inicio2026: string;
  plena2026: string;
};

export const FLORACION: FloracionCiudad[] = [
  { ciudad: "Fukuoka", inicioMedia: "3/22", plenaMedia: "3/31", inicio2026: "3/24", plena2026: "4/3" },
  { ciudad: "Tokio", inicioMedia: "3/24", plenaMedia: "3/31", inicio2026: "3/19", plena2026: "3/28" },
  { ciudad: "Hiroshima", inicioMedia: "3/25", plenaMedia: "4/3", inicio2026: "3/19", plena2026: "3/30" },
  { ciudad: "Kioto", inicioMedia: "3/26", plenaMedia: "4/4", inicio2026: "3/23", plena2026: "3/30" },
  { ciudad: "Osaka", inicioMedia: "3/27", plenaMedia: "4/4", inicio2026: "3/26", plena2026: "4/3" },
  { ciudad: "Nara", inicioMedia: "3/28", plenaMedia: "4/4", inicio2026: "3/24", plena2026: "3/31" },
  { ciudad: "Nagoya", inicioMedia: "3/24", plenaMedia: "4/2", inicio2026: "3/17", plena2026: "3/30" },
  { ciudad: "Kanazawa", inicioMedia: "4/3", plenaMedia: "4/8", inicio2026: "3/29", plena2026: "4/3" },
  { ciudad: "Sendai", inicioMedia: "4/8", plenaMedia: "4/13", inicio2026: "3/31", plena2026: "4/4" },
  { ciudad: "Sapporo", inicioMedia: "5/1", plenaMedia: "5/6", inicio2026: "4/18", plena2026: "4/24" },
];
