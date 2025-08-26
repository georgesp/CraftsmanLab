import type { TipMeta } from '.';

// Eager import for metadata
const metaModules = import.meta.glob(
  [
    './**/*.tsx',
    '!./registry.ts',
    '!./index.ts',
    '!./styles.ts',
    '!./tip-cards-grid.tsx',
    '!./tip-list.tsx',
  ],
  { eager: true },
);
// Lazy loaders for components
const loaders = import.meta.glob([
  './**/*.tsx',
  '!./registry.ts',
  '!./index.ts',
  '!./styles.ts',
  '!./tip-cards-grid.tsx',
  '!./tip-list.tsx',
]);

export type TipEntry = TipMeta & { load: () => Promise<any> };

const entries: TipEntry[] = Object.entries(metaModules).flatMap(([path, mod]) => {
  const anyMod = mod as any;
  const meta: TipMeta | undefined = anyMod.meta;
  if (!meta) return [];
  const load = loaders[path] as () => Promise<any>;
  return [{ ...meta, load }];
});

entries.sort(
  (a, b) => (b.writtenOn ?? '').localeCompare(a.writtenOn ?? '') || a.title.localeCompare(b.title),
);

export const tipsList: TipEntry[] = entries;

export function findTipBySlug(slug: string): TipEntry | undefined {
  return tipsList.find((t) => t.slug === slug);
}
