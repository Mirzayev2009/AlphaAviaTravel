import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "../generated/locales/en.json";
import { createTranslationBackend } from "./backend";

// Load other dictionaries only when selected, before changing the active language.
const dictionaries = import.meta.glob(["../generated/locales/*.json", "!../generated/locales/en.json"]);
const backend = createTranslationBackend(dictionaries, en);

export const ready = i18n
  .use(LanguageDetector)
  .use(backend)
  .use(initReactI18next)
  .init({
    resources: { en: { translation: en } },
    partialBundledLanguages: true,
    fallbackLng: "en",
    supportedLngs: ["en", "ru", "es", "fr", "it", "zh", "uz"], // Define supported languages
    load: "languageOnly",
    ns: ["translation"],
    defaultNS: "translation",
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
    // React options
    react: {
      useSuspense: false, // Avoid suspense-related issues
    },
  });

ready.then(() => { document.documentElement.lang = i18n.resolvedLanguage || "en"; });
i18n.on("languageChanged", (language) => {
  document.documentElement.lang = (i18n.resolvedLanguage || language).split("-")[0];
});

export default i18n;
