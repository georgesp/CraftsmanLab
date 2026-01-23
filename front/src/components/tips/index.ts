import type { ComponentType } from 'react';

export type TipMeta = {
  slug: string;
  title: string;
  shortDescription: string;
  writtenOn: string; // ISO date string
  categories: string[];
  searchKeywords: string[];
};

export type TipModule = {
  default: ComponentType;
  meta: TipMeta;
};
