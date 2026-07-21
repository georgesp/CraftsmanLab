import React, { useState } from 'react';
import { Box, Collapse } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { COLORS, TYPOGRAPHY } from '../../styles';

export interface FacetItem {
  label: string;
  count: number;
  /** Valeur logique (défaut : label). Sert de clé de sélection. */
  value?: string;
}

export interface FacetGroup {
  group: string;
  items: FacetItem[];
}

interface FacetsProps {
  groups: FacetGroup[];
  /** Couleur d'accent des en-têtes de groupe (défaut : bleu Tips). */
  accent?: string;
  /** Fond clair d'accent au survol / sélection (défaut : bleu très clair). */
  accentBg?: string;
  /** Valeurs sélectionnées (multi-sélection). */
  selected?: string[];
  /** Bascule une facette (coche/décoche). */
  onToggle?: (value: string) => void;
}

/**
 * Facettes groupées de la sidebar (Tips / Actualités) — variante compacte.
 * Les groupes sont repliés par défaut (seul le 1er, et ceux qui contiennent
 * une sélection active, sont ouverts). L'en-tête affiche « N actif(s) »
 * quand le groupe porte des filtres. Les mots-clés sont des étiquettes
 * compactes qui s'enroulent (label + compteur).
 */
export const Facets: React.FC<FacetsProps> = ({
  groups,
  accent = COLORS.atelier.tips,
  accentBg = COLORS.atelier.tipsBg,
  selected = [],
  onToggle,
}) => {
  // État d'ouverture explicite (surcharge par l'utilisateur). Par défaut,
  // un groupe est ouvert s'il est le premier OU s'il contient une sélection.
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const toggleGroup = (group: string, current: boolean) =>
    setExpanded((prev) => ({ ...prev, [group]: !current }));

  return (
    <>
      {groups.map((g, index) => {
        const activeCount = g.items.reduce(
          (n, it) => n + (selected.includes(it.value ?? it.label) ? 1 : 0),
          0,
        );
        const isOpen = expanded[g.group] ?? (index === 0 || activeCount > 0);
        return (
          <Box key={g.group}>
            <Box
              component="button"
              type="button"
              aria-label={`${g.group} — ${isOpen ? 'replier' : 'déplier'}`}
              aria-expanded={isOpen}
              onClick={() => toggleGroup(g.group, isOpen)}
              sx={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                m: '0 0 10px',
                p: '2px',
                border: 0,
                background: 'transparent',
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              <Box
                component="span"
                sx={{
                  flex: 1,
                  fontFamily: TYPOGRAPHY.fontFamilies.mono,
                  fontSize: '11px',
                  letterSpacing: '.1em',
                  textTransform: 'uppercase',
                  color: accent,
                  fontWeight: TYPOGRAPHY.fontWeights.semiBold,
                }}
              >
                {g.group}
              </Box>
              <Box
                component="span"
                sx={{
                  fontFamily: TYPOGRAPHY.fontFamilies.mono,
                  fontSize: '11px',
                  color: activeCount > 0 ? accent : COLORS.atelier.textFaint,
                  fontWeight: activeCount > 0 ? TYPOGRAPHY.fontWeights.semiBold : TYPOGRAPHY.fontWeights.regular,
                }}
              >
                {activeCount > 0 ? `${activeCount} actif${activeCount > 1 ? 's' : ''}` : g.items.length}
              </Box>
              <ExpandMoreIcon
                sx={{
                  fontSize: 16,
                  color: COLORS.atelier.textMuted,
                  transition: 'transform .18s ease',
                  transform: isOpen ? 'rotate(180deg)' : 'none',
                }}
              />
            </Box>

            <Collapse in={isOpen} timeout={180} unmountOnExit>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '6px', mb: 2.5 }}>
                {g.items.map((item) => {
                  const value = item.value ?? item.label;
                  const isSelected = selected.includes(value);
                  return (
                    <Box
                      key={value}
                      role="checkbox"
                      aria-label={item.label}
                      aria-checked={isSelected}
                      tabIndex={0}
                      onClick={() => onToggle?.(value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          onToggle?.(value);
                        }
                      }}
                      sx={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '7px',
                        p: '6px 10px',
                        background: isSelected ? accentBg : COLORS.atelier.surface,
                        border: `1px solid ${isSelected ? accent : COLORS.atelier.borderDefault}`,
                        borderRadius: '9px',
                        cursor: 'pointer',
                        outline: 'none',
                        transition: 'border-color .15s ease, background .15s ease, color .15s ease',
                        '&:hover': { borderColor: accent, background: accentBg },
                        '&:focus-visible': { borderColor: accent, boxShadow: `0 0 0 3px ${accentBg}` },
                      }}
                    >
                      <Box
                        component="span"
                        sx={{
                          fontSize: '13px',
                          color: isSelected ? accent : COLORS.atelier.textBody,
                          fontWeight: isSelected
                            ? TYPOGRAPHY.fontWeights.semiBold
                            : TYPOGRAPHY.fontWeights.regular,
                        }}
                      >
                        {item.label}
                      </Box>
                      <Box
                        component="span"
                        sx={{
                          fontFamily: TYPOGRAPHY.fontFamilies.mono,
                          fontSize: '11px',
                          color: isSelected ? accent : COLORS.atelier.textFaint,
                        }}
                      >
                        {item.count}
                      </Box>
                    </Box>
                  );
                })}
              </Box>
            </Collapse>
          </Box>
        );
      })}
    </>
  );
};

Facets.displayName = 'Facets';
