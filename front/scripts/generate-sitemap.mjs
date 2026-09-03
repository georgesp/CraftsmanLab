import fs from 'fs/promises';
import path from 'path';

const PUBLIC_DIR = path.resolve(process.cwd(), 'public');
const SRC_DIR = path.resolve(process.cwd(), 'src');
const DOMAIN = 'https://craftsmanlab.fr';

// Import the content manifest directly
async function getEntriesFromManifest() {
  const manifestPath = path.join(SRC_DIR, 'components', 'content-manifest.ts');
  const content = await fs.readFile(manifestPath, 'utf8');
  
  // Extract tips entries (slug + writtenOn)
  const tipEntries = [];
  // Match all tip meta imports: import { meta as xxxMeta } from './tips/folder/meta';
  const tipsMetaImports = content.matchAll(/import\s*\{\s*meta\s+as\s+\w+Meta\s*\}\s*from\s*'\.\/tips\/([^']+)\/meta'/g);
  for (const match of tipsMetaImports) {
    const folder = match[1];
    // Read the meta file to get the slug
    const metaPath = path.join(SRC_DIR, 'components', 'tips', folder, 'meta.ts');
    try {
      const metaContent = await fs.readFile(metaPath, 'utf8');
      const slugMatch = metaContent.match(/slug:\s*['"]([^'"]+)['"]/);
      const dateMatch = metaContent.match(/writtenOn:\s*['"]([0-9]{4}-[0-9]{2}-[0-9]{2})['"]/);
      if (slugMatch) {
        tipEntries.push({ slug: slugMatch[1], lastmod: dateMatch ? dateMatch[1] : undefined });
      }
    } catch (e) {
      console.warn(`Could not read meta for tips/${folder}:`, e.message);
    }
  }
  
  // Extract prompts entries (slug + writtenOn)
  const promptEntries = [];
  // Match all prompt meta imports
  const promptsMetaImports = content.matchAll(/import\s*\{\s*meta\s+as\s+\w+Meta\s*\}\s*from\s*'\.\/prompts\/([^']+)\/meta'/g);
  for (const match of promptsMetaImports) {
    const folder = match[1];
    // Read the meta file to get the slug
    const metaPath = path.join(SRC_DIR, 'components', 'prompts', folder, 'meta.ts');
    try {
      const metaContent = await fs.readFile(metaPath, 'utf8');
      const slugMatch = metaContent.match(/slug:\s*['"]([^'"]+)['"]/);
      const dateMatch = metaContent.match(/writtenOn:\s*['"]([0-9]{4}-[0-9]{2}-[0-9]{2})['"]/);
      if (slugMatch) {
        promptEntries.push({ slug: slugMatch[1], lastmod: dateMatch ? dateMatch[1] : undefined });
      }
    } catch (e) {
      console.warn(`Could not read meta for prompts/${folder}:`, e.message);
    }
  }
  
  return { tipEntries, promptEntries };
}

function buildUrlEntry(loc, changefreq = 'monthly', priority = '0.6', lastmod) {
  // <lastmod> indique a Google quand recrawler : sans lui, il se fie a ses
  // propres heuristiques et peut ignorer longtemps une page mise a jour.
  const ligneLastmod = lastmod ? `    <lastmod>${lastmod}</lastmod>\n` : '';
  return `  <url>
  <loc>${loc}</loc>
${ligneLastmod}    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>
`;
}

/** Date la plus recente d'un lot d'entrees, au format AAAA-MM-JJ. */
function dateLaPlusRecente(entrees) {
  const dates = entrees.map((e) => e.lastmod).filter(Boolean).sort();
  return dates.length ? dates[dates.length - 1] : undefined;
}

async function main() {
  try {
    const { tipEntries, promptEntries } = await getEntriesFromManifest();

    console.log(`Found ${promptEntries.length} prompts and ${tipEntries.length} tips`);

    // Les pages de liste datent de leur contenu le plus recent. /news est
    // alimentee par le flux RSS et /contact ne bouge pas : pas de lastmod pour
    // elles, une date inventee ferait plus de mal que de bien.
    const dernierTip = dateLaPlusRecente(tipEntries);
    const dernierPrompt = dateLaPlusRecente(promptEntries);
    const dernierContenu = dateLaPlusRecente([
      { lastmod: dernierTip },
      { lastmod: dernierPrompt },
    ]);

    const urls = [];
    urls.push({ loc: `${DOMAIN}/`, changefreq: 'weekly', priority: '1.0', lastmod: dernierContenu });
    urls.push({ loc: `${DOMAIN}/prompts`, changefreq: 'weekly', priority: '0.8', lastmod: dernierPrompt });
    urls.push({ loc: `${DOMAIN}/tips`, changefreq: 'weekly', priority: '0.8', lastmod: dernierTip });
    urls.push({ loc: `${DOMAIN}/news`, changefreq: 'daily', priority: '0.8' });
    urls.push({ loc: `${DOMAIN}/contact`, changefreq: 'monthly', priority: '0.5' });

    for (const e of promptEntries)
      urls.push({ loc: `${DOMAIN}/prompts/${e.slug}`, lastmod: e.lastmod });
    for (const e of tipEntries) urls.push({ loc: `${DOMAIN}/tips/${e.slug}`, lastmod: e.lastmod });

    const xml = ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'];
    for (const u of urls) {
      xml.push(buildUrlEntry(u.loc, u.changefreq, u.priority, u.lastmod));
    }
    xml.push('</urlset>');

    await fs.mkdir(PUBLIC_DIR, { recursive: true });
    const outPath = path.join(PUBLIC_DIR, 'sitemap.xml');
    await fs.writeFile(outPath, xml.join('\n'));
    console.log(`Sitemap written to ${outPath} (${urls.length} entries)`);
  } catch (err) {
    console.error('Failed to generate sitemap:', err);
    process.exit(1);
  }
}

if (import.meta.url.startsWith('file:')) {
  const modulePath = import.meta.url.slice(7);
  if (modulePath.endsWith('/scripts/generate-sitemap.mjs')) {
    main();
  }
}

export default main;
