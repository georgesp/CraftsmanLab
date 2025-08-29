import type { ComponentType } from 'react';
import type { Keyword } from '../../utils/constants';

export type TipMetadata = {
  searchKeywords: string[];
};

export type TipMeta = {
  slug: string;
  title: string;
  shortDescription: string;
  writtenOn: string; // ISO date string
  keywords: Keyword[];
  metadata?: TipMetadata;
};

export type TipModule = {
  default: ComponentType;
  meta: TipMeta;
};
