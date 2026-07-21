import { NextRequest, NextResponse } from "next/server";
import { getSystemConfig, SystemConfig } from "@/lib/settings";
import { generateRawCode, generateUniqueDonCode } from "@/lib/codeGenerator";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const currentConfig = await getSystemConfig();

    const customConfig: SystemConfig = {
      ...currentConfig,
      CODE_L1_MODE: body.CODE_L1_MODE || currentConfig.CODE_L1_MODE,
      CODE_L1_VALUE: body.CODE_L1_VALUE !== undefined ? body.CODE_L1_VALUE : currentConfig.CODE_L1_VALUE,
      CODE_L2_MODE: body.CODE_L2_MODE || currentConfig.CODE_L2_MODE,
      CODE_L2_VALUE: body.CODE_L2_VALUE !== undefined ? body.CODE_L2_VALUE : currentConfig.CODE_L2_VALUE,
    };

    const count = Math.min(parseInt(body.count || "5", 10), 20);
    const generatedCodes: string[] = [];

    for (let i = 0; i < count; i++) {
      generatedCodes.push(generateRawCode(customConfig));
    }

    // Also generate one database-checked unique code
    const dbUniqueCode = await generateUniqueDonCode(customConfig);

    return NextResponse.json({
      success: true,
      configUsed: customConfig,
      samples: generatedCodes,
      uniqueDbCode: dbUniqueCode,
    });
  } catch (error: any) {
    console.error("[API POST /api/admin/test-code] Error:", error);
    return NextResponse.json(
      { success: false, message: error?.message || "Erreur lors de la génération de test." },
      { status: 500 }
    );
  }
}
