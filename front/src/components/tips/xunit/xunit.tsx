import React from 'react';
import type { TipModule } from '..';
import { Box, Typography } from '@mui/material';
import { CodeBlock } from '../../ui/CodeBlock';

export const meta = {
  slug: 'xunit',
  title: 'xUnit',
  shortDescription: 'Écrire et organiser des tests avec xUnit : bases, fixtures et bonnes pratiques.',
  writtenOn: '2025-08-12',
};

// Code blocks rendered with shared CodeBlock component

const XunitTip: React.FC = () => {
  return (
    <Box>
      <Typography paragraph>
        L’essentiel pour toi : écrire des tests xUnit sans t’éparpiller. Structure de test, paramètres, async, setup/fixtures,
        et les bonnes pratiques à garder sous la main.
      </Typography>

      <Typography variant="h4" gutterBottom>Structure d’un test xUnit</Typography>
      <CodeBlock
        code={`using Xunit;              // Attributs et assertions
using System.Threading.Tasks;

public class CalculatriceTests
{
    [Fact]               // Test sans paramètres
    public void Addition()
    {
        var calc = new Calculatrice();
        Assert.Equal(5, calc.Add(2, 3));
    }

    [Theory]             // Test paramétré (tableau de valeurs)
    [InlineData(1, 2, 3)]
    [InlineData(-4, 6, 2)]
    public void Addition_Values(int a, int b, int expected)
    {
        var calc = new Calculatrice();
        Assert.Equal(expected, calc.Add(a, b));
    }

    // Test asynchrone
    [Fact]
    public async Task DivisionAsync()
    {
        var service = new OperateurService();
        var result = await service.DivideAsync(10, 2);
        Assert.Equal(5, result);
    }
}
// [Fact] : un test unique (sans paramètres).
// [Theory] + [InlineData] : un test paramétré.
// Assert.* : méthodes d’assertion (Equal, True, Throws…).`}
      />

  <Typography variant="h4" gutterBottom>Gestion du contexte – Setup & One‑TimeSetup</Typography>
      <Typography paragraph>
        Pas de SetUp()/TearDown() comme NUnit. À la place, tu fais ainsi :
      </Typography>
      <ul>
  <li><b>Initialiser avant chaque test</b> — utilise le <b>constructeur</b> de ta classe ou un <b>fixture</b> via IClassFixture&lt;T&gt;.</li>
  <li><b>Initialiser une fois pour toute la classe</b> — crée un <b>fixture</b> et utilise <code>public class MyTest : IClassFixture&lt;MyFixture&gt;</code>.</li>
      </ul>

      <Typography variant="h6" gutterBottom>Exemple : Setup par constructeur</Typography>
      <CodeBlock
        code={`public class CalculatriceTests
{
    private readonly Calculatrice _calc;

    public CalculatriceTests()
    {
        // Ce bloc s’exécute **avant chaque test** de la classe
        _calc = new Calculatrice();
    }

    [Fact]
    public void Addition()
    {
        Assert.Equal(5, _calc.Add(2, 3));
    }
}`}
      />

      <Typography variant="h6" gutterBottom>Exemple : One‑TimeSetup avec IClassFixture&lt;T&gt;</Typography>
      <CodeBlock
        code={`// Fixture partagé entre tous les tests de la classe
public class DatabaseFixture : IDisposable
{
    public SqlConnection Connection { get; }

    public DatabaseFixture()
    {
        // Se connecter à la DB (exécuté une seule fois)
        Connection = new SqlConnection("Data Source=...;");
        Connection.Open();
    }

    public void Dispose()   // Nettoyage après tous les tests
    {
        Connection.Close();
    }
}

public class RepositoryTests : IClassFixture<DatabaseFixture>
{
    private readonly DatabaseFixture _fixture;
    private readonly UserRepository _repo;

    public RepositoryTests(DatabaseFixture fixture)
    {
        _fixture = fixture;
        _repo = new UserRepository(_fixture.Connection);
    }

    [Fact]
    public void GetUser_ShouldReturnCorrectName()
    {
        var user = _repo.GetUser(42);
        Assert.Equal("Alice", user.Name);
    }
}
// IClassFixture<T> : xUnit crée une instance de T une seule fois pour toutes les méthodes de test.
// Dispose est appelé automatiquement après la fin des tests.`}
      />

  <Typography variant="h4" gutterBottom>Bonnes pratiques</Typography>
      <ul>
        <li>
          <b>Utilise [Fact] plutôt que [TestMethod] (MSTest)</b> — syntaxe plus concise et moderne.
        </li>
        <li>
          <b>Favorise les fixtures pour les ressources lourdes</b> — évite de re‑créer la même connexion ou le même objet à chaque test.
        </li>
        <li>
          <b>Évite les dépendances globales (static)</b> — facilite la parallélisation des tests.
        </li>
        <li>
          <b>Utilise Assert.ThrowsAsync&lt;T&gt; pour tester les exceptions asynchrones</b>
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
            href="https://xunit.net/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'inherit', textDecoration: 'underline' }}
          >
            Source : xUnit (site officiel)
          </a>
        </Typography>
        <Typography variant="caption" component="div" sx={{ color: 'text.secondary' }}>
          Écrit le {meta.writtenOn}
        </Typography>
      </Box>
    </Box>
  );
};

const mod: TipModule = { default: XunitTip, meta };
export default XunitTip;
export { mod };
