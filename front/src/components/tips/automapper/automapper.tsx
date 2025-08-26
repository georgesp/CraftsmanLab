import React from 'react';
import { useTranslation } from 'react-i18next';
import type { TipModule } from '..';
import { Box, Typography } from '@mui/material';
import { CodeBlock } from '../../ui/CodeBlock/CodeBlock';
import TipContent from '../TipContent';
import { meta } from './meta';

const AutomapperTip: React.FC = () => {
  const { t } = useTranslation('tips');

  return (
    <TipContent>
      <Typography variant="h3" gutterBottom>
        {t('automapper.content.mainTitle')}
      </Typography>

      <Typography paragraph>{t('automapper.content.intro')}</Typography>

      <Typography variant="h4" gutterBottom>
        {t('automapper.content.sections.installation.title')}
      </Typography>
      <Typography paragraph component="div">
        <code>{t('automapper.content.sections.installation.command')}</code>
      </Typography>

      <Typography variant="h4" gutterBottom>
        {t('automapper.content.sections.configuration.title')}
      </Typography>
      <Typography paragraph>
        {t('automapper.content.sections.configuration.description')}
      </Typography>
      <CodeBlock
        language="csharp"
        code={t('automapper.content.sections.configuration.codeBlock')}
      />

  <Typography variant="h4">{t('automapper.content.sections.manualConfig.title')}</Typography>
      <CodeBlock
        language="csharp"
        code={`var mappingConfig = new MapperConfiguration(mc =>
{
  mc.AddProfile(new UserProfile());
});

IMapper mapper = mappingConfig.CreateMapper();
services.AddSingleton(mapper);`}
      />

  <Typography variant="h4">{t('automapper.content.sections.simpleProfile.title')}</Typography>
      <CodeBlock
        language="csharp"
        code={`public class UserEntity
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
}`}
      />

      <CodeBlock
        language="csharp"
        code={`public class UserProfile : Profile
{
  public UserProfile()
  {
    CreateMap<UserEntity, UserDto>()
      .ForMember(dest => dest.FullName,
             opt  => opt.MapFrom(src => $"{src.FirstName} {src.LastName}"))
      .ForMember(dest => dest.Age,
             opt  => opt.MapFrom(src => DateTime.Today.Year - src.BirthDate.Year));
  }
}`}
      />

  <Typography variant="h4">{t('automapper.content.sections.usage.title')}</Typography>
      <CodeBlock
        language="csharp"
        code={`var userEntity = new UserEntity { Id = 1, FirstName = "Jean", LastName = "Dupont", BirthDate = new DateTime(1990,5,20) };
UserDto dto = _mapper.Map<UserDto>(userEntity);

// dto.FullName == "Jean Dupont"
// dto.Age     == (int)(...)
// dto.Id      == 1`}
      />

  <Typography variant="h4">{t('automapper.content.sections.bidirectional.title')}</Typography>
      <CodeBlock
        language="csharp"
        code={`CreateMap<UserDto, UserEntity>()
    .ForMember(dest => dest.FirstName,
               opt  => opt.MapFrom(src => src.FullName.Split(' ')[0]))
    .ForMember(dest => dest.LastName,
               opt  => opt.MapFrom(src => src.FullName.Split(' ')[1]));`}
      />

  <Typography paragraph>{t('automapper.content.sections.bidirectional.note')}</Typography>

  <Typography variant="h4">{t('automapper.content.sections.mapCollections.title')}</Typography>
      <Typography paragraph>
        {t('automapper.content.sections.mapCollections.description')}
      </Typography>
      <CodeBlock
        language="csharp"
        code={`List<UserDto> dtos = _mapper.Map<List<UserDto>>(entities);`}
      />

      <Box
        mt={4}
        pt={2}
        borderTop={(theme) => `1px solid ${theme.palette.divider}`}
        sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
      >
        <Typography
          variant="caption"
          component="div"
          sx={{ fontStyle: 'italic', color: 'text.secondary' }}
        >
          <a
            href="https://automapper.org/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'inherit', textDecoration: 'underline' }}
          >
            {t('automapper.content.footer.sourceLabel')}
          </a>
        </Typography>
        <Typography variant="caption" component="div" sx={{ color: 'text.secondary' }}>
          {t('automapper.content.footer.writtenOn', { date: meta.writtenOn })}
        </Typography>
      </Box>
  </TipContent>
  );
};

const mod: TipModule = { default: AutomapperTip, meta };
export default AutomapperTip;
export { mod };
