import React from 'react';
import { Container, Typography, Card, Box } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { telerikTheme } from '../../theme/theme';
import { Header, Footer, ScrollToTopButton } from '../../components';
import { PromptCardsGrid } from '../../components/prompts/prompt-cards-grid';
import { COLORS } from '../../styles/colors';
import {
  PromptsPageContainer,
  GridContainer,

} from './styles';

export const PromptsPage: React.FC = () => {
  return (
    <ThemeProvider theme={telerikTheme}>
      <CssBaseline />
      <Header />

            <Container maxWidth={false} disableGutters sx={{ px: 0, mx: 0, width: '100%', backgroundColor: COLORS.darkGreyBg, minHeight: '100vh' }}>
              <PromptsPageContainer sx={{ px: 0, mx: 0, width: '100%', ml: { xs: 0, md: 2, lg: 6 } }}>
                <Box sx={{ display: 'flex', alignItems: 'stretch', gap: { xs: 2, sm: 4 }, flexWrap: { xs: 'wrap', md: 'nowrap' } }}>
                  <Box
                    sx={{
                      flex: { xs: '0 0 auto', md: '0 0 320px' },
                      width: { xs: '90%', md: 320 },
                      maxWidth: { xs: '90%', md: 320 },
                      alignSelf: { xs: 'center', md: 'stretch' },
                      overflow: 'visible',
                      position: 'relative',
                      backgroundColor: 'transparent',
                      display: 'block',
                      mr: { xs: 0, md: 2 },
                      mx: { xs: 'auto', md: 0 },
                      mb: { xs: 2, md: 0 },
                    }}
                  >
                    <Box
                      component="img"
                      src="/image-ia.png"
                      alt="Illustration intelligence artificielle"
                      sx={{
                        width: '100%',
                        height: 'auto',
                        objectFit: 'contain',
                        display: 'block',
                        borderRadius: 1,
                        boxShadow: 3,
                      }}
                    />
                  </Box>
      <Box sx={{ position: 'relative', pl: { xs: 0, md: '3rem' }, flex: 1, mr: { xs: 0, md: '2rem' }, width: { xs: '100%', md: 'auto' } }}>
                    <Box component="span" sx={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 10, background: COLORS.darkGreyBg, display: { xs: 'none', md: 'block' } }} />
                    <Typography variant="h6" component="h2" gutterBottom sx={{ fontWeight: 600, px: 0, mx: 0, width: '100%', color: 'text.primary' }}>
                      Qu'est-ce qu'un prompt ?
                    </Typography>
                    <Typography variant="body1" sx={{ px: 0, ml: 2, mr: 2, color: 'text.primary' }}>
                      Un prompt système est le texte de base que l’on transmet à un modèle d’intelligence artificielle avant toute interaction.
                      Il est en général stocké dans un fichier markdown (.md) à la racine du projet ; on peut en avoir plusieurs en fonction des besoins et des périmètres.
                      <br />
                      Ce sont un peu les dix commandements qui seront pris en considération par l’agent IA lors de la génération de ses réponses et de son code.
                      <br /><br />
                      Pour être sûr que ces règles soient bien prises en compte, il vaut mieux les préciser au début de la conversation avec l’IA.
                      <br /><br />
                      Par exemple :<br />
                      <i>«En prenant en compte les règles du fichier rules.prompt.md, j'aimerais que tu … »</i>
                    </Typography>
                    <Typography variant="h6" component="h2" gutterBottom sx={{ fontWeight: 600, marginTop: 2, px: 0, mx: 0, width: '100%', color: 'text.primary' }}>
                      Pourquoi un bon prompt est essentiel avec l'IA ?
                    </Typography>
                    <Typography variant="body1" sx={{ px: 0, ml: 2, mr: 2, color: 'text.primary' }}>
                      Un prompt bien rédigé permet d'obtenir des réponses plus pertinentes, précises et adaptées à vos besoins. Il guide l'intelligence artificielle, réduit les malentendus et maximise la valeur des outils IA. Prendre le temps de formuler un prompt clair, structuré et contextuel est la clé pour exploiter tout le potentiel de l'IA, que ce soit pour générer du texte, analyser des données ou automatiser des tâches.
                      <br />
                      Il faut vraiment voir l'IA comme une personne à part entière dans le sens où si l'instruction est vague, elle risque de mal interpréter vos attentes et de fournir des réponses inappropriées ou hors sujet, on parle ici d'alignement avec l'IA.
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
                width: '100%' 
              }}
          >
            <PromptCardsGrid />
          </Card>
        </GridContainer>
  </Container>
  <ScrollToTopButton />
  <Footer />
    </ThemeProvider>
  );
};

PromptsPage.displayName = 'PromptsPage';
