import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import enTranslation from "./i18n/translations/en.json";
import itTranslation from "./i18n/translations/it.json";

const resources = {
  it: {
    translation: itTranslation,
  },
  en: {
    translation: enTranslation,
  },
};

export function changeAppLanguage(language: string) {
  i18n.changeLanguage(language);
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    detection: {
      order: ["htmlTag", "localStorage", "sessionStorage", "navigator"],
      caches: ["localStorage", "sessionStorage"],
      lookupLocalStorage: "i18nextLng",
      lookupSessionStorage: "i18nextLng",
    },
    interpolation: {
      escapeValue: false,
    },
  });

// Keep the <html lang="..."> attribute in sync with the active language.
i18n.on("languageChanged", (lng) => {
  document.documentElement.lang = lng;
});

export default i18n;
