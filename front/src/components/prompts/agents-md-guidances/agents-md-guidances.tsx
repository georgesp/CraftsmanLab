import { useState } from 'react';
import { Box, Typography, Link, IconButton, Snackbar, Alert } from '@mui/material';
import { ContentCopy } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import type { PromptModule } from '..';
import { CodeBlock } from '../../ui/CodeBlock';
import { COLORS } from 'styles/colors';
import { meta } from './meta';

export const promptText = `# Génération d'un AGENTS.md pour un dépôt .NET

## Rôle
Tu es un développeur senior .NET chargé de rédiger le fichier \`AGENTS.md\` de ce dépôt.
Ce fichier est lu automatiquement par les agents de code (GitHub Copilot, Cursor, Codex, Claude Code, Gemini CLI).
Il doit permettre à un agent de contribuer correctement sans poser de question.

## Méthode obligatoire — explorer avant d'écrire
Avant de rédiger la moindre ligne, inspecte réellement le dépôt :
1. Fichiers \`.sln\`, \`.slnx\` et \`.csproj\` : projets, TargetFramework, packages, \`Directory.Build.props\`, \`Directory.Packages.props\`
2. Arborescence des dossiers de premier et deuxième niveau
3. Fichiers de configuration : \`.editorconfig\`, \`global.json\`, \`nuget.config\`, \`.gitignore\`
4. Workflows CI (\`.github/workflows\`, \`azure-pipelines.yml\`) : commandes réellement exécutées
5. Projets de tests : framework utilisé (xUnit, NUnit, TUnit), conventions de nommage
6. \`README.md\` et documentation existante, pour ne pas la dupliquer

N'invente jamais une commande : ne documente que ce que tu as vérifié dans le dépôt.

## Structure attendue du fichier
Produis un \`AGENTS.md\` à la racine, en Markdown, avec exactement ces sections :

### 1. Vue d'ensemble du projet
- Ce que fait l'application, en 3 à 5 phrases
- Le domaine métier et le vocabulaire à respecter
- Les versions : SDK .NET, version de langage C#, base de données

### 2. Structure du dépôt
- Un tableau ou une liste à puces : chemin, rôle, quand y toucher
- Signale explicitement les dossiers générés ou à ne jamais modifier à la main

### 3. Commandes
Regroupe les commandes réelles, une par ligne, avec un commentaire :
\`\`\`bash
# Restaurer et compiler
dotnet build MySolution.sln

# Lancer tous les tests
dotnet test

# Lancer un seul projet de tests
dotnet test tests/MyProject.Tests/MyProject.Tests.csproj

# Formater le code
dotnet format
\`\`\`

### 4. Conventions de code
- Style de nommage, usage de \`var\`, nullable reference types
- Organisation en couches et dépendances autorisées entre projets
- Gestion des erreurs : exceptions, types résultat, journalisation
- Asynchronisme : suffixe Async, CancellationToken, interdiction de \`.Result\`
- Injection de dépendances : durées de vie, enregistrement des services

### 5. Tests
- Framework et convention de nommage des tests
- Ce qui doit être couvert et ce qui ne l'est pas
- Règle explicite : tout changement de comportement s'accompagne d'un test

### 6. Ce qu'il ne faut pas faire
Section courte et impérative. Exemples de règles à adapter :
- Ne pas modifier les fichiers de migration déjà appliqués
- Ne pas ajouter de package NuGet sans le déclarer dans \`Directory.Packages.props\`
- Ne pas committer de secret, de chaîne de connexion ou de clé d'API
- Ne pas reformater des fichiers non concernés par la modification

### 7. Pull requests
- Format du titre et du message de commit
- Vérifications à passer avant de proposer une PR
- Fichiers ou dossiers qui exigent une relecture humaine

## Règles de rédaction
- Impératif, direct, sans remplissage : un agent lit des instructions, pas une brochure
- Chaque affirmation doit être actionnable ou vérifiable
- Vise 150 à 300 lignes : au-delà, l'essentiel se dilue
- Pas de duplication du README : renvoie vers lui pour l'installation détaillée
- Dans un monorepo, prévois un \`AGENTS.md\` racine plus un fichier par sous-projet significatif ;
  le fichier le plus proche du code modifié l'emporte
- Termine par une section « Mise à jour » indiquant quand ce fichier doit être revu

## Livrable
Retourne uniquement le contenu final du fichier \`AGENTS.md\`, prêt à être committé à la racine du dépôt.`;

const PromptBody: React.FC = () => {
  const { t } = useTranslation('prompts');
  const [showCopySuccess, setShowCopySuccess] = useState(false);
  const writtenOn = meta.writtenOn
    ? new Date(meta.writtenOn).toLocaleDateString('fr-FR')
    : new Date().toLocaleDateString('fr-FR');

  const useCases = t('agents-md-guidances.content.useCases', {
    returnObjects: true,
  }) as string[];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(promptText);
      setShowCopySuccess(true);
    } catch {
      setShowCopySuccess(false);
    }
  };

  const handleCloseSnackbar = () => {
    setShowCopySuccess(false);
  };

  return (
    <Box>
      <Typography variant="body1" sx={{ mb: 2 }}>
        {t('agents-md-guidances.content.introduction')}
      </Typography>
      <Box sx={{ borderTop: '1px solid', borderColor: 'grey.300', mb: 3 }} />

      <Box sx={{ position: 'relative' }}>
        <IconButton
          onClick={handleCopy}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            zIndex: 1,
            backgroundColor: COLORS.overlay.lightSemi,
            borderRadius: 0,
            border: '1px solid',
            borderColor: 'grey.300',
            width: 32,
            height: 32,
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background 0.2s, color 0.2s',
            color: COLORS.copyBtnColor,
            '&:hover': {
              color: COLORS.copyBtnColorHover,
            },
          }}
          size="small"
          title={t('agents-md-guidances.content.copyButton')}
        >
          <ContentCopy fontSize="small" />
        </IconButton>
        <CodeBlock code={promptText} />
      </Box>

      <Snackbar
        open={showCopySuccess}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          {t('agents-md-guidances.content.copySuccess')}
        </Alert>
      </Snackbar>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          {t('agents-md-guidances.content.useCasesTitle')}
        </Typography>
        <Box component="ul" sx={{ pl: 3, mb: 0 }}>
          {Array.isArray(useCases) &&
            useCases.map((item, i) => (
              <li key={i}>
                <Typography component="span" variant="body2" color="text.secondary">
                  {item}
                </Typography>
              </li>
            ))}
        </Box>
      </Box>

      <Box sx={{ mt: 4, pt: 3, borderTop: '1px solid', borderColor: 'grey.300' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
            flexWrap: 'wrap',
          }}
        >
          <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
            {t('agents-md-guidances.content.sources')}{' '}
            <Link href="https://agents.md/" target="_blank" rel="noopener noreferrer">
              agents.md
            </Link>
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontStyle: 'italic', textAlign: 'left' }}
          >
            {t('agents-md-guidances.content.writtenOn')} {writtenOn}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

const moduleExport: PromptModule = {
  default: PromptBody,
  meta,
};

export default PromptBody;
export { moduleExport };
