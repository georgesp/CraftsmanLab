import React from 'react';
import { Container, Typography, Card } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { telerikTheme } from '../../theme/theme';
import { Header } from '../../components';
import { PromptCardsGrid } from '../../components/prompts/prompt-cards-grid';
import { COLORS } from '../../utils/colors';
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

            <Container maxWidth="lg">
              <PromptsPageContainer>
                <Typography variant="h6" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
                  Qu'est-ce qu'un prompt ?
                </Typography>
                <Typography variant="body1">
                  Un prompt système est le texte de base que l’on transmet à un modèle d’intelligence artificielle avant toute interaction.
                  Il est en général stocké dans un fichier markdown (.md) à la racine du projet, on peut en avoir plusieurs en fonction des besoins, périmètres.
                  <br />
                  C’est un peu les dix commandements qui seront pris en considération par l’agent IA lors de la génération de ses réponses et de son code.
                  <br /><br />
                  Pour être sûr que ces règles soient bien prises en compte il vaut mieux le préciser au début de la conversation avec l’IA.
                  <br /><br />
                  Par exemple:<br />
                  <i>«En prenant en compte les règles du fichier rules.prompt.md, j’aimerai que tu …. »</i>
                </Typography>
                <Typography variant="h6" component="h2" gutterBottom sx={{ fontWeight: 600, marginTop: 2 }}>
                  Pourquoi un bon prompt est essentiel avec l'IA&nbsp;?
                </Typography>
                <Typography variant="body1">
                  Un prompt bien rédigé permet d'obtenir des réponses plus pertinentes, précises et adaptées à vos besoins. Il guide l'intelligence artificielle, réduit les malentendus et maximise la valeur des outils IA. Prendre le temps de formuler un prompt clair, structuré et contextuel est la clé pour exploiter tout le potentiel de l'IA, que ce soit pour générer du texte, analyser des données ou automatiser des tâches.
                  <br />
                  Il faut vraiment voir l'IA comme une personne à part entière dans le sens où si l'instruction est vague, elle risque de mal interpréter vos attentes et de fournir des réponses inappropriées ou hors sujet.
                </Typography>
              </PromptsPageContainer>
        <GridContainer>
          <Card
            variant="outlined"
            sx={{
              backgroundColor: COLORS.lightBlueBg,
              borderRadius: 1,
              p: { xs: 2, md: 4 },
              boxShadow: 0,
              maxWidth: 1200,
              mx: 'auto',
            }}
          >
            <PromptCardsGrid />
          </Card>
        </GridContainer>
      </Container>
    </ThemeProvider>
  );
};

PromptsPage.displayName = 'PromptsPage';
