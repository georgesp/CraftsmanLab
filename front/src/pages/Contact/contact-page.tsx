import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Box,
} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Email, Send } from '@mui/icons-material';
import { telerikTheme } from '../../theme/theme';
import { COLORS } from '../../styles/colors';
import { TYPOGRAPHY } from '../../styles/typography';
import { CONTACT_EMAIL } from '../../utils/constants';
import { Header, Footer } from '../../components';
import {
  ContactContainer,
  HeroSection,
  HeroSubtitle,
  SuccessAlert,
  ContactCard,
  ContactCardContent,
  SectionHeader,
  SectionDescription,
  SubmitButton,
  InfoCard,
  InfoCardContent,
  InfoTitle,
  InfoSection,
  InfoItemHeader,
  InfoItemDescription,
} from './styles';

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
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulation d'envoi du formulaire
    // eslint-disable-next-line no-console
    console.log('Formulaire soumis:', formData);
    setShowSuccess(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setShowSuccess(false), 5000);
  };

  return (
    <ThemeProvider theme={telerikTheme}>
      <CssBaseline />
      <Header />
      <Container maxWidth={false} disableGutters sx={{ px: 0, mx: 0, width: '100%' }}>
        <ContactContainer>
          {showSuccess && (
            <SuccessAlert severity="success">
              Votre message a été envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.
            </SuccessAlert>
          )}

          <Box sx={{ display: 'flex', gap: { xs: 0, md: 3 }, flexWrap: { xs: 'wrap', md: 'nowrap' }, alignItems: 'stretch', mb: 2, px: { xs: 2, md: 4 } }}>
            {/* Left column: Hero + Info cards */}
            <Box sx={{ flex: { xs: '1 1 100%', md: '0 0 50%' }, maxWidth: { xs: '100%', md: '50%' } }}>
              <HeroSection>
                <Typography variant="h2" gutterBottom sx={{ fontSize: TYPOGRAPHY.responsiveFontSizes.h2 }}>
                  Développeur Freelance .NET & IA
                </Typography>
                <HeroSubtitle variant="body1" gutterBottom align="left" color="text.secondary" sx={{ fontSize: TYPOGRAPHY.responsiveFontSizes.body1 }}>
                  Vous cherchez un développeur .NET expérimenté, avec des compétences en Intelligence Artificielle ?<br />
                  Ou vous aimeriez voir certaines choses ajoutées sur le site ?<br />
                  N'hésitez pas à me contacter pour discuter de vos besoins ou de vos projets !
                </HeroSubtitle>
              </HeroSection>

              <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 3 }}>
                <InfoCard>
                  <InfoCardContent>
                    <InfoTitle variant="h4" gutterBottom sx={{ mb: 3 }}>
                      Mes réseaux sociaux
                    </InfoTitle>
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
                  </InfoCardContent>
                </InfoCard>

                <InfoCard>
                  <InfoCardContent>
                    <InfoTitle variant="h4" gutterBottom sx={{ mb: 3 }}>
                      Mes coordonnées
                    </InfoTitle>
                    <InfoSection>
                      <InfoItemHeader>
                        <Email sx={{ mr: 2, color: COLORS.grey800, fontSize: 24 }} />
                        <Typography variant="h6" fontWeight="600">
                          Email
                        </Typography>
                      </InfoItemHeader>
                      <InfoItemDescription variant="body1" color="text.secondary">
                        <a
                          href={`mailto:${CONTACT_EMAIL}`}
                          style={{
                            color: 'inherit',
                            textDecoration: 'none',
                            transition: 'color 0.2s',
                          }}
                          onMouseOver={(e: any) => (e.currentTarget.style.color = COLORS.primaryBlue)}
                          onMouseOut={(e: any) => (e.currentTarget.style.color = 'inherit')}
                        >
                          {CONTACT_EMAIL}
                        </a>
                      </InfoItemDescription>
                    </InfoSection>
                  </InfoCardContent>
                </InfoCard>
              </Box>
            </Box>

            {/* Right column: Contact form */}
            <Box sx={{ flex: { xs: '1 1 100%', md: "0 0 calc(50%)" }, maxWidth: { xs: '100%', md: 'calc(50%)' }, display: 'flex' }}>
              <ContactCard sx={{ width: '100%', maxWidth: 'none' }}>
                <ContactCardContent>
                  <SectionHeader>
                    <Typography variant="h3">
                      Envoyez-moi un message
                    </Typography>
                  </SectionHeader>

                  <SectionDescription variant="body1" color="text.secondary">
                    Remplissez le formulaire ci-dessous et je vous répondrai rapidement.
                  </SectionDescription>

                  <Box component="form" onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
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
                      <Grid item xs={12}>
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
                        <SubmitButton
                          type="submit"
                          variant="contained"
                          size="large"
                          startIcon={<Send sx={{ color: COLORS.defaultBg }} />}
                        >
                          Envoyer le message
                        </SubmitButton>
                      </Grid>
                    </Grid>
                  </Box>
                </ContactCardContent>
              </ContactCard>
            </Box>
          </Box>
        </ContactContainer>
      </Container>
      <Footer />
    </ThemeProvider>
  );
};
