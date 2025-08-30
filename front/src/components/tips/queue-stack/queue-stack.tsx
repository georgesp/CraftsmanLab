import React from 'react';
import { useTranslation } from 'react-i18next';
import type { TipModule } from '..';
import { Box, Typography, Link } from '@mui/material';
import { TipContent, CodeBlock } from '../../ui';
import { meta } from './meta';

const QueueStackTip: React.FC = () => {
  const { t } = useTranslation('tips');

  return (
    <TipContent>
      <Typography variant="h3">{t('queue-stack.content.mainTitle')}</Typography>
      <Typography paragraph>{t('queue-stack.content.overview')}</Typography>

      <Typography variant="h4">{t('queue-stack.content.useCases.title')}</Typography>

      <Typography variant="h5">{t('queue-stack.content.useCases.queue.title')}</Typography>
      <Typography paragraph>{t('queue-stack.content.useCases.queue.description')}</Typography>
    <CodeBlock
    language="csharp"
    code={`// FIFO processing with Queue<T>
using System;
using System.Collections.Generic;

var jobs = new Queue<string>();
jobs.Enqueue("First");
jobs.Enqueue("Second");
jobs.Enqueue("Third");

Console.WriteLine(jobs.Peek());

while (jobs.Count > 0)
{
  var job = jobs.Dequeue();
  Console.WriteLine($"Running: {job}");
}

// Sample output:
// Running: First
// Running: Second
// Running: Third
`}
    />

    <Typography variant="h5">{t('queue-stack.content.useCases.concurrentQueue.title')}</Typography>
    <Typography paragraph>
    {t('queue-stack.content.useCases.concurrentQueue.description')}
    </Typography>

      <Typography variant="h5">{t('queue-stack.content.useCases.stack.title')}</Typography>
      <Typography paragraph>{t('queue-stack.content.useCases.stack.description')}</Typography>
      <CodeBlock
        language="csharp"
        code={`// LIFO processing with Stack<T>
using System;
using System.Collections.Generic;


var history = new Stack<string>();
history.Push("First");
history.Push("Second");
history.Push("Third");

Console.WriteLine(history.Peek());

while (history.Count > 0)
{
  var page = history.Pop();
  Console.WriteLine($"Back to: {page}");
}

// Sample output:
// Back to: Third
// Back to: Second
// Back to: First
`}
      />
      <Typography variant="h5">{t('queue-stack.content.useCases.concurrentStack.title')}</Typography>
      <Typography paragraph>
        {t('queue-stack.content.useCases.concurrentStack.description')}
      </Typography>
      

      <Typography variant="h4">{t('queue-stack.content.summary.title')}</Typography>
      <Typography paragraph>{t('queue-stack.content.summary.text')}</Typography>
      <Typography variant="h5">{t('queue-stack.content.summary.prosTitle')}</Typography>
      <ul>
        {(t('queue-stack.content.summary.pros', { returnObjects: true }) as string[]).map(
          (p, i) => (
            <li key={i}>{p}</li>
          ),
        )}
      </ul>
      <Typography variant="h5">{t('queue-stack.content.summary.consTitle')}</Typography>
      <ul>
        {(t('queue-stack.content.summary.cons', { returnObjects: true }) as string[]).map(
          (c, i) => (
            <li key={i}>{c}</li>
          ),
        )}
      </ul>

      <Typography variant="h4">{t('queue-stack.content.goodPractices.title')}</Typography>
      <ul>
        {(t('queue-stack.content.goodPractices.items', { returnObjects: true }) as string[]).map(
          (gp, i) => (
            <li key={i}>{gp}</li>
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
          {t('queue-stack.content.footer.sourceLabel')}{' '}
          <Link
            href={t('queue-stack.content.footer.sourceUrl')}
            target="_blank"
            rel="noopener noreferrer"
            underline="always"
            color="inherit"
          >
            {t('queue-stack.content.footer.sourceName')}
          </Link>
        </Typography>
        <Typography variant="caption" component="div" sx={{ color: 'text.secondary' }}>
          {t('queue-stack.content.footer.writtenOn', { date: meta.writtenOn })}
        </Typography>
      </Box>
    </TipContent>
  );
};

const mod: TipModule = { default: QueueStackTip, meta };
export { mod };
export default QueueStackTip;
