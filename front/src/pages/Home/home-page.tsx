import * as React from 'react';
import { Container, Typography, Box, Card, Grid, Link as MuiLink, Chip } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { COLORS } from '../../styles/colors';
import { PAGE_SPACING } from '../../styles/spacing';
import { LazyTipCardsGrid } from '../../components/tips/tip-cards-grid-lazy';
import { PageLayout } from '../../components';
import { rssSources } from '../../components/news/registry';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import { PromptCard, PromptCardContent } from '../Prompts/styles';
// Lazy-load the prompts grid to avoid importing import.meta-based registry in tests
const LazyPromptCardsGrid = React.lazy(() =>
  import('../../components/prompts/prompt-cards-grid').then((m) => ({
    default: m.PromptCardsGrid,
  })),
);

export const HomePage: React.FC = () => {
  const { t, i18n } = useTranslation('pages');

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
      .sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime())
      .slice(0, 3);
  }, [i18n.language]);

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
            <Grid container spacing={3}>
              {latestNews.map((item) => (
                <Grid item xs={12} sm={6} md={4} key={item.guid}>
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
                          <Typography
                            variant="h6"
                            component="h3"
                            sx={{
                              flex: 1,
                              fontSize: '1.1rem',
                              lineHeight: 1.3,
                              fontWeight: 600,
                            }}
                          >
                            {item.title}
                          </Typography>
                        </Box>

                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mb: 1.5, fontSize: '0.875rem' }}
                        >
                          {formatDate(item.pubDate)}
                        </Typography>

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
                            {item.categories.slice(0, 3).map((category, idx) => (
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
                      </PromptCardContent>
                    </PromptCard>
                  </MuiLink>
                </Grid>
              ))}
            </Grid>
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
          {/* <Typography
          variant="h6"
          align="left"
          color="text.secondary"
          sx={{ mb: 6, marginLeft: 3 }}
        >
          Au cours de mes missions, je me suis toujours dit que ce serait utile
          d'avoir un endroit avec de petits rappels.
          <br />
          Et parce que même avec l'IA, il faut valider des pull requests et ne
          pas oublier les fondamentaux.
        </Typography> */}
          <Box sx={{ px: { xs: 1, md: 2 }, mx: 0, width: '100%' }}>
            {(() => {
              const isTest =
                typeof globalThis.process !== 'undefined' &&
                globalThis.process?.env?.NODE_ENV === 'test';
              if (isTest) return null;
              return (
                <React.Suspense fallback={null}>
                  <LazyTipCardsGrid rows={3} seeAllLink="/tips" />
                </React.Suspense>
              );
            })()}
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
