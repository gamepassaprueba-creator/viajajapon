"""Prepara un clip de vídeo propio del viaje para publicarlo dentro de una guía.

Uso:
  python scripts/clip-propio.py <origen> <nombre> <inicio_s> <duracion_s> [--vertical] [--portada-en S]

Qué hace:
- Corta el tramo indicado y quita el sonido y los metadatos (fecha, GPS, dispositivo).
- Horizontal: 960x540. Con --vertical: recorte centrado a 4:5 y 640x800.
- Marca de agua con el logo (torii + «viajajapon.com») arriba a la derecha.
- H.264 con arranque rápido, por debajo de 3 MB (sube la compresión si hace falta).
- Saca la portada (un fotograma con la marca de agua) para el componente <Clip>.

Salida:
  public/videos/propias/<nombre>.mp4
  public/images/propias/<nombre>-clip.jpg

Requisitos: pip install imageio-ffmpeg pillow
Antes de publicar: comprobar que no salen caras reconocibles de desconocidos
y añadir la fila en docs/CREDITOS-IMAGENES.md.
"""
import argparse
import os
import subprocess
import sys
import tempfile

import imageio_ffmpeg
from PIL import Image, ImageDraw, ImageFont

LIMITE_BYTES = 3 * 1024 * 1024


def _curva(p0, p1, p2, pasos=16):
    """Puntos de una curva cuadrática de Bézier."""
    pts = []
    for i in range(pasos + 1):
        t = i / pasos
        x = (1 - t) ** 2 * p0[0] + 2 * (1 - t) * t * p1[0] + t**2 * p2[0]
        y = (1 - t) ** 2 * p0[1] + 2 * (1 - t) * t * p1[1] + t**2 * p2[1]
        pts.append((x, y))
    return pts


def _torii(draw, x0, y0, lado, color):
    """Dibuja el torii de src/components/Logo.tsx (viewBox 32x32) en un cuadrado de `lado` px."""
    k = lado / 32

    def esc(pts):
        return [(x0 + x * k, y0 + y * k) for x, y in pts]

    kasagi = _curva((2, 6.6), (16, 9.2), (30, 6.6)) + _curva((30, 10), (16, 12.6), (2, 10))
    draw.polygon(esc(kasagi), fill=color)
    draw.polygon(esc([(7.2, 11.2), (10.2, 11.2), (9.4, 28), (6.4, 28)]), fill=color)
    draw.polygon(esc([(21.8, 11.2), (24.8, 11.2), (25.6, 28), (22.6, 28)]), fill=color)
    draw.rectangle(esc([(4.4, 15.2), (27.6, 17.6)]), fill=color)
    draw.rectangle(esc([(14.8, 11.4), (17.2, 15.2)]), fill=color)


def _fuente(px):
    for nombre in ("arialbd.ttf", "Arial Bold.ttf", "DejaVuSans-Bold.ttf"):
        try:
            return ImageFont.truetype(nombre, px)
        except OSError:
            continue
    return ImageFont.load_default()


def marca_de_agua(ancho_video, destino):
    """PNG transparente con el logo: torii + viajajapon.com, blanco con sombra."""
    esc = 4  # se dibuja a 4x y se reduce para suavizar los bordes
    px = round(ancho_video * 0.036)
    fuente = _fuente(px * esc)
    texto = "viajajapon.com"
    caja = fuente.getbbox(texto)
    alto_txt = caja[3] - caja[1]
    icono = round(px * 1.35) * esc
    hueco = round(px * 0.28) * esc
    margen = 4 * esc
    ancho = margen * 2 + icono + hueco + (caja[2] - caja[0])
    alto = margen * 2 + max(icono, alto_txt)
    img = Image.new("RGBA", (ancho, alto), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    y_txt = margen + (alto - 2 * margen - alto_txt) // 2 - caja[1]
    x_txt = margen + icono + hueco - caja[0]
    y_ico = margen + (alto - 2 * margen - icono) // 2
    s = round(1.5 * esc)
    sombra = (0, 0, 0, 115)
    blanco = (255, 255, 255, 215)
    _torii(d, margen + s, y_ico + s, icono, sombra)
    d.text((x_txt + s, y_txt + s), texto, font=fuente, fill=sombra)
    _torii(d, margen, y_ico, icono, blanco)
    d.text((x_txt, y_txt), texto, font=fuente, fill=blanco)
    img = img.resize((ancho // esc, alto // esc), Image.LANCZOS)
    img.save(destino)


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("origen")
    ap.add_argument("nombre")
    ap.add_argument("inicio", type=float)
    ap.add_argument("duracion", type=float)
    ap.add_argument("--vertical", action="store_true")
    ap.add_argument("--portada-en", type=float, default=0.5, help="segundo del clip que se usa de portada")
    a = ap.parse_args()

    ff = imageio_ffmpeg.get_ffmpeg_exe()
    ancho, alto = (640, 800) if a.vertical else (960, 540)
    recorte = "crop=iw:iw*5/4," if a.vertical else ""
    pad = round(ancho * 0.025)
    salida = f"public/videos/propias/{a.nombre}.mp4"
    portada = f"public/images/propias/{a.nombre}-clip.jpg"
    os.makedirs(os.path.dirname(salida), exist_ok=True)

    with tempfile.TemporaryDirectory() as tmp:
        wm = os.path.join(tmp, "marca.png")
        marca_de_agua(ancho, wm)
        filtro = (
            f"[0:v]{recorte}scale={ancho}:{alto}:force_original_aspect_ratio=increase,"
            f"crop={ancho}:{alto},fps=30[v];[v][1:v]overlay=W-w-{pad}:{pad}[o]"
        )
        for crf in (26, 28, 30, 32, 34):
            orden = [
                ff, "-y", "-loglevel", "error",
                "-ss", str(a.inicio), "-t", str(a.duracion), "-i", a.origen,
                "-i", wm,
                "-filter_complex", filtro, "-map", "[o]",
                "-an", "-map_metadata", "-1",
                "-c:v", "libx264", "-preset", "slow", "-crf", str(crf),
                "-profile:v", "high", "-pix_fmt", "yuv420p", "-movflags", "+faststart",
                salida,
            ]
            subprocess.run(orden, check=True)
            peso = os.path.getsize(salida)
            if peso <= LIMITE_BYTES:
                break
        else:
            sys.exit(f"No baja de 3 MB ni con CRF 34 ({peso / 1e6:.1f} MB): acorta el clip.")

        cruda = os.path.join(tmp, "portada.png")
        subprocess.run(
            [ff, "-y", "-loglevel", "error", "-ss", str(a.portada_en), "-i", salida, "-frames:v", "1", cruda],
            check=True,
        )
        Image.open(cruda).convert("RGB").save(portada, quality=84, optimize=True, progressive=True)

    print(f"{salida} {ancho}x{alto} {a.duracion:g}s CRF {crf} {peso / 1024:.0f} KB")
    print(f"{portada} {os.path.getsize(portada) / 1024:.0f} KB")


if __name__ == "__main__":
    main()
