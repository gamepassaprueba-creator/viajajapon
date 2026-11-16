export type FlightQuote = {
  origin: string;
  destination: "indiferente" | "tokio" | "osaka" | "nagoya" | "otro";
  departureDate: string;
  returnDate: string;
  flexibility: "exactas" | "tres_dias" | "siete_dias";
  adults: number;
  minors: number;
  minorAges: string;
  baggage: "mano" | "facturada" | "indiferente";
  stops: "directo" | "una_escala" | "indiferente";
  budgetPerPerson: number | null;
  name: string;
  email: string;
  phone: string;
  notes: string;
  privacyAccepted: true;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

function readText(value: unknown, max: number): string | null {
  if (typeof value !== "string") return null;
  const cleaned = value.trim().replace(/[\r\n\t]+/g, " ");
  return cleaned.length <= max ? cleaned : null;
}

function validDate(value: string): boolean {
  if (!DATE_RE.test(value)) return false;
  const date = new Date(value + "T00:00:00Z");
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

function oneOf<T extends string>(value: unknown, options: readonly T[]): value is T {
  return typeof value === "string" && options.includes(value as T);
}

export function parseFlightQuote(input: unknown, today = new Date().toISOString().slice(0, 10)): FlightQuote | null {
  if (!input || typeof input !== "object" || Array.isArray(input)) return null;
  const x = input as Record<string, unknown>;

  const origin = readText(x.origin, 90);
  const destination = x.destination;
  const departureDate = readText(x.departureDate, 10);
  const returnDate = readText(x.returnDate, 10);
  const flexibility = x.flexibility;
  const baggage = x.baggage;
  const stops = x.stops;
  const adults = x.adults;
  const minors = x.minors;
  const minorAges = readText(x.minorAges ?? "", 80);
  const name = readText(x.name, 100);
  const email = readText(x.email, 254);
  const phone = readText(x.phone ?? "", 40);
  const notes = readText(x.notes ?? "", 600);
  const rawBudget = x.budgetPerPerson;
  const budgetPerPerson = rawBudget === null || rawBudget === ""
    ? null
    : (typeof rawBudget === "number" ? rawBudget : Number.NaN);

  if (!origin || !/^[\p{L}\p{M}\d .'()/-]+$/u.test(origin)) return null;
  if (!oneOf(destination, ["indiferente", "tokio", "osaka", "nagoya", "otro"] as const)) return null;
  if (!departureDate || !returnDate || !validDate(departureDate) || !validDate(returnDate)) return null;
  if (departureDate < today || returnDate <= departureDate) return null;
  if (!oneOf(flexibility, ["exactas", "tres_dias", "siete_dias"] as const)) return null;
  if (!Number.isInteger(adults) || (adults as number) < 1 || (adults as number) > 9) return null;
  if (!Number.isInteger(minors) || (minors as number) < 0 || (minors as number) > 6) return null;
  if (minorAges === null) return null;
  if ((minors as number) > 0) {
    if (!/^\d{1,2}(?:\s*,\s*\d{1,2})*$/.test(minorAges)) return null;
    const ages = minorAges.split(",").map((age) => Number(age.trim()));
    if (ages.length !== minors || ages.some((age) => age > 17)) return null;
  }
  if (!oneOf(baggage, ["mano", "facturada", "indiferente"] as const)) return null;
  if (!oneOf(stops, ["directo", "una_escala", "indiferente"] as const)) return null;
  if (budgetPerPerson !== null && (!Number.isInteger(budgetPerPerson) || budgetPerPerson < 100 || budgetPerPerson > 10000)) return null;
  // El teléfono y las observaciones son opcionales; el nombre y email no.
  if (!name || !email || !EMAIL_RE.test(email) || phone === null || notes === null) return null;
  if (phone && !/^[+\d\s().-]{6,40}$/.test(phone)) return null;
  if (x.privacyAccepted !== true) return null;

  return {
    origin, destination, departureDate, returnDate, flexibility,
    adults: adults as number, minors: minors as number,
    minorAges: (minors as number) > 0 ? minorAges : "",
    baggage, stops, budgetPerPerson, name,
    email: email.toLowerCase(), phone, notes, privacyAccepted: true,
  };
}
