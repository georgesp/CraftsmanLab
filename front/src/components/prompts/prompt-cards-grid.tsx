import React from 'react';
import { Grid, Typography, Divider, Box, IconButton } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import { Link as RouterLink } from 'react-router-dom';
import { promptsList } from './registry';
import { COLORS } from '../../utils/colors';
import { PromptCard, PromptCardContent } from '../../pages/Prompts/styles';
import { KeywordChips } from '../ui/KeywordChips';

type Props = {
  maxItems?: number; // total slots y compris la card voir tout
  showMore?: boolean; // controls whether the 'more' entry is shown
  seeAllLink?: string;
  seeAllLabel?: string;
};

export const PromptCardsGrid: React.FC<Props> = ({ maxItems, showMore = true, seeAllLink, seeAllLabel = 'Voir tous les prompts' }) => {
  const items = React.useMemo(() => {
    let list = promptsList;
    if (!showMore) {
      list = list.filter(p => p.slug !== 'more');
    }
    let sliceCount = maxItems && maxItems > 0 ? maxItems : undefined;
    if (seeAllLink && sliceCount && sliceCount > 0) sliceCount = sliceCount - 1;
    if (sliceCount) return list.slice(0, sliceCount);
    return list;
  }, [maxItems, showMore, seeAllLink]);

  return (
    <Grid container spacing={4}>
  {items.map(p => (
        <Grid item xs={12} sm={6} md={3} lg={3} xl={3} key={p.slug}>
          <PromptCard>
            
              <RouterLink to={`/prompts/${p.slug}`} style={{ display: 'block', height: '100%', color: 'inherit', textDecoration: 'none' }}>
                <PromptCardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <TextSnippetIcon fontSize="small" sx={{ color: COLORS.mediumGrey }} />
                    <Typography variant="h5" component="h3" sx={{ fontWeight: 700, textDecoration: 'underline', mb: 0, color: COLORS.titleColor }}>
                      {p.title}
                    </Typography>
                  </Box>
                  <Divider sx={{ mt: 2, mb: 1, borderColor: COLORS.dividerLight, opacity: 1, mx: -3 }} />
                  <Typography variant="body1" sx={{ color: COLORS.grey800, flexGrow: 1 }}>
                    {p.shortDescription}
                  </Typography>
                  <Divider sx={{ mt: 1, mb: 1, borderColor: COLORS.dividerLight, opacity: 1, mx: -3 }} />
                  <KeywordChips keywords={p.keywords} />
                </PromptCardContent>
              </RouterLink>
            
          </PromptCard>
        </Grid>
      ))}
      {seeAllLink && (
        <Grid item xs={12} sm={6} md={3} lg={3} xl={3} key="see-all-prompts">
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

PromptCardsGrid.displayName = 'PromptCardsGrid';
