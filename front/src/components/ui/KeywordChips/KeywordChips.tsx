import React from 'react';
import { Box, Chip } from '@mui/material';
import type { Keyword } from '../../../utils/constants';

type Props = {
  keywords: Keyword[];
  size?: 'small' | 'medium';
};

export const KeywordChips: React.FC<Props> = ({
  keywords,
  size = 'small',
}) => {
  if (!keywords.length) return null;

  return (
    <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
      {keywords.map((keyword) => (
        <Chip
          key={keyword}
          label={keyword}
          size={size}
          variant="outlined"
          sx={{
            height: 20,
            fontSize: '0.65rem',
            borderColor: 'primary.main',
            color: 'primary.main',
          }}
        />
      ))}
    </Box>
  );
};

KeywordChips.displayName = 'KeywordChips';
