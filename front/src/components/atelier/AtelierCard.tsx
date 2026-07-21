import React from 'react';
import { Box } from '@mui/material';
import type { SxProps, Theme } from '@mui/material/styles';
import { COLORS, SHADOWS } from '../../styles';

interface AtelierCardProps {
  children: React.ReactNode;
  /** Couleur d'accent appliquée en border-left 3px (ex. couleur de rubrique). */
  accent?: string;
  /** Rend la carte cliquable (curseur + rôle) et déclenche onClick. */
  onClick?: () => void;
  /** Padding interne (défaut 22px 24px, cf. handoff). */
  padding?: string;
  /** Style additionnel (ex. display flex column pour les cartes prompt). */
  sx?: SxProps<Theme>;
  component?: React.ElementType;
}

/**
 * Coquille de carte « Atelier adouci » : fond blanc, bordure, rayon 12,
 * border-left d'accent optionnel, élévation + translation au survol.
 * Le contenu (en-tête, corps, pied) est composé par l'écran appelant.
 */
export const AtelierCard: React.FC<AtelierCardProps> = ({
  children,
  accent,
  onClick,
  padding = '22px 24px',
  sx,
  component = 'div',
}) => {
  const interactive = Boolean(onClick);
  return (
    <Box
      component={component}
      onClick={onClick}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      onKeyDown={
        interactive
          ? (e: React.KeyboardEvent) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick?.();
              }
            }
          : undefined
      }
      sx={{
        background: COLORS.atelier.surface,
        border: `1px solid ${COLORS.atelier.borderDefault}`,
        borderLeft: accent ? `3px solid ${accent}` : `1px solid ${COLORS.atelier.borderDefault}`,
        borderRadius: '12px',
        padding,
        cursor: interactive ? 'pointer' : 'default',
        transition: 'box-shadow .2s ease, transform .2s ease',
        outline: 'none',
        '&:hover': interactive
          ? { boxShadow: SHADOWS.cardHover, transform: 'translateY(-2px)' }
          : undefined,
        '&:focus-visible': interactive
          ? { boxShadow: `0 0 0 3px rgba(25,118,210,.25)` }
          : undefined,
        ...sx,
      }}
    >
      {children}
    </Box>
  );
};

AtelierCard.displayName = 'AtelierCard';
