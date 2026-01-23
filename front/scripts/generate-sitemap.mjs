import fs from 'fs/promises';
import path from 'path';

const PUBLIC_DIR = path.resolve(process.cwd(), 'public');
const SRC_DIR = path.resolve(process.cwd(), 'src');
const DOMAIN = 'https://craftsmanlab.fr';

// Import the content manifest directly
async function getEntriesFromManifest() {
  const manifestPath = path.join(SRC_DIR, 'components', 'content-manifest.ts');
  const content = await fs.readFile(manifestPath, 'utf8');
  
  // Extract tips slugs
  const tipSlugs = [];
  // Match all tip meta imports: import { meta as xxxMeta } from './tips/folder/meta';
  const tipsMetaImports = content.matchAll(/import\s*\{\s*meta\s+as\s+\w+Meta\s*\}\s*from\s*'\.\/tips\/([^']+)\/meta'/g);
  for (const match of tipsMetaImports) {
    const folder = match[1];
    // Read the meta file to get the slug
    const metaPath = path.join(SRC_DIR, 'components', 'tips', folder, 'meta.ts');
    try {
      const metaContent = await fs.readFile(metaPath, 'utf8');
      const slugMatch = metaContent.match(/slug:\s*['"]([^'"]+)['"]/);
      if (slugMatch) {
        tipSlugs.push(slugMatch[1]);
      }
    } catch (e) {
      console.warn(`Could not read meta for tips/${folder}:`, e.message);
    }
  }
  
  // Extract prompts slugs
  const promptSlugs = [];
  // Match all prompt meta imports
  const promptsMetaImports = content.matchAll(/import\s*\{\s*meta\s+as\s+\w+Meta\s*\}\s*from\s*'\.\/prompts\/([^']+)\/meta'/g);
  for (const match of promptsMetaImports) {
    const folder = match[1];
    // Read the meta file to get the slug
    const metaPath = path.join(SRC_DIR, 'components', 'prompts', folder, 'meta.ts');
    try {
      const metaContent = await fs.readFile(metaPath, 'utf8');
      const slugMatch = metaContent.match(/slug:\s*['"]([^'"]+)['"]/);
      if (slugMatch) {
        promptSlugs.push(slugMatch[1]);
      }
    } catch (e) {
      console.warn(`Could not read meta for prompts/${folder}:`, e.message);
    }
  }
  
  return { tipSlugs, promptSlugs };
}

function buildUrlEntry(loc, changefreq = 'monthly', priority = '0.6') {
  return `  <url>
  <loc>${loc}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>
`;
}

async function main() {
  try {
    const { tipSlugs, promptSlugs } = await getEntriesFromManifest();

    console.log(`Found ${promptSlugs.length} prompts and ${tipSlugs.length} tips`);

    const urls = [];
    urls.push({ loc: `${DOMAIN}/`, changefreq: 'weekly', priority: '1.0' });
    urls.push({ loc: `${DOMAIN}/prompts`, changefreq: 'weekly', priority: '0.8' });
    urls.push({ loc: `${DOMAIN}/tips`, changefreq: 'weekly', priority: '0.8' });
    urls.push({ loc: `${DOMAIN}/news`, changefreq: 'daily', priority: '0.8' });
    urls.push({ loc: `${DOMAIN}/contact`, changefreq: 'monthly', priority: '0.5' });

    for (const s of promptSlugs) urls.push({ loc: `${DOMAIN}/prompts/${s}` });
    for (const s of tipSlugs) urls.push({ loc: `${DOMAIN}/tips/${s}` });

    const xml = ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'];
    for (const u of urls) {
      xml.push(buildUrlEntry(u.loc, u.changefreq, u.priority));
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
