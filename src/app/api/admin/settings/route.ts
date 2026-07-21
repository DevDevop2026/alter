import { NextRequest, NextResponse } from "next/server";
import { getSystemConfig, updateSystemConfig, DEFAULT_CONFIG } from "@/lib/settings";

export async function GET() {
  try {
    const config = await getSystemConfig();
    return NextResponse.json({
      success: true,
      config,
      defaults: DEFAULT_CONFIG,
    });
  } catch (error) {
    console.error("[API GET /api/admin/settings] Error:", error);
    return NextResponse.json(
      { success: false, message: "Impossible de charger la configuration." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Sanitize parameters
    const sanitized: Record<string, string> = {};

    if (body.ADMIN_WHATSAPP_NUMBER !== undefined) {
      sanitized.ADMIN_WHATSAPP_NUMBER = String(body.ADMIN_WHATSAPP_NUMBER).replace(/\D/g, "");
    }
    if (body.ADMIN_NAME !== undefined) {
      sanitized.ADMIN_NAME = String(body.ADMIN_NAME).trim();
    }
    if (body.WHATSAPP_MESSAGE_TEMPLATE !== undefined) {
      sanitized.WHATSAPP_MESSAGE_TEMPLATE = String(body.WHATSAPP_MESSAGE_TEMPLATE);
    }
    if (body.CODE_L1_MODE !== undefined) {
      sanitized.CODE_L1_MODE = body.CODE_L1_MODE === "RANDOM" ? "RANDOM" : "FIXED";
    }
    if (body.CODE_L1_VALUE !== undefined) {
      sanitized.CODE_L1_VALUE = String(body.CODE_L1_VALUE).trim().toUpperCase();
    }
    if (body.CODE_L2_MODE !== undefined) {
      sanitized.CODE_L2_MODE = body.CODE_L2_MODE === "RANDOM" ? "RANDOM" : "FIXED";
    }
    if (body.CODE_L2_VALUE !== undefined) {
      sanitized.CODE_L2_VALUE = String(body.CODE_L2_VALUE).trim().toUpperCase();
    }

    const updatedConfig = await updateSystemConfig(sanitized);

    return NextResponse.json({
      success: true,
      message: "Configuration mise à jour avec succès.",
      config: updatedConfig,
    });
  } catch (error) {
    console.error("[API POST /api/admin/settings] Error:", error);
    return NextResponse.json(
      { success: false, message: "Erreur lors de la mise à jour de la configuration." },
      { status: 500 }
    );
  }
}
