import { microsoftDevBlogsMeta, type RssSourceMeta } from './microsoft-devblogs/meta';
import microsoftDevBlogsFr from './microsoft-devblogs/fr.json';
import microsoftDevBlogsEn from './microsoft-devblogs/en.json';
import microsoftDevBlogsData from './microsoft-devblogs/data.json';
import { developpezDotnetMeta } from './developpez-dotnet/meta';
import developpezDotnetFr from './developpez-dotnet/fr.json';
import developpezDotnetEn from './developpez-dotnet/en.json';
import developpezDotnetData from './developpez-dotnet/data.json';
import { jonSkeetBlogMeta } from './jon-skeet-blog/meta';
import jonSkeetBlogFr from './jon-skeet-blog/fr.json';
import jonSkeetBlogEn from './jon-skeet-blog/en.json';
import jonSkeetBlogData from './jon-skeet-blog/data.json';
import { thomasLevesqueBlogMeta } from './thomas-levesque-blog/meta';
import thomasLevesqueBlogFr from './thomas-levesque-blog/fr.json';
import thomasLevesqueBlogEn from './thomas-levesque-blog/en.json';
import thomasLevesqueBlogData from './thomas-levesque-blog/data.json';
import { dotnetTipsBlogMeta } from './dotnettips-blog/meta';
import dotnetTipsBlogFr from './dotnettips-blog/fr.json';
import dotnetTipsBlogEn from './dotnettips-blog/en.json';
import dotnetTipsBlogData from './dotnettips-blog/data.json';
import { jetbrainsDotnetBlogMeta } from './jetbrains-dotnet-blog/meta';
import jetbrainsDotnetBlogFr from './jetbrains-dotnet-blog/fr.json';
import jetbrainsDotnetBlogEn from './jetbrains-dotnet-blog/en.json';
import jetbrainsDotnetBlogData from './jetbrains-dotnet-blog/data.json';
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
  {
    meta: jonSkeetBlogMeta,
    translations: {
      fr: jonSkeetBlogFr,
      en: jonSkeetBlogEn,
    },
    data: jonSkeetBlogData as RssFeedData,
  },
  {
    meta: thomasLevesqueBlogMeta,
    translations: {
      fr: thomasLevesqueBlogFr,
      en: thomasLevesqueBlogEn,
    },
    data: thomasLevesqueBlogData as RssFeedData,
  },
  {
    meta: dotnetTipsBlogMeta,
    translations: {
      fr: dotnetTipsBlogFr,
      en: dotnetTipsBlogEn,
    },
    data: dotnetTipsBlogData as RssFeedData,
  },
  {
    meta: jetbrainsDotnetBlogMeta,
    translations: {
      fr: jetbrainsDotnetBlogFr,
      en: jetbrainsDotnetBlogEn,
    },
    data: jetbrainsDotnetBlogData as RssFeedData,
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
