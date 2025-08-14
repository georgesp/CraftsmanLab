import type { ComponentType } from 'react';
import type { Keyword } from '../../utils/constants';

export type TipMeta = {
  slug: string;
  title: string;
  shortDescription: string;
  writtenOn: string; // ISO date string
  keywords: Keyword[];
};

export type TipModule = {
  default: ComponentType;
  meta: TipMeta;
};
