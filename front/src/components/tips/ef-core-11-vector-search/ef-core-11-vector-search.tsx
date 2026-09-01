import { useTranslation } from 'react-i18next';
import type { TipModule } from '..';
import { Box, Typography } from '@mui/material';
import TipContent from '../TipContent';
import { CodeBlock } from '../../ui/CodeBlock/CodeBlock';
import { meta } from './meta';

const packagesCode = `# EF Core 11 provider for SQL Server
dotnet add package Microsoft.EntityFrameworkCore.SqlServer

# Embedding generation abstractions
dotnet add package Microsoft.Extensions.AI
dotnet add package Microsoft.Extensions.AI.OpenAI

# CLI tooling
dotnet tool update --global dotnet-ef`;

const entityCode = `using Microsoft.Data.SqlTypes;

public class Document
{
    public int Id { get; set; }

    public string Title { get; set; } = string.Empty;

    public string Body { get; set; } = string.Empty;

    public DateTime PublishedOn { get; set; }

    // 1536 dimensions matches OpenAI text-embedding-3-small
    public SqlVector<float> Embedding { get; set; }
}`;

const modelBuilderCode = `protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Document>(entity =>
    {
        // The column type carries the dimension count
        entity.Property(d => d.Embedding).HasColumnType("vector(1536)");

        // DiskANN index; the metric must match the one used at query time
        entity.HasVectorIndex(d => d.Embedding, "cosine");
    });
}`;

const indexSqlCode = `CREATE VECTOR INDEX [IX_Documents_Embedding]
    ON [Documents] ([Embedding])
    WITH (METRIC = COSINE)`;

const migrationCode = `# EF Core 11 creates and applies the migration in one step
dotnet ef database update AddDocumentEmbeddings --add`;

const embeddingCode = `using Microsoft.Data.SqlTypes;
using Microsoft.Extensions.AI;
using OpenAI;

IEmbeddingGenerator<string, Embedding<float>> generator =
    new OpenAIClient(apiKey)
        .GetEmbeddingClient("text-embedding-3-small")
        .AsIEmbeddingGenerator();

// Index a single document
ReadOnlyMemory<float> vector = await generator.GenerateVectorAsync(document.Body);
document.Embedding = new SqlVector<float>(vector);

await context.SaveChangesAsync();`;

const exactQueryCode = `var queryVector = new SqlVector<float>(
    await generator.GenerateVectorAsync("how do I cancel a subscription?"));

// Exact distance: full scan, always accurate
var closest = await context.Documents
    .OrderBy(d => EF.Functions.VectorDistance("cosine", d.Embedding, queryVector))
    .Take(5)
    .ToListAsync();`;

const approxQueryCode = `// Approximate nearest neighbour, backed by the DiskANN index
var results = await context.Documents
    .VectorSearch(d => d.Embedding, queryVector, "cosine")
    .OrderBy(r => r.Distance)
    .Take(5)
    // Without this call the query falls back to a full scan
    .WithApproximate()
    .ToListAsync();

foreach (var result in results)
{
    Console.WriteLine($"{result.Value.Title} - distance {result.Distance:F4}");
}`;

const projectionQueryCode = `var searchResults = await context.Documents
    .VectorSearch(d => d.Embedding, queryVector, "cosine")
    // Cut off weak matches before they reach the caller
    .Where(r => r.Distance < 0.35)
    .OrderBy(r => r.Distance)
    .Select(r => new DocumentHit(r.Value.Id, r.Value.Title, r.Distance))
    .Take(10)
    .WithApproximate()
    .ToListAsync();

public readonly record struct DocumentHit(int Id, string Title, double Distance);`;

const fullTextCode = `protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.HasFullTextCatalog("ftCatalog");

    modelBuilder.Entity<Document>()
        .HasFullTextIndex(d => d.Body)
        .UseKeyIndex("PK_Documents")
        .UseCatalog("ftCatalog");
}`;

