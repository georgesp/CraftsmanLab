import { createTheme } from '@mui/material/styles';
import { COLORS } from '../styles/colors';
import { TYPOGRAPHY } from '../styles/typography';

export const telerikTheme = createTheme({
  palette: {
    primary: {
      main: COLORS.primary.main,
      light: COLORS.primary.light,
      dark: COLORS.primary.dark,
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#40e0d0', // Turquoise Telerik
      light: '#70f0e0',
      dark: '#2aa0a0',
      contrastText: '#000000',
    },
    background: {
      default: COLORS.defaultBg,
      paper: '#F8FBFD',
    },
    text: {
      primary: '#2d3748',
      secondary: '#4a5568',
    },
    grey: {
      50: '#f7fafc',
      100: '#edf2f7',
      200: '#e2e8f0',
      300: '#cbd5e0',
      400: '#a0aec0',
      500: '#718096',
      600: '#4a5568',
      700: '#2d3748',
      800: '#1a202c',
      900: '#171923',
    },
  },
  typography: {
    fontFamily: TYPOGRAPHY.fontFamily,
    h1: {
      fontSize: TYPOGRAPHY.fontSizes.h1,
      fontWeight: TYPOGRAPHY.fontWeights.bold,
      lineHeight: TYPOGRAPHY.lineHeights.tight,
      letterSpacing: TYPOGRAPHY.letterSpacing.tight,
      color: '#2d3748',
    },
    h2: {
      fontSize: TYPOGRAPHY.fontSizes.h2,
      fontWeight: TYPOGRAPHY.fontWeights.semiBold,
      lineHeight: TYPOGRAPHY.lineHeights.normal,
      letterSpacing: TYPOGRAPHY.letterSpacing.normal,
      color: '#2d3748',
    },
    h3: {
      fontSize: TYPOGRAPHY.fontSizes.h3,
      fontWeight: TYPOGRAPHY.fontWeights.semiBold,
      lineHeight: TYPOGRAPHY.lineHeights.normal,
      color: '#2d3748',
    },
    h4: {
      fontSize: TYPOGRAPHY.fontSizes.h4,
      fontWeight: TYPOGRAPHY.fontWeights.semiBold,
      lineHeight: TYPOGRAPHY.lineHeights.normal,
      color: '#2d3748',
    },
    h5: {
      fontSize: TYPOGRAPHY.fontSizes.h5,
      fontWeight: TYPOGRAPHY.fontWeights.medium,
      lineHeight: TYPOGRAPHY.lineHeights.relaxed,
      color: '#4a5568',
    },
    h6: {
      fontSize: TYPOGRAPHY.fontSizes.h6,
      fontWeight: TYPOGRAPHY.fontWeights.medium,
      lineHeight: TYPOGRAPHY.lineHeights.relaxed,
      color: '#4a5568',
    },
    body1: {
      fontSize: TYPOGRAPHY.fontSizes.body1,
      lineHeight: TYPOGRAPHY.lineHeights.relaxed,
      color: '#4a5568',
    },
    body2: {
      fontSize: TYPOGRAPHY.fontSizes.body2,
      lineHeight: TYPOGRAPHY.lineHeights.relaxed,
      color: '#718096',
    },
    button: {
      textTransform: 'none',
      fontWeight: TYPOGRAPHY.fontWeights.semiBold,
      fontSize: TYPOGRAPHY.fontSizes.button,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          padding: '12px 24px',
          fontSize: TYPOGRAPHY.fontSizes.button,
          fontWeight: TYPOGRAPHY.fontWeights.semiBold,
          textTransform: 'none',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          },
        },
        contained: {
          background: `linear-gradient(135deg, ${COLORS.primary.main} 0%, ${COLORS.primary.light} 100%)`,
          color: '#fff',
          '&:hover': {
            background: `linear-gradient(135deg, ${COLORS.primary.dark} 0%, ${COLORS.primary.main} 100%)`,
          },
        },
        outlined: {
          borderWidth: '2px',
          borderColor: COLORS.primary.main,
          '&:hover': {
            borderWidth: '2px',
            borderColor: COLORS.primary.dark,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
          border: '1px solid #e2e8f0',
          '&:hover': {
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
            transform: 'translateY(-2px)',
            transition: 'all 0.3s ease-in-out',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: COLORS.defaultBg,
          color: '#2d3748',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          borderBottom: '1px solid #e2e8f0',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 0,
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#1976d2',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#1976d2',
              borderWidth: '2px',
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          fontWeight: TYPOGRAPHY.fontWeights.medium,
          fontSize: TYPOGRAPHY.fontSizes.caption,
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 0,
        },
      },
    },
  },
  shape: {
  borderRadius: 0,
  },
  spacing: 8,
});
