import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Box,
  CircularProgress,
} from '@mui/material';
import { Email, Send } from '@mui/icons-material';
import { COLORS } from '../../styles/colors';
import { TYPOGRAPHY } from '../../styles/typography';
import { CONTACT_EMAIL } from '../../utils/constants';
import { PageLayout } from '../../components';
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
  const { t } = useTranslation(['pages', 'common']);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    (async () => {
      try {
        setIsLoading(true);
        
        // Configuration pour l'envoi du mail
        // Utiliser l'endpoint Azure Functions
        const apiUrl = '/api/send-email';
        
        const res = await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        // Minimal status log kept for quick visibility
        console.log('Réponse reçue - Status:', res.status);

        if (!res.ok) {
          const err = await res.text();
          // eslint-disable-next-line no-console
          console.error('Erreur envoi formulaire - Status:', res.status);
          console.error('Erreur envoi formulaire - Body:', err);
          // show a simple alert for now
          // eslint-disable-next-line no-alert
          alert(`Une erreur est survenue lors de l'envoi (${res.status}): ${err}`);
          return;
        }

        await res.json();

        setShowSuccess(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setShowSuccess(false), 5000);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Erreur envoi formulaire:', error);
        // eslint-disable-next-line no-alert
        alert('Impossible de contacter le serveur d\'envoi.');
      } finally {
        setIsLoading(false);
      }
    })();
  };

  return (
  <PageLayout>
      <Container maxWidth={false} disableGutters sx={{ px: 0, mx: 0, width: '100%' }}>
            <ContactContainer>
          {showSuccess && (
            <SuccessAlert severity="success">
              {t('contact.successMessage')}
            </SuccessAlert>
          )}

          <Box sx={{ display: 'flex', gap: { xs: 0, md: 3 }, flexWrap: { xs: 'wrap', md: 'nowrap' }, alignItems: 'stretch', mb: 2, px: { xs: 2, md: 4 } }}>
            {/* Left column: Hero + Info cards */}
            <Box sx={{ flex: { xs: '1 1 100%', md: '0 0 50%' }, maxWidth: { xs: '100%', md: '50%' } }}>
              <HeroSection>
                <Typography variant="h2" gutterBottom sx={{ fontSize: TYPOGRAPHY.responsiveFontSizes.h2 }}>
                  {t('contact.title')}
                </Typography>
                <HeroSubtitle variant="body1" gutterBottom align="left" color="text.secondary" sx={{ fontSize: TYPOGRAPHY.responsiveFontSizes.body1 }}>
                  <span dangerouslySetInnerHTML={{ __html: t('contact.subtitle') }} />
                </HeroSubtitle>
              </HeroSection>

              <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 3 }}>
                <InfoCard>
                  <InfoCardContent>
                    <InfoTitle variant="h4" gutterBottom sx={{ mb: 3 }}>
                      {t('contact.socialNetworks')}
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
                          color: COLORS.maltRed,
                          borderColor: COLORS.maltRed,
                          borderWidth: 2,
                          borderStyle: 'solid',
                          px: 2,
                          py: 1,
                          fontWeight: 600,
                          textTransform: 'none',
                          '&:hover': {
                            background: COLORS.maltlightRed,
                            borderColor: COLORS.maltRed,
                            color: COLORS.maltRed,
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
                          color: COLORS.linkedInBlue,
                          borderColor: COLORS.linkedInBlue,
                          borderWidth: 2,
                          borderStyle: 'solid',
                          px: 2,
                          py: 1,
                          fontWeight: 600,
                          textTransform: 'none',
                          '&:hover': {
                            background: COLORS.linkedInlightBlue,
                            borderColor: COLORS.linkedInBlue,
                            color: COLORS.linkedInBlue,
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
                      {t('contact.infoTitle')}
                    </InfoTitle>
                    <InfoSection>
                      <InfoItemHeader>
                        <Email sx={{ mr: 2, color: COLORS.darkTheme.textOnDark, fontSize: 24 }} />
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
                          onMouseOver={(e: any) => (e.currentTarget.style.color = COLORS.white)}
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
                      {t('contact.sendMessage')}
                    </Typography>
                  </SectionHeader>

                  <SectionDescription variant="body1" color="text.secondary">
                    {t('contact.formDescription')}
                  </SectionDescription>

                  <Box component="form" onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label={t('contact.form.fullName')}
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          variant="outlined"
                          disabled={isLoading}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              '& .MuiOutlinedInput-notchedOutline': { borderColor: COLORS.darkTheme.inputContactBorder },
                              '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: COLORS.darkTheme.inputContactBorder },
                              '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: COLORS.darkTheme.inputContactBorder, borderWidth: '2px' },
                            },
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label={t('contact.form.email')}
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          variant="outlined"
                          disabled={isLoading}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              '& .MuiOutlinedInput-notchedOutline': { borderColor: COLORS.darkTheme.inputContactBorder },
                              '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: COLORS.darkTheme.inputContactBorder },
                              '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: COLORS.darkTheme.inputContactBorder, borderWidth: '2px' },
                            },
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label={t('contact.form.subject')}
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          required
                          variant="outlined"
                          disabled={isLoading}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              '& .MuiOutlinedInput-notchedOutline': { borderColor: COLORS.darkTheme.inputContactBorder },
                              '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: COLORS.darkTheme.inputContactBorder },
                              '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: COLORS.darkTheme.inputContactBorder, borderWidth: '2px' },
                            },
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label={t('contact.form.message')}
                          name="message"
                          multiline
                          rows={6}
                          value={formData.message}
                          onChange={handleInputChange}
                          required
                          variant="outlined"
                          disabled={isLoading}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              '& .MuiOutlinedInput-notchedOutline': { borderColor: COLORS.darkTheme.inputContactBorder },
                              '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: COLORS.darkTheme.inputContactBorder },
                              '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: COLORS.darkTheme.inputContactBorder, borderWidth: '2px' },
                            },
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <SubmitButton
                          type="submit"
                          variant="contained"
                          size="large"
                          disabled={isLoading}
                          startIcon={
                            isLoading ? (
                              <CircularProgress size={20} sx={{ color: COLORS.defaultBg }} />
                            ) : (
                              <Send sx={{ color: COLORS.defaultBg }} />
                            )
                          }
                        >
                          {isLoading ? t('common:buttons.send') + '...' : t('common:buttons.submit')}
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
    </PageLayout>
  );
};
