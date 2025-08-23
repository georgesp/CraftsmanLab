import { styled } from '@mui/material/styles';
import { Box, Card, CardContent } from '@mui/material';
// ...existing code...
import { PAGE_SPACING } from '../../styles/spacing';

export const PromptsPageContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(PAGE_SPACING.container.marginTop),
  marginBottom: theme.spacing(PAGE_SPACING.container.marginBottom),
}));
export const GridContainer = styled(Box)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
}));

export const PromptCard = styled(Card)(() => ({
  height: '100%',
  borderRadius: '12px',
  overflow: 'hidden',
}));
export const PromptCardContent = styled(CardContent)(({ theme }) => ({
  padding: theme.spacing(1.5, 3, 3, 3), // Réduction de 50% du padding top (3 -> 1.5)
  color: theme.palette.text.primary,
}));
