import React from 'react';
import { useTranslation } from 'react-i18next';
import type { TipModule } from '..';
import { Typography } from '@mui/material';
import CodeBlock from '../../ui/CodeBlock/CodeBlock';
import { TipContent } from '../../ui';
import { meta } from './meta';

const FacetTip: React.FC = () => {
  const { t } = useTranslation('tips');

  return (
    <TipContent>
      <Typography variant="h3" gutterBottom>
        {t('facet.content.mainTitle')}
      </Typography>

      <Typography paragraph>{t('facet.content.intro')}</Typography>

      <Typography variant="h4" gutterBottom>
        {t('facet.content.sections.installation.title')}
      </Typography>
      <Typography paragraph>{t('facet.content.sections.installation.description')}</Typography>

      <CodeBlock language="bash" code={`dotnet add package Facet --version 2.5.1`} />

      <Typography variant="h4" gutterBottom>
        {t('facet.content.sections.basicUsage.title')}
      </Typography>
      <Typography paragraph>{t('facet.content.sections.basicUsage.description')}</Typography>

      <CodeBlock
        language="csharp"
        code={`public class User
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public DateTime CreatedAt { get; set; }
    public List<Order> Orders { get; set; }
}

// Définition de la projection avec l'attribut [Facet]
[Facet]
public partial class UserDto
{
    // Propriétés définies manuellement
    public int Id { get; set; }
    public string Name { get; set; }
    
    // Propriétés générées automatiquement par Facet
    // basées sur la classe User
}`}
      />

      <Typography variant="h4" gutterBottom>
        {t('facet.content.sections.generatedCode.title')}
      </Typography>
      <Typography paragraph>{t('facet.content.sections.generatedCode.description')}</Typography>

      <CodeBlock
        language="csharp"
        code={`// Code généré automatiquement par Facet
partial class UserDto
{
    public string Email { get; set; }
    public DateTime CreatedAt { get; set; }
    
    // Expression de projection générée
    public static Expression<Func<User, UserDto>> Projection =>
        user => new UserDto
        {
            Id = user.Id,
            Name = user.Name,
            Email = user.Email,
            CreatedAt = user.CreatedAt
        };
    
    // Méthode de projection
    public static UserDto FromUser(User user) =>
        new UserDto
        {
            Id = user.Id,
            Name = user.Name,
            Email = user.Email,
            CreatedAt = user.CreatedAt
        };
}`}
      />

      <Typography variant="h4" gutterBottom>
        {t('facet.content.sections.entityFramework.title')}
      </Typography>
      <Typography paragraph>{t('facet.content.sections.entityFramework.description')}</Typography>

      <CodeBlock
        language="csharp"
        code={`public class UserService
{
    private readonly ApplicationDbContext _context;
    
    public UserService(ApplicationDbContext context)
    {
        _context = context;
    }
    
    // Utilisation avec Entity Framework
    public async Task<List<UserDto>> GetUsersAsync()
    {
        return await _context.Users
            .Select(UserDto.Projection)
            .ToListAsync();
    }
    
    // Plus efficace que :
    // return await _context.Users
    //     .ToListAsync()
    //     .Select(user => new UserDto { ... });
}`}
      />

      <Typography variant="h4" gutterBottom>
        {t('facet.content.sections.complexProjections.title')}
      </Typography>
      <Typography paragraph>
        {t('facet.content.sections.complexProjections.description')}
      </Typography>

      <CodeBlock
        language="csharp"
        code={`[Facet]
public partial class UserDetailDto
{
    public int Id { get; set; }
    public string Name { get; set; }
    
    // Propriété calculée personnalisée
    public string DisplayName => $"{Name} ({Email})";
    
    // Navigation vers une autre projection
    public List<OrderDto> RecentOrders { get; set; }
    
    // Propriété conditionnelle
    [ConditionalProperty]
    public bool IsActive => CreatedAt > DateTime.UtcNow.AddMonths(-6);
}

[Facet]
public partial class OrderDto
{
    public int Id { get; set; }
    public decimal Amount { get; set; }
    public DateTime OrderDate { get; set; }
}`}
      />

      <Typography variant="h4" gutterBottom>
        {t('facet.content.sections.configuration.title')}
      </Typography>
      <Typography paragraph>{t('facet.content.sections.configuration.description')}</Typography>

      <CodeBlock
        language="csharp"
        code={`[Facet(
    SourceType = typeof(User),
    IncludeNavigationProperties = false,
    GenerateMapper = true)]
public partial class UserSummaryDto
{
    public int Id { get; set; }
    public string Name { get; set; }
    
    // Exclusion explicite d'une propriété
    [FacetIgnore]
    public string Email { get; set; }
    
    // Mapping personnalisé
    [FacetProperty(SourceProperty = "Email")]
    public string ContactEmail { get; set; }
}`}
      />

      <Typography variant="h4" gutterBottom>
        {t('facet.content.sections.performance.title')}
      </Typography>
      <Typography paragraph>{t('facet.content.sections.performance.description')}</Typography>

      <CodeBlock
        language="csharp"
        code={`// ❌ Inefficace - charge toutes les données en mémoire
var users = await _context.Users
    .Include(u => u.Orders)
    .ToListAsync();
var userDtos = users.Select(u => new UserDto 
{ 
    Id = u.Id, 
    Name = u.Name 
}).ToList();

// ✅ Efficace - projection au niveau SQL
var userDtos = await _context.Users
    .Select(UserDto.Projection)
    .ToListAsync();

// SQL généré :
// SELECT [u].[Id], [u].[Name] 
// FROM [Users] AS [u]`}
      />

      <Typography variant="h4" gutterBottom>
        {t('facet.content.sections.bestPractices.title')}
      </Typography>
      <ul>
        <li>
          <Typography>{t('facet.content.sections.bestPractices.practices.naming')}</Typography>
        </li>
        <li>
          <Typography>{t('facet.content.sections.bestPractices.practices.properties')}</Typography>
        </li>
        <li>
          <Typography>{t('facet.content.sections.bestPractices.practices.single')}</Typography>
        </li>
        <li>
          <Typography>{t('facet.content.sections.bestPractices.practices.build')}</Typography>
        </li>
        <li>
          <Typography>
            {t('facet.content.sections.bestPractices.practices.documentation')}
          </Typography>
        </li>
      </ul>

      <Typography variant="h4" gutterBottom>
        {t('facet.content.sections.alternatives.title')}
      </Typography>
      <Typography paragraph>{t('facet.content.sections.alternatives.description')}</Typography>

      <CodeBlock
        language="csharp"
        code={`// AutoMapper
var config = new MapperConfiguration(cfg => {
    cfg.CreateMap<User, UserDto>();
});

// Mapster
var userDto = user.Adapt<UserDto>();

// Projection manuelle avec Entity Framework
var userDtos = await _context.Users
    .Select(u => new UserDto
    {
        Id = u.Id,
        Name = u.Name,
        Email = u.Email
    })
    .ToListAsync();`}
      />

      <Typography variant="h4" gutterBottom sx={{ mt: 3 }}>
        {t('facet.content.sections.conclusion.title')}
      </Typography>
      <Typography paragraph>{t('facet.content.sections.conclusion.description')}</Typography>
    </TipContent>
  );
};

const mod: TipModule = { default: FacetTip, meta };

export default FacetTip;
export { mod };
