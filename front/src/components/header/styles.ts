import { styled } from '@mui/material/styles';
import { AppBar, Toolbar, Box, Link } from '@mui/material';
import { COLORS } from '../../utils/colors';

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

export const LogoLink = styled(Link)({
  display: 'flex',
  alignItems: 'center',
});

export const LogoImage = styled(Box)({
  height: 56,
  width: 'auto',
  objectFit: 'contain',
  display: 'block',
  flexShrink: 0,
});

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

export const NavigationLink = styled(Link)(({ theme }) => ({
  fontWeight: 500,
  fontSize: '1.05rem',
  color: '#FFFFFF',
  '&:hover': {
    color: theme.palette.primary.light,
  },
}));
