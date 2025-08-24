import React from 'react';
import { useTranslation } from 'react-i18next';
import type { TipModule } from '..';
import { Box, Typography } from '@mui/material';
import { CodeBlock } from '../../ui/CodeBlock/CodeBlock';

export const meta = {
  slug: 'nsubstitute',
  title: '', // Utilisera les traductions
  shortDescription: '', // Utilisera les traductions
  writtenOn: '2025-08-12',
  keywords: ['C#' as const],
  metadata: {
    searchKeywords: {
      fr: [
        'nsubstitute', 'mock', 'mocking', 'substitute', 'double', 'fake', 'stub', 'spy',
        'tests', 'isolation', 'dépendance', 'interface', 'simulation',
        'vérification', 'arguments', 'retour', 'callback', 'received', 'returns'
      ],
      en: [
        'nsubstitute', 'mock', 'mocking', 'substitute', 'double', 'fake', 'stub', 'spy',
        'tests', 'isolation', 'dependency', 'interface', 'simulation',
        'verification', 'arguments', 'return', 'callback', 'received', 'returns'
      ]
    }
  }
};

// Code blocks rendered with shared CodeBlock component

const NSubstituteTip: React.FC = () => {
  const { t } = useTranslation('tips');
  
  return (
    <Box>
      <Typography variant="h3" gutterBottom>{t('nsubstitute.content.mainTitle')}</Typography>
      
      <Typography paragraph>
        {t('nsubstitute.content.intro')}
      </Typography>

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
      <CodeBlock language="csharp"
        code={`mock.Add(Arg.Any<int>(), Arg.Any<int>()).Returns(callInfo => callInfo.Arg<int>(0) + callInfo.Arg<int>(1));`}
      />

      <Typography variant="h6" gutterBottom>
        {t('nsubstitute.content.sections.labels.exceptions')}
      </Typography>
      <CodeBlock language="csharp" code={`mock.DoSomething().Throws(new InvalidOperationException());`} />

      <Typography variant="h6" gutterBottom>
        {t('nsubstitute.content.sections.labels.verifyCall')}
      </Typography>
      <CodeBlock language="csharp" code={`mock.Received().Bar();
mock.DidNotReceive().Baz();`} />

      <Typography variant="h6" gutterBottom>
        {t('nsubstitute.content.sections.labels.specialArgs')}
      </Typography>
      <CodeBlock language="csharp" code={`Arg.Is<string>(s => s.StartsWith("Hello"));`} />

      <Typography variant="h6" gutterBottom>
        {t('nsubstitute.content.sections.labels.partial')}
      </Typography>
      <CodeBlock language="csharp" code={`var partial = Substitute.ForPartsOf<MyConcreteClass>();`} />

      <Typography variant="h6" gutterBottom>
        {t('nsubstitute.content.sections.labels.captureArgs')}
      </Typography>
      <CodeBlock language="csharp"
        code={`int captured;
// Simple variant (with When/Do)
mock.When(x => x.Do(Arg.Any<int>())).Do(call => captured = call.Arg<int>());
// (then execute mock.Do(123); so that captured = 123)`}
      />

      <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
        {t('nsubstitute.content.sections.exampleFull.title')}
      </Typography>
      <Typography variant="h6" gutterBottom>
        {t('nsubstitute.content.sections.exampleFull.codeToTest')}
      </Typography>
      <CodeBlock language="csharp"
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
      <CodeBlock language="csharp"
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
          <code>calc.Add(2,3).Returns(5)</code> force la valeur de retour uniquement pour ces arguments.
        </li>
        <li>
          Si tu ne précises pas de retour explicite, le mock renverra la valeur par défaut du type (<code>0</code> pour
          <code> int</code>, <code>null</code> pour les références, etc.).
        </li>
      </ul>

      <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
        Cas pratiques supplémentaires
      </Typography>

      <Typography variant="h6" gutterBottom>
        Mock d’une méthode asynchrone
      </Typography>
      <CodeBlock language="csharp"
        code={`public interface IAsyncService
{
    Task<string> GetDataAsync(string key);
}

var asyncMock = Substitute.For<IAsyncService>();
asyncMock.GetDataAsync("abc").Returns(Task.FromResult("mocked data"));`}
      />

      <Typography variant="h6" gutterBottom>
        Mock d’une méthode qui lance une exception
      </Typography>
      <CodeBlock language="csharp" code={`calc.DoSomething().Throws(new ArgumentException());`} />

      <Typography variant="h6" gutterBottom>
        Vérifier le nombre d’appels
      </Typography>
      <CodeBlock language="csharp"
        code={`// Au moins deux appels
calc.Received(2).Log(Arg.Any<string>());

// No calls
calc.DidNotReceive().Add(Arg.Any<int>(), Arg.Any<int>());`}
      />

      <Typography variant="h6" gutterBottom>
        Utiliser When pour capturer l’argument passé
      </Typography>
      <CodeBlock language="csharp"
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

      <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
        Bonnes pratiques
      </Typography>
      <ul>
        <li>
          <b>Noms explicites</b> — exemple lisible comme un pseudo‑code :
          <CodeBlock language="csharp" code={`calc.Add(Arg.Any<int>(), Arg.Any<int>()).Returns(call => ...)`} />
        </li>
        <li>
          <b>Évite les mocks inutiles</b> — si tu n’interagis pas avec l’objet, ne le mocke pas.
        </li>
        <li>
          <b>Utilise Substitute.ForPartsOf&lt;T&gt;()</b> pour tester une classe concrète partiellement — tu gardes la logique
          interne et tu ne stubs que ce qui est nécessaire.
        </li>
        <li>
          <b>Ne cache jamais un bug</b> — si tu stubbes tout, ton test peut passer même si le code est incorrect.
        </li>
      </ul>

      <Box
        mt={4}
        pt={2}
        borderTop={(theme) => `1px solid ${theme.palette.divider}`}
        sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
      >
        <Typography variant="caption" component="div" sx={{ fontStyle: 'italic', color: 'text.secondary' }}>
          <a href="https://github.com/nsubstitute/NSubstitute" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>
            {t('nsubstitute.content.footer.sourceLabel')}
          </a>
        </Typography>
        <Typography variant="caption" component="div" sx={{ color: 'text.secondary' }}>
          {t('nsubstitute.content.footer.writtenOn', { date: meta.writtenOn })}
        </Typography>
      </Box>
    </Box>
  );
};

const mod: TipModule = { default: NSubstituteTip, meta };
export default NSubstituteTip;
export { mod };
