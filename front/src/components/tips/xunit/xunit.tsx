import React from 'react';
import { useTranslation } from 'react-i18next';
import type { TipModule } from '..';
import { Box, Typography } from '@mui/material';
import CodeBlock from '../../ui/CodeBlock/CodeBlock';

export const meta = {
  slug: 'xunit',
  title: '', // Utilisera les traductions
  shortDescription: '', // Utilisera les traductions
  writtenOn: '2025-08-12',
  keywords: ['C#' as const],
  metadata: {
    searchKeywords: {
      fr: [
        'xunit',
        'tests',
        'test unitaire',
        'testing',
        'assertion',
        'fact',
        'theory',
        'mstest',
        'nunit',
        'fixture',
        'setup',
        'teardown',
        'mock',
        'assert',
        'async',
      ],
      en: [
        'xunit',
        'tests',
        'unit testing',
        'testing',
        'assertion',
        'fact',
        'theory',
        'mstest',
        'nunit',
        'fixture',
        'setup',
        'teardown',
        'mock',
        'assert',
        'async',
      ],
    },
  },
};

const XunitTip: React.FC = () => {
  const { t } = useTranslation('tips');

  return (
    <Box>
      <Typography variant="h3" gutterBottom>
        {t('xunit.content.mainTitle')}
      </Typography>

      <Typography paragraph>{t('xunit.content.intro')}</Typography>

      <Typography variant="h4" gutterBottom>
        {t('xunit.content.sections.structure.title')}
      </Typography>
      <Typography paragraph>{t('xunit.content.sections.structure.description')}</Typography>

      <CodeBlock
        language="csharp"
        code={`using Xunit;

public class CalculatorTests
{
    [Fact]
    public void Add_TwoIntegers_ReturnsSum()
    {
        // Arrange
        var calculator = new Calculator();
        
        // Act
        var result = calculator.Add(2, 3);
        
        // Assert
        Assert.Equal(5, result);
    }
}`}
      />

      <Typography variant="h4" gutterBottom>
        {t('xunit.content.sections.theory.title')}
      </Typography>
      <Typography paragraph>{t('xunit.content.sections.theory.description')}</Typography>

      <CodeBlock
        language="csharp"
        code={`[Theory]
[InlineData(2, 3, 5)]
[InlineData(10, 20, 30)]
[InlineData(-1, 1, 0)]
public void Add_DifferentValues_ReturnsExpectedSum(int a, int b, int expected)
{
    // Arrange
    var calculator = new Calculator();
    
    // Act
    var result = calculator.Add(a, b);
    
    // Assert
    Assert.Equal(expected, result);
}`}
      />

      <Typography variant="h4" gutterBottom>
        {t('xunit.content.sections.async.title')}
      </Typography>
      <Typography paragraph>{t('xunit.content.sections.async.description')}</Typography>

      <CodeBlock
        language="csharp"
        code={`[Fact]
public async Task ProcessDataAsync_ValidInput_ReturnsProcessedData()
{
    // Arrange
    var service = new DataService();
    var inputData = "test";
    
    // Act
    var result = await service.ProcessDataAsync(inputData);
    
    // Assert
    Assert.NotNull(result);
    Assert.Contains("processed", result);
}`}
      />

      <Typography variant="h4" gutterBottom>
        {t('xunit.content.sections.fixtures.title')}
      </Typography>
      <Typography paragraph>{t('xunit.content.sections.fixtures.description')}</Typography>

      <CodeBlock
        language="csharp"
        code={`public class DatabaseFixture : IDisposable
{
    public DatabaseFixture()
    {
        // Setup database connection
        Database = new TestDatabase();
        Database.Initialize();
    }
    
    public TestDatabase Database { get; private set; }
    
    public void Dispose()
    {
        Database.Dispose();
    }
}

public class DatabaseTests : IClassFixture<DatabaseFixture>
{
    private readonly DatabaseFixture _fixture;
    
    public DatabaseTests(DatabaseFixture fixture)
    {
        _fixture = fixture;
    }
    
    [Fact]
    public void CanConnectToDatabase()
    {
        Assert.True(_fixture.Database.IsConnected);
    }
}`}
      />

      <Typography variant="h4" gutterBottom>
        {t('xunit.content.sections.mocking.title')}
      </Typography>
      <Typography paragraph>{t('xunit.content.sections.mocking.description')}</Typography>

      <CodeBlock
        language="csharp"
        code={`public class UserServiceTests
{
    [Fact]
    public void GetUser_ExistingId_ReturnsUser()
    {
        // Arrange
        var mockRepository = new Mock<IUserRepository>();
        var expectedUser = new User { Id = 1, Name = "John" };
        mockRepository.Setup(x => x.GetById(1)).Returns(expectedUser);
        
        var service = new UserService(mockRepository.Object);
        
        // Act
        var result = service.GetUser(1);
        
        // Assert
        Assert.Equal(expectedUser, result);
        mockRepository.Verify(x => x.GetById(1), Times.Once);
    }
}`}
      />

      <Typography variant="h4" gutterBottom>
        {t('xunit.content.sections.collections.title')}
      </Typography>
      <Typography paragraph>{t('xunit.content.sections.collections.description')}</Typography>

      <CodeBlock
        language="csharp"
        code={`[Collection("Database collection")]
public class IntegrationTest1
{
    // Tests qui partagent la même instance de base de données
}

[Collection("Database collection")]
public class IntegrationTest2
{
    // Tests qui partagent la même instance de base de données
}`}
      />

      <Typography variant="h4" gutterBottom>
        {t('xunit.content.sections.output.title')}
      </Typography>
      <Typography paragraph>{t('xunit.content.sections.output.description')}</Typography>

      <CodeBlock
        language="csharp"
        code={`public class DebuggingTests
{
    private readonly ITestOutputHelper _output;
    
    public DebuggingTests(ITestOutputHelper output)
    {
        _output = output;
    }
    
    [Fact]
    public void ComplexTest_WithDebugging()
    {
        _output.WriteLine("Starting complex test");
        
        var data = GenerateTestData();
        _output.WriteLine($"Generated {data.Count} items");
        
        var result = ProcessData(data);
        _output.WriteLine($"Processing completed with result: {result}");
        
        Assert.True(result);
    }
}`}
      />

      <Typography variant="h4" gutterBottom>
        {t('xunit.content.sections.bestPractices.title')}
      </Typography>
      <ul>
        <li>
          <Typography>{t('xunit.content.sections.bestPractices.practices.naming')}</Typography>
        </li>
        <li>
          <Typography>{t('xunit.content.sections.bestPractices.practices.arrange')}</Typography>
        </li>
        <li>
          <Typography>{t('xunit.content.sections.bestPractices.practices.single')}</Typography>
        </li>
        <li>
          <Typography>{t('xunit.content.sections.bestPractices.practices.independent')}</Typography>
        </li>
        <li>
          <Typography>{t('xunit.content.sections.bestPractices.practices.fast')}</Typography>
        </li>
      </ul>

      <Typography variant="h4" gutterBottom>
        {t('xunit.content.sections.conclusion.title')}
      </Typography>
      <Typography paragraph>{t('xunit.content.sections.conclusion.description')}</Typography>
    </Box>
  );
};

const mod: TipModule = { default: XunitTip, meta };

export default XunitTip;
export { mod };
