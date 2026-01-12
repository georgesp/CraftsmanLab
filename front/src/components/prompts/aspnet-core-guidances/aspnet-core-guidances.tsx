import React, { useState } from 'react';
import { Box, Typography, Link, IconButton, Snackbar, Alert } from '@mui/material';
import { ContentCopy } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import type { PromptModule } from '..';
import { CodeBlock } from '../../ui/CodeBlock';
import { COLORS } from 'styles/colors';
import { meta } from './meta';

export const promptText = `# Guide et Règles ASP.NET Core

## Objectif
- Garantir la qualité, la sécurité et la maintenabilité du code ASP.NET Core
- Faciliter la compréhension et l'application des conventions
- Uniformiser la structure et les pratiques dans tous les projets .NET du workspace

---

## 1. Gestion de l'asynchronisme (Async/Await)

### Règles obligatoires
- Toujours utiliser \`async\`/\`await\` pour les opérations asynchrones
- Ne jamais utiliser \`.Result\` ou \`.Wait()\` sur des Tasks
- Ne jamais utiliser \`async void\` sauf pour les gestionnaires d'événements

### Recommandations
- Utiliser \`ConfigureAwait(false)\` dans les bibliothèques
- Préférer \`Task.FromResult\` pour retourner des valeurs connues
- Utiliser \`ValueTask<T>\` si la méthode peut compléter de façon synchrone

**Exemple correct**
\`\`\`csharp
public async Task<IActionResult> GetDataAsync()
{
    var data = await _service.GetDataAsync();
    return Ok(data);
}
\`\`\`
**Exemple incorrect**
\`\`\`csharp
public IActionResult GetData()
{
    var data = _service.GetDataAsync().Result; // Deadlock possible
    return Ok(data);
}
\`\`\`

---

## 2. Injection de Dépendances (DI)

### Règles obligatoires
- Utiliser l'injection de dépendances native ASP.NET Core
- Enregistrer les services avec la durée de vie adaptée (Singleton, Scoped, Transient)
- Utiliser des interfaces pour découpler les dépendances
- Préférer l'injection par constructeur

### À proscrire
- Service Locator pattern
- Injection directe de \`IServiceProvider\`
- Instanciation manuelle des services avec \`new()\`

**Exemple**
\`\`\`csharp
public class UserController : ControllerBase
{
    private readonly IUserService _userService;
    public UserController(IUserService userService) => _userService = userService;
}
// Registration
builder.Services.AddScoped<IUserService, UserService>();
\`\`\`

---

## 3. Configuration

### Règles obligatoires
- Utiliser le pattern Options pour la configuration typée
- Valider la configuration au démarrage
- Séparer la configuration par environnement

### Recommandations
- Utiliser \`IOptionsSnapshot<T>\` pour les configs dynamiques
- Ne pas accéder directement à \`IConfiguration\` dans les services
- Bannir les chaînes magiques pour les clés de configuration

**Exemple**
\`\`\`csharp
public class DatabaseOptions { public string ConnectionString { get; set; } }
builder.Services.Configure<DatabaseOptions>(builder.Configuration.GetSection("Database"));
public class UserService { public UserService(IOptions<DatabaseOptions> options) { ... } }
\`\`\`

---

## 4. Logging

### Règles obligatoires
- Utiliser \`ILogger<T>\` pour le logging
- Respecter les niveaux de log (Information, Warning, Error, etc.)
- Ne jamais logger d'informations sensibles

### Recommandations
- Utiliser LoggerMessage.Define pour les logs haute performance
- Bannir \`Console.WriteLine\` pour le logging

**Exemple**
\`\`\`csharp
_logger.LogInformation("Getting user with ID {UserId}", userId);
_logger.LogError(ex, "Error getting user with ID {UserId}", userId);
\`\`\`

---

## 5. Performance

### Règles obligatoires
- Utiliser \`IMemoryCache\` pour le cache en mémoire
- Implémenter la pagination pour les grandes listes
- Toujours disposer les ressources (using statements)

### Recommandations
- Utiliser \`IAsyncEnumerable<T>\` pour les flux de données
- Configurer la compression de réponse
- Utiliser \`OutputCaching\` pour les réponses statiques

**Exemple**
\`\`\`csharp
public async Task<PagedResult<User>> GetUsersAsync(int page, int pageSize)
{
    var users = await _context.Users.Skip((page - 1) * pageSize).Take(pageSize).ToListAsync();
    var total = await _context.Users.CountAsync();
    return new PagedResult<User>(users, total, page, pageSize);
}
\`\`\`

---

## 6. Sécurité

### Règles obligatoires
- Utiliser HTTPS en production
- Valider toutes les entrées utilisateur
- Utiliser l'authentification et l'autorisation intégrées
- Implémenter la protection CSRF
- Utiliser des en-têtes de sécurité adaptés

### À proscrire
- Requêtes SQL concaténées (toujours utiliser des paramètres)
- Exposition d'informations sensibles dans les logs ou erreurs
- Désactivation de la validation SSL

**Exemple**
\`\`\`csharp
if (!ModelState.IsValid) return BadRequest(ModelState);
if (await _userService.EmailExistsAsync(request.Email)) return Conflict("Email already exists");
\`\`\`

---

## 7. Controllers et APIs

### Règles obligatoires
- Utiliser des \`ActionResult\` adaptés
- Implémenter une gestion d'erreurs globale
- Documenter l'API avec OpenAPI/Swagger
- Versionner les APIs

### À proscrire
- Exposer directement les entités de base de données
- Utiliser des exceptions pour le flux de contrôle normal
- Toujours retourner 200 OK

**Exemple**
\`\`\`csharp
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
\`\`\`

---

## 8. Middleware

### Règles obligatoires
- Ordonner correctement le pipeline middleware
- Utiliser les middlewares intégrés quand possible
- Implémenter une gestion d'erreurs globale

### À proscrire
- Ajouter des middlewares inutiles
- Bloquer le pipeline avec des opérations synchrones
- Oublier d'appeler \`next()\` dans les middlewares personnalisés

**Exemple**
\`\`\`csharp
if (app.Environment.IsDevelopment()) app.UseDeveloperExceptionPage();
else { app.UseExceptionHandler("/Error"); app.UseHsts(); }
app.UseHttpsRedirection(); app.UseStaticFiles(); app.UseRouting(); app.UseAuthentication(); app.UseAuthorization(); app.MapControllers();
\`\`\`

---

## 9. Tests

### Règles obligatoires
- Utiliser \`TestServer\` pour les tests d'intégration
- Mocker les dépendances externes
- Tester les scénarios d'erreur

### Recommandations
- Utiliser des factories pour les données de test
- Ne pas tester uniquement les cas positifs
- Ne jamais utiliser de données de production dans les tests

**Exemple**
\`\`\`csharp
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
\`\`\`

---

## 10. Structure du Projet & Conventions

### Règles obligatoires
- Organiser le code par feature/domaine
- Séparer les modèles de domaine des DTOs
- Utiliser des dossiers logiques (Controllers, Services, Models, etc.)
- Respecter la structure du workspace

### Convention de nommage
- Les contrôleurs se terminent par "Controller"
- Les services d'application par "Service"
- Les DTOs par "Dto", "Request" ou "Response"
- Les entités de domaine sans suffixe

**Structure recommandée**
\`\`\`
MyProject.Api/
├── Controllers/
├── Services/
├── Models/
│   ├── Dtos/
│   └── Entities/
├── Filters/
├── Middleware/
└── Extensions/
\`\`\`

---

## Pour aller plus loin
- Toujours se référer à ce guide avant d'implémenter une nouvelle fonctionnalité ou de refactorer du code
- Respecter les conventions pour garantir la cohérence et la maintenabilité du projet
- Pour toute question, consulter la documentation officielle ASP.NET Core et le référentiel Guidance`;

