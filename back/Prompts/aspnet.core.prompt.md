# Guide et R�gles ASP.NET Core pour CraftsmanLab

Ce document regroupe les r�gles obligatoires et les meilleures pratiques pour le d�veloppement d'applications ASP.NET Core dans le projet CraftsmanLab. Il s'appuie sur l'[AspNetCore Guidance](https://github.com/davidfowl/AspNetCoreDiagnosticScenarios/blob/master/AspNetCoreGuidance.md) et adapte les recommandations au contexte du workspace.

## Objectif
- Garantir la qualit�, la s�curit� et la maintenabilit� du code ASP.NET Core
- Faciliter la compr�hension et l�application des conventions CraftsmanLab
- Uniformiser la structure et les pratiques dans tous les projets .NET du workspace

---

## 1. Gestion de l'asynchronisme (Async/Await)

### R�gles obligatoires
- Toujours utiliser `async`/`await` pour les op�rations asynchrones
- Ne jamais utiliser `.Result` ou `.Wait()` sur des Tasks
- Ne jamais utiliser `async void` sauf pour les gestionnaires d'�v�nements

### Recommandations
- Utiliser `ConfigureAwait(false)` dans les biblioth�ques
- Pr�f�rer `Task.FromResult` pour retourner des valeurs connues
- Utiliser `ValueTask<T>` si la m�thode peut compl�ter de fa�on synchrone

**Exemple correct**
```csharp
public async Task<IActionResult> GetDataAsync()
{
    var data = await _service.GetDataAsync();
    return Ok(data);
}
```
**Exemple incorrect**
```csharp
public IActionResult GetData()
{
    var data = _service.GetDataAsync().Result; // Deadlock possible
    return Ok(data);
}
```

---

## 2. Injection de D�pendances (DI)

### R�gles obligatoires
- Utiliser l'injection de d�pendances native ASP.NET Core
- Enregistrer les services avec la dur�e de vie adapt�e (Singleton, Scoped, Transient)
- Utiliser des interfaces pour d�coupler les d�pendances
- Pr�f�rer l'injection par constructeur

### � proscrire
- Service Locator pattern
- Injection directe de `IServiceProvider`
- Instanciation manuelle des services avec `new()`

**Exemple**
```csharp
public class UserController : ControllerBase
{
    private readonly IUserService _userService;
    public UserController(IUserService userService) => _userService = userService;
}
// Registration
builder.Services.AddScoped<IUserService, UserService>();
```

---

## 3. Configuration

### R�gles obligatoires
- Utiliser le pattern Options pour la configuration typ�e
- Valider la configuration au d�marrage
- S�parer la configuration par environnement

### Recommandations
- Utiliser `IOptionsSnapshot<T>` pour les configs dynamiques
- Ne pas acc�der directement � `IConfiguration` dans les services
- Bannir les cha�nes magiques pour les cl�s de configuration

**Exemple**
```csharp
public class DatabaseOptions { public string ConnectionString { get; set; } }
builder.Services.Configure<DatabaseOptions>(builder.Configuration.GetSection("Database"));
public class UserService { public UserService(IOptions<DatabaseOptions> options) { ... } }
```

---

## 4. Logging

### R�gles obligatoires
- Utiliser `ILogger<T>` pour le logging
- Respecter les niveaux de log (Information, Warning, Error, etc.)
- Ne jamais logger d'informations sensibles

### Recommandations
- Utiliser LoggerMessage.Define pour les logs haute performance
- Bannir `Console.WriteLine` pour le logging

**Exemple**
```csharp
_logger.LogInformation("Getting user with ID {UserId}", userId);
_logger.LogError(ex, "Error getting user with ID {UserId}", userId);
```

---

## 5. Performance

### R�gles obligatoires
- Utiliser `IMemoryCache` pour le cache en m�moire
- Impl�menter la pagination pour les grandes listes
- Toujours disposer les ressources (using statements)

### Recommandations
- Utiliser `IAsyncEnumerable<T>` pour les flux de donn�es
- Configurer la compression de r�ponse
- Utiliser `OutputCaching` pour les r�ponses statiques

