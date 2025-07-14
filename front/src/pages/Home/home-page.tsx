import React from 'react';
import { Container, Typography, Box, AppBar, Toolbar, Grid, Card, CardContent, Chip } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

export const HomePage: React.FC = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <AppBar position="static" sx={{ width: '100%', boxShadow: 2 }}>
      <Toolbar sx={{ justifyContent: 'flex-start' }}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 0, textAlign: 'left', pl: 1 }}>
          CraftsmanLab
        </Typography>
      </Toolbar>
    </AppBar>
    <Container maxWidth="lg">
      {/* Section principale de présentation */}
      <Box sx={{ my: 4 }}>
        <Typography variant="h2" component="h1" gutterBottom align="center">
          Bienvenue chez CraftsmanLab
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom align="center" color="text.secondary">
          Excellence en développement et innovation technologique
        </Typography>
      </Box>

      {/* Section description de l'entreprise dans un encadré bleu très clair */}
      <Box sx={{ my: 6, display: 'flex', justifyContent: 'center' }}>
        <Box sx={{
          backgroundColor: '#e3f2fd',
          borderRadius: 2,
          boxShadow: 1,
          p: 4,
          width: '100%',
          maxWidth: 800,
        }}>
          <Typography variant="h4" component="h2" gutterBottom align="center" sx={{ mb: 4 }}>
            Notre Expertise
          </Typography>
          <Typography variant="body1" paragraph align="center" sx={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
            CraftsmanLab est spécialisé dans le conseil et le développement informatique pour le secteur financier. 
            Nous accompagnons les entreprises dans leur transformation digitale en proposant des solutions sur mesure 
            adaptées aux enjeux spécifiques du domaine bancaire, des assurances et de la fintech.
          </Typography>
          <Typography variant="body1" paragraph align="center" sx={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
            Notre équipe d'experts maîtrise les technologies modernes et les réglementations financières pour 
            vous offrir des applications robustes, sécurisées et conformes aux standards du secteur.
          </Typography>
        </Box>
      </Box>

      {/* Section suggestions de prompts Copilot */}
      <Box sx={{ my: 6 }}>
        <Typography variant="h4" component="h2" gutterBottom align="center" sx={{ mb: 4 }}>
          Suggestions de Prompts Copilot
        </Typography>
        <Typography variant="body2" align="center" color="text.secondary" sx={{ mb: 4 }}>
          Découvrez comment Copilot peut vous aider dans vos projets de développement financier
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Chip label="API Banking" color="primary" size="small" sx={{ mb: 2 }} />
                <Typography variant="h6" component="h3" gutterBottom>
                  Développement d'API bancaire
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  "Créer une API REST sécurisée pour les transactions bancaires avec authentification JWT et validation des montants"
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Chip label="Conformité" color="secondary" size="small" sx={{ mb: 2 }} />
                <Typography variant="h6" component="h3" gutterBottom>
                  Audit de conformité RGPD
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  "Analyser ce code pour identifier les points de non-conformité RGPD et proposer des corrections pour la protection des données financières"
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Chip label="Algorithmes" color="success" size="small" sx={{ mb: 2 }} />
                <Typography variant="h6" component="h3" gutterBottom>
                  Calcul de risque financier
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  "Implémenter un algorithme de calcul de risque de crédit avec les métriques VaR et scoring client"
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Chip label="Tests" color="warning" size="small" sx={{ mb: 2 }} />
                <Typography variant="h6" component="h3" gutterBottom>
                  Tests automatisés fintech
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  "Générer des tests unitaires pour une application de trading avec simulation de scénarios de marché"
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Chip label="Blockchain" color="info" size="small" sx={{ mb: 2 }} />
                <Typography variant="h6" component="h3" gutterBottom>
                  Smart contracts DeFi
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  "Développer un smart contract Solidity pour un protocole de prêt décentralisé avec gestion des garanties"
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Chip label="Sécurité" color="error" size="small" sx={{ mb: 2 }} />
                <Typography variant="h6" component="h3" gutterBottom>
                  Audit de sécurité
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  "Effectuer un audit de sécurité sur cette application de paiement et identifier les vulnérabilités potentielles"
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  </ThemeProvider>
);

HomePage.displayName = 'HomePage';