const EfCore11VectorSearchTip: React.FC = () => {
  const { t } = useTranslation('tips');

  const tocAnchors = [
    { anchor: 'why-vector', key: 0 },
    { anchor: 'setup', key: 1 },
    { anchor: 'model', key: 2 },
    { anchor: 'embeddings', key: 3 },
    { anchor: 'query', key: 4 },
    { anchor: 'hybrid', key: 5 },
    { anchor: 'use-cases', key: 6 },
    { anchor: 'comparison', key: 7 },
  ];

  const tocItems = t('ef-core-11-vector-search.content.tocItems', {
    returnObjects: true,
  }) as string[];
  const painItems = t('ef-core-11-vector-search.content.sections.whyVector.painItems', {
    returnObjects: true,
  }) as string[];
  const prereqItems = t('ef-core-11-vector-search.content.sections.setup.prereqItems', {
    returnObjects: true,
  }) as string[];
  const embeddingTips = t('ef-core-11-vector-search.content.sections.embeddings.tipsItems', {
    returnObjects: true,
  }) as string[];
  const useCaseItems = t('ef-core-11-vector-search.content.sections.useCases.items', {
    returnObjects: true,
  }) as string[];
  const prosItems = t('ef-core-11-vector-search.content.sections.comparison.prosItems', {
    returnObjects: true,
  }) as string[];
  const consItems = t('ef-core-11-vector-search.content.sections.comparison.consItems', {
    returnObjects: true,
  }) as string[];

  const renderList = (items: string[]) => (
    <Box component="ul">
      {Array.isArray(items) &&
        items.map((item, i) => (
          <li key={i}>
            <Typography component="span">{item}</Typography>
          </li>
        ))}
    </Box>
  );

  return (
    <TipContent>
      <Typography variant="h3" gutterBottom>
        {t('ef-core-11-vector-search.content.mainTitle')}
      </Typography>

      <Typography paragraph>{t('ef-core-11-vector-search.content.intro')}</Typography>

      {/* Table of contents */}
      <Typography variant="h6" gutterBottom sx={{ mt: 2 }} id="toc">
        {t('ef-core-11-vector-search.content.tocTitle')}
      </Typography>
      <Box component="ul">
        {tocAnchors.map((s) => (
          <li key={s.anchor}>
            <a href={`#${s.anchor}`} style={{ color: 'inherit', textDecoration: 'underline' }}>
              {Array.isArray(tocItems) ? tocItems[s.key] : ''}
            </a>
          </li>
        ))}
      </Box>

      {/* Section 1 */}
      <Typography variant="h4" gutterBottom id="why-vector">
        {t('ef-core-11-vector-search.content.sections.whyVector.title')}
      </Typography>
      <Typography paragraph>
        {t('ef-core-11-vector-search.content.sections.whyVector.description')}
      </Typography>
      <Typography variant="h5" gutterBottom>
        {t('ef-core-11-vector-search.content.sections.whyVector.painTitle')}
      </Typography>
      {renderList(painItems)}

      {/* Section 2 */}
      <Typography variant="h4" gutterBottom id="setup">
        {t('ef-core-11-vector-search.content.sections.setup.title')}
      </Typography>
      <Typography paragraph>
        {t('ef-core-11-vector-search.content.sections.setup.description')}
      </Typography>
      <Typography variant="h5" gutterBottom>
        {t('ef-core-11-vector-search.content.sections.setup.prereqTitle')}
      </Typography>
      {renderList(prereqItems)}
      <CodeBlock language="bash" code={packagesCode} />

      {/* Section 3 */}
      <Typography variant="h4" gutterBottom id="model">
        {t('ef-core-11-vector-search.content.sections.model.title')}
      </Typography>
      <Typography paragraph>
        {t('ef-core-11-vector-search.content.sections.model.description')}
      </Typography>
      <CodeBlock language="csharp" code={entityCode} />
      <Typography variant="h5" gutterBottom>
        {t('ef-core-11-vector-search.content.sections.model.indexTitle')}
      </Typography>
      <Typography paragraph>
        {t('ef-core-11-vector-search.content.sections.model.indexDescription')}
      </Typography>
      <CodeBlock language="csharp" code={modelBuilderCode} />
      <Typography variant="h5" gutterBottom>
        {t('ef-core-11-vector-search.content.sections.model.sqlTitle')}
      </Typography>
      <Typography paragraph>
        {t('ef-core-11-vector-search.content.sections.model.sqlDescription')}
      </Typography>
      <CodeBlock language="sql" code={indexSqlCode} />
      <Typography variant="h5" gutterBottom>
        {t('ef-core-11-vector-search.content.sections.model.migrationTitle')}
      </Typography>
      <Typography paragraph>
        {t('ef-core-11-vector-search.content.sections.model.migrationDescription')}
      </Typography>
      <CodeBlock language="bash" code={migrationCode} />

      {/* Section 4 */}
      <Typography variant="h4" gutterBottom id="embeddings">
        {t('ef-core-11-vector-search.content.sections.embeddings.title')}
      </Typography>
      <Typography paragraph>
        {t('ef-core-11-vector-search.content.sections.embeddings.description')}
      </Typography>
      <CodeBlock language="csharp" code={embeddingCode} />
      <Typography variant="h5" gutterBottom>
        {t('ef-core-11-vector-search.content.sections.embeddings.tipsTitle')}
      </Typography>
      {renderList(embeddingTips)}

      {/* Section 5 */}
      <Typography variant="h4" gutterBottom id="query">
        {t('ef-core-11-vector-search.content.sections.query.title')}
      </Typography>
      <Typography paragraph>
        {t('ef-core-11-vector-search.content.sections.query.description')}
      </Typography>
      <Typography variant="h5" gutterBottom>
        {t('ef-core-11-vector-search.content.sections.query.exactTitle')}
      </Typography>
      <Typography paragraph>
        {t('ef-core-11-vector-search.content.sections.query.exactDescription')}
      </Typography>
      <CodeBlock language="csharp" code={exactQueryCode} />
      <Typography variant="h5" gutterBottom>
        {t('ef-core-11-vector-search.content.sections.query.approxTitle')}
      </Typography>
      <Typography paragraph>
        {t('ef-core-11-vector-search.content.sections.query.approxDescription')}
      </Typography>
      <CodeBlock language="csharp" code={approxQueryCode} />
      <Typography variant="h5" gutterBottom>
        {t('ef-core-11-vector-search.content.sections.query.projectionTitle')}
      </Typography>
      <Typography paragraph>
        {t('ef-core-11-vector-search.content.sections.query.projectionDescription')}
      </Typography>
      <CodeBlock language="csharp" code={projectionQueryCode} />

      {/* Section 6 */}
      <Typography variant="h4" gutterBottom id="hybrid">
        {t('ef-core-11-vector-search.content.sections.hybrid.title')}
      </Typography>
      <Typography paragraph>
        {t('ef-core-11-vector-search.content.sections.hybrid.description')}
      </Typography>
      <CodeBlock language="csharp" code={fullTextCode} />
      <Typography paragraph>
        {t('ef-core-11-vector-search.content.sections.hybrid.note')}
      </Typography>

      {/* Section 7 */}
      <Typography variant="h4" gutterBottom id="use-cases">
        {t('ef-core-11-vector-search.content.sections.useCases.title')}
      </Typography>
      <Typography paragraph>
        {t('ef-core-11-vector-search.content.sections.useCases.description')}
      </Typography>
      {renderList(useCaseItems)}

      {/* Section 8 */}
      <Typography variant="h4" gutterBottom id="comparison">
        {t('ef-core-11-vector-search.content.sections.comparison.title')}
      </Typography>
      <Typography paragraph>
        {t('ef-core-11-vector-search.content.sections.comparison.description')}
      </Typography>
      <Typography variant="h5" gutterBottom>
        {t('ef-core-11-vector-search.content.sections.comparison.prosTitle')}
      </Typography>
      {renderList(prosItems)}
      <Typography variant="h5" gutterBottom>
        {t('ef-core-11-vector-search.content.sections.comparison.consTitle')}
      </Typography>
      {renderList(consItems)}
      <Typography paragraph>
        {t('ef-core-11-vector-search.content.sections.comparison.verdict')}
      </Typography>

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
            href="https://learn.microsoft.com/en-us/ef/core/providers/sql-server/vector-search"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'inherit', textDecoration: 'underline' }}
          >
            {t('ef-core-11-vector-search.content.footer.sourceLabel')}
          </a>
        </Typography>
        <Typography variant="caption" component="div" sx={{ color: 'text.secondary' }}>
          {t('ef-core-11-vector-search.content.footer.writtenOn', { date: meta.writtenOn })}
        </Typography>
      </Box>
    </TipContent>
  );
};

const mod: TipModule = { default: EfCore11VectorSearchTip, meta };
export default EfCore11VectorSearchTip;
export { mod };
