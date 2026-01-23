import React from 'react';
import { Box, Typography, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Language as LanguageIcon } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { COLORS } from '../../styles/colors';

export interface SourceInfo {
  slug: string;
  name: string;
  articleCount: number;
}

interface TopSourcesFilterProps {
  sources: SourceInfo[];
  selectedSource: string | null;
  onSourceClick: (slug: string | null) => void;
}

export const TopSourcesFilter: React.FC<TopSourcesFilterProps> = ({
  sources,
  selectedSource,
  onSourceClick,
}) => {
  const { t } = useTranslation('pages');

  return (
    <Box
      sx={{
        backgroundColor: COLORS.cardBgDark,
        border: `1px solid ${COLORS.cardBorder}`,
        borderRadius: 1,
        p: 2,
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
        {t('home.recommendedSources', { defaultValue: 'Sources recommandées' })}
      </Typography>
      
      <List sx={{ p: 0 }}>
        {sources.map((source) => (
          <ListItem
            key={source.slug}
            disablePadding
            sx={{ mb: 0.5 }}
          >
            <ListItemButton
              selected={selectedSource === source.slug}
              onClick={() => onSourceClick(selectedSource === source.slug ? null : source.slug)}
              sx={{
                borderRadius: 1,
                py: 1,
                px: 1.5,
                '&.Mui-selected': {
                  backgroundColor: COLORS.categorySelectedBg,
                  '&:hover': {
                    backgroundColor: COLORS.categoryChipHover,
                  },
                },
                '&:hover': {
                  backgroundColor: COLORS.categoryChipHover,
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 36 }}>
                <LanguageIcon sx={{ color: 'primary.main', fontSize: 20 }} />
              </ListItemIcon>
              <ListItemText
                primary={source.name}
                secondary={`${source.articleCount} ${t('home.articles', { defaultValue: 'articles' })}`}
                primaryTypographyProps={{
                  fontSize: '0.875rem',
                  fontWeight: 500,
                }}
                secondaryTypographyProps={{
                  fontSize: '0.75rem',
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
