import React, { PropsWithChildren } from 'react';
import { Box } from '@mui/material';

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
          fontWeight: 700,
        },
        // Section titles
        '& .MuiTypography-h4': {
          marginTop: 3,
          marginBottom: 1.5,
          fontWeight: 700,
        },
        // Subsection titles
        '& .MuiTypography-h5': {
          marginTop: 2.5,
          marginBottom: 1,
          fontWeight: 700,
        },
        '& .MuiTypography-h6': {
          marginTop: 2,
          marginBottom: 1,
          fontWeight: 700,
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
