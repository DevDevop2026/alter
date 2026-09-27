"use client";

import { useState, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { useTranslation } from "react-i18next";

interface AudioAssistantProps {
  textToSpeak: string;
  label?: string;
  className?: string;
}

export function AudioAssistant({
  textToSpeak,
  label,
  className = "",
}: AudioAssistantProps) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [supported, setSupported] = useState(false);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      setSupported(true);
    }
  }, []);

  const handleSpeak = () => {
    if (!supported || typeof window === "undefined") return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel(); // Stop any ongoing speech

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = i18n.resolvedLanguage === "en" ? "en-US" : "es-ES";
    utterance.rate = 0.9; // Slightly slower, clear pace

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  if (!supported) return null;

  return (
    <button
      type="button"
      onClick={handleSpeak}
      className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl font-bold text-xs transition-all duration-200 shadow-md cursor-pointer ${
        isSpeaking
          ? "bg-amber-500 text-slate-950 animate-pulse border-2 border-amber-300 scale-105"
          : "bg-gradient-to-r from-amber-500/20 to-orange-500/20 hover:from-amber-500/30 hover:to-orange-500/30 text-amber-300 border border-amber-500/40 hover:scale-102"
      } ${className}`}
      title={t("audio.title")}
    >
      {isSpeaking ? (
        <>
          <VolumeX className="w-5 h-5 text-slate-950 animate-bounce" />
          <span>{t("audio.stop")}</span>
        </>
      ) : (
        <>
          <Volume2 className="w-5 h-5 text-amber-400 shrink-0" />
          <span>🔊 {label ?? t("audio.label")}</span>
        </>
      )}
    </button>
  );
}
