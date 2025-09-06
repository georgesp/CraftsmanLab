import React from 'react';
import { useTranslation } from 'react-i18next';
import type { TipModule } from '..';
import { Box, Typography } from '@mui/material';
import TipContent from '../TipContent';
import { CodeBlock } from '../../ui/CodeBlock/CodeBlock';
import { meta } from './meta';

const DevTip: React.FC = () => {
  const { t } = useTranslation('tips');
  return (
    <TipContent>
      <Typography variant="h3">{t('csharp-solid-principles.content.mainTitle')}</Typography>
      {t('csharp-solid-principles.content.overview')
        .split('\n')
        .map((p: string, i: number) => (
          <Typography paragraph key={i}>
            {p}
          </Typography>
        ))}

  <Typography variant="h4">{t('csharp-solid-principles.content.principles.title')}</Typography>

  <Typography variant="h5">{t('csharp-solid-principles.content.principles.s.title')}</Typography>
  <Typography paragraph>{t('csharp-solid-principles.content.principles.s.description')}</Typography>
  <CodeBlock language="csharp" code={t('csharp-solid-principles.content.principles.s.code').replace(/\\n/g, '\n')} />

  <Typography variant="h5">{t('csharp-solid-principles.content.principles.o.title')}</Typography>
  <Typography paragraph>{t('csharp-solid-principles.content.principles.o.description')}</Typography>
  <CodeBlock language="csharp" code={t('csharp-solid-principles.content.principles.o.code').replace(/\\n/g, '\n')} />

  <Typography variant="h5">{t('csharp-solid-principles.content.principles.l.title')}</Typography>
  <Typography paragraph>{t('csharp-solid-principles.content.principles.l.description')}</Typography>
  <CodeBlock language="csharp" code={t('csharp-solid-principles.content.principles.l.code').replace(/\\n/g, '\n')} />

  <Typography variant="h5">{t('csharp-solid-principles.content.principles.i.title')}</Typography>
  <Typography paragraph>{t('csharp-solid-principles.content.principles.i.description')}</Typography>
  <CodeBlock language="csharp" code={t('csharp-solid-principles.content.principles.i.code').replace(/\\n/g, '\n')} />

  <Typography variant="h5">{t('csharp-solid-principles.content.principles.d.title')}</Typography>
  <Typography paragraph>{t('csharp-solid-principles.content.principles.d.description')}</Typography>
  <CodeBlock language="csharp" code={t('csharp-solid-principles.content.principles.d.code').replace(/\\n/g, '\n')} />

      <Typography variant="h4">{t('csharp-solid-principles.content.summary.title')}</Typography>
      <Typography paragraph>{t('csharp-solid-principles.content.summary.text')}</Typography>
      <Typography variant="h5">{t('csharp-solid-principles.content.summary.prosTitle')}</Typography>
      <ul>
        <li>{t('csharp-solid-principles.content.summary.pros.0')}</li>
      </ul>
      <Typography variant="h5">{t('csharp-solid-principles.content.summary.consTitle')}</Typography>
      <ul>
        <li>{t('csharp-solid-principles.content.summary.cons.0')}</li>
      </ul>

      <Typography variant="h4">{t('csharp-solid-principles.content.goodPractices.title')}</Typography>
      <ul>
        <li>{t('csharp-solid-principles.content.goodPractices.items.0')}</li>
      </ul>

      <Box mt={4} pt={2} borderTop={theme => `1px solid ${theme.palette.divider}`} sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="caption" sx={{ fontStyle: 'italic' }}>
          <a href={t('csharp-solid-principles.content.footer.sourceUrl')} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>
            {t('csharp-solid-principles.content.footer.sourceLabel')}
          </a>
        </Typography>
        <Typography variant="caption" sx={{ fontStyle: 'italic' }}>
          {t('csharp-solid-principles.content.footer.writtenOn', { date: meta.writtenOn })}
        </Typography>
      </Box>
    </TipContent>
  );
};

const mod: TipModule = { default: DevTip, meta };
export default DevTip;
export { mod };
