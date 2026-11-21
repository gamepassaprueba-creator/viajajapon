/**
 * Servicio «Te mejoramos el vuelo a Japón» (acuerdo con un colaborador que vende códigos de
 * descuento de Iberia; el lector compra el vuelo a su nombre en iberia.com).
 *
 * El servicio está APAGADO mientras GET /api/vuelos no diga lo contrario: hace falta
 * VUELOS_ACTIVO=1 y el bot de avisos configurado (TELEGRAM_BOT_TOKEN y TELEGRAM_CHAT_ID).
 * El colaborador recibe la solicitud con el nombre y el contacto del lector y es quien le escribe.
 * Las solicitudes llegan solo al titular por Telegram y él se las reenvía al colaborador.
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

/**
 * Precio estimado del formulario (fase 1, diseño «VuelosEstimado» del lienzo): el lector escribe lo
 * que le sale en iberia.com y ve al momento lo que pagaría con el colaborador. La regla la pone el
 * colaborador; con `null` la caja no se muestra. Ejemplos:
 *   { descuento: 0.1, codigo: { tipo: "porcentaje", valor: 0.03 }, ahorroMinimo: 30 }
 *   { descuento: 0.1, codigo: { tipo: "fijo", valor: 40, porPersona: true }, ahorroMinimo: 30 }
 */
export type ReglaEstimado = {
  /** Descuento del código sobre el total de Iberia (0.1 = 10 %). */
  descuento: number;
  /** Lo que paga el lector por el código: % del total de Iberia o importe fijo en euros. */
  codigo: { tipo: "porcentaje"; valor: number } | { tipo: "fijo"; valor: number; porPersona: boolean };
  /** Por debajo de este ahorro neto (en euros) se dice que el código no compensa. */
  ahorroMinimo: number;
};

export const VUELOS_ESTIMADO: ReglaEstimado | null = null;

export type Estimado = {
  precio: number;
  descuento: number;
  coste: number;
  total: number;
  porPersona: number;
  precioPorPersona: number;
  ahorro: number;
  compensa: boolean;
};

/** "2.400", "2400", "1.240,50" o "1240.5" → número en euros, o null. */
export function leerPrecio(texto: string): number | null {
  const t = texto.replace(/[\s€]/g, "");
  if (!t) return null;
  const normal = t.includes(",") ? t.replace(/\./g, "").replace(",", ".") : /^\d{1,3}(\.\d{3})+$/.test(t) ? t.replace(/\./g, "") : t;
  const n = Number(normal);
  return Number.isFinite(n) && n > 0 ? n : null;
}

/** Cuenta del precio estimado con la regla del colaborador; null sin regla o sin precio válido. */
export function calcularEstimado(precioTexto: string, personas: number, regla: ReglaEstimado | null = VUELOS_ESTIMADO): Estimado | null {
  const precio = leerPrecio(precioTexto);
  if (!regla || precio === null || personas < 1) return null;
  const descuento = Math.round(precio * regla.descuento);
  const coste = Math.round(
    regla.codigo.tipo === "porcentaje" ? precio * regla.codigo.valor : regla.codigo.valor * (regla.codigo.porPersona ? personas : 1),
  );
  const total = Math.round(precio - descuento + coste);
  const ahorro = Math.round(precio - total);
  return {
    precio: Math.round(precio),
    descuento,
    coste,
    total,
    porPersona: Math.round(total / personas),
    precioPorPersona: Math.round(precio / personas),
    ahorro,
    compensa: ahorro >= regla.ahorroMinimo,
  };
}

/** 2400 → "2.400 €" */
export function euros(n: number): string {
  // A mano: Intl en es-ES no agrupa los números de cuatro cifras («2400»).
  const signo = n < 0 ? "−" : "";
  return `${signo}${Math.abs(Math.round(n)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} €`;
}
