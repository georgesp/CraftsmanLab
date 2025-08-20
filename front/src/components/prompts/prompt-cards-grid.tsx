import React from 'react';
import { Grid, Typography, Box, IconButton } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import { Link as RouterLink } from 'react-router-dom';
import { promptsList } from './registry';
import { COLORS } from '../../styles/colors';
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
        <Grid item xs={12} sm={6} md={4} lg={4} xl={4} key={p.slug}>
          <PromptCard sx={{ backgroundColor: COLORS.cardBgDark, boxShadow: 'none', border: 'none' }}>
              <RouterLink to={`/prompts/${p.slug}`} style={{ display: 'block', height: '100%', color: 'inherit', textDecoration: 'none' }}>
                <PromptCardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                    <Box sx={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 36, height: 36, border: `1px solid ${COLORS.promptsIcon}`, borderRadius: 1 }}>
                      <TextSnippetIcon fontSize="large" sx={{ color: COLORS.promptsIcon, fontSize: 20 }} />
                    </Box>
                    <Typography variant="h5" component="h3" sx={{ fontWeight: 700, mb: 0, color: 'text.primary' }}>
                      {p.title}
                    </Typography>
                  </Box>
                  <Typography variant="body1" sx={{ color: 'text.primary', flexGrow: 1, mb: 1 }}>
                    {p.shortDescription}
                  </Typography>
                  <KeywordChips keywords={p.keywords} />
                </PromptCardContent>
              </RouterLink>
          </PromptCard>
        </Grid>
      ))}
      {seeAllLink && (
        <Grid item xs={12} sm={6} md={4} lg={4} xl={4} key="see-all-prompts">
          <PromptCard sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 160, backgroundColor: COLORS.cardBgDark, boxShadow: 'none', border: 'none' }}>
            <RouterLink to={seeAllLink} style={{ display: 'flex', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', color: 'inherit' }} aria-label={seeAllLabel}>
              <IconButton aria-hidden disableRipple sx={{ borderRadius: 0, color: 'text.primary', '&:hover': { backgroundColor: 'transparent' } }}>
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
