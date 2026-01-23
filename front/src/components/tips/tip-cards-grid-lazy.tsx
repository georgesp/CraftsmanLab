import React from 'react';
import type { tipsList } from './registry';

// Fallback simple pour l'environnement de test: rend rien si React.lazy non dispo
// En exécution app (vite), React.lazy existe et chargera le composant
const hasLazy = typeof (React as any)?.lazy === 'function';
type TipGridProps = { rows?: number; seeAllLink?: string; seeAllLabel?: string; items?: typeof tipsList };
export const LazyTipCardsGrid = (hasLazy
  ? (React as any).lazy(() =>
      import('./tip-cards-grid').then((m: any) => ({ default: m.TipCardsGrid })),
    )
  : (_: TipGridProps) => null) as unknown as React.ComponentType<TipGridProps>;
