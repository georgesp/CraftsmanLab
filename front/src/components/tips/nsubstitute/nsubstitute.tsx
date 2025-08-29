import React from 'react';
import { useTranslation } from 'react-i18next';
import type { TipModule } from '..';
import { Box, Typography } from '@mui/material';
import { CodeBlock } from '../../ui/CodeBlock/CodeBlock';
import { TipContent } from '../../ui';
import { meta } from './meta';

// Code blocks rendered with shared CodeBlock component

const NSubstituteTip: React.FC = () => {
  const { t } = useTranslation('tips');

  return (
    <TipContent>
      <Typography variant="h3" gutterBottom>
        {t('nsubstitute.content.mainTitle')}
      </Typography>

      <Typography paragraph>{t('nsubstitute.content.intro')}</Typography>

      <Typography variant="h4" gutterBottom>
        {t('nsubstitute.content.sections.basics.title')}
      </Typography>

      <Typography variant="h6" gutterBottom>
        {t('nsubstitute.content.sections.labels.substitution')}
      </Typography>
      <CodeBlock language="csharp" code={`var mock = Substitute.For<IFoo>();`} />

      <Typography variant="h6" gutterBottom>
        {t('nsubstitute.content.sections.labels.simpleReturn')}
      </Typography>
      <CodeBlock language="csharp" code={`mock.Bar().Returns(42);`} />

      <Typography variant="h6" gutterBottom>
        {t('nsubstitute.content.sections.labels.computed')}
      </Typography>
      <CodeBlock
        language="csharp"
        code={`mock.Add(Arg.Any<int>(), Arg.Any<int>()).Returns(callInfo => callInfo.Arg<int>(0) + callInfo.Arg<int>(1));`}
      />

      <Typography variant="h6" gutterBottom>
        {t('nsubstitute.content.sections.labels.exceptions')}
      </Typography>
      <CodeBlock
        language="csharp"
        code={`mock.DoSomething().Throws(new InvalidOperationException());`}
      />

      <Typography variant="h6" gutterBottom>
        {t('nsubstitute.content.sections.labels.verifyCall')}
      </Typography>
      <CodeBlock
        language="csharp"
        code={`mock.Received().Bar();
mock.DidNotReceive().Baz();`}
      />

      <Typography variant="h6" gutterBottom>
        {t('nsubstitute.content.sections.labels.specialArgs')}
      </Typography>
      <CodeBlock language="csharp" code={`Arg.Is<string>(s => s.StartsWith("Hello"));`} />

      <Typography variant="h6" gutterBottom>
        {t('nsubstitute.content.sections.labels.partial')}
      </Typography>
      <CodeBlock
        language="csharp"
        code={`var partial = Substitute.ForPartsOf<MyConcreteClass>();`}
      />

      <Typography variant="h6" gutterBottom>
        {t('nsubstitute.content.sections.labels.captureArgs')}
      </Typography>
      <CodeBlock
        language="csharp"
        code={`int captured;
// Simple variant (with When/Do)
mock.When(x => x.Do(Arg.Any<int>())).Do(call => captured = call.Arg<int>());
// (then execute mock.Do(123); so that captured = 123)`}
      />

      <Typography variant="h4" gutterBottom>
        {t('nsubstitute.content.sections.exampleFull.title')}
      </Typography>
      <Typography variant="h6" gutterBottom>
        {t('nsubstitute.content.sections.exampleFull.codeToTest')}
      </Typography>
      <CodeBlock
        language="csharp"
        code={`public interface ICalculator
{
    int Add(int a, int b);
    void Log(string message);
}

public class MathService
{
    private readonly ICalculator _calculator;

    public MathService(ICalculator calculator)
    {
        _calculator = calculator;
    }

    public int ComputeSumAndLog(int x, int y)
    {
        var result = _calculator.Add(x, y);
        _calculator.Log($"Result is {result}");
        return result;
    }
}`}
      />

      <Typography variant="h6" gutterBottom>
        {t('nsubstitute.content.sections.exampleFull.testWith')}
      </Typography>
      <CodeBlock
        language="csharp"
        code={`using Xunit;
using NSubstitute;

public class MathServiceTests
{
    [Fact]
    public void ComputeSumAndLog_ReturnsSum_LogsMessage()
    {
  // Arrange: create a mock of ICalculator
  var calc = Substitute.For<ICalculator>();

  // Force Add() to return 5 when passed 2 and 3
  calc.Add(2, 3).Returns(5);

  // Prepare the service with the mock
  var sut = new MathService(calc);

  // Act: call the tested method
  int result = sut.ComputeSumAndLog(2, 3);

  // Assert: expected result
  Assert.Equal(5, result);

  // Assert: verify Log was called with the expected message
  calc.Received().Log("Result is 5");
    }
}`}
      />

      <Typography variant="subtitle1" gutterBottom>
        {t('nsubstitute.content.sections.notes.title')}
      </Typography>
      <ul>
        <li>
          {
            t('nsubstitute.content.sections.notes.points.0', {
              defaultValue:
                '<code>calc.Add(2,3).Returns(5)</code> sets the return value only for those arguments.',
            }) as any
          }
        </li>
        <li>
          {
            t('nsubstitute.content.sections.notes.points.1', {
              defaultValue:
                "If you don't specify an explicit return, the mock returns the type's default value (<code>0</code> for <code>int</code>, <code>null</code> for references, etc.).",
            }) as any
          }
        </li>
      </ul>

      <Typography variant="h4" gutterBottom>
        {t('nsubstitute.content.sections.additional.title')}
      </Typography>

      <Typography variant="h6" gutterBottom>
        {t('nsubstitute.content.sections.additional.asyncMethod')}
      </Typography>
      <CodeBlock
        language="csharp"
        code={`public interface IAsyncService
{
    Task<string> GetDataAsync(string key);
}

var asyncMock = Substitute.For<IAsyncService>();
asyncMock.GetDataAsync("abc").Returns(Task.FromResult("mocked data"));`}
      />

      <Typography variant="h6" gutterBottom>
        {t('nsubstitute.content.sections.additional.exceptionMethod')}
      </Typography>
      <CodeBlock language="csharp" code={`calc.DoSomething().Throws(new ArgumentException());`} />

      <Typography variant="h6" gutterBottom>
        {t('nsubstitute.content.sections.additional.verifyCount')}
      </Typography>
      <CodeBlock
        language="csharp"
        code={t('nsubstitute.content.sections.additional.verifyCountCode')}
      />

      <Typography variant="h6" gutterBottom>
        {t('nsubstitute.content.sections.additional.captureArg')}
      </Typography>
      <CodeBlock
        language="csharp"
        code={`int captured = -1;
calc.Add(Arg.Any<int>(), Arg.Any<int>())
    .Returns(x => x.Arg<int>(0) + x.Arg<int>(1));

calc.When(call => call.Log(Arg.Any<string>()))
    .Do(callInfo =>
    {
  var msg = callInfo.GetArguments()[0] as string;
  // extract the number from the message
  captured = int.Parse(msg.Split(' ')[2]);
    });`}
      />

      <Typography variant="h4" gutterBottom>
        {t('nsubstitute.content.sections.goodPractices.title')}
      </Typography>
      <ul>
        <li>
          <b>{t('nsubstitute.content.sections.goodPractices.items.explicitNames.title')}</b> —{' '}
          {t('nsubstitute.content.sections.goodPractices.items.explicitNames.desc')}
          <CodeBlock
            language="csharp"
            code={`calc.Add(Arg.Any<int>(), Arg.Any<int>()).Returns(call => ...)`}
          />
        </li>
        <li>
          <b>{t('nsubstitute.content.sections.goodPractices.items.avoidUselessMocks.title')}</b> —{' '}
          {t('nsubstitute.content.sections.goodPractices.items.avoidUselessMocks.desc')}
        </li>
        <li>
          <b>{t('nsubstitute.content.sections.goodPractices.items.usePartialMock.title')}</b> —{' '}
          {t('nsubstitute.content.sections.goodPractices.items.usePartialMock.desc')}
        </li>
        <li>
          <b>{t('nsubstitute.content.sections.goodPractices.items.neverHideBug.title')}</b> —{' '}
          {t('nsubstitute.content.sections.goodPractices.items.neverHideBug.desc')}
        </li>
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
          {t('nsubstitute.content.footer.sourcesLabel')}{' '}
          {(
            t('nsubstitute.content.footer.sources', { returnObjects: true }) as {
              name: string;
              url: string;
            }[]
          ).map((s, i, arr) => (
            <span key={i}>
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'inherit', textDecoration: 'underline' }}
              >
                {s.name}
              </a>
              {i < arr.length - 1 ? ' • ' : ''}
            </span>
          ))}
        </Typography>
        <Typography variant="caption" component="div" sx={{ color: 'text.secondary' }}>
          {t('nsubstitute.content.footer.writtenOn', { date: meta.writtenOn })}
        </Typography>
      </Box>
    </TipContent>
  );
};

const mod: TipModule = { default: NSubstituteTip, meta };
export default NSubstituteTip;
export { mod };
