import fs from "node:fs";
import path from "node:path";

const OUT = process.argv[2];
const DIR = process.argv[3] || "d:/viajajapon/content/logistica";

const data = JSON.parse(fs.readFileSync(OUT, "utf8"));
const articles = Array.isArray(data.result) ? data.result : [];
fs.mkdirSync(DIR, { recursive: true });

const esc = (s) => String(s ?? "").replace(/\\/g, "\\\\").replace(/"/g, '\\"');

for (const a of articles) {
  if (!a || !a.slug || !a.mdxBody) {
    console.log("SKIP (incompleto):", a?.slug);
    continue;
  }
  const fm = [
    "---",
    `title: "${esc(a.title)}"`,
    `description: "${esc(a.description)}"`,
    `kicker: "${esc(a.kicker)}"`,
    `datePublished: "2026-06-02"`,
    `dateModified: "2026-06-02"`,
    `excerpt: "${esc(a.excerpt)}"`,
    "draft: false",
    "---",
    "",
  ].join("\n");
  const file = path.join(DIR, `${a.slug}.mdx`);
  // Sanea MDX: escapa los "<" que NO inician una etiqueta/componente JSX
  // (p. ej. "<¥3.000", "< 5€") para que MDX no los trate como JSX.
  const body = String(a.mdxBody)
    .replace(/<(?![a-zA-Z/])/g, "&lt;")
    .trim();
  fs.writeFileSync(file, fm + body + "\n", "utf8");
  console.log(`OK ${a.slug}.mdx (${a.mdxBody.length} chars, ${a.sources?.length ?? 0} fuentes)`);
}
