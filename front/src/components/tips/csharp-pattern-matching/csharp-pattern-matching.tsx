import React from 'react';
import { useTranslation } from 'react-i18next';
import type { TipModule } from '..';
import { Box, Typography, Link } from '@mui/material';
import { TipContent } from '../../ui';
import { CodeBlock } from '../../ui/CodeBlock';
import { meta } from './meta';

const CSharpPatternMatchingTip: React.FC = () => {
  const { t } = useTranslation('tips');

  const sections: {
    key: string;
    anchor: string;
    aria: string;
    lang?: 'csharp' | 'bash' | 'xml';
  }[] = [
    { key: 'typePattern', anchor: 'type-pattern', aria: 'pm-type-pattern' },
    { key: 'constantPattern', anchor: 'constant-pattern', aria: 'pm-constant-pattern' },
    { key: 'relationalPattern', anchor: 'relational-pattern', aria: 'pm-relational-pattern' },
    { key: 'logicalPatterns', anchor: 'logical-patterns', aria: 'pm-logical-patterns' },
    { key: 'propertyPattern', anchor: 'property-pattern', aria: 'pm-property-pattern' },
    { key: 'positionalPattern', anchor: 'positional-pattern', aria: 'pm-positional-pattern' },
    { key: 'listPatterns', anchor: 'list-patterns', aria: 'pm-list-patterns' },
    { key: 'varDiscard', anchor: 'var-discard', aria: 'pm-var-discard' },
    { key: 'switchExpression', anchor: 'switch-expression', aria: 'pm-switch-expression' },
  ];

  return (
    <TipContent>
      <Typography variant="h3">{t('csharp-pattern-matching.content.mainTitle')}</Typography>
      <Typography paragraph>{t('csharp-pattern-matching.content.overview')}</Typography>

      <Typography variant="h4">{t('csharp-pattern-matching.content.typesIndex.title')}</Typography>
      <Box component="ul">
        {sections.map((s, i) => (
          <li key={s.anchor}>
            <a href={`#${s.anchor}`} style={{ color: 'inherit', textDecoration: 'underline' }}>
              {t(`csharp-pattern-matching.content.typesIndex.items.${i}`)}
            </a>
          </li>
        ))}
      </Box>

      <Typography variant="h4">{t('csharp-pattern-matching.content.useCases.title')}</Typography>

      {sections.map((s) => (
        <Box key={s.anchor}>
          <Typography id={s.anchor} variant="h5">
            {t(`csharp-pattern-matching.content.useCases.${s.key}.title`)}
          </Typography>
          <Typography paragraph>
            {t(`csharp-pattern-matching.content.useCases.${s.key}.description`)}
          </Typography>
          <CodeBlock
            language="csharp"
            ariaLabel={s.aria}
            code={t(`csharp-pattern-matching.content.useCases.${s.key}.code`) as string}
          />
        </Box>
      ))}

      <Typography variant="h4">{t('csharp-pattern-matching.content.summary.title')}</Typography>
      <Typography paragraph>{t('csharp-pattern-matching.content.summary.text')}</Typography>
      <Typography variant="h5">{t('csharp-pattern-matching.content.summary.prosTitle')}</Typography>
      <Box component="ul">
        {(
          t('csharp-pattern-matching.content.summary.pros', { returnObjects: true }) as string[]
        ).map((p, i) => (
          <li key={i}>{p}</li>
        ))}
      </Box>
      <Typography variant="h5">{t('csharp-pattern-matching.content.summary.consTitle')}</Typography>
      <Box component="ul">
        {(
          t('csharp-pattern-matching.content.summary.cons', { returnObjects: true }) as string[]
        ).map((c, i) => (
          <li key={i}>{c}</li>
        ))}
      </Box>

      <Typography variant="h4">
        {t('csharp-pattern-matching.content.goodPractices.title')}
      </Typography>
      <Box component="ul">
        {(
          t('csharp-pattern-matching.content.goodPractices.items', {
            returnObjects: true,
          }) as string[]
        ).map((g, i) => (
          <li key={i}>{g}</li>
        ))}
      </Box>

      <Box
        mt={4}
        pt={2}
        borderTop={(theme) => `1px solid ${theme.palette.divider}`}
        sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
      >
        <Typography
          variant="caption"
          component="div"
          sx={{ fontStyle: 'italic', color: 'text.secondary' }}
        >
          {t('csharp-pattern-matching.content.footer.sourcesLabel')}{' '}
          {(
            t('csharp-pattern-matching.content.footer.sources', { returnObjects: true }) as {
              name: string;
              url: string;
            }[]
          ).map((s, i, arr) => (
            <span key={i}>
              <Link
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                underline="always"
                color="inherit"
              >
                {s.name}
              </Link>
              {i < arr.length - 1 ? ' • ' : ''}
            </span>
          ))}
        </Typography>
        <Typography variant="caption" component="div" sx={{ color: 'text.secondary' }}>
          {t('csharp-pattern-matching.content.footer.writtenOn', { date: meta.writtenOn })}
        </Typography>
      </Box>
    </TipContent>
  );
};

const mod: TipModule = { default: CSharpPatternMatchingTip, meta };
export default CSharpPatternMatchingTip;
export { mod };
