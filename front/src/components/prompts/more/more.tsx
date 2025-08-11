import React, { useState } from 'react';
import { Box, Typography, IconButton, Snackbar, Alert } from '@mui/material';
import { ContentCopy } from '@mui/icons-material';
import type { PromptModule } from '..';
import { CodeBlock } from '../styles';

// Contenu du prompt (vide pour le moment)
export const promptText = ``;

const PromptBody: React.FC = () => {
  const [showCopySuccess, setShowCopySuccess] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(promptText);
      setShowCopySuccess(true);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleCloseSnackbar = () => {
    setShowCopySuccess(false);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Description
      </Typography>
      <Typography variant="body1" paragraph>
        More coming soon...
      </Typography>

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
            '&:hover': {
              backgroundColor: 'primary.main',
              color: '#fff',
            },
          }}
          size="small"
          title="Copier le prompt"
        >
          <ContentCopy fontSize="small" />
        </IconButton>
        <CodeBlock component="pre">{promptText}</CodeBlock>
      </Box>

      <Snackbar
        open={showCopySuccess}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Prompt copié dans le presse-papiers !
        </Alert>
      </Snackbar>
    </Box>
  );
};

export const meta = {
  slug: 'more',
  title: 'More coming soon...',
  shortDescription: '',
  writtenOn: '2030-08-11',
};

const moduleExport: PromptModule = {
  default: PromptBody,
  meta,
};

export default PromptBody;
export { moduleExport };
