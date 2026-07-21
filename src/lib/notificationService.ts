import { db } from "@/db";
import { donSpecials, notificationLogs } from "@/db/schema";
import { eq } from "drizzle-orm";

export interface AdminNotificationPayload {
  type: "NEW_DON_SPECIAL";
  id: string;
  code: string;
  nom: string;
  prenom: string;
  telephone: string;
  email: string | null;
  createdAt: string;
}

/**
 * Dispatches notification to admin channels (Simulated Webhook, Email, Audit Log)
 * and updates donation status to 'notified'.
 */
export async function notifyAdminForDonSpecial(don: {
  id: string;
  code: string;
  nom: string;
  prenom: string;
  telephone: string;
  email: string | null;
  createdAt: Date;
}) {
  const now = new Date();

  const payload: AdminNotificationPayload = {
    type: "NEW_DON_SPECIAL",
    id: don.id,
    code: don.code,
    nom: don.nom,
    prenom: don.prenom,
    telephone: don.telephone,
    email: don.email,
    createdAt: don.createdAt.toISOString(),
  };

  const payloadJson = JSON.stringify(payload, null, 2);

  // 1. Simulate Webhook Endpoint dispatch (Placeholder)
  const webhookUrl = process.env.ADMIN_NOTIFICATION_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      console.log(`[Notification] Dispatching Webhook to ${webhookUrl}...`);
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: payloadJson,
      });
    } catch (err) {
      console.error("[Notification] Webhook dispatch error:", err);
    }
  } else {
    console.log("[Notification Simulation] Webhook URL not configured. Payload ready:", payload);
  }

  // 2. Simulate Email Dispatch (Placeholder)
  const adminEmail = process.env.ADMIN_EMAIL || "admin@organisateurs-dons.org";
  console.log(`[Notification Simulation] Simulated Email sent to ${adminEmail}:`);
  console.log(`Subject: Nouveau Don Spécial Enregistré - Code ${don.code}`);
  console.log(`Message: Don de ${don.prenom} ${don.nom} (${don.telephone}). Code: ${don.code}`);

  // 3. Record in DB notification_logs table
  await db.insert(notificationLogs).values({
    donSpecialId: don.id,
    type: "NEW_DON_SPECIAL",
    channel: "ADMIN_DISPATCH",
    payload: payloadJson,
    status: "SUCCESS",
    createdAt: now,
  });

  // 4. Update don_specials table record: status = 'notified', notified_at = now
  await db
    .update(donSpecials)
    .set({
      status: "notified",
      notifiedAt: now,
    })
    .where(eq(donSpecials.id, don.id));

  return {
    success: true,
    notifiedAt: now,
    payload,
  };
}
