import type { ComponentType } from 'react';

export type PromptMeta = {
  slug: string;
  title: string;
  shortDescription: string;
};

export type PromptModule = {
  default: ComponentType;
  meta: PromptMeta;
};
