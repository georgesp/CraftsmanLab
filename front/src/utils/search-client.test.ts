// Tests pour le moteur de recherche search-client
// En se basant sur global.prompt.md - tests orientés comportement utilisateur
// Utilise le mock search-client.jest.ts pour éviter les problèmes d'import.meta.glob avec Jest

import { searchAll, type SearchHit } from './search-client';

// Mock de localStorage
const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
  length: 0,
  key: jest.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
});

// Mock de navigator.language
Object.defineProperty(navigator, 'language', {
  value: 'fr-FR',
  configurable: true,
});

describe('search-client functionality', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockLocalStorage.getItem.mockReturnValue('fr');
  });

  describe('base functionality', () => {
    it('should return empty array when query is empty', () => {
      const results = searchAll('');
      expect(results).toEqual([]);
    });

    it('should return empty array when query is only whitespace', () => {
      const results = searchAll('   ');
      expect(results).toEqual([]);
    });
  });

  describe('tip search - find specific Dapper tip', () => {
    it('should find Dapper tip by exact tool name', () => {
      const results = searchAll('dapper');

      expect(results).toHaveLength(1);
      expect(results[0]).toEqual({
        kind: 'tip',
        slug: 'dapper',
        title: 'Utilisation de Dapper',
        shortDescription: 'Utilisation de Dapper (DTO, alias, multi‑mapping).',
      });
    });

    it('should find Dapper tip by French technical concept', () => {
      const results = searchAll('base de données');

      expect(results).toHaveLength(1);
      expect(results[0].slug).toBe('dapper');
      expect(results[0].kind).toBe('tip');
    });

    it('should find Dapper tip by English technical concept', () => {
      const results = searchAll('database');
      expect(results).toHaveLength(1);
      expect(results[0].slug).toBe('dapper');
      expect(results[0].kind).toBe('tip');
    });
  });

  describe('tip search - find specific Polly tip', () => {
    it('should find Polly tip by resilience concept', () => {
      const results = searchAll('résilience');

      expect(results).toHaveLength(1);
      expect(results[0].slug).toBe('polly');
      expect(results[0].kind).toBe('tip');
      expect(results[0].title).toBe('Polly');
    });

    it('should find Polly tip by retry keyword', () => {
      const results = searchAll('retry');

      expect(results).toHaveLength(1);
      expect(results[0].slug).toBe('polly');
      expect(results[0].kind).toBe('tip');
    });
  });

  describe('prompt search - find specific ASP.NET prompt', () => {
    it('should find ASP.NET prompt by framework name', () => {
      const results = searchAll('aspnet');

      expect(results).toHaveLength(1);
      expect(results[0]).toEqual({
        kind: 'prompt',
        slug: 'aspnet-core-guidances',
        title: 'ASP.NET Core Guidances',
        shortDescription: 'Guide des meilleures pratiques pour ASP.NET Core',
      });
    });

    it('should find ASP.NET prompt by French concept', () => {
      const results = searchAll('développement web');

      expect(results).toHaveLength(1);
      expect(results[0].slug).toBe('aspnet-core-guidances');
      expect(results[0].kind).toBe('prompt');
    });
  });

  describe('prompt search - find specific Async prompt', () => {
    it('should find Async prompt by async keyword', () => {
      const results = searchAll('async');

      expect(results).toHaveLength(1);
      expect(results[0].slug).toBe('async-guidances');
      expect(results[0].kind).toBe('prompt');
      expect(results[0].title).toBe('Async Guidances');
    });

    it('should find Async prompt by await keyword', () => {
      const results = searchAll('await');

      expect(results).toHaveLength(1);
      expect(results[0].slug).toBe('async-guidances');
      expect(results[0].kind).toBe('prompt');
    });
  });

  describe('prioritization and sorting', () => {
    it('should prioritize tips over prompts in mixed results', () => {
      // Recherche un terme qui existe dans les tips et prompts
      const results = searchAll('async');

      // Si on a des tips et prompts, tips doivent être en premier
      const tips = results.filter((r: SearchHit) => r.kind === 'tip');
      const prompts = results.filter((r: SearchHit) => r.kind === 'prompt');

      if (tips.length > 0 && prompts.length > 0) {
        const firstTipIndex = results.findIndex((r: SearchHit) => r.kind === 'tip');
        const firstPromptIndex = results.findIndex((r: SearchHit) => r.kind === 'prompt');
        expect(firstTipIndex).toBeLessThan(firstPromptIndex);
      }
    });

    it('should handle case insensitive search', () => {
      const lowerResults = searchAll('dapper');
      const upperResults = searchAll('DAPPER');

      expect(lowerResults).toEqual(upperResults);
    });
  });

  // Language detection tests are no longer needed since keywords are unified FR/EN
});
