import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Import translation files
import en from "./en.json";
import ru from "./ru.json";
import es from "./es.json";
import fr from "./fr.json";
import it from "./it.json";
import zh from "./zh.json";
import uz from "./uz.json";
import design from "./design.json";

const resources = {
  en: { translation: { ...en, design: design.en } },
  ru: { translation: { ...ru, design: design.ru } },
  es: { translation: { ...es, design: design.es } },
  fr: { translation: { ...fr, design: design.fr } },
  it: { translation: { ...it, design: design.it } },
  zh: { translation: { ...zh, design: design.zh } },
  uz: { translation: { ...uz, design: design.uz } },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    supportedLngs: ["en", "ru", "es", "fr", "it", "zh", "uz"], // Define supported languages
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

document.documentElement.lang = i18n.resolvedLanguage || "en";
i18n.on("languageChanged", (language) => {
  document.documentElement.lang = language.split("-")[0];
});

export default i18n;
