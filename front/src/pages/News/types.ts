export interface NewsItem {
  title: string;
  link: string;
  pubDate: string;
  contentSnippet: string;
  creator: string;
  categories: string[];
  guid: string;
}

export interface RssFeedData {
  source: string;
  items: NewsItem[];
  lastUpdated: string;
  feedTitle?: string;
  error?: string;
}

export interface RssFeedIndex {
  sources: Array<{
    slug: string;
    itemCount: number;
    lastUpdated: string;
    hasError: boolean;
  }>;
  lastUpdated: string;
}
