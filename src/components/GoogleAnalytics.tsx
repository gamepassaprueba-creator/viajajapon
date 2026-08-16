"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import {
  ANALYTICS_CONSENT_EVENT,
  GA4_MEASUREMENT_ID,
  type AnalyticsConsent,
  readAnalyticsConsent,
} from "@/lib/analytics";

type Gtag = (...args: unknown[]) => void;

type AnalyticsWindow = Window & {
  gtag?: Gtag;
};

const CONSENT_GRANTED = {
  analytics_storage: "granted",
  ad_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
} as const;

const CONSENT_DENIED = {
  analytics_storage: "denied",
  ad_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
} as const;

export function GoogleAnalytics() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const analyticsWindow = window as AnalyticsWindow;
    const disableKey = `ga-disable-${GA4_MEASUREMENT_ID}`;

    const applyConsent = (consent: AnalyticsConsent, fromUserAction: boolean) => {
      if (consent === "accepted") {
        Reflect.set(window, disableKey, false);

        // Si gtag ya estaba cargado (por ejemplo, el usuario rechazó y luego
        // cambió de opinión), reactivamos medición sin recargar la página.
        if (typeof analyticsWindow.gtag === "function") {
          analyticsWindow.gtag("consent", "update", CONSENT_GRANTED);
          if (fromUserAction) {
            analyticsWindow.gtag("config", GA4_MEASUREMENT_ID, {
              page_location: window.location.href,
              page_path: `${window.location.pathname}${window.location.search}`,
            });
          }
        }

        setEnabled(true);
        return;
      }

      if (typeof analyticsWindow.gtag === "function") {
        analyticsWindow.gtag("consent", "update", CONSENT_DENIED);
      }
      Reflect.set(window, disableKey, true);
      setEnabled(false);
    };

    const initialConsent = readAnalyticsConsent();
    if (initialConsent) applyConsent(initialConsent, false);

    const onConsentChange = (event: Event) => {
      const consent = (event as CustomEvent<AnalyticsConsent>).detail;
      if (consent === "accepted" || consent === "rejected") {
        applyConsent(consent, true);
      }
    };

    window.addEventListener(ANALYTICS_CONSENT_EVENT, onConsentChange);
    return () => window.removeEventListener(ANALYTICS_CONSENT_EVENT, onConsentChange);
  }, []);

  if (!enabled || !GA4_MEASUREMENT_ID) return null;

  return (
    <>
      <Script id="viajajapon-ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          window.gtag = window.gtag || function(){window.dataLayer.push(arguments);};
          window['ga-disable-${GA4_MEASUREMENT_ID}'] = false;
          window.gtag('consent', 'default', {
            analytics_storage: 'granted',
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied'
          });
          window.gtag('js', new Date());
          window.gtag('config', '${GA4_MEASUREMENT_ID}');
        `}
      </Script>
      <Script
        id="viajajapon-ga4-loader"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
    </>
  );
}
