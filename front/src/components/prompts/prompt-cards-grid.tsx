import React from 'react';
import { Grid, Typography, Box, IconButton, useMediaQuery, useTheme } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { promptsList } from './registry';
import { COLORS, TYPOGRAPHY } from '../../styles';
import { PromptCard, PromptCardContent } from '../../pages/Prompts/styles';
import { KeywordChips } from '../ui/KeywordChips';

type Props = {
  rows?: number; // nombre de lignes à afficher
  showMore?: boolean; // controls whether the 'more' entry is shown
  seeAllLink?: string;
  seeAllLabel?: string;
};

export const PromptCardsGrid: React.FC<Props> = ({
  rows,
  showMore = true,
  seeAllLink,
  seeAllLabel = 'Voir tous les prompts',
}) => {
  const { t } = useTranslation(['prompts', 'common']);
  const theme = useTheme();
  const isLgUp = useMediaQuery(theme.breakpoints.up('lg'));
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));

  // Helper function to get translated text with fallback
  const getTranslatedText = (promptSlug: string, key: string, fallback: string) => {
    const translationKey = `${promptSlug}.${key}`;
    const translated = t(translationKey, { defaultValue: '' });
    return translated || fallback;
  };

  const items = React.useMemo(() => {
    let list = promptsList;
    if (!showMore) {
      list = list.filter((p) => p.slug !== 'more');
    }
    const columns = isLgUp ? 4 : isMdUp ? 3 : isSmUp ? 2 : 1;
    if (!rows || rows <= 0) return list;
    let visibleSlots = rows * columns;
    if (seeAllLink && visibleSlots > 0) visibleSlots -= 1;
    return list.slice(0, Math.max(0, visibleSlots));
  }, [rows, showMore, seeAllLink, isLgUp, isMdUp, isSmUp]);

  return (
    <Grid container spacing={4}>
      {items.map((p) => (
        <Grid item xs={12} sm={6} md={4} lg={3} xl={3} key={p.slug}>
          <RouterLink
            to={`/prompts/${p.slug}`}
            style={{ display: 'block', height: '100%', color: 'inherit', textDecoration: 'none' }}
          >
            <PromptCard
              className="prompt-card"
              sx={{
                backgroundColor: COLORS.cardBgDark,
                boxShadow: 'none',
                border: 'none',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                cursor: 'pointer',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 3,
                },
              }}
            >
              <PromptCardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                  <Box
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 36,
                      height: 36,
                      border: `1px solid ${COLORS.promptsIcon}`,
                      borderRadius: 1,
                    }}
                  >
                    <TextSnippetIcon
                      fontSize="large"
                      sx={{ color: COLORS.promptsIcon, fontSize: 20 }}
                    />
                  </Box>
                  <Typography
                    variant="h5"
                    component="h3"
                    sx={{ fontWeight: TYPOGRAPHY.fontWeights.bold, mb: 0, color: 'text.primary' }}
                  >
                    {getTranslatedText(p.slug, 'title', p.title)}
                  </Typography>
                </Box>
                <Typography variant="body1" sx={{ color: 'text.primary', flexGrow: 1, mb: 1 }}>
                  {getTranslatedText(p.slug, 'shortDescription', p.shortDescription)}
                </Typography>
                <KeywordChips keywords={p.keywords} />
              </PromptCardContent>
            </PromptCard>
          </RouterLink>
        </Grid>
      ))}
      {seeAllLink && (
        <Grid item xs={12} sm={6} md={4} lg={3} xl={3} key="see-all-prompts">
          <PromptCard
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: 160,
              backgroundColor: COLORS.cardBgDark,
              boxShadow: 'none',
              border: 'none',
            }}
          >
            <RouterLink
              to={seeAllLink}
              style={{
                display: 'flex',
                width: '100%',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                textDecoration: 'none',
                color: 'inherit',
              }}
              aria-label={seeAllLabel || t('common:buttons.seeAll')}
            >
              <IconButton
                aria-hidden
                disableRipple
                sx={{
                  borderRadius: 0,
                  color: 'text.primary',
                  '&:hover': { backgroundColor: 'transparent' },
                }}
              >
                <ArrowForwardIcon />
              </IconButton>
            </RouterLink>
          </PromptCard>
        </Grid>
      )}
    </Grid>
  );
};

PromptCardsGrid.displayName = 'PromptCardsGrid';
