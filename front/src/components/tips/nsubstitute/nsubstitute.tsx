import React from 'react';
import type { TipModule } from '..';
import { Box, Typography } from '@mui/material';
import { CodeBlock } from '../../ui/CodeBlock';

export const meta = {
  slug: 'nsubstitute',
  title: 'NSubstitute',
  shortDescription: 'Mocker avec NSubstitute : bases, exemples et bonnes pratiques.',
  writtenOn: '2025-08-12',
};

// Code blocks rendered with shared CodeBlock component

const NSubstituteTip: React.FC = () => {
  return (
    <Box>
      <Typography paragraph>
        Le pense‑bête pour toi: crée des doubles de test, force des retours, vérifie les appels et capture des arguments
        avec NSubstitute, sans te perdre dans la doc.
      </Typography>

      <Typography variant="h4" gutterBottom>
        Concepts de base
      </Typography>

      <Typography variant="h6" gutterBottom>
        Substitution
      </Typography>
      <CodeBlock code={`var mock = Substitute.For<IFoo>();`} />

      <Typography variant="h6" gutterBottom>
        Retour simple
      </Typography>
      <CodeBlock code={`mock.Bar().Returns(42);`} />

      <Typography variant="h6" gutterBottom>
        Valeur calculée
      </Typography>
      <CodeBlock
        code={`mock.Add(Arg.Any<int>(), Arg.Any<int>()).Returns(callInfo => callInfo.Arg<int>(0) + callInfo.Arg<int>(1));`}
      />

      <Typography variant="h6" gutterBottom>
        Exceptions
      </Typography>
      <CodeBlock code={`mock.DoSomething().Throws(new InvalidOperationException());`} />

      <Typography variant="h6" gutterBottom>
      Vérification d’appel
      </Typography>
      <CodeBlock code={`mock.Received().Bar();
mock.DidNotReceive().Baz();`} />

      <Typography variant="h6" gutterBottom>
        Arguments spéciaux
      </Typography>
      <CodeBlock code={`Arg.Is<string>(s => s.StartsWith("Hello"));`} />

      <Typography variant="h6" gutterBottom>
        Partial mock
      </Typography>
      <CodeBlock code={`var partial = Substitute.ForPartsOf<MyConcreteClass>();`} />

      <Typography variant="h6" gutterBottom>
        Capturer les arguments
      </Typography>
      <CodeBlock
        code={`int captured;
// Variante simple (avec When/Do)
mock.When(x => x.Do(Arg.Any<int>())).Do(call => captured = call.Arg<int>());
// (exécuter ensuite mock.Do(123); pour que captured = 123)`}
      />

      <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
        Exemple complet
      </Typography>
      <Typography variant="h6" gutterBottom>
        Le code à tester
      </Typography>
      <CodeBlock
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
  Le test avec NSubstitute
      </Typography>
      <CodeBlock
        code={`using Xunit;
using NSubstitute;

public class MathServiceTests
{
    [Fact]
    public void ComputeSumAndLog_ReturnsSum_LogsMessage()
    {
        // Arrange : on crée un mock d’ICalculator
        var calc = Substitute.For<ICalculator>();

        // On force Add() à retourner 5 quand on passe 2 et 3
        calc.Add(2, 3).Returns(5);

        // On prépare le service avec le mock
        var sut = new MathService(calc);

        // Act : appel de la méthode testée
        int result = sut.ComputeSumAndLog(2, 3);

        // Assert – résultat attendu
        Assert.Equal(5, result);

        // Assert – vérification que Log a bien été appelé avec le bon message
        calc.Received().Log("Result is 5");
    }
}`}
      />

      <Typography variant="subtitle1" gutterBottom>
        Remarques
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
      <CodeBlock
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
      <CodeBlock code={`calc.DoSomething().Throws(new ArgumentException());`} />

      <Typography variant="h6" gutterBottom>
        Vérifier le nombre d’appels
      </Typography>
      <CodeBlock
        code={`// Au moins deux appels
calc.Received(2).Log(Arg.Any<string>());

// Aucun appel
calc.DidNotReceive().Add(Arg.Any<int>(), Arg.Any<int>());`}
      />

      <Typography variant="h6" gutterBottom>
        Utiliser When pour capturer l’argument passé
      </Typography>
      <CodeBlock
        code={`int captured = -1;
calc.Add(Arg.Any<int>(), Arg.Any<int>())
    .Returns(x => x.Arg<int>(0) + x.Arg<int>(1));

calc.When(call => call.Log(Arg.Any<string>()))
    .Do(callInfo =>
    {
        var msg = callInfo.GetArguments()[0] as string;
        // extraire le nombre du message
        captured = int.Parse(msg.Split(' ')[2]);
    });`}
      />

      <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
        Bonnes pratiques
      </Typography>
      <ul>
        <li>
          <b>Noms explicites</b> — exemple lisible comme un pseudo‑code :
          <CodeBlock code={`calc.Add(Arg.Any<int>(), Arg.Any<int>()).Returns(call => ...)`} />
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
          <a
            href="https://github.com/nsubstitute/NSubstitute"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'inherit', textDecoration: 'underline' }}
          >
            Source : NSubstitute (GitHub)
          </a>
        </Typography>
        <Typography variant="caption" component="div" sx={{ color: 'text.secondary' }}>
          Écrit le {meta.writtenOn}
        </Typography>
      </Box>
    </Box>
  );
};

const mod: TipModule = { default: NSubstituteTip, meta };
export default NSubstituteTip;
export { mod };
