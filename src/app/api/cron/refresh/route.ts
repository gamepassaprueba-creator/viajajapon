import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    { 
      ok: false, 
      error: "gone", 
      message: "Este endpoint ha sido desactivado permanentemente porque la aplicación migró a SSG puro sin ISR." 
    }, 
    { status: 410 }
  );
}
