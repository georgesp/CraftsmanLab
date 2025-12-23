import { microsoftDevBlogsMeta, type RssSourceMeta } from './microsoft-devblogs/meta';
import microsoftDevBlogsFr from './microsoft-devblogs/fr.json';
import microsoftDevBlogsEn from './microsoft-devblogs/en.json';
import microsoftDevBlogsData from './microsoft-devblogs/data.json';
import { developpezDotnetMeta } from './developpez-dotnet/meta';
import developpezDotnetFr from './developpez-dotnet/fr.json';
import developpezDotnetEn from './developpez-dotnet/en.json';
import developpezDotnetData from './developpez-dotnet/data.json';
import type { RssFeedData } from '../../pages/News/types';

export interface RssSource {
  meta: RssSourceMeta;
  translations: {
    fr: {
      title: string;
      description: string;
      website?: string;
    };
    en: {
      title: string;
      description: string;
      website?: string;
    };
  };
  data: RssFeedData;
}

/**
 * Registry of all RSS feed sources
 */
export const rssSources: RssSource[] = [
  {
    meta: microsoftDevBlogsMeta,
    translations: {
      fr: microsoftDevBlogsFr,
      en: microsoftDevBlogsEn,
    },
    data: microsoftDevBlogsData as RssFeedData,
  },
  {
    meta: developpezDotnetMeta,
    translations: {
      fr: developpezDotnetFr,
      en: developpezDotnetEn,
    },
    data: developpezDotnetData as RssFeedData,
  },
];

/**
 * Get RSS source by slug
 */
export function getRssSourceBySlug(slug: string): RssSource | undefined {
  return rssSources.find((source) => source.meta.slug === slug);
}

/**
 * Get all RSS feed URLs for fetching during build
 */
export function getAllRssFeedUrls(): Array<{ slug: string; feedUrl: string; maxItems: number }> {
  return rssSources.map((source) => ({
    slug: source.meta.slug,
    feedUrl: source.meta.feedUrl,
    maxItems: source.meta.maxItems || 10,
  }));
}
