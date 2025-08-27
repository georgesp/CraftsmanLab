import React from 'react';
import { useTranslation } from 'react-i18next';
import type { TipModule } from '..';
import { Typography, Box } from '@mui/material';
import TipContent from '../TipContent';
import { CodeBlock } from '../../ui/CodeBlock/CodeBlock';
import { meta } from './meta';

const McpServersTip: React.FC = () => {
  const { t } = useTranslation('tips');

  return (
    <TipContent>
      <Typography variant="h3">{t('mcp-servers.content.mainTitle')}</Typography>
      <Typography paragraph>{t('mcp-servers.content.intro')}</Typography>

      <Typography variant="h4">{t('mcp-servers.content.config.title')}</Typography>
      <Typography paragraph>{t('mcp-servers.content.config.text')}</Typography>
      <Box component="ul">
        {(t('mcp-servers.content.config.steps', { returnObjects: true }) as string[]).map((x, i) => (
          <li key={i}><Typography component="span">{x}</Typography></li>
        ))}
      </Box>

      <Typography variant="h4">{t('mcp-servers.content.github.title')}</Typography>
      <Typography paragraph>{t('mcp-servers.content.github.description')}</Typography>
      <Typography variant="h5">{t('mcp-servers.content.github.useCasesTitle')}</Typography>
      <Box component="ul">
        {(t('mcp-servers.content.github.useCases', { returnObjects: true }) as string[]).map((x, i) => (
          <li key={i}><Typography component="span">{x}</Typography></li>
        ))}
      </Box>
      <CodeBlock language="bash" ariaLabel="mcp-github-examples" code={t('mcp-servers.content.github.codeExamples')} />

      <Typography variant="h4">{t('mcp-servers.content.msdocs.title')}</Typography>
      <Typography paragraph>{t('mcp-servers.content.msdocs.description')}</Typography>
      <Typography variant="h5">{t('mcp-servers.content.msdocs.useCasesTitle')}</Typography>
      <Box component="ul">
        {(t('mcp-servers.content.msdocs.useCases', { returnObjects: true }) as string[]).map((x, i) => (
          <li key={i}><Typography component="span">{x}</Typography></li>
        ))}
      </Box>
      <CodeBlock language="bash" ariaLabel="mcp-msdocs-examples" code={t('mcp-servers.content.msdocs.codeExamples')} />

      <Typography variant="h4">{t('mcp-servers.content.figma.title')}</Typography>
      <Typography paragraph>{t('mcp-servers.content.figma.description')}</Typography>
      <Typography variant="h5">{t('mcp-servers.content.figma.useCasesTitle')}</Typography>
      <Box component="ul">
        {(t('mcp-servers.content.figma.useCases', { returnObjects: true }) as string[]).map((x, i) => (
          <li key={i}><Typography component="span">{x}</Typography></li>
        ))}
      </Box>
      <CodeBlock language="bash" ariaLabel="mcp-figma-examples" code={t('mcp-servers.content.figma.codeExamples')} />

      <Typography variant="h4">{t('mcp-servers.content.azureDevOps.title')}</Typography>
      <Typography paragraph>{t('mcp-servers.content.azureDevOps.description')}</Typography>
      <Typography variant="h5">{t('mcp-servers.content.azureDevOps.useCasesTitle')}</Typography>
      <Box component="ul">
        {(t('mcp-servers.content.azureDevOps.useCases', { returnObjects: true }) as string[]).map((x, i) => (
          <li key={i}><Typography component="span">{x}</Typography></li>
        ))}
      </Box>
      <CodeBlock language="bash" ariaLabel="mcp-azdo-examples" code={t('mcp-servers.content.azureDevOps.codeExamples')} />

      <Typography variant="h4">{t('mcp-servers.content.summary.title')}</Typography>
      <Typography paragraph>{t('mcp-servers.content.summary.text')}</Typography>

      <Box mt={4} pt={2} borderTop={(theme) => `1px solid ${theme.palette.divider}`} sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="caption" sx={{ fontStyle: 'italic' }}>
          <a href="https://code.visualstudio.com/mcp" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>
            {t('mcp-servers.content.footer.sourceLabel')}
          </a>
        </Typography>
        <Typography variant="caption" sx={{ fontStyle: 'italic' }}>
          {t('mcp-servers.content.footer.writtenOn', { date: meta.writtenOn })}
        </Typography>
      </Box>
    </TipContent>
  );
};

const mod: TipModule = { default: McpServersTip, meta };
export default McpServersTip;
export { mod };
