import React from 'react';
import { Container, Typography, Card, Box } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useTranslation } from 'react-i18next';
import { telerikTheme } from '../../theme/theme';
import { Header, Footer, ScrollToTopButton } from '../../components';
import { PromptCardsGrid } from '../../components/prompts/prompt-cards-grid';
import { COLORS } from '../../styles/colors';
import {
  PromptsPageContainer,
  GridContainer,
} from './styles';

export const PromptsPage: React.FC = () => {
  const { t } = useTranslation('pages');

  return (
    <PageLayout>

      <Container maxWidth={false} disableGutters sx={{ px: 0, mx: 0, width: '100%', backgroundColor: COLORS.darkGreyBg, minHeight: '100vh' }}>
        <PromptsPageContainer sx={{ px: 0, mx: 0, width: '100%', ml: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'stretch', gap: { xs: 2, sm: 4 }, flexWrap: { xs: 'wrap', md: 'nowrap' } }}>
            <Box
              sx={{
                flex: { xs: '1 1 100%', md: '0 0 400px' },
                width: { xs: '100%', md: 400 },
                maxWidth: { xs: '100%', md: 420 },
                alignSelf: { xs: 'center', md: 'stretch' },
                borderRadius: 1,
                boxShadow: 3,
                overflow: 'hidden',
                position: 'relative',
                backgroundColor: COLORS.darkGreyBg,
                display: 'flex',
              }}
            >
              <Box
                component="img"
                src="/image-ia.png"
                alt="Illustration intelligence artificielle"
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            </Box>
            <div style={{ position: 'relative', paddingLeft: '3rem', flex: 1, marginRight: '2rem' }}>
              <span style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 10, background: COLORS.darkGreyBg }} />
              <Typography variant="h6" component="h2" gutterBottom sx={{ fontWeight: 600, px: 0, mx: 0, width: '100%', color: 'text.primary' }}>
                {t('prompts.whatIsPrompt')}
              </Typography>
              <Typography variant="body1" sx={{ px: 0, mx: 0, width: '100%', color: 'text.primary' }}>
                {t('prompts.promptDefinitionFull').split('\n').map((line, idx) => (
                  <React.Fragment key={idx}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
              </Typography>
              <Typography variant="h6" component="h2" gutterBottom sx={{ fontWeight: 600, marginTop: 2, px: 0, mx: 0, width: '100%', color: 'text.primary' }}>
                {t('prompts.whyPromptTitle')}
              </Typography>
              <Typography variant="body1" sx={{ px: 0, mx: 0, width: '100%', color: 'text.primary' }}>
                {t('prompts.whyPromptBody1')}
                <br />
                {t('prompts.whyPromptBody2')}
              </Typography>
            </div>
          </Box>
        </PromptsPageContainer>
        <GridContainer>
          <Card
            variant="outlined"
            sx={{ 
              p: { xs: 2, md: 4 }, 
              backgroundColor: COLORS.darkGreyBg, 
              mb: 0, 
              borderLeft: 0, 
              borderRight: 0, 
              width: '100%' 
            }}
          >
            <PromptCardsGrid />
          </Card>
        </GridContainer>
  </Container>
      <ScrollToTopButton />
    </PageLayout>
  );
};

PromptsPage.displayName = 'PromptsPage';
