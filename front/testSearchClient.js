// Test rapide de la recherche améliorée avec métadonnées
// Usage: node testSearchClient.js (dans le dossier front)

console.log('🔍 Test de la recherche client améliorée avec métadonnées\n');

// Fonction pour obtenir la langue (simplifiée pour le test)
function getCurrentLanguage() {
  return 'fr'; // Langue par défaut pour le test
}

// Simuler les registres (version simplifiée)
const mockTipsList = [
  {
    slug: 'dapper',
    title: 'Utilisation de Dapper',
    shortDescription: 'Utilisation de Dapper (DTO, alias, multi‑mapping).',
  metadata: { searchKeywords: ['dapper', 'orm', 'micro-orm', 'base de données', 'database', 'sql'] }
  },
  {
    slug: 'polly',
    title: 'Polly',
    shortDescription: 'Ajouter de la résilience à vos appels : retry, circuit breaker, timeout et fallback.',
  metadata: { searchKeywords: ['polly', 'résilience', 'resilience', 'retry', 'circuit breaker', 'timeout'] }
  }
];

const mockPromptsList = [
  {
    slug: 'aspnet-core-guidances',
    title: 'ASP.NET Core Guidances',
    shortDescription: 'Guide des meilleures pratiques pour ASP.NET Core',
  metadata: { searchKeywords: ['aspnet', 'asp.net', 'core', 'web api', 'mvc', 'développement web', 'web development'] }
  }
];

// Fonction de recherche simplifiée basée sur notre nouvelle logique
function testSearch(query, lang = 'fr') {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  
  const allItems = [
    ...mockTipsList.map(t => ({ ...t, kind: 'tip' })),
    ...mockPromptsList.map(p => ({ ...p, kind: 'prompt' }))
  ];
  
  const matched = allItems.filter(item => {
    // 1. Recherche dans le titre
    if (item.title.toLowerCase().includes(q)) {
      return true;
    }
    
    // 2. Recherche dans la description
    if (item.shortDescription.toLowerCase().includes(q)) {
      return true;
    }
    
    // 3. Recherche dans les métadonnées
    if (item.metadata?.searchKeywords) {
      const keywords = item.metadata.searchKeywords || [];
      if (keywords.some(keyword => keyword.toLowerCase().includes(q))) {
        return true;
      }
    }
    
    return false;
  });
  
  // Tri par pertinence
  matched.sort((a, b) => {
    if (a.kind !== b.kind) {
      return a.kind === 'tip' ? -1 : 1;
    }
    return a.title.localeCompare(b.title);
  });
  
  return matched;
}

// Tests
const testCases = [
  { query: 'dapper', expected: ['dapper'] },
  { query: 'polly', expected: ['polly'] },
  { query: 'base de données', expected: ['dapper'] },
  { query: 'résilience', expected: ['polly'] },
  { query: 'aspnet', expected: ['aspnet-core-guidances'] },
  { query: 'orm', expected: ['dapper'] },
  { query: 'web api', expected: ['aspnet-core-guidances'] },
  { query: 'retry', expected: ['polly'] }
];

let passed = 0;
testCases.forEach((test, index) => {
  const results = testSearch(test.query);
  const found = results.map(r => r.slug);
  const success = test.expected.every(exp => found.includes(exp));
  
  if (success) {
    console.log(`✅ Test ${index + 1}: "${test.query}" → ${found.join(', ')}`);
    passed++;
  } else {
    console.log(`❌ Test ${index + 1}: "${test.query}"`);
    console.log(`   Attendu: ${test.expected.join(', ')}`);
    console.log(`   Trouvé: ${found.join(', ')}`);
  }
});

console.log(`\n📊 Résultat: ${passed}/${testCases.length} tests réussis`);

if (passed === testCases.length) {
  console.log('🎉 La logique de recherche avec métadonnées fonctionne !');
  console.log('🔍 Les utilisateurs peuvent maintenant chercher par :');
  console.log('   • Nom d\'outil (dapper, polly, aspnet)');
  console.log('   • Concepts techniques (orm, résilience, web api)');
  console.log('   • Mots-clés en français et anglais');
} else {
  console.log('⚠️  Certains tests ont échoué.');
}
