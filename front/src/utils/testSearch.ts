// Script de test pour vérifier le fonctionnement de la recherche par mots-clés
// Usage: npm run dev puis ouvrir la console du navigateur et exécuter ce code

// import { usePromptSearch } from '../hooks/usePromptSearch';

// Exemple de données de test (remplace par les vraies données du registry)
const testPrompts = [
  {
    slug: 'aspnet-core-guidances',
    title: 'ASP.NET Core Guidances',
    shortDescription: "Règles et bonnes pratiques ASP.NET Core.",
    writtenOn: '2025-08-11',
    keywords: ['C#'],
    metadata: {
      searchKeywords: {
        fr: ['aspnet', 'core', 'api', 'web', 'performance', 'architecture', 'guidelines', 'bonnes pratiques'],
        en: ['aspnet', 'core', 'api', 'web', 'performance', 'architecture', 'guidelines', 'best practices']
      }
    }
  },
  {
    slug: 'dot-net-async-best-practices',
    title: '.NET Async Best Practices',
    shortDescription: "Guide complet des bonnes pratiques asynchronisme .NET/ASP.NET Core avec exemples concrets.",
    writtenOn: '2025-08-11',
    keywords: ['C#'],
    metadata: {
      searchKeywords: {
        fr: ['async', 'asynchrone', 'await', 'task', 'thread', 'parallélisme', 'concurrence', 'performance'],
        en: ['async', 'asynchronous', 'await', 'task', 'thread', 'parallelism', 'concurrency', 'performance']
      }
    }
  },
  {
    slug: 'craftsmanlab-rules',
    title: 'My Global React Rules',
    shortDescription: "Règles et conventions utilisées pour le développement du site.",
    writtenOn: '2025-08-10',
    keywords: ['C#'],
    metadata: {
      searchKeywords: {
        fr: ['react', 'typescript', 'frontend', 'règles', 'conventions', 'développement', 'ui', 'composants'],
        en: ['react', 'typescript', 'frontend', 'rules', 'conventions', 'development', 'ui', 'components']
      }
    }
  }
];

// Tests de recherche
export const testSearchFunctionality = () => {
  console.log('🔍 Test de la recherche par mots-clés');
  console.log('=====================================');

  // Simule différentes recherches
  const testQueries = [
    'react',
    'async', 
    'performance',
    'api',
    'frontend',
    'asynchrone', // mot français
    'règles'      // mot français avec accent
  ];

  // Note: Dans un vrai test, vous utiliseriez le hook usePromptSearch()
  // Ici on simule la logique de recherche
  testQueries.forEach(query => {
    console.log(`\n🔎 Recherche: "${query}"`);
    
    const results = testPrompts.filter(prompt => {
      const frKeywords = prompt.metadata?.searchKeywords?.fr || [];
      const enKeywords = prompt.metadata?.searchKeywords?.en || [];
      const allKeywords = [...frKeywords, ...enKeywords];
      
      return allKeywords.some(keyword => 
        keyword.toLowerCase().includes(query.toLowerCase())
      ) || prompt.title.toLowerCase().includes(query.toLowerCase())
        || prompt.shortDescription.toLowerCase().includes(query.toLowerCase());
    });

    if (results.length > 0) {
      results.forEach(result => {
        console.log(`  ✅ ${result.title}`);
      });
    } else {
      console.log(`  ❌ Aucun résultat`);
    }
  });

  console.log('\n📊 Résumé:');
  console.log(`Total prompts: ${testPrompts.length}`);
  console.log(`Prompts avec metadata: ${testPrompts.filter(p => p.metadata).length}`);
};

// Pour exécuter le test:
// testSearchFunctionality();
