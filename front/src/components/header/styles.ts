import { styled } from '@mui/material/styles';
import { AppBar, Toolbar, Box, Link } from '@mui/material';

export const StyledAppBar = styled(AppBar)({
  width: '100%',
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
}));

export const NavigationLink = styled(Link)(({ theme }) => ({
  fontWeight: 500,
  fontSize: '1.05rem',
  '&:hover': {
    color: theme.palette.primary.main,
  },
}));
