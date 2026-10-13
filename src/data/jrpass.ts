// Datos del JR Pass y lógica de cálculo (en euros).
// Verificación editorial:
//  - JR Pass nacional online: ¥50.000/80.000/100.000 en la web oficial a 2026-09-25.
//  - Desde 2026-10-01, los Exchange Orders de agencias extranjeras pasan a ¥53.000/84.000/105.000;
//    JR Group mantiene temporalmente sin cambios la compra online oficial.
//  - El pase regional usado por esta calculadora es Kansai-Hiroshima Area Pass (5 días, ¥17.000),
//    no Kansai WIDE, porque incluye el tramo Shin-Osaka ↔ Hiroshima.
// Fuentes primarias: japanrailpass.net y JR-WEST. Última revisión manual: 2026-09-25.

export const DATA_UPDATED = "2026-09-25";
export const DEFAULT_FX = 185; // ¥ por € (referencia BCE; el valor real lo da la página viva del yen)

/** Pase nacional ordinario, precio en yen por tramo de días. */
export const NATIONAL_PASS = [
  { maxDays: 7, priceYen: 50000, label: "JR Pass 7 días" },
  { maxDays: 14, priceYen: 80000, label: "JR Pass 14 días" },
  { maxDays: 21, priceYen: 100000, label: "JR Pass 21 días" },
] as const;

/** Tramos de tren de larga distancia (tarifa de asiento reservado, ida, en yen). */
export interface Segment {
  id: string;
  label: string;
  fareYen: number;
  /** ¿lo cubre el Kansai-Hiroshima Area Pass? */
  kansaiHiroshima?: boolean;
}

export const SEGMENTS: Segment[] = [
  { id: "tokio-kioto", label: "Tokio → Kioto", fareYen: 14170 },
  { id: "tokio-osaka", label: "Tokio → Shin-Osaka", fareYen: 14400 },
  { id: "kioto-osaka", label: "Kioto → Osaka", fareYen: 570, kansaiHiroshima: true },
  { id: "osaka-hiroshima", label: "Shin-Osaka → Hiroshima", fareYen: 10000, kansaiHiroshima: true },
  { id: "tokio-hiroshima", label: "Tokio → Hiroshima", fareYen: 19440 },
  { id: "tokio-hakone", label: "Tokio → Odawara (Hakone)", fareYen: 3220 },
  { id: "osaka-kioto-nara", label: "Osaka → Nara", fareYen: 800, kansaiHiroshima: true },
  { id: "kioto-kanazawa", label: "Kioto → Kanazawa", fareYen: 6930 },
];

/** Pase regional alternativo: Kansai-Hiroshima Area Pass oficial de JR-WEST. */
export const KANSAI_HIROSHIMA = {
  priceYen: 17000,
  days: 5,
  label: "Kansai-Hiroshima Area Pass (5 días)",
  // Página oficial en inglés de JR-WEST (comprobada el 2026-10-13; la ruta /global/ redirige aquí).
  url: "https://www.westjr.co.jp/travel-information/en/tickets-passes/jrwest-rail-pass/kansai_hiroshima/",
};

export type Profile = "mochilero" | "medio" | "comodo";

/** Gasto diario por persona (yen): alojamiento + comida + transporte local/extras. */
export const BUDGET_PER_DAY: Record<Profile, { lodging: number; food: number; local: number }> = {
  mochilero: { lodging: 4000, food: 2000, local: 1500 },
  medio: { lodging: 10000, food: 4500, local: 3000 },
  comodo: { lodging: 25000, food: 9000, local: 6000 },
};

export const PROFILE_LABEL: Record<Profile, string> = {
  mochilero: "Mochilero",
  medio: "Punto medio",
  comodo: "Cómodo",
};

export interface CalcInput {
  days: number;
  adults: number;
  children: number; // 6-11 años (mitad de precio)
  segmentIds: string[];
  roundTrip: boolean; // aplicar x2 a los tramos
  profile: Profile;
  kansai: boolean; // ¿el viaje se concentra en Kansai?
}

