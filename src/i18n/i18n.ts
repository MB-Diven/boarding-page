import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import ltTranslations from "./locales/lt/translations";
import enTranslations from "./locales/en/translations";

i18n
  // detect user language
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next
  .use(initReactI18next)
  // init i18next
  .init({
    resources: {
      lt: {
        translation: ltTranslations,
      },
      en: {
        translation: enTranslations,
      },
    },
    fallbackLng: "lt",
    debug: process.env.NODE_ENV === "development",

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },

    // Set Lithuanian as the default language
    lng: "lt",
  });

export default i18n;
