import '@testing-library/jest-dom';

// Polyfill pour TextEncoder/TextDecoder requis par React Router
const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Mock global de fetch pour les tests
global.fetch = jest.fn();

// Mock global d'alert pour les tests
global.alert = jest.fn();

// Mock de window.matchMedia pour Material-UI
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock de react-i18next pour les tests
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      // Traductions mock pour les tests
      const translations: { [key: string]: string } = {
        // Contact page
        'contact.title': 'Contact',
        'contact.sendMessage': 'Envoyez-moi un message',
        'contact.socialNetworks': 'Mes réseaux sociaux',
        'contact.infoTitle': 'Mes coordonnées',
        'contact.form.fullName': 'Nom complet',
        'contact.form.email': 'Email',
        'contact.form.subject': 'Sujet',
        'contact.form.message': 'Message',
        'contact.successMessage': 'Votre message a été envoyé avec succès !',
        
        // Navigation
        'navigation.tips': 'Tips',
        'navigation.prompts': 'Prompts',
        'navigation.contact': 'Contact',
        
        // Search
        'search.placeholder': 'Rechercher...',
        'search.noResults': 'Aucun résultat',
        
        // Home page
        'home.latestPrompts': 'Derniers prompts publiés :',
        'home.introduction.title': 'Bienvenue sur CraftsmanLab',
        'home.introduction.subtitle': 'Tips / Mémos',
        'home.cta.tips': 'Tips / Mémos',
        'home.cta.prompts': 'Prompts IA',
        
        // Footer
        'pages:footer.copyright': '© 2024 CraftsmanLab. Tous droits réservés.',
        
        // Common
        'common:buttons.submit': 'Envoyer',
      };
      return translations[key] || key;
    },
    i18n: {
      changeLanguage: jest.fn(),
      language: 'fr',
    },
  }),
  initReactI18next: {
    type: '3rdParty',
    init: jest.fn(),
  },
}));
