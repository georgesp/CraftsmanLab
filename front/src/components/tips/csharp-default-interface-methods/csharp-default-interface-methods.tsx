import React from 'react';
import { useTranslation } from 'react-i18next';
import type { TipModule } from '..';
import { Box, Typography } from '@mui/material';
import { TipContent } from '../../ui';
import { CodeBlock } from '../../ui/CodeBlock';
import { meta } from './meta';

const DevTip: React.FC = () => {
  const { t } = useTranslation('tips');

  return (
    <TipContent>
      <Typography variant="h3">{t('csharp-default-interface-methods.content.mainTitle')}</Typography>
      <Typography paragraph>{t('csharp-default-interface-methods.content.overview')}</Typography>

      <Typography variant="h4">{t('csharp-default-interface-methods.content.useCases.title')}</Typography>

      <Typography variant="h5">{t('csharp-default-interface-methods.content.useCases.case1.title')}</Typography>
      <Typography paragraph>{t('csharp-default-interface-methods.content.useCases.case1.description')}</Typography>
      <CodeBlock
        language="csharp"
        ariaLabel="dim-example-1"
        code={t('csharp-default-interface-methods.content.useCases.case1.code')}
      />

      <Typography variant="h5">{t('csharp-default-interface-methods.content.useCases.case2.title')}</Typography>
      <Typography paragraph>{t('csharp-default-interface-methods.content.useCases.case2.description')}</Typography>
      <CodeBlock
        language="csharp"
        ariaLabel="dim-example-2"
        code={t('csharp-default-interface-methods.content.useCases.case2.code')}
      />

      <Typography variant="h4">{t('csharp-default-interface-methods.content.summary.title')}</Typography>
      <Typography paragraph>{t('csharp-default-interface-methods.content.summary.text')}</Typography>

      <Typography variant="h5">{t('csharp-default-interface-methods.content.summary.prosTitle')}</Typography>
      <Box component="ul" sx={{ pl: 3, mb: 2 }}>
        {(t('csharp-default-interface-methods.content.summary.pros', { returnObjects: true }) as string[]).map(
          (p, i) => (
            <li key={i}>
              <Typography component="span">{p}</Typography>
            </li>
          ),
        )}
      </Box>

      <Typography variant="h5">{t('csharp-default-interface-methods.content.summary.consTitle')}</Typography>
      <Box component="ul" sx={{ pl: 3, mb: 2 }}>
        {(t('csharp-default-interface-methods.content.summary.cons', { returnObjects: true }) as string[]).map(
          (c, i) => (
            <li key={i}>
              <Typography component="span">{c}</Typography>
            </li>
          ),
        )}
      </Box>

      <Typography variant="h4">{t('csharp-default-interface-methods.content.goodPractices.title')}</Typography>
      <Box component="ul" sx={{ pl: 3, mb: 2 }}>
        {(t('csharp-default-interface-methods.content.goodPractices.items', { returnObjects: true }) as string[]).map(
          (g, i) => (
            <li key={i}>
              <Typography component="span">{g}</Typography>
            </li>
          ),
        )}
      </Box>

      <Box mt={4} pt={2} borderTop={(theme) => `1px solid ${theme.palette.divider}`} sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="caption" sx={{ fontStyle: 'italic' }}>
          <a href={t('csharp-default-interface-methods.content.footer.sourceUrl')} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>
            {t('csharp-default-interface-methods.content.footer.sourceLabel')}
          </a>
        </Typography>
        <Typography variant="caption" sx={{ fontStyle: 'italic' }}>
          {t('csharp-default-interface-methods.content.footer.writtenOn', { date: meta.writtenOn })}
        </Typography>
      </Box>
    </TipContent>
  );
};

const mod: TipModule = { default: DevTip, meta };
export default DevTip;
export { mod };
