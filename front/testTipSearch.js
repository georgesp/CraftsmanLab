// Script de test pour valider la recherche des tips
// Usage: node testTipSearch.js (dans le dossier front)

// Simuler les données de test
const mockTips = [
  {
    slug: 'dapper',
    title: 'Utilisation de Dapper',
    shortDescription: 'Utilisation de Dapper (DTO, alias, multi‑mapping).',
    writtenOn: '2025-08-12',
    keywords: ['C#'],
  metadata: { searchKeywords: ['dapper', 'orm', 'micro-orm', 'base de données', 'database', 'sql', 'requête', 'query', 'mapping', 'dto'] }
  },
  {
    slug: 'automapper',
    title: 'Automapper',
    shortDescription: 'Mapping simple et efficace entre DTOs et entités avec AutoMapper',
    writtenOn: '2025-08-14',
    keywords: ['C#'],
  metadata: { searchKeywords: ['automapper', 'mapping', 'transformation', 'conversion', 'dto', 'entity', 'objet', 'object'] }
  },
  {
    slug: 'xunit',
    title: 'xUnit',
    shortDescription: 'Écrire des tests avec xUnit : bases, fixtures et bonnes pratiques.',
    writtenOn: '2025-08-12',
    keywords: ['C#'],
  metadata: { searchKeywords: ['xunit', 'tests', 'test unitaire', 'unit testing', 'testing', 'assertion', 'fact', 'theory'] }
  },
  {
    slug: 'nsubstitute',
    title: 'NSubstitute',
    shortDescription: 'Mocker avec NSubstitute : bases, exemples et bonnes pratiques.',
    writtenOn: '2025-08-12',
    keywords: ['C#'],
  metadata: { searchKeywords: ['nsubstitute', 'mock', 'mocking', 'substitute', 'double', 'fake', 'tests'] }
  },
  {
    slug: 'polly',
    title: 'Polly',
    shortDescription: 'Ajouter de la résilience à vos appels : retry, circuit breaker, timeout et fallback.',
    writtenOn: '2025-08-20',
    keywords: ['C#'],
  metadata: { searchKeywords: ['polly', 'résilience', 'resilience', 'retry', 'circuit breaker', 'timeout', 'fallback'] }
  },
  {
    slug: 'collection',
    title: 'Collections C#',
    shortDescription: 'Différentes collections en C# (IEnumerable, ICollection, IList, IReadOnlyCollection, etc..)',
    writtenOn: '2025-08-11',
    keywords: ['C#'],
  metadata: { searchKeywords: ['collections', 'ienumerable', 'icollection', 'ilist', 'ireadonlycollection'] }
  },
  {
    slug: 'facet',
    title: 'Facet',
    shortDescription: 'Générateur de projections (DTO) et mappings pour C# et EF Core.',
    writtenOn: '2025-08-21',
    keywords: ['C#'],
  metadata: { searchKeywords: ['facet', 'générateur', 'generator', 'code generation', 'dto', 'projections', 'mapping'] }
  }
];

// Fonction de recherche simplifiée
function searchTips(tips, query) {
  if (!query.trim()) return tips;

  const searchTerm = query.toLowerCase().trim();
  
  return tips.filter(tip => {
    // Recherche dans le titre
    if (tip.title.toLowerCase().includes(searchTerm)) {
      return true;
    }
    
    // Recherche dans la description courte
    if (tip.shortDescription.toLowerCase().includes(searchTerm)) {
      return true;
    }
    
    // Recherche dans les keywords (constantes)
    if (tip.keywords.some(keyword => 
      keyword.toLowerCase().includes(searchTerm)
    )) {
      return true;
    }
    
    // Recherche dans les métadonnées si elles existent
    if (tip.metadata?.searchKeywords) {
      const keywords = tip.metadata.searchKeywords || [];
      if (keywords.some(keyword => 
        keyword.toLowerCase().includes(searchTerm)
      )) {
        return true;
      }
    }
    
    return false;
  });
}

// Tests de recherche
console.log('🔍 Tests de recherche des Tips (avec noms d\'outils)\n');

const testCases = [
  // Tests des noms d'outils spécifiquement
  { query: 'dapper', expected: ['dapper'] },
  { query: 'automapper', expected: ['automapper'] },
  { query: 'xunit', expected: ['xunit'] },
  { query: 'nsubstitute', expected: ['nsubstitute'] },
  { query: 'polly', expected: ['polly'] },
  { query: 'facet', expected: ['facet'] },
  
  // Tests en français
  { query: 'base de données', expected: ['dapper'] },
  { query: 'transformation', expected: ['automapper'] },
  { query: 'tests', expected: ['xunit', 'nsubstitute'] },
  { query: 'mock', expected: ['nsubstitute'] },
  { query: 'collections', expected: ['collection'] },
  
  // Tests en anglais
  { query: 'database', expected: ['dapper'] },
  { query: 'mapping', expected: ['dapper', 'automapper', 'facet'] },
  { query: 'testing', expected: ['xunit'] },
  { query: 'resilience', expected: ['polly'] },
  { query: 'generator', expected: ['facet'] },
  
  // Tests par titre/description
  { query: 'fixtures', expected: ['xunit'] },
  { query: 'ef core', expected: ['facet'] },
  
  // Tests vides
  { query: '', expected: mockTips.map(t => t.slug) },
  { query: '   ', expected: mockTips.map(t => t.slug) }
];

let passedTests = 0;
let totalTests = testCases.length;

testCases.forEach((testCase, index) => {
  const results = searchTips(mockTips, testCase.query);
  const resultSlugs = results.map(r => r.slug);
  
  const passed = testCase.expected.every(expected => resultSlugs.includes(expected));
  
  if (passed) {
    console.log(`✅ Test ${index + 1}: "${testCase.query}" (${testCase.lang}) → ${resultSlugs.join(', ')}`);
    passedTests++;
  } else {
    console.log(`❌ Test ${index + 1}: "${testCase.query}" (${testCase.lang})`);
    console.log(`   Attendu: ${testCase.expected.join(', ')}`);
    console.log(`   Obtenu: ${resultSlugs.join(', ')}`);
  }
});

console.log(`\n📊 Résultats: ${passedTests}/${totalTests} tests réussis`);

if (passedTests === totalTests) {
  console.log('🎉 Tous les tests sont passés ! Le système de recherche fonctionne correctement.');
  console.log('💡 Les noms d\'outils sont maintenant inclus dans les métadonnées de recherche.');
} else {
  console.log('⚠️  Certains tests ont échoué. Vérifiez la logique de recherche.');
}
