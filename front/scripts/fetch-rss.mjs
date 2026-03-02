import Parser from 'rss-parser';
import fs from 'fs/promises';
import path from 'path';

const SOURCES_DIR = path.resolve(process.cwd(), 'src', 'components', 'news');

function postProcessCategories(categories) {
  const processed = [];

  for (const category of categories) {
    if (!category) continue;
    const trimmed = category.trim();
    const lower = trimmed.toLowerCase();

    if (lower === 'ai, ml & data engineering') {
      processed.push('AI', 'ML', 'Data Engineering');
      continue;
    }

    if (lower === 'architecture & design') {
      processed.push('Architecture', 'Design');
      continue;
    }

    if (lower === 'ml & data engineering') {
      processed.push('ML', 'Data Engineering');
      continue;
    }

    if (trimmed.includes(',')) {
      const parts = trimmed.split(',').map(part => part.trim()).filter(Boolean);
      processed.push(...parts);
      continue;
    }

    processed.push(trimmed);
  }

  const normalized = processed.map(cat => {
    if (cat.toLowerCase() === 'artificial intelligence') return 'AI';
    return cat;
  });

  const filtered = normalized.filter(cat => {
    const lower = cat.toLowerCase();
    return lower !== 'news' && lower !== 'article';
  });

  return Array.from(new Set(filtered));
}

// Import the registry to get all RSS sources
// Note: Since this is a build script, we use a simplified approach
const RSS_SOURCES = [
  {
    slug: 'microsoft-devblogs',
    feedUrl: 'https://devblogs.microsoft.com/dotnet/feed/',
    maxItems: 100,
  },
  {
    slug: 'developpez-dotnet',
    feedUrl: 'https://dotnet.developpez.com/index/rss',
    maxItems: 100,
  },
  {
    slug: 'jon-skeet-blog',
    feedUrl: 'https://codeblog.jonskeet.uk/feed/',
    maxItems: 100,
  },
  {
    slug: 'thomas-levesque-blog',
    feedUrl: 'https://thomaslevesque.com/index.xml',
    maxItems: 100,
  },
  {
    slug: 'dotnettips-blog',
    feedUrl: 'https://dotnettips.wordpress.com/feed/',
    maxItems: 100,
  },
  {
    slug: 'jetbrains-dotnet-blog',
    feedUrl: 'https://blog.jetbrains.com/dotnet/feed/',
    maxItems: 100,
  },
  {
    slug: 'anthony-giretti-blog',
    feedUrl: 'https://anthonygiretti.com/feed/',
    maxItems: 100,
  },
  {
    slug: 'infoq-news',
    feedUrl: 'https://feed.infoq.com',
    maxItems: 100,
  },
  // Add more RSS sources here as needed
];

/**
 * Charge le fichier data.json existant s'il existe
 */
async function loadExistingData(slug) {
  try {
    const outputFile = path.join(SOURCES_DIR, slug, 'data.json');
    const content = await fs.readFile(outputFile, 'utf-8');
    return JSON.parse(content);
  } catch {
    return null;
  }
}

/**
 * Récupère un flux RSS et retourne les items formatés
 * Préserve les catégories des articles existants
 */
async function fetchSingleRSS(slug, feedUrl, maxItems) {
  try {
    console.log(`🔄 Fetching RSS feed: ${slug}...`);
    
    // Pour InfoQ, utiliser fetch avec des headers personnalisés
    let feed;
    if (slug === 'infoq-news') {
      const response = await fetch(feedUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'application/rss+xml, application/xml, text/xml, */*',
        }
      });
      
      if (!response.ok) {
        throw new Error(`Status code ${response.status}`);
      }
      
      const xmlText = await response.text();
      const parser = new Parser();
      feed = await parser.parseString(xmlText);
    } else {
      const parser = new Parser({
        customHeaders: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'application/rss+xml, application/xml, text/xml, */*'
        }
      });
      feed = await parser.parseURL(feedUrl);
    }
    
    // Charger les données existantes
    const existingData = await loadExistingData(slug);
    const existingItemsMap = new Map();
    
    if (existingData && existingData.items) {
      // Créer une map des articles existants par guid
      existingData.items.forEach(item => {
        if (item.guid) {
          existingItemsMap.set(item.guid, item);
        }
      });
    }
    
    // Extraire uniquement les données nécessaires depuis le flux RSS
    const newItems = feed.items.slice(0, maxItems).map(item => {
      const guid = item.guid || item.link || '';
      const existingItem = existingItemsMap.get(guid);
      
      return {
        title: item.title || '',
        link: item.link || '',
        pubDate: item.pubDate || item.isoDate || '',
        contentSnippet: item.contentSnippet?.substring(0, 250) || '',
        creator: item.creator || item.author || '',
        // Préserver les catégories existantes si l'article existe déjà
        categories: postProcessCategories(existingItem?.categories || item.categories || []),
        guid: guid,
      };
    });
    
    // Fusionner avec les articles existants (sans supprimer les anciens)
    const allItems = [...newItems];
    
    if (existingData && existingData.items) {
      // Ajouter les articles existants qui ne sont pas dans les nouveaux
      const newGuids = new Set(newItems.map(item => item.guid));
      existingData.items.forEach(existingItem => {
        if (!newGuids.has(existingItem.guid)) {
          allItems.push(existingItem);
        }
      });
    }
    
    // Trier par date (plus récent en premier)
    allItems.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
    
    const items = allItems;

    return {
      source: slug,
      items,
      lastUpdated: new Date().toISOString(),
      feedTitle: feed.title || slug,
    };
  } catch (err) {
    console.error(`❌ Failed to fetch RSS feed for ${slug}:`, err.message);
    return {
      source: slug,
      items: [],
      lastUpdated: new Date().toISOString(),
      error: err.message,
    };
  }
}

/**
 * Récupère tous les flux RSS configurés
 */
async function fetchAllRSS() {
  try {
    console.log('🔄 Fetching all RSS feeds...');
    
    // Récupérer tous les feeds en parallèle
    const results = await Promise.all(
      RSS_SOURCES.map(source => 
        fetchSingleRSS(source.slug, source.feedUrl, source.maxItems)
      )
    );
    
    // Écrire chaque feed dans son propre dossier
    for (const result of results) {
      const outputDir = path.join(SOURCES_DIR, result.source);
      await fs.mkdir(outputDir, { recursive: true });
      
      const outputFile = path.join(outputDir, 'data.json');
      await fs.writeFile(outputFile, JSON.stringify(result, null, 2));
      
      if (result.error) {
        console.warn(`⚠️  ${result.source}: Created empty feed file (error: ${result.error})`);
      } else {
        console.log(`✅ ${result.source}: ${result.items.length} articles written to ${outputFile}`);
      }
    }
    
    console.log(`\n✅ All RSS feeds fetched successfully!`);
    console.log(`📁 Output directory: ${SOURCES_DIR}`);
    console.log(`📅 Last updated: ${new Date().toISOString()}`);
  } catch (err) {
    console.error('❌ Failed to fetch RSS feeds:', err.message);
    process.exit(1);
  }
}

fetchAllRSS();
