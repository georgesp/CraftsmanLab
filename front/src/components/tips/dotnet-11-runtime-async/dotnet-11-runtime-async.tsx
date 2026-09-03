import { useTranslation } from 'react-i18next';
import type { TipModule } from '..';
import { Box, Typography } from '@mui/material';
import TipContent from '../TipContent';
import { CodeBlock } from '../../ui/CodeBlock/CodeBlock';
import { meta } from './meta';

const stateMachineCode = `// What you write
public async Task<int> LoadAsync(HttpClient client)
{
    string body = await client.GetStringAsync("https://example.com");
    return body.Length;
}

// What the compiler emits today, simplified
[CompilerGenerated]
private sealed class LoadAsyncStateMachine : IAsyncStateMachine
{
    public int State;
    public AsyncTaskMethodBuilder<int> Builder;
    public HttpClient Client;
    private TaskAwaiter<string> awaiter;

    // The whole method body becomes a jump table over State
    public void MoveNext() { /* ... */ }

    public void SetStateMachine(IAsyncStateMachine stateMachine) { /* ... */ }
}`;

const runtimeAsyncCode = `// Exact same source, compiled with runtime-async=on
public async Task<int> LoadAsync(HttpClient client)
{
    string body = await client.GetStringAsync("https://example.com");
    return body.Length;
}

// Emitted IL, simplified: no state class, a direct runtime call
// call !!0 System.Runtime.CompilerServices.AsyncHelpers::Await<string>(
//     class System.Threading.Tasks.Task<!!0>)`;

const enableCode = `<PropertyGroup>
  <TargetFramework>net11.0</TargetFramework>

  <!-- Opt in for your own assemblies -->
  <Features>$(Features);runtime-async=on</Features>
</PropertyGroup>`;

const disableCode = `<PropertyGroup>
  <!-- Escape hatch when a profiler or IL rewriter is not ready yet -->
  <UseRuntimeAsync>false</UseRuntimeAsync>
</PropertyGroup>`;

const stackTraceCode = `# Before: MoveNext frames and dispatch noise
   at Shop.Orders.OrderService+<LoadAsync>d__4.MoveNext()
--- End of stack trace from previous location ---
   at System.Runtime.ExceptionServices.ExceptionDispatchInfo.Throw()
   at Shop.Api.OrdersController+<Get>d__2.MoveNext()

# After: the frames match the methods you wrote
   at Shop.Orders.OrderService.LoadAsync(HttpClient client)
   at Shop.Api.OrdersController.Get(Int32 id)`;

const covarianceCode = `public abstract class Repository
{
    public abstract Task SaveAsync();
}

// .NET 11 accepts an override returning Task<T> where the base returns Task
public sealed class SqlRepository : Repository
{
    public override Task<int> SaveAsync() => Task.FromResult(1);
}`;

