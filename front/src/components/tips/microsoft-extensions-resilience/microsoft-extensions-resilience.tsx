import React from 'react';
import { useTranslation } from 'react-i18next';
import type { TipModule } from '..';
import { Box, Typography, Link, Table, TableHead, TableRow, TableCell, TableBody, TableContainer, Paper } from '@mui/material';
import { CodeBlock } from '../../ui/CodeBlock/CodeBlock';
import { meta } from './meta';

const MsResilienceTip: React.FC = () => {
  const { t } = useTranslation('tips');

  const _strategiesRaw = t('microsoft-extensions-resilience.content.sections.strategies.rows', { returnObjects: true });
  const strategies: Array<any> = Array.isArray(_strategiesRaw) ? _strategiesRaw : [];

  const _bestPracticesRaw = t('microsoft-extensions-resilience.content.sections.bestPractices.items', { returnObjects: true });
  const bestPractices: string[] = Array.isArray(_bestPracticesRaw) ? _bestPracticesRaw : [];

  const _sourcesRaw = t('microsoft-extensions-resilience.content.footer.sources', { returnObjects: true });
  const sources: Array<{ name: string; url: string }> = Array.isArray(_sourcesRaw) ? _sourcesRaw : [];

  return (
    <Box>
      <Typography variant="h3" gutterBottom>
        {t('microsoft-extensions-resilience.content.mainTitle')}
      </Typography>

      <Typography paragraph>{t('microsoft-extensions-resilience.content.intro')}</Typography>
      <Typography paragraph>{t('microsoft-extensions-resilience.content.summary')}</Typography>

      <Typography variant="h4" gutterBottom sx={{ mt: 3 }}>
        {t('microsoft-extensions-resilience.content.sections.installation.title')}
      </Typography>
      <CodeBlock
        language="bash"
        ariaLabel="ms-resilience-install"
        code={t('microsoft-extensions-resilience.content.sections.installation.code', {
          defaultValue: 'dotnet add package Microsoft.Extensions.Resilience',
        })}
      />
      <Typography paragraph>
        {t('microsoft-extensions-resilience.content.sections.installation.description')}
      </Typography>

      <Typography variant="h4" gutterBottom sx={{ mt: 3 }}>
        {t('microsoft-extensions-resilience.content.sections.coreConcepts.title')}
      </Typography>
      <Typography paragraph>
        {t('microsoft-extensions-resilience.content.sections.coreConcepts.pipeline')}
      </Typography>
      <CodeBlock
        language="csharp"
        ariaLabel="ms-resilience-basic-pipeline"
        code={`// Program.cs (ou dans un module d'enregistrement de services)
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Resilience;
using Polly; // (stratégies sous-jacentes)

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddResiliencePipeline<string>(
    pipelineName: "standard-pipeline",
    configure: (pipelineBuilder, context) =>
    {
        // 1. Retry exponentiel
        pipelineBuilder.AddRetry(new RetryStrategyOptions
        {
            MaxRetryAttempts = 3,
            Delay = TimeSpan.FromMilliseconds(200),
            BackoffType = DelayBackoffType.Exponential,
            UseJitter = true,
            ShouldHandle = new PredicateBuilder().Handle<Exception>()
        });

        // 2. Timeout global
        pipelineBuilder.AddTimeout(TimeSpan.FromSeconds(5));

        // 3. Circuit breaker
        pipelineBuilder.AddCircuitBreaker(new CircuitBreakerStrategyOptions
        {
            FailureRatio = 0.5,
            SamplingDuration = TimeSpan.FromSeconds(30),
            MinimumThroughput = 10,
            BreakDuration = TimeSpan.FromSeconds(15)
        });
    });

var app = builder.Build();

app.MapGet("/work", async (IResiliencePipelineProvider<string> provider) =>
{
    var pipeline = provider.GetPipeline("standard-pipeline");
    return await pipeline.ExecuteAsync(async token =>
    {
        // Opération potentiellement fragile
        await Task.Delay(100, token);
        return Results.Ok("OK");
    }, context: "partition-A"); // partition optionnelle
});

app.Run();`}
      />

      <Typography variant="h4" gutterBottom sx={{ mt: 3 }}>
        {t('microsoft-extensions-resilience.content.sections.strategies.title')}
      </Typography>
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell><strong>{t('microsoft-extensions-resilience.content.sections.strategies.headers.0')}</strong></TableCell>
              <TableCell><strong>{t('microsoft-extensions-resilience.content.sections.strategies.headers.1')}</strong></TableCell>
              <TableCell><strong>{t('microsoft-extensions-resilience.content.sections.strategies.headers.2')}</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {strategies.map((s, i) => (
              <TableRow key={i}>
                <TableCell>{s.name}</TableCell>
                <TableCell>{s.when}</TableCell>
                <TableCell><code>{s.example}</code></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>
        {t('microsoft-extensions-resilience.content.sections.httpIntegration.title')}
      </Typography>
      <Typography paragraph>
        {t('microsoft-extensions-resilience.content.sections.httpIntegration.description')}
      </Typography>
      <CodeBlock
        language="csharp"
        ariaLabel="ms-resilience-http"
        code={`builder.Services.AddHttpClient("catalog")
    .AddResilienceHandler("http-standard", (builder, context) =>
    {
        builder.AddRetry(new RetryStrategyOptions<HttpResponseMessage>
        {
            MaxRetryAttempts = 3,
            Delay = TimeSpan.FromMilliseconds(250),
            BackoffType = DelayBackoffType.Exponential,
            ShouldHandle = new PredicateBuilder<HttpResponseMessage>()
                .HandleResult(r => (int)r.StatusCode >= 500)
                .Handle<HttpRequestException>()
        });
        builder.AddTimeout(TimeSpan.FromSeconds(4));
        builder.AddCircuitBreaker(new CircuitBreakerStrategyOptions<HttpResponseMessage>
        {
            FailureRatio = 0.2,
            SamplingDuration = TimeSpan.FromSeconds(20),
            MinimumThroughput = 20,
            BreakDuration = TimeSpan.FromSeconds(10)
        });
    });

// Utilisation via IHttpClientFactory
app.MapGet("/products", async (IHttpClientFactory factory) =>
{
    var client = factory.CreateClient("catalog");
    var response = await client.GetAsync("https://example.com/api/products");
    return Results.Text($"Status: {response.StatusCode}");
});`}
      />

      <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>
        {t('microsoft-extensions-resilience.content.sections.hedging.title')}
      </Typography>
      <Typography paragraph>
        {t('microsoft-extensions-resilience.content.sections.hedging.description')}
      </Typography>
      <CodeBlock
        language="csharp"
        ariaLabel="ms-resilience-hedging"
        code={`builder.Services.AddResiliencePipeline<HttpResponseMessage>(
  "search-hedged",
  (pb, ctx) =>
  {
      pb.AddHedging(new HedgingStrategyOptions<HttpResponseMessage>
      {
          MaxHedgedAttempts = 3,
          Delay = TimeSpan.FromMilliseconds(150),
          ShouldHandle = new PredicateBuilder<HttpResponseMessage>()
              .HandleResult(r => (int)r.StatusCode >= 500 || r.StatusCode == System.Net.HttpStatusCode.RequestTimeout),
          OnHedging = args =>
          {
              Console.WriteLine($"Hedge attempt #{args.AttemptNumber}");
              return default;
          }
      });
      pb.AddTimeout(TimeSpan.FromSeconds(2));
  });

app.MapGet("/search", async (IResiliencePipelineProvider<HttpResponseMessage> provider) =>
{
    var pipeline = provider.GetPipeline("search-hedged");
    var result = await pipeline.ExecuteAsync(async token =>
    {
        using var http = new HttpClient();
        return await http.GetAsync("https://example.com/api/search?q=test", token);
    });
    return Results.Text(result.StatusCode.ToString());
});`}
      />

      <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>
        {t('microsoft-extensions-resilience.content.sections.partitioning.title')}
      </Typography>
      <Typography paragraph>
        {t('microsoft-extensions-resilience.content.sections.partitioning.description')}
      </Typography>
      <CodeBlock
        language="csharp"
        ariaLabel="ms-resilience-partitioning"
        code={`builder.Services.AddResiliencePipeline<string>("per-customer", (pb, ctx) =>
{
    pb.AddRetry(new RetryStrategyOptions { MaxRetryAttempts = 2, Delay = TimeSpan.FromMilliseconds(100) });
});

app.MapGet("/customer/{id}", async (string id, IResiliencePipelineProvider<string> provider) =>
{
    var pipeline = provider.GetPipeline("per-customer");
    return await pipeline.ExecuteAsync(async token =>
    {
        // Logique dépendant du client
        await Task.Delay(50, token);
        return Results.Ok(new { Customer = id });
    }, context: id); // le context devient la clé de partition
});`}
      />

    <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>
    {t('microsoft-extensions-resilience.content.sections.nonHttpDb.title')}
    </Typography>
    <Typography paragraph>
    {t('microsoft-extensions-resilience.content.sections.nonHttpDb.description')}
    </Typography>
    <CodeBlock
    language="csharp"
    ariaLabel="ms-resilience-db-pipeline"
    code={`using System.Data;
using Microsoft.Data.SqlClient;
using Polly;

public sealed class DatabaseResilience
{
  private readonly ResiliencePipeline _pipeline;

  public DatabaseResilience()
  {
    _pipeline = new ResiliencePipelineBuilder()
      .AddRetry(new RetryStrategyOptions
      {
        MaxRetryAttempts = 3,
        Delay = TimeSpan.FromMilliseconds(200),
        BackoffType = DelayBackoffType.Exponential,
        UseJitter = true,
        ShouldHandle = new PredicateBuilder()
          .Handle<SqlException>()
          .Handle<TimeoutException>()
      })
      .AddTimeout(TimeSpan.FromSeconds(3))
      .AddCircuitBreaker(new CircuitBreakerStrategyOptions
      {
        FailureRatio = 0.3,
        SamplingDuration = TimeSpan.FromSeconds(20),
        MinimumThroughput = 10,
        BreakDuration = TimeSpan.FromSeconds(10)
      })
      .Build();
  }

  public async Task<T?> ExecuteAsync<T>(Func<CancellationToken, Task<T?>> dbCall, CancellationToken ct = default)
  {
    var context = ResilienceContextPool.Shared.Get(ct);
    try
    {
      return await _pipeline.ExecuteAsync(async (ctx) =>
      {
        var result = await dbCall(ctx.CancellationToken);
        return result;
      }, context);
    }
    finally
    {
      ResilienceContextPool.Shared.Return(context);
    }
  }
}

// Usage dans un repository "classique"
public sealed class ProductRepository
{
  private readonly string _connString;
  private readonly DatabaseResilience _resilience = new();

  public ProductRepository(string connectionString)
    => _connString = connectionString;

  public Task<string?> GetNameAsync(int id, CancellationToken ct = default)
    => _resilience.ExecuteAsync<string?>(async token =>
    {
      await using var conn = new SqlConnection(_connString);
      await conn.OpenAsync(token);
      await using var cmd = conn.CreateCommand();
      cmd.CommandText = "SELECT TOP(1) Name FROM Products WHERE Id = @id";
      var p = cmd.CreateParameter();
      p.ParameterName = "@id"; p.Value = id; cmd.Parameters.Add(p);
      var result = await cmd.ExecuteScalarAsync(token);
      return result as string;
    }, ct);
}
// Remarque: vous pouvez remplacer ADO.NET par Dapper/EF Core; l'important est que l'appel
// DB soit exécuté dans la lambda du pipeline.`}
    />

      <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>
        {t('microsoft-extensions-resilience.content.sections.observability.title')}
      </Typography>
      <Typography paragraph>
        {t('microsoft-extensions-resilience.content.sections.observability.description')}
      </Typography>
      <CodeBlock
        language="csharp"
        ariaLabel="ms-resilience-telemetry"
        code={`// Activer la télémétrie (ex: OpenTelemetry + logs)
builder.Services.AddLogging();
builder.Services.AddOpenTelemetry().WithMetrics(m => { /* ... */ }).WithTracing(t => { /* ... */ });
// Les events d'exécution des stratégies sont émis automatiquement (compteurs, logs...)`}
      />

      <Typography variant="h4" gutterBottom sx={{ mt: 3 }}>
        {t('microsoft-extensions-resilience.content.sections.configuration.title')}
      </Typography>
      <Typography paragraph>
        {t('microsoft-extensions-resilience.content.sections.configuration.description')}
      </Typography>
      <CodeBlock
        language="json"
        ariaLabel="ms-resilience-appsettings"
        code={`{
  "Resilience": {
    "Pipelines": {
      "standard-pipeline": {
        "Retry": { "MaxRetryAttempts": 3, "Delay": "00:00:00.200", "UseJitter": true },
        "Timeout": { "Timeout": "00:00:05" },
        "CircuitBreaker": { "FailureRatio": 0.5, "SamplingDuration": "00:00:30", "BreakDuration": "00:00:15", "MinimumThroughput": 10 }
      }
    }
  }
}`}
      />
      <Typography paragraph>
        {t('microsoft-extensions-resilience.content.sections.configuration.loading')}
      </Typography>

      <Typography variant="h4" gutterBottom sx={{ mt: 3 }}>
        {t('microsoft-extensions-resilience.content.sections.bestPractices.title')}
      </Typography>
      <Typography component="ul" sx={{ ml: 2 }}>
        {bestPractices.map((bp, i) => (
          <li key={i}>{bp}</li>
        ))}
      </Typography>

      <Typography variant="h4" gutterBottom sx={{ mt: 3 }}>
        {t('microsoft-extensions-resilience.content.sections.summary.title')}
      </Typography>
      <Typography paragraph>{t('microsoft-extensions-resilience.content.sections.summary.content')}</Typography>
      <Typography paragraph>{t('microsoft-extensions-resilience.content.sections.summary.conclusion')}</Typography>

      <Box
        mt={4}
        pt={2}
        borderTop={(theme) => `1px solid ${theme.palette.divider}`}
        sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
      >
        <Typography variant="caption" component="div" sx={{ fontStyle: 'italic', color: 'text.secondary' }}>
          {t('microsoft-extensions-resilience.content.footer.sourcesLabel')}{' '}
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
          {t('microsoft-extensions-resilience.content.footer.writtenOn', { date: meta.writtenOn })}
        </Typography>
      </Box>
    </Box>
  );
};

const mod: TipModule = { default: MsResilienceTip, meta };
export default MsResilienceTip;
export { mod };
