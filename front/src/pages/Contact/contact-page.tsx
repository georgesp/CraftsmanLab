import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  AppBar,
  Toolbar,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  Alert,
  Link as MuiLink
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { Email, Phone, LocationOn } from '@mui/icons-material';

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
    <>
      <AppBar position="static" sx={{ width: '100%', boxShadow: 2 }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 0, textAlign: 'left', pl: 1 }}>
            CraftsmanLab
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <MuiLink component={RouterLink} to="/" color="inherit" underline="hover">
              Accueil
            </MuiLink>
            <MuiLink component={RouterLink} to="/contact" color="inherit" underline="hover">
              Contact
            </MuiLink>
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <Typography variant="h2" component="h1" gutterBottom align="center">
            Contactez-nous
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom align="center" color="text.secondary">
            Nous sommes là pour répondre à vos questions
          </Typography>
        </Box>

        {showSuccess && (
          <Alert severity="success" sx={{ mb: 4 }}>
            Votre message a été envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.
          </Alert>
        )}

        <Grid container spacing={4}>
          {/* Formulaire de contact */}
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h4" component="h3" gutterBottom>
                  Envoyez-nous un message
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
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
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h4" component="h3" gutterBottom>
                  Nos coordonnées
                </Typography>
                <Box sx={{ mt: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Email sx={{ mr: 2, color: 'primary.main' }} />
                    <Box>
                      <Typography variant="subtitle1" fontWeight="bold">
                        Email
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        contact@craftsmanlab.com
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Phone sx={{ mr: 2, color: 'primary.main' }} />
                    <Box>
                      <Typography variant="subtitle1" fontWeight="bold">
                        Téléphone
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        +33 1 23 45 67 89
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <LocationOn sx={{ mr: 2, color: 'primary.main' }} />
                    <Box>
                      <Typography variant="subtitle1" fontWeight="bold">
                        Adresse
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        123 Rue de l'Innovation<br />
                        75001 Paris, France
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                <Box sx={{ mt: 4, p: 3, backgroundColor: '#f5f5f5', borderRadius: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    Horaires d'ouverture
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Lundi - Vendredi: 9h00 - 18h00<br />
                    Samedi: 10h00 - 16h00<br />
                    Dimanche: Fermé
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
