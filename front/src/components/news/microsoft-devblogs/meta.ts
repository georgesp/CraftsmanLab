export interface RssSourceMeta {
  slug: string;
  feedUrl: string;
  icon?: string;
  color?: string;
  maxItems?: number;
}

export const microsoftDevBlogsMeta: RssSourceMeta = {
  slug: 'microsoft-devblogs',
  feedUrl: 'https://devblogs.microsoft.com/dotnet/feed/',
  icon: '/microsoft-icon.png',
  color: '#0078D4',
  maxItems: 20,
};
