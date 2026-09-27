"use client";

import { useTranslation } from "react-i18next";

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const activeLanguage = i18n.resolvedLanguage ?? "es";

  // Language changes stay in memory so a fresh page load always starts in Spanish.
  function changeLanguage(language: "es" | "en") {
    void i18n.changeLanguage(language);
  }

  return (
    <div className="inline-flex shrink-0 items-center rounded-full border border-slate-200 bg-white p-1" aria-label={activeLanguage === "es" ? "Idioma" : "Language"}>
      <button
        type="button"
        lang="es"
        aria-pressed={activeLanguage === "es"}
        onClick={() => changeLanguage("es")}
        className={`rounded-full px-2.5 py-1.5 text-xs font-semibold transition-colors ${activeLanguage === "es" ? "bg-emerald-600 text-white" : "text-slate-600 hover:bg-slate-100"}`}
      >
        Español
      </button>
      <button
        type="button"
        lang="en"
        aria-pressed={activeLanguage === "en"}
        onClick={() => changeLanguage("en")}
        className={`rounded-full px-2.5 py-1.5 text-xs font-semibold transition-colors ${activeLanguage === "en" ? "bg-emerald-600 text-white" : "text-slate-600 hover:bg-slate-100"}`}
      >
        English
      </button>
    </div>
  );
}
