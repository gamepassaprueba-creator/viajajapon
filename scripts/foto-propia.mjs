// Procesa una foto propia del viaje para publicarla en public/images/propias/.
// Uso: node scripts/foto-propia.mjs <origen.jpg> <nombre-destino> [left,top,width,height]
// - Corrige la orientación y elimina EXIF/GPS del original.
// - Recorte opcional (para sacar a desconocidos del encuadre).
// - Ancho máx. 1600 px, JPEG mozjpeg q80.
// - Marca de agua abajo a la derecha: icono de la web (cuadrado rojo con torii) + "viajajapon.com", y copyright en EXIF.
import sharp from "sharp";

const [, , src, name, crop] = process.argv;
if (!src || !name) {
  console.error("Uso: node scripts/foto-propia.mjs <origen.jpg> <nombre-destino> [left,top,width,height]");
  process.exit(1);
}

let buf = await sharp(src).rotate().toBuffer();
if (crop) {
  const [left, top, width, height] = crop.split(",").map(Number);
  buf = await sharp(buf).extract({ left, top, width, height }).toBuffer();
}
buf = await sharp(buf).resize({ width: 1600, withoutEnlargement: true }).toBuffer();

const { width: w, height: h } = await sharp(buf).metadata();
const size = Math.round(Math.max(18, w * 0.024));
const pad = Math.round(w * 0.03);
const font = `font-family:Arial,Helvetica,sans-serif;font-weight:700;font-size:${size}px`;

// Ancho real del texto: se pinta aparte y se recorta el sobrante.
const probe = await sharp(
  Buffer.from(`<svg width="${size * 12}" height="${size * 2}" xmlns="http://www.w3.org/2000/svg"><text x="0" y="${size * 1.4}" style="${font}" fill="black">viajajapon.com</text></svg>`),
)
  .trim()
  .toBuffer({ resolveWithObject: true });
const textW = probe.info.width;

// Icono de la web (src/app/icon.svg): cuadrado rojo con el torii blanco, delante del texto.
const icon = Math.round(size * 1.45);
const gap = Math.round(size * 0.4);
const textX = w - pad - textW;
const iconX = textX - gap - icon;
const iconY = Math.round(h - pad - size * 0.36 - icon / 2);
const torii =
  `<g transform="translate(${iconX} ${iconY}) scale(${icon / 32})">` +
  `<rect width="32" height="32" rx="7" fill="#d32f2f"/>` +
  `<g fill="#ffffff"><path d="M2 6.6 Q16 9.2 30 6.6 L30 10 Q16 12.6 2 10 Z"/><path d="M7.2 11.2 L10.2 11.2 L9.4 28 L6.4 28 Z"/>` +
  `<path d="M21.8 11.2 L24.8 11.2 L25.6 28 L22.6 28 Z"/><rect x="4.4" y="15.2" width="23.2" height="2.4" rx="0.5"/><rect x="14.8" y="11.4" width="2.4" height="3.8"/></g></g>`;
const svg = Buffer.from(
  `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">` +
    `<rect x="${iconX + 2}" y="${iconY + 2}" width="${icon}" height="${icon}" rx="${(icon * 7) / 32}" fill="black" fill-opacity="0.3"/>` +
    torii +
    `<text x="${textX + 2}" y="${h - pad + 2}" style="${font}" fill="black" fill-opacity="0.35">viajajapon.com</text>` +
    `<text x="${textX}" y="${h - pad}" style="${font}" fill="white" fill-opacity="0.85">viajajapon.com</text>` +
    `</svg>`,
);

const out = `public/images/propias/${name}.jpg`;
const info = await sharp(buf)
  .composite([{ input: svg, left: 0, top: 0 }])
  .withExif({ IFD0: { Copyright: "(c) viajajapon.com", Artist: "Sergio (viajajapon.com)" } })
  .jpeg({ quality: 80, mozjpeg: true })
  .toFile(out);
console.log(`${out} ${info.width}x${info.height} ${Math.round(info.size / 1024)}KB`);
