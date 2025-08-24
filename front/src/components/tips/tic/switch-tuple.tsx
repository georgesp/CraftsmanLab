import React from 'react';
import { useTranslation } from 'react-i18next';
import type { TipModule } from '..';
import { Box, Typography } from '@mui/material';
import { CodeBlock } from '../../ui/CodeBlock/CodeBlock';
import type { Keyword } from '../../../utils/constants';

export const meta = {
  slug: 'switch-tuple',
  title: '', // Utilisera les traductions
  shortDescription: '', // Utilisera les traductions
  writtenOn: '2025-08-15',
  keywords: ['C#'] as unknown as Keyword[],
  metadata: {
    searchKeywords: {
      fr: [
        'switch', 'tuple', 'pattern matching', 'correspondance', 'motifs',
        'expressions', 'décomposition', 'destructuring', 'c# 8', 'c# 9',
        'when', 'discard', 'underscore', 'décisionnel'
      ],
      en: [
        'switch', 'tuple', 'pattern matching', 'patterns',
        'expressions', 'decomposition', 'destructuring', 'c# 8', 'c# 9',
        'when', 'discard', 'underscore', 'decision'
      ]
    }
  }
};

const SwitchTupleTip: React.FC = () => {
  const { t } = useTranslation('tips');
  
  return (
    <Box>
      <Typography variant="h3" gutterBottom>{t('switch-tuple.content.mainTitle')}</Typography>
      
      <Typography paragraph>
        {t('switch-tuple.content.intro')}
      </Typography>

      <Typography variant="h4" gutterBottom>{t('switch-tuple.content.sections.example.title')}</Typography>
      <CodeBlock language="csharp" code={t('switch-tuple.content.sections.example.codeBlock')} />

      <Typography variant="h4" gutterBottom>{t('switch-tuple.content.sections.summary.title')}</Typography>
      <Typography paragraph component="div">
        • Simple et lisible : compare plusieurs éléments en une seule expression, parfait pour des cas de dispatch.
        <br />
  • Moins de code répétitif : on évite les if/else et l'extraction manuelle des champs.
        <br />
        • Flexible : tu peux mélanger tuples, enums ou classes dans les patterns pour couvrir la plupart des cas.
      </Typography>

      <Box mt={4} pt={2} borderTop={theme => `1px solid ${theme.palette.divider}`} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="caption" component="div" sx={{ fontStyle: 'italic', color: 'text.secondary' }}>
          
        </Typography>
        <Typography variant="caption" component="div" sx={{ color: 'text.secondary' }}>
          Écrit le {meta.writtenOn}
        </Typography>
      </Box>
    </Box>
  );
};

const mod: TipModule = { default: SwitchTupleTip, meta };
export default SwitchTupleTip;
export { mod };
