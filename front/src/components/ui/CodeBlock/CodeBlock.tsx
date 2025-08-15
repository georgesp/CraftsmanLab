import React from 'react';
import { Box } from '@mui/material';
import { COLORS } from '../../../styles/colors';

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
        bgcolor: (t) => (t.palette.mode === 'dark' ? t.palette.grey[900] : t.palette.grey[100]),
        color: (t) => (t.palette.mode === 'dark' ? t.palette.grey[100] : COLORS.grey800),
  borderRadius: '8px',
        overflowX: 'auto',
        maxHeight,
  fontFamily: 'Inter Tight, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
        fontSize: '0.9rem',
        lineHeight: 1.6,
        whiteSpace: 'pre',
      }}
    >
      <code>{code}</code>
    </Box>
  );
};

CodeBlock.displayName = 'CodeBlock';

export default CodeBlock;
