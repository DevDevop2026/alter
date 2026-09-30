"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { HeroCarousel } from "@/components/HeroCarousel";
import { PageShell } from "@/components/PageShell";
import { HERO_SLIDES } from "@/lib/gallery";
import { useTranslation } from "react-i18next";
import {
  Sparkles,
  Play,
  CheckCircle2,
  Gift,
  Send,
  ArrowRight,
  Copy,
  Check,
  User,
  Globe,
  Phone,
  HelpCircle,
} from "lucide-react";

const DEFAULT_ADMIN_WHATSAPP = "351925396119";

function generateCode(length = 8) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export default function JeuPage() {
  const [started, setStarted] = useState(false);
  const [form, setForm] = useState({ nom: "", prenom: "", pays: "", tel: "" });
  const [code, setCode] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const { t } = useTranslation();
  const participationSteps = [1, 2, 3, 4, 5].map((step) => ({
    step,
    title: t(`game.step${step}Title`),
    desc: t(`game.step${step}Desc`),
  }));

  const formSectionRef = useRef<HTMLDivElement>(null);
  const adminNumber = process.env.NEXT_PUBLIC_ADMIN_WHATSAPP_NUMBER ?? DEFAULT_ADMIN_WHATSAPP;

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  }

  function handleStart() {
    setStarted(true);
    setTimeout(() => {
      formSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const newCode = generateCode(8);
    setCode(newCode);
    setTimeout(() => {
      formSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 100);
  }

  function copyToClipboard() {
    if (!code) return;
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  function buildWhatsAppUrl() {
    const message = t("game.whatsappMessage", {
      code,
      lastName: form.nom,
      firstName: form.prenom,
      country: form.pays,
      phone: form.tel,
    });
    const encoded = encodeURIComponent(message);
    const cleaned = String(adminNumber).replace(/[^0-9+]/g, "");
    const waNumber = cleaned.replace(/^\+/, "");
    return `https://wa.me/${waNumber}?text=${encoded}`;
  }

  return (
    <div className="min-h-screen bg-(--color-bg) text-slate-900 font-sans pb-16">
      <PageShell
        title={t("game.title")}
        eyebrow={t("game.eyebrow")}
        description={t("game.description")}
      >
        <div className="space-y-10">
          {/* SECTION EN AVANT : COMMENT PARTICIPER */}
          <section className="relative overflow-hidden rounded-3xl border-2 border-emerald-500/30 bg-linear-to-br from-emerald-950 via-slate-950 to-slate-900 p-6 text-white shadow-xl sm:p-10">
            <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-emerald-500/15 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-teal-500/10 blur-3xl" />

            <div className="relative">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/20 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-emerald-300">
                    <HelpCircle className="h-4 w-4" /> {t("game.guide")}
                  </div>

                  <h2 className="mt-3 text-2xl font-black text-white sm:text-3xl lg:text-4xl">
                    {t("game.heading")}
                  </h2>
                  <p className="mt-2 text-base font-medium text-emerald-100 sm:text-lg">
                    {t("game.intro")}
                  </p>
                </div>

                {!started && (
                  <div className="shrink-0">
                    <button
                      type="button"
                      onClick={handleStart}
                      className="group inline-flex items-center gap-3 rounded-2xl bg-red-600 px-8 py-4 text-base font-black text-white shadow-2xl shadow-red-600/40 transition-all hover:scale-105 hover:bg-red-500 cursor-pointer"
                    >
                      <Play className="h-5 w-5 fill-current text-white transition-transform group-hover:scale-110" />
                      <span>{t("game.start")}</span>
                      <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                )}
              </div>

              {/* Étapes détaillées */}
              <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {participationSteps.map((item, idx) => (
                  <div
                    key={item.step}
                    className={`relative flex flex-col justify-between rounded-2xl border p-5 transition-transform hover:-translate-y-1 ${
                      idx === 0
                        ? "border-emerald-400/50 bg-emerald-900/30 shadow-lg shadow-emerald-950/50"
                        : "border-slate-800 bg-slate-900/60"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500 text-sm font-black text-slate-950 shadow-md">
                          0{item.step}
                        </span>
                        {item.step === 3 && (
                          <span className="rounded-full bg-amber-400/20 px-2 py-0.5 text-[11px] font-bold text-amber-300">
                            {t("game.characters")}
                          </span>
                        )}
                      </div>
                      <h3 className="mt-4 text-base font-bold text-white leading-snug">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-xs leading-5 text-slate-300">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}

                <div className="flex flex-col justify-center rounded-2xl border border-emerald-500/30 bg-emerald-950/40 p-5 text-center">
                  <Sparkles className="mx-auto h-8 w-8 text-emerald-400" />
                  <p className="mt-2 text-sm font-bold text-white">{t("game.free")}</p>
                  <p className="mt-1 text-xs text-slate-300">
                    {t("game.transparency")}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* CARROUSEL D'IMAGES */}
          <section className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-black text-slate-900">
                {t("game.moments")}
              </h3>
              <p className="text-xs text-slate-500 sm:text-sm">
                {t("game.momentsDesc")}
              </p>
            </div>

            <div className="relative mx-auto max-w-3xl overflow-hidden rounded-3xl border border-emerald-200/80 bg-white p-3 shadow-lg sm:p-5">
              <HeroCarousel
                slides={HERO_SLIDES.map((slide, index) => ({
                  ...slide,
                  alt: t("game.imageAlt", { number: index + 1 }),
                  caption: t("game.imageCaption", { number: index + 1 }),
                }))}
                ariaLabel={t("game.carouselAlt")}
                badgeLabel={t("game.carouselBadge")}
                imageFit="cover"
                size="compact"
                imagePosition="center"
                subtleBorder
              />
            </div>

            {/* LE BOUTON APRES LE CARROUSEL D'IMAGE */}
            {!started && (
              <div className="flex flex-col items-center justify-center pt-2 text-center">
                <button
                  type="button"
                  onClick={handleStart}
                  className="group inline-flex items-center gap-3 rounded-full bg-red-600 px-10 py-5 text-lg font-black text-white shadow-xl shadow-red-600/40 transition-all hover:scale-105 hover:bg-red-500 cursor-pointer"
                >
                  <Play className="h-6 w-6 fill-current text-white transition-transform group-hover:scale-110" />
                  <span>{t("game.start")}</span>
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </button>
                <p className="mt-3 text-xs text-slate-500">
                  {t("game.openForm")}
                </p>
              </div>
            )}
          </section>

          {/* FORMULAIRE DU JEU */}
          {started && (
            <div ref={formSectionRef} className="pt-2">
              <section className="relative overflow-hidden rounded-3xl border-2 border-emerald-500/40 bg-white p-6 shadow-2xl sm:p-10">
                <div className="mx-auto max-w-2xl">
                  {!code ? (
                    <div>
                      <div className="border-b border-slate-100 pb-5 text-center">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
                          <Gift className="h-4 w-4" /> {t("game.formBadge")}
                        </span>
                        <h3 className="mt-3 text-2xl font-black text-slate-900 sm:text-3xl">
                          {t("game.formHeading")}
                        </h3>
                        <p className="mt-2 text-sm text-slate-600">
                          {t("game.formDescription")}
                        </p>
                      </div>

                      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                        <div className="grid gap-5 sm:grid-cols-2">
                          <div className="space-y-2">
                            <label htmlFor="nom" className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700">
                              <User className="h-4 w-4 text-emerald-600" /> {t("game.lastName")} *
                            </label>
                            <input
                              id="nom"
                              name="nom"
                              type="text"
                              required
                              value={form.nom}
                              onChange={handleChange}
                              placeholder={t("game.lastNamePlaceholder")}
                              className="w-full rounded-xl border border-slate-300 bg-slate-50/50 px-4 py-3 text-sm text-slate-900 transition-all focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                            />
                          </div>

                          <div className="space-y-2">
                            <label htmlFor="prenom" className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700">
                              <User className="h-4 w-4 text-emerald-600" /> {t("game.firstName")} *
                            </label>
                            <input
                              id="prenom"
                              name="prenom"
                              type="text"
                              required
                              value={form.prenom}
                              onChange={handleChange}
                              placeholder={t("game.firstNamePlaceholder")}
                              className="w-full rounded-xl border border-slate-300 bg-slate-50/50 px-4 py-3 text-sm text-slate-900 transition-all focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                            />
                          </div>
                        </div>

                        <div className="grid gap-5 sm:grid-cols-2">
                          <div className="space-y-2">
                            <label htmlFor="pays" className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700">
                              <Globe className="h-4 w-4 text-emerald-600" /> {t("game.country")} *
                            </label>
                            <input
                              id="pays"
                              name="pays"
                              type="text"
                              required
                              value={form.pays}
                              onChange={handleChange}
                              placeholder={t("game.countryPlaceholder")}
                              className="w-full rounded-xl border border-slate-300 bg-slate-50/50 px-4 py-3 text-sm text-slate-900 transition-all focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                            />
                          </div>

                          <div className="space-y-2">
                            <label htmlFor="tel" className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700">
                              <Phone className="h-4 w-4 text-emerald-600" /> {t("game.phone")} *
                            </label>
                            <input
                              id="tel"
                              name="tel"
                              type="tel"
                              required
                              value={form.tel}
                              onChange={handleChange}
                              placeholder={t("game.phonePlaceholder")}
                              className="w-full rounded-xl border border-slate-300 bg-slate-50/50 px-4 py-3 text-sm text-slate-900 transition-all focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                            />
                          </div>
                        </div>

                        <div className="rounded-xl border border-emerald-100 bg-emerald-50/60 p-4 text-xs text-emerald-800 leading-relaxed">
                          💡 <strong>{t("game.verification")}</strong> {t("game.verificationText")}
                        </div>

                        <div className="pt-3">
                          <button
                            type="submit"
                            className="w-full rounded-2xl bg-emerald-600 py-4 text-base font-black text-white shadow-lg shadow-emerald-600/30 transition-transform hover:-translate-y-0.5 hover:bg-emerald-500 cursor-pointer flex items-center justify-center gap-2"
                          >
                            <Sparkles className="h-5 w-5" />
                            <span>{t("game.generate")}</span>
                          </button>
                        </div>
                      </form>
                    </div>
                  ) : (
                    <div className="text-center space-y-6">
                      <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                        <CheckCircle2 className="h-10 w-10" />
                      </div>

                      <div>
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
                          {t("game.codeReady")}
                        </span>
                        <h3 className="mt-3 text-2xl font-black text-slate-900 sm:text-3xl">
                          {t("game.congratulations")}
                        </h3>
                        <p className="mt-2 text-sm text-slate-600">
                          {t("game.keepCode")}
                        </p>
                      </div>

                      <div className="relative mx-auto max-w-sm rounded-2xl border-2 border-dashed border-emerald-500 bg-emerald-50/80 p-6 shadow-inner">
                        <p className="text-xs font-bold uppercase tracking-widest text-emerald-800">
                          {t("game.officialCode")}
                        </p>
                        <div className="my-3 text-3xl font-black tracking-[0.35em] text-emerald-950 font-mono sm:text-4xl">
                          {code}
                        </div>
                        <button
                          type="button"
                          onClick={copyToClipboard}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-300 bg-white px-3 py-1.5 text-xs font-semibold text-emerald-800 shadow-xs hover:bg-emerald-50 cursor-pointer"
                        >
                          {copied ? (
                            <>
                              <Check className="h-3.5 w-3.5 text-emerald-600" />
                              <span>{t("game.copied")}</span>
                            </>
                          ) : (
                            <>
                              <Copy className="h-3.5 w-3.5" />
                              <span>{t("game.copy")}</span>
                            </>
                          )}
                        </button>
                      </div>

                      <div className="space-y-3 pt-2">
                        <a
                          href={buildWhatsAppUrl()}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-[#25D366] py-5 text-lg font-black text-white shadow-2xl shadow-[#25D366]/40 ring-4 ring-[#25D366]/30 transition-all hover:-translate-y-0.5 hover:scale-[1.02] hover:bg-[#20bd5a] hover:ring-[#25D366]/50"
                        >
                          <Send className="h-6 w-6" />
                          <span>{t("game.sendCode")}</span>
                        </a>

                        <p className="text-xs text-slate-500">
                          {t("game.followUp")}
                        </p>
                      </div>

                      <div className="border-t border-slate-100 pt-5">
                        <Link
                          href="/"
                          className="text-xs font-bold text-slate-500 hover:text-emerald-700 underline"
                        >
                          {t("game.backHome")}
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </section>
            </div>
          )}
        </div>
      </PageShell>
    </div>
  );
}
