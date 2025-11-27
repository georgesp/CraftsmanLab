import React from 'react';
import { useTranslation } from 'react-i18next';
import type { TipModule } from '..';
import { Box, Typography } from '@mui/material';
import { CodeBlock } from '../../ui/CodeBlock/CodeBlock';
import { TipContent } from '../../ui';
import { meta } from './meta';

const TsqlSchemaOnlyTip: React.FC = () => {
  const { t } = useTranslation('tips');

  return (
    <TipContent>
      <Typography variant="h3" gutterBottom>
        {t('tsql-schema-only.content.mainTitle')}
      </Typography>

      <Typography paragraph>{t('tsql-schema-only.content.overview')}</Typography>

      <Typography variant="h4" gutterBottom>
        {t('tsql-schema-only.content.useCases.title')}
      </Typography>

      <Typography variant="h5" gutterBottom>
        {t('tsql-schema-only.content.useCases.case1.title')}
      </Typography>
      <Typography paragraph>
        {t('tsql-schema-only.content.useCases.case1.description')}
      </Typography>
      <CodeBlock
        language="sql"
        ariaLabel="tsql-schema-only-case1"
        code={`-- Create a memory-optimized table with SCHEMA_ONLY durability
CREATE TABLE dbo.TempCalculations (
    Id INT NOT NULL PRIMARY KEY NONCLUSTERED HASH WITH (BUCKET_COUNT = 1000000),
    Value DECIMAL(18,2) NOT NULL,
    Result DECIMAL(18,2) NULL,
    ProcessedAt DATETIME2 NOT NULL
) WITH (MEMORY_OPTIMIZED = ON, DURABILITY = SCHEMA_ONLY);

-- Insert data (no logging, extremely fast)
INSERT INTO dbo.TempCalculations (Id, Value, ProcessedAt)
VALUES (1, 100.50, SYSDATETIME());

-- Data is lost on restart/failover
-- Only the table structure persists`}
      />

      <Typography variant="h5" gutterBottom>
        {t('tsql-schema-only.content.useCases.case2.title')}
      </Typography>
      <Typography paragraph>
        {t('tsql-schema-only.content.useCases.case2.description')}
      </Typography>
      <CodeBlock
        language="sql"
        ariaLabel="tsql-schema-only-case2"
        code={`-- Create a staging table for ETL processes
CREATE TABLE dbo.StagingOrders (
    OrderId INT NOT NULL PRIMARY KEY NONCLUSTERED,
    CustomerId INT NOT NULL,
    Amount DECIMAL(18,2) NOT NULL,
    OrderDate DATETIME2 NOT NULL,
    INDEX IX_Customer NONCLUSTERED (CustomerId)
) WITH (MEMORY_OPTIMIZED = ON, DURABILITY = SCHEMA_ONLY);

-- Fast bulk insert without transaction log overhead
INSERT INTO dbo.StagingOrders
SELECT OrderId, CustomerId, Amount, OrderDate
FROM ExternalSource;

-- Transform and load into permanent tables
INSERT INTO dbo.Orders
SELECT * FROM dbo.StagingOrders
WHERE Amount > 0;

-- Clear staging data
DELETE FROM dbo.StagingOrders;`}
      />

      <Typography variant="h5" gutterBottom>
        {t('tsql-schema-only.content.useCases.case3.title')}
      </Typography>
      <Typography paragraph>
        {t('tsql-schema-only.content.useCases.case3.description')}
      </Typography>
      <CodeBlock
        language="sql"
        ariaLabel="tsql-schema-only-case3"
        code={`-- Create a session state table
CREATE TABLE dbo.UserSessions (
    SessionId UNIQUEIDENTIFIER NOT NULL PRIMARY KEY NONCLUSTERED,
    UserId INT NOT NULL,
    LoginTime DATETIME2 NOT NULL,
    LastActivity DATETIME2 NOT NULL,
    SessionData NVARCHAR(MAX) NULL,
    INDEX IX_User NONCLUSTERED HASH (UserId) WITH (BUCKET_COUNT = 100000)
) WITH (MEMORY_OPTIMIZED = ON, DURABILITY = SCHEMA_ONLY);

-- Ultra-fast session tracking
INSERT INTO dbo.UserSessions 
VALUES (NEWID(), 12345, SYSDATETIME(), SYSDATETIME(), '{"theme":"dark"}');

-- Update last activity (no disk I/O)
UPDATE dbo.UserSessions
SET LastActivity = SYSDATETIME()
WHERE SessionId = @sessionId;`}
      />

      <Typography variant="h4" gutterBottom>
        {t('tsql-schema-only.content.summary.title')}
      </Typography>
      <Typography paragraph>{t('tsql-schema-only.content.summary.text')}</Typography>

      <Typography variant="h5" gutterBottom>
        {t('tsql-schema-only.content.summary.prosTitle')}
      </Typography>
      <ul>
        <li>{t('tsql-schema-only.content.summary.pros.0')}</li>
        <li>{t('tsql-schema-only.content.summary.pros.1')}</li>
        <li>{t('tsql-schema-only.content.summary.pros.2')}</li>
        <li>{t('tsql-schema-only.content.summary.pros.3')}</li>
      </ul>

      <Typography variant="h5" gutterBottom>
        {t('tsql-schema-only.content.summary.consTitle')}
      </Typography>
      <ul>
        <li>{t('tsql-schema-only.content.summary.cons.0')}</li>
        <li>{t('tsql-schema-only.content.summary.cons.1')}</li>
        <li>{t('tsql-schema-only.content.summary.cons.2')}</li>
      </ul>

      <Typography variant="h4" gutterBottom>
        {t('tsql-schema-only.content.goodPractices.title')}
      </Typography>
      <ul>
        <li>{t('tsql-schema-only.content.goodPractices.items.0')}</li>
        <li>{t('tsql-schema-only.content.goodPractices.items.1')}</li>
        <li>{t('tsql-schema-only.content.goodPractices.items.2')}</li>
        <li>{t('tsql-schema-only.content.goodPractices.items.3')}</li>
        <li>{t('tsql-schema-only.content.goodPractices.items.4')}</li>
      </ul>

      <Box
        mt={4}
        pt={2}
        borderTop={(theme) => `1px solid ${theme.palette.divider}`}
        sx={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <Typography variant="caption" sx={{ fontStyle: 'italic' }}>
          <a
            href={t('tsql-schema-only.content.footer.sourceUrl')}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'inherit', textDecoration: 'underline' }}
          >
            {t('tsql-schema-only.content.footer.sourceLabel')}
          </a>
        </Typography>
        <Typography variant="caption" sx={{ fontStyle: 'italic' }}>
          {t('tsql-schema-only.content.footer.writtenOn', { date: meta.writtenOn })}
        </Typography>
      </Box>
    </TipContent>
  );
};

const mod: TipModule = { default: TsqlSchemaOnlyTip, meta };
export default TsqlSchemaOnlyTip;
export { mod };
