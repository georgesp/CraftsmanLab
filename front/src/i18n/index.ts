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
import tipsFr from '../locales/fr/tips.json';
import tipsEn from '../locales/en/tips.json';
// Import des traductions per-component
import pollyFr from '../components/tips/polly/fr.json';
import pollyEn from '../components/tips/polly/en.json';
import dapperFr from '../components/tips/dapper/fr.json';
import dapperEn from '../components/tips/dapper/en.json';
import automapperFr from '../components/tips/automapper/fr.json';
import automapperEn from '../components/tips/automapper/en.json';
import xunitFr from '../components/tips/xunit/fr.json';
import xunitEn from '../components/tips/xunit/en.json';
import nsubstituteFr from '../components/tips/nsubstitute/fr.json';
import nsubstituteEn from '../components/tips/nsubstitute/en.json';
import facetFr from '../components/tips/facet/fr.json';
import facetEn from '../components/tips/facet/en.json';
import switchTupleFr from '../components/tips/tic/fr.json';
import switchTupleEn from '../components/tips/tic/en.json';
import cpmFr from '../components/tips/cpm/fr.json';
import cpmEn from '../components/tips/cpm/en.json';
import collectionFr from '../components/tips/collection/fr.json';
import collectionEn from '../components/tips/collection/en.json';
import keyValueCollectionFr from '../components/tips/keyValueCollection/fr.json';
import keyValueCollectionEn from '../components/tips/keyValueCollection/en.json';

const resources = {
  fr: {
    common: commonFr,
    pages: pagesFr,
    prompts: promptsFr,
    tips: {
      ...tipsFr,
      ...pollyFr,
      ...dapperFr,
      ...automapperFr,
      ...xunitFr,
      ...nsubstituteFr,
      ...facetFr,
      ...switchTupleFr,
      ...cpmFr,
      ...collectionFr,
      ...keyValueCollectionFr,
    },
  },
  en: {
    common: commonEn,
    pages: pagesEn,
    prompts: promptsEn,
    tips: {
      ...tipsEn,
      ...pollyEn,
      ...dapperEn,
      ...automapperEn,
      ...xunitEn,
      ...nsubstituteEn,
      ...facetEn,
      ...switchTupleEn,
      ...cpmEn,
      ...collectionEn,
      ...keyValueCollectionEn,
    },
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
