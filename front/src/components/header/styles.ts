import { styled } from '@mui/material/styles';
import { AppBar, Toolbar, Box } from '@mui/material';
import { COLORS, TYPOGRAPHY } from '../../styles';

export const StyledAppBar = styled(AppBar)({
  width: '100%',
  backgroundColor: COLORS.atelier.surface,
  color: COLORS.atelier.textStrong,
  borderBottom: `1px solid ${COLORS.atelier.borderDefault}`,
  boxShadow: 'none',
});

export const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  justifyContent: 'space-between',
  // Allow items to wrap to new lines on small screens
  flexWrap: 'wrap',
  gap: theme.spacing(1),
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
  minHeight: 56,
  [theme.breakpoints.up('sm')]: {
    minHeight: 64,
  },
}));

// Navigation en JetBrains Mono, minuscules — l'item actif est coloré par
// la rubrique (voir Header.tsx qui applique la couleur active via `sx`).
export const NavigationContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2.5),
  alignItems: 'center',
  '& a': {
    color: COLORS.atelier.textBody,
    fontFamily: TYPOGRAPHY.fontFamilies.mono,
    fontSize: '13px',
    textTransform: 'lowercase',
    letterSpacing: '.02em',
    textDecoration: 'none',
    transition: 'color .15s ease',
    '&:hover': {
      color: COLORS.atelier.textStrong,
    },
  },
  // On small screens put navigation on its own line and align to the right
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    justifyContent: 'flex-end',
    gap: theme.spacing(2),
    order: 3,
  },
}));
