import { db } from "@/db";
import { appSettings } from "@/db/schema";

export interface SystemConfig {
  ADMIN_WHATSAPP_NUMBER: string;
  ADMIN_NAME: string;
  WHATSAPP_MESSAGE_TEMPLATE: string;
  CODE_L1_MODE: "FIXED" | "RANDOM";
  CODE_L1_VALUE: string;
  CODE_L2_MODE: "FIXED" | "RANDOM";
  CODE_L2_VALUE: string;
}

export const DEFAULT_CONFIG: SystemConfig = {
  ADMIN_WHATSAPP_NUMBER: process.env.ADMIN_WHATSAPP_NUMBER || "2250700000000",
  ADMIN_NAME: process.env.ADMIN_NAME || "Comité de Distribution des Dons",
  WHATSAPP_MESSAGE_TEMPLATE:
    process.env.WHATSAPP_MESSAGE_TEMPLATE ||
    "Bonjour {ADMIN_NAME}, je souhaite obtenir / réclamer mon don spécial.\nCode: {CODE}\nNom: {NOM} {PRENOM}\nTéléphone: {TELEPHONE}\nEmail: {EMAIL}",
  CODE_L1_MODE: (process.env.CODE_L1_MODE as "FIXED" | "RANDOM") || "FIXED",
  CODE_L1_VALUE: process.env.CODE_L1_VALUE || "B",
  CODE_L2_MODE: (process.env.CODE_L2_MODE as "FIXED" | "RANDOM") || "FIXED",
  CODE_L2_VALUE: process.env.CODE_L2_VALUE || "O",
};

export async function getSystemConfig(): Promise<SystemConfig> {
  try {
    const rows = await db.select().from(appSettings);
    const configMap: Record<string, string> = {};
    for (const row of rows) {
      configMap[row.key] = row.value;
    }

    return {
      ADMIN_WHATSAPP_NUMBER:
        configMap["ADMIN_WHATSAPP_NUMBER"] || DEFAULT_CONFIG.ADMIN_WHATSAPP_NUMBER,
      ADMIN_NAME: configMap["ADMIN_NAME"] || DEFAULT_CONFIG.ADMIN_NAME,
      WHATSAPP_MESSAGE_TEMPLATE:
        configMap["WHATSAPP_MESSAGE_TEMPLATE"] || DEFAULT_CONFIG.WHATSAPP_MESSAGE_TEMPLATE,
      CODE_L1_MODE:
        (configMap["CODE_L1_MODE"] as "FIXED" | "RANDOM") || DEFAULT_CONFIG.CODE_L1_MODE,
      CODE_L1_VALUE: configMap["CODE_L1_VALUE"] || DEFAULT_CONFIG.CODE_L1_VALUE,
      CODE_L2_MODE:
        (configMap["CODE_L2_MODE"] as "FIXED" | "RANDOM") || DEFAULT_CONFIG.CODE_L2_MODE,
      CODE_L2_VALUE: configMap["CODE_L2_VALUE"] || DEFAULT_CONFIG.CODE_L2_VALUE,
    };
  } catch (error) {
    console.warn("Failed to read settings from DB, using defaults:", error);
    return DEFAULT_CONFIG;
  }
}

export async function updateSystemConfig(newConfig: Partial<SystemConfig>): Promise<SystemConfig> {
  const entries = Object.entries(newConfig);
  const now = new Date();

  for (const [key, value] of entries) {
    if (value !== undefined) {
      await db
        .insert(appSettings)
        .values({
          key,
          value: String(value),
          updatedAt: now,
        })
        .onConflictDoUpdate({
          target: appSettings.key,
          set: {
            value: String(value),
            updatedAt: now,
          },
        });
    }
  }

  return getSystemConfig();
}
