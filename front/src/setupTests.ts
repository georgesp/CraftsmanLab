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
