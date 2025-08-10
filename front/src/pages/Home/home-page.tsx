import React from 'react';
import { Container, Typography, Box, Grid, Card, CardContent, Chip, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { telerikTheme } from '../../theme/theme';
import { COLORS } from '../../utils/colors';
import { Download, Business, Speed, Security, Support, TrendingUp } from '@mui/icons-material';
import { Header } from '../../components';

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
            <Card sx={{ height: '100%', textAlign: 'center', p: 3 }}>
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
            <Card sx={{ height: '100%', textAlign: 'center', p: 3 }}>
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
            <Card sx={{ height: '100%', textAlign: 'center', p: 3 }}>
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
            <Card sx={{ height: '100%', textAlign: 'center', p: 3 }}>
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
            <Card sx={{ height: '100%', textAlign: 'center', p: 3 }}>
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
            <Card sx={{ height: '100%', textAlign: 'center', p: 3 }}>
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

      {/* Specialized Solutions Section */}
  <Box sx={{ py: 8, backgroundColor: COLORS.lightBlueBg, borderRadius: 4, my: 6 }}>
        <Container>
          <Typography variant="h2" component="h2" gutterBottom align="center" sx={{ mb: 2 }}>
            Solutions Spécialisées FinTech
          </Typography>
          <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 6, maxWidth: 700, mx: 'auto' }}>
            Découvrez nos outils spécialisés pour accélérer votre développement dans le secteur financier
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Chip label="API Banking" color="primary" size="small" sx={{ mb: 2 }} />
                  <Typography variant="h6" component="h3" gutterBottom>
                    API Bancaires Sécurisées
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Développement d'APIs REST conformes PCI-DSS avec authentification JWT et validation des transactions en temps réel.
                  </Typography>
                  <Button size="small" sx={{ mt: 'auto' }}>En savoir plus</Button>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Chip label="Conformité" color="secondary" size="small" sx={{ mb: 2 }} />
                  <Typography variant="h6" component="h3" gutterBottom>
                    Audit RGPD Automatisé
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Outils d'analyse automatique pour identifier les non-conformités RGPD et proposer des corrections pour la protection des données.
                  </Typography>
                  <Button size="small" sx={{ mt: 'auto' }}>En savoir plus</Button>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Chip label="Algorithmes" color="success" size="small" sx={{ mb: 2 }} />
                  <Typography variant="h6" component="h3" gutterBottom>
                    Calcul de Risque Financier
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Bibliothèques d'algorithmes avancés pour le calcul de risque de crédit, VaR et scoring client en temps réel.
                  </Typography>
                  <Button size="small" sx={{ mt: 'auto' }}>En savoir plus</Button>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Chip label="Tests" color="warning" size="small" sx={{ mb: 2 }} />
                  <Typography variant="h6" component="h3" gutterBottom>
                    Tests Automatisés FinTech
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Framework de tests spécialisé avec simulation de scénarios de marché et validation des transactions financières.
                  </Typography>
                  <Button size="small" sx={{ mt: 'auto' }}>En savoir plus</Button>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Chip label="Blockchain" color="info" size="small" sx={{ mb: 2 }} />
                  <Typography variant="h6" component="h3" gutterBottom>
                    Smart Contracts DeFi
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Développement de smart contracts Solidity pour protocoles DeFi avec gestion des garanties et liquidités.
                  </Typography>
                  <Button size="small" sx={{ mt: 'auto' }}>En savoir plus</Button>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Chip label="Sécurité" color="error" size="small" sx={{ mb: 2 }} />
                  <Typography variant="h6" component="h3" gutterBottom>
                    Audit de Sécurité
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Outils d'audit automatique pour applications de paiement avec détection de vulnérabilités et recommendations.
                  </Typography>
                  <Button size="small" sx={{ mt: 'auto' }}>En savoir plus</Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Trust Section */}
      <Box sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h2" component="h2" gutterBottom sx={{ mb: 2 }}>
          Faites Confiance aux Experts
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 6, maxWidth: 800, mx: 'auto' }}>
          Une qualité sans compromis grâce à 15 ans d'expérience dans l'aide à des millions de 
          développeurs pour créer des expériences utilisateur exceptionnelles pour des applications critiques.
        </Typography>
        
        <Grid container spacing={4} sx={{ mb: 6 }}>
          <Grid item xs={6} md={3}>
            <Typography variant="h3" sx={{ fontWeight: 'bold', color: COLORS.primaryBlue }}>
              275K+
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Clients
            </Typography>
          </Grid>
          <Grid item xs={6} md={3}>
            <Typography variant="h3" sx={{ fontWeight: 'bold', color: COLORS.primaryBlue }}>
              3.5M+
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Développeurs
            </Typography>
          </Grid>
          <Grid item xs={6} md={3}>
            <Typography variant="h3" sx={{ fontWeight: 'bold', color: COLORS.primaryBlue }}>
              400+
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Récompenses
            </Typography>
          </Grid>
          <Grid item xs={6} md={3}>
            <Typography variant="h3" sx={{ fontWeight: 'bold', color: COLORS.primaryBlue }}>
              15
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Années d'expertise
            </Typography>
          </Grid>
        </Grid>

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button
            variant="contained"
            size="large"
            startIcon={<Download />}
            sx={{ px: 4, py: 1.5 }}
          >
            Essai Gratuit de 30 Jours
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
          • Support technique gratuit pendant l'essai • Aucune carte de crédit requise
        </Typography>
      </Box>
    </Container>
  </ThemeProvider>
);

HomePage.displayName = 'HomePage';
