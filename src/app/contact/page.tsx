"use client";

import { PageShell } from "@/components/PageShell";

const DEFAULT_ADMIN_WHATSAPP = "2250700000000";

export default function ContactPage() {
  const adminNumber = process.env.NEXT_PUBLIC_ADMIN_WHATSAPP_NUMBER ?? DEFAULT_ADMIN_WHATSAPP;
  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL ?? "admin@example.com";
  const cleaned = String(adminNumber).replace(/[^0-9+]/g, "").replace(/^\+/, "");
  const waLink = `https://wa.me/${cleaned}`;

  return (
    <div className="min-h-screen bg-(--color-bg) text-slate-900">
      <PageShell
        title="Contact"
        eyebrow="WhatsApp • email"
        description="Pour toute question, validation ou suivi de votre don, utilisez l’un des canaux de contact ci-dessous."
      >
        <div className="grid gap-4 lg:grid-cols-[1fr_0.9fr] lg:items-start">
          <div className="rounded-3xl border border-emerald-100 bg-(--color-surface-alt) p-5">
            <h2 className="text-xl font-semibold text-slate-900">Nous sommes à votre écoute</h2>
            <p className="mt-2 text-sm text-slate-600">
              Le contact direct permet de répondre rapidement à chaque demande et de garder un échange simple et rassurant.
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <a href={waLink} target="_blank" rel="noreferrer" className="btn-primary">
                WhatsApp
              </a>
              <a href={`mailto:${adminEmail}`} className="btn-secondary">
                Envoyer un email
              </a>
            </div>
          </div>

          <div className="info-card">
            <h3 className="text-lg font-semibold text-slate-900">Informations de contact</h3>
            <div className="mt-3 space-y-2 text-sm text-slate-600">
              <p>
                <span className="font-semibold text-slate-800">WhatsApp :</span> {adminNumber}
              </p>
              <p>
                <span className="font-semibold text-slate-800">Email :</span> {adminEmail}
              </p>
            </div>
          </div>
        </div>
      </PageShell>
    </div>
  );
}
