import React from 'react';
import { Container, Typography, Card, Box } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { telerikTheme } from '../../theme/theme';
import { Header, Footer } from '../../components';
import { PromptCardsGrid } from '../../components/prompts/prompt-cards-grid';
import { COLORS } from '../../styles/colors';
import {
  PromptsPageContainer,
  // ExplanationBox,
  GridContainer,
  
} from './styles';

export const PromptsPage: React.FC = () => {
  return (
    <ThemeProvider theme={telerikTheme}>
      <CssBaseline />
      <Header />

            <Container maxWidth={false} disableGutters sx={{ px: 0, mx: 0, width: '100%' }}>
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
                    <Typography variant="h6" component="h2" gutterBottom sx={{ fontWeight: 600, px: 0, mx: 0, width: '100%' }}>
                      Qu'est-ce qu'un prompt ?
                    </Typography>
                    <Typography variant="body1" sx={{ px: 0, mx: 0, width: '100%' }}>
                      Un prompt système est le texte de base que l’on transmet à un modèle d’intelligence artificielle avant toute interaction.
                      Il est en général stocké dans un fichier markdown (.md) à la racine du projet, on peut en avoir plusieurs en fonction des besoins, périmètres.
                      <br />
                      C’est un peu les dix commandements qui seront pris en considération par l’agent IA lors de la génération de ses réponses et de son code.
                      <br /><br />
                      Pour être sûr que ces règles soient bien prises en compte il vaut mieux le préciser au début de la conversation avec l’IA.
                      <br /><br />
                      Par exemple:<br />
                      <i>«En prenant en compte les règles du fichier rules.prompt.md, j’aimerai que tu … »</i>
                    </Typography>
                    <Typography variant="h6" component="h2" gutterBottom sx={{ fontWeight: 600, marginTop: 2, px: 0, mx: 0, width: '100%' }}>
                      Pourquoi un bon prompt est essentiel avec l'IA ?
                    </Typography>
                    <Typography variant="body1" sx={{ px: 0, mx: 0, width: '100%' }}>
                      Un prompt bien rédigé permet d'obtenir des réponses plus pertinentes, précises et adaptées à vos besoins. Il guide l'intelligence artificielle, réduit les malentendus et maximise la valeur des outils IA. Prendre le temps de formuler un prompt clair, structuré et contextuel est la clé pour exploiter tout le potentiel de l'IA, que ce soit pour générer du texte, analyser des données ou automatiser des tâches.
                      <br />
                      Il faut vraiment voir l'IA comme une personne à part entière dans le sens où si l'instruction est vague, elle risque de mal interpréter vos attentes et de fournir des réponses inappropriées ou hors sujet.
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
                mb: 6, 
                borderLeft: 0, 
                borderRight: 0, 
                borderRadius: '12px', 
                width: '100%' 
              }}
          >
            <PromptCardsGrid />
          </Card>
        </GridContainer>
  </Container>
  <Footer />
    </ThemeProvider>
  );
};

PromptsPage.displayName = 'PromptsPage';
