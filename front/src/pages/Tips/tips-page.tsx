import { useMemo, useState } from 'react';
import { Container, Card, Typography, Box, Chip, TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';
import { PageLayout, ScrollToTopButton } from '../../components';
import { TipCardsGrid } from '../../components/tips/tip-cards-grid';
import { COLORS } from '../../styles/colors';
import { GridContainer, PromptsPageContainer } from '../Prompts/styles';
import { tipsList } from '../../components/tips/registry';

// Special display mappings for acronyms / branded terms.
const SPECIAL_MAPPINGS: Record<string, string> = {
  dotnet: '.NET',
  'f#': 'F#',
  fsharp: 'F#',
  sql: 'SQL',
  tsql: 'T-SQL',
  npm: 'NPM',
  mcp: 'MCP',
  ai: 'AI',
  orm: 'ORM',
  json: 'JSON',
  nuget: 'NuGet',
};

// Convert a tag string to PascalCase for display.
// Preserve '#' (so 'c#11' -> 'C#11') and treat other non-alphanumeric as separators.
const toPascalCase = (s: string) => {
  if (!s) return s;
  // Check explicit special-case mappings first. Normalize by removing separators.
  const normalizedForMap = s.toLowerCase().replace(/[^a-z0-9#]+/g, '');
  if (SPECIAL_MAPPINGS[normalizedForMap]) return SPECIAL_MAPPINGS[normalizedForMap];

  // Allow '#' to remain inside tokens; replace other non-alphanumeric (except #) with space
  // Preserve literal spaces when the original string contains them (e.g. 'dot net' -> 'Dot Net')
  const preserveSpaces = /\s/.test(s);
  const cleaned = s.replace(/[^A-Za-z0-9#]+/g, ' ').trim();
  const parts = cleaned.split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '';
  const transformed = parts.map((p) => p.charAt(0).toUpperCase() + p.slice(1).toLowerCase());
  return preserveSpaces ? transformed.join(' ') : transformed.join('');
};

export const TipsPage: React.FC = () => {
  const { t } = useTranslation('pages');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [tagFilter, setTagFilter] = useState<string>('');

  // Compter les occurrences de chaque tag
  const tagOccurrences = useMemo(() => {
    const occurrences: Record<string, number> = {};
    tipsList.forEach((tip) => {
      (tip.metadata?.tags || []).forEach((tag) => {
        const normalized = tag.trim();
        if (normalized) {
          occurrences[normalized] = (occurrences[normalized] || 0) + 1;
        }
      });
    });
    return occurrences;
  }, []);

  // Collect all tags from tips metadata, normalized & unique
  const allTags = useMemo(() => {
    const tags = tipsList.flatMap((tip) => tip.metadata?.tags ?? []);
    const norm = tags.map((s) => s.trim()).filter(Boolean);
    return Array.from(new Set(norm)).sort((a, b) => {
      // Trier par nombre d'occurrences (descendant), puis alphabétiquement
      const countDiff = (tagOccurrences[b] || 0) - (tagOccurrences[a] || 0);
      if (countDiff !== 0) return countDiff;
      return a.localeCompare(b);
    });
  }, [tagOccurrences]);

  // Filtrer les tags par le texte de recherche
  const filteredTags = useMemo(() => {
    if (!tagFilter.trim()) return allTags;
    const lowerFilter = tagFilter.toLowerCase();
    return allTags.filter((tag) => tag.toLowerCase().includes(lowerFilter));
  }, [allTags, tagFilter]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  const filtered = useMemo(() => {
    if (selectedTags.length === 0) return tipsList;
    const selectedSet = new Set(selectedTags);
    return tipsList.filter((tip) => {
      const tags = tip.metadata?.tags ?? [];
      // match si l'élément possède tous les tags sélectionnés
      return Array.from(selectedSet).every((t) => tags.includes(t));
    });
  }, [selectedTags]);

  return (
    <PageLayout>
      <Container
        maxWidth={false}
        disableGutters
        sx={{ px: 0, mx: 0, width: '100%', backgroundColor: COLORS.darkGreyBg }}
      >
        <PromptsPageContainer
          sx={{
            // add small horizontal padding on xs/sm so text isn't flush against viewport edges
            px: { xs: 2, sm: 3, md: 0 },
            mx: 0,
            width: '100%',
            ml: { xs: 0, md: 6 },
            mb: 0,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'stretch',
              // reduce the gap on md+ so text sits a bit closer to the image
              gap: { xs: 1, sm: 2, md: 2 },
              flexWrap: { xs: 'wrap', md: 'nowrap' },
            }}
          >
            <Box
              sx={{
                flex: { xs: '1 1 100%', md: '0 0 auto' },
                width: { xs: '100%', md: 'auto' },
                maxWidth: { xs: '100%', md: 'none' },
                alignSelf: { xs: 'center', md: 'stretch' },
                position: 'relative',
                display: 'flex',
                mr: { xs: 2, md: 0 },
                mb: { xs: 2, md: 1 },
              }}
            >
              <Box
                component="img"
                src="/image-memo-white.png"
                alt="Illustration tips"
                sx={{
                  width: 80,
                  height: 'auto',
                  objectFit: 'contain',
                  display: 'block',
                }}
              />
            </Box>
            <Box
              sx={{
                position: 'relative',
                // keep a small left padding on md+ so text is closer but not glued
                pl: { xs: 0, md: '0.75rem' },
                pr: 0,
                flex: 1,
                width: { xs: '100%', md: 'auto' },
                mr: { xs: 0, md: 3 },
              }}
            >
              <Box
                component="span"
                sx={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: 0,
                  background: COLORS.darkGreyBg,
                  display: 'none',
                }}
              />
              <Typography
                variant="body1"
                sx={{ px: 0, mx: 0, width: '100%', color: 'text.primary' }}
              >
                {t('tips.description')} <br />
                {t('tips.aiNote')}
              </Typography>
            </Box>
          </Box>
        </PromptsPageContainer>
        <GridContainer sx={{ pt: 0 }}>
          <Card
            variant="outlined"
            sx={{
              backgroundColor: COLORS.darkGreyBg,
              p: { xs: 2, md: 4 },
              boxShadow: 0,
              borderLeft: 0,
              borderRight: 0,
              width: '100%',
            }}
          >
            {/* Layout en 2 colonnes */}
            <Box sx={{ display: 'flex', gap: { xs: 2, md: 3 }, flexDirection: 'row' }}>
              {/* Colonne de gauche - Filtres par tags */}
              <Box 
                sx={{ 
                  width: { xs: '35%', sm: '30%', md: '15%' },
                  flexShrink: 0,
                }}
              >
                <Box sx={{ 
                  position: { md: 'sticky' }, 
                  top: 20,
                }}>
                  {/* Titre des mots-clés */}
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      mb: 2, 
                      fontSize: { xs: '0.875rem', md: '1rem' },
                      fontWeight: 600,
                    }}
                  >
                    {t('tips.keywords', { defaultValue: 'Mots-clés' })}
                  </Typography>

                  {/* Champ de recherche pour filtrer les tags */}
                  <TextField
                    fullWidth
                    size="small"
                    placeholder={t('tips.searchKeywords', { defaultValue: 'Rechercher...' })}
                    value={tagFilter}
                    onChange={(e) => setTagFilter(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon sx={{ fontSize: { xs: '0.875rem', md: '1rem' }, color: 'text.secondary' }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      mb: 2,
                      '& .MuiOutlinedInput-root': {
                        fontSize: { xs: '0.75rem', md: '0.875rem' },
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        '&:hover': {
                          backgroundColor: 'rgba(255, 255, 255, 0.08)',
                        },
                        '&.Mui-focused': {
                          backgroundColor: 'rgba(255, 255, 255, 0.08)',
                        },
                      },
                    }}
                  />

                  {/* Tags sélectionnés */}
                  {selectedTags.length > 0 && (
                    <Box 
                      sx={{ 
                        mb: 2,
                        p: 1.5,
                        backgroundColor: 'rgba(25, 118, 210, 0.08)',
                        borderRadius: 1,
                        border: '1px solid rgba(25, 118, 210, 0.2)',
                      }}
                    >
                      <Typography 
                        variant="caption" 
                        sx={{ 
                          display: 'block',
                          mb: 1,
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          color: 'primary.main',
                          textTransform: 'uppercase',
                        }}
                      >
                        {t('tips.selectedKeywords', { defaultValue: 'Sélection' })} ({selectedTags.length})
                      </Typography>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                        {selectedTags.map((tag) => (
                          <Box
                            key={tag}
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              backgroundColor: 'primary.main',
                              color: 'white',
                              px: 1,
                              py: 0.5,
                              borderRadius: 0.5,
                              fontSize: '0.75rem',
                            }}
                          >
                            <Typography sx={{ fontSize: '0.75rem', flex: 1 }}>
                              {toPascalCase(tag)}
                            </Typography>
                            <IconButton
                              size="small"
                              onClick={() => toggleTag(tag)}
                              sx={{
                                ml: 0.5,
                                width: 18,
                                height: 18,
                                color: 'white',
                                '&:hover': {
                                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                },
                              }}
                            >
                              <CloseIcon sx={{ fontSize: '0.875rem' }} />
                            </IconButton>
                          </Box>
                        ))}
                      </Box>
                    </Box>
                  )}
                  
                  <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
                      {filteredTags.map((tag) => {
                        const isSelected = selectedTags.includes(tag);
                        
                        return (
                          <Chip
                            key={tag}
                            label={
                              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                                <span>{toPascalCase(tag)}</span>
                                <Typography
                                  component="span"
                                  sx={{
                                    fontSize: '0.7rem',
                                    ml: 1,
                                    opacity: 0.7,
                                    fontWeight: 500,
                                  }}
                                >
                                  {tagOccurrences[tag] || 0}
                                </Typography>
                              </Box>
                            }
                            onClick={() => toggleTag(tag)}
                            size="small"
                            sx={{
                              height: { xs: 24, md: 28 },
                              fontSize: { xs: '0.7rem', md: '0.8rem' },
                              justifyContent: 'flex-start',
                              backgroundColor: isSelected ? 'primary.main' : 'transparent',
                              color: isSelected ? 'white' : 'text.primary',
                              border: '1px solid',
                              borderColor: isSelected ? 'primary.main' : 'rgba(255, 255, 255, 0.23)',
                              cursor: 'pointer',
                              transition: 'all 0.2s ease',
                              '&:hover': {
                                backgroundColor: isSelected 
                                  ? 'primary.dark' 
                                  : 'rgba(255, 255, 255, 0.08)',
                                borderColor: 'primary.main',
                              },
                              '& .MuiChip-label': {
                                px: 1.5,
                                width: '100%',
                                textAlign: 'left',
                                display: 'flex',
                              },
                            }}
                          />
                        );
                      })}
                    </Box>
                  </Box>
                </Box>
              </Box>

              {/* Colonne de droite - Tips (85%) */}
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <TipCardsGrid items={filtered} />
              </Box>
            </Box>
          </Card>
        </GridContainer>
      </Container>
      <ScrollToTopButton />
    </PageLayout>
  );
};

export default TipsPage;
