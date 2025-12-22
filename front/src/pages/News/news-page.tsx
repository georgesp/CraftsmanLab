import { useMemo } from 'react';
import { Container, Card, Typography, Box, Grid, Alert, Link as MuiLink, Chip } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { PageLayout, ScrollToTopButton } from '../../components';
import { COLORS } from '../../styles/colors';
import { GridContainer } from '../Prompts/styles';
import { PromptCard, PromptCardContent } from '../Prompts/styles';
import type { NewsItem } from './types';
import { rssSources } from '../../components/news/registry';
import NewspaperIcon from '@mui/icons-material/Newspaper';

export const NewsPage: React.FC = () => {
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

  // Combiner tous les items de tous les feeds et les trier par date
  const allItems = useMemo(() => {
    return rssSources
      .flatMap(source => 
        source.data.items.map(item => ({
          ...item,
          sourceSlug: source.meta.slug,
          sourceInfo: getSourceInfo(source.meta.slug),
        }))
      )
      .sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
  }, [i18n.language]);

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

            {allItems.length > 0 && (
              <>
                {lastUpdated && (
                  <Typography
                    variant="caption"
                    sx={{
                      display: 'block',
                      mb: 3,
                      color: 'text.secondary',
                      textAlign: 'right',
                    }}
                  >
                    {t('news.lastUpdated', {
                      defaultValue: 'Dernière mise à jour : {{date}}',
                      date: formatDate(lastUpdated),
                    })}
                  </Typography>
                )}

                <Grid container spacing={4}>
                  {allItems.map((item) => (
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
                              {item.creator && ` • ${item.creator}`}
                            </Typography>

                            <Typography
                              variant="body2"
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
