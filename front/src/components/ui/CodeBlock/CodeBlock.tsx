import React from 'react';
import { Box } from '@mui/material';
import { COLORS } from '../../../styles/colors';
import { TYPOGRAPHY } from '../../../styles/typography';

export type CodeBlockProps = {
  code: string;
  ariaLabel?: string;
  maxHeight?: number | string;
};

/**
 * CodeBlock
 * - Reusable preformatted code container
 * - Theme-aware background and text color
 * - Uses COLORS for consistency per global prompt
 */
export const CodeBlock: React.FC<CodeBlockProps> = ({ code, ariaLabel, maxHeight }) => {
  return (
    <Box
      component="pre"
      aria-label={ariaLabel}
      sx={{
        p: 2,
        m: 0,
        bgcolor: (t) => (t.palette.mode === 'dark' ? COLORS.codeBlockTextDark : COLORS.codeBlockTextLight),
        color: (t) => (t.palette.mode === 'dark' ? COLORS.codeBlockTextLight : COLORS.codeBlockTextDark),
  borderRadius: '8px',
        overflowX: 'auto',
        maxHeight,
  fontFamily: TYPOGRAPHY.fontFamily,
        fontSize: TYPOGRAPHY.fontSizes.small,
        lineHeight: TYPOGRAPHY.lineHeights.relaxed,
        whiteSpace: 'pre',
      }}
    >
      <code>{code}</code>
    </Box>
  );
};

CodeBlock.displayName = 'CodeBlock';

export default CodeBlock;
