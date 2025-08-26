import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { telerikTheme } from '../../theme/theme';
import { PAGE_SPACING } from '../../styles/spacing';
import { PageLayout, ScrollToTopButton } from '../../components';
import { COLORS } from '../../styles/colors';
import { findTipBySlug } from '../../components/tips/registry';
import { Container, Box, Grid, Paper, Typography, Alert, Divider } from '@mui/material';
import { TipList } from '../../components/tips/tip-list';
import { ViewAllTipsButton } from '../../components/ui';
import { RelatedTipsList } from '../../components/tips/related-tips-list';
import { tipsList } from '../../components/tips/registry';

export const TipDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation('pages');
  const entry = slug ? findTipBySlug(slug) : undefined;
  const [LoadedComponent, setLoadedComponent] = useState<React.ComponentType | null>(null);
  const relatedCount = React.useMemo(() => {
    if (!entry) return 0;
    const normalize = (arr?: string[]) => (arr ?? []).map((s) => s.toLowerCase().trim()).filter(Boolean);
    const uniq = (arr: string[]) => Array.from(new Set(arr));
    const allSearchKeywords = (slug: string) => {
      const tip = tipsList.find((x) => x.slug === slug);
      const fr = tip?.metadata?.searchKeywords?.fr ?? [];
      const en = tip?.metadata?.searchKeywords?.en ?? [];
      return uniq(normalize([...fr, ...en]));
    };
    const current = new Set(allSearchKeywords(entry.slug));
    const count = tipsList
      .filter((tip) => tip.slug !== entry.slug)
      .map((tip) => allSearchKeywords(tip.slug).filter((k) => current.has(k)).length)
      .filter((score) => score > 0).length;
    return count;
  }, [entry?.slug]);

  useEffect(() => {
    let cancelled = false;
    setLoadedComponent(null);
    async function loadComponent() {
      if (!entry) return;
      try {
        const mod: any = await entry.load();
        if (!cancelled && mod && mod.default) {
          setLoadedComponent(() => mod.default as React.ComponentType);
        }
      } catch {
        if (!cancelled) setLoadedComponent(null);
      }
    }
    loadComponent();
    return () => {
      cancelled = true;
    };
  }, [entry?.slug]);

  return (
    <ThemeProvider theme={telerikTheme}>
      <CssBaseline />
      <PageLayout>
  <Container maxWidth={false}>
          <Box sx={{ py: PAGE_SPACING.detail.paddingY, my: PAGE_SPACING.detail.marginY }}>
            {!entry && (
              <Alert severity="warning">{t('tipDetailPage.errors.notFound', { slug })}</Alert>
            )}
            {entry && (
              <Grid container spacing={4} key={entry.slug}>
                {/* Left sidebar: navigation list */}
                <Grid item xs={12} md={3} lg={3}>
                  <Paper
                    variant="outlined"
                    sx={{ p: 2, position: 'sticky', top: 24, borderColor: COLORS.itemListHover }}
                  >
                    <Typography variant="h6" sx={{ mb: 2 }}>
                      {t('tipDetailPage.sidebar.title')}
                    </Typography>
                    <TipList selectedSlug={entry.slug} maxItems={7} />
                    <ViewAllTipsButton to="/tips" />
                  </Paper>
                </Grid>
                {/* Main content */}
                <Grid item xs={12} md={relatedCount > 0 ? 6 : 9} lg={relatedCount > 0 ? 6 : 9}>
                  <Typography variant="h1" component="h1" gutterBottom>
                    {entry.title}
                  </Typography>
                  {LoadedComponent ? (
                    <LoadedComponent />
                  ) : (
                    <Typography>{t('tipDetailPage.loading')}</Typography>
                  )}
                </Grid>
                {/* Right sidebar: related tips */}
                {relatedCount > 0 && (
                <Grid item xs={12} md={3} lg={3}>
                  <Paper
                    variant="outlined"
                    sx={{ p: 2, position: 'sticky', top: 24, borderColor: COLORS.itemListHover }}
                  >
                    <Typography variant="h6" sx={{ mb: 1 }}>
                      {t('tipDetailPage.related.title')}
                    </Typography>
                    <Divider sx={{ mb: 1 }} />
                    <RelatedTipsList currentSlug={entry.slug} maxItems={7} />
                  </Paper>
                </Grid>
                )}
              </Grid>
            )}
          </Box>
        </Container>
        <ScrollToTopButton />
      </PageLayout>
    </ThemeProvider>
  );
};

TipDetailPage.displayName = 'TipDetailPage';
