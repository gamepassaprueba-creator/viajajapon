export const GA4_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA4_ID?.trim() || "G-NGK9K8DWYP";

export const COOKIE_CONSENT_STORAGE_KEY = "cookie_consent";
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
    return value === "accepted" || value === "rejected" ? value : null;
  } catch {
    return null;
  }
}

export function setAnalyticsConsent(consent: AnalyticsConsent): void {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, consent);
  } catch {
    // Si el navegador bloquea localStorage, la decisión se aplica a esta sesión
    // mediante el evento, aunque no pueda persistirse entre visitas.
  }

  window.dispatchEvent(
    new CustomEvent<AnalyticsConsent>(ANALYTICS_CONSENT_EVENT, { detail: consent }),
  );
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
