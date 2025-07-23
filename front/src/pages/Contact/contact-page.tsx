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
import { Email, Phone, LocationOn, AccessTime, Send } from '@mui/icons-material';
import { telerikTheme } from '../../theme/theme';
import { Header } from '../../components';

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
          textAlign: 'center', 
          py: { xs: 6, md: 8 },
          background: 'linear-gradient(135deg, rgba(255, 99, 88, 0.05) 0%, rgba(64, 224, 208, 0.05) 100%)',
          borderRadius: 4,
          my: 4
        }}>
          <Typography variant="h1" component="h1" gutterBottom>
            Contactez-nous
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
            Nous sommes là pour répondre à vos questions et vous accompagner dans vos projets
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
            <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
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
              {/* Coordonnées */}
              <Grid item xs={12}>
                <Card sx={{ borderRadius: 3 }}>
                  <CardContent sx={{ p: 4 }}>
                    <Typography variant="h4" component="h3" gutterBottom sx={{ mb: 3 }}>
                      Nos coordonnées
                    </Typography>
                    
                    <Box sx={{ mb: 3 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Email sx={{ mr: 2, color: 'primary.main', fontSize: 24 }} />
                        <Typography variant="h6" fontWeight="600">
                          Email
                        </Typography>
                      </Box>
                      <Typography variant="body1" color="text.secondary" sx={{ ml: 4 }}>
                        contact@craftsmanlab.com
                      </Typography>
                    </Box>
                    
                    <Box sx={{ mb: 3 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Phone sx={{ mr: 2, color: 'primary.main', fontSize: 24 }} />
                        <Typography variant="h6" fontWeight="600">
                          Téléphone
                        </Typography>
                      </Box>
                      <Typography variant="body1" color="text.secondary" sx={{ ml: 4 }}>
                        +33 1 23 45 67 89
                      </Typography>
                    </Box>
                    
                    <Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <LocationOn sx={{ mr: 2, color: 'primary.main', fontSize: 24 }} />
                        <Typography variant="h6" fontWeight="600">
                          Adresse
                        </Typography>
                      </Box>
                      <Typography variant="body1" color="text.secondary" sx={{ ml: 4 }}>
                        123 Rue de l'Innovation<br />
                        75001 Paris, France
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              {/* Horaires */}
              <Grid item xs={12}>
                <Card sx={{ borderRadius: 3, background: 'linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%)' }}>
                  <CardContent sx={{ p: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                      <AccessTime sx={{ mr: 2, color: 'primary.main', fontSize: 24 }} />
                      <Typography variant="h5" fontWeight="600">
                        Horaires d'ouverture
                      </Typography>
                    </Box>
                    <Box sx={{ space: 1 }}>
                      <Typography variant="body1" sx={{ mb: 1 }}>
                        <strong>Lundi - Vendredi:</strong> 9h00 - 18h00
                      </Typography>
                      <Typography variant="body1" sx={{ mb: 1 }}>
                        <strong>Samedi:</strong> 10h00 - 16h00
                      </Typography>
                      <Typography variant="body1">
                        <strong>Dimanche:</strong> Fermé
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {/* Section d'appel à l'action */}
        <Box sx={{ 
          textAlign: 'center', 
          py: 6,
          background: 'linear-gradient(135deg, rgba(255, 99, 88, 0.05) 0%, rgba(64, 224, 208, 0.05) 100%)',
          borderRadius: 4,
          mb: 4
        }}>
          <Typography variant="h3" component="h2" gutterBottom>
            Prêt à démarrer votre projet ?
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}>
            Découvrez comment nos solutions peuvent transformer votre développement financier
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{ px: 4, py: 1.5, mr: 2 }}
          >
            Essai Gratuit
          </Button>
          <Button
            variant="outlined"
            size="large"
            sx={{ px: 4, py: 1.5 }}
          >
            Voir nos Solutions
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
