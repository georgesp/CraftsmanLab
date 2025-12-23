import Parser from 'rss-parser';
import fs from 'fs/promises';
import path from 'path';

const SOURCES_DIR = path.resolve(process.cwd(), 'src', 'components', 'news');

// Import the registry to get all RSS sources
// Note: Since this is a build script, we use a simplified approach
const RSS_SOURCES = [
  {
    slug: 'microsoft-devblogs',
    feedUrl: 'https://devblogs.microsoft.com/dotnet/feed/',
    maxItems: 20,
  },
  {
    slug: 'developpez-dotnet',
    feedUrl: 'https://dotnet.developpez.com/index/rss',
    maxItems: 15,
  },
  // Add more RSS sources here as needed
];

/**
 * Récupère un flux RSS et retourne les items formatés
 */
async function fetchSingleRSS(slug, feedUrl, maxItems) {
  try {
    console.log(`🔄 Fetching RSS feed: ${slug}...`);
    const parser = new Parser();
    const feed = await parser.parseURL(feedUrl);
    
    // Extraire uniquement les données nécessaires
    const items = feed.items.slice(0, maxItems).map(item => ({
      title: item.title || '',
      link: item.link || '',
      pubDate: item.pubDate || item.isoDate || '',
      contentSnippet: item.contentSnippet?.substring(0, 250) || '',
      creator: item.creator || item.author || '',
      categories: item.categories || [],
      guid: item.guid || item.link || '',
    }));

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
