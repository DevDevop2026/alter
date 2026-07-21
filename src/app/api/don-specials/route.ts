import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { donSpecials } from "@/db/schema";
import { getSystemConfig } from "@/lib/settings";
import {
  validateDonInput,
  generateUniqueDonCode,
  buildWhatsAppRedirect,
} from "@/lib/codeGenerator";
import { notifyAdminForDonSpecial } from "@/lib/notificationService";
import { desc, ilike, or, eq, sql } from "drizzle-orm";

/**
 * POST /api/don-specials
 * Register a request to obtain a Special Donation
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));

    // 1. Validate fields (including optional code choice)
    const validation = validateDonInput(body);
    if (!validation.valid) {
      console.warn("[API POST /api/don-specials] Validation failed:", validation.errors);
      return NextResponse.json(
        {
          success: false,
          message: "Certains champs du formulaire sont invalides.",
          errors: validation.errors,
        },
        { status: 400 }
      );
    }

    const { nom, prenom, telephone, email, codeChoice } = validation.sanitizedData;

    // 2. Fetch current config
    const config = await getSystemConfig();

    // 3. Generate or validate unique code with collision checks
    let code: string;
    try {
      code = await generateUniqueDonCode(config, codeChoice);
    } catch (codeErr: any) {
      console.error("[API POST /api/don-specials] Code generation/uniqueness error:", codeErr);
      return NextResponse.json(
        {
          success: false,
          message:
            codeErr?.message ||
            "Erreur lors de l'attribution du code unique. Le code est peut-être déjà utilisé.",
          errors: codeChoice ? { codeChoice: codeErr?.message || "Ce code est indisponible." } : undefined,
        },
        { status: 400 }
      );
    }

    // 4. Insert donation claim record into PostgreSQL DB
    const [insertedDon] = await db
      .insert(donSpecials)
      .values({
        code,
        nom,
        prenom,
        telephone,
        email,
        status: "pending",
      })
      .returning();

    // 5. Trigger Admin Notification
    let notificationResult;
    try {
      notificationResult = await notifyAdminForDonSpecial({
        id: insertedDon.id,
        code: insertedDon.code,
        nom: insertedDon.nom,
        prenom: insertedDon.prenom,
        telephone: insertedDon.telephone,
        email: insertedDon.email,
        createdAt: insertedDon.createdAt,
      });
    } catch (notifErr) {
      console.error("[API POST /api/don-specials] Notification trigger warning:", notifErr);
    }

    // 6. Build WhatsApp redirection payload
    const whatsappData = buildWhatsAppRedirect(config, {
      code: insertedDon.code,
      nom: insertedDon.nom,
      prenom: insertedDon.prenom,
      telephone: insertedDon.telephone,
      email: insertedDon.email,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Votre demande de don spécial a été enregistrée avec succès !",
        don: {
          id: insertedDon.id,
          code: insertedDon.code,
          nom: insertedDon.nom,
          prenom: insertedDon.prenom,
          telephone: insertedDon.telephone,
          email: insertedDon.email,
          status: notificationResult ? "notified" : "pending",
          createdAt: insertedDon.createdAt,
        },
        whatsapp: {
          url: whatsappData.whatsappUrl,
          message: whatsappData.message,
          adminPhone: whatsappData.cleanPhone,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("[API POST /api/don-specials] Server error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Une erreur serveur est survenue lors de l'enregistrement de votre demande.",
        error: process.env.NODE_ENV === "development" ? String(error) : undefined,
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/don-specials
 * List or filter donations claims (used by admin dashboard)
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q") || "";
    const status = searchParams.get("status") || "";
    const limit = Math.min(parseInt(searchParams.get("limit") || "50", 10), 200);
    const offset = parseInt(searchParams.get("offset") || "0", 10);

    let whereClause = undefined;
    if (q && status) {
      whereClause = sql`${donSpecials.status} = ${status} AND (${donSpecials.code} ILIKE ${`%${q}%`} OR ${donSpecials.nom} ILIKE ${`%${q}%`} OR ${donSpecials.prenom} ILIKE ${`%${q}%`} OR ${donSpecials.telephone} ILIKE ${`%${q}%`})`;
    } else if (q) {
      whereClause = or(
        ilike(donSpecials.code, `%${q}%`),
        ilike(donSpecials.nom, `%${q}%`),
        ilike(donSpecials.prenom, `%${q}%`),
        ilike(donSpecials.telephone, `%${q}%`)
      );
    } else if (status) {
      whereClause = eq(donSpecials.status, status);
    }

    const items = await db
      .select()
      .from(donSpecials)
      .where(whereClause)
      .orderBy(desc(donSpecials.createdAt))
      .limit(limit)
      .offset(offset);

    const [{ total }] = await db
      .select({ total: sql<number>`count(*)::int` })
      .from(donSpecials)
      .where(whereClause);

    const [{ pendingCount }] = await db
      .select({ pendingCount: sql<number>`count(*)::int` })
      .from(donSpecials)
      .where(eq(donSpecials.status, "pending"));

    const [{ notifiedCount }] = await db
      .select({ notifiedCount: sql<number>`count(*)::int` })
      .from(donSpecials)
      .where(eq(donSpecials.status, "notified"));

    return NextResponse.json({
      success: true,
      items,
      pagination: {
        total,
        limit,
        offset,
      },
      stats: {
        total,
        pendingCount,
        notifiedCount,
      },
    });
  } catch (error: any) {
    console.error("[API GET /api/don-specials] Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Impossible de récupérer la liste des dons.",
      },
      { status: 500 }
    );
  }
}
