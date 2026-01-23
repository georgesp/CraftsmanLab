import { useMemo, useState, useEffect } from 'react';
import { Container, Card, Typography, Box, Chip, TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
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
  const [searchParams] = useSearchParams();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string>('');

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Apply filters from URL params on mount
  useEffect(() => {
    const tagsParam = searchParams.get('tags');
    if (tagsParam) {
      const tags = tagsParam.split(',').map((tag) => tag.trim()).filter(Boolean);
      setSelectedCategories(tags);
    }
  }, [searchParams]);

  // Compter les occurrences de chaque catégorie basé sur les tips filtrés
  const categoryOccurrences = useMemo(() => {
    const occurrences: Record<string, number> = {};
    
    // Filtrer les tips par les catégories déjà sélectionnées
    const filteredTips = selectedCategories.length === 0
      ? tipsList
      : tipsList.filter((tip) => {
          const categories = tip.categories ?? [];
          const selectedSet = new Set(selectedCategories);
          return Array.from(selectedSet).every((c) => categories.includes(c));
        });
    
    filteredTips.forEach((tip) => {
      (tip.categories || []).forEach((category) => {
        const normalized = category.trim();
        if (normalized) {
          occurrences[normalized] = (occurrences[normalized] || 0) + 1;
        }
      });
    });
    return occurrences;
  }, [selectedCategories]);

  // Collect all categories from filtered tips, normalized & unique
  const allCategories = useMemo(() => {
    const filteredTips = selectedCategories.length === 0
      ? tipsList
      : tipsList.filter((tip) => {
          const categories = tip.categories ?? [];
          const selectedSet = new Set(selectedCategories);
          return Array.from(selectedSet).every((c) => categories.includes(c));
        });
    
    const categories = filteredTips.flatMap((tip) => tip.categories ?? []);
    const norm = categories.map((s) => s.trim()).filter(Boolean);
    return Array.from(new Set(norm)).sort((a, b) => {
      // Trier par nombre d'occurrences (descendant), puis alphabétiquement
      const countDiff = (categoryOccurrences[b] || 0) - (categoryOccurrences[a] || 0);
      if (countDiff !== 0) return countDiff;
      return a.localeCompare(b);
    });
  }, [categoryOccurrences, selectedCategories]);

  // Filtrer les catégories par le texte de recherche
  const filteredCategories = useMemo(() => {
    if (!categoryFilter.trim()) return allCategories;
    const lowerFilter = categoryFilter.toLowerCase();
    return allCategories.filter((category) => category.toLowerCase().includes(lowerFilter));
  }, [allCategories, categoryFilter]);

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    );
  };

  const filtered = useMemo(() => {
    if (selectedCategories.length === 0) return tipsList;
    const selectedSet = new Set(selectedCategories);
    return tipsList.filter((tip) => {
      const categories = tip.categories ?? [];
      // match si l'élément possède toutes les catégories sélectionnées
      return Array.from(selectedSet).every((c) => categories.includes(c));
    });
  }, [selectedCategories]);

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
            px: { xs: 2, sm: 3, md: 3 },
            mx: 0,
            width: '100%',
            mb: 0,
          }}
        >
          {/* Encadré avec fond coloré pour l'image et le texte */}
          <Box
            sx={{
              backgroundColor: COLORS.cardBgDark,
              borderRadius: 2,
              p: { xs: 2, sm: 3, md: 3 },
              mb: 1,
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
                  mb: { xs: 2, md: 0 },
                }}
              >
                <Box
                  component="img"
                  src="/image-memo.png"
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
                <Typography
                  variant="body1"
                  sx={{ px: 0, mx: 0, width: '100%', color: 'text.primary' }}
                >
                  {t('tips.description')} <br />
                  {t('tips.aiNote')}
                </Typography>
              </Box>
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
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
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
                        backgroundColor: COLORS.categoryInputBg,
                        '&:hover': {
                          backgroundColor: COLORS.categoryInputBgHover,
                        },
                        '&.Mui-focused': {
                          backgroundColor: COLORS.categoryInputBgHover,
                        },
                      },
                    }}
                  />

                  {/* Tags sélectionnés */}
                  {selectedCategories.length > 0 && (
                    <Box 
                      sx={{ 
                        mb: 2,
                        p: 1.5,
                        backgroundColor: COLORS.categorySelectedBg,
                        borderRadius: 0,
                        border: `1px solid ${COLORS.categorySelectedBorder}`,
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
                        {t('tips.selectedKeywords', { defaultValue: 'Sélection' })} ({selectedCategories.length})
                      </Typography>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                        {selectedCategories.map((category) => (
                          <Box
                            key={category}
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              backgroundColor: 'primary.main',
                              color: 'white',
                              px: 1,
                              py: 0.5,
                              borderRadius: 0,
                              fontSize: '0.75rem',
                            }}
                          >
                            <Typography sx={{ fontSize: '0.75rem', flex: 1 }}>
                              {category}
                            </Typography>
                            <IconButton
                              size="small"
                              onClick={() => toggleCategory(category)}
                              sx={{
                                ml: 0.5,
                                width: 18,
                                height: 18,
                                color: 'white',
                                '&:hover': {
                                    backgroundColor: '#E8EBF0',
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
                      {filteredCategories.map((category) => {
                        const isSelected = selectedCategories.includes(category);
                        
                        return (
                          <Chip
                            key={category}
                            label={
                              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                                <span>{category}</span>
                                <Typography
                                  component="span"
                                  sx={{
                                    fontSize: '0.7rem',
                                    ml: 1,
                                    opacity: 0.7,
                                    fontWeight: 500,
                                  }}
                                >
                                  {categoryOccurrences[category] || 0}
                                </Typography>
                              </Box>
                            }
                            onClick={() => toggleCategory(category)}
                            size="small"
                            sx={{
                              height: { xs: 24, md: 28 },
                              fontSize: { xs: '0.7rem', md: '0.8rem' },
                              justifyContent: 'flex-start',
                              backgroundColor: isSelected ? 'primary.main' : 'transparent',
                              color: isSelected ? 'white' : 'text.primary',
                              border: '1px solid',
                              borderColor: isSelected ? 'primary.main' : COLORS.categoryChipBorder,
                              cursor: 'pointer',
                              transition: 'all 0.2s ease',
                              '&:hover': {
                                backgroundColor: isSelected 
                                  ? 'primary.dark' 
                                  : COLORS.categoryChipHover,
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
