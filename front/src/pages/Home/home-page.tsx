import * as React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { PageLayout } from '../../components';
import { AtelierContainer, IllusBadge } from '../../components/atelier';
import { AtelierTipsGrid } from '../../components/tips/AtelierTipsGrid';
import { AtelierPromptsGrid } from '../../components/prompts/AtelierPromptsGrid';
import { rssSources } from '../../components/news/registry';
import { tipsList } from '../../components/tips/registry';
import { promptsList } from '../../components/prompts/registry';
import { COLORS, TYPOGRAPHY } from '../../styles';

export const HomePage: React.FC = () => {
  const { t, i18n } = useTranslation('pages');
  const lang = i18n.language === 'fr' ? 'fr' : 'en';

  const sourceTitle = (slug: string) => {
    const s = rssSources.find((x) => x.meta.slug === slug);
    const tr = s?.translations[lang] ?? s?.translations.en ?? s?.translations.fr;
    return tr?.title ?? slug;
  };

  const latestNews = React.useMemo(
    () =>
      rssSources
        .flatMap((source) =>
          (source.data?.items ?? []).map((item) => ({ ...item, sourceSlug: source.meta.slug })),
        )
        .sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime())
        .slice(0, 3),
    [],
  );

  const tipsCount = tipsList.length;
  const promptsCount = promptsList.filter((p) => p.slug !== 'more').length;

  const formatDate = (d: string) => {
    try {
      return new Date(d).toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      });
    } catch {
      return d;
    }
  };

  const initials = (name: string) =>
    name.replace(/[^A-Za-zÀ-ÿ ]/g, '').split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]?.toUpperCase()).join('') ||
    name.slice(0, 2).toUpperCase();

  const sectionHeading = (illus: 'code' | 'prompt', title: React.ReactNode, to: string) => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: '18px' }}>
      <IllusBadge name={illus} size={30} />
      <Typography
        component="h2"
        sx={{
          fontFamily: TYPOGRAPHY.fontFamilies.display,
          fontWeight: 700,
          fontSize: '24px',
          letterSpacing: '-0.02em',
          m: 0,
          color: COLORS.atelier.textStrong,
          flex: 1,
        }}
      >
        {title}
      </Typography>
      <Box
        component={RouterLink}
        to={to}
        sx={{
          fontFamily: TYPOGRAPHY.fontFamilies.mono,
          fontSize: '12px',
          color: COLORS.atelier.tips,
          textDecoration: 'none',
        }}
      >
        {t('home.seeAll', { defaultValue: 'voir tout' })} →
      </Box>
    </Box>
  );

  return (
    <PageLayout>
      <AtelierContainer>
        {/* HERO */}
        <Box
          component="section"
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1.05fr 0.95fr' },
            gap: { xs: 4, md: '44px' },
            alignItems: 'center',
            px: { xs: 2.5, md: '46px' },
            py: { xs: 5, md: '60px' },
          }}
        >
          <Box>
            <Box
              sx={{
                fontFamily: TYPOGRAPHY.fontFamilies.mono,
                fontSize: '12px',
                letterSpacing: '.08em',
                color: COLORS.atelier.tips,
                mb: 1.5,
              }}
            >
              {t('home.heroEyebrow', { defaultValue: '// craftsmanlab.fr' })}
            </Box>
            <Typography
              component="h1"
              sx={{
                fontFamily: TYPOGRAPHY.fontFamilies.display,
                fontWeight: 800,
                fontSize: { xs: '36px', md: '52px' },
                letterSpacing: '-0.035em',
                lineHeight: 1.06,
                m: 0,
                color: COLORS.atelier.textStrong,
              }}
            >
              {t('home.heroTitle', { defaultValue: "L'établi du développeur .NET." })}
            </Typography>
            <Typography sx={{ mt: 2, fontSize: '17px', lineHeight: 1.55, color: COLORS.atelier.textBody, maxWidth: 460 }}>
              {t('home.heroBody', { defaultValue: '' })}
            </Typography>

            <Box sx={{ display: 'flex', gap: 1.5, mt: 3, flexWrap: 'wrap' }}>
              <Button component={RouterLink} to="/tips" variant="contained">
                {t('home.ctaTips', { defaultValue: 'Explorer les tips' })}
              </Button>
              <Button component={RouterLink} to="/prompts" variant="outlined">
                {t('home.ctaPrompts', { defaultValue: 'Voir les prompts' })}
              </Button>
            </Box>

            {/* Stats */}
            <Box sx={{ display: 'flex', gap: 3, mt: 4, flexWrap: 'wrap' }}>
              {[
                { illus: 'code' as const, label: `${tipsCount} ${t('home.statTips', { defaultValue: 'tips' })}` },
                { illus: 'prompt' as const, label: `${promptsCount} ${t('home.statPrompts', { defaultValue: 'prompts' })}` },
                { illus: 'book' as const, label: t('home.statWatch', { defaultValue: 'veille hebdo' }) },
              ].map((s) => (
                <Box key={s.label} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <IllusBadge name={s.illus} size={34} />
                  <Box
                    component="span"
                    sx={{ fontFamily: TYPOGRAPHY.fontFamilies.mono, fontSize: '12px', color: COLORS.atelier.textBody }}
                  >
                    {s.label}
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>

          {/* Fenêtre de code */}
          <Box
            sx={{
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 30px 60px -30px rgba(15,20,32,.6)',
              background: COLORS.atelier.codeBg,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                px: 2,
                py: 1.25,
                background: COLORS.atelier.codeHeader,
              }}
            >
              {['#FF5F56', '#FFBD2E', '#27C93F'].map((c) => (
                <Box key={c} sx={{ width: 11, height: 11, borderRadius: '50%', background: c }} />
              ))}
              <Box
                component="span"
                sx={{ ml: 1.5, fontFamily: TYPOGRAPHY.fontFamilies.mono, fontSize: '12px', color: '#8A93A0' }}
              >
                PizzaBuilder.cs
              </Box>
            </Box>
            <Box
              component="pre"
              sx={{
                m: 0,
                p: '20px 22px',
                fontFamily: TYPOGRAPHY.fontFamilies.mono,
                fontSize: '13px',
                lineHeight: 1.7,
                color: COLORS.atelier.codeText,
                overflowX: 'auto',
              }}
            >
              <Box component="span" sx={{ color: COLORS.atelier.codeComment }}>{'// Construction fluide\n'}</Box>
              <Box component="span" sx={{ color: COLORS.atelier.codeKeyword }}>var</Box>
              {' pizza = '}
              <Box component="span" sx={{ color: COLORS.atelier.codeKeyword }}>new</Box>{' '}
              <Box component="span" sx={{ color: COLORS.atelier.codeType }}>PizzaBuilder</Box>
              {'()\n'}
              {'    .WithBase('}
              <Box component="span" sx={{ color: COLORS.atelier.codeType }}>Base</Box>
              {'.Tomate)\n'}
              {'    .AddTopping('}
              <Box component="span" sx={{ color: '#CE9178' }}>&quot;mozzarella&quot;</Box>
              {')\n'}
              {'    .AddTopping('}
              <Box component="span" sx={{ color: '#CE9178' }}>&quot;basilic&quot;</Box>
              {')\n'}
              {'    .Build();'}
            </Box>
          </Box>
        </Box>

        {/* ACTUALITÉS */}
        <Box component="section" sx={{ px: { xs: 2.5, md: '46px' }, pb: 5 }}>
          <Box
            sx={{
              background: COLORS.atelier.surface,
              border: `1px solid ${COLORS.atelier.borderDefault}`,
              borderRadius: '16px',
              p: { xs: 2.5, md: '24px 28px' },
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
              <IllusBadge name="book" size={30} />
              <Box
                component="span"
                sx={{ fontFamily: TYPOGRAPHY.fontFamilies.mono, fontSize: '12px', color: COLORS.atelier.textMuted, flex: 1 }}
              >
                {t('home.sectionNews', { defaultValue: '// actualités' })}
              </Box>
              <Box
                component={RouterLink}
                to="/news"
                sx={{ fontFamily: TYPOGRAPHY.fontFamilies.mono, fontSize: '12px', color: COLORS.atelier.tips, textDecoration: 'none' }}
              >
                {t('home.seeAll', { defaultValue: 'voir tout' })} →
              </Box>
            </Box>

            {latestNews.map((item, idx) => (
              <Box
                key={item.guid || item.link}
                component="a"
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '32px 1fr', md: '44px 1fr 150px' },
                  gap: 2,
                  alignItems: 'center',
                  p: '12px 6px',
                  textDecoration: 'none',
                  borderTop: idx === 0 ? 'none' : `1px solid ${COLORS.atelier.divider}`,
                  borderRadius: '8px',
                  transition: 'background .15s ease',
                  '&:hover': { background: COLORS.atelier.surfaceHover },
                }}
              >
                <Box
                  sx={{
                    width: 44,
                    height: 44,
                    borderRadius: '10px',
                    background: COLORS.atelier.newsBg,
                    color: COLORS.atelier.news,
                    fontFamily: TYPOGRAPHY.fontFamilies.mono,
                    fontSize: '13px',
                    fontWeight: 600,
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {initials(sourceTitle(item.sourceSlug))}
                </Box>
                <Box sx={{ minWidth: 0 }}>
                  <Typography
                    sx={{
                      fontFamily: TYPOGRAPHY.fontFamilies.display,
                      fontWeight: 700,
                      fontSize: '16px',
                      letterSpacing: '-0.01em',
                      color: COLORS.atelier.textStrong,
                      m: 0,
                    }}
                  >
                    {item.title}
                  </Typography>
                  {item.contentSnippet && (
                    <Typography
                      sx={{
                        fontSize: '13px',
                        color: COLORS.atelier.textBodyAlt,
                        mt: '2px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {item.contentSnippet}
                    </Typography>
                  )}
                </Box>
                <Box
                  component="span"
                  sx={{
                    display: { xs: 'none', md: 'block' },
                    textAlign: 'right',
                    fontFamily: TYPOGRAPHY.fontFamilies.mono,
                    fontSize: '11px',
                    color: COLORS.atelier.textMuted,
                  }}
                >
                  {formatDate(item.pubDate)}
                </Box>
              </Box>
            ))}
          </Box>
        </Box>

        {/* TIPS */}
        <Box component="section" sx={{ px: { xs: 2.5, md: '46px' }, pb: 5 }}>
          {sectionHeading('code', t('home.sectionTips', { defaultValue: 'Tips & mémos' }), '/tips')}
          <AtelierTipsGrid items={tipsList.slice(0, 4)} />
        </Box>

        {/* PROMPTS */}
        <Box component="section" sx={{ px: { xs: 2.5, md: '46px' }, pb: '60px' }}>
          {sectionHeading('prompt', t('home.latestPrompts', { defaultValue: 'Derniers prompts' }), '/prompts')}
          <AtelierPromptsGrid items={promptsList.filter((p) => p.slug !== 'more').slice(0, 3)} />
        </Box>
      </AtelierContainer>
    </PageLayout>
  );
};

export default HomePage;
