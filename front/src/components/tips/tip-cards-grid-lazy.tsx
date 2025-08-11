import React from 'react';
export const LazyTipCardsGrid = React.lazy(() =>
  import('./tip-cards-grid').then((m) => ({ default: m.TipCardsGrid }))
);
