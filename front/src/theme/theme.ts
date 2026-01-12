import { createTheme } from '@mui/material/styles';
import { COLORS } from '../styles/colors';
import { TYPOGRAPHY } from '../styles/typography';
import { SHADOWS } from '../styles/shadows';

export const telerikTheme = createTheme({
  palette: {
    primary: {
      main: COLORS.primary.main,
      light: COLORS.primary.light,
      dark: COLORS.primary.dark,
      contrastText: '#ffffff',
    },
    secondary: {
      main: COLORS.secondary.main,
      light: COLORS.secondary.light,
      dark: COLORS.secondary.dark,
      contrastText: COLORS.secondary.contrastText,
    },
    background: {
      default: COLORS.darkGreyBg,
      paper: COLORS.darkGreyBg,
    },
    text: {
      primary: COLORS.textPrimary,
      secondary: COLORS.textSecondary,
    },
    grey: COLORS.grey,
  },
  typography: {
    fontFamily: TYPOGRAPHY.fontFamily,
    h1: {
      fontSize: TYPOGRAPHY.fontSizes.h1,
      fontWeight: TYPOGRAPHY.fontWeights.bold,
      lineHeight: TYPOGRAPHY.lineHeights.tight,
      letterSpacing: TYPOGRAPHY.letterSpacing.tight,
      color: COLORS.textPrimary,
    },
    h2: {
      fontSize: TYPOGRAPHY.fontSizes.h2,
      fontWeight: TYPOGRAPHY.fontWeights.semiBold,
      lineHeight: TYPOGRAPHY.lineHeights.normal,
      letterSpacing: TYPOGRAPHY.letterSpacing.normal,
      color: COLORS.textPrimary,
    },
    h3: {
      fontSize: TYPOGRAPHY.fontSizes.h3,
      fontWeight: TYPOGRAPHY.fontWeights.semiBold,
      lineHeight: TYPOGRAPHY.lineHeights.normal,
      color: COLORS.textPrimary || '#E6EEF3',
    },
    h4: {
      fontSize: TYPOGRAPHY.fontSizes.h4,
      fontWeight: TYPOGRAPHY.fontWeights.semiBold,
      lineHeight: TYPOGRAPHY.lineHeights.normal,
      color: COLORS.textPrimary || '#E6EEF3',
    },
    h5: {
      fontSize: TYPOGRAPHY.fontSizes.h5,
      fontWeight: TYPOGRAPHY.fontWeights.medium,
      lineHeight: TYPOGRAPHY.lineHeights.relaxed,
      color: COLORS.textSecondary,
    },
    h6: {
      fontSize: TYPOGRAPHY.fontSizes.h6,
      fontWeight: TYPOGRAPHY.fontWeights.medium,
      lineHeight: TYPOGRAPHY.lineHeights.relaxed,
      color: COLORS.textPrimary,
    },
    body1: {
      fontSize: TYPOGRAPHY.fontSizes.body1,
      lineHeight: TYPOGRAPHY.lineHeights.relaxed,
      color: COLORS.textPrimary,
    },
    body2: {
      fontSize: TYPOGRAPHY.fontSizes.body2,
      lineHeight: TYPOGRAPHY.lineHeights.relaxed,
      color: COLORS.textSecondary,
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
          boxShadow: SHADOWS.none,
          '&:hover': {
            boxShadow: SHADOWS.button,
          },
        },
        contained: {
          background: `linear-gradient(135deg, ${COLORS.primary.main} 0%, ${COLORS.primary.light} 100%)`,
          color: COLORS.white,
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
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: COLORS.darkGreyBg,
          margin: 0,
          padding: 0,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: 'none',
          border: 'none',
          background: 'transparent',
          '&:hover': {
            boxShadow: 'none',
            transform: 'none',
            transition: 'none',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: COLORS.darkGreyBg,
          color: COLORS.white,
          boxShadow: 'none',
          borderBottom: 'none',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 0,
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: COLORS.searchInputText,
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: COLORS.searchInputText,
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: COLORS.searchInputText,
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
    borderRadius: 8,
  },
  spacing: 8,
});
