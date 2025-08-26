import React from 'react';
import { useTranslation } from 'react-i18next';
import type { TipModule } from '..';
import { Box, Typography } from '@mui/material';
import { CodeBlock } from '../../ui/CodeBlock';
import { meta } from './meta';
import TipContent from '../TipContent';

const CentralPackageManagementTip: React.FC = () => {
  const { t } = useTranslation('tips');

  return (
    <TipContent>
      <Typography variant="h3" gutterBottom>
        {t('cpm.content.mainTitle')}
      </Typography>
      <Typography
        variant="subtitle1"
        gutterBottom
        sx={{ fontStyle: 'italic', color: 'text.secondary' }}
      >
        {t('cpm.content.subtitle')}
      </Typography>

      <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>
        {t('cpm.content.sections.why.title')}
      </Typography>
      <ul>
        <li>
          <strong>{t('cpm.content.sections.why.benefits.uniformity.title')}</strong>{' '}
          {t('cpm.content.sections.why.benefits.uniformity.description')}
        </li>
        <li>
          <strong>{t('cpm.content.sections.why.benefits.maintenance.title')}</strong>{' '}
          {t('cpm.content.sections.why.benefits.maintenance.description')}
        </li>
        <li>
          <strong>{t('cpm.content.sections.why.benefits.audit.title')}</strong>{' '}
          {t('cpm.content.sections.why.benefits.audit.description')}
        </li>
      </ul>

      <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>
        {t('cpm.content.sections.setup.title')}
      </Typography>
      <Typography paragraph sx={{ fontWeight: 'bold' }}>
        {t('cpm.content.sections.setup.prerequisites')}
      </Typography>

      <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
        {t('cpm.content.sections.setup.steps.createSolution.title')}
      </Typography>
      <CodeBlock language="bash" ariaLabel="cpm-create-sln" code={`dotnet new sln -n MySolution`} />

      <Typography paragraph sx={{ mt: 2 }}>
        {t('cpm.content.sections.setup.steps.addProjects.title')}
      </Typography>
      <CodeBlock
        language="bash"
        ariaLabel="cpm-add-projects"
        code={`dotnet new classlib -o src/LibA
dotnet new console -o src/App
dotnet sln add src/**/*.csproj`}
      />

      <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
        {t('cpm.content.sections.setup.steps.enable.title')}
      </Typography>
      <Typography paragraph>{t('cpm.content.sections.directoryPackages.description')}</Typography>
      <CodeBlock
        language="xml"
        ariaLabel="cpm-directory-packages"
        code={`<?xml version="1.0" encoding="utf-8"?>
<Project>
  <ItemGroup>
    <!-- Centralized package versions -->
    <PackageVersion Include="Newtonsoft.Json" Version="13.0.3" />
    <PackageVersion Include="Serilog" Version="2.12.0" />
  </ItemGroup>
</Project>`}
      />

      <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
        {t('cpm.content.sections.projectFiles.title')}
      </Typography>
      <Typography paragraph>{t('cpm.content.sections.projectFiles.description')}</Typography>
      <CodeBlock
        language="xml"
        ariaLabel="cpm-csproj-sample"
        code={`<Project Sdk="Microsoft.NET.Sdk">
  <ItemGroup>
    <PackageReference Include="Newtonsoft.Json" />
    <PackageReference Include="Serilog" />
  </ItemGroup>
</Project>`}
      />

      <Typography paragraph>{t('cpm.content.sections.projectFiles.important')}</Typography>

      <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
        {t('cpm.content.sections.verify.title')}
      </Typography>
      <CodeBlock language="bash" ariaLabel="cpm-restore" code={`dotnet restore`} />
      <Typography paragraph>{t('cpm.content.sections.verify.description')}</Typography>

      <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>
        {t('cpm.content.sections.howItWorks.title')}
      </Typography>
      <ul>
        <li>{t('cpm.content.sections.howItWorks.items.intercept')}</li>
        <li>{t('cpm.content.sections.howItWorks.items.read')}</li>
        <li>{t('cpm.content.sections.howItWorks.items.fail')}</li>
      </ul>

      <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>
        {t('cpm.content.sections.bestPractices.title')}
      </Typography>
      <Box component="table" sx={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', padding: '8px', borderBottom: '1px solid #ddd' }}>
              {t('cpm.content.sections.bestPractices.tableHeaders.tip')}
            </th>
            <th style={{ textAlign: 'left', padding: '8px', borderBottom: '1px solid #ddd' }}>
              {t('cpm.content.sections.bestPractices.tableHeaders.why')}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>
              {t('cpm.content.sections.bestPractices.rows.vcs.title')}
            </td>
            <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>
              {t('cpm.content.sections.bestPractices.rows.vcs.why')}
            </td>
          </tr>
          <tr>
            <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>
              {t('cpm.content.sections.bestPractices.rows.outdated.title')}
            </td>
            <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>
              {t('cpm.content.sections.bestPractices.rows.outdated.why')}
            </td>
          </tr>
          <tr>
            <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>
              {t('cpm.content.sections.bestPractices.rows.locked.title')}
            </td>
            <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>
              {t('cpm.content.sections.bestPractices.rows.locked.why')}
            </td>
          </tr>
        </tbody>
      </Box>

      <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>
        {t('cpm.content.sections.quickSummary.title')}
      </Typography>
      <ul>
        <li>{t('cpm.content.sections.quickSummary.items.create')}</li>
        <li>{t('cpm.content.sections.quickSummary.items.declare')}</li>
        <li>{t('cpm.content.sections.quickSummary.items.remove')}</li>
        <li>{t('cpm.content.sections.quickSummary.items.restore')}</li>
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
          <a
            href="https://learn.microsoft.com/en-us/dotnet/core/packaging/central-package-management"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'inherit', textDecoration: 'underline' }}
          >
            {t('cpm.content.footer.sourceLabel')}
          </a>
        </Typography>
        <Typography variant="caption" component="div" sx={{ color: 'text.secondary' }}>
          {t('cpm.content.footer.writtenOn', { date: meta.writtenOn })}
        </Typography>
      </Box>
  </TipContent>
  );
};

const mod: TipModule = { default: CentralPackageManagementTip, meta };
export default CentralPackageManagementTip;
export { mod };
