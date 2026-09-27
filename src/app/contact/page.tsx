"use client";

import { PageShell } from "@/components/PageShell";
import { useTranslation } from "react-i18next";

const DEFAULT_ADMIN_WHATSAPP = "351925396119";

export default function ContactPage() {
  const { t } = useTranslation();
  const adminNumber = process.env.NEXT_PUBLIC_ADMIN_WHATSAPP_NUMBER ?? DEFAULT_ADMIN_WHATSAPP;
  const cleaned = String(adminNumber).replace(/[^0-9+]/g, "").replace(/^\+/, "");
  const waLink = `https://wa.me/${cleaned}`;

  return (
    <div
      className="contact-page min-h-screen bg-(--color-bg) text-slate-900"
      style={{
        backgroundImage:
          "linear-gradient(rgba(247,251,248,0.38), rgba(247,251,248,0.38)), url('/images/temoignages/1787386135816.jpg')",
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <PageShell
        title={t("contact.title")}
        eyebrow="WhatsApp"
        description={t("contact.description")}
      >
        <div className="grid gap-4 lg:grid-cols-[1fr_0.9fr] lg:items-start">
          <div className="rounded-3xl border border-emerald-100 bg-(--color-surface-alt) p-5">
            <h2 className="text-xl font-semibold text-slate-900">{t("contact.welcome")}</h2>
            <p className="mt-2 text-sm text-slate-600">
              {t("contact.direct")}
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <a href={waLink} target="_blank" rel="noreferrer" className="btn-primary">
                WhatsApp
              </a>
            </div>
          </div>

          <div className="info-card">
            <h3 className="text-lg font-semibold text-slate-900">{t("contact.details")}</h3>
            <div className="mt-3 space-y-2 text-sm text-slate-600">
              <p>
                <span className="font-semibold text-slate-800">WhatsApp :</span> {adminNumber}
              </p>
              <div className="pt-2">
                <p className="font-semibold text-slate-800">{t("contact.other")}:</p>
                <p>+393780520522</p>
                <p>+31649825618</p>
              </div>
            </div>
          </div>
        </div>
      </PageShell>
    </div>
  );
}
