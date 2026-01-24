import { lazy, ComponentType } from 'react';
import type { tipsList } from './registry';

// Fallback simple pour l'environnement de test: rend rien si lazy non dispo
// En exécution app (vite), lazy existe et chargera le composant
const hasLazy = typeof lazy === 'function';
type TipGridProps = { rows?: number; seeAllLink?: string; seeAllLabel?: string; items?: typeof tipsList };
export const LazyTipCardsGrid = (hasLazy
  ? lazy(() =>
      import('./tip-cards-grid').then((m: any) => ({ default: m.TipCardsGrid })),
    )
  : (_: TipGridProps) => null) as unknown as ComponentType<TipGridProps>;
