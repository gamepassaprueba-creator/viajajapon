/** Formato de fecha en español (sin dependencias de Node; usable en cliente y servidor). */
export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("es-ES", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(iso));
}
