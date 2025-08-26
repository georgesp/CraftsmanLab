import React from 'react';
import { useTranslation } from 'react-i18next';
import type { TipModule } from '..';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { CodeBlock } from '../../ui/CodeBlock/CodeBlock';
import { meta } from './meta';

const PollyTip: React.FC = () => {
  const { t } = useTranslation('tips');

  const _useCasesRaw = t('polly.content.useCases.items', { returnObjects: true });
  const useCases: string[] = Array.isArray(_useCasesRaw)
    ? _useCasesRaw
    : typeof _useCasesRaw === 'string'
      ? [_useCasesRaw]
      : [];

  const _commonPoliciesRowsRaw = t('polly.content.sections.principle.commonPolicies.table.rows', {
    returnObjects: true,
  });
  const commonPoliciesRows: Array<any> = Array.isArray(_commonPoliciesRowsRaw)
    ? _commonPoliciesRowsRaw
    : [];

  const _bestPracticesRowsRaw = t('polly.content.sections.bestPractices.table.rows', {
    returnObjects: true,
  });
  const bestPracticesRows: Array<any> = Array.isArray(_bestPracticesRowsRaw)
    ? _bestPracticesRowsRaw
    : [];

  const _circuitExplanationsRaw = t(
    'polly.content.sections.examples.circuitBreakerFallback.explanations',
    { returnObjects: true },
  );
  const circuitExplanations: string[] = Array.isArray(_circuitExplanationsRaw)
    ? _circuitExplanationsRaw
    : typeof _circuitExplanationsRaw === 'string'
      ? [_circuitExplanationsRaw]
      : [];

  return (
    <Box>
      <Typography variant="h3" gutterBottom>
        {t('polly.content.mainTitle')}
      </Typography>

      <Typography paragraph>{t('polly.content.intro')}</Typography>

      <Typography paragraph>{t('polly.content.useCases.title')}</Typography>
      <Typography component="ul" sx={{ ml: 2 }}>
        {useCases.slice(0, 3).map((it, idx) => (
          <li key={idx}>{it}</li>
        ))}
      </Typography>

      <Typography paragraph>{t('polly.content.summary')}</Typography>

      <Typography variant="h4" gutterBottom sx={{ mt: 3 }}>
        {t('polly.content.sections.installation.title')}
      </Typography>

      <Typography variant="h5" gutterBottom>
        {t('polly.content.sections.installation.nuget.title')}
      </Typography>
      <CodeBlock
        language="bash"
  code={t('polly.content.sections.installation.nuget.code', { defaultValue: '# Install from Package Manager Console\nInstall-Package Polly\n\n# or with .NET CLI\ndotnet add package Polly' })}
      />

      <Typography paragraph>
        {t('polly.content.sections.installation.nuget.description')}
      </Typography>

      <Typography variant="h4" gutterBottom sx={{ mt: 3 }}>
        {t('polly.content.sections.principle.title')}
      </Typography>

      <Typography variant="h5" gutterBottom>
        {t('polly.content.sections.principle.policyRule')}
      </Typography>
      <CodeBlock
        language="csharp"
        code={`var retryPolicy = Policy
  // Target IOException
  .Handle<IOException>()
  .WaitAndRetry(3, attempt => TimeSpan.FromSeconds(Math.Pow(2, attempt)));`}
      />

      <Typography component="ul" sx={{ ml: 2, mt: 2 }}>
        <li>
          <code>Handle&lt;TException&gt;()</code> :{' '}
          {t('polly.content.sections.principle.policyRuleDetails.handleDescription')}
        </li>
        <li>
          <code>WaitAndRetry(...)</code> :{' '}
          {t('polly.content.sections.principle.policyRuleDetails.waitAndRetryDescription')}
        </li>
      </Typography>

      <Typography paragraph sx={{ mt: 2 }}>
        {t('polly.content.sections.principle.policyRuleDetails.applyDescription')}
      </Typography>
      <CodeBlock
        language="csharp"
        code={`retryPolicy.Execute(() => File.ReadAllText("data.txt"));`}
      />

      <Typography paragraph>
        {t('polly.content.sections.principle.policyRuleDetails.executionDescription')}
      </Typography>

      <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>
        {t('polly.content.sections.principle.commonPolicies.title')}
      </Typography>
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>
                  {t('polly.content.sections.principle.commonPolicies.table.headers.0')}
                </strong>
              </TableCell>
              <TableCell>
                <strong>
                  {t('polly.content.sections.principle.commonPolicies.table.headers.1')}
                </strong>
              </TableCell>
              <TableCell>
                <strong>
                  {t('polly.content.sections.principle.commonPolicies.table.headers.2')}
                </strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {commonPoliciesRows.map((r, i) => (
              <TableRow key={i}>
                <TableCell>{r.type}</TableCell>
                <TableCell>{r.when}</TableCell>
                <TableCell>
                  <code>{r.example}</code>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="h4" gutterBottom sx={{ mt: 3 }}>
        {t('polly.content.sections.examples.title')}
      </Typography>

      <Typography variant="h5" gutterBottom>
        {t('polly.content.sections.examples.retryTimeout.title')}
      </Typography>
      <CodeBlock
        language="csharp"
        code={`using Polly;
using System.Net.Http;
 
// 1) Create an HttpClient (or use IHttpClientFactory)
var client = new HttpClient();

// 2) Define the policies
var timeoutPolicy = Policy.Timeout<HttpResponseMessage>(TimeSpan.FromSeconds(3));
var retryPolicy = Policy.Handle<Exception>()
             .WaitAndRetryAsync(
               retryCount: 3,
               sleepDurationProvider: attempt => TimeSpan.FromMilliseconds(200 * attempt)
             );

// 3) Compose the two policies
var policyWrap = Policy.WrapAsync(retryPolicy, timeoutPolicy);

// 4) Execute the HTTP call with the policy
var response = await policyWrap.ExecuteAsync(async () =>
{
  return await client.GetAsync("https://example.com/api/data");
});

Console.WriteLine($"Status : {response.StatusCode}");`}
      />

      <Typography paragraph sx={{ mt: 2 }}>
        <strong>{t('polly.content.sections.examples.retryTimeout.astuce')}</strong>
      </Typography>

      <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>
        {t('polly.content.sections.examples.circuitBreakerFallback.title')}
      </Typography>
      <CodeBlock
        language="csharp"
        code={`var circuitBreaker = Policy.Handle<Exception>()
                           .CircuitBreakerAsync(
                               exceptionsAllowedBeforeBreaking: 2,
                               durationOfBreak: TimeSpan.FromSeconds(10)
                           );

var fallback = Policy<string>
               .Handle<Exception>()
               .FallbackAsync("service unavailable");

var policyWrap = Policy.WrapAsync(fallback, circuitBreaker);

string result = await policyWrap.ExecuteAsync(async () =>
{
  // Simulate a call to an external service that may fail
  return await SomeExternalService.GetDataAsync();
});

Console.WriteLine(result);`}
      />

      <Typography paragraph sx={{ mt: 2 }}>
        {t('polly.content.sections.examples.circuitBreakerFallback.description')}
      </Typography>
      <Typography component="ul" sx={{ ml: 2 }}>
        {circuitExplanations.map((ex, idx) => (
          <li key={idx}>{ex}</li>
        ))}
      </Typography>

      <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>
        {t('polly.content.sections.examples.exponentialBackoff.title')}
      </Typography>
      <CodeBlock
        language="csharp"
        code={`var retryPolicy = Policy.Handle<Exception>()
    .WaitAndRetryAsync(
        retryCount: 5,
        sleepDurationProvider: attempt => TimeSpan.FromSeconds(Math.Pow(2, attempt))
    );

await retryPolicy.ExecuteAsync(async () =>
{
    await SomeOperationThatMayFail();
});`}
      />

      <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>
        {t('polly.content.sections.examples.httpClientFactory.title')}
      </Typography>
      <CodeBlock
        language="csharp"
        code={`services.AddHttpClient("myclient")
        .AddPolicyHandler(HttpPolicyExtensions
            .HandleTransientHttpError()
            .RetryAsync(3))
        .AddPolicyHandler(HttpPolicyExtensions
            .HandleTransientHttpError()
            .CircuitBreakerAsync(5, TimeSpan.FromSeconds(30)));`}
      />

      <Typography paragraph sx={{ mt: 2 }}>
        <code>HandleTransientHttpError()</code>{' '}
        {t('polly.content.sections.examples.httpClientFactory.description')}
      </Typography>

      <Typography variant="h4" gutterBottom sx={{ mt: 3 }}>
        {t('polly.content.sections.bestPractices.title')}
      </Typography>

      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>{t('polly.content.sections.bestPractices.table.headers.0')}</strong>
              </TableCell>
              <TableCell>
                <strong>{t('polly.content.sections.bestPractices.table.headers.1')}</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bestPracticesRows.map((r, i) => (
              <TableRow key={i}>
                <TableCell>{r.rule}</TableCell>
                <TableCell>{r.reason}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="h4" gutterBottom sx={{ mt: 3 }}>
        {t('polly.content.sections.summary.title')}
      </Typography>
      <Typography paragraph>{t('polly.content.sections.summary.content')}</Typography>

      <Typography paragraph>{t('polly.content.sections.summary.conclusion')}</Typography>

      <Box
        mt={4}
        pt={2}
        borderTop={(theme) => `1px solid ${theme.palette.divider}`}
        sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
      >
        <Typography variant="caption" component="div" sx={{ fontStyle: 'italic', color: 'text.secondary' }}>
          {t('polly.content.footer.sourcesLabel')}{' '}
          <a
            href="https://github.com/App-vNext/Polly"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'inherit', textDecoration: 'underline' }}
          >
            {t('polly.content.footer.officialDocs')}
          </a>{' '}
          •{' '}
          <a
            href="https://github.com/App-vNext/Polly/blob/main/docs/polly.md"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'inherit', textDecoration: 'underline' }}
          >
            {t('polly.content.footer.fullGuide')}
          </a>
        </Typography>
        <Typography variant="caption" component="div" sx={{ color: 'text.secondary' }}>
          {t('polly.content.footer.writtenOn', { date: meta.writtenOn })}
        </Typography>
      </Box>
    </Box>
  );
};

const mod: TipModule = { default: PollyTip, meta };
export default PollyTip;
export { mod };