const DotNet11RuntimeAsyncTip: React.FC = () => {
  const { t } = useTranslation('tips');

  const tocAnchors = [
    { anchor: 'state-machine', key: 0 },
    { anchor: 'what-changes', key: 1 },
    { anchor: 'enable', key: 2 },
    { anchor: 'stack-traces', key: 3 },
    { anchor: 'covariance', key: 4 },
    { anchor: 'use-cases', key: 5 },
    { anchor: 'comparison', key: 6 },
  ];

  const tocItems = t('dotnet-11-runtime-async.content.tocItems', {
    returnObjects: true,
  }) as string[];
  const costItems = t('dotnet-11-runtime-async.content.sections.stateMachine.costItems', {
    returnObjects: true,
  }) as string[];
  const gainsItems = t('dotnet-11-runtime-async.content.sections.whatChanges.gainsItems', {
    returnObjects: true,
  }) as string[];
  const useCaseItems = t('dotnet-11-runtime-async.content.sections.useCases.items', {
    returnObjects: true,
  }) as string[];
  const prosItems = t('dotnet-11-runtime-async.content.sections.comparison.prosItems', {
    returnObjects: true,
  }) as string[];
  const consItems = t('dotnet-11-runtime-async.content.sections.comparison.consItems', {
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
        {t('dotnet-11-runtime-async.content.mainTitle')}
      </Typography>

      <Typography paragraph>{t('dotnet-11-runtime-async.content.intro')}</Typography>

      {/* Table of contents */}
      <Typography variant="h6" gutterBottom sx={{ mt: 2 }} id="toc">
        {t('dotnet-11-runtime-async.content.tocTitle')}
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
      <Typography variant="h4" gutterBottom id="state-machine">
        {t('dotnet-11-runtime-async.content.sections.stateMachine.title')}
      </Typography>
      <Typography paragraph>
        {t('dotnet-11-runtime-async.content.sections.stateMachine.description')}
      </Typography>
      <CodeBlock language="csharp" code={stateMachineCode} />
      <Typography variant="h5" gutterBottom>
        {t('dotnet-11-runtime-async.content.sections.stateMachine.costTitle')}
      </Typography>
      {renderList(costItems)}

      {/* Section 2 */}
      <Typography variant="h4" gutterBottom id="what-changes">
        {t('dotnet-11-runtime-async.content.sections.whatChanges.title')}
      </Typography>
      <Typography paragraph>
        {t('dotnet-11-runtime-async.content.sections.whatChanges.description')}
      </Typography>
      <CodeBlock language="csharp" code={runtimeAsyncCode} />
      <Typography variant="h5" gutterBottom>
        {t('dotnet-11-runtime-async.content.sections.whatChanges.gainsTitle')}
      </Typography>
      {renderList(gainsItems)}

      {/* Section 3 */}
      <Typography variant="h4" gutterBottom id="enable">
        {t('dotnet-11-runtime-async.content.sections.enable.title')}
      </Typography>
      <Typography paragraph>
        {t('dotnet-11-runtime-async.content.sections.enable.description')}
      </Typography>
      <Typography variant="h5" gutterBottom>
        {t('dotnet-11-runtime-async.content.sections.enable.enableTitle')}
      </Typography>
      <Typography paragraph>
        {t('dotnet-11-runtime-async.content.sections.enable.enableDescription')}
      </Typography>
      <CodeBlock language="xml" code={enableCode} />
      <Typography variant="h5" gutterBottom>
        {t('dotnet-11-runtime-async.content.sections.enable.disableTitle')}
      </Typography>
      <Typography paragraph>
        {t('dotnet-11-runtime-async.content.sections.enable.disableDescription')}
      </Typography>
      <CodeBlock language="xml" code={disableCode} />

      {/* Section 4 */}
      <Typography variant="h4" gutterBottom id="stack-traces">
        {t('dotnet-11-runtime-async.content.sections.stackTraces.title')}
      </Typography>
      <Typography paragraph>
        {t('dotnet-11-runtime-async.content.sections.stackTraces.description')}
      </Typography>
      <CodeBlock language="bash" code={stackTraceCode} />
      <Typography paragraph>
        {t('dotnet-11-runtime-async.content.sections.stackTraces.note')}
      </Typography>

      {/* Section 5 */}
      <Typography variant="h4" gutterBottom id="covariance">
        {t('dotnet-11-runtime-async.content.sections.covariance.title')}
      </Typography>
      <Typography paragraph>
        {t('dotnet-11-runtime-async.content.sections.covariance.description')}
      </Typography>
      <CodeBlock language="csharp" code={covarianceCode} />

      {/* Section 6 */}
      <Typography variant="h4" gutterBottom id="use-cases">
        {t('dotnet-11-runtime-async.content.sections.useCases.title')}
      </Typography>
      <Typography paragraph>
        {t('dotnet-11-runtime-async.content.sections.useCases.description')}
      </Typography>
      {renderList(useCaseItems)}

      {/* Section 7 */}
      <Typography variant="h4" gutterBottom id="comparison">
        {t('dotnet-11-runtime-async.content.sections.comparison.title')}
      </Typography>
      <Typography paragraph>
        {t('dotnet-11-runtime-async.content.sections.comparison.description')}
      </Typography>
      <Typography variant="h5" gutterBottom>
        {t('dotnet-11-runtime-async.content.sections.comparison.prosTitle')}
      </Typography>
      {renderList(prosItems)}
      <Typography variant="h5" gutterBottom>
        {t('dotnet-11-runtime-async.content.sections.comparison.consTitle')}
      </Typography>
      {renderList(consItems)}
      <Typography paragraph>
        {t('dotnet-11-runtime-async.content.sections.comparison.verdict')}
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
            href="https://github.com/dotnet/core/blob/main/release-notes/11.0/preview/preview4/runtime.md"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'inherit', textDecoration: 'underline' }}
          >
            {t('dotnet-11-runtime-async.content.footer.sourceLabel')}
          </a>
        </Typography>
        <Typography variant="caption" component="div" sx={{ color: 'text.secondary' }}>
          {t('dotnet-11-runtime-async.content.footer.writtenOn', { date: meta.writtenOn })}
        </Typography>
      </Box>
    </TipContent>
  );
};

const mod: TipModule = { default: DotNet11RuntimeAsyncTip, meta };
export default DotNet11RuntimeAsyncTip;
export { mod };
