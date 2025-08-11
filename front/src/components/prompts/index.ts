import type { ComponentType } from 'react';

export type PromptMeta = {
	slug: string;
	title: string;
	shortDescription: string;
	// ISO date string (YYYY-MM-DD) used for ordering and display
	writtenOn: string;
};

export type PromptModule = {
	default: ComponentType;
	meta: PromptMeta;
};
