import type { TipMeta } from '.';
import { tipsEntries } from '../content-manifest';
export type TipEntry = TipMeta & { load: () => Promise<any> };
const entries: TipEntry[] = tipsEntries.slice();

entries.sort(
  (a, b) => (b.writtenOn ?? '').localeCompare(a.writtenOn ?? '') || a.title.localeCompare(b.title),
);

export const tipsList: TipEntry[] = entries;

export function findTipBySlug(slug: string): TipEntry | undefined {
  return tipsList.find((t) => t.slug === slug);
}
