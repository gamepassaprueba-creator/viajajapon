// Procesa una foto propia del viaje para publicarla en public/images/propias/.
// Uso: node scripts/foto-propia.mjs <origen.jpg> <nombre-destino> [left,top,width,height]
// - Corrige la orientación y elimina EXIF/GPS del original.
// - Recorte opcional (para sacar a desconocidos del encuadre).
// - Ancho máx. 1600 px, JPEG mozjpeg q80.
// - Marca de agua discreta "viajajapon.com" abajo a la derecha + copyright en EXIF.
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
const svg = Buffer.from(
  `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">` +
    `<style>.t{font-family:Arial,Helvetica,sans-serif;font-weight:700;font-size:${size}px}</style>` +
    `<text x="${w - pad + 2}" y="${h - pad + 2}" text-anchor="end" class="t" fill="black" fill-opacity="0.35">viajajapon.com</text>` +
    `<text x="${w - pad}" y="${h - pad}" text-anchor="end" class="t" fill="white" fill-opacity="0.78">viajajapon.com</text>` +
    `</svg>`,
);

const out = `public/images/propias/${name}.jpg`;
const info = await sharp(buf)
  .composite([{ input: svg, left: 0, top: 0 }])
  .withExif({ IFD0: { Copyright: "(c) viajajapon.com", Artist: "Sergio (viajajapon.com)" } })
  .jpeg({ quality: 80, mozjpeg: true })
  .toFile(out);
console.log(`${out} ${info.width}x${info.height} ${Math.round(info.size / 1024)}KB`);
