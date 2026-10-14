import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CONTENT_DIR = path.join(__dirname, "../content");
const GENERATED_DIR = path.join(__dirname, "../src/generated");
const CONTENT_GEN_DIR = path.join(GENERATED_DIR, "content");

// 1. Limpiar directorio generado
if (fs.existsSync(GENERATED_DIR)) {
  fs.rmSync(GENERATED_DIR, { recursive: true, force: true });
}
fs.mkdirSync(CONTENT_GEN_DIR, { recursive: true });

// 2. Leer pilares
const pillars = fs
  .readdirSync(CONTENT_DIR, { withFileTypes: true })
  .filter((e) => e.isDirectory())
  .map((e) => e.name);

const allArticlesMeta = [];

function readingMinutes(content) {
  const words = content.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

for (const pillar of pillars) {
  const pillarDir = path.join(CONTENT_DIR, pillar);
  const files = fs.readdirSync(pillarDir).filter((f) => f.endsWith(".mdx"));
  
  fs.mkdirSync(path.join(CONTENT_GEN_DIR, pillar), { recursive: true });

  for (const file of files) {
    const slug = file.replace(/\.mdx$/, "");
    const filePath = path.join(pillarDir, file);
    const raw = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(raw);

    // Validación de campos obligatorios
    if (!data.title) throw new Error(`Falta 'title' en ${filePath}`);
    if (!data.description) throw new Error(`Falta 'description' en ${filePath}`);
    if (!data.kicker) throw new Error(`Falta 'kicker' en ${filePath}`);
    if (!data.datePublished) throw new Error(`Falta 'datePublished' en ${filePath}`);
    if (!data.dateModified) throw new Error(`Falta 'dateModified' en ${filePath}`);
    if (data.orden !== undefined && (!Number.isInteger(data.orden) || data.orden < 1)) {
      throw new Error(`'orden' debe ser un entero >= 1 en ${filePath}`);
    }

    // Asegurar que las fechas son strings ISO si gray-matter las parseó como Date
    const datePublished = data.datePublished instanceof Date ? data.datePublished.toISOString() : String(data.datePublished);
    const dateModified = data.dateModified instanceof Date ? data.dateModified.toISOString() : String(data.dateModified);

    const meta = {
      pillar,
      slug,
      ...data,
      datePublished,
      dateModified,
      readingMinutes: readingMinutes(content),
    };
    
    allArticlesMeta.push(meta);

    // Generar archivo individual de contenido
    const contentCode = `// Este archivo se genera automáticamente. No editar manualmente.\nexport const content = ${JSON.stringify(content)};\n`;
    fs.writeFileSync(path.join(CONTENT_GEN_DIR, pillar, `${slug}.ts`), contentCode, "utf8");
  }
}

// 3. Validar el mapa editorial de relacionados (src/data/related-content.json): cada clave y
//    cada destino deben existir, sin autoenlaces. Así borrar o renombrar un MDX rompe el build
//    en vez de dejar enlaces muertos en "Sigue leyendo".
const relatedPath = path.join(__dirname, "../src/data/related-content.json");
if (fs.existsSync(relatedPath)) {
  const related = JSON.parse(fs.readFileSync(relatedPath, "utf8"));
  const keys = new Set(allArticlesMeta.map((a) => `${a.pillar}/${a.slug}`));
  const errors = [];
  for (const [key, targets] of Object.entries(related)) {
    if (!keys.has(key)) errors.push(`related-content: la clave "${key}" no existe en content/`);
    if (!Array.isArray(targets)) {
      errors.push(`related-content: "${key}" debe ser una lista`);
      continue;
    }
    for (const target of targets) {
      if (!keys.has(target)) errors.push(`related-content: "${key}" enlaza a "${target}", que no existe`);
      if (target === key) errors.push(`related-content: "${key}" se enlaza a sí misma`);
    }
    if (targets.length < 3) console.warn(`[build] aviso: "${key}" tiene menos de 3 relacionados`);
  }
  const missing = [...keys].filter((k) => !related[k] && !k.startsWith("blog/"));
  if (missing.length) console.warn(`[build] aviso: guías sin relacionados editoriales: ${missing.join(", ")}`);
  if (errors.length) throw new Error(errors.join("\n"));
}

// 3b. Validar los destinos de Booking usados en el contenido (destino="…", booking: "…",
//     ryokan="…" y el frontmatter destinoBooking) contra src/data/booking-links.ts. Una errata
//     no rompería el render (cae en "Japón") pero mandaría al lector a la ciudad equivocada.
const bookingPath = path.join(__dirname, "../src/data/booking-links.ts");
if (fs.existsSync(bookingPath)) {
  const src = fs.readFileSync(bookingPath, "utf8");
  const validos = new Set([...src.matchAll(/^\s+"?([a-z][a-z0-9-]*)"?: \{ label:/gm)].map((m) => m[1]));
  const errores = [];
  for (const meta of allArticlesMeta) {
    const raw = fs.readFileSync(path.join(CONTENT_DIR, meta.pillar, `${meta.slug}.mdx`), "utf8");
    const usados = [
      ...[...raw.matchAll(/\b(?:destino|ryokan)="([^"]+)"/g)].map((m) => m[1]),
      ...[...raw.matchAll(/\bbooking:\s*"([^"]+)"/g)].map((m) => m[1]),
    ];
    if (meta.destinoBooking) usados.push(meta.destinoBooking);
    for (const k of usados) {
      if (!validos.has(k)) errores.push(`booking: "${meta.pillar}/${meta.slug}" usa el destino "${k}", que no existe en booking-links.ts`);
    }
  }
  if (errores.length) throw new Error(errores.join("\n"));
}

// 4. Generar el manifiesto global
const manifestCode = `// Este archivo se genera automáticamente. No editar manualmente.
import type { ArticleMeta } from "@/lib/content";

export const allArticlesMeta: ArticleMeta[] = ${JSON.stringify(allArticlesMeta, null, 2)};
`;

fs.writeFileSync(path.join(GENERATED_DIR, "content-manifest.ts"), manifestCode, "utf8");

console.log(`[build] Generado manifiesto de contenido: ${allArticlesMeta.length} artículos.`);
