// Genera pins de Pinterest (1000x1500, 2:3) a partir de las fotos propias.
// Uso: node scripts/generar-pins.mjs   -> escribe en pins/ (ignorada por git) y pins/PINS.md
import sharp from "sharp";
import fs from "node:fs";

const W = 1000;
const H = 1500;
const UTM = "utm_source=pinterest&utm_medium=social&utm_campaign=pins";

const PINS = [
  { foto: "kioto-higashiyama-noche", titulo: "Itinerario de 1 mes por Japón: semana a semana", ruta: "/itinerarios/itinerario-japon-1-mes", tablero: "Itinerarios por Japón", desc: "Cuatro semanas con cuatro bases fijas: Tokio, Kioto, Osaka, Hiroshima y los Alpes japoneses. Con presupuesto en euros y la cuenta del JR Pass." },
  { foto: "kioto-kiyomizu-panoramica", titulo: "Japón en 3 semanas: ruta de 21 días", ruta: "/itinerarios/itinerario-japon-3-semanas", tablero: "Itinerarios por Japón", desc: "Tokio, Kioto, Hiroshima, Kanazawa y Takayama día a día, con presupuesto por estilos y la cuenta del JR Pass hecha." },
  { foto: "fushimi-inari-toriis-madre", titulo: "Japón en 15 días: Tokio, Kioto, Hiroshima y Kanazawa", ruta: "/itinerarios/itinerario-japon-15-dias", tablero: "Itinerarios por Japón", desc: "Ruta de 15 días por Japón con tarifas reales de tren y presupuesto en euros." },
  { foto: "kioto-yasaka-pagoda-noche", titulo: "Dónde alojarse en Kioto: la mejor zona según tu viaje", ruta: "/destinos/donde-dormir-en-kioto", tablero: "Dónde dormir en Japón", desc: "Centro, estación, Gion-Higashiyama o Arashiyama: cuál elegir, tipos de alojamiento y cuándo dormir en Osaka." },
  { foto: "ramen-tonkotsu", titulo: "Qué comer en Japón: platos que no te puedes perder", ruta: "/gastronomia/que-comer-en-japon", tablero: "Comer en Japón", desc: "Ramen, sushi, tempura, katsu y más: qué pedir, cuánto cuesta y cómo hacerlo sin hablar japonés." },
  { foto: "tokio-noche-iluminacion", titulo: "Japón en diciembre: clima, qué hacer y qué evitar", ruta: "/logistica/japon-en-diciembre", tablero: "Cuándo viajar a Japón", desc: "Iluminaciones, otoño tardío en Kioto y precios bajos antes de Navidad. Y qué cierra en Año Nuevo." },
  { foto: "meiji-portones-torii", titulo: "Cuánto cuesta viajar a Japón en 2026", ruta: "/logistica/cuanto-cuesta-viajar-japon", tablero: "Presupuesto y consejos", desc: "De 40 a 215 € al día en destino. Presupuesto en euros para 7, 10 y 15 días." },
  { foto: "asakusa-pagoda-sensoji", titulo: "Qué llevar a Japón: checklist imprimible", ruta: "/logistica/que-llevar-maleta-japon", tablero: "Presupuesto y consejos", desc: "Enchufe, aduana, ropa por temporada y lo que no puede pasar. Con checklist interactiva." },
  { foto: "nintendo-tienda-animal-crossing", titulo: "Tax Free en Japón: qué cambia el 1 de noviembre de 2026", ruta: "/logistica/compras-y-tax-free-japon", tablero: "Presupuesto y consejos", desc: "Cómo funciona el nuevo sistema de reembolso, qué compras puedes hacer y qué declarar al volver a España." },
  { foto: "odaiba-gundam-unicorn-noche", titulo: "Qué ver en Tokio: barrios, miradores y plan de 3 días", ruta: "/destinos/que-ver-en-tokio", tablero: "Qué ver en Japón", desc: "Senso-ji, Shibuya, Meiji, Odaiba y qué mirador elegir. Con un plan que funciona." },
  { foto: "cartas-pokemon-precios", titulo: "Comprar cartas Pokémon en Japón: dónde y cuánto cuestan", ruta: "/cultura/cartas-pokemon-japon", tablero: "Japón friki", desc: "Tiendas de Akihabara, precios reales en vitrina, tax-free y aduana al volver." },
  { foto: "osaka-castillo-noche", titulo: "Qué ver en Osaka: Dotonbori, el castillo y qué comer", ruta: "/destinos/que-ver-en-osaka", tablero: "Qué ver en Japón", desc: "Castillo, Dotonbori, Shinsekai y los platos que probar. Con consejos de dónde dormir." },
];

function lineas(texto, max) {
  const out = [];
  let linea = "";
  for (const palabra of texto.split(" ")) {
    if ((linea + " " + palabra).trim().length > max) { out.push(linea.trim()); linea = palabra; }
    else linea += " " + palabra;
  }
  if (linea.trim()) out.push(linea.trim());
  return out;
}
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

fs.mkdirSync("pins", { recursive: true });
let md = "# Pins de Pinterest — lote 1\n\nPara cada pin: sube la imagen, pega el título, la descripción y el enlace, y elige el tablero.\n\n";

for (const [i, p] of PINS.entries()) {
  const ls = lineas(p.titulo, 17);
  const size = ls.length <= 3 ? 80 : 66;
  const alto = 150 + ls.length * (size + 14);
  const texto = ls.map((l, k) => `<text x="${W / 2}" y="${110 + k * (size + 14) + size}" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-weight="900" font-size="${size}" fill="#fff">${esc(l)}</text>`).join("");
  const svg = Buffer.from(
    `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
      <defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#000" stop-opacity="0.78"/><stop offset="1" stop-color="#000" stop-opacity="0"/></linearGradient></defs>
      <rect x="0" y="0" width="${W}" height="${alto + 140}" fill="url(#g)"/>
      <rect x="0" y="0" width="14" height="${H}" fill="#e1352e"/>
      ${texto}
      <rect x="0" y="${H - 96}" width="${W}" height="96" fill="#0a0a0a"/>
      <text x="${W / 2}" y="${H - 34}" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="40" fill="#fff" letter-spacing="3">VIAJAJAPON.COM</text>
    </svg>`,
  );
  const nombre = `pin-${String(i + 1).padStart(2, "0")}-${p.foto}.jpg`;
  await sharp(`public/images/propias/${p.foto}.jpg`)
    .resize(W, H - 96, { fit: "cover", position: "centre" })
    .extend({ bottom: 96, background: "#0a0a0a" })
    .composite([{ input: svg, left: 0, top: 0 }])
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(`pins/${nombre}`);
  md += `## Pin ${i + 1}: ${p.titulo}\n- **Imagen:** \`${nombre}\`\n- **Título:** ${p.titulo}\n- **Descripción:** ${p.desc}\n- **Enlace:** https://viajajapon.com${p.ruta}?${UTM}\n- **Tablero:** ${p.tablero}\n\n`;
  console.log(nombre);
}
fs.writeFileSync("pins/PINS.md", md);
console.log("listo:", PINS.length, "pins");
