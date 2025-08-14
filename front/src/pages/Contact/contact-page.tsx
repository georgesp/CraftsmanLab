import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  Alert
} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Email, Send } from '@mui/icons-material';
import { telerikTheme } from '../../theme/theme';
import { COLORS } from '../../utils/colors';
import { CONTACT_EMAIL } from '../../utils/constants';
import { Header, Footer } from '../../components';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulation d'envoi du formulaire
    console.log('Formulaire soumis:', formData);
    setShowSuccess(true);
    // Réinitialiser le formulaire
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    // Masquer le message de succès après 5 secondes
    setTimeout(() => setShowSuccess(false), 5000);
  };

  return (
    <ThemeProvider theme={telerikTheme}>
      <CssBaseline />
      <Header />

      <Container maxWidth="lg">
        {/* Hero Section */}
        <Box sx={{ 
          textAlign: 'left', 
          py: { xs: 1.5, md: 2 },
          background: 'linear-gradient(135deg, rgba(255, 99, 88, 0.05) 0%, rgba(64, 224, 208, 0.05) 100%)',
          borderRadius: 1,
          my: 2
        }}>
          <Typography variant="h2" component="h1" gutterBottom sx={{ fontSize: { xs: '1.6rem', md: '2.2rem' } }}>
            Développeur Freelance .NET & IA
          </Typography>
          <Typography variant="body1" component="h2" gutterBottom color="text.secondary" sx={{ maxWidth: 1100, mx: 'auto', fontSize: { xs: '1rem', md: '1.15rem' } }}>
            Vous cherchez un développeur .NET expérimenté, avec des compétences en Intelligence Artificielle ?<br />
            N'hésitez pas à me contacter pour discuter de vos besoins ou de vos projets !
          </Typography>
        </Box>

        {showSuccess && (
          <Alert 
            severity="success" 
            sx={{ 
              mb: 4, 
              borderRadius: 2,
              '& .MuiAlert-message': {
                fontSize: '1rem'
              }
            }}
          >
            Votre message a été envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.
          </Alert>
        )}

        <Grid container spacing={4} sx={{ mb: 8 }}>
          {/* Formulaire de contact */}
          <Grid item xs={12} lg={8}>
            <Card sx={{ borderRadius: 1, boxShadow: 3 }}>
              <CardContent sx={{ p: { xs: 3, md: 5 } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Send sx={{ mr: 2, color: 'primary.main', fontSize: 32 }} />
                  <Typography variant="h3" component="h2">
                    Envoyez-nous un message
                  </Typography>
                </Box>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                  Remplissez le formulaire ci-dessous et nous vous répondrons rapidement.
                </Typography>
                
                <Box component="form" onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Nom complet"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Sujet"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Message"
                        name="message"
                        multiline
                        rows={6}
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        startIcon={<Send />}
                        sx={{ px: 4, py: 1.5 }}
                      >
                        Envoyer le message
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Informations de contact */}
          <Grid item xs={12} lg={4}>
            <Grid container spacing={3}>
              {/* Réseaux sociaux */}
              <Grid item xs={12}>
                <Card sx={{ borderRadius: 1, mb: 3 }}>
                  <CardContent sx={{ p: 4 }}>
                    <Typography variant="h4" component="h3" gutterBottom sx={{ mb: 3 }}>
                      Mes réseaux sociaux
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 3 }}>
                      <Button
                        component="a"
                        href="https://www.malt.fr/profile/georgesportier"
                        target="_blank"
                        rel="noopener noreferrer"
                        startIcon={
                          <img src="/malt.png" alt="Malt" style={{ width: 28, height: 28, borderRadius: '50%' }} />
                        }
                        sx={{
                          color: COLORS.primaryRed,
                          borderColor: COLORS.primaryRed,
                          borderWidth: 2,
                          borderStyle: 'solid',
                          borderRadius: 2,
                          px: 2,
                          py: 1,
                          fontWeight: 600,
                          textTransform: 'none',
                          '&:hover': {
                            background: COLORS.lightRedBg,
                            borderColor: COLORS.primaryRed,
                          },
                        }}
                      >
                        Malt
                      </Button>
                      <Button
                        component="a"
                        href="https://www.linkedin.com/in/georgesportier/"
                        target="_blank"
                        rel="noopener noreferrer"
                        startIcon={
                          <img src="/linkedin.png" alt="LinkedIn" style={{ width: 28, height: 28, borderRadius: '50%' }} />
                        }
                        sx={{
                          color: COLORS.primaryBlue,
                          borderColor: COLORS.primaryBlue,
                          borderWidth: 2,
                          borderStyle: 'solid',
                          borderRadius: 2,
                          px: 2,
                          py: 1,
                          fontWeight: 600,
                          textTransform: 'none',
                          '&:hover': {
                            background: COLORS.lightBlueBg,
                            borderColor: COLORS.primaryBlue,
                          },
                        }}
                      >
                        LinkedIn
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              {/* Coordonnées */}
              <Grid item xs={12}>
                <Card sx={{ borderRadius: 1 }}>
                  <CardContent sx={{ p: 4 }}>
                    <Typography variant="h4" component="h3" gutterBottom sx={{ mb: 3 }}>
                      Mes coordonnées
                    </Typography>
                    
                    <Box sx={{ mb: 3 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Email sx={{ mr: 2, color: 'primary.main', fontSize: 24 }} />
                        <Typography variant="h6" fontWeight="600">
                          Email
                        </Typography>
                      </Box>
                      <Typography variant="body1" color="text.secondary" sx={{ ml: 4 }}>
                        <a
                          href={`mailto:${CONTACT_EMAIL}`}
                          style={{
                            color: 'inherit',
                            textDecoration: 'none',
                            transition: 'color 0.2s',
                          }}
                          onMouseOver={e => (e.currentTarget.style.color = COLORS.primaryBlue)}
                          onMouseOut={e => (e.currentTarget.style.color = 'inherit')}
                        >
                          {CONTACT_EMAIL}
                        </a>
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
  </Container>
  <Footer />
    </ThemeProvider>
  );
};
