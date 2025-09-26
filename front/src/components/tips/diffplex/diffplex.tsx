import React from 'react';
import { Typography, Box, Link } from '@mui/material';
import { useTranslation } from 'react-i18next';
import type { TipModule } from '..';
import { TipContent } from '../../ui';
import { CodeBlock } from '../../ui/CodeBlock/CodeBlock';
import { meta } from './meta';

const DiffPlexTip: React.FC = () => {
  const { t } = useTranslation('tips');

  const sources = t('diffplex.content.footer.sources', { returnObjects: true }) as {
    name: string;
    url: string;
  }[];

  return (
    <TipContent>
      <Typography variant="h3" gutterBottom>
        {t('diffplex.content.mainTitle')}
      </Typography>
      <Typography paragraph>{t('diffplex.content.intro')}</Typography>

      <Typography variant="h4" gutterBottom>
        {t('diffplex.content.sections.quickStart.title')}
      </Typography>
      <CodeBlock
        language="csharp"
        ariaLabel="diffplex-quickstart-inline"
        code={t('diffplex.content.sections.quickStart.code')}
      />

      <Typography variant="h4" gutterBottom>
        {t('diffplex.content.sections.sideBySide.title')}
      </Typography>
      <CodeBlock
        language="csharp"
        ariaLabel="diffplex-side-by-side"
        code={t('diffplex.content.sections.sideBySide.code')}
      />

      <Typography variant="h4" gutterBottom>
        {t('diffplex.content.sections.unidiff.title')}
      </Typography>
      <CodeBlock
        language="csharp"
        ariaLabel="diffplex-unidiff"
        code={t('diffplex.content.sections.unidiff.code')}
      />

      <Typography variant="h4" gutterBottom>
        {t('diffplex.content.sections.threeWay.title')}
      </Typography>
      <CodeBlock
        language="csharp"
        ariaLabel="diffplex-three-way"
        code={t('diffplex.content.sections.threeWay.code')}
      />

      <Typography variant="h4" gutterBottom>
        {t('diffplex.content.sections.options.title')}
      </Typography>
      <ul>
        {(t('diffplex.content.sections.options.items', { returnObjects: true }) as string[]).map(
          (it, idx) => (
            <li key={idx}>
              <Typography component="span">{it}</Typography>
            </li>
          ),
        )}
      </ul>

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
          {t('diffplex.content.footer.sourcesLabel')}{' '}
          {sources.map((s, i) => (
            <span key={i}>
              <Link href={s.url} target="_blank" rel="noopener noreferrer" underline="always" color="inherit">
                {s.name}
              </Link>
              {i < sources.length - 1 ? ' • ' : ''}
            </span>
          ))}
        </Typography>
        <Typography variant="caption" component="div" sx={{ color: 'text.secondary' }}>
          {t('diffplex.content.footer.writtenOn', { date: meta.writtenOn })}
        </Typography>
      </Box>
    </TipContent>
  );
};

const mod: TipModule = { default: DiffPlexTip, meta };
export default DiffPlexTip;
export { mod };
