import React from 'react';
import type { TipModule } from '..';
import { Box, Typography } from '@mui/material';
import { CodeBlock } from '../../ui/CodeBlock/CodeBlock';
import type { Keyword } from '../../../utils/constants';

export const meta = {
  slug: 'automapper',
  title: 'Automapper',
  shortDescription: "Mapping simple et efficace entre DTOs et entités avec AutoMapper",
  writtenOn: '2025-08-14',
  // TipMeta expects Keyword[] (mutable). Cast from literal to satisfy TS without changing runtime value.
  keywords: ['C#'] as unknown as Keyword[],
  metadata: {
    searchKeywords: {
      fr: [
        'automapper', 'mapping', 'transformation', 'conversion', 'dto', 'entity', 'objet',
        'profile', 'configuration', 'projection', 'flattening', 'copie',
        'automatique', 'convention', 'règles', 'validation', 'mapFrom', 'ignore'
      ],
      en: [
        'automapper', 'mapping', 'transformation', 'conversion', 'dto', 'entity', 'object',
        'profile', 'configuration', 'projection', 'flattening', 'copy',
        'automatic', 'convention', 'rules', 'validation', 'mapFrom', 'ignore'
      ]
    }
  }
};

const AutomapperTip: React.FC = () => {
  return (
    <Box>

      <Typography paragraph>
        AutoMapper simplifie le transfert de données entre objets (DTO ↔ entité). Utile pour garder le code compact
        et centraliser les règles de mapping.
      </Typography>

      <Typography variant="h3">Installation rapide</Typography>
      <Typography paragraph component="div">
        <code>dotnet add package AutoMapper.Extensions.Microsoft.DependencyInjection</code>
      </Typography>

      <Typography variant="h3">Configuration (avec DI)</Typography>
      <Typography paragraph>
        Dans <code>Startup.cs</code> ou la classe de configuration :
      </Typography>
  <CodeBlock language="csharp" code={`// Scan profiles in the current assembly
services.AddAutoMapper(typeof(Program));`} />

      <Typography variant="h3">Configuration manuelle</Typography>
    <CodeBlock language="csharp" code={`var mappingConfig = new MapperConfiguration(mc =>
{
  mc.AddProfile(new UserProfile());
});

IMapper mapper = mappingConfig.CreateMapper();
services.AddSingleton(mapper);`} />

      <Typography variant="h3">Un profil simple</Typography>
    <CodeBlock language="csharp" code={`public class UserEntity
{
  public int Id { get; set; }
  public string FirstName { get; set; }
  public string LastName  { get; set; }
  public DateTime BirthDate { get; set; }
}

public class UserDto
{
  public int Id { get; set; }
  // FullName: concatenation of FirstName + LastName
  public string FullName { get; set; }
  // Age: calculated from BirthDate
  public int Age { get; set; }
}`} />

    <CodeBlock language="csharp" code={`public class UserProfile : Profile
{
  public UserProfile()
  {
    CreateMap<UserEntity, UserDto>()
      .ForMember(dest => dest.FullName,
             opt  => opt.MapFrom(src => $"{src.FirstName} {src.LastName}"))
      .ForMember(dest => dest.Age,
             opt  => opt.MapFrom(src => DateTime.Today.Year - src.BirthDate.Year));
  }
}`} />

      <Typography variant="h3">Usage</Typography>
  <CodeBlock language="csharp" code={`var userEntity = new UserEntity { Id = 1, FirstName = "Jean", LastName = "Dupont", BirthDate = new DateTime(1990,5,20) };
UserDto dto = _mapper.Map<UserDto>(userEntity);

// dto.FullName == "Jean Dupont"
// dto.Age     == (int)(...)
// dto.Id      == 1`} />

      <Typography variant="h3">Mapping bidirectionnel</Typography>
      <CodeBlock language="csharp" code={`CreateMap<UserDto, UserEntity>()
    .ForMember(dest => dest.FirstName,
               opt  => opt.MapFrom(src => src.FullName.Split(' ')[0]))
    .ForMember(dest => dest.LastName,
               opt  => opt.MapFrom(src => src.FullName.Split(' ')[1]));`} />

      <Typography paragraph>
        Note : si le format de <code>FullName</code> change, mets à jour les profils ou extrait la logique
        dans une méthode partagée.
      </Typography>

      <Typography variant="h3">Mapper des collections</Typography>
      <Typography paragraph>
        Tu peux mapper des listes sans boucle explicite :
      </Typography>
  <CodeBlock language="csharp" code={`List<UserDto> dtos = _mapper.Map<List<UserDto>>(entities);`} />

      <Box mt={4} pt={2} borderTop={theme => `1px solid ${theme.palette.divider}`} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="caption" component="div" sx={{ fontStyle: 'italic', color: 'text.secondary' }}>
          <a href="https://automapper.org/" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>
            Source : Documentation officielle
          </a>
        </Typography>
        <Typography variant="caption" component="div" sx={{ color: 'text.secondary' }}>
          Écrit le {meta.writtenOn}
        </Typography>
      </Box>
    </Box>
  );
};

const mod: TipModule = { default: AutomapperTip, meta };
export default AutomapperTip;
export { mod };
