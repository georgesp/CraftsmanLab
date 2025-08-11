import * as React from 'react';
import { Container, Typography, Box, Grid, Card, Button, IconButton, Tooltip } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { telerikTheme } from '../../theme/theme';
import { COLORS } from '../../utils/colors';
import { Download, Business, Speed, Security, Support, TrendingUp, ArrowForward } from '@mui/icons-material';
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
      {/* Hero Section */}
      <Box sx={{ 
        textAlign: 'center', 
        py: { xs: 8, md: 12 },
        background: `linear-gradient(135deg, ${COLORS.lightRedBg} 0%, ${COLORS.lightBlueBg} 100%)`,
        borderRadius: 1,
        my: 4
      }}>
        <Typography variant="h1" component="h1" gutterBottom sx={{ mb: 3 }}>
          Excellence en Développement Financier
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 4, maxWidth: 800, mx: 'auto' }}>
          Accélérez votre développement avec la suite d'outils la plus complète pour le secteur financier. 
          Solutions sur mesure incluses.
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button
            variant="contained"
            size="large"
            startIcon={<Download />}
            sx={{ px: 4, py: 1.5 }}
          >
            Essai Gratuit
          </Button>
          <Button
            component={RouterLink}
            to="/contact"
            variant="outlined"
            size="large"
            sx={{ px: 4, py: 1.5 }}
          >
            Contactez-nous
          </Button>
        </Box>
        <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>
          • Aucune carte de crédit requise • Support technique inclus
        </Typography>
      </Box>

      {/* Key Benefits Section */}
      <Box sx={{ py: 8 }}>
        <Typography variant="h2" component="h2" gutterBottom align="center" sx={{ mb: 2 }}>
          Avantages Clés
        </Typography>
        <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 6, maxWidth: 600, mx: 'auto' }}>
          Optimisez votre processus de développement avec nos solutions spécialisées
        </Typography>
        
        <Grid container spacing={4}>
          <Grid item xs={12} md={6} lg={4}>
            <Card sx={{ height: '100%', textAlign: 'center', p: 3, borderRadius: 1 }}>
              <Business sx={{ fontSize: 60, color: COLORS.primaryBlue, mb: 2 }} />
              <Typography variant="h5" component="h3" gutterBottom>
                Solution Complète
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Plus de 1000+ composants .NET et JavaScript pour créer des applications financières 
                professionnelles en moins de temps.
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Card sx={{ height: '100%', textAlign: 'center', p: 3, borderRadius: 1 }}>
              <Speed sx={{ fontSize: 60, color: COLORS.primaryBlue, mb: 2 }} />
              <Typography variant="h5" component="h3" gutterBottom>
                Productivité Inégalée
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Réduisez jusqu'à 50% votre temps de développement avec nos outils optimisés 
                pour le secteur financier.
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Card sx={{ height: '100%', textAlign: 'center', p: 3, borderRadius: 1 }}>
              <Security sx={{ fontSize: 60, color: COLORS.primaryBlue, mb: 2 }} />
              <Typography variant="h5" component="h3" gutterBottom>
                Sécurité Avancée
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Solutions conformes aux réglementations financières avec sécurité 
                intégrée et audit complet.
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Card sx={{ height: '100%', textAlign: 'center', p: 3, borderRadius: 1 }}>
              <Support sx={{ fontSize: 60, color: COLORS.primaryBlue, mb: 2 }} />
              <Typography variant="h5" component="h3" gutterBottom>
                Support Expert
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Bénéficiez d'un support technique de classe mondiale et de documentation 
                complète pendant votre période d'essai.
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Card sx={{ height: '100%', textAlign: 'center', p: 3, borderRadius: 1 }}>
              <TrendingUp sx={{ fontSize: 60, color: COLORS.primaryBlue, mb: 2 }} />
              <Typography variant="h5" component="h3" gutterBottom>
                ROI Optimisé
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Modèles de licence flexibles et évolutifs pour améliorer votre retour 
                sur investissement.
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Card sx={{ height: '100%', textAlign: 'center', p: 3, borderRadius: 1 }}>
              <Business sx={{ fontSize: 60, color: COLORS.primaryRed, mb: 2 }} />
              <Typography variant="h5" component="h3" gutterBottom>
                Modernisation
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Innovez et migrez vos applications legacy vers des frameworks modernes 
                dans les délais et budgets.
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Specialized Solutions Section -> Latest Prompts Preview */}
      <Box>
        <Card variant="outlined" sx={{ p: { xs: 2, md: 4 }, borderRadius: 1, backgroundColor: COLORS.lightBlueBg, maxWidth: 1200, mx: 'auto', position: 'relative' }}>
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
