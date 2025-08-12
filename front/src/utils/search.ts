// Utilitaire de recherche: indexe le contenu brut des Tips et des Prompts
// Respecte les règles de couleurs centralisées via src/utils/colors.ts si besoin côté UI

export type SearchKind = 'tip' | 'prompt';

export type SearchHit = {
  kind: SearchKind;
  slug: string;
  title: string;
  shortDescription: string;
};

type RawModuleMap = Record<string, unknown>;

// Charge le contenu brut des fichiers .tsx des tips et prompts (hors fichiers d'infra)
// On utilise ?raw pour récupérer le texte source afin de chercher dans le contenu réel.
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

// Extraction naïve des champs meta depuis le source via RegExp (simple et robuste tant que le format reste identique)
const strRe = String.raw`"([^"]+)"|'([^']+)'`;
const makeMetaRegex = (prop: string) => new RegExp(`${prop}\s*:\s*(?:${strRe})`, 'i');

function extractMetaFromSource(src: string): { slug?: string; title?: string; shortDescription?: string } {
  // Cherche export const meta = { ... }
  if (!/export\s+const\s+meta\s*=\s*\{[\s\S]*?\}/i.test(src)) {
    return {};
  }
  const get = (key: string) => {
    const re = makeMetaRegex(key);
    const m = src.match(re);
    if (!m) return undefined;
    // m[1] = double-quoted capture, m[2] = single-quoted capture
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
  content: string; // contenu texte intégral pour la recherche
  slug: string;
  title: string;
  shortDescription: string;
};

function buildIndex(): IndexedItem[] {
  const items: IndexedItem[] = [];

  const pushFrom = (kind: SearchKind, map: RawModuleMap) => {
    Object.entries(map).forEach(([_, mod]) => {
      const src: string = typeof mod === 'string' ? mod : (mod as any)?.default ?? '';
      if (!src) return;
      const meta = extractMetaFromSource(src);
      if (!meta.slug || !meta.title) return;
      items.push({
        kind,
        content: src.toLowerCase(),
        slug: meta.slug!,
        title: meta.title!,
        shortDescription: meta.shortDescription ?? '',
      });
    });
  };

  pushFrom('tip', tipSources);
  pushFrom('prompt', promptSources);
  return items;
}

// Index construit au chargement (taille modeste, acceptable côté client)
const INDEX: IndexedItem[] = buildIndex();

export function searchAll(query: string): SearchHit[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const matched = INDEX.filter(i =>
    i.title.toLowerCase().includes(q) ||
    i.shortDescription.toLowerCase().includes(q) ||
    i.content.includes(q)
  );

  // Ordonner: d'abord les tips, puis les prompts; à l'intérieur, tri par titre pour stabilité
  matched.sort((a, b) => {
    if (a.kind !== b.kind) return a.kind === 'tip' ? -1 : 1;
    return a.title.localeCompare(b.title);
  });

  return matched.map(i => ({ kind: i.kind, slug: i.slug, title: i.title, shortDescription: i.shortDescription }));
}
