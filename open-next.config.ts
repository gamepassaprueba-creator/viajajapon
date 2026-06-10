// Configuración de OpenNext para Cloudflare Workers.
// Caché incremental de ISR en KV (gratis y SIN tarjeta; R2 exige método de pago en la cuenta).
// queue "direct": revalidación ISR inmediata, adecuada para tráfico bajo/medio.
import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import kvIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/kv-incremental-cache";

export default defineCloudflareConfig({
  incrementalCache: kvIncrementalCache,
  queue: "direct",
});
