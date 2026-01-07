import { styled } from '@mui/material/styles';
import { Box, Card, CardContent, Alert, Typography, Button } from '@mui/material';
import { COLORS } from '../../styles/colors';
import { TYPOGRAPHY } from '../../styles/typography';
import { PAGE_SPACING } from '../../styles/spacing';

export const ContactContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(
    PAGE_SPACING.container.paddingTop,
    0,
    PAGE_SPACING.container.paddingBottom,
    0,
  ),
}));

export const HeroSection = styled(Box)(({ theme }) => ({
  textAlign: 'left',
  padding: theme.spacing(
    PAGE_SPACING.hero.paddingTop.xs,
    PAGE_SPACING.hero.paddingX.xs,
    PAGE_SPACING.hero.paddingBottom.xs,
    PAGE_SPACING.hero.paddingX.xs,
  ),
  margin: theme.spacing(PAGE_SPACING.hero.marginTop, 0, PAGE_SPACING.hero.marginBottom, 0),
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(
      PAGE_SPACING.hero.paddingTop.md,
      PAGE_SPACING.hero.paddingX.md,
      PAGE_SPACING.hero.paddingBottom.md,
      PAGE_SPACING.hero.paddingX.md,
    ),
  },
}));

export const HeroSubtitle = styled(Typography)(({ theme }) => ({
  maxWidth: 1100,
  margin: 0,
  [theme.breakpoints.up('md')]: {
    maxWidth: 1100,
  },
}));

export const SuccessAlert = styled(Alert)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  '& .MuiAlert-message': {
    fontSize: TYPOGRAPHY.fontSizes.body1,
  },
}));

export const ContactCard = styled(Card)(({ theme }) => ({
  boxShadow: theme.shadows[3],
}));

export const ContactCardContent = styled(CardContent)(({ theme }) => ({
  padding: theme.spacing(3),
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(5),
  },
}));

export const SectionHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(3),
}));

export const SectionDescription = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

export const SubmitButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1.5, 4),
  background: `${COLORS.submitBtnColor} !important`,
  color: COLORS.darkTheme.textOnDark,
  fontWeight: 600,
  textTransform: 'none',
  transition: 'background-color 200ms ease, transform 120ms ease',
  '&:hover': {
    background: `${COLORS.submitBtnColorHover} !important`,
  },
  // Ensure the start icon inside the button uses the defaultBg color
  '& .MuiButton-startIcon': {
    color: COLORS.defaultBg,
    // svg icons inside MUI buttons often inherit 'color'
    '& svg': {
      color: 'inherit',
    },
  },
}));

export const InfoCard = styled(Card)(() => ({}));

export const InfoCardContent = styled(CardContent)(({ theme }) => ({
  padding: theme.spacing(4),
}));

export const InfoTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

export const InfoSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

export const InfoItemHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
}));

export const InfoItemDescription = styled(Typography)(({ theme }) => ({
  marginLeft: theme.spacing(4),
}));
