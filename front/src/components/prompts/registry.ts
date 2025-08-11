import type { PromptMeta } from '.';

// Eager import to get metadata immediately from all .tsx files in current directory and subdirectories
// Excludes registry files and other infrastructure files
const metaModules = import.meta.glob(['./**/*.tsx', '!./registry.ts', '!./index.ts', '!./prompt-types.ts', '!./prompt-list.tsx', '!./styles.ts'], { eager: true });
// Lazy importers used for loading components and promptText on demand
const loaders = import.meta.glob(['./**/*.tsx', '!./registry.ts', '!./index.ts', '!./prompt-types.ts', '!./prompt-list.tsx', '!./styles.ts']);

export type PromptEntry = PromptMeta & {
  load: () => Promise<any>;
};

const entries: PromptEntry[] = Object.entries(metaModules).flatMap(([path, mod]) => {
  const anyMod = mod as any;
  const meta: PromptMeta | undefined = anyMod.meta;
  if (!meta) return [];
  const load = loaders[path] as () => Promise<any>;
  return [{ ...meta, load }];
});

entries.sort((a, b) => {
  // Newest first; fallback to title for stability
  const byDate = (b.writtenOn ?? '').localeCompare(a.writtenOn ?? '');
  return byDate !== 0 ? byDate : a.title.localeCompare(b.title);
});

export const promptsList: PromptEntry[] = entries;

export function findPromptBySlug(slug: string): PromptEntry | undefined {
  return promptsList.find(p => p.slug === slug);
}
