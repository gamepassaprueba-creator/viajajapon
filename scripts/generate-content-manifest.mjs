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

// 3. Generar el manifiesto global
const manifestCode = `// Este archivo se genera automáticamente. No editar manualmente.
import type { ArticleMeta } from "@/lib/content";

export const allArticlesMeta: ArticleMeta[] = ${JSON.stringify(allArticlesMeta, null, 2)};
`;

fs.writeFileSync(path.join(GENERATED_DIR, "content-manifest.ts"), manifestCode, "utf8");

console.log(`[build] Generado manifiesto de contenido: ${allArticlesMeta.length} artículos.`);
