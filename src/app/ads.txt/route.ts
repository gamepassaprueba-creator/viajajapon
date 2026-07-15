import { NextResponse } from "next/server";

export const revalidate = 3600; // Cachear durante 1 hora

export async function GET() {
  const adsTxtContent = process.env.ADS_TXT_CONTENT;

  if (adsTxtContent) {
    return new NextResponse(adsTxtContent, {
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }

  // Si no hay configuración, devolvemos un comentario válido
  return new NextResponse("# Configura la variable de entorno ADS_TXT_CONTENT con la línea proporcionada por AdSense.", {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
