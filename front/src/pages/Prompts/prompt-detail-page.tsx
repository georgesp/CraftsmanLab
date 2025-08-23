import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Alert, Grid, Paper, Snackbar } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useParams } from 'react-router-dom';
import { telerikTheme } from '../../theme/theme';
import { PAGE_SPACING } from '../../styles/spacing';
import { Header, Footer, ScrollToTopButton } from '../../components';
import { COLORS } from '../../styles/colors';
import { findPromptBySlug } from '../../components/prompts/registry';
import { PromptList } from '../../components/prompts/prompt-list';

export const PromptDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const entry = slug ? findPromptBySlug(slug) : undefined;
  const [copyOpen, setCopyOpen] = useState(false);

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

  // ...

  return (
    <ThemeProvider theme={telerikTheme}>
      <CssBaseline />
      <Header />
      <Container maxWidth="lg">
        <Box sx={{ py: PAGE_SPACING.detail.paddingY, my: PAGE_SPACING.detail.marginY }}>
          {!entry && (
            <Alert severity="warning">Aucun prompt trouvé pour « {slug} »</Alert>
          )}

          {entry && (
            <Grid container spacing={4} key={entry.slug}>
              <Grid item xs={12} md={4} lg={3}>
                <Paper variant="outlined" sx={{ p: 2, position: 'sticky', top: 24, borderColor: COLORS.itemListHover }}>
                  <Typography variant="h6" sx={{ mb: 2 }}>Prompts</Typography>
                  <PromptList selectedSlug={entry.slug} />
                </Paper>
              </Grid>
              <Grid item xs={12} md={8} lg={9}>
                <Typography variant="h1" component="h1" gutterBottom>
                  {entry.title}
                </Typography>
                {/* La shortDescription n'est plus affichée sur la page de détail */}
                {LoadedComponent ? (
                  <LoadedComponent />
                ) : (
                  <Typography>Chargement…</Typography>
                )}
              </Grid>
            </Grid>
          )}
        </Box>
      </Container>
  <ScrollToTopButton />
  <Footer />
  <Snackbar
        open={copyOpen}
        autoHideDuration={2000}
        onClose={() => setCopyOpen(false)}
        message="Prompt copié dans le presse-papiers"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </ThemeProvider>
  );
};

PromptDetailPage.displayName = 'PromptDetailPage';
