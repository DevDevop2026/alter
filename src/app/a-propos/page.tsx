"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { HeroCarousel } from "@/components/HeroCarousel";
import { PageShell } from "@/components/PageShell";
import { PARTENAIRE_IMAGES, PROFIL_IMAGES } from "@/lib/gallery";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";
import { useTranslation } from "react-i18next";

/** Portraits réels de la communauté, servis depuis /public/images/profil. */
const communityPhotos = PROFIL_IMAGES.map((image) => ({
  alt: image.alt,
  src: image.src,
}));

export default function AProposPage() {
  const [index, setIndex] = useState(0);
  const reducedMotion = usePrefersReducedMotion();
  const { t } = useTranslation();

  useEffect(() => {
    if (reducedMotion) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % communityPhotos.length), 3200);
    return () => clearInterval(timer);
  }, [reducedMotion]);

  return (
    <div
      className="a-propos-page min-h-screen bg-(--color-bg) text-slate-900"
      style={{
        backgroundImage:
          "linear-gradient(rgba(247,251,248,0.34), rgba(247,251,248,0.34)), url('/images/temoignages/1787386135816.jpg')",
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <PageShell
        title={t("about.title")}
        eyebrow={t("about.eyebrow")}
        description={t("about.description")}
      >
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div className="rounded-3xl border border-emerald-100 bg-(--color-surface-alt) p-4">
            <div className="relative h-64 overflow-hidden rounded-2xl bg-white">
              <Image
                key={communityPhotos[index].src}
                src={communityPhotos[index].src}
                alt={t("about.communityImage", { number: index + 1 })}
                fill
                sizes="(max-width: 768px) 100vw, 45vw"
                className="testimonial-fade h-full w-full object-contain"
              />
            </div>
            <p className="mt-4 text-center text-sm font-semibold text-slate-700">
              {t("about.community")}
            </p>
          </div>

          <div className="space-y-4 text-left">
            <div className="info-card">
              <h2 className="text-xl font-semibold text-slate-900">{t("about.heading")}</h2>
              <p className="mt-2 text-sm text-slate-600">
                {t("about.intro")}
              </p>
            </div>

            <div className="info-card">
              <h2 className="text-xl font-semibold text-slate-900">{t("about.how")}</h2>
              <ul className="mt-2 space-y-2 text-sm text-slate-600">
                <li>• {t("about.step1")}</li>
                <li>• {t("about.step2")}</li>
                <li>• {t("about.step3")}</li>
                <li>• {t("about.step4")}</li>
              </ul>
              <p className="mt-3 text-sm text-slate-600">
                {t("about.fairness")}
              </p>
            </div>

            <div className="info-card">
              <h2 className="text-xl font-semibold text-slate-900">{t("about.vision")}</h2>
              <p className="mt-2 text-sm text-slate-600">
                {t("about.vision1")}
              </p>
              <p className="mt-3 text-sm text-slate-600">
                {t("about.vision2")}
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div className="rounded-3xl border border-emerald-100 bg-(--color-surface-alt) p-4">
            <HeroCarousel
              slides={PARTENAIRE_IMAGES.map((slide, imageIndex) => ({
                ...slide,
                alt: t("about.partnerImage", { number: imageIndex + 1 }),
              }))}
              ariaLabel={t("about.partnersAlt")}
              badgeLabel={t("about.images")}
              imageFit="contain"
            />
          </div>

          <div className="info-card text-left">
            <h2 className="text-xl font-semibold text-slate-900">{t("about.partnership")}</h2>
            <p className="mt-2 text-sm text-slate-600">
              {t("about.partnerIntro")}
            </p>
            <ol className="mt-2 space-y-2 text-sm text-slate-600">
              <li>{t("about.partner1")}</li>
              <li>{t("about.partner2")}</li>
              <li>{t("about.partner3")}</li>
            </ol>
            <p className="mt-3 text-sm text-slate-600">
              {t("about.partnerNote")}
            </p>
          </div>
        </div>
      </PageShell>
    </div>
  );
}
