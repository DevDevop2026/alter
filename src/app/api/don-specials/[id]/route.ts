import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { donSpecials } from "@/db/schema";
import { getSystemConfig } from "@/lib/settings";
import { buildWhatsAppRedirect } from "@/lib/codeGenerator";
import { eq, or } from "drizzle-orm";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json({ success: false, message: "ID non spécifié" }, { status: 400 });
    }

    // Lookup by UUID or code
    const results = await db
      .select()
      .from(donSpecials)
      .where(or(eq(donSpecials.id, id), eq(donSpecials.code, id)))
      .limit(1);

    if (results.length === 0) {
      return NextResponse.json(
        { success: false, message: "Don spécial introuvable." },
        { status: 404 }
      );
    }

    const don = results[0];
    const config = await getSystemConfig();

    const whatsappData = buildWhatsAppRedirect(config, {
      code: don.code,
      nom: don.nom,
      prenom: don.prenom,
      telephone: don.telephone,
      email: don.email,
    });

    return NextResponse.json({
      success: true,
      don,
      whatsapp: {
        url: whatsappData.whatsappUrl,
        message: whatsappData.message,
        adminPhone: whatsappData.cleanPhone,
      },
    });
  } catch (error: any) {
    console.error("[API GET /api/don-specials/[id]] Error:", error);
    return NextResponse.json(
      { success: false, message: "Erreur serveur lors de la récupération du don." },
      { status: 500 }
    );
  }
}
