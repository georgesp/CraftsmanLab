import * as React from 'react';
import { Container, Typography, Box, Card } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useTranslation } from 'react-i18next';
import { telerikTheme } from '../../theme/theme';
import { COLORS } from '../../styles/colors';
import { PAGE_SPACING } from '../../styles/spacing';
import { LazyTipCardsGrid } from '../../components/tips/tip-cards-grid-lazy';
import { PageLayout } from '../../components';
// Lazy-load the prompts grid to avoid importing import.meta-based registry in tests
const LazyPromptCardsGrid = React.lazy(() =>
  import('../../components/prompts/prompt-cards-grid').then((m) => ({
    default: m.PromptCardsGrid,
  }))
);

export const HomePage: React.FC = () => {
  const { t } = useTranslation('pages');
  
  return (
  <PageLayout>
        <Container
          maxWidth={false}
          disableGutters
          sx={{ px: 0, mx: 0, width: '100%', backgroundColor: COLORS.darkGreyBg }}
        >
      {/* Tips Section */}
      <Box sx={{ py: PAGE_SPACING.content.paddingY, width: '100%' }}>
        {/* <Typography
          variant="h6"
          align="left"
          color="text.secondary"
          sx={{ mb: 6, marginLeft: 3 }}
        >
          Au cours de mes missions, je me suis toujours dit que ce serait utile
          d'avoir un endroit avec de petits rappels.
          <br />
          Et parce que même avec l'IA, il faut valider des pull requests et ne
          pas oublier les fondamentaux.
        </Typography> */}
        <Box sx={{ px: { xs: 1, md: 2 }, mx: 0, width: '100%' }}>
          {(() => {
            const isTest =
              typeof globalThis.process !== 'undefined' &&
              globalThis.process?.env?.NODE_ENV === 'test';
            if (isTest) return null;
            return (
              <React.Suspense fallback={null}>
                <LazyTipCardsGrid maxItems={9} seeAllLink="/tips" />
              </React.Suspense>
            );
          })()}
        </Box>
      </Box>

      {/* Latest Prompts Preview */}
      <Box sx={{ px: 0, width: '100%' }}>
        <Card
          variant="outlined"
          sx={{
            backgroundColor: COLORS.darkGreyBg,
            mb: 0,
            borderLeft: 0,
            borderRight: 0,
            width: '100%',
          }}
        >
          {/* Arrow card intégrée dans la grille via seeAllLink */}
          <Typography
            variant="h4"
            align="left"
            sx={{ mt: 2, mb: 4, marginLeft: 3}}
          >
            {t('home.latestPrompts')}
          </Typography>
          <Box
            sx={{
              px: { xs: 0, md: 1 },
              marginBottom: 4,
              marginLeft: 1,
              marginRight: 1,
            }}
          >
            {(() => {
              const isTest =
                typeof globalThis.process !== 'undefined' &&
                globalThis.process?.env?.NODE_ENV === 'test';
              if (isTest) return null;
              return (
                <React.Suspense fallback={null}>
                  <LazyPromptCardsGrid
                    maxItems={6}
                    showMore={false}
                    seeAllLink="/prompts"
                  />
                </React.Suspense>
              );
            })()}
          </Box>
        </Card>
  </Box>
    </Container>
  </PageLayout>
);
};

HomePage.displayName = 'HomePage';
