import React from 'react';
import { Box } from '@mui/material';
import { COLORS } from '../../../styles/colors';
import { TYPOGRAPHY } from '../../../styles/typography';
import { SyntaxHighlighter } from './SyntaxHighlighter';

export type CodeBlockProps = {
  code: string;
  ariaLabel?: string;
  maxHeight?: number | string;
  language?:
    | 'csharp'
    | 'javascript'
    | 'typescript'
    | 'json'
    | 'xml'
    | 'html'
    | 'css'
    | 'bash'
    | 'sql';
};

/**
 * CodeBlock
 * - Reusable preformatted code container
 * - Theme-aware background and text color
 * - Uses COLORS for consistency per global prompt
 * - Avec coloration syntaxique
 */
export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  ariaLabel,
  maxHeight,
  language = 'csharp',
}) => {
  return (
    <Box
      component="pre"
      aria-label={ariaLabel}
      sx={{
        p: 2,
        m: 0,
        bgcolor: (t) =>
          t.palette.mode === 'dark' ? COLORS.codeBlockTextDark : COLORS.codeBlockTextLight,
        borderRadius: '8px',
        overflowX: 'auto',
        maxHeight,
        fontFamily: TYPOGRAPHY.fontFamily,
        fontSize: TYPOGRAPHY.fontSizes.small,
        lineHeight: TYPOGRAPHY.lineHeights.relaxed,
        whiteSpace: 'pre',
      }}
    >
      <code>
        <SyntaxHighlighter code={code} language={language} />
      </code>
    </Box>
  );
};

CodeBlock.displayName = 'CodeBlock';

export default CodeBlock;
