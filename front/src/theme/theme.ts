import { createTheme } from '@mui/material/styles';
import { PRIMARY_BLUE, PRIMARY_BLUE_LIGHT, PRIMARY_BLUE_DARK } from '../styles/colors';
import { COLORS } from '../utils/colors';

export const telerikTheme = createTheme({
  palette: {
    primary: {
      main: PRIMARY_BLUE,
      light: PRIMARY_BLUE_LIGHT,
      dark: PRIMARY_BLUE_DARK,
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
  fontFamily: 'Inter Tight, "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif',
    h1: {
      fontSize: '3rem',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
      color: '#2d3748',
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 600,
      lineHeight: 1.3,
      letterSpacing: '-0.01em',
      color: '#2d3748',
    },
    h3: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.4,
      color: '#2d3748',
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.4,
      color: '#2d3748',
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
      lineHeight: 1.5,
      color: '#4a5568',
    },
    h6: {
      fontSize: '1.125rem',
      fontWeight: 500,
      lineHeight: 1.5,
      color: '#4a5568',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
      color: '#4a5568',
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
      color: '#718096',
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
      fontSize: '1rem',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          padding: '12px 24px',
          fontSize: '1rem',
          fontWeight: 600,
          textTransform: 'none',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          },
        },
        contained: {
          background: 'linear-gradient(135deg, #1976d2 0%, #63a4ff 100%)',
          color: '#fff',
          '&:hover': {
            background: 'linear-gradient(135deg, #115293 0%, #1976d2 100%)',
          },
        },
        outlined: {
          borderWidth: '2px',
          borderColor: '#1976d2',
          '&:hover': {
            borderWidth: '2px',
            borderColor: '#115293',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
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
            borderRadius: '8px',
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
          borderRadius: '8px',
          fontWeight: 500,
          fontSize: '0.875rem',
        },
      },
    },
  },
  shape: {
  borderRadius: 8,
  },
  spacing: 8,
});
