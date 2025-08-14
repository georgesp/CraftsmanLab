import * as React from 'react';
import { Container, Typography, Box, Card } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { telerikTheme } from '../../theme/theme';
import { COLORS } from '../../utils/colors';
import { LazyTipCardsGrid } from '../../components/tips/tip-cards-grid-lazy';
import { Header, Footer } from '../../components';
// Lazy-load the prompts grid to avoid importing import.meta-based registry in tests
const LazyPromptCardsGrid = React.lazy(() =>
  import('../../components/prompts/prompt-cards-grid').then((m) => ({ default: m.PromptCardsGrid }))
);

export const HomePage: React.FC = () => (
  <ThemeProvider theme={telerikTheme}>
    <CssBaseline />
    <Header />

    <Container maxWidth={false} disableGutters sx={{ px: 0, mx: 0, width: '100%' }}>

      {/* Tips Section */}
      <Box sx={{ py: 8, width: '100%'}}>
        <Typography variant="h6" align="left" color="text.secondary" sx={{ mb: 6, marginLeft: 3}}>
          Au cours de mes missions, je me suis toujours dit que ça serait utile d'avoir un endoit avec les petits rappels.<br />
          Et parce que même avec l'IA il faut valider des pull requests et ne pas oublier ses classiques.
        </Typography>
        <Box sx={{ px: 0, mx: 0, width: '100%'}}>
          {/* Arrow card intégrée dans la grille via seeAllLink */}
          <Box sx={{ px: { xs: 0, md: 1 }, marginLeft: 1, marginRight: 1  }}>
            {(() => {
              const isTest = typeof globalThis.process !== 'undefined' && globalThis.process?.env?.NODE_ENV === 'test';
              if (isTest) return null;
              return (
                <React.Suspense fallback={null}>
                  <LazyTipCardsGrid maxItems={9} seeAllLink="/tips" />
                </React.Suspense>
              );
            })()}
          </Box>
        </Box>
      </Box>

      {/* Latest Prompts Preview */}
      <Box sx={{ px: 0, width: '100%'}}>
        <Card variant="outlined" sx={{ backgroundColor: COLORS.darkGreyBg, mb: 6, borderLeft: 0, borderRight: 0, borderRadius: '12px', width: '100%' }}>
          {/* Arrow card intégrée dans la grille via seeAllLink */}
          <Typography variant="h6" align="left" sx={{ mt: 2, mb: 4 , marginLeft: 3, color: COLORS.dividerLight }}>
            Un aperçu des derniers prompts publiés
          </Typography>
          <Box sx={{ px: { xs: 0, md: 1 }, marginBottom: 4, marginLeft: 1, marginRight: 1 }}>
            {(() => {
              const isTest = typeof globalThis.process !== 'undefined' && globalThis.process?.env?.NODE_ENV === 'test';
              if (isTest) return null;
              return (
                <React.Suspense fallback={null}>
                  <LazyPromptCardsGrid maxItems={6} showMore={false} seeAllLink="/prompts" />
                </React.Suspense>
              );
            })()}
          </Box>
        </Card>
      </Box>
    </Container>
    <Footer />
  </ThemeProvider>
);

HomePage.displayName = 'HomePage';
