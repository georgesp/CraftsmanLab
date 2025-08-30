import React from 'react';
import { useTranslation } from 'react-i18next';
import type { TipModule } from '..';
import { Typography, Box } from '@mui/material';
import { TipContent } from '../../ui';
import { CodeBlock } from '../../ui/CodeBlock';
import { meta } from './meta';

const CSharp12Tip: React.FC = () => {
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
      <Typography variant="h3">{t('csharp-12.content.mainTitle')}</Typography>
      <Typography paragraph>{t('csharp-12.content.overview')}</Typography>

      <Typography variant="h4">{t('csharp-12.content.features.title')}</Typography>
      <Box component="ul" sx={{ pl: 3, mb: 2 }}>
        {(t('csharp-12.content.features.items', { returnObjects: true }) as string[]).map(
          (txt, i) => {
            const anchors = [
              'primary-constructors',
              'collection-expressions',
              'lambda-defaults',
              'type-alias',
              'inline-array',
              'patterns',
            ];
            const id = anchors[i] ?? `feature-${i}`;
            return (
              <li key={i}>
                <a href={`#${id}`} style={{ color: 'inherit', textDecoration: 'underline' }}>
                  {txt}
                </a>
              </li>
            );
          },
        )}
      </Box>

      <Typography variant="h4">{t('csharp-12.content.useCases.title')}</Typography>

      <Typography id="primary-constructors" variant="h5">
        {t('csharp-12.content.useCases.case1.title')}
      </Typography>
      <Typography paragraph>{t('csharp-12.content.useCases.case1.description')}</Typography>
      <CodeBlock
        language="csharp"
        ariaLabel="csharp12-primary-constructors"
        code={t('csharp-12.content.useCases.case1.code')}
      />

      <Typography id="collection-expressions" variant="h5">
        {t('csharp-12.content.useCases.case2.title')}
      </Typography>
      <Typography paragraph>{t('csharp-12.content.useCases.case2.description')}</Typography>
      <CodeBlock
        language="csharp"
        ariaLabel="csharp12-collection-expressions"
        code={t('csharp-12.content.useCases.case2.code')}
      />

      <Typography id="lambda-defaults" variant="h5">
        {t('csharp-12.content.useCases.case3.title')}
      </Typography>
      <Typography paragraph>{t('csharp-12.content.useCases.case3.description')}</Typography>
      <CodeBlock
        language="csharp"
        ariaLabel="csharp12-default-lambda-params"
        code={t('csharp-12.content.useCases.case3.code')}
      />

      <Typography variant="h4">{t('csharp-12.content.extras.title')}</Typography>
      <Typography id="type-alias" variant="h5">
        {t('csharp-12.content.extras.typeAlias.title')}
      </Typography>
      <Typography paragraph>{t('csharp-12.content.extras.typeAlias.description')}</Typography>
      <CodeBlock
        language="csharp"
        ariaLabel="csharp12-type-alias"
        code={t('csharp-12.content.extras.typeAlias.code')}
      />
      <Typography id="inline-array" variant="h5">
        {t('csharp-12.content.extras.inlineArray.title')}
      </Typography>
      <Typography paragraph>{t('csharp-12.content.extras.inlineArray.description')}</Typography>
      <CodeBlock
        language="csharp"
        ariaLabel="csharp12-inline-array"
        code={t('csharp-12.content.extras.inlineArray.code')}
      />
      <Typography id="patterns" variant="h5">
        {t('csharp-12.content.extras.patterns.title')}
      </Typography>
      <Typography paragraph>{t('csharp-12.content.extras.patterns.description')}</Typography>
      <CodeBlock
        language="csharp"
        ariaLabel="csharp12-patterns"
        code={t('csharp-12.content.extras.patterns.code')}
      />

      <Typography variant="h4">{t('csharp-12.content.summary.title')}</Typography>
      <Typography paragraph>{t('csharp-12.content.summary.text')}</Typography>
      <Typography variant="h5">{t('csharp-12.content.summary.prosTitle')}</Typography>
      {list(t('csharp-12.content.summary.pros', { returnObjects: true }) as string[])}
      <Typography variant="h5">{t('csharp-12.content.summary.consTitle')}</Typography>
      {list(t('csharp-12.content.summary.cons', { returnObjects: true }) as string[])}

      <Typography variant="h4">{t('csharp-12.content.goodPractices.title')}</Typography>
      {list(t('csharp-12.content.goodPractices.items', { returnObjects: true }) as string[])}

      <Box
        mt={4}
        pt={2}
        borderTop={(theme) => `1px solid ${theme.palette.divider}`}
        sx={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <Typography variant="caption" sx={{ fontStyle: 'italic' }}>
          {t('csharp-12.content.footer.sourcesLabel')}{' '}
          {(
            t('csharp-12.content.footer.sources', { returnObjects: true }) as {
              name: string;
              url: string;
            }[]
          ).map((s, i) => (
            <span key={i}>
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'inherit', textDecoration: 'underline' }}
              >
                {s.name}
              </a>
              {i <
              (t('csharp-12.content.footer.sources', { returnObjects: true }) as any[]).length - 1
                ? ' • '
                : ''}
            </span>
          ))}
        </Typography>
        <Typography variant="caption" sx={{ fontStyle: 'italic' }}>
          {t('csharp-12.content.footer.writtenOn', { date: meta.writtenOn })}
        </Typography>
      </Box>
    </TipContent>
  );
};

const mod: TipModule = { default: CSharp12Tip, meta };
export default CSharp12Tip;
export { mod };
