import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, Snackbar, Alert } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import NorthEastIcon from '@mui/icons-material/NorthEast';
import { useTranslation } from 'react-i18next';
import { PageLayout, ScrollToTopButton } from '../../components';
import { AtelierContainer } from '../../components/atelier';
import { COLORS, TYPOGRAPHY } from '../../styles';
import { CONTACT_EMAIL } from '../../utils/constants';

export const ContactPage: React.FC = () => {
  const { t } = useTranslation(['pages', 'common']);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [honeypot, setHoneypot] = useState('');
  const COOLDOWN_SECONDS = 30;
  const [lastSentAt, setLastSentAt] = useState<number | null>(null);
  const [, setCooldownRemaining] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'website') {
      setHoneypot(value);
      return;
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    (async () => {
      try {
        if (honeypot && honeypot.trim() !== '') {
          console.warn('Honeypot filled - possible bot submission, ignoring.');
          return;
        }
        if (lastSentAt && Date.now() - lastSentAt < COOLDOWN_SECONDS * 1000) {
          const remaining = Math.ceil((COOLDOWN_SECONDS * 1000 - (Date.now() - lastSentAt)) / 1000);
          alert(`Veuillez patienter ${remaining} secondes avant d'envoyer un autre message.`);
          return;
        }
        setIsLoading(true);
        const res = await fetch('/api/send-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        if (!res.ok) {
          const err = await res.text();
          console.error('Erreur envoi formulaire - Status:', res.status);
          alert(`Une erreur est survenue lors de l'envoi (${res.status}): ${err}`);
          return;
        }
        await res.json();
        setLastSentAt(Date.now());
        setShowSuccess(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setShowSuccess(false), 5000);
      } catch (error) {
        console.error('Erreur envoi formulaire:', error);
        alert("Impossible de contacter le serveur d'envoi.");
      } finally {
        setIsLoading(false);
      }
    })();
  };

  useEffect(() => {
    if (!lastSentAt) {
      setCooldownRemaining(0);
      return undefined;
    }
    const tick = () => {
      const elapsed = Math.floor((Date.now() - lastSentAt) / 1000);
      const remaining = Math.max(0, COOLDOWN_SECONDS - elapsed);
      setCooldownRemaining(remaining);
      if (remaining <= 0) setLastSentAt(null);
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [lastSentAt]);

  const networks = [
    {
      key: 'linkedin',
      href: 'https://www.linkedin.com/in/georgesportier/',
      logo: '/linkedin.png',
      name: 'LinkedIn',
      sub: t('contact.linkedinSub', { defaultValue: '' }),
      color: COLORS.atelier.linkedin,
    },
    {
      key: 'malt',
      href: 'https://www.malt.fr/profile/georgesportier',
      logo: '/malt.png',
      name: 'Malt',
      sub: t('contact.maltSub', { defaultValue: '' }),
      color: COLORS.atelier.malt,
    },
    {
      key: 'email',
      href: `mailto:${CONTACT_EMAIL}`,
      logo: null,
      name: CONTACT_EMAIL,
      sub: t('contact.emailSub', { defaultValue: '' }),
      color: COLORS.atelier.tips,
    },
  ];

  return (
    <PageLayout>
      <AtelierContainer>
        {/* Bandeau */}
        <Box component="section" sx={{ px: { xs: 2.5, md: '46px' }, pt: { xs: 4, md: '46px' }, pb: 1 }}>
          <Box
            sx={{
              fontFamily: TYPOGRAPHY.fontFamilies.mono,
              fontSize: '12px',
              letterSpacing: '.08em',
              color: COLORS.atelier.tips,
              mb: 1,
            }}
          >
            {t('contact.eyebrow', { defaultValue: '// contact' })}
          </Box>
          <Typography
            component="h1"
            sx={{
              fontFamily: TYPOGRAPHY.fontFamilies.display,
              fontWeight: 800,
              fontSize: { xs: '32px', md: '44px' },
              letterSpacing: '-0.03em',
              lineHeight: 1.05,
              m: 0,
              color: COLORS.atelier.textStrong,
            }}
          >
            {t('contact.bandTitle', { defaultValue: 'Développeur freelance .NET & IA' })}
          </Typography>
          <Typography sx={{ mt: '8px', fontSize: '15.5px', color: COLORS.atelier.textBodyAlt, maxWidth: 640 }}>
            {t('contact.bandSubtitle', { defaultValue: '' })}
          </Typography>
        </Box>

        {/* Grille formulaire / aside */}
        <Box
          component="section"
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1.15fr 0.85fr' },
            gap: '28px',
            px: { xs: 2.5, md: '46px' },
            pt: '26px',
            pb: '60px',
            alignItems: 'start',
          }}
        >
          {/* Carte formulaire */}
          <Box
            sx={{
              background: COLORS.atelier.surface,
              border: `1px solid ${COLORS.atelier.borderDefault}`,
              borderRadius: '16px',
              p: { xs: 3, md: '32px 34px' },
            }}
          >
            <Typography
              component="h2"
              sx={{
                fontFamily: TYPOGRAPHY.fontFamilies.display,
                fontWeight: 700,
                fontSize: '22px',
                letterSpacing: '-0.02em',
                m: '0 0 6px',
                color: COLORS.atelier.textStrong,
              }}
            >
              {t('contact.sendMessage')}
            </Typography>
            <Typography sx={{ fontSize: '14px', color: COLORS.atelier.textMuted, m: '0 0 20px' }}>
              {t('contact.formDescription')}
            </Typography>

            <Box component="form" onSubmit={handleSubmit}>
              {/* Honeypot anti-bot (masqué) */}
              <input
                type="text"
                name="website"
                value={honeypot}
                onChange={handleInputChange}
                autoComplete="off"
                tabIndex={-1}
                aria-hidden="true"
                style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }}
              />

              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2, mb: 2 }}>
                <TextField
                  fullWidth
                  size="small"
                  label={t('contact.form.fullName')}
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
                <TextField
                  fullWidth
                  size="small"
                  type="email"
                  label={t('contact.form.email')}
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </Box>
              <TextField
                fullWidth
                size="small"
                label={t('contact.form.subject')}
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                multiline
                minRows={6}
                label={t('contact.form.message')}
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                sx={{ mb: 2.5 }}
              />

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                <Button type="submit" variant="contained" startIcon={<SendIcon />} disabled={isLoading}>
                  {isLoading
                    ? t('common:buttons.send') + '...'
                    : t('common:buttons.submit', { defaultValue: 'Envoyer le message' })}
                </Button>
                <Typography
                  sx={{
                    fontFamily: TYPOGRAPHY.fontFamilies.mono,
                    fontSize: '11px',
                    color: COLORS.atelier.textMuted,
                  }}
                >
                  {t('contact.responseNote', { defaultValue: 'Réponse sous 48 h ouvrées.' })}
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Aside : disponibilité + réseaux */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <Box
              sx={{
                background: COLORS.atelier.surface,
                border: `1px solid ${COLORS.atelier.borderDefault}`,
                borderRadius: '16px',
                p: '22px 24px',
              }}
            >
              <Box
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 1,
                  borderRadius: 999,
                  background: COLORS.atelier.newsBg,
                  border: `1px solid ${COLORS.atelier.newsBorder}`,
                  color: COLORS.atelier.news,
                  px: 1.5,
                  py: 0.5,
                  fontSize: '12.5px',
                  fontWeight: 600,
                  mb: 1.5,
                }}
              >
                <Box sx={{ width: 8, height: 8, borderRadius: '50%', background: COLORS.atelier.news }} />
                {t('contact.availabilityTitle', { defaultValue: 'Disponible pour missions freelance' })}
              </Box>
              <Typography sx={{ fontSize: '14px', lineHeight: 1.6, color: COLORS.atelier.textBody, m: 0 }}>
                {t('contact.availabilityBody', { defaultValue: '' })}
              </Typography>
            </Box>

            <Box
              sx={{
                background: COLORS.atelier.surface,
                border: `1px solid ${COLORS.atelier.borderDefault}`,
                borderRadius: '16px',
                p: '22px 24px',
              }}
            >
              <Typography
                component="h2"
                sx={{
                  fontFamily: TYPOGRAPHY.fontFamilies.display,
                  fontWeight: 700,
                  fontSize: '18px',
                  letterSpacing: '-0.01em',
                  m: '0 0 14px',
                  color: COLORS.atelier.textStrong,
                }}
              >
                {t('contact.socialNetworks')}
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25 }}>
                {networks.map((n) => (
                  <Box
                    key={n.key}
                    component="a"
                    href={n.href}
                    target={n.key === 'email' ? undefined : '_blank'}
                    rel={n.key === 'email' ? undefined : 'noopener noreferrer'}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1.5,
                      textDecoration: 'none',
                      border: `1px solid ${COLORS.atelier.borderDefault}`,
                      borderRadius: '12px',
                      p: '12px 14px',
                      transition: 'border-color .15s ease, box-shadow .15s ease, transform .15s ease',
                      '&:hover': {
                        borderColor: n.color,
                        boxShadow: `0 10px 24px -16px ${n.color}`,
                        transform: 'translateY(-2px)',
                      },
                    }}
                  >
                    {n.logo ? (
                      <Box component="img" src={n.logo} alt="" sx={{ width: 38, height: 38, objectFit: 'contain' }} />
                    ) : (
                      <Box
                        sx={{
                          width: 38,
                          height: 38,
                          borderRadius: '10px',
                          background: COLORS.atelier.tipsBg,
                          color: COLORS.atelier.tips,
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <MailOutlineIcon fontSize="small" />
                      </Box>
                    )}
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography
                        sx={{
                          fontWeight: 600,
                          fontSize: '14px',
                          color: COLORS.atelier.textStrong,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {n.name}
                      </Typography>
                      <Typography sx={{ fontSize: '12.5px', color: COLORS.atelier.textMuted }}>{n.sub}</Typography>
                    </Box>
                    <NorthEastIcon sx={{ fontSize: 18, color: COLORS.atelier.textMuted }} />
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </Box>
      </AtelierContainer>
      <ScrollToTopButton />

      <Snackbar
        open={showSuccess}
        autoHideDuration={5000}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" onClose={() => setShowSuccess(false)}>
          {t('contact.successMessage')}
        </Alert>
      </Snackbar>
    </PageLayout>
  );
};

ContactPage.displayName = 'ContactPage';
