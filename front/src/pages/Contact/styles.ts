import { styled } from '@mui/material/styles';
import { Box, Card, CardContent, Alert, Typography, Button } from '@mui/material';

export const ContactContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4, 0),
}));

export const HeroSection = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(6, 0),
  background: 'linear-gradient(135deg, rgba(255, 99, 88, 0.05) 0%, rgba(64, 224, 208, 0.05) 100%)',
  borderRadius: theme.spacing(4),
  margin: theme.spacing(4, 0),
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(8, 0),
  },
}));

export const HeroSubtitle = styled(Typography)({
  maxWidth: 600,
  margin: '0 auto',
});

export const SuccessAlert = styled(Alert)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  borderRadius: theme.spacing(2),
  '& .MuiAlert-message': {
    fontSize: '1rem',
  },
}));

export const ContactCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.spacing(3),
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
}));

export const InfoCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.spacing(3),
}));

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

export const HoursCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.spacing(3),
  background: 'linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%)',
}));

export const HoursCardContent = styled(CardContent)(({ theme }) => ({
  padding: theme.spacing(4),
}));

export const HoursHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(3),
}));

export const HoursContent = styled(Box)(({ theme }) => ({
  '& > *': {
    marginBottom: theme.spacing(1),
  },
}));

export const CTASection = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(6, 0),
  background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.05) 0%, rgba(156, 39, 176, 0.05) 100%)',
  borderRadius: theme.spacing(4),
  margin: theme.spacing(6, 0),
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(8, 0),
  },
}));

export const CTASubtitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  maxWidth: 600,
  margin: `0 auto ${theme.spacing(4)}px auto`,
}));

export const CTAButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1.5, 4),
  marginRight: theme.spacing(2),
}));

export const CTAButtonSecondary = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1.5, 4),
}));
