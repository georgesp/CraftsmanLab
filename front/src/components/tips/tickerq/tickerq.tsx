import React from 'react';
import { useTranslation } from 'react-i18next';
import type { TipModule } from '..';
import { Box, Typography, Link } from '@mui/material';
import { CodeBlock } from '../../ui/CodeBlock/CodeBlock';
import { meta } from './meta';

const cronJobExample = `public class CleanupJobs(ICleanUpService cleanUpService)
{
    private readonly ICleanUpService _cleanUpService = cleanUpService;

    [TickerFunction(functionName: "CleanupLogs", cronExpression: "0 0 * * *" )]
    public async Task CleanupLogs(TickerFunctionContext<string> ctx, CancellationToken ct)
    {
        var file = ctx.Request; // e.g. cleanup_example_file.txt
        await _cleanUpService.CleanOldLogsAsync(file, ct);
    }
}`;

const programSetup = `builder.Services.AddTickerQ(options =>
{
    options.SetMaxConcurrency(10);
    options.AddOperationalStore<MyDbContext>(efOpt =>
    {
        efOpt.SetExceptionHandler<MyExceptionHandlerClass>();
        efOpt.UseModelCustomizerForMigrations();
    });
    options.AddDashboard(ui =>
    {
        ui.BasePath = "/tickerq-dashboard";
        ui.AddDashboardBasicAuth();
    });
});

app.UseTickerQ(); // activate processors`;

const scheduleExamples = `// One-shot time based job
await _timeTickerManager.AddAsync(new TimeTicker
{
    Function = "CleanupLogs",
    ExecutionTime = DateTime.UtcNow.AddMinutes(1),
    Request = TickerHelper.CreateTickerRequest<string>("cleanup_example_file.txt"),
    Retries = 3,
    RetryIntervals = new[] { 30, 60, 120 },
});

// Recurring cron job
await _cronTickerManager.AddAsync(new CronTicker
{
    Function = "CleanupLogs",
    Expression = "0 */6 * * *", // every 6 hours
    Request = TickerHelper.CreateTickerRequest<string>("cleanup_example_file.txt"),
    Retries = 2,
    RetryIntervals = new[] { 60, 300 }
});`;

const dbContextManualConfig = `public class MyDbContext : DbContext
{
    public MyDbContext(DbContextOptions<MyDbContext> options) : base(options) { }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        // Explicit configuration if not using UseModelCustomizerForMigrations
        builder.ApplyConfiguration(new TimeTickerConfigurations());
        builder.ApplyConfiguration(new CronTickerConfigurations());
        builder.ApplyConfiguration(new CronTickerOccurrenceConfigurations());
        // or: builder.ApplyConfigurationsFromAssembly(typeof(TimeTickerConfigurations).Assembly);
    }
}`;

const retryThrottling = `// Example of retry intervals & throttling like behaviour via configuration
await _timeTickerManager.AddAsync(new TimeTicker
{
    Function = "ImportData",
    ExecutionTime = DateTime.UtcNow.AddSeconds(30),
    Request = TickerHelper.CreateTickerRequest<string>("import_batch_42"),
    Retries = 5,
    RetryIntervals = new[] { 10, 30, 60, 120, 300 },
    // (Pseudo) throttle approach: keep Function concurrency low via SetMaxConcurrency globally
});`;

const dashboardSnippet = `// Add dashboard with basic auth (see real docs for advanced auth)
builder.Services.AddTickerQ(o =>
{
    o.AddDashboard(ui =>
    {
        ui.BasePath = "/tickerq-dashboard";
        ui.AddDashboardBasicAuth();
    });
});`;

