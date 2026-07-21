import React, { useState } from 'react';
import { Box, Typography, Snackbar } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AtelierCard, RubricBadge } from '../atelier';
import { promptsList } from './registry';
import { COLORS, TYPOGRAPHY } from '../../styles';

type Props = {
  items?: typeof promptsList;
};

export const AtelierPromptsGrid: React.FC<Props> = ({ items: externalItems }) => {
  const { t } = useTranslation(['prompts', 'pages']);
  const navigate = useNavigate();
  const [toastOpen, setToastOpen] = useState(false);
  const items = (externalItems ?? promptsList).filter((p) => p.slug !== 'more');

  const tr = (slug: string, key: string, fallback: string) => {
    const translated = t(`prompts:${slug}.${key}`, { defaultValue: '' });
    return translated || fallback;
  };

  const handleCopy = async (e: React.MouseEvent, text: string) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(text);
      setToastOpen(true);
    } catch {
      /* clipboard indisponible : silencieux */
    }
  };

  return (
    <>
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
            <AtelierCard
              key={p.slug}
              onClick={() => navigate(`/prompts/${p.slug}`)}
              sx={{ display: 'flex', flexDirection: 'column' }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <RubricBadge
                  icon={<DescriptionIcon />}
                  color={COLORS.atelier.prompts}
                  size={34}
                />
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
                  {tr(p.slug, 'title', p.title)}
                </Typography>
              </Box>

              <Box sx={{ height: '1px', background: COLORS.atelier.divider, my: '16px' }} />

              <Typography
                sx={{ fontSize: '14px', lineHeight: 1.55, color: COLORS.atelier.textBodyAlt, m: 0, flex: 1 }}
              >
                {desc}
              </Typography>

              <Box
                sx={{
                  mt: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
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
                <Box
                  component="button"
                  type="button"
                  onClick={(e: React.MouseEvent) => handleCopy(e, desc)}
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '5px',
                    border: 0,
                    background: 'transparent',
                    cursor: 'pointer',
                    p: 0,
                    fontSize: '13px',
                    fontWeight: 600,
                    color: COLORS.atelier.prompts,
                    '& svg': { fontSize: 15 },
                  }}
                >
                  <ContentCopyIcon />
                  {t('pages:prompts.copy', { defaultValue: 'Copier' })}
                </Box>
              </Box>
            </AtelierCard>
          );
        })}
      </Box>

      <Snackbar
        open={toastOpen}
        autoHideDuration={2000}
        onClose={() => setToastOpen(false)}
        message={t('pages:prompts.copied', { defaultValue: 'Copié !' })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </>
  );
};

AtelierPromptsGrid.displayName = 'AtelierPromptsGrid';
