import React from 'react';
import { List, ListItemButton, ListItemText, type SxProps, type Theme } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { tipsList } from './registry';
import { COLORS } from '../../styles/colors';

type Props = {
  currentSlug: string;
  maxItems?: number;
  listSx?: SxProps<Theme>;
};

export const RelatedTipsList: React.FC<Props> = ({ currentSlug, maxItems = 7, listSx }) => {
  const { t } = useTranslation('tips');

  const normalize = (arr?: string[]) => (arr ?? []).map((s) => s.toLowerCase().trim()).filter(Boolean);
  const uniq = (arr: string[]) => Array.from(new Set(arr));
  const allSearchKeywords = (tipSlug: string) => {
    const tip = tipsList.find((x) => x.slug === tipSlug);
    const fr = tip?.metadata?.searchKeywords?.fr ?? [];
    const en = tip?.metadata?.searchKeywords?.en ?? [];
    return uniq(normalize([...fr, ...en]));
  };

  const courant = React.useMemo(() => new Set(allSearchKeywords(currentSlug)), [currentSlug]);

  const items = React.useMemo(() => {
  const scored = tipsList
      .filter((tip) => tip.slug !== currentSlug)
      .map((tip) => {
    const autres = allSearchKeywords(tip.slug);
    const communs = autres.filter((k) => courant.has(k));
        return { tip, score: communs.length };
      })
      .filter((x) => x.score > 0)
      .sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        // tie-breakers: newest first, then title
        const dateCmp = (b.tip.writtenOn ?? '').localeCompare(a.tip.writtenOn ?? '');
        if (dateCmp !== 0) return dateCmp;
        return a.tip.title.localeCompare(b.tip.title);
      })
      .map((x) => x.tip);

    return scored.slice(0, Math.max(0, maxItems));
  }, [courant, currentSlug, maxItems]);

  // Helper to fetch translated fields with fallback to meta
  const getTranslatedText = (tipSlug: string, key: string, fallback: string) => {
    const translationKey = `${tipSlug}.${key}`;
    const translated = t(translationKey, { defaultValue: '' });
    return translated || fallback;
  };

  if (items.length === 0) return null;

  return (
    <List dense aria-label="tips similaires" sx={listSx}>
      {items.map((t) => (
        <ListItemButton
          key={t.slug}
          component={RouterLink}
          to={`/tips/${t.slug}`}
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

RelatedTipsList.displayName = 'RelatedTipsList';
