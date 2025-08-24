import React from 'react';
import { useTranslation } from 'react-i18next';
import type { TipModule } from '..';
import { Box, Typography, Link } from '@mui/material';

export const meta = {
  slug: 'collection',
  title: '', // Utilisera les traductions
  shortDescription: '', // Utilisera les traductions
  writtenOn: '2025-08-11',
  keywords: ['C#' as const],
  metadata: {
    searchKeywords: {
      fr: [
        'collections', 'ienumerable', 'icollection', 'ilist', 'ireadonlycollection',
        'list', 'array', 'tableau', 'énumération', 'itération', 'foreach',
        'linq', 'count', 'add', 'remove', 'indexer', 'générique'
      ],
      en: [
        'collections', 'ienumerable', 'icollection', 'ilist', 'ireadonlycollection',
        'list', 'array', 'enumeration', 'iteration', 'foreach',
        'linq', 'count', 'add', 'remove', 'indexer', 'generic'
      ]
    }
  }
};

const CollectionTip: React.FC = () => {
  const { t } = useTranslation('tips');
  
  return (
    <Box>
      <Typography variant="h3" gutterBottom>{t('collection.content.mainTitle')}</Typography>
      
      <Typography paragraph>
        {t('collection.content.intro')}
      </Typography>
      
      <Typography variant="h5" gutterBottom>{t('collection.content.sections.ienumerable.title')}</Typography>
      <Typography paragraph>
        {t('collection.content.sections.ienumerable.description')}
      </Typography>
      
      <Typography variant="h5" gutterBottom>{t('collection.content.sections.icollection.title')}</Typography>
      <Typography paragraph>
        {t('collection.content.sections.icollection.description')}
      </Typography>
      
      <Typography variant="h5" gutterBottom>{t('collection.content.sections.ireadonlycollection.title')}</Typography>
      <Typography paragraph>
        {t('collection.content.sections.ireadonlycollection.description')}
      </Typography>
      
      <Typography variant="h5" gutterBottom>{t('collection.content.sections.ilist.title')}</Typography>
      <Typography paragraph>
        {t('collection.content.sections.ilist.description')}
      </Typography>
      
      <Typography variant="h5" gutterBottom>{t('collection.content.sections.ireadonlylist.title')}</Typography>
      <Typography paragraph>
        {t('collection.content.sections.ireadonlylist.description')}
      </Typography>
      
      <Typography variant="h5" gutterBottom>{t('collection.content.sections.iset.title')}</Typography>
      <Typography paragraph>
        {t('collection.content.sections.iset.description')}
      </Typography>
      
      <Typography variant="h5" gutterBottom>{t('collection.content.sections.summary.title')}</Typography>
      <ul>
        <li><code>IEnumerable&lt;T&gt;</code> : {t('collection.content.sections.summary.items.ienumerable')}</li>
        <li><code>IReadOnlyCollection&lt;T&gt;</code> : {t('collection.content.sections.summary.items.ireadonlycollection')}</li>
        <li><code>IReadOnlyList&lt;T&gt;</code> : {t('collection.content.sections.summary.items.ireadonlylist')}</li>
        <li><code>ICollection&lt;T&gt;</code> : {t('collection.content.sections.summary.items.icollection')}</li>
        <li><code>IList&lt;T&gt;</code> : {t('collection.content.sections.summary.items.ilist')}</li>
        <li><code>ISet&lt;T&gt;</code> : {t('collection.content.sections.summary.items.iset')}</li>
      </ul>
      
      <Typography variant="h5" gutterBottom>{t('collection.content.sections.tips.title')}</Typography>
      <ul>
        <li>{t('collection.content.sections.tips.items.restrictive')}</li>
        <li>{t('collection.content.sections.tips.items.output')}</li>
        <li>{t('collection.content.sections.tips.items.input')}</li>
        <li>{t('collection.content.sections.tips.items.never')}</li>
      </ul>
      
      <Box mt={4} pt={2} borderTop={theme => `1px solid ${theme.palette.divider}`}
        sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="caption" component="div" sx={{ fontStyle: 'italic', color: 'text.secondary' }}>
          <Link href="https://learn.microsoft.com/fr-fr/dotnet/api/system.collections" target="_blank" rel="noopener noreferrer" underline="hover" color="inherit">
            {t('collection.content.footer.sourceLabel')}
          </Link>
        </Typography>
        <Typography variant="caption" component="div" sx={{ color: 'text.secondary' }}>
          {t('collection.content.footer.writtenOn', { date: meta.writtenOn })}
        </Typography>
      </Box>
    </Box>
  );
};

const mod: TipModule = { default: CollectionTip, meta };

export { mod };
