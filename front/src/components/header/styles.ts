import { styled } from '@mui/material/styles';
import { AppBar, Toolbar, Box } from '@mui/material';
import { COLORS, TYPOGRAPHY } from '../../styles';

export const StyledAppBar = styled(AppBar)({
  width: '100%',
  backgroundColor: COLORS.darkGreyBg,
  color: COLORS.white,
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
export const NavigationContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(3),
  alignItems: 'center',
  '& a': {
    color: COLORS.white,
    fontSize: TYPOGRAPHY.fontSizes.nav,
    textDecoration: 'none',
    '&:hover': {
      color: theme.palette.primary.light,
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
