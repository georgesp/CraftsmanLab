import React from 'react';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AtelierCard, IllusBadge } from '../atelier';
import type { IllusName } from '../atelier';
import { tipsList } from './registry';
import { COLORS, TYPOGRAPHY } from '../../styles';

type Props = {
  items?: typeof tipsList;
};

// Choix du badge illustré selon la première catégorie.
function pickIllus(categories: string[] = []): IllusName {
  const c = categories.map((x) => x.toLowerCase());
  if (c.some((x) => x.includes('architecture') || x.includes('ddd') || x.includes('clean')))
    return 'blueprint';
  if (c.some((x) => x.includes('test') || x.includes('perf') || x.includes('git')))
    return 'tools';
  if (c.some((x) => x.includes('react') || x.includes('blazor') || x.includes('record')))
    return 'layers';
  return 'code';
}

export const AtelierTipsGrid: React.FC<Props> = ({ items: externalItems }) => {
  const { t, i18n } = useTranslation('tips');
  const navigate = useNavigate();
  const items = externalItems ?? tipsList;

  // Réutilise le pattern de traduction du site (titre / description par tip).
  const tr = (slug: string, key: 'title' | 'shortDescription', fallback: string) => {
    const direct = t(`${slug}.${key}`, { defaultValue: '' });
    if (direct && direct !== `${slug}.${key}`) return direct;
    const contentKey = key === 'title' ? `${slug}.content.mainTitle` : `${slug}.content.summary`;
    const viaContent = t(contentKey, { defaultValue: '' });
    if (viaContent && viaContent !== contentKey) return viaContent;
    return fallback;
  };

  const fmtDate = (iso?: string) => {
    if (!iso) return '';
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return '';
    return new Intl.DateTimeFormat(i18n.language || 'fr', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(d);
  };

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
        gap: '16px',
      }}
    >
      {items.map((tip, idx) => {
        const cat = (tip.categories ?? []).slice(0, 2).join(' · ');
        return (
          <AtelierCard
            key={tip.slug}
            accent={COLORS.atelier.tips}
            onClick={() => navigate(`/tips/${tip.slug}`)}
            sx={{ display: 'flex', flexDirection: 'column' }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: '14px' }}>
              <IllusBadge name={pickIllus(tip.categories)} size={42} />
              <Box
                component="span"
                sx={{
                  fontFamily: TYPOGRAPHY.fontFamilies.mono,
                  fontSize: '11px',
                  color: COLORS.atelier.textMuted,
                  flex: 1,
                }}
              >
                {cat}
              </Box>
              <Box
                component="span"
                sx={{
                  fontFamily: TYPOGRAPHY.fontFamilies.mono,
                  fontSize: '12px',
                  color: COLORS.atelier.textFainter,
                }}
              >
                #{String(idx + 1).padStart(2, '0')}
              </Box>
            </Box>

            <Typography
              component="h3"
              sx={{
                fontFamily: TYPOGRAPHY.fontFamilies.display,
                fontWeight: 700,
                fontSize: '20px',
                letterSpacing: '-0.01em',
                lineHeight: 1.2,
                m: 0,
                color: COLORS.atelier.textStrong,
              }}
            >
              {tr(tip.slug, 'title', tip.title)}
            </Typography>

            <Typography
              sx={{ fontSize: '14px', lineHeight: 1.5, color: COLORS.atelier.textBodyAlt, mt: '10px' }}
            >
              {tr(tip.slug, 'shortDescription', tip.shortDescription)}
            </Typography>

            <Box
              sx={{
                mt: '16px',
                pt: '14px',
                borderTop: `1px solid ${COLORS.atelier.divider}`,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Box
                component="span"
                sx={{
                  fontFamily: TYPOGRAPHY.fontFamilies.mono,
                  fontSize: '11px',
                  color: COLORS.atelier.textMuted,
                }}
              >
                {fmtDate(tip.writtenOn)}
              </Box>
              <Box
                component="span"
                sx={{ fontSize: '13px', fontWeight: 600, color: COLORS.atelier.tips }}
              >
                {t('common.readMore', { defaultValue: 'Lire' })} →
              </Box>
            </Box>
          </AtelierCard>
        );
      })}
    </Box>
  );
};

AtelierTipsGrid.displayName = 'AtelierTipsGrid';
