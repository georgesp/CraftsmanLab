import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Extract categories from article title and content
function extractCategories(title, contentSnippet) {
  const text = `${title} ${contentSnippet}`.toLowerCase();
  const categories = [];

  // .NET versions
  if (text.match(/\.net\s*10/i)) categories.push('.NET 10');
  else if (text.match(/\.net\s*9/i)) categories.push('.NET 9');
  else if (text.match(/\.net\s*8/i)) categories.push('.NET 8');
  else if (text.match(/\.net\s*7/i)) categories.push('.NET 7');
  else if (text.match(/\.net\s*6/i)) categories.push('.NET 6');
  else if (text.match(/\.net\s*5/i)) categories.push('.NET 5');
  else if (text.match(/\.net\s*core/i)) categories.push('.NET Core');
  else if (text.match(/\.net\s*framework/i)) categories.push('.NET Framework');
  else if (text.match(/\.net/i)) categories.push('.NET');

  // C# versions
  if (text.match(/c#\s*14/i)) categories.push('C# 14');
  else if (text.match(/c#\s*13/i)) categories.push('C# 13');
  else if (text.match(/c#\s*12/i)) categories.push('C# 12');
  else if (text.match(/c#\s*11/i)) categories.push('C# 11');
  else if (text.match(/c#\s*10/i)) categories.push('C# 10');
  else if (text.match(/c#\s*9/i)) categories.push('C# 9');
  else if (text.match(/c#\s*8/i)) categories.push('C# 8');
  else if (text.match(/\bc#\b/i)) categories.push('C#');

  // F#
  if (text.match(/f#\s*10/i)) categories.push('F# 10');
  else if (text.match(/\bf#\b/i)) categories.push('F#');

  // Visual Studio
  if (text.match(/visual\s*studio\s*2026/i)) categories.push('Visual Studio 2026');
  else if (text.match(/visual\s*studio\s*2022/i)) categories.push('Visual Studio 2022');
  else if (text.match(/visual\s*studio/i)) categories.push('Visual Studio');

  // VS Code
  if (text.match(/vs\s*code|visual\s*studio\s*code/i)) categories.push('VS Code');

  // JetBrains tools
  if (text.match(/\brider\b/i)) categories.push('Rider');
  if (text.match(/resharper/i)) categories.push('ReSharper');
  if (text.match(/jetbrains/i)) categories.push('JetBrains');

  // AI & Agents
  if (text.match(/\bai\b|artificial\s*intelligence|machine\s*learning(?!\s*\.net)|intelligence\s*artificielle/i)) categories.push('AI');
  if (text.match(/copilot/i)) categories.push('Copilot');
  if (text.match(/\bagent[s]?\b|agentic/i)) categories.push('Agents');
  if (text.match(/gpt-5|gpt\s*5/i)) categories.push('GPT-5');
  if (text.match(/deepseek/i)) categories.push('DeepSeek');

  // Azure & Cloud
  if (text.match(/cosmos\s*db/i)) categories.push('Cosmos DB');
  else if (text.match(/azure/i)) categories.push('Azure');
  if (text.match(/cloudflare/i)) categories.push('Cloudflare');
  if (text.match(/serverless/i)) categories.push('Serverless');

  // Frameworks
  if (text.match(/asp\.net\s*core/i)) categories.push('ASP.NET Core');
  else if (text.match(/asp\.net/i)) categories.push('ASP.NET');
  if (text.match(/blazor/i)) categories.push('Blazor');
  if (text.match(/entity\s*framework\s*core/i)) categories.push('Entity Framework Core');
  else if (text.match(/entity\s*framework/i)) categories.push('Entity Framework');
  if (text.match(/\.net\s*maui/i)) categories.push('.NET MAUI');
  if (text.match(/ml\.net/i)) categories.push('ML.NET');

  // Web technologies
  if (text.match(/\bapi[s]?\b/i)) categories.push('API');
  if (text.match(/\bhttp\b/i)) categories.push('HTTP');
  if (text.match(/\bjson\b/i)) categories.push('JSON');
  if (text.match(/\brest\b/i)) categories.push('REST');
  if (text.match(/oauth\s*2\.0|oauth2/i)) categories.push('OAuth 2.0');
  else if (text.match(/oauth/i)) categories.push('OAuth');

  // Database
  if (text.match(/database[s]?|base[s]?\s*de\s*donn[ée]es/i)) categories.push('Database');
  if (text.match(/\bsql\b/i)) categories.push('SQL');

  // Performance
  if (text.match(/performance[s]?/i)) categories.push('Performance');
  if (text.match(/\bjit\b/i)) categories.push('JIT');
  if (text.match(/nativeaot|native\s*aot/i)) categories.push('NativeAOT');

  // DevOps & GitHub
  if (text.match(/github\s*actions/i)) categories.push('GitHub Actions');
  else if (text.match(/github/i)) categories.push('GitHub');
  if (text.match(/ci\/cd|continuous\s*integration|continuous\s*deployment/i)) categories.push('CI/CD');
  if (text.match(/devops/i)) categories.push('DevOps');
  if (text.match(/\bgit\b(?!\s*hub)/i)) categories.push('Git');

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
  if (text.match(/solid/i) && text.match(/principle/i)) categories.push('SOLID');

  // Other languages & technologies
  if (text.match(/typescript/i)) categories.push('TypeScript');
  if (text.match(/javascript/i)) categories.push('JavaScript');
  if (text.match(/\bpython\b/i)) categories.push('Python');
  if (text.match(/\bjava\b/i)) categories.push('Java');

  // Configuration & Templates
  if (text.match(/configuration/i)) categories.push('Configuration');
  if (text.match(/template[s]?/i)) categories.push('Templates');

  // Records (C# feature)
  if (text.match(/\brecord[s]?\b/i) && text.match(/c#/i)) categories.push('Records');

  // Preview/Beta
  if (text.match(/preview|beta|aperçu/i)) categories.push('Preview');

  // UX/UI
  if (text.match(/\bu[ix]\b|user\s*experience|user\s*interface|expérience\s*utilisateur/i)) categories.push('UX');
  
  // IDE (catch-all for IDE-related content)
  if (text.match(/\bide\b|integrated\s*development\s*environment|environnement\s*de\s*développement/i)) categories.push('IDE');

  // Build
  if (text.match(/\bbuild/i)) categories.push('Build');

  // Hugo (blog platform)
  if (text.match(/\bhugo\b/i)) categories.push('Hugo');

  return Array.from(new Set(categories)); // Remove duplicates
}

// Process a single news source file
async function processNewsFile(sourcePath) {
  try {
    const data = JSON.parse(await fs.readFile(sourcePath, 'utf-8'));
    let modified = false;

    for (const item of data.items) {
      // Only process items with empty or missing categories
      if (!item.categories || item.categories.length === 0) {
        const categories = extractCategories(item.title, item.contentSnippet || '');
        if (categories.length > 0) {
          item.categories = categories;
          modified = true;
          console.log(`  - ${item.title.substring(0, 60)}... → [${categories.map(c => `"${c}"`).join(',')}]`);
        }
      }
    }

    if (modified) {
      await fs.writeFile(sourcePath, JSON.stringify(data, null, 2) + '\n', 'utf-8');
    }

    return data.items.length;
  } catch (error) {
    console.error(`❌ Error processing ${sourcePath}:`, error.message);
    return 0;
  }
}

// Main function
async function main() {
  console.log('📝 Generating categories...\n');

  const newsDir = path.join(__dirname, '..', 'src', 'components', 'news');
  const sources = [
    'developpez-dotnet',
    'thomas-levesque-blog',
    'microsoft-devblogs',
    'jon-skeet-blog',
    'dotnettips-blog',
    'jetbrains-dotnet-blog',
    'anthony-giretti-blog'
  ];

  for (const source of sources) {
    const sourcePath = path.join(newsDir, source, 'data.json');
    console.log(`\n📦 Processing ${source}...`);
    const count = await processNewsFile(sourcePath);
    console.log(`✅ ${count} articles processed`);
  }

  console.log('\n✨ Done!');
}

main().catch(console.error);
