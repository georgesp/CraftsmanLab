import { useMemo, useState } from 'react';
import { Container, Card, Typography, Box, Grid, Alert, Link as MuiLink, Chip } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { PageLayout, ScrollToTopButton } from '../../components';
import { COLORS } from '../../styles/colors';
import { GridContainer } from '../Prompts/styles';
import { PromptCard, PromptCardContent } from '../Prompts/styles';
import type { NewsItem } from './types';
import { rssSources } from '../../components/news/registry';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import { TagChipsFilter } from '../../components/ui';

export const NewsPage: React.FC = () => {
  const { t, i18n } = useTranslation('pages');
  const [selectedSource, setSelectedSource] = useState<string | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

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

  // Collect all unique categories from all items
  const allCategories = useMemo(() => {
    const categories = rssSources.flatMap(source =>
      source.data.items.flatMap(item => item.categories || [])
    );
    const normalized = categories.map(c => c.trim()).filter(Boolean);
    return Array.from(new Set(normalized)).sort((a, b) => a.localeCompare(b));
  }, []);

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    );
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

            {/* Source filters and last updated */}
            <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                <Chip
                  label={t('news.allSources', { defaultValue: 'Toutes les sources' })}
                  onClick={() => setSelectedSource(null)}
                  sx={{
                    height: 24,
                    fontSize: '0.875rem',
                    backgroundColor: !selectedSource ? 'primary.main' : 'transparent',
                    color: !selectedSource ? 'white' : 'primary.main',
                    borderColor: 'primary.main',
                    border: '1px solid',
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundColor: !selectedSource ? 'primary.dark' : 'rgba(25, 118, 210, 0.08)',
                    },
                  }}
                />
                {rssSources.map((source) => {
                  const lang = i18n.language === 'fr' ? 'fr' : 'en';
                  const sourceTitle = source.translations[lang].title;
                  const isActive = selectedSource === source.meta.slug;
                  
                  return (
                    <Chip
                      key={source.meta.slug}
                      label={sourceTitle}
                      onClick={() => setSelectedSource(source.meta.slug)}
                      sx={{
                        height: 24,
                        fontSize: '0.875rem',
                        backgroundColor: isActive ? 'primary.main' : 'transparent',
                        color: isActive ? 'white' : 'primary.main',
                        borderColor: 'primary.main',
                        border: '1px solid',
                        cursor: 'pointer',
                        '&:hover': {
                          backgroundColor: isActive ? 'primary.dark' : 'rgba(25, 118, 210, 0.08)',
                        },
                      }}
                    />
                  );
                })}
              </Box>

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

            {/* Category filters */}
            <Box sx={{ mb: 2 }}>
              <TagChipsFilter
                tags={allCategories}
                selected={selectedCategories}
                onToggle={toggleCategory}
                formatLabels={false}
              />
            </Box>

            {allItems.length > 0 && (
              <>                <Grid container spacing={4}>
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
                              <NewspaperIcon sx={{ color: 'primary.main', fontSize: 20, mt: 0.5 }} />
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
              </>
            )}

            {allItems.length === 0 && (
              <Typography variant="body1" sx={{ textAlign: 'center', py: 4, color: 'text.secondary' }}>
                {t('news.noItems', { defaultValue: 'Aucun article disponible pour le moment.' })}
              </Typography>
            )}
          </Card>
        </GridContainer>
      </Container>
      <ScrollToTopButton />
    </PageLayout>
  );
};

export default NewsPage;
