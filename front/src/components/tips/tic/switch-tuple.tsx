import React from 'react';
import { useTranslation } from 'react-i18next';
import type { TipModule } from '..';
import { Box, Typography } from '@mui/material';
import { CodeBlock } from '../../ui/CodeBlock/CodeBlock';
import { TipContent } from '../../ui';
import { meta } from './meta';

const SwitchTupleTip: React.FC = () => {
  const { t } = useTranslation('tips');

  return (
    <TipContent>
      <Typography variant="h3" gutterBottom>
        {t('switch-tuple.content.mainTitle')}
      </Typography>

      <Typography paragraph>{t('switch-tuple.content.intro')}</Typography>

      <Typography variant="h4" gutterBottom>
        {t('switch-tuple.content.sections.example.title')}
      </Typography>
      <CodeBlock language="csharp" code={t('switch-tuple.content.sections.example.codeBlock')} />

      <Typography variant="h4" gutterBottom>
        {t('switch-tuple.content.sections.summary.title')}
      </Typography>
      <Box component="ul" sx={{ pl: 3, mb: 2 }}>
        {(
          t('switch-tuple.content.sections.summary.points', { returnObjects: true }) as string[]
        ).map((line, idx) => (
          <li key={idx}>
            <Typography component="span" variant="body1">
              {line}
            </Typography>
          </li>
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
        ></Typography>
        <Typography variant="caption" component="div" sx={{ color: 'text.secondary' }}>
          {t('switch-tuple.content.footer.writtenOn', { date: meta.writtenOn })}
        </Typography>
      </Box>
    </TipContent>
  );
};

const mod: TipModule = { default: SwitchTupleTip, meta };
export default SwitchTupleTip;
export { mod };
