import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { notificationLogs, donSpecials } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = Math.min(parseInt(searchParams.get("limit") || "50", 10), 100);

    const logs = await db
      .select({
        id: notificationLogs.id,
        type: notificationLogs.type,
        channel: notificationLogs.channel,
        payload: notificationLogs.payload,
        status: notificationLogs.status,
        createdAt: notificationLogs.createdAt,
        donCode: donSpecials.code,
        donNom: donSpecials.nom,
        donPrenom: donSpecials.prenom,
      })
      .from(notificationLogs)
      .leftJoin(donSpecials, eq(notificationLogs.donSpecialId, donSpecials.id))
      .orderBy(desc(notificationLogs.createdAt))
      .limit(limit);

    return NextResponse.json({
      success: true,
      logs,
    });
  } catch (error) {
    console.error("[API GET /api/admin/notifications] Error:", error);
    return NextResponse.json(
      { success: false, message: "Impossible de charger les logs de notification." },
      { status: 500 }
    );
  }
}
