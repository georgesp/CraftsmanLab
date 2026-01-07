export interface RssSourceMeta {
  slug: string;
  feedUrl: string;
  icon?: string;
  color?: string;
  maxItems?: number;
  searchKeywords?: string[];
}

export const microsoftDevBlogsMeta: RssSourceMeta = {
  slug: 'microsoft-devblogs',
  feedUrl: 'https://devblogs.microsoft.com/dotnet/feed/',
  icon: '/microsoft-icon.png',
  color: '#0078D4',
  maxItems: 100,
  searchKeywords: [
    '.net',
    'dotnet',
    'c#',
    'csharp',
    'asp.net',
    'aspnet',
    'microsoft',
    'actualités',
    'news',
    'blog',
    'devblog',
    'articles',
  ],
};