const PromptBody: React.FC = () => {
  const { t } = useTranslation('prompts');
  const [showCopySuccess, setShowCopySuccess] = useState(false);
  const writtenOn = meta.writtenOn
    ? new Date(meta.writtenOn).toLocaleDateString('fr-FR')
    : new Date().toLocaleDateString('fr-FR');

  const description = t('aspnet-core-guidances.content.introduction');

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(promptText);
      setShowCopySuccess(true);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleCloseSnackbar = () => {
    setShowCopySuccess(false);
  };

  return (
    <Box>
      <Typography variant="body1" sx={{ mb: 2 }}>
        {description}
      </Typography>
      <Box sx={{ borderTop: '1px solid', borderColor: 'grey.300', mb: 3 }} />

      <Box sx={{ position: 'relative' }}>
        <IconButton
          onClick={handleCopy}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            zIndex: 1,
            backgroundColor: COLORS.overlay.lightSemi,
            borderRadius: 0,
            border: '1px solid',
            borderColor: 'grey.300',
            width: 32,
            height: 32,
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background 0.2s, color 0.2s',
            color: COLORS.copyBtnColor,
            '&:hover': {
              color: COLORS.copyBtnColorHover,
            },
          }}
          size="small"
          title={t('aspnet-core-guidances.content.copyButton')}
        >
          <ContentCopy fontSize="small" />
        </IconButton>
        <CodeBlock code={promptText} />
      </Box>

      <Snackbar
        open={showCopySuccess}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          {t('aspnet-core-guidances.content.copySuccess')}
        </Alert>
      </Snackbar>

      <Box sx={{ mt: 4, pt: 3, borderTop: '1px solid', borderColor: 'grey.300' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
            flexWrap: 'wrap',
          }}
        >
          <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
            {t('aspnet-core-guidances.content.sources')}{' '}
            <Link
              href="https://github.com/davidfowl/AspNetCoreDiagnosticScenarios/blob/master/AspNetCoreGuidance.md"
              target="_blank"
              rel="noopener noreferrer"
            >
              David Fowler
            </Link>
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontStyle: 'italic', textAlign: 'left' }}
          >
            {t('aspnet-core-guidances.content.writtenOn')} {writtenOn}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

// meta imported from ./meta

const moduleExport: PromptModule = {
  default: PromptBody,
  meta,
};

export default PromptBody;
export { moduleExport };
