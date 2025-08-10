import React from 'react';
import { List, ListItemButton, ListItemText } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { promptsList } from './registry';

type Props = {
  selectedSlug?: string;
  onNavigate?: () => void;
};

export const PromptList: React.FC<Props> = ({ selectedSlug, onNavigate }) => {
  return (
    <List dense aria-label="prompts disponibles">
      {promptsList.map(p => (
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
