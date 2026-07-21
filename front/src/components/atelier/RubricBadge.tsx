import React from 'react';
import { Box } from '@mui/material';

interface RubricBadgeProps {
  /** Icône (élément @mui/icons-material). */
  icon: React.ReactNode;
  /** Couleur de fond du carré (ex. couleur de rubrique). */
  color: string;
  /** Côté du carré en pixels. */
  size?: number;
  /** Rayon des angles. */
  radius?: number;
}

/**
 * Petit badge carré à coin doux avec icône blanche centrée.
 * Ex. badge « document » orange des cartes prompt.
 */
export const RubricBadge: React.FC<RubricBadgeProps> = ({
  icon,
  color,
  size = 34,
  radius = 8,
}) => (
  <Box
    sx={{
      width: size,
      height: size,
      borderRadius: `${radius}px`,
      backgroundColor: color,
      color: '#fff',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      '& svg': { fontSize: Math.round(size * 0.56) },
    }}
  >
    {icon}
  </Box>
);

RubricBadge.displayName = 'RubricBadge';
