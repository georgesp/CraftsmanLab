import { useMemo, useState } from 'react';
import { Container, Card, Typography, Box, Grid, Alert, Link as MuiLink, Chip, TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';
import { PageLayout, ScrollToTopButton } from '../../components';
import { COLORS } from '../../styles/colors';
import { GridContainer } from '../Prompts/styles';
import { PromptCard, PromptCardContent } from '../Prompts/styles';
import { rssSources } from '../../components/news/registry';
import NewspaperIcon from '@mui/icons-material/Newspaper';

// Groupement des catégories par thème
const categoryThemes: Record<string, string[]> = {
  'Sources': [], // Les sources seront ajoutées dynamiquement
  'Languages & Versions': ['.NET', '.NET 10', '.NET 9', '.NET 8', '.NET 7', '.NET 6', '.NET 5', '.NET Core', '.NET Framework', 'C#', 'C# 14', 'C# 13', 'C# 12', 'C# 11', 'C# 10', 'C# 9', 'C# 8', 'F#', 'F# 10', 'TypeScript', 'JavaScript', 'Swift', 'Python', 'Java', 'Kotlin', 'Rust', 'Go'],
  'Frameworks & Libraries': ['ASP.NET Core', 'ASP.NET', 'Blazor', 'Entity Framework Core', 'Entity Framework', '.NET MAUI', 'ML.NET', 'React', 'Angular', 'Vue'],
  'Development Tools': ['Visual Studio', 'Visual Studio 2026', 'Visual Studio 2022', 'VS Code', 'Rider', 'ReSharper', 'JetBrains', 'Xcode', 'Git', 'IDE', 'Build'],
  'Cloud & Platforms': ['Azure', 'Cosmos DB', 'Azure DevOps', 'GitHub', 'AWS', 'Google Cloud', 'Kubernetes', 'Docker', 'Cloudflare', 'Serverless'],
  'AI & Agents': ['AI', 'Copilot', 'Agents', 'GPT-5', 'DeepSeek'],
  'Testing & Quality': ['Testing', 'Unit Testing', 'Integration Testing', 'Test Automation', 'xUnit', 'NUnit'],
  'DevOps & CI/CD': ['DevOps', 'CI/CD', 'GitHub Actions', 'Deployment', 'Monitoring'],
  'Performance': ['Performance', 'JIT', 'NativeAOT', 'Optimization'],
  'Architecture & Patterns': ['Microservices', 'Design Patterns', 'Architecture', 'Cloud Native', 'Best Practices', 'SOLID', 'Dependency Injection'],
  'APIs & Protocols': ['API', 'HTTP', 'JSON', 'REST', 'OAuth 2.0', 'OAuth', 'OpenAPI'],
  'Database': ['Database', 'SQL', 'Entity Framework Core', 'Cosmos DB', 'NoSQL'],
  'Mobile': ['iOS', 'Android', 'Mobile', 'Xamarin', '.NET MAUI', 'Widgets'],
  'Others': ['Preview', 'Templates', 'Configuration', 'Records', 'Hugo', 'UX']
};

// Fonction pour grouper les catégories par thème avec comptage des occurrences
const groupCategoriesByTheme = (categories: string[], categoryOccurrences: Record<string, number>, sources: Array<{name: string, slug: string}>): Record<string, string[]> => {
  const grouped: Record<string, string[]> = {};
  const usedCategories = new Set<string>();

  // Initialiser tous les thèmes
  Object.keys(categoryThemes).forEach(theme => {
    grouped[theme] = [];
  });

  // Ajouter les sources dans le thème "Sources"
  sources.forEach(source => {
    grouped['Sources'].push(source.name);
  });

  // Parcourir toutes les catégories et les assigner à leur thème
  categories.forEach(category => {
    let assigned = false;
    for (const [theme, keywords] of Object.entries(categoryThemes)) {
      if (theme === 'Others' || theme === 'Sources') continue;
      if (keywords.some(keyword => {
        const lowerCategory = category.toLowerCase();
        const lowerKeyword = keyword.toLowerCase();
        // Correspondance exacte (ignorer la casse)
        if (lowerCategory === lowerKeyword) return true;
        // Vérifier si le mot-clé apparaît comme mot complet dans la catégorie
        const regex = new RegExp(`\\b${lowerKeyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
        return regex.test(category);
      })) {
        if (!grouped[theme].includes(category)) {
          grouped[theme].push(category);
          usedCategories.add(category);
        }
        assigned = true;
        break;
      }
    }
    // Si non assigné, mettre dans "Others"
    if (!assigned && !grouped['Others'].includes(category)) {
      grouped['Others'].push(category);
    }
  });

  // Supprimer les thèmes vides et trier par occurrences
  Object.keys(grouped).forEach(theme => {
    if (grouped[theme].length === 0) {
      delete grouped[theme];
    } else {
      // Trier par nombre d'occurrences (descendant), puis alphabétiquement
      grouped[theme].sort((a, b) => {
        const countDiff = (categoryOccurrences[b] || 0) - (categoryOccurrences[a] || 0);
        if (countDiff !== 0) return countDiff;
        return a.localeCompare(b);
      });
    }
  });

  return grouped;
};

export const NewsPage: React.FC = () => {
  const { t, i18n } = useTranslation('pages');
  const [selectedSource, setSelectedSource] = useState<string | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string>('');
  const [expandedThemes, setExpandedThemes] = useState<Set<string>>(new Set());

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString(i18n.language === 'fr' ? 'fr-FR' : 'en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch {
      return dateString;
    }
  };

  // Get translated source info
  const getSourceInfo = (sourceSlug: string) => {
    const source = rssSources.find(s => s.meta.slug === sourceSlug);
    if (!source) return { title: sourceSlug, description: '' };
    
    const lang = i18n.language === 'fr' ? 'fr' : 'en';
    return source.translations[lang];
  };

  // Compter les occurrences de chaque catégorie (y compris les sources)
  const categoryOccurrences = useMemo(() => {
    const occurrences: Record<string, number> = {};
    rssSources.forEach(source => {
      const lang = i18n.language === 'fr' ? 'fr' : 'en';
      const sourceName = source.translations[lang].title;
      // Compter les articles par source
      occurrences[sourceName] = source.data.items.length;
      // Compter les catégories
      source.data.items.forEach(item => {
        (item.categories || []).forEach(cat => {
          const normalized = cat.trim();
          if (normalized) {
            occurrences[normalized] = (occurrences[normalized] || 0) + 1;
          }
        });
      });
    });
    return occurrences;
  }, [i18n.language]);

  // Collect all unique categories from all items
  const allCategories = useMemo(() => {
    const categories = rssSources.flatMap(source =>
      source.data.items.flatMap(item => item.categories || [])
    );
    const normalized = categories.map(c => c.trim()).filter(Boolean);
    return Array.from(new Set(normalized)).sort((a, b) => a.localeCompare(b));
  }, []);

  // Préparer la liste des sources pour le groupement
  const sourcesList = useMemo(() => {
    const lang = i18n.language === 'fr' ? 'fr' : 'en';
    return rssSources.map(source => ({
      name: source.translations[lang].title,
      slug: source.meta.slug,
    }));
  }, [i18n.language]);

  // Grouper les catégories par thème
  const groupedCategories = useMemo(() => {
    return groupCategoriesByTheme(allCategories, categoryOccurrences, sourcesList);
  }, [allCategories, categoryOccurrences, sourcesList]);

  // Filtrer les catégories par le texte de recherche
  const filteredGroupedCategories = useMemo(() => {
    if (!categoryFilter.trim()) return groupedCategories;
    
    const filtered: Record<string, string[]> = {};
    const lowerFilter = categoryFilter.toLowerCase();
    
    Object.entries(groupedCategories).forEach(([theme, categories]) => {
      const matchingCategories = categories.filter(cat => 
        cat.toLowerCase().includes(lowerFilter)
      );
      if (matchingCategories.length > 0) {
        filtered[theme] = matchingCategories;
      }
    });
    
    return filtered;
  }, [groupedCategories, categoryFilter]);

  const toggleCategory = (category: string) => {
    // Vérifier si c'est une source
    const lang = i18n.language === 'fr' ? 'fr' : 'en';
    const sourceSlug = rssSources.find(s => s.translations[lang].title === category)?.meta.slug;
    
    if (sourceSlug) {
      // C'est une source, utiliser setSelectedSource
      setSelectedSource(selectedSource === sourceSlug ? null : sourceSlug);
    } else {
      // C'est une catégorie normale
      setSelectedCategories((prev) =>
        prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
      );
    }
  };

  const toggleThemeExpansion = (theme: string) => {
    setExpandedThemes((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(theme)) {
        newSet.delete(theme);
      } else {
        newSet.add(theme);
      }
      return newSet;
    });
  };

  // Combiner tous les items de tous les feeds et les trier par date
  const allItems = useMemo(() => {
    const items = rssSources
      .filter(source => !selectedSource || source.meta.slug === selectedSource)
      .flatMap(source => 
        source.data.items.map(item => ({
          ...item,
          sourceSlug: source.meta.slug,
          sourceInfo: getSourceInfo(source.meta.slug),
        }))
      )
      .filter(item => {
        // Filter by categories if any selected
        if (selectedCategories.length === 0) return true;
        const itemCategories = (item.categories || []).map(c => c.toLowerCase());
        const selectedSet = new Set(selectedCategories.map(c => c.toLowerCase()));
        // match if item has all selected categories
        return Array.from(selectedSet).every(cat => itemCategories.includes(cat));
      })
      .sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
    return items;
  }, [i18n.language, selectedSource, selectedCategories]);

  // Vérifier s'il y a des erreurs
  const hasErrors = rssSources.some(s => s.data.error !== undefined);
  const lastUpdated = rssSources[0]?.data.lastUpdated;

  return (
    <PageLayout>
      <Container
        maxWidth={false}
        disableGutters
        sx={{ px: 0, mx: 0, width: '100%', backgroundColor: COLORS.darkGreyBg }}
      >
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
            {hasErrors && (
              <Alert severity="warning" sx={{ mb: 2 }}>
                {t('news.partialError', { defaultValue: 'Certains flux n\'ont pas pu être chargés.' })}
              </Alert>
            )}

            {/* Dernière mise à jour */}
            <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
              {lastUpdated && (
                <Typography
                  variant="caption"
                  sx={{
                    color: 'text.secondary',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {t('news.lastUpdated', {
                    defaultValue: 'Dernière mise à jour : {{date}}',
                    date: formatDate(lastUpdated),
                  })}
                </Typography>
              )}
            </Box>

            {/* Layout en 2 colonnes */}
            <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', md: 'row' } }}>
              {/* Colonne de gauche - Filtres par catégories (15%) */}
              <Box 
                sx={{ 
                  width: { xs: '100%', md: '15%' },
                  flexShrink: 0,
                }}
              >
                <Box sx={{ 
                  position: { md: 'sticky' }, 
                  top: 20,
                }}>
                  {/* Catégories groupées par thème */}
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      mb: 2, 
                      fontSize: '1rem',
                      fontWeight: 600,
                    }}
                  >
                    {t('news.categories', { defaultValue: 'Catégories' })}
                  </Typography>

                  {/* Champ de recherche pour filtrer les catégories */}
                  <TextField
                    fullWidth
                    size="small"
                    placeholder={t('news.searchCategories', { defaultValue: 'Rechercher...' })}
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon sx={{ fontSize: '1rem', color: 'text.secondary' }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      mb: 2,
                      '& .MuiOutlinedInput-root': {
                        fontSize: '0.875rem',
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

                  {/* Catégories et sources sélectionnées */}
                  {(selectedCategories.length > 0 || selectedSource) && (
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
                        {t('news.selectedCategories', { defaultValue: 'Sélection' })} ({selectedCategories.length + (selectedSource ? 1 : 0)})
                      </Typography>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                        {selectedSource && (
                          <Box
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
                              {getSourceInfo(selectedSource).title}
                            </Typography>
                            <IconButton
                              size="small"
                              onClick={() => setSelectedSource(null)}
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
                        )}
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
                              borderRadius: 0.5,
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
                    {Object.entries(filteredGroupedCategories).map(([theme, categories]) => {
                      const isExpanded = expandedThemes.has(theme);
                      const displayedCategories = isExpanded ? categories : categories.slice(0, 5);
                      const hasMore = categories.length > 5;
                      
                      return (
                        <Box key={theme} sx={{ mb: 3 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
                            <Typography 
                              variant="subtitle2" 
                              sx={{ 
                                fontSize: '0.875rem',
                                fontWeight: 600,
                                color: 'primary.main',
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px',
                              }}
                            >
                              {theme}
                            </Typography>
                            {hasMore && (
                              <IconButton
                                size="small"
                                onClick={() => toggleThemeExpansion(theme)}
                                sx={{
                                  width: 20,
                                  height: 20,
                                  color: 'primary.main',
                                  '&:hover': {
                                    backgroundColor: 'rgba(25, 118, 210, 0.08)',
                                  },
                                }}
                              >
                                {isExpanded ? <RemoveIcon sx={{ fontSize: '1rem' }} /> : <AddIcon sx={{ fontSize: '1rem' }} />}
                              </IconButton>
                            )}
                          </Box>
                          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
                            {displayedCategories.map((category) => {
                              // Vérifier si c'est une source
                              const lang = i18n.language === 'fr' ? 'fr' : 'en';
                              const sourceSlug = rssSources.find(s => s.translations[lang].title === category)?.meta.slug;
                              const isSelected = sourceSlug 
                                ? selectedSource === sourceSlug 
                                : selectedCategories.includes(category);
                              
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
                                    height: 28,
                                    fontSize: '0.8rem',
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
                      );
                    })}
                  </Box>
                </Box>
              </Box>

              {/* Colonne de droite - Articles (70%) */}
              <Box sx={{ flex: 1, minWidth: 0 }}>
                {allItems.length > 0 && (
                  <Grid container spacing={4}>
                  {allItems.map((item) => (
                    <Grid item xs={12} sm={12} md={12} key={item.guid}>
                      <MuiLink
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        underline="none"
                        sx={{
                          display: 'block',
                          height: '100%',
                          '&:hover': {
                            '& .news-card': {
                              transform: 'translateY(-4px)',
                              boxShadow: 3,
                            },
                          },
                        }}
                      >
                        <PromptCard
                          className="news-card"
                          sx={{
                            backgroundColor: COLORS.cardBgDark,
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                            cursor: 'pointer',
                          }}
                        >
                          <PromptCardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                            {/* Source badge */}
                            <Box sx={{ mb: 1 }}>
                              <Chip
                                label={item.sourceInfo.title}
                                size="small"
                                sx={{
                                  height: 20,
                                  fontSize: '0.7rem',
                                  backgroundColor: 'primary.main',
                                  color: 'white',
                                }}
                              />
                            </Box>

                            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, mb: 1 }}>
                              <Box
                                sx={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  width: 36,
                                  height: 36,
                                  backgroundColor: COLORS.newsIcon,
                                  borderRadius: '50%',
                                  mt: 0.2,
                                  flexShrink: 0,
                                }}
                              >
                                <NewspaperIcon sx={{ color: '#FFFFFF', fontSize: 20 }} />
                              </Box>
                              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flex: 1, gap: 2 }}>
                                <Typography
                                  variant="h6"
                                  component="h3"
                                  sx={{
                                    fontSize: '1.1rem',
                                    lineHeight: 1.3,
                                    fontWeight: 600,
                                  }}
                                >
                                  {item.title}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                  sx={{ 
                                    fontSize: '0.8rem',
                                    whiteSpace: 'nowrap',
                                  }}
                                >
                                  {formatDate(item.pubDate)}
                                </Typography>
                              </Box>
                            </Box>

                            {item.creator && (
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ mb: 1.5, fontSize: '0.875rem' }}
                              >
                                {item.creator}
                              </Typography>
                            )}

                            <Typography
                              variant="body1"
                              sx={{
                                mb: 2,
                                flex: 1,
                                color: 'text.primary',
                                lineHeight: 1.6,
                              }}
                            >
                              {item.contentSnippet}...
                            </Typography>

                            {item.categories && item.categories.length > 0 && (
                              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {item.categories.slice(0, 3).map((cat, idx) => (
                                  <Typography
                                    key={idx}
                                    variant="caption"
                                    sx={{
                                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                      px: 1,
                                      py: 0.25,
                                      borderRadius: 1,
                                      fontSize: '0.75rem',
                                    }}
                                  >
                                    {cat}
                                  </Typography>
                                ))}
                              </Box>
                            )}
                          </PromptCardContent>
                        </PromptCard>
                      </MuiLink>
                    </Grid>
                  ))}
                </Grid>
                )}

                {allItems.length === 0 && (
                  <Typography variant="body1" sx={{ textAlign: 'center', py: 4, color: 'text.secondary' }}>
                    {t('news.noItems', { defaultValue: 'Aucun article disponible pour le moment.' })}
                  </Typography>
                )}
              </Box>
            </Box>
          </Card>
        </GridContainer>
      </Container>
      <ScrollToTopButton />
    </PageLayout>
  );
};

export default NewsPage;
