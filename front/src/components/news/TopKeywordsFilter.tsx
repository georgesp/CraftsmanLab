import React from 'react';
import { Box, Typography, Chip } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { COLORS } from '../../styles/colors';

export interface KeywordInfo {
  keyword: string;
  count: number;
}

interface TopKeywordsFilterProps {
  keywords: KeywordInfo[];
  selectedKeywords: string[];
  onKeywordClick: (keyword: string) => void;
  title?: string;
  fullHeight?: boolean;
}

export const TopKeywordsFilter: React.FC<TopKeywordsFilterProps> = ({
  keywords,
  selectedKeywords,
  onKeywordClick,
  title,
  fullHeight = false,
}) => {
  const { t } = useTranslation('pages');

  return (
    <Box
      sx={{
        backgroundColor: COLORS.cardBgDark,
        border: `1px solid ${COLORS.cardBorder}`,
        borderRadius: 1,
        p: 2,
        ...(fullHeight && { height: '100%' }),
      }}
    >
      <Typography
        variant="h6"
        sx={{
          mb: 2,
          fontSize: '1rem',
          fontWeight: 600,
          color: 'text.primary',
        }}
      >
        {title || t('home.mostUsedTags', { defaultValue: 'Tags les plus utilisés' })}
      </Typography>
      
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 1,
        }}
      >
        {keywords.map((keywordInfo) => {
          const isSelected = selectedKeywords.includes(keywordInfo.keyword);
          return (
            <Chip
              key={keywordInfo.keyword}
              label={`${keywordInfo.keyword} (${keywordInfo.count})`}
              onClick={() => onKeywordClick(keywordInfo.keyword)}
              size="small"
              sx={{
                backgroundColor: isSelected ? COLORS.categorySelectedBg : COLORS.darkTheme.background,
                color: isSelected ? 'primary.main' : 'text.primary',
                borderColor: isSelected ? 'primary.main' : COLORS.cardBorder,
                border: '1px solid',
                '&:hover': {
                  backgroundColor: isSelected 
                    ? COLORS.categoryChipHover
                    : COLORS.categoryChipHover,
                  borderColor: 'primary.main',
                },
                fontSize: '0.75rem',
                height: 28,
              }}
            />
          );
        })}
      </Box>
    </Box>
  );
};
