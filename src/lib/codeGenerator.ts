import { db } from "@/db";
import { donSpecials } from "@/db/schema";
import { SystemConfig } from "./settings";
import { eq } from "drizzle-orm";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function getRandomLetter(): string {
  const idx = Math.floor(Math.random() * ALPHABET.length);
  return ALPHABET[idx];
}

function getRandomNumberString(): string {
  const num = Math.floor(Math.random() * 1000); // 0 to 999
  return num.toString().padStart(3, "0");
}

/**
 * Generates a single code string based on system configuration rules.
 * Format: L1-L2NNN
 */
export function generateRawCode(config: SystemConfig): string {
  let l1 = "B";
  if (config.CODE_L1_MODE === "FIXED" && config.CODE_L1_VALUE) {
    l1 = config.CODE_L1_VALUE.trim().substring(0, 1).toUpperCase() || "B";
  } else {
    l1 = getRandomLetter();
  }

  let l2 = "O";
  if (config.CODE_L2_MODE === "FIXED" && config.CODE_L2_VALUE) {
    l2 = config.CODE_L2_VALUE.trim().substring(0, 1).toUpperCase() || "O";
  } else {
    l2 = getRandomLetter();
  }

  const nnn = getRandomNumberString();

  return `${l1}-${l2}${nnn}`;
}

/**
 * Generates a guaranteed UNIQUE code in DB with up to maxAttempts (default 10).
 */
export async function generateUniqueDonCode(
  config: SystemConfig,
  customCodeChoice?: string | null,
  maxAttempts = 10
): Promise<string> {
  // If the user picked a specific custom code, check format and uniqueness
  if (customCodeChoice) {
    const formattedChoice = customCodeChoice.trim().toUpperCase();
    const codeFormatRegex = /^[A-Z]-[A-Z]\d{3}$/;
    
    if (!codeFormatRegex.test(formattedChoice)) {
      throw new Error(
        `El código elegido "${formattedChoice}" no cumple el formato requerido L1-L2NNN (por ejemplo: B-O028).`
      );
    }

    const existing = await db
      .select({ id: donSpecials.id })
      .from(donSpecials)
      .where(eq(donSpecials.code, formattedChoice))
      .limit(1);

    if (existing.length > 0) {
      throw new Error(
        `El código "${formattedChoice}" ya está asignado. Elige otro o permite la generación automática.`
      );
    }

    return formattedChoice;
  }

  // Automatic unique generation
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    const candidate = generateRawCode(config);

    const existing = await db
      .select({ id: donSpecials.id })
      .from(donSpecials)
      .where(eq(donSpecials.code, candidate))
      .limit(1);

    if (existing.length === 0) {
      return candidate;
    }

    console.warn(`[CodeGenerator] Collision detected on code "${candidate}" (attempt ${attempt}/${maxAttempts})`);
  }

  throw new Error(
    `No se pudo generar un código único después de ${maxAttempts} intentos. Inténtalo de nuevo.`
  );
}

/**
 * Validates form submission according to rules:
 * - nom: non empty
 * - prenom: non empty
 * - telephone: non empty + permissive phone format check
 * - email: optional, basic email format check if present
 * - codeChoice: optional custom code format validation
 */
export interface ValidationResult {
  valid: boolean;
  errors: Record<string, string>;
  sanitizedData: {
    nom: string;
    prenom: string;
    telephone: string;
    email: string | null;
    codeChoice: string | null;
  };
}

export function validateDonInput(data: {
  nom?: string;
  prenom?: string;
  telephone?: string;
  email?: string;
  codeChoice?: string;
}): ValidationResult {
  const errors: Record<string, string> = {};

  const nom = (data.nom || "").trim();
  const prenom = (data.prenom || "").trim();
  const telephone = (data.telephone || "").trim();
  const rawEmail = (data.email || "").trim();
  const rawCodeChoice = (data.codeChoice || "").trim().toUpperCase();

  if (!nom) {
    errors.nom = "Los apellidos son obligatorios.";
  } else if (nom.length < 2) {
    errors.nom = "Los apellidos deben tener al menos 2 caracteres.";
  }

  if (!prenom) {
    errors.prenom = "El nombre es obligatorio.";
  } else if (prenom.length < 2) {
    errors.prenom = "El nombre debe tener al menos 2 caracteres.";
  }

  if (!telephone) {
    errors.telephone = "El número de teléfono es obligatorio.";
  } else {
    const digitsOnly = telephone.replace(/\D/g, "");
    if (digitsOnly.length < 6) {
      errors.telephone = "Introduce un número de teléfono válido (mínimo 6 dígitos).";
    }
  }

  let email: string | null = null;
  if (rawEmail) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(rawEmail)) {
      errors.email = "La dirección de correo electrónico no es válida.";
    } else {
      email = rawEmail.toLowerCase();
    }
  }

  let codeChoice: string | null = null;
  if (rawCodeChoice) {
    const codeFormatRegex = /^[A-Z]-[A-Z]\d{3}$/;
    if (!codeFormatRegex.test(rawCodeChoice)) {
      errors.codeChoice = "Formato de código no válido. Usa el formato L1-L2NNN (por ejemplo: B-O028).";
    } else {
      codeChoice = rawCodeChoice;
    }
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
    sanitizedData: {
      nom,
      prenom,
      telephone,
      email,
      codeChoice,
    },
  };
}

/**
 * Builds the WhatsApp redirection URL and pre-filled message text.
 */
export function buildWhatsAppRedirect(
  config: SystemConfig,
  don: {
    code: string;
    nom: string;
    prenom: string;
    telephone: string;
    email?: string | null;
  }
) {
  const rawPhone = config.ADMIN_WHATSAPP_NUMBER || "351925396119";
  const cleanPhone = rawPhone.replace(/\D/g, "");

  const template =
    config.WHATSAPP_MESSAGE_TEMPLATE ||
    "Hola {ADMIN_NAME}, quiero solicitar mi donación especial.\nCódigo: {CODE}\nApellidos: {NOM} {PRENOM}\nTeléfono: {TELEPHONE}";

  const message = template
    .replace(/\{ADMIN_NAME\}/g, config.ADMIN_NAME || "")
    .replace(/\{CODE\}/g, don.code)
    .replace(/\{NOM\}/g, don.nom)
    .replace(/\{PRENOM\}/g, don.prenom)
    .replace(/\{TELEPHONE\}/g, don.telephone);

  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodedMessage}`;

  return {
    whatsappUrl,
    message,
    cleanPhone,
  };
}
