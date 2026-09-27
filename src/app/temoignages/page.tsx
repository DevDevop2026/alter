"use client";

import dynamic from "next/dynamic";
import { useTranslation } from "react-i18next";
import { PROFIL_IMAGES, RECOMPENSE_IMAGES, TEMOIGNAGE_IMAGES } from "@/lib/gallery";
import type { Testimonial } from "@/components/TestimonialsCarousel";

const TestimonialsCarousel = dynamic(
  () => import("@/components/TestimonialsCarousel").then((m) => m.TestimonialsCarousel),
  { ssr: false }
);
const RewardsGallery = dynamic(
  () => import("@/components/RewardsGallery").then((m) => m.RewardsGallery),
  { ssr: false }
);

/** Témoignages : portrait et photo réels issus de /public/images. */
export default function TemoignagesPage() {
  const { t } = useTranslation();
  const testimonials: Testimonial[] = [
    ["María García", "testimonials.spain", "testimonials.money", "testimonials.story1"],
    ["João Silva", "testimonials.brazil", "testimonials.car", "testimonials.story2"],
    ["Ana Pereira", "testimonials.brazil", "testimonials.motorcycle", "testimonials.story3"],
    ["Carlos Ruiz", "testimonials.spain", "testimonials.largeGift", "testimonials.story4"],
    ["Fernanda Costa", "testimonials.brazil", "testimonials.jewelry", "testimonials.story5"],
    ["Sofia Martinez", "testimonials.spain", "testimonials.surprise", "testimonials.story6"],
    ["Pedro Lopes", "testimonials.brazil", "testimonials.specialDonation", "testimonials.story7"],
    ["Isabela Nunes", "testimonials.brazil", "testimonials.rewardDelivered", "testimonials.story8"],
    ["Miguel Hernández", "testimonials.spain", "testimonials.realGift", "testimonials.story9"],
    ["Laura Gómez", "testimonials.spain", "testimonials.lovelyGift", "testimonials.story10"],
  ].map(([name, country, prize, message], index) => ({
    name,
    country: t(country),
    prize: t(prize),
    message: t(message),
    avatar: PROFIL_IMAGES[index % PROFIL_IMAGES.length].src,
    photo: TEMOIGNAGE_IMAGES[index % TEMOIGNAGE_IMAGES.length].src,
  }));

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12">
      <div className="mx-auto max-w-5xl space-y-10 px-4">
        <header className="text-center">
          <h1 className="text-3xl font-extrabold mb-3">{t("testimonials.title")}</h1>
          <p className="mx-auto max-w-2xl text-sm text-slate-400">
            {t("testimonials.description")}
          </p>
        </header>

        <TestimonialsCarousel testimonials={testimonials} />

        <section className="space-y-4">
          <h2 className="text-2xl font-extrabold">{t("testimonials.photos")}</h2>
          <p className="max-w-3xl text-sm text-slate-400">
            {t("testimonials.photosDesc")}
          </p>
          <RewardsGallery items={TEMOIGNAGE_IMAGES} initialCount={8} tone="dark" />
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-extrabold">{t("testimonials.rewards")}</h2>
          <p className="max-w-3xl text-sm text-slate-400">
            {t("testimonials.rewardsDesc")}
          </p>
          <RewardsGallery items={RECOMPENSE_IMAGES} initialCount={8} tone="dark" />
        </section>
      </div>
    </div>
  );
}
