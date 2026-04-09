import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ---------------------------------------------------------------------------
// Catégories trop génériques à ignorer
// ---------------------------------------------------------------------------
const GENERIC_CATEGORIES = new Set([
  'news', 'article', 'articles',
  'blog', 'blogs', 'blogpost', 'blog post',
  'post', 'posts',
  'host', 'hosting',
  'general', 'générale', 'général',
  'other', 'autre', 'others',
  'misc', 'miscellaneous', 'divers',
  'featured', 'à la une',
  'uncategorized', 'uncategorised',
  'sans catégorie', 'non classé', 'non classée',
  'update', 'updates',
  'tip', 'tips',
]);

// ---------------------------------------------------------------------------
// PascalCase : si pas d'acronyme ni de majuscule, capitaliser chaque mot
// ---------------------------------------------------------------------------
function toPascalCaseIfLower(str) {
  // Déjà des majuscules → considérer comme correctement écrit
  if (/[A-Z]/.test(str)) return str;
  return str.split(' ').map(word => {
    if (!word) return word;
    // Cas particulier : .net isolé → .NET
    if (/^\.net$/i.test(word)) return '.NET';
    return word.charAt(0).toUpperCase() + word.slice(1);
  }).join(' ');
}

// ---------------------------------------------------------------------------
// Synonymes : forme normalisée pour les variantes connues
// ---------------------------------------------------------------------------
const SYNONYM_MAP = new Map([
  ['artificial intelligence', 'AI'],
  ['intelligence artificielle', 'AI'],
  ['machine learning', 'ML'],
  ['apprentissage automatique', 'ML'],
  ['csharp', 'C#'],
  ['c sharp', 'C#'],
  ['fsharp', 'F#'],
  ['f sharp', 'F#'],
  ['visual studio code', 'VS Code'],
  ['vscode', 'VS Code'],
  ['entity framework core', 'Entity Framework Core'],
  ['entity framework', 'Entity Framework'],
  ['asp.net core', 'ASP.NET Core'],
  ['aspnet core', 'ASP.NET Core'],
  ['asp.net', 'ASP.NET'],
  ['aspnet', 'ASP.NET'],
  ['github actions', 'GitHub Actions'],
  ['azure devops', 'Azure DevOps'],
  ['sql server', 'SQL Server'],
  ['cosmos db', 'Cosmos DB'],
  ['dot net', '.NET'],
  ['dotnet', '.NET'],
  ['net maui', '.NET MAUI'],
  ['ml.net', 'ML.NET'],
  ['unit testing', 'Unit Testing'],
  ['unit test', 'Unit Testing'],
  ['integration testing', 'Integration Testing'],
  ['integration test', 'Integration Testing'],
  ['dependency injection', 'Dependency Injection'],
  ['design patterns', 'Design Patterns'],
  ['design pattern', 'Design Patterns'],
  ['best practices', 'Best Practices'],
  ['best practice', 'Best Practices'],
  ['nativeaot', 'NativeAOT'],
  ['native aot', 'NativeAOT'],
  ['ci/cd', 'CI/CD'],
  ['continuous integration', 'CI/CD'],
  ['performance', 'Performance'],
  ['optimization', 'Performance'],
  ['optimisation', 'Performance'],
  ['async/await', 'Async/Await'],
  ['asynchronous', 'Async/Await'],
]);

// ---------------------------------------------------------------------------
// Normalisation
// ---------------------------------------------------------------------------

/**
 * Sépare une catégorie trop longue (> 30 chars) sur les délimiteurs courants.
 */
function splitLongCategory(cat) {
  if (cat.length <= 30) return [cat];
  const parts = cat.split(/\s*&\s*|\s+and\s+|\s+et\s+/i).map(p => p.trim()).filter(Boolean);
  return parts.length > 1 ? parts : [cat];
}

/**
 * Construit un registre canonique (clé minuscule → forme canonique) à partir
 * de toutes les catégories déjà présentes dans les fichiers data.json.
 * La première forme rencontrée fait foi.
 */
