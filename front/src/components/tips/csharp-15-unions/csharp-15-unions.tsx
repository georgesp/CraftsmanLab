import { useTranslation } from 'react-i18next';
import type { TipModule } from '..';
import { Box, Typography } from '@mui/material';
import TipContent from '../TipContent';
import { CodeBlock } from '../../ui/CodeBlock/CodeBlock';
import { meta } from './meta';

const beforeCode = `// The classic modeling: one abstract base, one sealed class per case
public abstract class PaymentResult
{
    public sealed class Approved : PaymentResult
    {
        public required string TransactionId { get; init; }
    }

    public sealed class Declined : PaymentResult
    {
        public required string Reason { get; init; }
    }

    public sealed class Pending : PaymentResult
    {
        public required TimeSpan RetryAfter { get; init; }
    }
}

// Nothing prevents another assembly from adding a fourth case,
// so the compiler cannot prove this switch is complete
static string Describe(PaymentResult result) => result switch
{
    PaymentResult.Approved a => $"Approved {a.TransactionId}",
    PaymentResult.Declined d => $"Declined: {d.Reason}",
    PaymentResult.Pending p => $"Retry in {p.RetryAfter.TotalSeconds}s",
    // Required to silence CS8509, unreachable in practice
    _ => throw new NotSupportedException()
};`;

const unionDeclarationCode = `// Plain records: nothing special, reusable anywhere
public record Approved(string TransactionId);
public record Declined(string Reason);
public record Pending(TimeSpan RetryAfter);

// A PaymentResult is exactly one of these three types
public union PaymentResult(Approved, Declined, Pending);`;

const unionUsageCode = `// Conversion from any case type is implicit
PaymentResult result = new Declined("Insufficient funds");

// No catch-all arm: the compiler knows the case list is closed
string message = result switch
{
    Approved a => $"Approved: {a.TransactionId}",
    Declined d => $"Declined: {d.Reason}",
    Pending p => $"Retry in {p.RetryAfter.TotalSeconds}s"
};

// Unions read well as return types
public PaymentResult Charge(decimal amount) =>
    amount <= 0
        ? new Declined("Amount must be positive")
        : new Approved(Guid.NewGuid().ToString("N"));`;

const closedDeclarationCode = `// Only this assembly may derive from GateState
public closed record class GateState;

public record class Open : GateState;
public record class Shut : GateState;
public record class Moving(double Percent) : GateState;`;

const closedUsageCode = `// Exhaustive: adding a derived type breaks the build right here
static string Render(GateState state) => state switch
{
    Open => "open",
    Shut => "shut",
    Moving m => $"moving ({m.Percent:P0})"
};`;

const matchingCode = `public record Http200(string Body);
public record Http404(string Path);
public record Http500(Exception Error);

public union HttpOutcome(Http200, Http404, Http500);

static string Explain(HttpOutcome outcome) => outcome switch
{
    // Property pattern first, then the general arm for the same case
    Http200 { Body.Length: 0 } => "empty payload",
    Http200 ok => $"{ok.Body.Length} bytes",

    Http404 nf => $"missing: {nf.Path}",

    // Nested type pattern inside a union case
    Http500 { Error: TimeoutException } => "upstream timeout",
    Http500 err => err.Error.Message
};`;

const setupCode = `<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <TargetFramework>net11.0</TargetFramework>
    <LangVersion>preview</LangVersion>
    <Nullable>enable</Nullable>
  </PropertyGroup>

</Project>`;

const oneOfCode = `// dotnet add package OneOf
using OneOf;

public OneOf<Approved, Declined, Pending> Charge(decimal amount) =>
    amount <= 0
        ? new Declined("Amount must be positive")
        : new Approved(Guid.NewGuid().ToString("N"));

// Matching goes through a lambda-based Match, not the switch expression
string message = result.Match(
    approved => $"Approved: {approved.TransactionId}",
    declined => $"Declined: {declined.Reason}",
    pending => $"Retry in {pending.RetryAfter.TotalSeconds}s");`;

