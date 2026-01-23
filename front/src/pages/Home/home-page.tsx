import * as React from 'react';
import { Container, Typography, Box, Card, Grid, Link as MuiLink, Chip, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { alpha } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { COLORS, PAGE_SPACING, TYPOGRAPHY } from '../../styles';
import { LazyTipCardsGrid } from '../../components/tips/tip-cards-grid-lazy';
import { PageLayout } from '../../components';
import { rssSources } from '../../components/news/registry';
import { tipsList } from '../../components/tips/registry';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import { PromptCard, PromptCardContent } from '../Prompts/styles';
import { TopSourcesFilter, type SourceInfo } from '../../components/news/TopSourcesFilter';
import { TopKeywordsFilter, type KeywordInfo } from '../../components/news/TopKeywordsFilter';
// Lazy-load the prompts grid to avoid importing import.meta-based registry in tests
const LazyPromptCardsGrid = React.lazy(() =>
  import('../../components/prompts/prompt-cards-grid').then((m) => ({
    default: m.PromptCardsGrid,
  })),
);

export const HomePage: React.FC = () => {
  const { t, i18n } = useTranslation('pages');
  const [selectedSource, setSelectedSource] = React.useState<string | null>(null);
  const [selectedKeywords, setSelectedKeywords] = React.useState<string[]>([]);
  const [selectedTipTags, setSelectedTipTags] = React.useState<string[]>([]);

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

  // Calculate top 5 sources by article count
  const topSources: SourceInfo[] = React.useMemo(() => {
    const sourceCounts = rssSources.map(source => ({
      slug: source.meta.slug,
      name: getSourceInfo(source.meta.slug).title,
      articleCount: source.data.items.length,
    }));
    
    return sourceCounts
      .sort((a, b) => b.articleCount - a.articleCount)
      .slice(0, 5);
  }, [i18n.language]);

  // Calculate top 20 keywords across all articles
  const topKeywords: KeywordInfo[] = React.useMemo(() => {
    const keywordCounts: Record<string, number> = {};
    
    rssSources.forEach(source => {
      source.data.items.forEach(item => {
        if (item.categories) {
          item.categories.forEach(category => {
            keywordCounts[category] = (keywordCounts[category] || 0) + 1;
          });
        }
      });
    });

    return Object.entries(keywordCounts)
      .map(([keyword, count]) => ({ keyword, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 30);
  }, []);

  // Get latest 3 news articles
  const latestNews = React.useMemo(() => {
    return rssSources
      .flatMap(source => 
        source.data.items.map(item => ({
          ...item,
          sourceSlug: source.meta.slug,
          sourceInfo: getSourceInfo(source.meta.slug),
        }))
      )
      .filter(item => {
        // Filter by source
        if (selectedSource && item.sourceSlug !== selectedSource) {
          return false;
        }
        
        // Filter by keywords
        if (selectedKeywords.length > 0) {
          const itemCategories = (item.categories || []).map(c => c.toLowerCase());
          return selectedKeywords.some(keyword => 
            itemCategories.includes(keyword.toLowerCase())
          );
        }
        
        return true;
      })
      .sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime())
      .slice(0, 5);
  }, [i18n.language, selectedSource, selectedKeywords]);

  const handleSourceClick = (slug: string | null) => {
    setSelectedSource(slug);
  };

  const handleKeywordClick = (keyword: string) => {
    setSelectedKeywords(prev => {
      if (prev.includes(keyword)) {
        return prev.filter(k => k !== keyword);
      }
      return [...prev, keyword];
    });
  };

  // Calculate top 30 tags for tips
  const topTipTags: KeywordInfo[] = React.useMemo(() => {
    const tagCounts: Record<string, number> = {};
    
    tipsList.forEach(tip => {
      const categories = tip.categories || [];
      categories.forEach(category => {
        tagCounts[category] = (tagCounts[category] || 0) + 1;
      });
    });

    return Object.entries(tagCounts)
      .map(([keyword, count]) => ({ keyword, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 30);
  }, []);

  // Filter tips by selected tags
  const filteredTips = React.useMemo(() => {
    if (selectedTipTags.length === 0) return tipsList;
    
    const selectedSet = new Set(selectedTipTags);
    return tipsList.filter(tip => {
      const categories = tip.categories || [];
      return Array.from(selectedSet).some(tag => categories.includes(tag));
    });
  }, [selectedTipTags]);

  const handleTipTagClick = (tag: string) => {
    setSelectedTipTags(prev => {
      if (prev.includes(tag)) {
        return prev.filter(t => t !== tag);
      }
      return [...prev, tag];
    });
  };

  return (
    <PageLayout>
      {/* Decorative hatched band between header and content */}

      <Container
        maxWidth={false}
        disableGutters
        sx={{ px: 0, mx: 0, width: '100%', backgroundColor: COLORS.darkGreyBg }}
      >
        {/* Latest News Section */}
        <Box sx={{ py: 4, width: '100%' }}>
          <Box sx={{ px: { xs: 1, md: 2 }, mx: 0, width: '100%' }}>
            <Typography variant="h4" align="left" sx={{ mb: 3, marginLeft: 1 }}>
              {t('home.latestNews', { defaultValue: 'Dernières actualités' })}
            </Typography>
            
            {/* Layout en 2 colonnes : Filtres (gauche) + Actualités (droite) */}
            <Box 
              sx={{ 
                display: 'flex', 
                gap: 3, 
                flexDirection: { xs: 'column', md: 'row' } 
              }}
            >
              {/* Colonne de gauche - Filtres (25%) */}
              <Box 
                sx={{ 
                  width: { xs: '100%', md: '25%' },
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                }}
              >
                {/* Filtre par sources */}
                <TopSourcesFilter
                  sources={topSources}
                  selectedSource={selectedSource}
                  onSourceClick={handleSourceClick}
                />
                
                {/* Filtre par mots-clés */}
                <TopKeywordsFilter
                  keywords={topKeywords}
                  selectedKeywords={selectedKeywords}
                  onKeywordClick={handleKeywordClick}
                />
              </Box>
              
              {/* Colonne de droite - Actualités (75%) */}
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Grid container spacing={PAGE_SPACING.cardGrid}>
                  {latestNews.map((item) => (
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
                            border: `${COLORS.cardBorderWidth} solid ${COLORS.cardBorder}`,
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                            cursor: 'pointer',
                          }}
                        >
                          <PromptCardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 0 }}>
                            {/* Contenu de la card */}
                            <Box sx={{ px: PAGE_SPACING.cardPadding, pt: PAGE_SPACING.cardPadding, pb: PAGE_SPACING.cardPadding, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                              {/* Titre avec icône */}
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                                <Box
                                  sx={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: 22,
                                    height: 22,
                                    backgroundColor: COLORS.newsIcon,
                                    borderRadius: 0,
                                    flexShrink: 0,
                                  }}
                                >
                                  <NewspaperIcon sx={{ color: '#FFFFFF', fontSize: 12 }} />
                                </Box>
                                <Typography
                                  variant="h6"
                                  component="h3"
                                  sx={{ fontWeight: TYPOGRAPHY.fontWeights.bold, mb: 0, color: 'text.primary' }}
                                >
                                  {item.title}
                                </Typography>
                              </Box>
                              
                              {/* Ligne séparatrice */}
                              <Box sx={{ width: '100%', height: '1px', backgroundColor: COLORS.cardDivider, mb: 1, mx: -PAGE_SPACING.cardPadding }} />
                              
                              {/* Source badge et date */}
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, flexWrap: 'wrap' }}>
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
                                <Typography
                                  variant="caption"
                                  color="text.secondary"
                                  sx={{ fontSize: '0.75rem' }}
                                >
                                  {item.creator && `${item.creator}, `}{formatDate(item.pubDate)}
                                </Typography>
                              </Box>

                              <Typography
                                variant="body2"
                                sx={{
                                  mb: 2,
                                  flex: 1,
                                  color: 'text.primary',
                                  lineHeight: 1.6,
                                  display: '-webkit-box',
                                  WebkitLineClamp: 3,
                                  WebkitBoxOrient: 'vertical',
                                  overflow: 'hidden',
                                }}
                              >
                                {item.contentSnippet}
                              </Typography>

                              {item.categories && item.categories.length > 0 && (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 'auto' }}>
                                  {item.categories.map((category, idx) => (
                                    <Chip
                                      key={idx}
                                      label={category}
                                      size="small"
                                      variant="outlined"
                                      sx={{
                                        height: 20,
                                        fontSize: '0.65rem',
                                        borderColor: 'primary.main',
                                        color: 'primary.main',
                                      }}
                                    />
                                  ))}
                                </Box>
                              )}
                            </Box>
                          </PromptCardContent>
                        </PromptCard>
                      </MuiLink>
                    </Grid>
                  ))}
                </Grid>
                
                {/* Bouton Voir plus */}
                <Box sx={{ mt: 3 }}>
                  <Button
                    component={Link}
                    to={{
                      pathname: '/news',
                      search: new URLSearchParams({
                        ...(selectedSource && { source: selectedSource }),
                        ...(selectedKeywords.length > 0 && { keywords: selectedKeywords.join(',') }),
                      }).toString(),
                    }}
                    variant="outlined"
                    fullWidth
                    sx={{
                      py: 0.8,
                      borderColor: 'primary.main',
                      color: 'primary.main',
                      '&:hover': {
                        borderColor: 'primary.light',
                        backgroundColor: 'rgba(25, 118, 210, 0.08)',
                      },
                    }}
                  >
                    {t('home.seeMoreNews', { defaultValue: 'Voir plus d\'actualités' })}
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box
        aria-hidden
        sx={{
          mt: 2,
          height: 60,
          width: '100%',
          flex: '0 0 auto',
          // Motif hachuré: cardBg très léger en surimpression
          backgroundImage: `repeating-linear-gradient(45deg,
            ${alpha(COLORS.darkTheme.background, 1)} 0px,
            ${alpha(COLORS.darkTheme.background, 1)} 12px,
            ${alpha(COLORS.cardBgDark, 1)} 12px,
            ${alpha(COLORS.cardBgDark, 1)} 24px
          )`,
        }}
        />

        {/* Tips Section */}
        <Box sx={{ py: PAGE_SPACING.content.paddingY, width: '100%' }}>
          <Box sx={{ px: { xs: 1, md: 2 }, mx: 0, width: '100%' }}>
            <Typography variant="h4" align="left" sx={{ mb: 3, marginLeft: 1 }}>
              {t('home.latestTips', { defaultValue: 'Derniers tips publiés :' })}
            </Typography>
            
            {/* Layout en 2 colonnes : Filtres (gauche) + Tips (droite) */}
            <Box 
              sx={{ 
                display: 'flex', 
                gap: 3, 
                flexDirection: { xs: 'column', md: 'row' } 
              }}
            >
              {/* Colonne de gauche - Filtres par tags (25%) */}
              <Box 
                sx={{ 
                  width: { xs: '100%', md: '25%' },
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                }}
              >
                {/* Filtre par tags */}
                <TopKeywordsFilter
                  keywords={topTipTags}
                  selectedKeywords={selectedTipTags}
                  onKeywordClick={handleTipTagClick}
                  title={t('home.tipsTags', { defaultValue: 'Tags' })}
                />
              </Box>
              
              {/* Colonne de droite - Tips (75%) */}
              <Box sx={{ flex: 1, minWidth: 0 }}>
                {(() => {
                  const isTest =
                    typeof globalThis.process !== 'undefined' &&
                    globalThis.process?.env?.NODE_ENV === 'test';
                  if (isTest) return null;
                  return (
                    <React.Suspense fallback={null}>
                      <LazyTipCardsGrid rows={3} items={filteredTips} />
                    </React.Suspense>
                  );
                })()}
                
                {/* Bouton Voir plus */}
                <Box sx={{ mt: 3 }}>
                  <Button
                    component={Link}
                    to={{
                      pathname: '/tips',
                      search: new URLSearchParams({
                        ...(selectedTipTags.length > 0 && { tags: selectedTipTags.join(',') }),
                      }).toString(),
                    }}
                    variant="outlined"
                    fullWidth
                    sx={{
                      py: 0.8,
                      borderColor: 'primary.main',
                      color: 'primary.main',
                      '&:hover': {
                        borderColor: 'primary.light',
                        backgroundColor: 'rgba(25, 118, 210, 0.08)',
                      },
                    }}
                  >
                    {t('home.seeMoreTips', { defaultValue: 'Voir plus de tips' })}
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Latest Prompts Preview */}
        <Box sx={{ px: 0, width: '100%' }}>
          <Card
            variant="outlined"
            sx={{
              backgroundColor: COLORS.darkGreyBg,
              mb: 0,
              borderLeft: 0,
              borderRight: 0,
              width: '100%',
            }}
          >
            {/* Arrow card intégrée dans la grille via seeAllLink */}
            <Typography variant="h4" align="left" sx={{ mt: 2, mb: 4, marginLeft: 3 }}>
              {t('home.latestPrompts')}
            </Typography>
            <Box
              sx={{
                px: { xs: 0, md: 1 },
                marginBottom: 4,
                marginLeft: 1,
                marginRight: 1,
              }}
            >
              {(() => {
                const isTest =
                  typeof globalThis.process !== 'undefined' &&
                  globalThis.process?.env?.NODE_ENV === 'test';
                if (isTest) return null;
                return (
                  <React.Suspense fallback={null}>
                    <LazyPromptCardsGrid rows={2} showMore={false} seeAllLink="/prompts" />
                  </React.Suspense>
                );
              })()}
            </Box>
          </Card>
        </Box>
      </Container>
    </PageLayout>
  );
};

HomePage.displayName = 'HomePage';
