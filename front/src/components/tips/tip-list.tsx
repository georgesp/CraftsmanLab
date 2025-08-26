import React from 'react';
import { List, ListItemButton, ListItemText } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { COLORS } from '../../styles/colors';
import { Link as RouterLink } from 'react-router-dom';
import { tipsList } from './registry';

type Props = {
  selectedSlug?: string;
  onNavigate?: () => void;
  maxItems?: number;
};

export const TipList: React.FC<Props> = ({ selectedSlug, onNavigate, maxItems }) => {
  const { t } = useTranslation('tips');

  // Helper function to get translated text with fallback
  const getTranslatedText = (tipSlug: string, key: string, fallback: string) => {
    const translationKey = `${tipSlug}.${key}`;
    const translated = t(translationKey, { defaultValue: '' });
    return translated || fallback;
  };

  const items = React.useMemo(() => {
    if (maxItems && maxItems > 0) {
      return tipsList.slice(0, maxItems);
    }
    return tipsList;
  }, [maxItems]);

  return (
    <List dense aria-label="tips disponibles">
      {items.map((t) => (
        <ListItemButton
          key={t.slug}
          component={RouterLink}
          to={`/tips/${t.slug}`}
          selected={selectedSlug === t.slug}
          onClick={onNavigate}
          sx={{ mb: 0.5, '&:hover': { backgroundColor: COLORS.itemListHover } }}
        >
          <ListItemText
            primary={getTranslatedText(t.slug, 'title', t.title)}
            primaryTypographyProps={{ sx: { color: COLORS.darkTheme.textPrimary } }}
            secondary={getTranslatedText(t.slug, 'shortDescription', t.shortDescription)}
          />
        </ListItemButton>
      ))}
    </List>
  );
};

TipList.displayName = 'TipList';
