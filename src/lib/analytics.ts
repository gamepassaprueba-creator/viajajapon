export const GA4_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA4_ID?.trim() || "G-NGK9K8DWYP";

export const COOKIE_CONSENT_STORAGE_KEY = "cookie_consent";
// Fecha de la decisión: pasados 12 meses se vuelve a preguntar (la AEPD
// recomienda renovar el consentimiento como máximo cada 24 meses).
const COOKIE_CONSENT_DATE_KEY = "cookie_consent_at";
const CONSENT_MAX_AGE_MS = 365 * 24 * 60 * 60 * 1000;
export const ANALYTICS_CONSENT_EVENT = "viajajapon:analytics-consent";
export const COOKIE_PREFERENCES_EVENT = "viajajapon:open-cookie-preferences";

export type AnalyticsConsent = "accepted" | "rejected";

type Gtag = (...args: unknown[]) => void;

type AnalyticsWindow = Window & {
  gtag?: Gtag;
  dataLayer?: unknown[];
};

export function readAnalyticsConsent(): AnalyticsConsent | null {
  if (typeof window === "undefined") return null;

  try {
    const value = window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);
    if (value !== "accepted" && value !== "rejected") return null;

    const savedAt = Date.parse(window.localStorage.getItem(COOKIE_CONSENT_DATE_KEY) ?? "");
    if (Number.isNaN(savedAt)) {
      // Decisiones guardadas antes de registrar la fecha: empiezan a contar hoy.
      window.localStorage.setItem(COOKIE_CONSENT_DATE_KEY, new Date().toISOString());
    } else if (Date.now() - savedAt > CONSENT_MAX_AGE_MS) {
      return null;
    }
    return value;
  } catch {
    return null;
  }
}

export function setAnalyticsConsent(consent: AnalyticsConsent): void {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, consent);
    window.localStorage.setItem(COOKIE_CONSENT_DATE_KEY, new Date().toISOString());
  } catch {
    // Si el navegador bloquea localStorage, la decisión se aplica a esta sesión
    // mediante el evento, aunque no pueda persistirse entre visitas.
  }

  window.dispatchEvent(
    new CustomEvent<AnalyticsConsent>(ANALYTICS_CONSENT_EVENT, { detail: consent }),
  );
}

// Al retirar el consentimiento, borra las cookies de Google Analytics (_ga, _ga_*)
// que ya se hubieran instalado, en el host y en el dominio padre.
export function clearAnalyticsCookies(): void {
  if (typeof document === "undefined") return;

  const host = window.location.hostname;
  const domains = ["", host, `.${host.replace(/^www\./, "")}`];
  for (const cookie of document.cookie.split(";")) {
    const name = cookie.split("=")[0]?.trim();
    if (!name || !/^_ga(_|$)/.test(name)) continue;
    for (const domain of domains) {
      document.cookie = `${name}=; Max-Age=0; path=/${domain ? `; domain=${domain}` : ""}`;
    }
  }
}

export function openCookiePreferences(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(COOKIE_PREFERENCES_EVENT));
}

export function trackEvent(
  name: string,
  params: Record<string, string | number> = {},
): boolean {
  if (typeof window === "undefined" || readAnalyticsConsent() !== "accepted") {
    return false;
  }

  const analyticsWindow = window as AnalyticsWindow;
  if (typeof analyticsWindow.gtag !== "function") return false;

  analyticsWindow.gtag("event", name, params);
  return true;
}
