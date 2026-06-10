// Datos del JR Pass y lógica de cálculo (en euros).
// ⚠️ VERIFICAR antes de publicar y actualizar (ver design-system / plan):
//  - JR Pass nacional sube a ¥53.000/84.000/105.000 en oct-2026.
//  - JR East se reestructuró en mar-2026.
// Fuente: japanrailpass.net (oficial), jrpass.com/farecalculator. Última revisión manual: 2026-06-02.

export const DATA_UPDATED = "2026-06-02";
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
  /** ¿lo cubre el Kansai Wide Area Pass? */
  kansaiWide?: boolean;
}

export const SEGMENTS: Segment[] = [
  { id: "tokio-kioto", label: "Tokio → Kioto", fareYen: 14170 },
  { id: "tokio-osaka", label: "Tokio → Shin-Osaka", fareYen: 14400 },
  { id: "kioto-osaka", label: "Kioto → Osaka", fareYen: 570, kansaiWide: true },
  { id: "osaka-hiroshima", label: "Shin-Osaka → Hiroshima", fareYen: 10000, kansaiWide: true },
  { id: "tokio-hiroshima", label: "Tokio → Hiroshima", fareYen: 19440 },
  { id: "tokio-hakone", label: "Tokio → Odawara (Hakone)", fareYen: 3220 },
  { id: "osaka-kioto-nara", label: "Osaka → Nara", fareYen: 800, kansaiWide: true },
  { id: "kioto-kanazawa", label: "Kioto → Kanazawa", fareYen: 6930 },
];

/** Pase regional alternativo (MVP: solo Kansai Wide). */
export const KANSAI_WIDE = { priceYen: 12000, days: 5, label: "Kansai Wide Area Pass (5 días)" };

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
  kansaiEur: number | null;
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

  const pass = NATIONAL_PASS.find((p) => input.days <= p.maxDays) ?? NATIONAL_PASS[NATIONAL_PASS.length - 1];
  const nationalPassYen = pass.priceYen * pax;

  // Kansai Wide: solo si el viaje es de Kansai, dura <=5 días y todos los tramos están cubiertos.
  const allKansai = selected.length > 0 && selected.every((s) => s.kansaiWide);
  const kansaiApplies = input.kansai && input.days <= KANSAI_WIDE.days && allKansai;
  const kansaiYen = kansaiApplies ? KANSAI_WIDE.priceYen * pax : null;

  const options: { key: CalcResult["cheapest"]; yen: number }[] = [
    { key: "billetes", yen: segmentsTotalYen },
    { key: "nacional", yen: nationalPassYen },
  ];
  if (kansaiYen !== null) options.push({ key: "kansai", yen: kansaiYen });
  options.sort((a, b) => a.yen - b.yen);

  const cheapest = options[0];
  const second = options[1];
  const savingsEur = round(yenToEur(second.yen - cheapest.yen, fx));

  const b = BUDGET_PER_DAY[input.profile];
  const dailyYen = b.lodging + b.food + b.local;
  const budgetPerPersonYen = dailyYen * input.days + (selected.reduce((s, x) => s + x.fareYen, 0) * tripMult);
  const budgetGroupYen = budgetPerPersonYen * pax;

  return {
    fx,
    segmentsTotalEur: round(yenToEur(segmentsTotalYen, fx)),
    nationalPassEur: round(yenToEur(nationalPassYen, fx)),
    nationalPassLabel: pass.label,
    kansaiEur: kansaiYen !== null ? round(yenToEur(kansaiYen, fx)) : null,
    cheapest: cheapest.key,
    savingsEur,
    budgetPerPersonEur: round(yenToEur(budgetPerPersonYen, fx)),
    budgetGroupEur: round(yenToEur(budgetGroupYen, fx)),
    verdictWorthIt: cheapest.key !== "billetes",
  };
}
