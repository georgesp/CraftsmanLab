import { createTheme } from '@mui/material/styles';
import { COLORS } from '../styles/colors';
import { TYPOGRAPHY } from '../styles/typography';
import { SHADOWS } from '../styles/shadows';

// Constante centralisée pour tous les border-radius du site
// Refonte « Atelier adouci » : angles doux (le carré strict est abandonné)
export const BORDER_RADIUS = {
  none: 0,
  filter: 9,         // Lignes de filtre / facettes
  input: 10,         // Inputs / boutons
  card: 12,          // Cartes
  panel: 16,         // Grands panneaux / encadrés
  pill: 999,         // Chip langue, pastille dispo
  // Alias historiques conservés pour compat
  small: 9,
  medium: 12,
  large: 16,
  circle: '50%',
};

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
      default: COLORS.atelier.pageBg,
      paper: COLORS.atelier.surface,
    },
    divider: COLORS.atelier.borderDefault,
    text: {
      primary: COLORS.textPrimary,
      secondary: COLORS.textSecondary,
    },
    grey: COLORS.grey,
  },
  typography: {
    fontFamily: TYPOGRAPHY.fontFamily,
    h1: {
      fontFamily: TYPOGRAPHY.fontFamilies.display,
      fontSize: TYPOGRAPHY.fontSizes.h1,
      fontWeight: TYPOGRAPHY.fontWeights.bold,
      lineHeight: TYPOGRAPHY.lineHeights.tight,
      letterSpacing: TYPOGRAPHY.atelier.trackingTight,
      color: COLORS.atelier.textStrong,
    },
    h2: {
      fontFamily: TYPOGRAPHY.fontFamilies.display,
      fontSize: TYPOGRAPHY.fontSizes.h2,
      fontWeight: TYPOGRAPHY.fontWeights.bold,
      lineHeight: TYPOGRAPHY.lineHeights.normal,
      letterSpacing: TYPOGRAPHY.atelier.tracking,
      color: COLORS.atelier.textStrong,
    },
    h3: {
      fontFamily: TYPOGRAPHY.fontFamilies.display,
      fontSize: TYPOGRAPHY.fontSizes.h3,
      fontWeight: TYPOGRAPHY.fontWeights.bold,
      lineHeight: TYPOGRAPHY.lineHeights.normal,
      letterSpacing: TYPOGRAPHY.atelier.tracking,
      color: COLORS.atelier.textStrong,
    },
    h4: {
      fontFamily: TYPOGRAPHY.fontFamilies.display,
      fontSize: TYPOGRAPHY.fontSizes.h4,
      fontWeight: TYPOGRAPHY.fontWeights.bold,
      lineHeight: TYPOGRAPHY.lineHeights.normal,
      color: COLORS.atelier.textStrong,
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
          borderRadius: BORDER_RADIUS.input,
          padding: '10px 20px',
          fontSize: TYPOGRAPHY.fontSizes.button,
          fontWeight: TYPOGRAPHY.fontWeights.semiBold,
          textTransform: 'none',
          boxShadow: SHADOWS.none,
          transition: 'background .15s ease, box-shadow .15s ease',
          '&:hover': {
            boxShadow: SHADOWS.button,
          },
        },
        contained: {
          background: COLORS.atelier.tips,
          color: COLORS.white,
          '&:hover': {
            background: COLORS.atelier.tipsHover,
          },
        },
        outlined: {
          borderWidth: '1px',
          borderColor: COLORS.atelier.borderDefault,
          backgroundColor: COLORS.atelier.surface,
          color: COLORS.atelier.textBody,
          '&:hover': {
            borderWidth: '1px',
            borderColor: COLORS.atelier.tips,
            backgroundColor: COLORS.atelier.surface,
          },
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: COLORS.atelier.pageBg,
          margin: 0,
          padding: 0,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: BORDER_RADIUS.card,
          boxShadow: 'none',
          border: `1px solid ${COLORS.atelier.borderDefault}`,
          background: COLORS.atelier.surface,
          transition: 'box-shadow .2s ease, transform .2s ease',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        rounded: {
          borderRadius: BORDER_RADIUS.card,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: COLORS.atelier.surface,
          color: COLORS.atelier.textStrong,
          boxShadow: 'none',
          borderBottom: `1px solid ${COLORS.atelier.borderDefault}`,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: BORDER_RADIUS.input,
            backgroundColor: '#FBFCFD',
            transition: 'border-color .15s ease, box-shadow .15s ease, background .15s ease',
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: COLORS.atelier.borderDefault,
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: COLORS.atelier.textFaint,
            },
            '&.Mui-focused': {
              backgroundColor: COLORS.atelier.surface,
              boxShadow: '0 0 0 3px rgba(25,118,210,.12)',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: COLORS.atelier.tips,
              borderWidth: '1px',
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: BORDER_RADIUS.pill,
          fontWeight: TYPOGRAPHY.fontWeights.medium,
          fontSize: TYPOGRAPHY.fontSizes.caption,
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: BORDER_RADIUS.panel,
        },
      },
    },
  },
  shape: {
    borderRadius: BORDER_RADIUS.card,
  },
  spacing: 8,
});
