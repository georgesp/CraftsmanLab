import React from 'react';
import type { TipModule } from '..';
import { Box, Typography } from '@mui/material';
import { CodeBlock } from '../../ui/CodeBlock/CodeBlock';

export const meta = {
  slug: 'facet',
  title: 'Facet',
  shortDescription: 'Générateur compile-time de projections (DTO) pour C# et EF Core.',
  writtenOn: '2025-08-21',
  keywords: ['C#' as const],
};

const FacetTip: React.FC = () => {
  return (
    <Box>
      <Typography variant="h3" gutterBottom>Facet : générateur de projections (DTO) pour C#</Typography>

      <Typography paragraph>
        Facet est un générateur de code qui crée automatiquement des vues spécialisées (projections ou DTOs) pour vos modèles de domaine lors de la compilation.
        <br />
        Il produit le code complet (classes, records, structures, constructeurs, projections LINQ et mappings) sans ajouter de surcharge à l’exécution.
      </Typography>

      <Typography variant="h4" gutterBottom sx={{ mt: 3 }}>Installation</Typography>
      <CodeBlock
        language="bash"
        code={`# Package principal

dotnet add package Facet

# Helpers provider-agnostic

dotnet add package Facet.Extensions

# Extensions EF Core (EF Core 6+)

dotnet add package Facet.Extensions.EFCore`}
      />

      <Typography variant="h4" gutterBottom sx={{ mt: 3 }}>Principales fonctionnalités</Typography>

      <Typography variant="h5" gutterBottom>Étant donné un modèle métier</Typography>
      <CodeBlock
        language="csharp"
        code={`public class User
{
    public int Id { get; set; }
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
    public bool IsActive { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? LastLoginDate { get; set; }
}`}
      />

      <Typography variant="h5" gutterBottom sx={{ mt: 2 }}>Création d'une classe pour le DTO</Typography>
      <CodeBlock
        language="csharp"
        code={`[Facet(typeof(User))]
public partial class UserFacet { }`}
      />

      <Typography variant="h5" gutterBottom sx={{ mt: 2 }}>Déclaration simple d'une projection</Typography>
      <CodeBlock
        language="csharp"
        code={`var user = new User
{
    Id = 1,
    FirstName = "Jean",
    LastName = "Dupont",
    Email = "jean.dupont@example.com",
    IsActive = true,
    CreatedAt = DateTime.Now
};
var userDto = user.ToFacet<UserFacet>();

// Example with List
var users = new List<User>{user };
var userDtos = users.SelectFacets<UserFacet>();
`}      />

      <Typography variant="h5" gutterBottom sx={{ mt: 2 }}>Exclusion / Inclusion de champs</Typography>
      <CodeBlock
        language="csharp"
        code={`[Facet(typeof(User), exclude: ["Password", "Email"])]
public partial class UserWithoutEmail { }

[Facet(typeof(User), IncludeFields = true)]
public partial class UserDto { }`}
      />

      <Typography variant="h5" gutterBottom sx={{ mt: 2 }}>Paramètres</Typography>
      <Box sx={{ overflowX: 'auto', mt: 2 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e0e0e0' }}>
              <th style={{ textAlign: 'left', padding: '12px 8px', fontWeight: 600 }}>Parameter</th>
              <th style={{ textAlign: 'left', padding: '12px 8px', fontWeight: 600 }}>Type</th>
              <th style={{ textAlign: 'left', padding: '12px 8px', fontWeight: 600 }}>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #f0f0f0' }}>
              <td style={{ padding: '8px', fontFamily: 'monospace' }}>sourceType</td>
              <td style={{ padding: '8px', fontFamily: 'monospace', color: '#1976d2' }}>Type</td>
              <td style={{ padding: '8px' }}>Le type à projeter depuis (requis).</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #f0f0f0' }}>
              <td style={{ padding: '8px', fontFamily: 'monospace' }}>exclude</td>
              <td style={{ padding: '8px', fontFamily: 'monospace', color: '#1976d2' }}>string[]</td>
              <td style={{ padding: '8px' }}>Noms des propriétés/champs à exclure du type généré (optionnel).</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #f0f0f0' }}>
              <td style={{ padding: '8px', fontFamily: 'monospace' }}>IncludeFields</td>
              <td style={{ padding: '8px', fontFamily: 'monospace', color: '#1976d2' }}>bool</td>
              <td style={{ padding: '8px' }}>Inclure les champs publics du type source (par défaut : false).</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #f0f0f0' }}>
              <td style={{ padding: '8px', fontFamily: 'monospace' }}>GenerateConstructor</td>
              <td style={{ padding: '8px', fontFamily: 'monospace', color: '#1976d2' }}>bool</td>
              <td style={{ padding: '8px' }}>Générer un constructeur qui copie les valeurs depuis la source (par défaut : true).</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #f0f0f0' }}>
              <td style={{ padding: '8px', fontFamily: 'monospace' }}>Configuration</td>
              <td style={{ padding: '8px', fontFamily: 'monospace', color: '#1976d2' }}>Type?</td>
              <td style={{ padding: '8px' }}>Type de configuration de mapping personnalisé (voir Mapping personnalisé).</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #f0f0f0' }}>
              <td style={{ padding: '8px', fontFamily: 'monospace' }}>GenerateProjection</td>
              <td style={{ padding: '8px', fontFamily: 'monospace', color: '#1976d2' }}>bool</td>
              <td style={{ padding: '8px' }}>Générer une projection LINQ statique (par défaut : true).</td>
            </tr>
            <tr>
              <td style={{ padding: '8px', fontFamily: 'monospace' }}>Kind</td>
              <td style={{ padding: '8px', fontFamily: 'monospace', color: '#1976d2' }}>FacetKind</td>
              <td style={{ padding: '8px' }}>Type de sortie : Class, Record, Struct, RecordStruct (par défaut : Class).</td>
            </tr>
          </tbody>
        </table>
      </Box>

      <Typography variant="h5" gutterBottom sx={{ mt: 2 }}>Types générés (class / record / struct)</Typography>
      <CodeBlock
        language="csharp"
        code={`[Facet(typeof(Product))]
public partial record ProductDto;

[Facet(typeof(Point))]
public partial struct PointDto;`}
      />

      <Typography variant="h5" gutterBottom sx={{ mt: 2 }}>Mapping personnalisé (sync & async)</Typography>
      <CodeBlock
        language="csharp"
        code={`public class UserMapper : IFacetMapConfiguration<User, UserDto>
{
    public static void Map(User source, UserDto target)
    {
        target.FullName = $"{source.FirstName} {source.LastName}";
    }
}

[Facet(typeof(User), Configuration = typeof(UserMapper))]
public partial class UserDto { }`}
      />

      <Typography variant="h5" gutterBottom sx={{ mt: 2 }}>Intégration EF Core & projections côté base</Typography>
      <CodeBlock
        language="csharp"
        code={`var userDtos = await dbContext.Users
    .Where(u => u.IsActive)
    .ToFacetsAsync<UserDto>();

var results = await dbContext.Products
    .Where(p => p.IsAvailable)
    .SelectFacet<ProductDto>()
    .ToListAsync();`}
      />

      <Typography variant="h4" gutterBottom sx={{ mt: 3 }}>Bonnes pratiques</Typography>
      <Typography component="ul" sx={{ ml: 2 }}>
        <li>Privilégiez les projections côté DB pour limiter le transfert mémoire.</li>
        <li>Excluez explicitement les données sensibles.</li>
        <li>Verrouillez la version du package pour éviter des régressions lors des mises à jour.</li>
        <li>Testez les mappings personnalisés et les scénarios asynchrones (I/O).</li>
      </Typography>

      <Typography variant="h4" gutterBottom sx={{ mt: 3 }}>Résumé</Typography>
      <Typography paragraph>
        Facet facilite la création de DTOs et de projections typées à la compilation, réduit le boilerplate et s'intègre bien avec EF Core. C'est un bon choix quand on veut garder un modèle de domaine riche tout en exposant des vues légères et performantes.
      </Typography>

      <Box mt={4} pt={2} borderTop={theme => `1px solid ${theme.palette.divider}`} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="caption" component="div" sx={{ fontStyle: 'italic', color: 'text.secondary' }}>
          Sources : <a href="https://github.com/Tim-Maes/Facet" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>Github officiel</a> • <a href="https://github.com/Tim-Maes/Facet/blob/master/docs/README.md" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>Guides</a>
        </Typography>
        <Typography variant="caption" component="div" sx={{ color: 'text.secondary' }}>
          Écrit le {meta.writtenOn}
        </Typography>
      </Box>
    </Box>
  );
};

const mod: TipModule = { default: FacetTip, meta };
export default FacetTip;
export { mod };
