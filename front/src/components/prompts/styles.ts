import { styled } from '@mui/material/styles';
import { Box, Typography, Paper, Button, List, ListItemButton } from '@mui/material';
import { TYPOGRAPHY } from '../../styles/typography';
import { PAGE_SPACING } from '../../styles/spacing';

export const DetailContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(PAGE_SPACING.detail.paddingY.xs, 0),
  margin: theme.spacing(PAGE_SPACING.detail.marginY, 0),
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(PAGE_SPACING.detail.paddingY.md, 0),
  },
}));

export const DetailTitle = styled(Typography)({
  marginBottom: 'var(--spacing-2)',
});

export const DetailSubtitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

export const CopyButtonContainer = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

export const CopyButton = styled(Button)({
  // Styled button for copy action
});

export const SidebarPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  position: 'sticky',
  top: 24,
}));

export const SidebarTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

export const PromptsList = styled(List)({
  // Dense list styling handled in component
});

export const PromptsListItem = styled(ListItemButton)(({ theme }) => ({
  marginBottom: theme.spacing(0.5),
}));

export const CodeBlock = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.grey[100],
  padding: theme.spacing(2),
  borderRadius: '8px',
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-word',
  overflowWrap: 'break-word',
  fontFamily: TYPOGRAPHY.fontFamily,
  fontSize: TYPOGRAPHY.fontSizes.small,
  border: '1px solid',
  borderColor: theme.palette.grey[200],
}));
