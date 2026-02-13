import fs from 'fs/promises';
import path from 'path';

const SOURCES_DIR = path.resolve(process.cwd(), 'src', 'components', 'news');

/**
 * Post-traite les catégories pour nettoyer et séparer
 */
function postProcessCategories(categories) {
  const processed = [];
  
  for (const category of categories) {
    // Séparer les catégories contenant des virgules
    if (category.includes(',')) {
      const parts = category.split(',').map(part => part.trim()).filter(part => part);
      processed.push(...parts);
    } else {
      processed.push(category);
    }
  }
  
  // Remplacer "Artificial Intelligence" par "AI"
  const normalized = processed.map(cat => {
    if (cat.toLowerCase() === 'artificial intelligence') {
      return 'AI';
    }
    return cat;
  });
  
  // Filtrer les mots qui n'apportent rien (news, article)
  const filtered = normalized.filter(cat => {
    const lowerCat = cat.toLowerCase();
    return lowerCat !== 'news' && lowerCat !== 'article';
  });
  
  // Supprimer les doublons
  return Array.from(new Set(filtered));
}

/**
 * Génère des catégories intelligentes basées sur le titre et le contenu
 */
function generateCategories(title, contentSnippet) {
  const text = `${title} ${contentSnippet || ''}`.toLowerCase();
  const categories = [];
  
  // Langages
  if (text.match(/\bc#\s*\d+/i)) {
    const match = text.match(/c#\s*(\d+)/i);
    if (match) categories.push(`C# ${match[1]}`);
  } else if (text.match(/\bc#\b|csharp|c-sharp/i)) {
    categories.push('C#');
  }
  
  if (text.match(/\bf#\b|fsharp|f-sharp/i)) categories.push('F#');
  if (text.match(/\btypescript\b/i)) categories.push('TypeScript');
  if (text.match(/\bjavascript\b/i)) categories.push('JavaScript');
  if (text.match(/\bpython\b/i)) categories.push('Python');
  
  // .NET versions
  if (text.match(/\.net\s*core\s*\d/i)) {
    const match = text.match(/\.net\s*core\s*(\d)/i);
    if (match) categories.push(`.NET Core ${match[1]}`);
  } else if (text.match(/\.net\s*\d+/i)) {
    const match = text.match(/\.net\s*(\d+)/i);
    if (match) categories.push(`.NET ${match[1]}`);
  } else if (text.match(/\.net\s*core\b/i)) {
    categories.push('.NET Core');
  } else if (text.match(/\.net\s*framework/i)) {
    categories.push('.NET Framework');
  } else if (text.match(/\b\.net\b/i)) {
    categories.push('.NET');
  }
  
  // Frameworks et bibliothèques
  if (text.match(/\baspnet|asp\.net\s*core/i)) categories.push('ASP.NET Core');
  else if (text.match(/\basp\.net\b/i)) categories.push('ASP.NET');
  
  if (text.match(/\bblazor\b/i)) categories.push('Blazor');
  if (text.match(/\bsignalr\b/i)) categories.push('SignalR');
  if (text.match(/\bwpf\b/i)) categories.push('WPF');
  if (text.match(/\bxamarin\b/i)) categories.push('Xamarin');
  if (text.match(/\bmaui\b/i)) categories.push('.NET MAUI');
  
  if (text.match(/\bentity\s*framework\s*core/i)) categories.push('Entity Framework Core');
  else if (text.match(/\bentity\s*framework/i)) categories.push('Entity Framework');
  
  if (text.match(/\blinq\b/i)) categories.push('LINQ');
  if (text.match(/\bnewtonsoft\.json|json\.net/i)) categories.push('JSON.NET');
  
  // Bases de données
  if (text.match(/\bcosmos\s*db/i)) categories.push('Cosmos DB');
  if (text.match(/\bsql\s*server/i)) categories.push('SQL Server');
  if (text.match(/\bpostgresql|postgres/i)) categories.push('PostgreSQL');
  if (text.match(/\bmongodb/i)) categories.push('MongoDB');
  if (text.match(/\bdatabase\b/i) && categories.length === 0) categories.push('Database');
  
  // Cloud et Azure
  if (text.match(/\bazure\s*functions/i)) categories.push('Azure Functions');
  else if (text.match(/\bazure\s*service\s*bus/i)) categories.push('Azure Service Bus');
  else if (text.match(/\bazure\s*devops/i)) categories.push('Azure DevOps');
  else if (text.match(/\bazure\s*ad\b/i)) categories.push('Azure AD');
  else if (text.match(/\bazure\b/i)) categories.push('Azure');
  
  if (text.match(/\baws\b/i)) categories.push('AWS');
  if (text.match(/\bcloudflare/i)) categories.push('Cloudflare');
  if (text.match(/\bserverless/i)) categories.push('Serverless');
  
  // Outils
  if (text.match(/\bvisual\s*studio\s*code|vs\s*code/i)) categories.push('VS Code');
  else if (text.match(/\bvisual\s*studio\s*\d+/i)) {
    const match = text.match(/visual\s*studio\s*(\d+)/i);
    categories.push(`Visual Studio ${match[1]}`);
  } else if (text.match(/\bvisual\s*studio\b/i)) {
    categories.push('Visual Studio');
  }
  
  if (text.match(/\brider\b/i)) categories.push('Rider');
  if (text.match(/\bresharper/i)) categories.push('ReSharper');
  if (text.match(/\blinqpad/i)) categories.push('LINQPad');
  
  // Git et GitHub
  if (text.match(/\bgithub\s*actions/i)) categories.push('GitHub Actions');
  else if (text.match(/\bgithub\b/i)) categories.push('GitHub');
  
  if (text.match(/\bgit\b/i) && !text.match(/\bgithub/i)) categories.push('Git');
  
  // CI/CD et DevOps
  if (text.match(/\bappveyor/i)) categories.push('AppVeyor');
  if (text.match(/\bci\/cd|continuous\s*integration|continuous\s*deployment/i)) categories.push('CI/CD');
  if (text.match(/\bdevops/i)) categories.push('DevOps');
  if (text.match(/\bdocker\b/i)) categories.push('Docker');
  if (text.match(/\bkubernetes/i)) categories.push('Kubernetes');
  
  // Concepts et patterns
  if (text.match(/\basync|asynchronous|await/i)) categories.push('Async/Await');
  if (text.match(/\bmultithread|concurrent/i)) categories.push('Multithreading');
  if (text.match(/\bperformance|optimization/i)) categories.push('Performance');
  if (text.match(/\bsecurity|sécurité|authentication|authorization/i)) categories.push('Security');
  if (text.match(/\btesting|unit\s*test|integration\s*test/i)) categories.push('Testing');
  if (text.match(/\bmocking|fakeiteasy|moq|nsubstitute/i)) categories.push('Mocking');
  
  // Formats et protocoles
  if (text.match(/\bjson\b/i)) categories.push('JSON');
  if (text.match(/\bxml\b/i)) categories.push('XML');
  if (text.match(/\bhttp\b|httpclient/i)) categories.push('HTTP');
  if (text.match(/\bwebsocket|websockets/i)) categories.push('WebSockets');
  if (text.match(/\bgrpc\b/i)) categories.push('gRPC');
  if (text.match(/\brest\s*api|restful/i)) categories.push('REST API');
  
  // Build et tooling
  if (text.match(/\bmsbuild\b/i)) categories.push('MSBuild');
  if (text.match(/\bnuget\b/i)) categories.push('NuGet');
  if (text.match(/\bt4\s*template/i)) categories.push('T4 Templates');
  if (text.match(/\bcake\s*build|cakebuild/i)) categories.push('Cake Build');
  
  // Autres frameworks/outils
  if (text.match(/\braspberry\s*pi/i)) categories.push('Raspberry Pi');
  if (text.match(/\bsprache\b/i)) categories.push('Sprache');
  if (text.match(/\btuples?\b/i)) categories.push('Tuples');
  if (text.match(/\brecords?\b/i)) categories.push('Records');
  if (text.match(/\bmiddleware\b/i)) categories.push('Middleware');
  if (text.match(/\bwebhook/i)) categories.push('Webhooks');
  
  // Configuration
  if (text.match(/\bconfiguration\b/i)) categories.push('Configuration');
  if (text.match(/\bdependency\s*injection|di\b/i)) categories.push('Dependency Injection');
  
  // Si aucune catégorie n'a été trouvée, ajouter une catégorie générique
  if (categories.length === 0) {
    if (text.match(/\bapi\b/i)) categories.push('API');
    else categories.push('Programming');
  }
  
  // Post-traiter les catégories pour séparer par virgule et filtrer
  const processed = postProcessCategories(categories);
  
  // Limiter à 5 catégories max
  return processed.slice(0, 5);
}

/**
 * Traite un fichier data.json pour ajouter des catégories manquantes
 */
async function processDataFile(slug) {
  try {
    const dataFile = path.join(SOURCES_DIR, slug, 'data.json');
    const content = await fs.readFile(dataFile, 'utf-8');
    const data = JSON.parse(content);
    
    let updatedCount = 0;
    
    // Parcourir tous les articles et ajouter des catégories si vides
    if (data.items) {
      data.items.forEach(item => {
        if (!item.categories || item.categories.length === 0) {
          item.categories = generateCategories(item.title, item.contentSnippet);
          updatedCount++;
        }
      });
    }
    
    if (updatedCount > 0) {
      // Sauvegarder le fichier modifié
      await fs.writeFile(dataFile, JSON.stringify(data, null, 2));
      console.log(`✅ ${slug}: ${updatedCount} articles mis à jour avec des catégories`);
    } else {
      console.log(`✓ ${slug}: Tous les articles ont déjà des catégories`);
    }
    
    return updatedCount;
  } catch (err) {
    console.error(`❌ Erreur lors du traitement de ${slug}:`, err.message);
    return 0;
  }
}

/**
 * Liste tous les dossiers de sources
 */
async function getAllSources() {
  const entries = await fs.readdir(SOURCES_DIR, { withFileTypes: true });
  return entries
    .filter(entry => entry.isDirectory())
    .map(entry => entry.name);
}

/**
 * Fonction principale
 */
async function main() {
  console.log('🔄 Ajout de catégories manquantes...\n');
  
  const sources = await getAllSources();
  let totalUpdated = 0;
  
  for (const source of sources) {
    const count = await processDataFile(source);
    totalUpdated += count;
  }
  
  console.log(`\n✅ Terminé ! ${totalUpdated} articles au total ont été mis à jour avec des catégories.`);
}

main();
