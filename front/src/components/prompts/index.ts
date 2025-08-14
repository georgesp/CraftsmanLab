import type { ComponentType } from 'react';
import type { Keyword } from '../../utils/constants';

export type PromptMeta = {
	slug: string;
	title: string;
	shortDescription: string;
	// ISO date string (YYYY-MM-DD) used for ordering and display
	writtenOn: string;
	keywords: Keyword[];
};

export type PromptModule = {
	default: ComponentType;
	meta: PromptMeta;
};
