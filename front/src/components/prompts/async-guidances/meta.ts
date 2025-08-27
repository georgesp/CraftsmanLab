import type { PromptMeta } from '../prompt-types';

export const meta: PromptMeta = {
  slug: 'dot-net-async-best-practices',
  title: '.NET Async Best Practices',
  shortDescription:
    'Guide complet des bonnes pratiques asynchronisme .NET/ASP.NET Core avec exemples concrets.',
  writtenOn: '2025-08-11',
  keywords: ['C#' as const],
  metadata: {
    searchKeywords: {
      fr: [
        'async',
        'asynchrone',
        'await',
        'task',
        'thread',
        'parallélisme',
        'concurrence',
        'performance',
        'deadlock',
        'configureawait',
        'dotnet',
        'csharp',
      ],
      en: [
        'async',
        'asynchronous',
        'await',
        'task',
        'thread',
        'parallelism',
        'concurrency',
        'performance',
        'deadlock',
        'configureawait',
        'dotnet',
        'csharp',
      ],
    },
  },
};
