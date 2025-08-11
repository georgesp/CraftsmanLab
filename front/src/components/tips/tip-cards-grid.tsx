import React from 'react';
import { Grid, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { tipsList } from './registry';
import { COLORS } from '../../utils/colors';
import { PromptCard, PromptCardContent } from '../../pages/Prompts/styles';


type Props = {
  maxItems?: number;
};

export const TipCardsGrid: React.FC<Props> = ({ maxItems }) => {
  const items = React.useMemo(() => {
    if (maxItems && maxItems > 0) {
      return tipsList.slice(0, maxItems);
    }
    return tipsList;
  }, [maxItems]);

  return (
    <Grid container spacing={4}>
      {items.map(t => (
        <Grid item xs={12} md={6} lg={4} key={t.slug}>
          <PromptCard>
            <RouterLink to={`/tips/${t.slug}`} style={{ display: 'block', height: '100%', color: 'inherit', textDecoration: 'none' }}>
              <PromptCardContent>
                <Typography variant="h5" component="h3" gutterBottom>
                  {t.title}
                </Typography>
                <Typography variant="body1" sx={{ color: COLORS.grey800 }}>
                  {t.shortDescription}
                </Typography>
              </PromptCardContent>
            </RouterLink>
          </PromptCard>
        </Grid>
      ))}
    </Grid>
  );
};

TipCardsGrid.displayName = 'TipCardsGrid';
