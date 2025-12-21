import React, { PropsWithChildren } from 'react';
import { Box } from '@mui/material';
import { TYPOGRAPHY } from '../../../styles';

/**
 * TipContent
 * - Wrapper to standardize spacing and typography for tip pages
 * - Ensures consistent margins for titles, subtitles, paragraphs, and lists
 */
export const TipContent: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Box
      sx={{
        // Main title
        '& .MuiTypography-h3': {
          marginTop: 0,
          marginBottom: 2,
          fontWeight: TYPOGRAPHY.fontWeights.bold,
        },
        // Section titles
        '& .MuiTypography-h4': {
          marginTop: 3,
          marginBottom: 1.5,
          fontWeight: TYPOGRAPHY.fontWeights.bold,
        },
        // Subsection titles
        '& .MuiTypography-h5': (theme) => ({
          marginTop: 2.5,
          marginBottom: 1,
          fontWeight: TYPOGRAPHY.fontWeights.bold,
          color: theme.palette.text.primary,
          paddingLeft: theme.spacing(1),
          borderLeft: `3px solid ${theme.palette.primary.light}`,
        }),
        '& .MuiTypography-h6': {
          marginTop: 2,
          marginBottom: 1,
          fontWeight: TYPOGRAPHY.fontWeights.bold,
        },
        // Subtitle / caption adjustments
        '& .MuiTypography-subtitle1': {
          marginBottom: 1.5,
        },
        // Paragraphs
        '& p.MuiTypography-root': {
          marginBottom: 2,
        },
        // Lists
        '& ul': {
          paddingLeft: 3,
          marginTop: 1,
          marginBottom: 1.5,
        },
      }}
    >
      {children}
    </Box>
  );
};

TipContent.displayName = 'TipContent';

export default TipContent;
