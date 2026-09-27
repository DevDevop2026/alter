"use client";

import { useEffect, useState, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import {
  CheckCircle2,
  Copy,
  Check,
  ExternalLink,
  PhoneCall,
  Clock,
  ArrowLeft,
  MessageSquare,
  Sparkles,
  ShieldCheck,
  Share2,
  Gift,
  Trophy,
} from "lucide-react";
import Link from "next/link";
import { AudioAssistant } from "@/components/AudioAssistant";
import { RECOMPENSE_SPOTLIGHT } from "@/lib/gallery";
import { useTranslation } from "react-i18next";

const RewardsGallery = dynamic(
  () => import("@/components/RewardsGallery").then((m) => m.RewardsGallery),
  { ssr: false }
);

interface DonData {
  id: string;
  code: string;
  nom: string;
  prenom: string;
  telephone: string;
  status: string;
  createdAt: string;
}

interface WhatsAppData {
  url: string;
  message: string;
  adminPhone: string;
}

function SuccessContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { t, i18n } = useTranslation();

  const [don, setDon] = useState<DonData | null>(null);
  const [whatsapp, setWhatsapp] = useState<WhatsAppData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [countdown, setCountdown] = useState(5);
  const [isPaused, setIsPaused] = useState(false);
  const [copied, setCopied] = useState(false);
  const redirectTriggeredRef = useRef(false);

  // Load donation data
  useEffect(() => {
    if (!id) {
      setError(t("success.noId"));
      setLoading(false);
      return;
    }

    if (typeof window !== "undefined") {
      const cached = sessionStorage.getItem(`don_${id}`);
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          if (parsed.don && parsed.whatsapp) {
            setDon(parsed.don);
            setWhatsapp(parsed.whatsapp);
            setLoading(false);
            return;
          }
        } catch (e) {
          console.warn("Failed to parse cached don", e);
        }
      }
    }

    fetch(`/api/don-specials/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setDon(data.don);
          setWhatsapp(data.whatsapp);
        } else {
          setError(t("success.notFound"));
        }
      })
      .catch((err) => {
        console.error("Error fetching don:", err);
        setError(t("success.connectionError"));
      })
      .finally(() => setLoading(false));
  }, [id, t]);

  // Trigger Confetti Celebration — canvas-confetti est chargé à la demande
  useEffect(() => {
    if (!don || error) return;

    let cancelled = false;
    void import("canvas-confetti")
      .then(({ default: confetti }) => {
        if (cancelled) return;
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.5 },
          colors: ["#10B981", "#3B82F6", "#F59E0B", "#EC4899", "#8B5CF6"],
        });
      })
      .catch((err) => console.warn("Confetti error", err));

    return () => {
      cancelled = true;
    };
  }, [don, error]);

  // Redirection Countdown Timer
  useEffect(() => {
    if (!whatsapp?.url || isPaused || redirectTriggeredRef.current || loading) {
      return;
    }

    if (countdown <= 0) {
      redirectTriggeredRef.current = true;
      window.location.href = whatsapp.url;
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown, whatsapp, isPaused, loading]);

  const handleCopyCode = () => {
    if (!don?.code) return;
    navigator.clipboard.writeText(don.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleManualRedirect = () => {
    if (whatsapp?.url) {
      redirectTriggeredRef.current = true;
      window.location.href = whatsapp.url;
    }
  };

  const successAudioScript = don
    ? t("success.audio", { name: don.prenom, code: don.code })
    : t("success.audioFallback");

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin mb-4" />
        <p className="text-white text-lg font-bold">{t("success.loading")}</p>
      </div>
    );
  }

  if (error || !don) {
    return (
      <div className="max-w-xl mx-auto my-12 p-8 rounded-3xl bg-slate-900 border-2 border-slate-800 text-center shadow-2xl">
        <div className="w-20 h-20 rounded-full bg-rose-500/20 border-2 border-rose-500/40 text-rose-400 flex items-center justify-center mx-auto mb-4 text-3xl">
          ⚠️
        </div>
        <h2 className="text-2xl font-black text-white mb-2">{t("success.unable")}</h2>
        <p className="text-slate-300 mb-6 font-medium">{error || t("success.donMissing")}</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>{t("success.backForm")}</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto my-6 px-4">
      {/* SUCCESS HEADER */}
      <div className="text-center mb-8 space-y-3">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-emerald-500/20 border-4 border-emerald-500 text-emerald-400 shadow-2xl shadow-emerald-500/30 mb-2 animate-bounce">
          <Gift className="w-12 h-12" />
        </div>
        <div>
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-black uppercase tracking-wider">
            {t("success.successBadge")}
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          {t("success.congratulations", { name: don.prenom })}
        </h1>
        <p className="text-slate-300 text-base max-w-md mx-auto font-medium">
          {t("success.codeIntro")}
        </p>

        <div className="pt-2 flex justify-center">
          <AudioAssistant textToSpeak={successAudioScript} label={t("success.listen")} />
        </div>
      </div>

      {/* CODE DISPLAY CARD */}
      <div className="p-6 sm:p-10 rounded-3xl bg-linear-to-b from-slate-900 via-slate-900 to-slate-950 border-4 border-emerald-500 shadow-2xl relative overflow-hidden mb-8 text-center">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <ShieldCheck className="w-64 h-64 text-emerald-400" />
        </div>

        <div className="relative z-10 space-y-4">
          <p className="text-xs sm:text-sm font-black uppercase tracking-widest text-emerald-400">
            🔑 {t("success.yourCode")}
          </p>

          <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-3 bg-slate-950 border-2 border-emerald-500/50 rounded-3xl p-4 sm:p-6 shadow-inner">
            <span className="font-mono text-4xl sm:text-6xl font-black tracking-widest text-white drop-shadow-md">
              {don.code}
            </span>
            <button
              onClick={handleCopyCode}
              className="px-5 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm transition-all flex items-center gap-2 cursor-pointer shadow-lg"
            >
              {copied ? (
                <>
                  <Check className="w-5 h-5" />
                  <span>{t("success.copied")}</span>
                </>
              ) : (
                <>
                  <Copy className="w-5 h-5" />
                  <span>{t("success.copy")}</span>
                </>
              )}
            </button>
          </div>

          <p className="text-xs text-slate-400 font-semibold">
            {t("success.saved")}
          </p>
        </div>
      </div>

      {/* GIANT WHATSAPP REDIRECTION BUTTON BANNER */}
      {whatsapp && (
        <div className="p-6 sm:p-8 rounded-3xl bg-linear-to-r from-emerald-950 via-teal-950 to-slate-900 border-2 border-emerald-500/50 mb-8 space-y-5 shadow-2xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-center sm:text-left">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500 text-slate-950 flex items-center justify-center font-black text-2xl shrink-0 shadow-lg animate-pulse">
                📲
              </div>
              <div>
                <h3 className="font-black text-white text-lg sm:text-xl">
                  {t("success.whatsappHeading")}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300">
                  {t("success.whatsappDescription")}
                </p>
              </div>
            </div>

            {countdown > 0 ? (
              <div className="bg-slate-950/80 px-4 py-2 rounded-2xl border border-emerald-500/30 text-center shrink-0">
                <span className="font-mono font-black text-3xl text-emerald-400">{countdown}s</span>
                <p className="text-[10px] text-slate-400 uppercase font-bold">{t("success.countdown")}</p>
              </div>
            ) : (
              <span className="text-xs font-black text-emerald-400 bg-slate-950 px-3 py-1.5 rounded-xl border border-emerald-500">
                {t("success.redirecting")}
              </span>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
            <button
              onClick={handleManualRedirect}
              className="w-full sm:flex-1 py-5 px-8 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-lg sm:text-xl shadow-2xl shadow-emerald-500/30 transition-transform hover:scale-102 flex items-center justify-center gap-3 cursor-pointer border-2 border-emerald-300"
            >
              <PhoneCall className="w-6 h-6" />
              <span>{t("success.openWhatsApp")}</span>
              <ExternalLink className="w-5 h-5" />
            </button>

            <button
              onClick={() => setIsPaused(!isPaused)}
              className="w-full sm:w-auto px-5 py-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700 transition-colors cursor-pointer whitespace-nowrap"
            >
              {isPaused ? t("success.resume") : t("success.pause")}
            </button>
          </div>
        </div>
      )}

      {/* RECAP CARD */}
      <div className="p-6 rounded-3xl bg-slate-900 border-2 border-slate-800 space-y-4 mb-8 shadow-xl">
        <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 pb-2 border-b border-slate-800 flex items-center justify-between">
          <span>{t("success.summary")}</span>
          <span className="text-xs text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
            {t("success.notified")}
          </span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-medium">
          <div>
            <p className="text-xs text-slate-500 font-bold">{t("success.fullName")}</p>
            <p className="font-extrabold text-white text-base">
              {don.nom} {don.prenom}
            </p>
          </div>

          <div>
            <p className="text-xs text-slate-500 font-bold">{t("success.phone")}</p>
            <p className="font-mono font-extrabold text-white text-base">{don.telephone}</p>
          </div>

          <div>
            <p className="text-xs text-slate-500 font-bold">{t("success.date")}</p>
            <p className="text-slate-300 text-xs">
              {new Date(don.createdAt).toLocaleString(i18n.resolvedLanguage === "en" ? "en-US" : "es-ES")}
            </p>
          </div>
        </div>

        {whatsapp?.message && (
          <div className="mt-4 pt-4 border-t border-slate-800">
            <p className="text-xs text-slate-400 font-bold mb-1.5 flex items-center gap-1.5">
              <Share2 className="w-4 h-4 text-emerald-400" />
              <span>{t("success.messagePreview")}</span>
            </p>
            <pre className="p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-300 whitespace-pre-wrap leading-relaxed">
              {whatsapp.message}
            </pre>
          </div>
        )}
      </div>

      {/* RÉCOMPENSES DÉJÀ REMISES — preuve visuelle avant la redirection */}
      <section className="mb-8 rounded-3xl border border-emerald-500/25 bg-emerald-950/40 p-5 sm:p-6">
        <h3 className="mb-1 flex items-center gap-2 text-sm font-black uppercase tracking-wider text-amber-300">
          <Trophy className="w-4 h-4" />
          {t("success.rewards")}
        </h3>
        <p className="mb-4 text-xs text-slate-300">
          {t("success.rewardDescription")}
        </p>
        <RewardsGallery items={RECOMPENSE_SPOTLIGHT} initialCount={4} tone="dark" />
      </section>

      <div className="text-center pb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t("success.anotherRequest")}</span>
        </Link>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <main className="flex-1 py-6">
        <Suspense
          fallback={
            <div className="min-h-[60vh] flex items-center justify-center">
              <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
            </div>
          }
        >
          <SuccessContent />
        </Suspense>
      </main>
    </div>
  );
}
