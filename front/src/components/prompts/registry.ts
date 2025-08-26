import type { PromptMeta } from './prompt-types';
import { promptsEntries } from '../content-manifest';
export type PromptEntry = PromptMeta & { load: () => Promise<any> };
const entries: PromptEntry[] = promptsEntries.slice();

entries.sort((a, b) => {
  // Newest first; fallback to title for stability
  const byDate = (b.writtenOn ?? '').localeCompare(a.writtenOn ?? '');
  return byDate !== 0 ? byDate : a.title.localeCompare(b.title);
});

export const promptsList: PromptEntry[] = entries;

export function findPromptBySlug(slug: string): PromptEntry | undefined {
  return promptsList.find((p) => p.slug === slug);
}
