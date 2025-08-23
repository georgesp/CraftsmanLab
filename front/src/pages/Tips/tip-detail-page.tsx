import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { telerikTheme } from '../../theme/theme';
import { PAGE_SPACING } from '../../styles/spacing';
import { Header, ScrollToTopButton } from '../../components';
import { COLORS } from '../../styles/colors';
import { findTipBySlug } from '../../components/tips/registry';
import { Container, Box, Grid, Paper, Typography, Alert } from '@mui/material';
import { TipList } from '../../components/tips/tip-list';
import { ViewAllTipsButton } from '../../components/ui';

export const TipDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const entry = slug ? findTipBySlug(slug) : undefined;
  const [LoadedComponent, setLoadedComponent] = useState<React.ComponentType | null>(null);

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
    return () => { cancelled = true; };
  }, [entry?.slug]);

  return (
    <ThemeProvider theme={telerikTheme}>
      <CssBaseline />
      <Header />
      <Container maxWidth="lg">
        <Box sx={{ py: PAGE_SPACING.detail.paddingY, my: PAGE_SPACING.detail.marginY }}>
          {!entry && (
            <Alert severity="warning">Aucun tip trouvé pour « {slug} »</Alert>
          )}
          {entry && (
            <Grid container spacing={4} key={entry.slug}>
              <Grid item xs={12} md={4} lg={3}>
                <Paper variant="outlined" sx={{ p: 2, position: 'sticky', top: 24, borderColor: COLORS.itemListHover }}>
                  <Typography variant="h6" sx={{ mb: 2 }}>Tips / Mémos</Typography>
                  <TipList selectedSlug={entry.slug} maxItems={7} />
                  <ViewAllTipsButton to="/tips" />
                </Paper>
              </Grid>
              <Grid item xs={12} md={8} lg={9}>
                <Typography variant="h1" component="h1" gutterBottom>
                  {entry.title}
                </Typography>
                {LoadedComponent ? <LoadedComponent /> : <Typography>Chargement…</Typography>}
              </Grid>
            </Grid>
          )}
        </Box>
      </Container>
      <ScrollToTopButton />
    </ThemeProvider>
  );
};

TipDetailPage.displayName = 'TipDetailPage';
