import { useMemo, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { PageLayout, ScrollToTopButton } from '../../components';
import {
  AtelierContainer,
  SectionTitleBand,
  SearchField,
  Facets,
} from '../../components/atelier';
import type { FacetGroup } from '../../components/atelier';
import { COLORS, TYPOGRAPHY } from '../../styles';
import { rssSources } from '../../components/news/registry';

// Thèmes de regroupement des catégories (facettes).
const categoryThemes: Record<string, string[]> = {
  'Langages & versions': ['.NET', '.NET 10', '.NET 9', '.NET 8', '.NET 7', '.NET 6', '.NET 5', '.NET Core', '.NET Framework', 'C#', 'C# 14', 'C# 13', 'C# 12', 'C# 11', 'C# 10', 'C# 9', 'C# 8', 'F#', 'TypeScript', 'JavaScript'],
  'Frameworks & librairies': ['ASP.NET Core', 'ASP.NET', 'Blazor', 'Entity Framework Core', 'Entity Framework', '.NET MAUI', 'ML.NET', 'React', 'Angular', 'Vue'],
  'Outils de développement': ['Visual Studio', 'Visual Studio 2026', 'Visual Studio 2022', 'VS Code', 'Rider', 'ReSharper', 'JetBrains', 'Git'],
  'Cloud & plateformes': ['Azure', 'Cosmos DB', 'Azure DevOps', 'GitHub', 'AWS', 'Kubernetes', 'Docker'],
  'IA & agents': ['AI', 'Copilot', 'Agents', 'GPT-5'],
  'Autres': [],
};

function themeForCategory(category: string): string {
  const lower = category.toLowerCase();
  for (const [theme, keywords] of Object.entries(categoryThemes)) {
    if (theme === 'Autres') continue;
    if (keywords.some((k) => k.toLowerCase() === lower)) return theme;
  }
  return 'Autres';
}

export const NewsPage: React.FC = () => {
  const { t, i18n } = useTranslation('pages');
  const [searchParams] = useSearchParams();
  const [selectedSource, setSelectedSource] = useState<string | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string>('');
  const lang = i18n.language === 'fr' ? 'fr' : 'en';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const sourceParam = searchParams.get('source');
    const keywordsParam = searchParams.get('keywords');
    if (sourceParam) setSelectedSource(sourceParam);
    if (keywordsParam) {
      const keywords = keywordsParam.split(',').filter((k) => k.trim());
      setSelectedCategories(keywords);
    }
  }, [searchParams]);

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return dateString;
    }
  };

  const getSourceInfo = (sourceSlug: string) => {
    const source = rssSources.find((s) => s.meta.slug === sourceSlug);
    if (!source) return { title: sourceSlug };
    const tr = source.translations[lang] ?? source.translations.en ?? source.translations.fr;
    return { title: tr?.title ?? sourceSlug };
  };

  // Occurrences par catégorie et par source (sur les articles filtrés).
  const categoryOccurrences = useMemo(() => {
    const occ: Record<string, number> = {};
    rssSources
      .filter((s) => !selectedSource || s.meta.slug === selectedSource)
      .forEach((source) => {
        const tr = source.translations[lang] ?? source.translations.en ?? source.translations.fr;
        const sourceName = tr?.title ?? source.meta.slug;
        const items = (source.data?.items ?? []).filter((item) => {
          if (selectedCategories.length === 0) return true;
          const cats = (item.categories || []).map((c) => c.toLowerCase());
          return selectedCategories.every((c) => cats.includes(c.toLowerCase()));
        });
        occ[sourceName] = items.length;
        items.forEach((item) =>
          (item.categories || []).forEach((c) => {
            const n = c.trim();
            if (n) occ[n] = (occ[n] || 0) + 1;
          }),
        );
      });
    return occ;
  }, [lang, selectedSource, selectedCategories]);

  const allCategories = useMemo(() => {
    const cats = rssSources
      .filter((s) => !selectedSource || s.meta.slug === selectedSource)
      .flatMap((source) =>
        (source.data?.items ?? [])
          .filter((item) => {
            if (selectedCategories.length === 0) return true;
            const c = (item.categories || []).map((x) => x.toLowerCase());
            return selectedCategories.every((x) => c.includes(x.toLowerCase()));
          })
          .flatMap((item) => item.categories || []),
      )
      .map((c) => c.trim())
      .filter(Boolean);
    return Array.from(new Set(cats));
  }, [selectedSource, selectedCategories]);

  const sourcesList = useMemo(
    () =>
      rssSources.map((source) => ({
        name: (source.translations[lang] ?? source.translations.en ?? source.translations.fr)?.title ?? source.meta.slug,
        slug: source.meta.slug,
      })),
    [lang],
  );

  // Facettes de catégories groupées par thème, filtrées par recherche.
  const facetGroups = useMemo<FacetGroup[]>(() => {
    const byTheme: Record<string, string[]> = {};
    const q = categoryFilter.trim().toLowerCase();
    allCategories
      .filter((c) => !q || c.toLowerCase().includes(q))
      .forEach((c) => {
        const theme = themeForCategory(c);
        (byTheme[theme] ??= []).push(c);
      });
    return Object.keys(categoryThemes)
      .filter((theme) => byTheme[theme]?.length)
      .map((theme) => ({
        group: theme,
        items: byTheme[theme]
          .sort((a, b) => (categoryOccurrences[b] || 0) - (categoryOccurrences[a] || 0) || a.localeCompare(b))
          .map((c) => ({ label: c, count: categoryOccurrences[c] || 0 })),
      }));
  }, [allCategories, categoryFilter, categoryOccurrences]);

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    );
  };

  const toggleSource = (slug: string) =>
    setSelectedSource((prev) => (prev === slug ? null : slug));

  const allItems = useMemo(() => {
    return rssSources
      .filter((s) => !selectedSource || s.meta.slug === selectedSource)
      .flatMap((source) =>
        (source.data?.items ?? []).map((item) => ({
          ...item,
          sourceSlug: source.meta.slug,
          sourceTitle: getSourceInfo(source.meta.slug).title,
        })),
      )
      .filter((item) => {
        if (selectedCategories.length === 0) return true;
        const c = (item.categories || []).map((x) => x.toLowerCase());
        return selectedCategories.every((x) => c.includes(x.toLowerCase()));
      })
      .sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang, selectedSource, selectedCategories]);

  const hasErrors = rssSources.some((s) => s.data?.error !== undefined);

  const sourceInitials = (name: string) =>
    name
      .replace(/[^A-Za-zÀ-ÿ ]/g, '')
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0]?.toUpperCase())
      .join('') || name.slice(0, 2).toUpperCase();

  return (
    <PageLayout>
      <AtelierContainer>
        <SectionTitleBand illus="book" title={t('news.bandTitle', { defaultValue: 'Actualités' })} />

        <Box
          component="section"
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '270px 1fr' },
            gap: '28px',
            px: { xs: 2.5, md: '46px' },
            pt: '26px',
            pb: '60px',
            alignItems: 'start',
          }}
        >
          {/* Sidebar : sticky + scroll interne pour ne pas dépendre de la hauteur des articles */}
          <Box
            component="aside"
            sx={{
              position: { md: 'sticky' },
              top: 88,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              maxHeight: { md: 'calc(100vh - 108px)' },
              overflowY: { md: 'auto' },
              // Léger espace pour la barre de défilement + scrollbar discrète
              pr: { md: 0.5 },
              scrollbarWidth: 'thin',
              scrollbarColor: `${COLORS.atelier.borderDefault} transparent`,
              '&::-webkit-scrollbar': { width: 8 },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: COLORS.atelier.borderDefault,
                borderRadius: 8,
              },
            }}
          >
            <SearchField
              value={categoryFilter}
              onChange={setCategoryFilter}
              placeholder={t('news.searchPlaceholder', { defaultValue: 'rechercher un article…' })}
            />

            {/* Sources */}
            <Box>
              <Box
                sx={{
                  fontFamily: TYPOGRAPHY.fontFamilies.mono,
                  fontSize: '11px',
                  letterSpacing: '.1em',
                  textTransform: 'uppercase',
                  color: COLORS.atelier.news,
                  fontWeight: 600,
                  m: '0 2px 10px',
                }}
              >
                {t('news.sourcesTitle', { defaultValue: 'Sources' })}
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {sourcesList.map((s) => {
                  const active = selectedSource === s.slug;
                  return (
                    <Box
                      key={s.slug}
                      role="button"
                      aria-pressed={active}
                      aria-label={s.name}
                      tabIndex={0}
                      onClick={() => toggleSource(s.slug)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          toggleSource(s.slug);
                        }
                      }}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        p: '8px 10px',
                        background: active ? COLORS.atelier.newsBg : COLORS.atelier.surface,
                        border: `1px solid ${active ? COLORS.atelier.news : COLORS.atelier.borderDefault}`,
                        borderRadius: '9px',
                        cursor: 'pointer',
                        outline: 'none',
                        transition: 'border-color .15s ease, background .15s ease',
                        '&:hover': { borderColor: COLORS.atelier.news, background: COLORS.atelier.newsBg },
                        '&:focus-visible': { borderColor: COLORS.atelier.news, boxShadow: `0 0 0 3px ${COLORS.atelier.newsBg}` },
                      }}
                    >
                      <Box
                        sx={{
                          width: 22,
                          height: 22,
                          borderRadius: '6px',
                          background: COLORS.atelier.newsBg,
                          color: COLORS.atelier.news,
                          fontFamily: TYPOGRAPHY.fontFamilies.mono,
                          fontSize: '10px',
                          fontWeight: 600,
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        {sourceInitials(s.name)}
                      </Box>
                      <Box component="span" sx={{ flex: 1, fontSize: '13px', color: active ? COLORS.atelier.news : COLORS.atelier.textBody }}>
                        {s.name}
                      </Box>
                      <Box
                        component="span"
                        sx={{ fontFamily: TYPOGRAPHY.fontFamilies.mono, fontSize: '11px', color: COLORS.atelier.textFaint }}
                      >
                        {categoryOccurrences[s.name] ?? 0}
                      </Box>
                    </Box>
                  );
                })}
              </Box>
            </Box>

            {/* Facettes de catégories */}
            <Facets
              groups={facetGroups}
              accent={COLORS.atelier.news}
              accentBg={COLORS.atelier.newsBg}
              selected={selectedCategories}
              onToggle={toggleCategory}
            />
          </Box>

          {/* Colonne articles */}
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', mb: '18px' }}>
              <Box
                component="span"
                sx={{ fontFamily: TYPOGRAPHY.fontFamilies.mono, fontSize: '12.5px', color: COLORS.atelier.textBody }}
              >
                <b style={{ color: COLORS.atelier.textStrong }}>{allItems.length}</b>{' '}
                {t('news.articles', { defaultValue: 'articles' })}
              </Box>
              {!hasErrors && (
                <Box
                  component="span"
                  sx={{
                    fontFamily: TYPOGRAPHY.fontFamilies.mono,
                    fontSize: '12px',
                    color: COLORS.atelier.news,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <Box sx={{ width: 8, height: 8, borderRadius: '50%', background: COLORS.atelier.news }} />
                  {t('news.feedUpToDate', { defaultValue: 'flux à jour' })}
                </Box>
              )}
            </Box>

            {allItems.length > 0 ? (
              <Box
                sx={{
                  background: COLORS.atelier.surface,
                  border: `1px solid ${COLORS.atelier.borderDefault}`,
                  borderRadius: '16px',
                  overflow: 'hidden',
                }}
              >
                {allItems.map((item, idx) => (
                  <Box
                    key={item.guid || item.link}
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: { xs: '32px 1fr', md: '44px 1fr 150px' },
                      gap: 2,
                      p: { xs: 2, md: '18px 22px' },
                      borderTop: idx === 0 ? 'none' : `1px solid ${COLORS.atelier.divider}`,
                      transition: 'background .15s ease',
                      '&:hover': { background: COLORS.atelier.surfaceHover },
                    }}
                  >
                    <Box
                      sx={{
                        width: 44,
                        height: 44,
                        borderRadius: '10px',
                        background: COLORS.atelier.newsBg,
                        color: COLORS.atelier.news,
                        fontFamily: TYPOGRAPHY.fontFamilies.mono,
                        fontSize: '13px',
                        fontWeight: 600,
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {sourceInitials(item.sourceTitle)}
                    </Box>

                    <Box sx={{ minWidth: 0 }}>
                      <Box
                        component="span"
                        sx={{
                          fontFamily: TYPOGRAPHY.fontFamilies.mono,
                          fontSize: '11px',
                          color: COLORS.atelier.textMuted,
                        }}
                      >
                        {item.sourceTitle}
                        {item.categories?.[0] ? ` · ${item.categories[0]}` : ''}
                      </Box>
                      <Typography
                        component="h3"
                        sx={{
                          fontFamily: TYPOGRAPHY.fontFamilies.display,
                          fontWeight: 700,
                          fontSize: '18px',
                          letterSpacing: '-0.01em',
                          lineHeight: 1.25,
                          m: '2px 0 0',
                        }}
                      >
                        <Box
                          component="a"
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          sx={{ color: COLORS.atelier.textStrong, textDecoration: 'none', '&:hover': { color: COLORS.atelier.tips } }}
                        >
                          {item.title}
                        </Box>
                      </Typography>
                      {item.contentSnippet && (
                        <Typography sx={{ fontSize: '13.5px', lineHeight: 1.5, color: COLORS.atelier.textBodyAlt, mt: '6px' }}>
                          {item.contentSnippet}
                        </Typography>
                      )}
                    </Box>

                    <Box
                      sx={{
                        display: { xs: 'none', md: 'flex' },
                        flexDirection: 'column',
                        alignItems: 'flex-end',
                        justifyContent: 'flex-start',
                        gap: '8px',
                      }}
                    >
                      <Box
                        component="span"
                        sx={{ fontFamily: TYPOGRAPHY.fontFamilies.mono, fontSize: '11px', color: COLORS.atelier.textMuted, whiteSpace: 'nowrap' }}
                      >
                        {formatDate(item.pubDate)}
                      </Box>
                      <Box
                        component="a"
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-hidden
                        tabIndex={-1}
                        sx={{ fontSize: '13px', fontWeight: 600, color: COLORS.atelier.tips, textDecoration: 'none', whiteSpace: 'nowrap' }}
                      >
                        {t('news.readArticle', { defaultValue: "Lire l'article" })} →
                      </Box>
                    </Box>
                  </Box>
                ))}
              </Box>
            ) : (
              <Typography sx={{ color: COLORS.atelier.textMuted, fontSize: '14px', py: 4 }}>
                {t('news.noItems', { defaultValue: 'Aucun article' })}
              </Typography>
            )}
          </Box>
        </Box>
      </AtelierContainer>
      <ScrollToTopButton />
    </PageLayout>
  );
};

NewsPage.displayName = 'NewsPage';
export default NewsPage;
