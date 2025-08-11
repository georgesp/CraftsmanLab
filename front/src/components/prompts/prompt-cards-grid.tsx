import React from 'react';
import { Grid, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { promptsList } from './registry';
import { COLORS } from '../../utils/colors';
import { PromptCard, PromptCardContent } from '../../pages/Prompts/styles';

type Props = {
  maxItems?: number;
  showMore?: boolean; // controls whether the 'more' entry is shown
};

export const PromptCardsGrid: React.FC<Props> = ({ maxItems, showMore = true }) => {
  const items = React.useMemo(() => {
    let list = promptsList;
    if (!showMore) {
      list = list.filter(p => p.slug !== 'more');
    }
    if (maxItems && maxItems > 0) {
      return list.slice(0, maxItems);
    }
    return list;
  }, [maxItems, showMore]);

  return (
    <Grid container spacing={4}>
      {items.map(p => (
        <Grid item xs={12} md={6} lg={4} key={p.slug}>
          <PromptCard>
            {p.slug === 'more' ? (
              <PromptCardContent style={{ height: '100%', cursor: 'default' }}>
                <Typography variant="h5" component="h3" gutterBottom>
                  {p.title}
                </Typography>
                <Typography variant="body1" sx={{ color: COLORS.grey800 }}>
                  {p.shortDescription}
                </Typography>
              </PromptCardContent>
            ) : (
              <RouterLink to={`/prompts/${p.slug}`} style={{ display: 'block', height: '100%', color: 'inherit', textDecoration: 'none' }}>
                <PromptCardContent>
                  <Typography variant="h5" component="h3" gutterBottom>
                    {p.title}
                  </Typography>
                  <Typography variant="body1" sx={{ color: COLORS.grey800 }}>
                    {p.shortDescription}
                  </Typography>
                </PromptCardContent>
              </RouterLink>
            )}
          </PromptCard>
        </Grid>
      ))}
    </Grid>
  );
};

PromptCardsGrid.displayName = 'PromptCardsGrid';