const TickerQTip: React.FC = () => {
  const { t } = useTranslation('tips');

  const features: string[] = t('tickerq.content.features.items', { returnObjects: true }) as any;
  const bestPractices: Array<{ rule: string; reason: string }> = t(
    'tickerq.content.bestPractices.items',
    { returnObjects: true },
  ) as any;
  const sources: Array<{ name: string; url: string }> = t('tickerq.content.sources.list', {
    returnObjects: true,
  }) as any;

  return (
    <Box>
      <Typography variant="h3" gutterBottom>
        {t('tickerq.content.mainTitle')}
      </Typography>
      <Typography paragraph>{t('tickerq.content.intro')}</Typography>

      <Typography variant="h4" gutterBottom>
        {t('tickerq.content.presentation.title')}
      </Typography>
      <Typography paragraph>{t('tickerq.content.presentation.text')}</Typography>

      <Typography variant="h4" gutterBottom>
        {t('tickerq.content.installation.title')}
      </Typography>
      <CodeBlock language="bash" ariaLabel="tickerq-install" code={t('tickerq.content.installation.commands')} />
      <Typography paragraph>{t('tickerq.content.installation.note')}</Typography>

      <Typography variant="h4" gutterBottom>
        {t('tickerq.content.features.title')}
      </Typography>
      <Box component="ul" sx={{ ml: 2 }}>
        {features.map((f, i) => (
          <li key={i}>
            <Typography component="span">{f}</Typography>
          </li>
        ))}
      </Box>

      <Typography variant="h5" sx={{ mt: 3 }} gutterBottom>
        {t('tickerq.content.sections.setup.title')}
      </Typography>
      <Typography paragraph>{t('tickerq.content.sections.setup.text')}</Typography>
      <CodeBlock language="csharp" ariaLabel="tickerq-program-setup" code={programSetup} />

      <Typography variant="h5" sx={{ mt: 3 }} gutterBottom>
        {t('tickerq.content.sections.jobs.title')}
      </Typography>
      <Typography paragraph>{t('tickerq.content.sections.jobs.text')}</Typography>
      <CodeBlock language="csharp" ariaLabel="tickerq-cron-job" code={cronJobExample} />
      <CodeBlock language="csharp" ariaLabel="tickerq-scheduling" code={scheduleExamples} />

      <Typography variant="h5" sx={{ mt: 3 }} gutterBottom>
        {t('tickerq.content.sections.persistence.title')}
      </Typography>
      <Typography paragraph>{t('tickerq.content.sections.persistence.text')}</Typography>
      <CodeBlock language="csharp" ariaLabel="tickerq-dbcontext" code={dbContextManualConfig} />

      <Typography variant="h5" sx={{ mt: 3 }} gutterBottom>
        {t('tickerq.content.sections.retryThrottling.title')}
      </Typography>
      <Typography paragraph>{t('tickerq.content.sections.retryThrottling.text')}</Typography>
      <CodeBlock language="csharp" ariaLabel="tickerq-retry-throttling" code={retryThrottling} />

      <Typography variant="h5" sx={{ mt: 3 }} gutterBottom>
        {t('tickerq.content.sections.dashboard.title')}
      </Typography>
      <Typography paragraph>{t('tickerq.content.sections.dashboard.text')}</Typography>
      <CodeBlock language="csharp" ariaLabel="tickerq-dashboard" code={dashboardSnippet} />

      <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
        {t('tickerq.content.bestPractices.title')}
      </Typography>
      <Box component="ul" sx={{ ml: 2 }}>
        {bestPractices.map((bp, i) => (
          <li key={i}>
            <Typography component="span">
              <strong>{bp.rule}</strong>: {bp.reason}
            </Typography>
          </li>
        ))}
      </Box>

      <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
        {t('tickerq.content.summary.title')}
      </Typography>
      <Typography paragraph>{t('tickerq.content.summary.text')}</Typography>

      <Box
        mt={4}
        pt={2}
        borderTop={(theme) => `1px solid ${theme.palette.divider}`}
        sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}
      >
        <Typography variant="caption" component="div" sx={{ fontStyle: 'italic', color: 'text.secondary' }}>
          {t('tickerq.content.sources.title')}{' '}
          {sources.map((s, i) => (
            <span key={s.url}>
              <Link href={s.url} target="_blank" rel="noopener noreferrer" underline="always" color="inherit">
                {s.name}
              </Link>
              {i < sources.length - 1 ? ' • ' : ''}
            </span>
          ))}
        </Typography>
        <Typography variant="caption" component="div" sx={{ fontStyle: 'italic', color: 'text.secondary' }}>
          {t('tickerq.content.footer.writtenOn', { date: meta.writtenOn })}
        </Typography>
      </Box>
    </Box>
  );
};

const mod: TipModule = { default: TickerQTip, meta };
export default TickerQTip;
export { mod };