function buildCanonicalRegistry(existingCategories) {
  const registry = new Map();
  for (const cat of existingCategories) {
    if (!cat) continue;
    const key = cat.toLowerCase().trim();
    if (!registry.has(key)) {
      registry.set(key, cat);
    }
  }
  return registry;
}

/**
 * Normalise une catégorie : synonyme connu → registre existant → PascalCase.
 */
function normalizeCategory(cat, registry) {
  const lower = cat.toLowerCase().trim();
  if (SYNONYM_MAP.has(lower)) return SYNONYM_MAP.get(lower);
  if (registry.has(lower)) return registry.get(lower);
  return toPascalCaseIfLower(cat);
}

/**
 * Normalise un tableau de catégories : split des trop longues puis normalisation.
 */
function normalizeCategories(categories, registry) {
  const result = [];
  for (const cat of categories) {
    const parts = splitLongCategory(cat);
    for (const part of parts) {
      result.push(normalizeCategory(part, registry));
    }
  }
  return Array.from(new Set(result));
}

// ---------------------------------------------------------------------------
// Post-traitement basique (nettoyage virgules, filtrage générique, PascalCase, doublons)
// ---------------------------------------------------------------------------
function postProcessCategories(categories) {
  const processed = [];

  for (const category of categories) {
    if (!category) continue;
    const trimmed = category.trim();

    if (trimmed.includes(',')) {
      trimmed.split(',').map(p => p.trim()).filter(Boolean).forEach(p => processed.push(p));
    } else {
      processed.push(trimmed);
    }
  }

  return Array.from(
    new Set(
      processed
        .filter(cat => !GENERIC_CATEGORIES.has(cat.toLowerCase().trim()))
        .map(cat => toPascalCaseIfLower(cat))
    )
  );
}

