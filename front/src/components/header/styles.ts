import { styled } from '@mui/material/styles';
import { AppBar, Toolbar, Box } from '@mui/material';
import { COLORS } from '../../styles/colors';

export const StyledAppBar = styled(AppBar)({
  width: '100%',
  backgroundColor: COLORS.darkGreyBg,
  color: '#FFFFFF',
});

export const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  justifyContent: 'space-between',
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
  '& a': {
    color: '#FFFFFF',
    textDecoration: 'none',
    '&:hover': {
      color: theme.palette.primary.light,
    },
  },
}));
