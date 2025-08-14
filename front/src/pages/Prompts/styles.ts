import { styled } from '@mui/material/styles';
import { Box, Typography, Card, CardActionArea, CardContent } from '@mui/material';

export const PromptsPageContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(6),
  marginBottom: theme.spacing(4),
}));

export const ExplanationBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.grey[100],
  border: `1px solid ${theme.palette.grey[200]}`,
  borderRadius: '12px',
  padding: theme.spacing(3),
  marginBottom: theme.spacing(4),
  fontSize: '1.08rem',
  color: theme.palette.text.secondary,
  boxShadow: theme.shadows[1],
  width: '100%',
  maxWidth: '100%',
}));

export const ExplanationTitle = styled(Typography)({
  fontWeight: 600,
});

export const GridContainer = styled(Box)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
}));

export const PromptCard = styled(Card)(() => ({
  height: '100%',
  borderRadius: '12px',
  overflow: 'hidden',
}));

export const PromptCardActionArea = styled(CardActionArea)({
  height: '100%',
});

export const PromptCardContent = styled(CardContent)(({ theme }) => ({
  padding: theme.spacing(3),
}));