**Exemple**
```csharp
public async Task<PagedResult<User>> GetUsersAsync(int page, int pageSize)
{
    var users = await _context.Users.Skip((page - 1) * pageSize).Take(pageSize).ToListAsync();
    var total = await _context.Users.CountAsync();
    return new PagedResult<User>(users, total, page, pageSize);
}
```

---

## 6. S�curit�

### R�gles obligatoires
- Utiliser HTTPS en production
- Valider toutes les entr�es utilisateur
- Utiliser l'authentification et l'autorisation int�gr�es
- Impl�menter la protection CSRF
- Utiliser des en-t�tes de s�curit� adapt�s

### � proscrire
- Requ�tes SQL concat�n�es (toujours utiliser des param�tres)
- Exposition d'informations sensibles dans les logs ou erreurs
- D�sactivation de la validation SSL

**Exemple**
```csharp
if (!ModelState.IsValid) return BadRequest(ModelState);
if (await _userService.EmailExistsAsync(request.Email)) return Conflict("Email already exists");
```

---

## 7. Controllers et APIs

### R�gles obligatoires
- Utiliser des `ActionResult` adapt�s
- Impl�menter une gestion d'erreurs globale
- Documenter l'API avec OpenAPI/Swagger
- Versionner les APIs

### � proscrire
- Exposer directement les entit�s de base de donn�es
- Utiliser des exceptions pour le flux de contr�le normal
- Toujours retourner 200 OK

**Exemple**
```csharp
[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    [HttpGet("{id}")]
    public async Task<ActionResult<UserDto>> GetUser(int id)
    {
        var user = await _userService.GetByIdAsync(id);
        if (user == null) return NotFound();
        return Ok(_mapper.Map<UserDto>(user));
    }
}
```

---

## 8. Middleware

### R�gles obligatoires
- Ordonner correctement le pipeline middleware
- Utiliser les middlewares int�gr�s quand possible
- Impl�menter une gestion d'erreurs globale

### � proscrire
- Ajouter des middlewares inutiles
- Bloquer le pipeline avec des op�rations synchrones
- Oublier d'appeler `next()` dans les middlewares personnalis�s

**Exemple**
```csharp
if (app.Environment.IsDevelopment()) app.UseDeveloperExceptionPage();
else { app.UseExceptionHandler("/Error"); app.UseHsts(); }
app.UseHttpsRedirection(); app.UseStaticFiles(); app.UseRouting(); app.UseAuthentication(); app.UseAuthorization(); app.MapControllers();
```

---

## 9. Tests

### R�gles obligatoires
- Utiliser `TestServer` pour les tests d'int�gration
- Mocker les d�pendances externes
- Tester les sc�narios d'erreur

### Recommandations
- Utiliser des factories pour les donn�es de test
- Ne pas tester uniquement les cas positifs
- Ne jamais utiliser de donn�es de production dans les tests

**Exemple**
```csharp
public class UsersControllerTests : IClassFixture<WebApplicationFactory<Program>>
{
    [Fact]
    public async Task GetUser_ReturnsUser_WhenUserExists()
    {
        var client = _factory.CreateClient();
        var response = await client.GetAsync("/api/users/1");
        response.EnsureSuccessStatusCode();
        var user = await response.Content.ReadFromJsonAsync<UserDto>();
        Assert.NotNull(user);
    }
}
```

---

## 10. Structure du Projet & Conventions CraftsmanLab

### R�gles obligatoires
- Organiser le code par feature/domaine
- S�parer les mod�les de domaine des DTOs
- Utiliser des dossiers logiques (Controllers, Services, Models, etc.)
- Respecter la structure du workspace

### Convention de nommage
- Les contr�leurs se terminent par "Controller"
- Les services d'application par "Service"
- Les DTOs par "Dto", "Request" ou "Response"
- Les entit�s de domaine sans suffixe

**Structure recommand�e**
```
CraftsmanLab.Api/
??? Controllers/
??? Services/
??? Models/
?   ??? Dtos/
?   ??? Entities/
??? Filters/
??? Middleware/
??? Extensions/
```

---

## Pour aller plus loin
- Toujours se r�f�rer � ce guide avant d�impl�menter une nouvelle fonctionnalit� ou de refactorer du code
- Respecter les conventions pour garantir la coh�rence et la maintenabilit� du projet
- Pour toute question, consulter la documentation officielle ASP.NET Core et le r�f�rentiel Guidance