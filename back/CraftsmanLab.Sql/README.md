# CraftsmanLab.Sql - Configuration et Injection de Dépendances

Ce document explique comment utiliser la nouvelle classe `CraftsmanLabConfiguration` avec l'injection de dépendances.

## Configuration IOC

### 1. Enregistrement des services

Dans votre `Startup.cs` ou `Program.cs`, utilisez l'extension pour enregistrer tous les services :

```csharp
using CraftsmanLab.Sql.Extensions;

// Dans ConfigureServices ou lors de la configuration des services
services.AddCraftsmanLabSql();
```

### 2. Enregistrement séparé de la configuration

Si vous voulez uniquement la configuration :

```csharp
services.AddCraftsmanLabConfiguration();
```

### 3. Enregistrement manuel

```csharp
// Configuration
services.AddSingleton<ICraftsmanLabConfiguration, CraftsmanLabConfiguration>();

// Connexion Azure SQL
services.AddScoped<IAzureSqlConnection, AzureSqlConnection>();

// Repositories
services.AddScoped<IPromptRepository, PromptRepository>();
```

## Configuration dans appsettings.json

```json
{
  "ConnectionStrings": {
    "AzureSqlDb": "Server=tcp:craftsmanlabserver.database.windows.net,1433;Initial Catalog=CraftsmanLabDb;Persist Security Info=False;User ID=CraftsmanLabUser;Password=***;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;"
  },
  "ConnectionTimeout": 60,
  "Logging": {
    "Enabled": true
  }
}
```

## Utilisation dans un contrôleur

```csharp
[ApiController]
[Route("api/[controller]")]
public class PromptsController : ControllerBase
{
    private readonly IPromptRepository _promptRepository;
    private readonly ICraftsmanLabConfiguration _configuration;

    public PromptsController(
        IPromptRepository promptRepository,
        ICraftsmanLabConfiguration configuration)
    {
        _promptRepository = promptRepository;
        _configuration = configuration;
    }

    [HttpGet]
    public async Task<IActionResult> GetPrompts()
    {
        var prompts = await _promptRepository.GetPromptsAsync();
        return Ok(prompts);
    }
}
```

## Configuration pour les tests

```csharp
// Test unitaire avec mock
var mockConfig = Substitute.For<ICraftsmanLabConfiguration>();
mockConfig.AzureSqlConnectionString.Returns("Server=test;Database=test;");
mockConfig.DefaultConnectionTimeout.Returns(30);
mockConfig.IsLoggingEnabled.Returns(true);

var azureSqlConnection = new AzureSqlConnection(mockConfig);
```

## Avantages

1. **Configuration centralisée** : Toute la configuration est dans `ICraftsmanLabConfiguration`
2. **Injection de dépendances** : Facilite les tests et la maintenance
3. **Valeurs par défaut** : Configuration robuste avec des fallbacks
4. **Séparation des responsabilités** : Configuration séparée de la logique métier
5. **Testabilité** : Facilement mockable pour les tests unitaires