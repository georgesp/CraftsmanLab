import { useMemo, useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { PageLayout, ScrollToTopButton } from '../../components';
import {
  AtelierContainer,
  SectionTitleBand,
  SearchField,
  Facets,
} from '../../components/atelier';
import type { FacetGroup } from '../../components/atelier';
import { AtelierTipsGrid } from '../../components/tips/AtelierTipsGrid';
import { COLORS, TYPOGRAPHY } from '../../styles';
import { tipsList } from '../../components/tips/registry';

export const TipsPage: React.FC = () => {
  const { t } = useTranslation('pages');
  const [searchParams] = useSearchParams();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string>('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const tagsParam = searchParams.get('tags');
    if (tagsParam) {
      const tags = tagsParam.split(',').map((tag) => tag.trim()).filter(Boolean);
      setSelectedCategories(tags);
    }
  }, [searchParams]);

  // Tips filtrés par les catégories sélectionnées (ET logique).
  const filtered = useMemo(() => {
    if (selectedCategories.length === 0) return tipsList;
    const selectedSet = new Set(selectedCategories);
    return tipsList.filter((tip) => {
      const categories = tip.categories ?? [];
      return Array.from(selectedSet).every((c) => categories.includes(c));
    });
  }, [selectedCategories]);

  // Compte des occurrences par catégorie sur les tips filtrés.
  const categoryOccurrences = useMemo(() => {
    const occ: Record<string, number> = {};
    filtered.forEach((tip) => {
      (tip.categories || []).forEach((c) => {
        const n = c.trim();
        if (n) occ[n] = (occ[n] || 0) + 1;
      });
    });
    return occ;
  }, [filtered]);

  // Liste des catégories (triées par occurrence puis alpha), filtrées par recherche.
  const facetGroups = useMemo<FacetGroup[]>(() => {
    const all = Array.from(
      new Set(filtered.flatMap((tip) => (tip.categories ?? []).map((s) => s.trim()).filter(Boolean))),
    ).sort((a, b) => {
      const diff = (categoryOccurrences[b] || 0) - (categoryOccurrences[a] || 0);
      return diff !== 0 ? diff : a.localeCompare(b);
    });
    const q = categoryFilter.trim().toLowerCase();
    const visible = q ? all.filter((c) => c.toLowerCase().includes(q)) : all;
    return [
      {
        group: t('tips.categoriesGroup', { defaultValue: 'Catégories' }),
        items: visible.map((c) => ({ label: c, count: categoryOccurrences[c] || 0 })),
      },
    ];
  }, [filtered, categoryOccurrences, categoryFilter, t]);

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    );
  };

  return (
    <PageLayout>
      <AtelierContainer>
        <SectionTitleBand
          illus="code"
          title={t('tips.bandTitle', { defaultValue: 'Tips & mémos' })}
          subtitle={t('tips.subtitle', { defaultValue: '' })}
        />

        <Box
          component="section"
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '270px 1fr' },
            gap: '28px',
            px: { xs: 2.5, md: '46px' },
            pt: '26px',
            pb: '60px',
            alignItems: 'start',
          }}
        >
          {/* Sidebar sticky */}
          <Box
            component="aside"
            sx={{
              position: { md: 'sticky' },
              top: 88,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            <SearchField
              value={categoryFilter}
              onChange={setCategoryFilter}
              placeholder={t('tips.searchPlaceholder', { defaultValue: 'rechercher un tip…' })}
            />

            <Facets
              groups={facetGroups}
              accent={COLORS.atelier.tips}
              accentBg={COLORS.atelier.tipsBg}
              selected={selectedCategories}
              onToggle={toggleCategory}
            />

            <Box
              sx={{
                background: COLORS.atelier.tipsBg,
                border: `1px solid ${COLORS.atelier.tipsBorder}`,
                borderRadius: '12px',
                p: '16px 18px',
              }}
            >
              <Box
                sx={{
                  fontFamily: TYPOGRAPHY.fontFamilies.mono,
                  fontSize: '11px',
                  letterSpacing: '.08em',
                  textTransform: 'uppercase',
                  color: COLORS.atelier.tips,
                  mb: '6px',
                }}
              >
                {t('tips.noteTitle', { defaultValue: 'À noter' })}
              </Box>
              <Typography sx={{ m: 0, fontSize: '13px', lineHeight: 1.55, color: COLORS.atelier.textBody }}>
                {t('tips.noteBody', { defaultValue: '' })}
              </Typography>
            </Box>
          </Box>

          {/* Colonne résultats */}
          <Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'baseline',
                justifyContent: 'space-between',
                mb: '18px',
              }}
            >
              <Box
                component="span"
                sx={{ fontFamily: TYPOGRAPHY.fontFamilies.mono, fontSize: '12.5px', color: COLORS.atelier.textBody }}
              >
                <b style={{ color: COLORS.atelier.textStrong }}>{filtered.length}</b>{' '}
                {t('tips.results', { defaultValue: 'résultats' })}
              </Box>
              <Box
                component="span"
                sx={{
                  fontFamily: TYPOGRAPHY.fontFamilies.mono,
                  fontSize: '12.5px',
                  color: COLORS.atelier.textBody,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '2px',
                }}
              >
                {t('tips.sortRecent', { defaultValue: 'tri : récents' })}
                <ExpandMoreIcon sx={{ fontSize: 15 }} />
              </Box>
            </Box>

            <AtelierTipsGrid items={filtered} />
          </Box>
        </Box>
      </AtelierContainer>
      <ScrollToTopButton />
    </PageLayout>
  );
};

export default TipsPage;
