import React, { useMemo, useState } from 'react';
import { Box, Typography, IconButton, Snackbar, Alert } from '@mui/material';
import { ContentCopy } from '@mui/icons-material';
import type { PromptModule } from '..';
import { CodeBlock } from '../styles';

// Import raw markdown content without duplication
import rawGlobalPrompt from '../../../../prompts/global.prompt.md?raw';

export const promptText = rawGlobalPrompt;

const PromptBody: React.FC = () => {
  const [showCopySuccess, setShowCopySuccess] = useState(false);
  const writtenOn = useMemo(() => new Date().toLocaleDateString('fr-FR'), []);

  const description = `C’est le prompt que j’ai utilisé et mis à jour au fur et à mesure pour la construction de mon site internet.`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(promptText);
      setShowCopySuccess(true);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <Box>
      <Typography variant="body1" sx={{ mb: 2 }}>
        {description}
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
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderRadius: 1,
            border: '1px solid',
            borderColor: 'grey.300',
            width: 32,
            height: 32,
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background 0.2s, color 0.2s',
            color: 'inherit',
            '&:hover': { backgroundColor: 'primary.main', color: '#fff' },
          }}
          size="small"
          title="Copier le prompt"
        >
          <ContentCopy fontSize="small" />
        </IconButton>
        <CodeBlock component="pre" sx={{ border: '1px solid', borderColor: 'grey.300', borderRadius: 1 }}>
          {promptText}
        </CodeBlock>
      </Box>

      <Snackbar
        open={showCopySuccess}
        autoHideDuration={3000}
        onClose={() => setShowCopySuccess(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setShowCopySuccess(false)} severity="success" sx={{ width: '100%' }}>
          Prompt copié dans le presse-papiers !
        </Alert>
      </Snackbar>

      <Box sx={{ mt: 4, pt: 3, borderTop: '1px solid', borderColor: 'grey.300' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
          <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
            Source: Fichier global.prompt.md du projet
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic', textAlign: 'right' }}>
            Écrit le {writtenOn}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export const meta = {
  slug: 'craftsmanlab-rules',
  title: 'CraftsmanLab Rules',
  shortDescription: "Règles et conventions CraftsmanLab (rendu direct du global.prompt.md).",
};

const moduleExport: PromptModule = {
  default: PromptBody,
  meta,
};

export default PromptBody;
export { moduleExport };
