import React from 'react';
import { Container, Typography, Card, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ScrollToTopButton, PageLayout } from '../../components';
import { PromptCardsGrid } from '../../components/prompts/prompt-cards-grid';
import { COLORS, TYPOGRAPHY } from '../../styles';
import { PromptsPageContainer, GridContainer } from './styles';

export const PromptsPage: React.FC = () => {
  const { t } = useTranslation('pages');

  return (
    <PageLayout>
      <Container
        maxWidth={false}
        disableGutters
        sx={{ px: 0, mx: 0, width: '100%', backgroundColor: COLORS.darkGreyBg, minHeight: '100vh' }}
      >
        <PromptsPageContainer
          sx={{
            // add small horizontal padding on xs/sm so text isn't flush against viewport edges
            px: { xs: 2, sm: 3, md: 0 },
            mx: 0,
            width: '100%',
            // align with Tips page spacing on md+
            ml: { xs: 0, md: 6 },
            mr: { xs: 0, md: 6 },
            // ensure inner right padding on large screens so text doesn't feel truncated
            pr: { md: 6 },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              // ensure stacking on small screens and row layout on larger ones
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: 'stretch',
              gap: { xs: 2, sm: 4 },
              flexWrap: { xs: 'wrap', md: 'nowrap' },
            }}
          >
            <Box
              sx={{
                // smaller on md+, centered and capped on small screens
                flex: { xs: '1 1 100%', md: '0 0 280px' },
                width: { xs: '100%', md: 280 },
                // cap the max width globally so it never grows too large on narrow viewports
                maxWidth: 320,
                mx: { xs: 'auto', md: 0 },
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
                    // fill the container on md+ so rounded border doesn't show empty area
                    height: { xs: 'auto', md: '100%' },
                    objectFit: { xs: 'contain', md: 'cover' },
                    display: 'block',
                  }}
                />
              </Box>
              <Box
                sx={{ position: 'relative', pl: { xs: 0, md: '0.75rem' }, flex: 1, mr: { xs: 0, md: 3 } }}
              >
              <span
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: 0,
                  display: 'none',
                  background: COLORS.darkGreyBg,
                }}
              />
              <Typography
                variant="h6"
                component="h2"
                gutterBottom
                sx={{ fontWeight: TYPOGRAPHY.fontWeights.semiBold, px: 0, mx: 0, width: '100%', color: 'text.primary' }}
              >
                {t('prompts.whatIsPrompt')}
              </Typography>
              <Typography
                variant="body1"
                sx={{ px: 0, mx: 0, width: '100%', color: 'text.primary' }}
              >
                {t('prompts.promptDefinitionFull')
                  .split('\n')
                  .map((line, idx) => (
                    <React.Fragment key={idx}>
                      {line}
                      <br />
                    </React.Fragment>
                  ))}
              </Typography>
              <Typography
                variant="h6"
                component="h2"
                gutterBottom
                sx={{
                  fontWeight: TYPOGRAPHY.fontWeights.semiBold,
                  marginTop: 2,
                  px: 0,
                  mx: 0,
                  width: '100%',
                  color: 'text.primary',
                }}
              >
                {t('prompts.whyPromptTitle')}
              </Typography>
              <Typography
                variant="body1"
                sx={{ px: 0, mx: 0, width: '100%', color: 'text.primary' }}
              >
                {t('prompts.whyPromptBody1')}
                <br />
                {t('prompts.whyPromptBody2')}
              </Typography>
            </Box>
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
              width: '100%',
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
