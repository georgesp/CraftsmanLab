import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import commonFr from '../locales/fr/common.json';
import commonEn from '../locales/en/common.json';
import pagesFr from '../locales/fr/pages.json';
import pagesEn from '../locales/en/pages.json';
import {
  tipsTranslationsFr,
  tipsTranslationsEn,
  promptsTranslationsFr,
  promptsTranslationsEn,
} from '../components/content-manifest';

const resources = {
  fr: {
    common: commonFr,
    pages: pagesFr,
  prompts: promptsTranslationsFr,
  tips: tipsTranslationsFr,
  },
  en: {
    common: commonEn,
    pages: pagesEn,
  prompts: promptsTranslationsEn,
  tips: tipsTranslationsEn,
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
