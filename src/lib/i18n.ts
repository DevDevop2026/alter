import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "@/locales/en.json";
import es from "@/locales/es.json";

// Spanish is the deterministic startup language; no browser preference is restored.
void i18n.use(initReactI18next).init({
  resources: {
    es: { translation: es },
    en: { translation: en },
  },
  lng: "es",
  fallbackLng: "es",
  supportedLngs: ["es", "en"],
  interpolation: { escapeValue: false },
  returnNull: false,
});

export default i18n;
