"use client";

import { useEffect, type ReactNode } from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "@/lib/i18n";

export function I18nProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Keep document language in sync with the active interface language.
    const updateDocumentLanguage = (language: string) => {
      document.documentElement.lang = language;
    };

    updateDocumentLanguage(i18n.resolvedLanguage ?? "es");
    i18n.on("languageChanged", updateDocumentLanguage);
    return () => i18n.off("languageChanged", updateDocumentLanguage);
  }, []);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
