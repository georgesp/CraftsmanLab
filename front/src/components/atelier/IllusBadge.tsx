import React from 'react';
import { Box } from '@mui/material';
import type { IllusName } from './rubric';

interface IllusBadgeProps {
  /** Nom du badge illustré (fichier /illus-{name}.svg). */
  name: IllusName;
  /** Taille en pixels (30–52 en tête de section, 40–42 par carte). */
  size?: number;
  /** Description accessible ; par défaut décoratif (aria-hidden). */
  alt?: string;
}

/**
 * Badge illustration de marque (cercle teinté + motif au gradient bleu).
 * Rendu via <img> pour isoler les gradients SVG entre instances.
 */
export const IllusBadge: React.FC<IllusBadgeProps> = ({ name, size = 42, alt }) => (
  <Box
    component="img"
    src={`/illus-${name}.svg`}
    alt={alt ?? ''}
    aria-hidden={alt ? undefined : true}
    sx={{ width: size, height: size, flexShrink: 0, display: 'block' }}
  />
);

IllusBadge.displayName = 'IllusBadge';