const CSharp15UnionsTip: React.FC = () => {
  const { t } = useTranslation('tips');

  const tocAnchors = [
    { anchor: 'why-unions', key: 0 },
    { anchor: 'unions', key: 1 },
    { anchor: 'closed', key: 2 },
    { anchor: 'matching', key: 3 },
    { anchor: 'setup', key: 4 },
    { anchor: 'use-cases', key: 5 },
    { anchor: 'comparison', key: 6 },
  ];

  const tocItems = t('csharp-15-unions.content.tocItems', { returnObjects: true }) as string[];
  const painItems = t('csharp-15-unions.content.sections.whyUnions.painItems', {
    returnObjects: true,
  }) as string[];
  const rulesItems = t('csharp-15-unions.content.sections.matching.rulesItems', {
    returnObjects: true,
  }) as string[];
  const statusItems = t('csharp-15-unions.content.sections.setup.statusItems', {
    returnObjects: true,
  }) as string[];
  const alsoItems = t('csharp-15-unions.content.sections.setup.alsoItems', {
    returnObjects: true,
  }) as string[];
  const useCaseItems = t('csharp-15-unions.content.sections.useCases.items', {
    returnObjects: true,
  }) as string[];
  const prosItems = t('csharp-15-unions.content.sections.comparison.prosItems', {
    returnObjects: true,
  }) as string[];
  const consItems = t('csharp-15-unions.content.sections.comparison.consItems', {
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
        {t('csharp-15-unions.content.mainTitle')}
      </Typography>

      <Typography paragraph>{t('csharp-15-unions.content.intro')}</Typography>

      {/* Table of contents */}
      <Typography variant="h6" gutterBottom sx={{ mt: 2 }} id="toc">
        {t('csharp-15-unions.content.tocTitle')}
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
      <Typography variant="h4" gutterBottom id="why-unions">
        {t('csharp-15-unions.content.sections.whyUnions.title')}
      </Typography>
      <Typography paragraph>
        {t('csharp-15-unions.content.sections.whyUnions.description')}
      </Typography>
      <Typography variant="h5" gutterBottom>
        {t('csharp-15-unions.content.sections.whyUnions.painTitle')}
      </Typography>
      {renderList(painItems)}
      <Typography paragraph>
        {t('csharp-15-unions.content.sections.whyUnions.codeCaption')}
      </Typography>
      <CodeBlock language="csharp" code={beforeCode} />

      {/* Section 2 */}
      <Typography variant="h4" gutterBottom id="unions">
        {t('csharp-15-unions.content.sections.unions.title')}
      </Typography>
      <Typography paragraph>{t('csharp-15-unions.content.sections.unions.description')}</Typography>
      <Typography variant="h5" gutterBottom>
        {t('csharp-15-unions.content.sections.unions.declarationTitle')}
      </Typography>
      <Typography paragraph>
        {t('csharp-15-unions.content.sections.unions.declarationDescription')}
      </Typography>
      <CodeBlock language="csharp" code={unionDeclarationCode} />
      <Typography variant="h5" gutterBottom>
        {t('csharp-15-unions.content.sections.unions.usageTitle')}
      </Typography>
      <Typography paragraph>
        {t('csharp-15-unions.content.sections.unions.usageDescription')}
      </Typography>
      <CodeBlock language="csharp" code={unionUsageCode} />

      {/* Section 3 */}
      <Typography variant="h4" gutterBottom id="closed">
        {t('csharp-15-unions.content.sections.closed.title')}
      </Typography>
      <Typography paragraph>{t('csharp-15-unions.content.sections.closed.description')}</Typography>
      <CodeBlock language="csharp" code={closedDeclarationCode} />
      <Typography variant="h5" gutterBottom>
        {t('csharp-15-unions.content.sections.closed.usageTitle')}
      </Typography>
      <Typography paragraph>
        {t('csharp-15-unions.content.sections.closed.usageDescription')}
      </Typography>
      <CodeBlock language="csharp" code={closedUsageCode} />
      <Typography paragraph>{t('csharp-15-unions.content.sections.closed.note')}</Typography>

      {/* Section 4 */}
      <Typography variant="h4" gutterBottom id="matching">
        {t('csharp-15-unions.content.sections.matching.title')}
      </Typography>
      <Typography paragraph>
        {t('csharp-15-unions.content.sections.matching.description')}
      </Typography>
      <CodeBlock language="csharp" code={matchingCode} />
      <Typography variant="h5" gutterBottom>
        {t('csharp-15-unions.content.sections.matching.rulesTitle')}
      </Typography>
      {renderList(rulesItems)}

      {/* Section 5 */}
      <Typography variant="h4" gutterBottom id="setup">
        {t('csharp-15-unions.content.sections.setup.title')}
      </Typography>
      <Typography paragraph>{t('csharp-15-unions.content.sections.setup.description')}</Typography>
      <CodeBlock language="xml" code={setupCode} />
      <Typography variant="h5" gutterBottom>
        {t('csharp-15-unions.content.sections.setup.statusTitle')}
      </Typography>
      {renderList(statusItems)}
      <Typography variant="h5" gutterBottom>
        {t('csharp-15-unions.content.sections.setup.alsoTitle')}
      </Typography>
      {renderList(alsoItems)}

      {/* Section 6 */}
      <Typography variant="h4" gutterBottom id="use-cases">
        {t('csharp-15-unions.content.sections.useCases.title')}
      </Typography>
      <Typography paragraph>
        {t('csharp-15-unions.content.sections.useCases.description')}
      </Typography>
      {renderList(useCaseItems)}

      {/* Section 7 */}
      <Typography variant="h4" gutterBottom id="comparison">
        {t('csharp-15-unions.content.sections.comparison.title')}
      </Typography>
      <Typography paragraph>
        {t('csharp-15-unions.content.sections.comparison.description')}
      </Typography>
      <CodeBlock language="csharp" code={oneOfCode} />
      <Typography variant="h5" gutterBottom>
        {t('csharp-15-unions.content.sections.comparison.prosTitle')}
      </Typography>
      {renderList(prosItems)}
      <Typography variant="h5" gutterBottom>
        {t('csharp-15-unions.content.sections.comparison.consTitle')}
      </Typography>
      {renderList(consItems)}
      <Typography paragraph>{t('csharp-15-unions.content.sections.comparison.verdict')}</Typography>

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
            href="https://learn.microsoft.com/en-us/dotnet/csharp/whats-new/csharp-15"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'inherit', textDecoration: 'underline' }}
          >
            {t('csharp-15-unions.content.footer.sourceLabel')}
          </a>
        </Typography>
        <Typography variant="caption" component="div" sx={{ color: 'text.secondary' }}>
          {t('csharp-15-unions.content.footer.writtenOn', { date: meta.writtenOn })}
        </Typography>
      </Box>
    </TipContent>
  );
};

const mod: TipModule = { default: CSharp15UnionsTip, meta };
export default CSharp15UnionsTip;
export { mod };
