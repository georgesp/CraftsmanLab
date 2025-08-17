import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import { TYPOGRAPHY } from '../../styles/typography';

// Kept CodeBlock below; other styled helpers removed as they were not referenced

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
