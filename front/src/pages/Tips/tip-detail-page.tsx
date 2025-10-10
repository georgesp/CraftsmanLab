import React, { useEffect, useMemo, useRef, useState } from 'react';
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
import { useCanonical } from '@/utils/useCanonical';

export const TipDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation('pages');
  const entry = slug ? findTipBySlug(slug) : undefined;
  const [LoadedComponent, setLoadedComponent] = useState<React.ComponentType | null>(null);

  const relatedCount = useMemo(() => {
    if (!entry) return 0;

    const normalize = (arr?: string[]) =>
      (arr ?? []).map((s) => s.toLowerCase().trim()).filter(Boolean);
    const uniq = (arr: string[]) => Array.from(new Set(arr));

    const allSearchKeywords = (slug: string) => {
      const tip = tipsList.find((x) => x.slug === slug);
      const all = tip?.metadata?.searchKeywords ?? [];
      return uniq(normalize(all));
    };

    const current = new Set(allSearchKeywords(entry.slug));
    const count = tipsList
      .filter((tip) => tip.slug !== entry.slug)
      .map((tip) => allSearchKeywords(tip.slug).filter((k) => current.has(k)).length)
      .filter((score) => score > 0).length;

    return count;
  }, [entry?.slug]);

  // Refs to measure titles and containers
  const leftPaperRef = useRef<HTMLDivElement | null>(null);
  const leftTitleRef = useRef<HTMLDivElement | null>(null);
  const rightPaperRef = useRef<HTMLDivElement | null>(null);
  const rightTitleRef = useRef<HTMLDivElement | null>(null);

  // Dynamic list sizes based on viewport height, sticky offset, paddings, and reserved button area
  const [leftMaxItems, setLeftMaxItems] = useState<number>(7);
  const [rightMaxItems, setRightMaxItems] = useState<number>(7);
  const [leftListMaxHeight, setLeftListMaxHeight] = useState<number | undefined>(undefined);
  const [rightListMaxHeight, setRightListMaxHeight] = useState<number | undefined>(undefined);

  useEffect(() => {
    const ROW_HEIGHT_PX = 64; // conservative dense ListItem with secondary text + spacing
    const STICKY_TOP_PX = 24; // matches sx top: 24
    const PAPER_PADDING_V_PX = 16 * 2; // p:2 => 16px top + 16px bottom
    const VIEW_ALL_BTN_HEIGHT_PX = 30; // from ViewAllTipsButton styles
    const VIEW_ALL_BTN_MARGIN_TOP_PX = 16; // default marginTop=2 => 16px
    const SAFETY_PX = 16; // buffer to avoid overflow due to fonts/translation lengths

    const compute = () => {
      // LEFT
      const vpH = window.innerHeight || 800;
      const paperTop = leftPaperRef.current?.getBoundingClientRect().top ?? STICKY_TOP_PX;
      // Before sticky engages, use actual top; after sticky, use STICKY_TOP_PX
      const topOffset = paperTop > STICKY_TOP_PX ? paperTop : STICKY_TOP_PX;
      const titleH = leftTitleRef.current?.getBoundingClientRect().height ?? 0;
      let leftAvailable =
        vpH -
        topOffset -
        PAPER_PADDING_V_PX -
        titleH -
        VIEW_ALL_BTN_HEIGHT_PX -
        VIEW_ALL_BTN_MARGIN_TOP_PX -
        SAFETY_PX;
      const leftCount = Math.max(1, Math.floor(leftAvailable / ROW_HEIGHT_PX));
      setLeftMaxItems(leftCount);
      setLeftListMaxHeight(Math.max(100, Math.floor(leftAvailable)));

      // RIGHT
      if (rightPaperRef.current) {
        const rightPaperTop = rightPaperRef.current?.getBoundingClientRect().top ?? STICKY_TOP_PX;
        const rightTopOffset = rightPaperTop > STICKY_TOP_PX ? rightPaperTop : STICKY_TOP_PX;
        const rightTitleH = rightTitleRef.current?.getBoundingClientRect().height ?? 0;
        // Divider + margin approximated by 12px
        const dividerVSpace = 12;
        let rightAvailable =
          vpH - rightTopOffset - PAPER_PADDING_V_PX - rightTitleH - dividerVSpace - SAFETY_PX;
        const rightCount = Math.max(1, Math.floor(rightAvailable / ROW_HEIGHT_PX));
        setRightMaxItems(rightCount);
        setRightListMaxHeight(Math.max(100, Math.floor(rightAvailable)));
      }
    };

    compute();
    window.addEventListener('resize', compute, { passive: true });
    window.addEventListener('scroll', compute, { passive: true });
    return () => {
      window.removeEventListener('resize', compute as any);
      window.removeEventListener('scroll', compute as any);
    };
  }, [entry?.slug, relatedCount]);

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

  // Set canonical for tip detail pages to non-www preferred host
  if (entry) {
    useCanonical(`/tips/${entry.slug}`);
  }

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
                    ref={leftPaperRef}
                  >
                    <Typography variant="h6" sx={{ mb: 2 }} ref={leftTitleRef}>
                      {t('tipDetailPage.sidebar.title')}
                    </Typography>
                    <TipList
                      selectedSlug={entry.slug}
                      maxItems={leftMaxItems}
                      listSx={{ maxHeight: leftListMaxHeight, overflowY: 'auto', pr: 1 }}
                    />
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
                      ref={rightPaperRef}
                    >
                      <Typography variant="h6" sx={{ mb: 1 }} ref={rightTitleRef}>
                        {t('tipDetailPage.related.title')}
                      </Typography>
                      <Divider sx={{ mb: 1 }} />
                      <RelatedTipsList
                        currentSlug={entry.slug}
                        maxItems={rightMaxItems}
                        listSx={{ maxHeight: rightListMaxHeight, overflowY: 'auto', pr: 1 }}
                      />
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
