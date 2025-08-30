import React from 'react';
import { useTranslation } from 'react-i18next';
import type { TipModule } from '..';
import { Box, Typography, Link } from '@mui/material';
import { CodeBlock } from '../../ui/CodeBlock/CodeBlock';
import { TipContent } from '../../ui';
import { meta } from './meta';

const TsqlApplyTip: React.FC = () => {
  const { t } = useTranslation('tips');

  return (
    <TipContent>
      <Typography variant="h3" gutterBottom>
        {t('tsql-apply.content.mainTitle')}
      </Typography>

      <Typography paragraph>{t('tsql-apply.content.overview')}</Typography>

      <Typography variant="h4" gutterBottom>
        {t('tsql-apply.content.useCases.title')}
      </Typography>

      <Typography variant="h5" gutterBottom>
        {t('tsql-apply.content.useCases.case1.title')}
      </Typography>
      <Typography paragraph>{t('tsql-apply.content.useCases.case1.description')}</Typography>
      <CodeBlock
        language="sql"
        ariaLabel="tsql-apply-case1"
        code={`-- Sample data
CREATE TABLE dbo.Customers (
  CustomerId INT PRIMARY KEY,
  Name NVARCHAR(50),
  TagsCsv NVARCHAR(200)
);

INSERT INTO dbo.Customers (CustomerId, Name, TagsCsv) VALUES
  (1, 'Alice', 'vip,tech'),
  (2, 'Bob',   NULL),
  (3, 'Cara',  '');

-- Join each row to a TVF result: split a CSV column into rows per customer
-- CROSS APPLY behaves like an inner join (filters out NULL/empty results)
SELECT
  C.CustomerId,
  C.Name,
  TAG.value AS Tag
FROM dbo.Customers AS C
CROSS APPLY STRING_SPLIT(C.TagsCsv, ',') AS TAG;`}
      />
      <Typography variant="subtitle1" gutterBottom>
        {t('tsql-apply.content.useCases.case1.outputTitle')}
      </Typography>
      <CodeBlock
        language="bash"
        ariaLabel="tsql-apply-case1-output"
        code={`CustomerId  Name   Tag
----------  -----  -----
1           Alice  vip
1           Alice  tech`}
      />

      <Typography variant="h5" gutterBottom>
        {t('tsql-apply.content.useCases.case2.title')}
      </Typography>
      <Typography paragraph>{t('tsql-apply.content.useCases.case2.description')}</Typography>
      <CodeBlock
        language="sql"
        ariaLabel="tsql-apply-case2"
        code={`-- Sample data
CREATE TABLE dbo.Orders (
  OrderId INT PRIMARY KEY,
  CustomerId INT
);
CREATE TABLE dbo.Products (
  Id INT PRIMARY KEY,
  Name NVARCHAR(50)
);
CREATE TABLE dbo.OrderLines (
  OrderId INT,
  ProductId INT,
  Quantity INT
);

INSERT INTO dbo.Orders (OrderId, CustomerId) VALUES (101, 1), (102, 2);
INSERT INTO dbo.Products (Id, Name) VALUES (10, 'Keyboard'), (20, 'Mouse');
INSERT INTO dbo.OrderLines (OrderId, ProductId, Quantity) VALUES
  (101, 10, 1),
  (101, 20, 3);
-- Order 102 has no lines

-- Keep outer rows even when the function returns no rows
SELECT
  O.OrderId,
  O.CustomerId,
  X.TopItemId,
  X.TopItemName,
  X.Qty
FROM dbo.Orders AS O
OUTER APPLY (
  SELECT TOP (1)
         OL.ProductId     AS TopItemId,
         P.Name           AS TopItemName,
         OL.Quantity      AS Qty
  FROM dbo.OrderLines AS OL
  JOIN dbo.Products AS P ON P.Id = OL.ProductId
  WHERE OL.OrderId = O.OrderId
  ORDER BY OL.Quantity DESC
) AS X;`}
      />
      <Typography variant="subtitle1" gutterBottom>
        {t('tsql-apply.content.useCases.case2.outputTitle')}
      </Typography>
      <CodeBlock
        language="bash"
        ariaLabel="tsql-apply-case2-output"
        code={`OrderId  CustomerId  TopItemId  TopItemName  Qty
-------  ----------  ---------  -----------  ---
101      1           20         Mouse        3
102      2           NULL       NULL         NULL`}
      />

      <Typography variant="h5" gutterBottom>
        {t('tsql-apply.content.useCases.case3.title')}
      </Typography>
      <Typography paragraph>{t('tsql-apply.content.useCases.case3.description')}</Typography>
      <CodeBlock
        language="sql"
        ariaLabel="tsql-apply-case3"
        code={`-- Sample data
CREATE TABLE dbo.RawEvents (
  Id INT PRIMARY KEY,
  Payload NVARCHAR(MAX)
);
INSERT INTO dbo.RawEvents(Id, Payload) VALUES
  (1, '{"country":"FR","score":42}'),
  (2, NULL);

-- Parse JSON per row; OUTER APPLY to keep rows with invalid/missing JSON
SELECT
  T.Id,
  J.[key] AS Prop,
  J.value AS Val
FROM dbo.RawEvents AS T
OUTER APPLY OPENJSON(T.Payload) AS J;`}
      />
      <Typography variant="subtitle1" gutterBottom>
        {t('tsql-apply.content.useCases.case3.outputTitle')}
      </Typography>
      <CodeBlock
        language="bash"
        ariaLabel="tsql-apply-case3-output"
        code={`Id  Prop     Val
--  -------  ---
1   country  FR
1   score    42
2   NULL     NULL`}
      />

      <Typography variant="h4" gutterBottom>
        {t('tsql-apply.content.alternatives.title')}
      </Typography>

      <Typography variant="h5" gutterBottom>
        {t('tsql-apply.content.alternatives.windowFunctions.title')}
      </Typography>
      <Typography paragraph>
        {t('tsql-apply.content.alternatives.windowFunctions.description')}
      </Typography>
      <Typography variant="h6">
        {t('tsql-apply.content.alternatives.windowFunctions.prosTitle')}
      </Typography>
      <ul>
        {(
          t('tsql-apply.content.alternatives.windowFunctions.pros', {
            returnObjects: true,
          }) as string[]
        ).map((p, i) => (
          <li key={`wf-pro-${i}`}>{p}</li>
        ))}
      </ul>
      <Typography variant="h6">
        {t('tsql-apply.content.alternatives.windowFunctions.consTitle')}
      </Typography>
      <ul>
        {(
          t('tsql-apply.content.alternatives.windowFunctions.cons', {
            returnObjects: true,
          }) as string[]
        ).map((c, i) => (
          <li key={`wf-con-${i}`}>{c}</li>
        ))}
      </ul>

      <Typography variant="h5" gutterBottom>
        {t('tsql-apply.content.alternatives.cte.title')}
      </Typography>
      <Typography paragraph>{t('tsql-apply.content.alternatives.cte.description')}</Typography>
      <Typography variant="h6">{t('tsql-apply.content.alternatives.cte.prosTitle')}</Typography>
      <ul>
        {(t('tsql-apply.content.alternatives.cte.pros', { returnObjects: true }) as string[]).map(
          (p, i) => (
            <li key={`cte-pro-${i}`}>{p}</li>
          ),
        )}
      </ul>
      <Typography variant="h6">{t('tsql-apply.content.alternatives.cte.consTitle')}</Typography>
      <ul>
        {(t('tsql-apply.content.alternatives.cte.cons', { returnObjects: true }) as string[]).map(
          (c, i) => (
            <li key={`cte-con-${i}`}>{c}</li>
          ),
        )}
      </ul>

      <Typography variant="h5" gutterBottom>
        {t('tsql-apply.content.alternatives.joins.title')}
      </Typography>
      <Typography paragraph>{t('tsql-apply.content.alternatives.joins.description')}</Typography>
      <Typography variant="h6">{t('tsql-apply.content.alternatives.joins.prosTitle')}</Typography>
      <ul>
        {(t('tsql-apply.content.alternatives.joins.pros', { returnObjects: true }) as string[]).map(
          (p, i) => (
            <li key={`jn-pro-${i}`}>{p}</li>
          ),
        )}
      </ul>
      <Typography variant="h6">{t('tsql-apply.content.alternatives.joins.consTitle')}</Typography>
      <ul>
        {(t('tsql-apply.content.alternatives.joins.cons', { returnObjects: true }) as string[]).map(
          (c, i) => (
            <li key={`jn-con-${i}`}>{c}</li>
          ),
        )}
      </ul>

      <Typography variant="h4" gutterBottom>
        {t('tsql-apply.content.summary.title')}
      </Typography>
      <Typography paragraph>{t('tsql-apply.content.summary.text')}</Typography>
      <Typography variant="h5">{t('tsql-apply.content.summary.prosTitle')}</Typography>
      <ul>
        {(t('tsql-apply.content.summary.pros', { returnObjects: true }) as string[]).map((p, i) => (
          <li key={i}>{p}</li>
        ))}
      </ul>
      <Typography variant="h5">{t('tsql-apply.content.summary.consTitle')}</Typography>
      <ul>
        {(t('tsql-apply.content.summary.cons', { returnObjects: true }) as string[]).map((c, i) => (
          <li key={i}>{c}</li>
        ))}
      </ul>

      <Typography variant="h4" gutterBottom>
        {t('tsql-apply.content.goodPractices.title')}
      </Typography>
      <ul>
        {(t('tsql-apply.content.goodPractices.items', { returnObjects: true }) as string[]).map(
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
          {t('tsql-apply.content.footer.sourcesLabel')}{' '}
          {(
            t('tsql-apply.content.footer.sources', { returnObjects: true }) as {
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
          {t('tsql-apply.content.footer.writtenOn', { date: meta.writtenOn })}
        </Typography>
      </Box>
    </TipContent>
  );
};

const mod: TipModule = { default: TsqlApplyTip, meta };
export default TsqlApplyTip;
export { mod };
