import React from 'react';
import { useTranslation } from 'react-i18next';
import type { TipModule } from '..';
import { Box, Typography, Link } from '@mui/material';
import { meta } from './meta';

const KeyValueCollectionTip: React.FC = () => {
  const { t } = useTranslation('tips');

  return (
    <Box>
      <Typography variant="h3" gutterBottom>
        {t('keyValueCollection.content.mainTitle')}
      </Typography>

      <Typography paragraph>{t('keyValueCollection.content.intro')}</Typography>

      <Typography variant="h5" gutterBottom>
        {t('keyValueCollection.content.sections.idictionary.title')}
      </Typography>
      <Typography paragraph>
        {t('keyValueCollection.content.sections.idictionary.description')}
      </Typography>

      <Typography variant="h5" gutterBottom>
        {t('keyValueCollection.content.sections.ireadonlydictionary.title')}
      </Typography>
      <Typography paragraph>
        {t('keyValueCollection.content.sections.ireadonlydictionary.description')}
      </Typography>

      <Typography variant="h5" gutterBottom>
        {t('keyValueCollection.content.sections.concurrentdictionary.title')}
      </Typography>
      <Typography paragraph>
        {t('keyValueCollection.content.sections.concurrentdictionary.description')}
      </Typography>

      <Typography variant="h5" gutterBottom>
        {t('keyValueCollection.content.sections.immutabledictionary.title')}
      </Typography>
      <Typography paragraph>
        {t('keyValueCollection.content.sections.immutabledictionary.description')}
      </Typography>

      <Typography variant="h5" gutterBottom>
        {t('keyValueCollection.content.sections.summary.title')}
      </Typography>
      <ul>
        <li>
          <code>IDictionary&lt;TKey, TValue&gt;</code> :{' '}
          {t('keyValueCollection.content.sections.summary.items.idictionary')}
        </li>
        <li>
          <code>IReadOnlyDictionary&lt;TKey, TValue&gt;</code> :{' '}
          {t('keyValueCollection.content.sections.summary.items.ireadonlydictionary')}
        </li>
        <li>
          <code>ConcurrentDictionary&lt;TKey, TValue&gt;</code> :{' '}
          {t('keyValueCollection.content.sections.summary.items.concurrentdictionary')}
        </li>
        <li>
          <code>ImmutableDictionary&lt;TKey, TValue&gt;</code> :{' '}
          {t('keyValueCollection.content.sections.summary.items.immutabledictionary')}
        </li>
      </ul>

      <Typography variant="h5" gutterBottom>
        {t('keyValueCollection.content.sections.tips.title')}
      </Typography>
      <ul>
        <li>{t('keyValueCollection.content.sections.tips.items.output')}</li>
        <li>{t('keyValueCollection.content.sections.tips.items.input')}</li>
        <li>{t('keyValueCollection.content.sections.tips.items.concurrent')}</li>
        <li>{t('keyValueCollection.content.sections.tips.items.immutable')}</li>
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
          <Link
            href="https://learn.microsoft.com/fr-fr/dotnet/api/system.collections.generic"
            target="_blank"
            rel="noopener noreferrer"
            underline="hover"
            color="inherit"
          >
            {t('keyValueCollection.content.footer.sourceLabel')}
          </Link>
        </Typography>
        <Typography variant="caption" component="div" sx={{ color: 'text.secondary' }}>
          {t('keyValueCollection.content.footer.writtenOn', { date: meta.writtenOn })}
        </Typography>
      </Box>
    </Box>
  );
};

const mod: TipModule = { default: KeyValueCollectionTip, meta };

export { mod };
export default KeyValueCollectionTip;
