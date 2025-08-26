import React from 'react';
import { useTranslation } from 'react-i18next';
import type { TipModule } from '..';
import { Typography, Box } from '@mui/material';
import { TipContent } from '../../ui';
import { CodeBlock } from '../../ui/CodeBlock';
import { meta } from './meta';

const CSharp11Tip: React.FC = () => {
  const { t } = useTranslation('tips');

  const list = (items: string[]) => (
    <Box component="ul" sx={{ pl: 3, mb: 2 }}>
      {items.map((line, idx) => (
        <li key={idx}>
          <Typography component="span" variant="body1">
            {line}
          </Typography>
        </li>
      ))}
    </Box>
  );

  return (
    <TipContent>
      <Typography variant="h3">{t('csharp-11.content.mainTitle')}</Typography>
      <Typography paragraph>{t('csharp-11.content.overview')}</Typography>

      <Typography variant="h4">{t('csharp-11.content.useCases.title')}</Typography>

      <Typography variant="h5">{t('csharp-11.content.useCases.case1.title')}</Typography>
      <Typography paragraph>{t('csharp-11.content.useCases.case1.description')}</Typography>
      <CodeBlock language="csharp" ariaLabel="csharp11-raw-strings" code={t('csharp-11.content.useCases.case1.code')} />

      <Typography variant="h5">{t('csharp-11.content.useCases.case2.title')}</Typography>
      <Typography paragraph>{t('csharp-11.content.useCases.case2.description')}</Typography>
      <CodeBlock language="csharp" ariaLabel="csharp11-required" code={t('csharp-11.content.useCases.case2.code')} />

      <Typography variant="h5">{t('csharp-11.content.useCases.case3.title')}</Typography>
      <Typography paragraph>{t('csharp-11.content.useCases.case3.description')}</Typography>
      <CodeBlock language="csharp" ariaLabel="csharp11-list-patterns" code={t('csharp-11.content.useCases.case3.code')} />

      <Typography variant="h4">{t('csharp-11.content.summary.title')}</Typography>
      <Typography paragraph>{t('csharp-11.content.summary.text')}</Typography>
      <Typography variant="h5">{t('csharp-11.content.summary.prosTitle')}</Typography>
      {list(t('csharp-11.content.summary.pros', { returnObjects: true }) as string[])}
      <Typography variant="h5">{t('csharp-11.content.summary.consTitle')}</Typography>
      {list(t('csharp-11.content.summary.cons', { returnObjects: true }) as string[])}

      <Typography variant="h4">{t('csharp-11.content.goodPractices.title')}</Typography>
      {list(t('csharp-11.content.goodPractices.items', { returnObjects: true }) as string[])}

      <Box mt={4} pt={2} borderTop={(theme) => `1px solid ${theme.palette.divider}`} sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="caption" sx={{ fontStyle: 'italic' }}>
          {t('csharp-11.content.footer.sourcesLabel')}{' '}
          {(
            t('csharp-11.content.footer.sources', { returnObjects: true }) as { name: string; url: string }[]
          )
            .map((s, i) => (
              <span key={i}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'inherit', textDecoration: 'underline' }}
                >
                  {s.name}
                </a>
                {i < ((t('csharp-11.content.footer.sources', { returnObjects: true }) as any[]).length - 1) ? ' • ' : ''}
              </span>
            ))}
        </Typography>
        <Typography variant="caption" sx={{ fontStyle: 'italic' }}>
          {t('csharp-11.content.footer.writtenOn', { date: meta.writtenOn })}
        </Typography>
      </Box>
    </TipContent>
  );
};

const mod: TipModule = { default: CSharp11Tip, meta };
export default CSharp11Tip;
export { mod };
