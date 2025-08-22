import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import des traductions
import commonFr from '../locales/fr/common.json';
import commonEn from '../locales/en/common.json';
import pagesFr from '../locales/fr/pages.json';
import pagesEn from '../locales/en/pages.json';
import promptsFr from '../locales/fr/prompts.json';
import promptsEn from '../locales/en/prompts.json';

const resources = {
  fr: {
    common: commonFr,
    pages: pagesFr,
    prompts: promptsFr,
  },
  en: {
    common: commonEn,
    pages: pagesEn,
    prompts: promptsEn,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'fr',
    defaultNS: 'common',
    
    interpolation: {
      escapeValue: false, // React already escapes values
    },

    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
  });

export default i18n;
