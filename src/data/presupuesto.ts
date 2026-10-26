// Modelo de la calculadora de presupuesto (diseño: tablero «CalcPresupuesto» del lienzo).
// Reutiliza los datos verificados de la calculadora del JR Pass (src/data/jrpass.ts): gasto diario
// por estilo (40/95/215 €/día, las mismas cifras de la guía «Cuánto cuesta viajar a Japón») y
// tarifas de shinkansen de asiento reservado. Ajustes propios, a partir de las consultas en Booking
// del 14 y del 26-oct-2026 (precio por zona en Tokio, Kioto y Osaka):
//  - Temporada: el alojamiento baja un 15 % en temporada baja y casi se duplica en cerezos y otoño
//    (Tokio ×1,5-2, Kioto ×4-5 en el centro, Osaka ×1,4: media prudente ×1,8).
//  - Viajar solo: la habitación individual cuesta ~70 % de la doble, o sea ~1,4 veces lo que paga cada uno compartiendo
//    (no aplica al estilo mochilero, que duerme en dormitorio compartido o cápsula).
//  - eSIM (~15 €) y seguro (~2,5 €/día): rangos de las guías de eSIM y seguro.

import { BUDGET_PER_DAY, DEFAULT_FX, SEGMENTS, type Profile } from "@/data/jrpass";

export type Season = "baja" | "normal" | "alta";
export type Route = "una" | "clasica" | "hiroshima";

export const SEASON_LABEL: Record<Season, string> = {
  baja: "Temporada baja (ene-feb, jun)",
  normal: "Normal",
  alta: "Cerezos u otoño",
};

const SEASON_LODGING: Record<Season, number> = { baja: 0.85, normal: 1, alta: 1.8 };

const fare = (id: string) => SEGMENTS.find((s) => s.id === id)?.fareYen ?? 0;

export const ROUTES: Record<Route, { label: string; legs: string[] }> = {
  una: { label: "Una sola ciudad (sin shinkansen)", legs: [] },
  clasica: { label: "Tokio → Kioto → Osaka → Tokio", legs: ["tokio-kioto", "kioto-osaka", "tokio-osaka"] },
  hiroshima: {
    label: "Tokio → Kioto → Osaka → Hiroshima → Tokio",
    legs: ["tokio-kioto", "kioto-osaka", "osaka-hiroshima", "tokio-hiroshima"],
  },
};

export const ESIM_EUR = 15;
export const INSURANCE_EUR_PER_DAY = 2.5;
export const DEFAULT_FLIGHT_EUR = 850;

export interface BudgetInput {
  days: number;
  people: number;
  profile: Profile;
  season: Season;
  route: Route;
  flightEur: number;
}

export interface BudgetLine {
  key: string;
  label: string;
  eur: number;
}

export interface BudgetResult {
  perPerson: number;
  total: number;
  perDayNoFlight: number;
  perPersonYen: number;
  lines: BudgetLine[];
}

export function computeBudget(i: BudgetInput, fx = DEFAULT_FX): BudgetResult {
  const b = BUDGET_PER_DAY[i.profile];
  const solo = i.people === 1 && i.profile !== "mochilero" ? 1.4 : 1;
  const lodgingYen = b.lodging * SEASON_LODGING[i.season] * solo * i.days;
  const foodYen = b.food * i.days;
  const localYen = b.local * i.days;
  const trainsYen = ROUTES[i.route].legs.reduce((sum, id) => sum + fare(id), 0);
  const fixedEur = ESIM_EUR + INSURANCE_EUR_PER_DAY * i.days;
  const flight = Math.max(0, i.flightEur || 0);

  const lines: BudgetLine[] = [
    { key: "vuelo", label: "Vuelo", eur: Math.round(flight) },
    { key: "alojamiento", label: "Alojamiento", eur: Math.round(lodgingYen / fx) },
    { key: "comida", label: "Comida", eur: Math.round(foodYen / fx) },
    { key: "local", label: "Transporte y extras", eur: Math.round(localYen / fx) },
    { key: "trenes", label: "Shinkansen", eur: Math.round(trainsYen / fx) },
    { key: "fijos", label: "eSIM y seguro", eur: Math.round(fixedEur) },
  ];
  const perPerson = lines.reduce((s, l) => s + l.eur, 0);
  const noFlight = perPerson - lines[0].eur;
  return {
    perPerson,
    total: perPerson * i.people,
    perDayNoFlight: Math.round(noFlight / i.days),
    perPersonYen: Math.round((noFlight * fx) / 100) * 100,
    lines,
  };
}
