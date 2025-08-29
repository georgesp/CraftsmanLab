import React from 'react';
import { useTranslation } from 'react-i18next';
import type { TipModule } from '..';
import { Box, Typography, Link } from '@mui/material';
import { CodeBlock } from '../../ui/CodeBlock/CodeBlock';
import { TipContent } from '../../ui';
import { meta } from './meta';

const OpenJsonTip: React.FC = () => {
  const { t } = useTranslation('tips');

  return (
    <TipContent>
      <Typography variant="h3" gutterBottom>
        {t('openjson.content.mainTitle')}
      </Typography>

      <Typography paragraph>{t('openjson.content.overview')}</Typography>

      <Typography variant="h4" gutterBottom>
        {t('openjson.content.useCases.title')}
      </Typography>

      <Typography variant="h5" gutterBottom>
        {t('openjson.content.useCases.case1.title')}
      </Typography>
      <Typography paragraph>{t('openjson.content.useCases.case1.description')}</Typography>
      <CodeBlock
        language="sql"
        ariaLabel="openjson-case1"
        code={`-- Sample data
DECLARE @payload NVARCHAR(MAX) = N'{"id":1,"name":"Alice","tags":["vip","tech"]}';

-- Project properties using WITH mapping and paths
SELECT
  J.Id,
  J.Name
FROM OPENJSON(@payload)
WITH (
  Id INT        '$.id',
  Name NVARCHAR(50) '$.name'
) AS J;`}
      />
      <Typography variant="subtitle1" gutterBottom>
        {t('openjson.content.useCases.case1.outputTitle')}
      </Typography>
      <CodeBlock
        language="bash"
        ariaLabel="openjson-case1-output"
        code={`Id  Name
--  -----
1   Alice`}
      />

      <Typography variant="h5" gutterBottom>
        {t('openjson.content.useCases.case2.title')}
      </Typography>
      <Typography paragraph>{t('openjson.content.useCases.case2.description')}</Typography>
      <CodeBlock
        language="sql"
        ariaLabel="openjson-case2"
        code={`-- Sample data
DECLARE @payload NVARCHAR(MAX) = N'{"items":[{"sku":"KB","qty":1},{"sku":"MS","qty":3}]}';

-- Read array elements with CROSS APPLY
SELECT
  ITM.[key]        AS ItemIndex,
  ITM.value        AS ItemJson,
  X.Sku,
  X.Qty
FROM OPENJSON(@payload, '$.items') AS ITM
CROSS APPLY OPENJSON(ITM.value)
WITH (
  Sku NVARCHAR(10) '$.sku',
  Qty INT          '$.qty'
) AS X;`}
      />
      <Typography variant="subtitle1" gutterBottom>
        {t('openjson.content.useCases.case2.outputTitle')}
      </Typography>
      <CodeBlock
        language="bash"
        ariaLabel="openjson-case2-output"
        code={`ItemIndex  ItemJson                              Sku  Qty
---------  ----------------------------------------  ---  ---
0          {"sku":"KB","qty":1}                     KB   1
1          {"sku":"MS","qty":3}                     MS   3`}
      />

      <Typography variant="h5" gutterBottom>
        {t('openjson.content.useCases.case3.title')}
      </Typography>
      <Typography paragraph>{t('openjson.content.useCases.case3.description')}</Typography>
      <CodeBlock
        language="sql"
        ariaLabel="openjson-case3-input"
        code={`-- Sample table
CREATE TABLE dbo.Events (
  Id INT PRIMARY KEY,
  Payload NVARCHAR(MAX)
);
INSERT INTO dbo.Events(Id, Payload) VALUES
  (1, '{"country":"FR","score":42}'),
  (2, NULL);

-- OUTER APPLY preserves rows with NULL payload
SELECT
  E.Id,
  J.[key] AS Prop,
  J.value AS Val
FROM dbo.Events AS E
OUTER APPLY OPENJSON(E.Payload) AS J;`}
      />

      <Typography variant="h4" gutterBottom>
        {t('openjson.content.summary.title')}
      </Typography>
      <Typography paragraph>{t('openjson.content.summary.text')}</Typography>
      <Typography variant="h5">{t('openjson.content.summary.prosTitle')}</Typography>
      <ul>
        {(t('openjson.content.summary.pros', { returnObjects: true }) as string[]).map((p, i) => (
          <li key={i}>{p}</li>
        ))}
      </ul>
      <Typography variant="h5">{t('openjson.content.summary.consTitle')}</Typography>
      <ul>
        {(t('openjson.content.summary.cons', { returnObjects: true }) as string[]).map((c, i) => (
          <li key={i}>{c}</li>
        ))}
      </ul>

      <Typography variant="h4" gutterBottom>
        {t('openjson.content.goodPractices.title')}
      </Typography>
      <ul>
        {(t('openjson.content.goodPractices.items', { returnObjects: true }) as string[]).map(
          (g, i) => (
            <li key={i}>{g}</li>
          ),
        )}
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
          {t('openjson.content.footer.sourcesLabel')}{' '}
          {(
            t('openjson.content.footer.sources', { returnObjects: true }) as {
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
          {t('openjson.content.footer.writtenOn', { date: meta.writtenOn })}
        </Typography>
      </Box>
    </TipContent>
  );
};

const mod: TipModule = { default: OpenJsonTip, meta };
export default OpenJsonTip;
export { mod };
