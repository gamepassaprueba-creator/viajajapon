"use client";

import { openCookiePreferences } from "@/lib/analytics";

export function CookiePreferencesButton() {
  return (
    <button
      type="button"
      onClick={openCookiePreferences}
      className="font-mono text-[9px] text-white/30 hover:text-white"
    >
      Preferencias de cookies
    </button>
  );
}
