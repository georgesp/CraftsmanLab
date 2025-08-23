export type SearchKind = 'tip' | 'prompt';
export type SearchHit = { kind: SearchKind; slug: string; title: string; shortDescription: string };

// Mock intelligent pour les tests - retourne des données prévisibles
export function searchAll(query: string): SearchHit[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  
  // Données de test simulant les vrais tips et prompts avec métadonnées
  const mockData = [
    // Tips
    {
      kind: 'tip' as SearchKind,
      slug: 'dapper',
      title: 'Utilisation de Dapper',
      shortDescription: 'Utilisation de Dapper (DTO, alias, multi‑mapping).',
      keywords: {
        fr: ['dapper', 'orm', 'micro-orm', 'base de données', 'sql'],
        en: ['dapper', 'orm', 'micro-orm', 'database', 'sql']
      }
    },
    {
      kind: 'tip' as SearchKind,
      slug: 'polly',
      title: 'Polly',
      shortDescription: 'Ajouter de la résilience à vos appels : retry, circuit breaker, timeout et fallback.',
      keywords: {
        fr: ['polly', 'résilience', 'retry', 'circuit breaker'],
        en: ['polly', 'resilience', 'retry', 'circuit breaker']
      }
    },
    // Prompts
    {
      kind: 'prompt' as SearchKind,
      slug: 'aspnet-core-guidances',
      title: 'ASP.NET Core Guidances',
      shortDescription: 'Guide des meilleures pratiques pour ASP.NET Core',
      keywords: {
        fr: ['aspnet', 'asp.net', 'core', 'web api', 'développement web'],
        en: ['aspnet', 'asp.net', 'core', 'web api', 'web development']
      }
    },
    {
      kind: 'prompt' as SearchKind,
      slug: 'async-guidances',
      title: 'Async Guidances',
      shortDescription: 'Meilleures pratiques pour la programmation asynchrone',
      keywords: {
        fr: ['async', 'await', 'asynchrone', 'tâche'],
        en: ['async', 'await', 'asynchronous', 'task']
      }
    }
  ];
  
  // Détection de langue simplifiée pour les tests
  const getCurrentLanguage = (): 'fr' | 'en' => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const stored = localStorage.getItem('i18nextLng');
      if (stored && (stored === 'fr' || stored === 'en')) return stored;
    }
    return 'fr'; // default pour les tests
  };
  
  const currentLang = getCurrentLanguage();
  
  // Filtrer les résultats
  const matched = mockData.filter(item => {
    // Recherche dans le titre
    if (item.title.toLowerCase().includes(q)) return true;
    
    // Recherche dans la description
    if (item.shortDescription.toLowerCase().includes(q)) return true;
    
    // Recherche dans les mots-clés
    if (item.keywords[currentLang]?.some(keyword => keyword.toLowerCase().includes(q))) {
      return true;
    }
    
    return false;
  });
  
  // Tri par pertinence : tips d'abord, puis par titre
  matched.sort((a, b) => {
    if (a.kind !== b.kind) {
      return a.kind === 'tip' ? -1 : 1;
    }
    return a.title.localeCompare(b.title);
  });
  
  // Retourner seulement les champs nécessaires
  return matched.map(item => ({
    kind: item.kind,
    slug: item.slug,
    title: item.title,
    shortDescription: item.shortDescription
  }));
}
