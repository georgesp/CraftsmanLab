import React from 'react';
import { List, ListItemButton, ListItemText } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { promptsList } from './registry';

type Props = {
  selectedSlug?: string;
  onNavigate?: () => void;
  maxItems?: number;
};

export const PromptList: React.FC<Props> = ({ selectedSlug, onNavigate, maxItems }) => {
  const items = (() => {
    if (maxItems && maxItems > 0) {
      // Exclude placeholder "more" from the limited list
      const filtered = promptsList.filter(p => p.slug !== 'more');
      return filtered.slice(0, maxItems);
    }
    return promptsList;
  })();
  return (
    <List dense aria-label="prompts disponibles">
      {items.map(p => (
        p.slug === 'more'
          ? (
            <ListItemButton
              key={p.slug}
              sx={{ borderRadius: 1, mb: 0.5, cursor: 'default' }}
              disableRipple
              tabIndex={-1}
            >
              <ListItemText primary={p.title} secondary={p.shortDescription} />
            </ListItemButton>
          )
          : (
            <ListItemButton
              key={p.slug}
              component={RouterLink}
              to={`/prompts/${p.slug}`}
              selected={selectedSlug === p.slug}
              onClick={onNavigate}
              sx={{ borderRadius: 1, mb: 0.5 }}
            >
              <ListItemText primary={p.title} secondary={p.shortDescription} />
            </ListItemButton>
          )
      ))}
    </List>
  );
};

PromptList.displayName = 'PromptList';
