"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { AudioAssistant } from "@/components/AudioAssistant";
import { HeroCarousel } from "@/components/HeroCarousel";
import { useTranslation } from "react-i18next";
import {
  PROFIL_IMAGES,
  RECOMPENSE_IMAGES,
  TEMOIGNAGE_IMAGES,
} from "@/lib/gallery";
import { Sparkles, Trophy, Gift, ArrowRight, ShieldCheck, Play } from "lucide-react";

const MiniTestimonials = dynamic(
  () => import("@/components/TestimonialsCarousel").then((m) => m.MiniTestimonials),
  { ssr: false }
);
const RewardsGallery = dynamic(
  () => import("@/components/RewardsGallery").then((m) => m.RewardsGallery),
  { ssr: false }
);

export default function HomePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [wonPrizeName, setWonPrizeName] = useState("");
  const { t } = useTranslation();
  const initiativeSlides = [
    { src: "/images/profil/1787386135816.jpg", alt: t("home.slideAlt"), caption: t("home.initiative") },
    { src: "/images/profil/1787389806776.jpg", alt: t("home.slideAlt"), caption: t("home.community") },
    { src: "/images/profil/IMG-20260820-WA0021.jpg", alt: t("home.slideAlt"), caption: t("home.action") },
    { src: "/images/profil/IMG-20260820-WA0027.jpg", alt: t("home.slideAlt"), caption: t("home.forEveryone") },
  ];
  const homeTestimonials = [
    { name: "María García", country: t("home.testimonialSpain"), prize: t("home.prizeMoney"), avatar: PROFIL_IMAGES[0].src, photo: TEMOIGNAGE_IMAGES[0].src, message: t("home.storyMoney") },
    { name: "João Silva", country: t("home.testimonialBrazil"), prize: t("home.newCar"), avatar: PROFIL_IMAGES[1].src, photo: TEMOIGNAGE_IMAGES[1].src, message: t("home.storyCar") },
    { name: "Lucía Fernández", country: t("home.testimonialSpain"), prize: t("home.motorcycle"), avatar: PROFIL_IMAGES[2].src, photo: TEMOIGNAGE_IMAGES[2].src, message: t("home.storyMotorcycle") },
  ];
  const homeAudioScript = t("home.audio");

  const handleWin = (prizeName: string) => {
    setWonPrizeName(prizeName);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950">
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8">
        <section
          className="relative overflow-hidden rounded-4xl border border-slate-800 bg-slate-950 shadow-[0_20px_60px_-24px_rgba(0,0,0,0.7)]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(2, 6, 23, 0.94) 0%, rgba(2, 6, 23, 0.88) 50%, rgba(2, 6, 23, 0.75) 100%), url('/images/profil/1787386135816.jpg')",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <div className="relative grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="p-8 sm:p-10 lg:p-12">
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-400 backdrop-blur-md">
                <Sparkles className="h-4 w-4" /> {t("home.introLabel")}
              </span>

              <h1 className="mt-5 text-4xl font-black tracking-tight text-white drop-shadow-sm sm:text-5xl">
                Almira Aldahab Foundation
              </h1>

              <p className="mt-4 max-w-2xl text-base leading-8 text-slate-200 sm:text-lg">
                {t("home.intro1")}
              </p>

              <p className="mt-4 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                {t("home.intro2")}
              </p>

              <p className="mt-4 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                {t("home.intro3")}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="/jeu"
                  className="inline-flex items-center gap-2 rounded-2xl bg-emerald-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/25 transition-transform hover:-translate-y-0.5 hover:bg-emerald-400 font-bold"
                >
                  <Gift className="h-4 w-4" />
                  <span>{t("home.donate")}</span>
                </Link>

                <Link
                  href="/a-propos"
                  className="inline-flex items-center gap-2 rounded-2xl border border-slate-700 bg-slate-900/80 backdrop-blur-md px-6 py-3 text-sm font-semibold text-slate-200 transition-colors hover:border-emerald-500/50 hover:text-white"
                >
                  <ShieldCheck className="h-4 w-4" />
                  <span>{t("home.learnMore")}</span>
                </Link>
              </div>
            </div>

            <div className="px-6 pb-8 sm:px-8 sm:pb-10 lg:px-10 lg:py-10">
              <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-4 shadow-2xl backdrop-blur-md sm:p-5">
                <HeroCarousel
                  slides={initiativeSlides}
                  ariaLabel={t("home.introLabel")}
                  badgeLabel={t("home.introLabel")}
                  imageFit="cover"
                  size="tall"
                  imagePosition="bottom"
                  subtleBorder
                />
              </div>
            </div>
          </div>
        </section>

        {/* MAIN GAME CONTAINER */}
        <div
          className="relative overflow-hidden rounded-3xl border border-emerald-200/70 bg-emerald-50/70 p-6 shadow-[0_20px_60px_-24px_rgba(16,185,129,0.25)] sm:p-10"
          style={{
            backgroundImage:
              "linear-gradient(rgba(240,253,250,0.7), rgba(239,246,255,0.7)), url('/images/recompense/1787389819218.jpg')",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <div className="relative grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="text-left">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-600">{t("home.officialGame")}</p>
              <h3 className="mt-3 text-2xl font-black text-slate-900">{t("home.gameHeading")}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
                {t("home.gameDescription")}
              </p>
            </div>

            <div className="rounded-2xl border border-emerald-100 bg-white/90 p-5 text-left shadow-sm">
              <h4 className="text-lg font-semibold text-slate-900">{t("home.howToParticipate")}</h4>
              <ol className="mt-3 space-y-2 text-sm leading-7 text-slate-600">
                <li>1. {t("home.step1")}</li>
                <li>2. {t("home.step2")}</li>
                <li>3. {t("home.step3")}</li>
              </ol>
              <div className="mt-5">
                <Link href="/jeu" className="inline-flex items-center gap-2 rounded-2xl bg-emerald-600 px-5 py-2.5 font-black text-white transition-transform hover:-translate-y-0.5 hover:bg-emerald-500">
                  <Play className="h-4 w-4" />
                  <span>{t("home.enterGame")}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* RÉCOMPENSES DÉJÀ REMISES — preuve visuelle */}
        <section className="rounded-3xl border border-emerald-500/25 bg-emerald-950/40 p-6 shadow-[0_20px_60px_-30px_rgba(16,185,129,0.45)] sm:p-8">
          <div className="mb-5 flex flex-col gap-2">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.22em] text-amber-300">
              <Trophy className="h-4 w-4" /> {t("home.rewards")}
            </span>
            <h2 className="text-2xl font-black text-white sm:text-3xl">{t("home.winners")}</h2>
            <p className="max-w-3xl text-sm text-emerald-100/80 sm:text-base">
              {t("home.rewardsDescription")}
            </p>
          </div>

          <RewardsGallery items={RECOMPENSE_IMAGES} initialCount={8} tone="dark" />

          <div className="mt-6">
            <Link
              href="/temoignages"
              className="inline-flex items-center gap-2 rounded-2xl border border-emerald-500/40 bg-emerald-500/10 px-5 py-3 text-sm font-bold text-emerald-200 transition-colors hover:border-emerald-400 hover:text-white"
            >
              <span>{t("home.allTestimonials")}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        {/* MANUAL TRIGGER BUTTON IN CASE USER WANTS TO RE-OPEN THE MODAL */}
        {wonPrizeName && (
          <div className="p-5 rounded-3xl bg-emerald-950/60 border-2 border-emerald-500 text-center space-y-3 shadow-xl">
            <p className="text-emerald-300 font-extrabold text-sm sm:text-base">
              {t("home.discoveredPrize")} <span className="text-white underline">{wonPrizeName}</span>
            </p>
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="px-6 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm transition-transform hover:scale-105 cursor-pointer shadow-lg"
            >
              <span>{t("home.reopenForm")}</span>
            </button>
          </div>
        )}

        {/* MINI TESTIMONIALS SLIDER (extrait en bas de la page d'accueil) */}
        <div className="pt-8">
          <div className="max-w-5xl mx-auto px-4">
            {/* Composant chargé côté client uniquement (dynamic + ssr:false) */}
            <MiniTestimonials testimonials={homeTestimonials} />
          </div>
        </div>
      </main>


      <footer className="border-t border-slate-800/80 bg-slate-950/95 py-8 text-sm text-slate-400">
        <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-semibold text-slate-200">Almira Aldahab Foundation</p>
            <p className="mt-1">© Almira Aldahab Foundation</p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Link href="/" className="transition-colors hover:text-emerald-400">
              {t("nav.home")}
            </Link>
            <Link href="/jeu" className="transition-colors hover:text-emerald-400">
              {t("nav.game")}
            </Link>
            <Link href="/a-propos" className="transition-colors hover:text-emerald-400">
              {t("nav.about")}
            </Link>
            <Link href="/contact" className="transition-colors hover:text-emerald-400">
              {t("nav.contact")}
            </Link>
            <Link href="/politique-confidentialite" className="transition-colors hover:text-emerald-400">
              {t("nav.privacy")}
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
