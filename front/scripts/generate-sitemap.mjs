import fs from 'fs/promises';
import path from 'path';

const PUBLIC_DIR = path.resolve(process.cwd(), 'public');
const SRC_DIR = path.resolve(process.cwd(), 'src');
const DOMAIN = 'https://craftsmanlab.fr';

async function collectSlugs(dir, pattern = /slug:\s*'([a-z0-9-]+)'/ig) {
  const files = await fs.readdir(dir, { withFileTypes: true });
  const slugs = [];
  for (const f of files) {
    const full = path.join(dir, f.name);
    if (f.isDirectory()) {
      slugs.push(...await collectSlugs(full, pattern));
    } else if (f.isFile() && f.name.endsWith('.tsx')) {
      const content = await fs.readFile(full, 'utf8');
      let m;
      while ((m = pattern.exec(content)) !== null) {
        slugs.push(m[1]);
      }
    }
  }
  return slugs;
}

function uniq(arr) {
  return Array.from(new Set(arr));
}

function buildUrlEntry(loc, changefreq = 'monthly', priority = '0.6') {
  return `  <url>\n    <loc>${loc}</loc>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>\n`;
}

async function main() {
  try {
    const promptsDir = path.join(SRC_DIR, 'components', 'prompts');
    const tipsDir = path.join(SRC_DIR, 'components', 'tips');

    const promptSlugs = await collectSlugs(promptsDir);
    const tipSlugs = await collectSlugs(tipsDir);

    const allPromptSlugs = uniq(promptSlugs);
    const allTipSlugs = uniq(tipSlugs);

    const urls = [];
    urls.push({ loc: `${DOMAIN}/`, changefreq: 'weekly', priority: '1.0' });
    urls.push({ loc: `${DOMAIN}/prompts`, changefreq: 'weekly', priority: '0.8' });
    urls.push({ loc: `${DOMAIN}/tips`, changefreq: 'weekly', priority: '0.8' });
    urls.push({ loc: `${DOMAIN}/contact`, changefreq: 'monthly', priority: '0.5' });

    for (const s of allPromptSlugs) urls.push({ loc: `${DOMAIN}/prompts/${s}` });
    for (const s of allTipSlugs) urls.push({ loc: `${DOMAIN}/tips/${s}` });

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

if (import.meta.url === `file://${process.cwd()}/scripts/generate-sitemap.mjs`) {
  main();
}

export default main;
