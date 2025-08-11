import * as React from 'react';
import { Container, Typography, Box, Grid, Card, Button, IconButton, Tooltip } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { telerikTheme } from '../../theme/theme';
import { COLORS } from '../../utils/colors';
import { Download, Business, Speed, Security, Support, TrendingUp, ArrowForward } from '@mui/icons-material';
import { LazyTipCardsGrid } from '../../components/tips/tip-cards-grid-lazy';
import { Header } from '../../components';
// Lazy-load the prompts grid to avoid importing import.meta-based registry in tests
const LazyPromptCardsGrid = React.lazy(() =>
  import('../../components/prompts/prompt-cards-grid').then((m) => ({ default: m.PromptCardsGrid }))
);


export const HomePage: React.FC = () => (
  <ThemeProvider theme={telerikTheme}>
    <CssBaseline />
    <Header />

    <Container maxWidth="lg">

      {/* Tips Section */}
      <Box sx={{ py: 8 }}>
        <Typography variant="h2" component="h2" gutterBottom align="center" sx={{ mb: 2 }}>
          Tips / Rappels
        </Typography>
        <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 6, maxWidth: 1200, mx: 'auto' }}>
          Au cours de mes missions, je me suis toujours dit que ça serait utile d'avoir un endoit avec les petits rappels qui nous manquent de temps en temps.<br />
          Et parce que même avec l'IA il faut valider des pull requests et ne pas oublier ses classiques.
        </Typography>
        <Box sx={{ maxWidth: 1200, mx: 'auto', position: 'relative' }}>
          <Tooltip title="Voir tous les tips">
            <IconButton
              component={RouterLink}
              to="/tips"
              color="primary"
              sx={{ position: 'absolute', top: 0, right: 0, zIndex: 1, bgcolor: 'background.paper', boxShadow: 1 }}
              size="medium"
              aria-label="Voir tous les tips"
            >
              <ArrowForward fontSize="inherit" />
            </IconButton>
          </Tooltip>
          <Box sx={{ px: { xs: 0, md: 1 } }}>
            {(() => {
              const isTest = typeof globalThis.process !== 'undefined' && globalThis.process?.env?.NODE_ENV === 'test';
              if (isTest) return null;
              return (
                <React.Suspense fallback={null}>
                  <LazyTipCardsGrid maxItems={9} />
                </React.Suspense>
              );
            })()}
          </Box>
        </Box>
      </Box>


      {/* Latest Prompts Preview */}
      <Box>
        <Card variant="outlined" sx={{ p: { xs: 2, md: 4 }, borderRadius: 1, backgroundColor: COLORS.lightBlueBg, maxWidth: 1200, mx: 'auto', position: 'relative', mb: 6 }}>
          <Tooltip title="Voir tous les prompts">
            <IconButton
              component={RouterLink}
              to="/prompts"
              color="primary"
              sx={{ position: 'absolute', top: 16, right: 16, zIndex: 1, bgcolor: 'background.paper', boxShadow: 1 }}
              size="medium"
              aria-label="Voir tous les prompts"
            >
              <ArrowForward fontSize="inherit" />
            </IconButton>
          </Tooltip>
          <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 4, maxWidth: 700, mx: 'auto' }}>
            Un aperçu des derniers prompts publiés
          </Typography>
          <Box sx={{ px: { xs: 0, md: 1 } }}>
            {(() => {
              const isTest = typeof globalThis.process !== 'undefined' && globalThis.process?.env?.NODE_ENV === 'test';
              if (isTest) return null;
              return (
                <React.Suspense fallback={null}>
                  <LazyPromptCardsGrid maxItems={6} showMore={false} />
                </React.Suspense>
              );
            })()}
          </Box>
        </Card>
      </Box>


    </Container>
  </ThemeProvider>
);

HomePage.displayName = 'HomePage';
