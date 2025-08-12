// Version client-only du moteur de recherche (navigateur uniquement)
// Utilise import.meta.glob pour indexer le contenu des Tips et Prompts

export type SearchKind = 'tip' | 'prompt';

export type SearchHit = {
  kind: SearchKind;
  slug: string;
  title: string;
  shortDescription: string;
};

type RawModuleMap = Record<string, unknown>;

// Métadonnées fiables via les registres existants
import { tipsList } from '../components/tips/registry';
import { promptsList } from '../components/prompts/registry';

const tipSources = import.meta.glob([
  '../components/tips/**/*.tsx?raw',
  '!../components/tips/registry.ts',
  '!../components/tips/index.ts',
  '!../components/tips/styles.ts',
  '!../components/tips/tip-cards-grid.tsx',
  '!../components/tips/tip-cards-grid-lazy.tsx',
  '!../components/tips/tip-list.tsx',
  '!../components/tips/collection/**/*.tsx',
  '!../components/tips/keyValueCollection/**/*.tsx',
], { eager: true }) as unknown as RawModuleMap;

const promptSources = import.meta.glob([
  '../components/prompts/**/*.tsx?raw',
  '!../components/prompts/registry.ts',
  '!../components/prompts/index.ts',
  '!../components/prompts/prompt-list.tsx',
  '!../components/prompts/prompt-cards-grid.tsx',
  '!../components/prompts/styles.ts',
], { eager: true }) as unknown as RawModuleMap;

// Modules (non-raw) to extract exported promptText content when available
const promptModules = import.meta.glob([
  '../components/prompts/**/*.tsx',
  '!../components/prompts/registry.ts',
  '!../components/prompts/index.ts',
  '!../components/prompts/prompt-list.tsx',
  '!../components/prompts/prompt-cards-grid.tsx',
  '!../components/prompts/styles.ts',
], { eager: true }) as Record<string, any>;

function extractMetaFromSource(src: string): { slug?: string; title?: string; shortDescription?: string } {
  const blockMatch = src.match(/export\s+const\s+meta\s*=\s*\{([\s\S]*?)\}/i);
  if (!blockMatch) return {};
  const block = blockMatch[1];
  const get = (key: string) => {
    const re = new RegExp(`${key}\\s*:\\s*(?:\"([^\"]+)\"|'([^']+)')`, 'i');
    const m = block.match(re);
    if (!m) return undefined;
    return (m[1] ?? m[2])?.trim();
  };
  return {
    slug: get('slug'),
    title: get('title'),
    shortDescription: get('shortDescription') ?? '',
  };
}

type IndexedItem = {
  kind: SearchKind;
  content: string;
  slug: string;
  title: string;
  shortDescription: string;
};

function buildIndex(): IndexedItem[] {
  const items: IndexedItem[] = [];

  // 1) Indexer à partir des registres (toujours disponibles)
  for (const t of tipsList) {
    if (t.slug === 'more') continue; // exclude placeholder entries
    items.push({ kind: 'tip', slug: t.slug, title: t.title, shortDescription: t.shortDescription, content: `${t.title}\n${t.shortDescription}`.toLowerCase() });
  }
  for (const p of promptsList) {
    if (p.slug === 'more') continue; // exclude placeholder entries
    items.push({ kind: 'prompt', slug: p.slug, title: p.title, shortDescription: p.shortDescription, content: `${p.title}\n${p.shortDescription}`.toLowerCase() });
  }

  // 2) Enrichir avec le contenu brut si disponible (optionnel)
  const enrichFrom = (kind: SearchKind, map: RawModuleMap) => {
    Object.entries(map).forEach(([_, mod]) => {
      const src: string = typeof mod === 'string' ? mod : (mod as any)?.default ?? '';
      if (!src) return;
      const meta = extractMetaFromSource(src);
      if (!meta?.slug) return;
      if (meta.slug === 'more') return; // keep excluded
      const found = items.find(i => i.kind === kind && i.slug === meta.slug);
      if (found) {
        found.content = `${found.content}\n${src.toLowerCase()}`;
        if (!found.title && meta.title) found.title = meta.title;
        if (!found.shortDescription && meta.shortDescription) found.shortDescription = meta.shortDescription;
      }
    });
  };
  enrichFrom('tip', tipSources);
  enrichFrom('prompt', promptSources);

  // 3) Enrichir avec promptText exporté (quand présent sur les prompts)
  Object.values(promptModules).forEach((mod: any) => {
    const slug: string | undefined = mod?.meta?.slug;
    const pt: string | undefined = typeof mod?.promptText === 'string' ? mod.promptText : undefined;
    if (!slug || slug === 'more' || !pt) return;
    const found = items.find(i => i.kind === 'prompt' && i.slug === slug);
    if (found) {
      found.content = `${found.content}\n${pt.toLowerCase()}`;
    }
  });

  return items;
}

const INDEX: IndexedItem[] = buildIndex();

export function searchAll(query: string): SearchHit[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const matched = INDEX.filter(i => i.title.toLowerCase().includes(q) || i.shortDescription.toLowerCase().includes(q) || i.content.includes(q));
  matched.sort((a, b) => (a.kind !== b.kind ? (a.kind === 'tip' ? -1 : 1) : a.title.localeCompare(b.title)));
  return matched.map(i => ({ kind: i.kind, slug: i.slug, title: i.title, shortDescription: i.shortDescription }));
}