// ---------------------------------------------------------------------------
// Extraction de catégories par regex (titre + contenu)
// ---------------------------------------------------------------------------
function extractCategories(title, contentSnippet) {
  const text = `${title} ${contentSnippet}`.toLowerCase();
  const categories = [];

  // .NET versions
  if (text.match(/\.net\s*10/i)) categories.push('.NET 10');
  else if (text.match(/\.net\s*9/i)) categories.push('.NET 9');
  else if (text.match(/\.net\s*8/i)) categories.push('.NET 8');
  else if (text.match(/\.net\s*7/i)) categories.push('.NET 7');
  else if (text.match(/\.net\s*6/i)) categories.push('.NET 6');
  else if (text.match(/\.net\s*core/i)) categories.push('.NET Core');
  else if (text.match(/\.net\s*framework/i)) categories.push('.NET Framework');
  else if (text.match(/ml\.net/i)) categories.push('ML.NET');
  else if (text.match(/\.net\s*maui/i)) categories.push('.NET MAUI');
  else if (text.match(/\b\.net\b/i)) categories.push('.NET');

  // C# versions
  if (text.match(/c#\s*14/i)) categories.push('C# 14');
  else if (text.match(/c#\s*13/i)) categories.push('C# 13');
  else if (text.match(/c#\s*12/i)) categories.push('C# 12');
  else if (text.match(/c#\s*11/i)) categories.push('C# 11');
  else if (text.match(/c#\s*10/i)) categories.push('C# 10');
  else if (text.match(/\bc#\b|csharp|c-sharp/i)) categories.push('C#');

  // F#
  if (text.match(/\bf#\b|fsharp|f-sharp/i)) categories.push('F#');

  // Visual Studio / VS Code
  if (text.match(/vs\s*code|visual\s*studio\s*code/i)) categories.push('VS Code');
  else if (text.match(/visual\s*studio\s*2026/i)) categories.push('Visual Studio 2026');
  else if (text.match(/visual\s*studio\s*2022/i)) categories.push('Visual Studio 2022');
  else if (text.match(/visual\s*studio/i)) categories.push('Visual Studio');

  // JetBrains
  if (text.match(/\brider\b/i)) categories.push('Rider');
  if (text.match(/resharper/i)) categories.push('ReSharper');
  if (text.match(/jetbrains/i)) categories.push('JetBrains');

  // AI & Agents
  if (text.match(/\bai\b|artificial\s*intelligence|machine\s*learning(?!\s*\.net)|intelligence\s*artificielle/i)) categories.push('AI');
  if (text.match(/copilot/i)) categories.push('Copilot');
  if (text.match(/\bagent[s]?\b|agentic/i)) categories.push('Agents');
  if (text.match(/deepseek/i)) categories.push('DeepSeek');

  // Azure & Cloud
  if (text.match(/cosmos\s*db/i)) categories.push('Cosmos DB');
  else if (text.match(/azure\s*functions/i)) categories.push('Azure Functions');
  else if (text.match(/azure\s*devops/i)) categories.push('Azure DevOps');
  else if (text.match(/azure/i)) categories.push('Azure');
  if (text.match(/\baws\b/i)) categories.push('AWS');
  if (text.match(/cloudflare/i)) categories.push('Cloudflare');
  if (text.match(/serverless/i)) categories.push('Serverless');
  if (text.match(/\bdocker\b/i)) categories.push('Docker');
  if (text.match(/kubernetes/i)) categories.push('Kubernetes');

  // Frameworks web
  if (text.match(/asp\.net\s*core|aspnet\s*core/i)) categories.push('ASP.NET Core');
  else if (text.match(/asp\.net/i)) categories.push('ASP.NET');
  if (text.match(/blazor/i)) categories.push('Blazor');
  if (text.match(/signalr/i)) categories.push('SignalR');
  if (text.match(/\bwpf\b/i)) categories.push('WPF');

  // Entity Framework
  if (text.match(/entity\s*framework\s*core/i)) categories.push('Entity Framework Core');
  else if (text.match(/entity\s*framework/i)) categories.push('Entity Framework');

  // Autres langages
  if (text.match(/typescript/i)) categories.push('TypeScript');
  if (text.match(/javascript/i)) categories.push('JavaScript');
  if (text.match(/\bpython\b/i)) categories.push('Python');

  // Base de données
  if (text.match(/sql\s*server/i)) categories.push('SQL Server');
  else if (text.match(/postgresql|postgres/i)) categories.push('PostgreSQL');
  else if (text.match(/mongodb/i)) categories.push('MongoDB');
  else if (text.match(/\bsql\b/i)) categories.push('SQL');
  if (text.match(/database[s]?|base[s]?\s*de\s*donn[ée]es/i)) categories.push('Database');

  // Performance
  if (text.match(/performance[s]?|optimization|optimisation/i)) categories.push('Performance');
  if (text.match(/\bjit\b/i)) categories.push('JIT');
  if (text.match(/nativeaot|native\s*aot/i)) categories.push('NativeAOT');

  // DevOps & CI
  if (text.match(/github\s*actions/i)) categories.push('GitHub Actions');
  else if (text.match(/github/i)) categories.push('GitHub');
  if (text.match(/ci\/cd|continuous\s*integration|continuous\s*deployment/i)) categories.push('CI/CD');
  if (text.match(/devops/i)) categories.push('DevOps');
  if (text.match(/\bgit\b(?!\s*hub)/i)) categories.push('Git');
  if (text.match(/nuget/i)) categories.push('NuGet');

  // Testing
  if (text.match(/unit\s*test/i)) categories.push('Unit Testing');
  else if (text.match(/integration\s*test/i)) categories.push('Integration Testing');
  else if (text.match(/\btest/i)) categories.push('Testing');
  if (text.match(/xunit/i)) categories.push('xUnit');
  if (text.match(/nunit/i)) categories.push('NUnit');

  // Architecture & Patterns
  if (text.match(/microservices/i)) categories.push('Microservices');
  if (text.match(/design\s*pattern[s]?/i)) categories.push('Design Patterns');
  if (text.match(/best\s*practice[s]?/i)) categories.push('Best Practices');
  if (text.match(/dependency\s*injection/i)) categories.push('Dependency Injection');
  if (text.match(/async|asynchronous|await/i)) categories.push('Async/Await');
  if (text.match(/middleware/i)) categories.push('Middleware');
  if (text.match(/\blinq\b/i)) categories.push('LINQ');

  // Web / API
  if (text.match(/\bapi[s]?\b/i)) categories.push('API');
  if (text.match(/\brest\s*api|restful/i)) categories.push('REST API');
  if (text.match(/\bgrpc\b/i)) categories.push('gRPC');
  if (text.match(/\bhttp\b/i)) categories.push('HTTP');
  if (text.match(/oauth\s*2\.0|oauth2/i)) categories.push('OAuth 2.0');
  else if (text.match(/oauth/i)) categories.push('OAuth');
  if (text.match(/security|sécurité|authentication|authorization/i)) categories.push('Security');

  // Preview
  if (text.match(/preview|beta|aperçu/i)) categories.push('Preview');

  // Fallback
  if (categories.length === 0) categories.push('Programming');

  return postProcessCategories(categories);
}

// ---------------------------------------------------------------------------
// Collecte des catégories existantes dans tous les data.json
// ---------------------------------------------------------------------------
async function collectAllExistingCategories(sources, newsDir) {
  const all = new Set();
  for (const source of sources) {
    try {
      const data = JSON.parse(
        await fs.readFile(path.join(newsDir, source, 'data.json'), 'utf-8')
      );
      if (data.items) {
        for (const item of data.items) {
          if (item.categories) {
            item.categories.forEach(c => c && all.add(c));
          }
        }
      }
    } catch {
      // source introuvable ou invalide, on ignore
    }
  }
  return all;
}

// ---------------------------------------------------------------------------
// Traitement d'un fichier source
// ---------------------------------------------------------------------------
async function processNewsFile(sourcePath, registry) {
  try {
    const data = JSON.parse(await fs.readFile(sourcePath, 'utf-8'));
    let modified = false;

    for (const item of data.items) {
      if (!item.categories || item.categories.length === 0) {
        const raw = extractCategories(item.title, item.contentSnippet || '');
        const normalized = normalizeCategories(raw, registry);
        if (normalized.length > 0) {
          item.categories = normalized;
          modified = true;
          console.log(
            `  + ${item.title.substring(0, 60)}… → [${normalized.map(c => `"${c}"`).join(', ')}]`
          );
        }
      }
    }

    if (modified) {
      await fs.writeFile(sourcePath, JSON.stringify(data, null, 2) + '\n', 'utf-8');
    }

    return { total: data.items.length, updated: modified ? 1 : 0 };
  } catch (error) {
    console.error(`❌ Erreur sur ${sourcePath}:`, error.message);
    return { total: 0, updated: 0 };
  }
}

// ---------------------------------------------------------------------------
// Point d'entrée
// ---------------------------------------------------------------------------
async function main() {
  console.log('📝 Génération des catégories manquantes…\n');

  const newsDir = path.join(__dirname, '..', 'src', 'components', 'news');
  const entries = await fs.readdir(newsDir, { withFileTypes: true });
  const sources = entries.filter(e => e.isDirectory()).map(e => e.name);

  // Étape 1 : collecter toutes les catégories existantes pour construire le registre
  console.log('🔍 Collecte des catégories existantes…');
  const existingCategories = await collectAllExistingCategories(sources, newsDir);
  const registry = buildCanonicalRegistry(existingCategories);
  console.log(`   ${existingCategories.size} catégories distinctes trouvées dans le corpus\n`);

  // Étape 2 : traiter chaque source
  let totalUpdated = 0;
  for (const source of sources) {
    console.log(`📦 ${source}`);
    const sourcePath = path.join(newsDir, source, 'data.json');
    const { total, updated } = await processNewsFile(sourcePath, registry);
    if (updated === 0) console.log(`   ✓ Tous les ${total} articles ont déjà des catégories`);
  }

  console.log(`\n✅ Terminé ! ${totalUpdated} articles mis à jour.`);
}

main().catch(console.error);
