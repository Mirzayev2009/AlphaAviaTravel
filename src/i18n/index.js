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

const resources = {
  en: { translation: en },
  ru: { translation: ru },
  es: { translation: es },
  fr: { translation: fr },
  it: { translation: it },
  zh: { translation: zh },
  uz: { translation: uz },
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

// Optional: Log language changes (useful for debugging)
i18n.on('languageChanged', (lng) => {
  console.log(`Language changed to: ${lng}`);
  // You can add additional logic here if needed
});

export default i18n;