export interface CalcResult {
  fx: number;
  segmentsTotalEur: number;
  nationalPassEur: number;
  nationalPassLabel: string;
  /** false si el viaje dura más de 21 días: el pase más largo no cubre todo el viaje. */
  nationalPassCoversTrip: boolean;
  /** Coste total de la opción Kansai (pase + billetes sueltos de los tramos no cubiertos). */
  kansaiEur: number | null;
  /** Parte de kansaiEur que son billetes sueltos de tramos fuera del área del pase. */
  kansaiUncoveredEur: number;
  cheapest: "billetes" | "nacional" | "kansai";
  savingsEur: number; // ahorro de la opción más barata frente a la siguiente
  budgetPerPersonEur: number;
  budgetGroupEur: number;
  verdictWorthIt: boolean;
}

const yenToEur = (yen: number, fx: number) => yen / fx;
const round = (n: number) => Math.round(n);

/** Multiplicador de pasajeros: adultos a precio completo + niños a mitad. */
const paxFactor = (adults: number, children: number) => adults + children * 0.5;

export function computeJrPass(input: CalcInput, fx: number = DEFAULT_FX): CalcResult {
  const pax = paxFactor(input.adults, input.children);
  const selected = SEGMENTS.filter((s) => input.segmentIds.includes(s.id));
  const tripMult = input.roundTrip ? 2 : 1;

  const segmentsYenPerPerson = selected.reduce((sum, s) => sum + s.fareYen, 0) * tripMult;
  const segmentsTotalYen = segmentsYenPerPerson * pax;

  const longestPass = NATIONAL_PASS[NATIONAL_PASS.length - 1];
  const pass = NATIONAL_PASS.find((p) => input.days <= p.maxDays) ?? longestPass;
  const nationalPassYen = pass.priceYen * pax;
  // El pase más largo es de 21 días. En viajes más largos, los trenes fuera de ese periodo se
  // pagan aparte; como no sabemos cuáles caen fuera, no se inventa un "pase + resto": se avisa.
  const nationalPassCoversTrip = input.days <= longestPass.maxDays;

  // Pase Kansai-Hiroshima (5 días): se compara siempre que haya algún tramo cubierto, sumando
  // como billetes sueltos los tramos fuera de su área (p. ej. Tokio → Kioto). Supuesto, visible
  // en la UI: los tramos cubiertos se hacen dentro de 5 días consecutivos. Antes solo se
  // comparaba si el viaje ENTERO duraba <=5 días, así que con los 7 días por defecto la casilla
  // no hacía nada.
  const covered = selected.filter((s) => s.kansaiHiroshima);
  const uncovered = selected.filter((s) => !s.kansaiHiroshima);
  const kansaiApplies = input.kansai && covered.length > 0;
  const kansaiUncoveredYen = uncovered.reduce((sum, s) => sum + s.fareYen, 0) * tripMult * pax;
  const kansaiYen = kansaiApplies ? KANSAI_HIROSHIMA.priceYen * pax + kansaiUncoveredYen : null;

  const options: { key: CalcResult["cheapest"]; yen: number }[] = [
    { key: "billetes", yen: segmentsTotalYen },
    { key: "nacional", yen: nationalPassYen },
  ];
  if (kansaiYen !== null) options.push({ key: "kansai", yen: kansaiYen });
  options.sort((a, b) => a.yen - b.yen);

  const cheapest = options[0];
  const second = options[1];
  const savingsEur = round(yenToEur(second.yen - cheapest.yen, fx));

  // Presupuesto: gasto diario + la opción de transporte MÁS BARATA (antes sumaba siempre los
  // billetes sueltos aunque ganara un pase). Los niños cuentan como medio adulto también en
  // alojamiento y comida: aproximación, y así se indica en la UI.
  const b = BUDGET_PER_DAY[input.profile];
  const dailyYen = b.lodging + b.food + b.local;
  const budgetGroupYen = dailyYen * input.days * pax + cheapest.yen;
  const budgetPerPersonYen = budgetGroupYen / pax;

  return {
    fx,
    segmentsTotalEur: round(yenToEur(segmentsTotalYen, fx)),
    nationalPassEur: round(yenToEur(nationalPassYen, fx)),
    nationalPassLabel: pass.label,
    nationalPassCoversTrip,
    kansaiEur: kansaiYen !== null ? round(yenToEur(kansaiYen, fx)) : null,
    kansaiUncoveredEur: kansaiYen !== null ? round(yenToEur(kansaiUncoveredYen, fx)) : 0,
    cheapest: cheapest.key,
    savingsEur,
    budgetPerPersonEur: round(yenToEur(budgetPerPersonYen, fx)),
    budgetGroupEur: round(yenToEur(budgetGroupYen, fx)),
    verdictWorthIt: cheapest.key !== "billetes",
  };
}
