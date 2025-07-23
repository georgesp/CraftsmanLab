import { styled } from '@mui/material/styles';
import { Box, Card } from '@mui/material';

export const ContactContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4, 0),
}));

export const ContactCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.spacing(2),
  boxShadow: theme.shadows[2],
}));

export const InfoCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.spacing(2),
  boxShadow: theme.shadows[2],
  height: 'fit-content',
}));
