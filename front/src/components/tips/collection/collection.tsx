import React from 'react';
import { useTranslation } from 'react-i18next';
import type { TipModule } from '..';
import { Box, Typography, Link } from '@mui/material';
import { meta } from './meta';
import { TipContent } from '../../ui';

const CollectionTip: React.FC = () => {
  const { t } = useTranslation('tips');

  const sections: { key: string; anchor: string }[] = [
    { key: 'ienumerable', anchor: 'ienumerable' },
    { key: 'icollection', anchor: 'icollection' },
    { key: 'ireadonlycollection', anchor: 'ireadonlycollection' },
    { key: 'ilist', anchor: 'ilist' },
    { key: 'ireadonlylist', anchor: 'ireadonlylist' },
    { key: 'iset', anchor: 'iset' },
  ];

  // Read pros/cons as objects from translations (safer than i18n.exists checks)
  const ienumerablePros = t('collection.content.sections.ienumerable.pros', { returnObjects: true }) as string[] | null;
  const ienumerableCons = t('collection.content.sections.ienumerable.cons', { returnObjects: true }) as string[] | null;
  const icollectionPros = t('collection.content.sections.icollection.pros', { returnObjects: true }) as string[] | null;
  const icollectionCons = t('collection.content.sections.icollection.cons', { returnObjects: true }) as string[] | null;
  const ireadOnlyCollectionPros = t('collection.content.sections.ireadonlycollection.pros', { returnObjects: true }) as string[] | null;
  const ireadOnlyCollectionCons = t('collection.content.sections.ireadonlycollection.cons', { returnObjects: true }) as string[] | null;
  const ilistPros = t('collection.content.sections.ilist.pros', { returnObjects: true }) as string[] | null;
  const ilistCons = t('collection.content.sections.ilist.cons', { returnObjects: true }) as string[] | null;
  const ireadOnlyListPros = t('collection.content.sections.ireadonlylist.pros', { returnObjects: true }) as string[] | null;
  const ireadOnlyListCons = t('collection.content.sections.ireadonlylist.cons', { returnObjects: true }) as string[] | null;
  const isetPros = t('collection.content.sections.iset.pros', { returnObjects: true }) as string[] | null;
  const isetCons = t('collection.content.sections.iset.cons', { returnObjects: true }) as string[] | null;

  return (
    <TipContent>
      <Typography variant="h3" gutterBottom>
        {t('collection.content.mainTitle')}
      </Typography>

      <Typography paragraph>{t('collection.content.intro')}</Typography>

      {/* Table of contents */}
      <Typography variant="h6" gutterBottom sx={{ mt: 2 }} id="toc">
        {t('collection.content.tocTitle')}
      </Typography>
      <Box component="ul">
        {sections.map((s) => (
          <li key={s.anchor}>
            <a href={`#${s.anchor}`} style={{ color: 'inherit', textDecoration: 'underline' }}>
              {t(`collection.content.sections.${s.key}.title`)}
            </a>
          </li>
        ))}
      </Box>

      <Typography variant="h5" gutterBottom id="ienumerable">
        {t('collection.content.sections.ienumerable.title')}
      </Typography>
      <Typography paragraph>{t('collection.content.sections.ienumerable.description')}</Typography>
      {Array.isArray(ienumerablePros) && ienumerablePros.length > 0 && (
        <Box sx={{ mt: 1 }}>
          <Typography variant="subtitle2">{t('collection.prosTitle', 'Avantages')}</Typography>
          <ul>
            {ienumerablePros.map((p, i) => (
              <li key={i}>
                <Typography component="span">{p}</Typography>
              </li>
            ))}
          </ul>
        </Box>
      )}
      {Array.isArray(ienumerableCons) && ienumerableCons.length > 0 && (
        <Box sx={{ mt: 1 }}>
          <Typography variant="subtitle2">{t('collection.consTitle', 'Inconvénients')}</Typography>
          <ul>
            {ienumerableCons.map((c, i) => (
              <li key={i}>
                <Typography component="span">{c}</Typography>
              </li>
            ))}
          </ul>
        </Box>
      )}

      <Typography variant="h5" gutterBottom id="icollection">
        {t('collection.content.sections.icollection.title')}
      </Typography>
      <Typography paragraph>{t('collection.content.sections.icollection.description')}</Typography>
      {Array.isArray(icollectionPros) && icollectionPros.length > 0 && (
        <Box sx={{ mt: 1 }}>
          <Typography variant="subtitle2">{t('collection.prosTitle', 'Avantages')}</Typography>
          <ul>
            {icollectionPros.map((p, i) => (
              <li key={i}>
                <Typography component="span">{p}</Typography>
              </li>
            ))}
          </ul>
        </Box>
      )}
      {Array.isArray(icollectionCons) && icollectionCons.length > 0 && (
        <Box sx={{ mt: 1 }}>
          <Typography variant="subtitle2">{t('collection.consTitle', 'Inconvénients')}</Typography>
          <ul>
            {icollectionCons.map((c, i) => (
              <li key={i}>
                <Typography component="span">{c}</Typography>
              </li>
            ))}
          </ul>
        </Box>
      )}

      <Typography variant="h5" gutterBottom id="ireadonlycollection">
        {t('collection.content.sections.ireadonlycollection.title')}
      </Typography>
      <Typography paragraph>
        {t('collection.content.sections.ireadonlycollection.description')}
      </Typography>
      {Array.isArray(ireadOnlyCollectionPros) && ireadOnlyCollectionPros.length > 0 && (
        <Box sx={{ mt: 1 }}>
          <Typography variant="subtitle2">{t('collection.prosTitle', 'Avantages')}</Typography>
          <ul>
            {ireadOnlyCollectionPros.map((p, i) => (
              <li key={i}>
                <Typography component="span">{p}</Typography>
              </li>
            ))}
          </ul>
        </Box>
      )}
      {Array.isArray(ireadOnlyCollectionCons) && ireadOnlyCollectionCons.length > 0 && (
        <Box sx={{ mt: 1 }}>
          <Typography variant="subtitle2">{t('collection.consTitle', 'Inconvénients')}</Typography>
          <ul>
            {ireadOnlyCollectionCons.map((c, i) => (
              <li key={i}>
                <Typography component="span">{c}</Typography>
              </li>
            ))}
          </ul>
        </Box>
      )}

      <Typography variant="h5" gutterBottom id="ilist">
        {t('collection.content.sections.ilist.title')}
      </Typography>
      <Typography paragraph>{t('collection.content.sections.ilist.description')}</Typography>
      {Array.isArray(ilistPros) && ilistPros.length > 0 && (
        <Box sx={{ mt: 1 }}>
          <Typography variant="subtitle2">{t('collection.prosTitle', 'Avantages')}</Typography>
          <ul>
            {ilistPros.map((p, i) => (
              <li key={i}>
                <Typography component="span">{p}</Typography>
              </li>
            ))}
          </ul>
        </Box>
      )}
      {Array.isArray(ilistCons) && ilistCons.length > 0 && (
        <Box sx={{ mt: 1 }}>
          <Typography variant="subtitle2">{t('collection.consTitle', 'Inconvénients')}</Typography>
          <ul>
            {ilistCons.map((c, i) => (
              <li key={i}>
                <Typography component="span">{c}</Typography>
              </li>
            ))}
          </ul>
        </Box>
      )}

      <Typography variant="h5" gutterBottom id="ireadonlylist">
        {t('collection.content.sections.ireadonlylist.title')}
      </Typography>
      <Typography paragraph>
        {t('collection.content.sections.ireadonlylist.description')}
      </Typography>
      {Array.isArray(ireadOnlyListPros) && ireadOnlyListPros.length > 0 && (
        <Box sx={{ mt: 1 }}>
          <Typography variant="subtitle2">{t('collection.prosTitle', 'Avantages')}</Typography>
          <ul>
            {ireadOnlyListPros.map((p, i) => (
              <li key={i}>
                <Typography component="span">{p}</Typography>
              </li>
            ))}
          </ul>
        </Box>
      )}
      {Array.isArray(ireadOnlyListCons) && ireadOnlyListCons.length > 0 && (
        <Box sx={{ mt: 1 }}>
          <Typography variant="subtitle2">{t('collection.consTitle', 'Inconvénients')}</Typography>
          <ul>
            {ireadOnlyListCons.map((c, i) => (
              <li key={i}>
                <Typography component="span">{c}</Typography>
              </li>
            ))}
          </ul>
        </Box>
      )}

      <Typography variant="h5" gutterBottom id="iset">
        {t('collection.content.sections.iset.title')}
      </Typography>
      <Typography paragraph>{t('collection.content.sections.iset.description')}</Typography>
      {Array.isArray(isetPros) && isetPros.length > 0 && (
        <Box sx={{ mt: 1 }}>
          <Typography variant="subtitle2">{t('collection.prosTitle', 'Avantages')}</Typography>
          <ul>
            {isetPros.map((p, i) => (
              <li key={i}>
                <Typography component="span">{p}</Typography>
              </li>
            ))}
          </ul>
        </Box>
      )}
      {Array.isArray(isetCons) && isetCons.length > 0 && (
        <Box sx={{ mt: 1 }}>
          <Typography variant="subtitle2">{t('collection.consTitle', 'Inconvénients')}</Typography>
          <ul>
            {isetCons.map((c, i) => (
              <li key={i}>
                <Typography component="span">{c}</Typography>
              </li>
            ))}
          </ul>
        </Box>
      )}

      <Typography variant="h5" gutterBottom>
        {t('collection.content.sections.summary.title')}
      </Typography>
      <ul>
        <li>
          <code>IEnumerable&lt;T&gt;</code> :{' '}
          {t('collection.content.sections.summary.items.ienumerable')}
        </li>
        <li>
          <code>IReadOnlyCollection&lt;T&gt;</code> :{' '}
          {t('collection.content.sections.summary.items.ireadonlycollection')}
        </li>
        <li>
          <code>IReadOnlyList&lt;T&gt;</code> :{' '}
          {t('collection.content.sections.summary.items.ireadonlylist')}
        </li>
        <li>
          <code>ICollection&lt;T&gt;</code> :{' '}
          {t('collection.content.sections.summary.items.icollection')}
        </li>
        <li>
          <code>IList&lt;T&gt;</code> : {t('collection.content.sections.summary.items.ilist')}
        </li>
        <li>
          <code>ISet&lt;T&gt;</code> : {t('collection.content.sections.summary.items.iset')}
        </li>
      </ul>

      <Typography variant="h5" gutterBottom>
        {t('collection.content.sections.tips.title')}
      </Typography>
      <ul>
        <li>{t('collection.content.sections.tips.items.restrictive')}</li>
        <li>{t('collection.content.sections.tips.items.output')}</li>
        <li>{t('collection.content.sections.tips.items.input')}</li>
        <li>{t('collection.content.sections.tips.items.never')}</li>
      </ul>

      <Box
        mt={4}
        pt={2}
        borderTop={(theme) => `1px solid ${theme.palette.divider}`}
        sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
      >
        <Typography
          variant="caption"
          component="div"
          sx={{ fontStyle: 'italic', color: 'text.secondary' }}
        >
          {t('collection.content.footer.sourcesLabel')}{' '}
          {(
            t('collection.content.footer.sources', { returnObjects: true }) as {
              name: string;
              url: string;
            }[]
          ).map((s, i, arr) => (
            <span key={i}>
              <Link
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                underline="always"
                color="inherit"
              >
                {s.name}
              </Link>
              {i < arr.length - 1 ? ' • ' : ''}
            </span>
          ))}
        </Typography>
        <Typography variant="caption" component="div" sx={{ color: 'text.secondary' }}>
          {t('collection.content.footer.writtenOn', { date: meta.writtenOn })}
        </Typography>
      </Box>
    </TipContent>
  );
};

const mod: TipModule = { default: CollectionTip, meta };

export { mod };
export default CollectionTip;
