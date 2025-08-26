import React from 'react';
import { Box } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { telerikTheme } from '../../theme/theme';
import { COLORS } from '../../styles/colors';
import { Header } from '../header';
import { Footer } from '../footer';
import { ScrollToTopButton } from '../ui';

export interface PageLayoutProps {
  children: React.ReactNode;
  showScrollToTop?: boolean;
}

export const PageLayout: React.FC<PageLayoutProps> = ({ children, showScrollToTop = false }) => {
  return (
    <ThemeProvider theme={telerikTheme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: COLORS.darkGreyBg,
        }}
      >
        <Header />
        <Box component="main" sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {children}
        </Box>
        {showScrollToTop && <ScrollToTopButton />}
        <Footer />
      </Box>
    </ThemeProvider>
  );
};

PageLayout.displayName = 'PageLayout';
