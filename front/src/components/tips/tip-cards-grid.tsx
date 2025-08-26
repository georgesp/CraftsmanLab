import React from 'react';
import { Grid, Typography, Box, IconButton } from '@mui/material';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { tipsList } from './registry';
import { COLORS } from '../../styles/colors';
import { PromptCard, PromptCardContent } from '../../pages/Prompts/styles';
import { KeywordChips } from '../ui/KeywordChips';

type Props = {
  maxItems?: number; // total slots y compris la card "voir tout" si seeAllLink est défini
  seeAllLink?: string; // si fourni, ajoute une card flèche occupant un slot
  seeAllLabel?: string; // label accessible
};

export const TipCardsGrid: React.FC<Props> = ({
  maxItems,
  seeAllLink,
  seeAllLabel = 'Voir tous les tips',
}) => {
  const { t } = useTranslation('tips');

  // Helper function to get translated text with fallback for per-component translations
  const getTranslatedText = (
    tipSlug: string,
    key: 'title' | 'shortDescription',
    fallback: string,
  ) => {
    if (key === 'title') {
      // Try direct title first (polly.title), then fallback to content.mainTitle
      const directKey = `${tipSlug}.title`;
      const contentKey = `${tipSlug}.content.mainTitle`;

      const directTranslated = t(directKey, { defaultValue: '' });
      if (directTranslated && directTranslated !== directKey) {
        return directTranslated;
      }

      const contentTranslated = t(contentKey, { defaultValue: '' });
      if (contentTranslated && contentTranslated !== contentKey) {
        return contentTranslated;
      }
    } else {
      // shortDescription - try direct shortDescription first, then fallback to content.summary
      const directKey = `${tipSlug}.shortDescription`;
      const contentKey = `${tipSlug}.content.summary`;

      const directTranslated = t(directKey, { defaultValue: '' });
      if (directTranslated && directTranslated !== directKey) {
        return directTranslated;
      }

      const contentTranslated = t(contentKey, { defaultValue: '' });
      if (contentTranslated && contentTranslated !== contentKey) {
        return contentTranslated;
      }
    }

    return fallback;
  };

  const items = React.useMemo(() => {
    let sliceCount = maxItems && maxItems > 0 ? maxItems : undefined;
    if (seeAllLink && sliceCount && sliceCount > 0) {
      // réserver une place pour la card flèche
      sliceCount = sliceCount - 1;
    }
    const base = sliceCount ? tipsList.slice(0, sliceCount) : tipsList;
    return base;
  }, [maxItems, seeAllLink]);

  return (
    <Grid container spacing={4}>
      {items.map((t) => (
        <Grid item xs={12} sm={6} md={4} lg={4} xl={4} key={t.slug}>
          <PromptCard
            sx={{ backgroundColor: COLORS.cardBgDark, boxShadow: 'none', border: 'none' }}
          >
            <RouterLink
              to={`/tips/${t.slug}`}
              style={{ display: 'block', height: '100%', color: 'inherit', textDecoration: 'none' }}
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
                      border: `1px solid ${COLORS.tipsIcon}`,
                      borderRadius: 1,
                    }}
                  >
                    <TipsAndUpdatesIcon
                      fontSize="large"
                      sx={{ color: COLORS.tipsIcon, fontSize: 20 }}
                    />
                  </Box>
                  <Typography
                    variant="h5"
                    component="h3"
                    sx={{ fontWeight: 700, mb: 0, color: 'text.primary' }}
                  >
                    {getTranslatedText(t.slug, 'title', t.title)}
                  </Typography>
                </Box>
                <Typography variant="body1" sx={{ color: 'text.primary', flexGrow: 1, mb: 1 }}>
                  {getTranslatedText(t.slug, 'shortDescription', t.shortDescription)}
                </Typography>

                <KeywordChips keywords={t.keywords} />
              </PromptCardContent>
            </RouterLink>
          </PromptCard>
        </Grid>
      ))}
      {seeAllLink && (
        <Grid item xs={12} sm={6} md={4} lg={4} xl={4} key="see-all-tips">
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
              aria-label={seeAllLabel}
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

TipCardsGrid.displayName = 'TipCardsGrid';
