import React from 'react';
import { List, ListItemButton, ListItemText } from '@mui/material';
import { COLORS } from '../../styles/colors';
import { Link as RouterLink } from 'react-router-dom';
import { tipsList } from './registry';

type Props = {
  selectedSlug?: string;
  onNavigate?: () => void;
  maxItems?: number;
};

export const TipList: React.FC<Props> = ({ selectedSlug, onNavigate, maxItems }) => {
  const items = React.useMemo(() => {
    if (maxItems && maxItems > 0) {
      return tipsList.slice(0, maxItems);
    }
    return tipsList;
  }, [maxItems]);

  return (
    <List dense aria-label="tips disponibles">
      {items.map(t => (
        <ListItemButton
          key={t.slug}
          component={RouterLink}
          to={`/tips/${t.slug}`}
          selected={selectedSlug === t.slug}
          onClick={onNavigate}
          sx={{ mb: 0.5, '&:hover': { backgroundColor: COLORS.itemListHover } }}
        >
          <ListItemText primary={t.title} secondary={t.shortDescription} />
        </ListItemButton>
      ))}
    </List>
  );
};

TipList.displayName = 'TipList';
