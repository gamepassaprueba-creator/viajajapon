/**
 * Servicio «Te mejoramos el vuelo a Japón» (acuerdo con un colaborador que vende códigos de
 * descuento de Iberia; el lector compra el vuelo a su nombre en iberia.com).
 *
 * El servicio está APAGADO mientras GET /api/vuelos no diga lo contrario: hace falta
 * VUELOS_ACTIVO=1 y el bot de avisos configurado (TELEGRAM_BOT_TOKEN y TELEGRAM_CHAT_ID).
 * El colaborador recibe la solicitud con el nombre y el contacto del lector y es quien le escribe.
 * Plan completo: marketing/planes/plan-vuelos-boletox-2026-11-16.md
 * (privado, fuera del repositorio).
 */
export const VUELOS = {
  /** Plazo de respuesta que se promete al lector, en horas. */
  respuestaHoras: 24,
  /** Horas que la oferta mantiene el precio una vez enviada. */
  validezHoras: 24,
  /** Quién vende el código y atiende al lector. Sin nombre, la página muestra «pendiente de confirmar». */
  colaborador: { nombre: "BoletoX25 PLC", pais: "Malta", nif: "" },
  /** WhatsApp público en formato internacional sin «+» ni espacios (p. ej. "34600000000"). Vacío = sin botón. */
  whatsapp: "",
  /** Usuario público de Telegram sin «@». Vacío = sin botón. */
  telegram: "",
} as const;

/** Mensaje que se abre ya escrito en WhatsApp o Telegram. */
export const VUELOS_MENSAJE_DIRECTO =
  "Hola, quiero que me mejoréis el precio de un vuelo a Japón.\n" +
  "Salgo de: \nFechas (ida y vuelta): \nPersonas: \nMaletas por persona: \nPrecio que he visto y dónde: ";

export function whatsappHref() {
  return VUELOS.whatsapp ? `https://wa.me/${VUELOS.whatsapp}?text=${encodeURIComponent(VUELOS_MENSAJE_DIRECTO)}` : null;
}
export function telegramHref() {
  return VUELOS.telegram ? `https://t.me/${VUELOS.telegram}` : null;
}

export const VUELOS_ORIGENES = ["Madrid", "Barcelona"] as const;
export const VUELOS_DESTINOS = ["Tokio", "Osaka", "Me da igual"] as const;
export const VUELOS_FLEXIBILIDAD = ["Fechas fijas", "Puedo mover 3 días", "Soy flexible"] as const;
export const VUELOS_CLASES = ["Turista", "Turista Premium", "Business"] as const;
export const VUELOS_VISTO_EN = ["iberia.com", "Skyscanner", "Google Flights", "Otro sitio"] as const;
export const VUELOS_PRIORIDAD = ["Vuelo directo", "El precio", "Las maletas"] as const;
export const VUELOS_CANALES = ["WhatsApp", "Telegram", "Correo"] as const;
export const VUELOS_MALETAS = ["1", "2", "3 o más"] as const;

/** Tamaño máximo de la captura (bytes). */
export const VUELOS_CAPTURA_MAX = 5 * 1024 * 1024;
export const VUELOS_CAPTURA_TIPOS = ["image/jpeg", "image/png", "image/webp"] as const;
