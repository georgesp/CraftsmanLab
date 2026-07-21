import { type FC } from 'react';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ScrollToTopButton, PageLayout } from '../../components';
import { AtelierContainer, SectionTitleBand } from '../../components/atelier';
import { AtelierPromptsGrid } from '../../components/prompts/AtelierPromptsGrid';
import { promptsList } from '../../components/prompts/registry';
import { COLORS, TYPOGRAPHY } from '../../styles';

export const PromptsPage: FC = () => {
  const { t } = useTranslation('pages');
  const count = promptsList.filter((p) => p.slug !== 'more').length;

  const para = (children: React.ReactNode) => (
    <Typography sx={{ fontSize: '15px', lineHeight: 1.65, color: COLORS.atelier.textBody, m: '0 0 14px' }}>
      {children}
    </Typography>
  );

  return (
    <PageLayout>
      <AtelierContainer>
        <SectionTitleBand illus="prompt" title={t('prompts.title', { defaultValue: 'Prompts' })} />

        {/* Encadré pédagogique */}
        <Box component="section" sx={{ px: { xs: 2.5, md: '46px' }, pt: 2, pb: 1 }}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '340px 1fr' },
              gap: { xs: 3, md: '40px' },
              alignItems: 'start',
              background: COLORS.atelier.surface,
              border: `1px solid ${COLORS.atelier.borderDefault}`,
              borderRadius: '16px',
              p: { xs: 3, md: '32px 36px' },
            }}
          >
            <Box
              component="img"
              src="/image-ia.png"
              alt="Illustration : cerveau connecté / IA"
              sx={{
                width: '100%',
                borderRadius: '12px',
                border: `1px solid ${COLORS.atelier.borderDefault}`,
                display: 'block',
              }}
            />
            <Box>
              <Typography
                component="h2"
                sx={{
                  fontFamily: TYPOGRAPHY.fontFamilies.display,
                  fontWeight: 700,
                  fontSize: '24px',
                  letterSpacing: '-0.02em',
                  m: '0 0 14px',
                  color: COLORS.atelier.textStrong,
                }}
              >
                {t('prompts.whatIsPrompt')}
              </Typography>
              {para(t('prompts.promptDefinition'))}
              {para(t('prompts.def2'))}
              {para(t('prompts.def3'))}
              <Box
                sx={{
                  borderLeft: `3px solid ${COLORS.atelier.prompts}`,
                  background: COLORS.atelier.promptsBgAlt,
                  p: '12px 16px',
                  borderRadius: '0 8px 8px 0',
                  fontFamily: TYPOGRAPHY.fontFamilies.mono,
                  fontSize: '13px',
                  color: '#7A4A1A',
                  m: '0 0 22px',
                }}
              >
                {t('prompts.example')}
              </Box>
              <Typography
                component="h2"
                sx={{
                  fontFamily: TYPOGRAPHY.fontFamilies.display,
                  fontWeight: 700,
                  fontSize: '20px',
                  letterSpacing: '-0.015em',
                  m: '0 0 12px',
                  color: COLORS.atelier.textStrong,
                }}
              >
                {t('prompts.whyPromptTitle')}
              </Typography>
              {para(t('prompts.whyPromptBody1'))}
              <Typography sx={{ fontSize: '15px', lineHeight: 1.65, color: COLORS.atelier.textBody, m: 0 }}>
                {t('prompts.whyPromptBody2')}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Grille des prompts */}
        <Box component="section" sx={{ px: { xs: 2.5, md: '46px' }, pt: '30px', pb: '60px' }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'baseline',
              justifyContent: 'space-between',
              mb: '18px',
            }}
          >
            <Typography
              component="h2"
              sx={{
                fontFamily: TYPOGRAPHY.fontFamilies.display,
                fontWeight: 700,
                fontSize: '22px',
                letterSpacing: '-0.02em',
                m: 0,
                color: COLORS.atelier.textStrong,
              }}
            >
              {t('prompts.available', { defaultValue: 'Les prompts disponibles' })}
            </Typography>
            <Box
              component="span"
              sx={{ fontFamily: TYPOGRAPHY.fontFamilies.mono, fontSize: '12.5px', color: COLORS.atelier.textBody }}
            >
              <b style={{ color: COLORS.atelier.textStrong }}>{count}</b>{' '}
              {t('prompts.count', { defaultValue: 'prompts' })}
            </Box>
          </Box>

          <AtelierPromptsGrid />
        </Box>
      </AtelierContainer>
      <ScrollToTopButton />
    </PageLayout>
  );
};

PromptsPage.displayName = 'PromptsPage';
