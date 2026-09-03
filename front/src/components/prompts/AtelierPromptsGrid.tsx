import React from 'react';
import { Box, Typography } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AtelierCard, RubricBadge } from '../atelier';
import { promptsList } from './registry';
import { COLORS, TYPOGRAPHY } from '../../styles';

type Props = {
  items?: typeof promptsList;
};

export const AtelierPromptsGrid: React.FC<Props> = ({ items: externalItems }) => {
  const { t } = useTranslation(['prompts', 'pages']);
  const items = (externalItems ?? promptsList).filter((p) => p.slug !== 'more');

  const tr = (slug: string, key: string, fallback: string) => {
    const translated = t(`prompts:${slug}.${key}`, { defaultValue: '' });
    return translated || fallback;
  };

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
        gap: '16px',
      }}
    >
      {items.map((p) => {
        const desc = tr(p.slug, 'shortDescription', p.shortDescription);
        const tag = p.keywords?.[0] ?? '';
        return (
          <AtelierCard key={p.slug} sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <RubricBadge icon={<DescriptionIcon />} color={COLORS.atelier.prompts} size={34} />
              <Typography
                component="h3"
                sx={{
                  fontFamily: TYPOGRAPHY.fontFamilies.display,
                  fontWeight: 700,
                  fontSize: '18px',
                  letterSpacing: '-0.01em',
                  lineHeight: 1.2,
                  m: 0,
                  color: COLORS.atelier.textStrong,
                }}
              >
                {/* Lien etire : un vrai <a href> pour les moteurs, dont la zone */}
                {/* cliquable couvre toute la carte via le ::after. */}
                <Box
                  component={RouterLink}
                  to={`/prompts/${p.slug}`}
                  sx={{
                    color: 'inherit',
                    textDecoration: 'none',
                    outline: 'none',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      inset: 0,
                      borderRadius: '12px',
                    },
                    '&:focus-visible::after': {
                      boxShadow: '0 0 0 3px rgba(25,118,210,.25)',
                    },
                  }}
                >
                  {tr(p.slug, 'title', p.title)}
                </Box>
              </Typography>
            </Box>

            <Box sx={{ height: '1px', background: COLORS.atelier.divider, my: '16px' }} />

            <Typography
              sx={{
                fontSize: '14px',
                lineHeight: 1.55,
                color: COLORS.atelier.textBodyAlt,
                m: 0,
                flex: 1,
              }}
            >
              {desc}
            </Typography>

            <Box
              sx={{
                mt: '18px',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {tag && (
                <Box
                  component="span"
                  sx={{
                    fontFamily: TYPOGRAPHY.fontFamilies.mono,
                    fontSize: '11px',
                    color: COLORS.atelier.tips,
                    border: `1px solid ${COLORS.atelier.tipsBorder}`,
                    background: COLORS.atelier.tipsBg,
                    px: '10px',
                    py: '3px',
                    borderRadius: '6px',
                  }}
                >
                  {tag}
                </Box>
              )}
            </Box>
          </AtelierCard>
        );
      })}
    </Box>
  );
};

AtelierPromptsGrid.displayName = 'AtelierPromptsGrid';
