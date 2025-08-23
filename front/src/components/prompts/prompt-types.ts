import type { ComponentType } from 'react';
import type { Keyword } from '../../utils/constants';

export type PromptMetadata = {
  searchKeywords: {
    fr: string[];
    en: string[];
  };
};

export type PromptMeta = {
  slug: string;
  title: string;
  shortDescription: string;
  // ISO date string used for ordering and display
  writtenOn: string;
  keywords: Keyword[];
  metadata?: PromptMetadata;
};

export type PromptModule = {
  default: ComponentType;
  meta: PromptMeta;
};
