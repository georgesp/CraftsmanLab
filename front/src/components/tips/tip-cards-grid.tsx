import React from 'react';
import { Grid, Typography, Divider, Box, IconButton } from '@mui/material';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link as RouterLink } from 'react-router-dom';
import { tipsList } from './registry';
import { COLORS } from '../../utils/colors';
import { PromptCard, PromptCardContent } from '../../pages/Prompts/styles';
import { KeywordChips } from '../ui/KeywordChips';


type Props = {
  maxItems?: number; // total slots y compris la card "voir tout" si seeAllLink est défini
  seeAllLink?: string; // si fourni, ajoute une card flèche occupant un slot
  seeAllLabel?: string; // label accessible
};

export const TipCardsGrid: React.FC<Props> = ({ maxItems, seeAllLink, seeAllLabel = 'Voir tous les tips' }) => {
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
      {items.map(t => (
        <Grid item xs={12} sm={6} md={3} lg={3} xl={3} key={t.slug}>
          <PromptCard>
            <RouterLink to={`/tips/${t.slug}`} style={{ display: 'block', height: '100%', color: 'inherit', textDecoration: 'none' }}>
              <PromptCardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <TipsAndUpdatesIcon fontSize="small" sx={{ color: COLORS.mediumGrey }} />
                  <Typography variant="h5" component="h3" sx={{ fontWeight: 700, textDecoration: 'underline', mb: 0, color: COLORS.titleColor }}>
                    {t.title}
                  </Typography>
                </Box>
                <Divider sx={{ mt: 1, mb: 1, borderColor: COLORS.dividerLight, opacity: 1, mx: -3 }} />
                <Typography variant="body1" sx={{ color: COLORS.grey800, flexGrow: 1 }}>
                  {t.shortDescription}
                </Typography>
                <Divider sx={{ mt: 1, mb: 1, borderColor: COLORS.dividerLight, opacity: 1, mx: -3 }} />
                <KeywordChips keywords={t.keywords} />
              </PromptCardContent>
            </RouterLink>
          </PromptCard>
        </Grid>
      ))}
      {seeAllLink && (
        <Grid item xs={12} sm={6} md={3} lg={3} xl={3} key="see-all-tips">
          <PromptCard sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 160 }}>
            <RouterLink to={seeAllLink} style={{ display: 'flex', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', color: 'inherit' }} aria-label={seeAllLabel}>
              <IconButton aria-hidden disableRipple sx={{ borderRadius: 0, '&:hover': { backgroundColor: 'transparent' } }}>
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
