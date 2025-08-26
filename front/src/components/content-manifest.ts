// Central manifest for tips & prompts: static meta imports, static translation imports,
// and load() functions (dynamic import) for code-splitting without import.meta.glob.

import type { TipMeta } from './tips';
import type { PromptMeta } from './prompts/prompt-types';

// ----- Tips: metas (named imports) -----
import { meta as pollyMeta } from './tips/polly/meta';
import { meta as dapperMeta } from './tips/dapper/meta';
import { meta as automapperMeta } from './tips/automapper/meta';
import { meta as xunitMeta } from './tips/xunit/meta';
import { meta as nsubstituteMeta } from './tips/nsubstitute/meta';
import { meta as facetMeta } from './tips/facet/meta';
import { meta as switchTupleMeta } from './tips/tic/meta';
import { meta as cpmMeta } from './tips/cpm/meta';
import { meta as collectionMeta } from './tips/collection/meta';
import { meta as keyValueCollectionMeta } from './tips/keyValueCollection/meta';

export type TipEntry = TipMeta & { load: () => Promise<any> };

export const tipsEntries: TipEntry[] = [
  { ...pollyMeta, load: () => import('./tips/polly/polly') },
  { ...dapperMeta, load: () => import('./tips/dapper/dapper') },
  { ...automapperMeta, load: () => import('./tips/automapper/automapper') },
  { ...xunitMeta, load: () => import('./tips/xunit/xunit') },
  { ...nsubstituteMeta, load: () => import('./tips/nsubstitute/nsubstitute') },
  { ...facetMeta, load: () => import('./tips/facet/facet') },
  { ...switchTupleMeta, load: () => import('./tips/tic/switch-tuple') },
  { ...cpmMeta, load: () => import('./tips/cpm/central-package-management') },
  { ...collectionMeta, load: () => import('./tips/collection/collection') },
  { ...keyValueCollectionMeta, load: () => import('./tips/keyValueCollection/key-value-collection') },
];

// ----- Prompts: metas -----
import { meta as craftsmanlabRulesMeta } from './prompts/craftsmanlab-rules/meta';
import { meta as aspnetGuidancesMeta } from './prompts/aspnet-core-guidances/meta';
import { meta as asyncGuidancesMeta } from './prompts/async-guidances/meta';

export type PromptEntry = PromptMeta & { load: () => Promise<any> };

export const promptsEntries: PromptEntry[] = [
  { ...craftsmanlabRulesMeta, load: () => import('./prompts/craftsmanlab-rules/craftsmanlab-front-rules') },
  { ...aspnetGuidancesMeta, load: () => import('./prompts/aspnet-core-guidances/aspnet-core-guidances') },
  { ...asyncGuidancesMeta, load: () => import('./prompts/async-guidances/async-guidances') },
];

// ----- Tips: translations -----
import pollyFr from './tips/polly/fr.json';
import pollyEn from './tips/polly/en.json';
import dapperFr from './tips/dapper/fr.json';
import dapperEn from './tips/dapper/en.json';
import automapperFr from './tips/automapper/fr.json';
import automapperEn from './tips/automapper/en.json';
import xunitFr from './tips/xunit/fr.json';
import xunitEn from './tips/xunit/en.json';
import nsubstituteFr from './tips/nsubstitute/fr.json';
import nsubstituteEn from './tips/nsubstitute/en.json';
import facetFr from './tips/facet/fr.json';
import facetEn from './tips/facet/en.json';
import switchTupleFr from './tips/tic/fr.json';
import switchTupleEn from './tips/tic/en.json';
import cpmFr from './tips/cpm/fr.json';
import cpmEn from './tips/cpm/en.json';
import collectionFr from './tips/collection/fr.json';
import collectionEn from './tips/collection/en.json';
import keyValueCollectionFr from './tips/keyValueCollection/fr.json';
import keyValueCollectionEn from './tips/keyValueCollection/en.json';

export const tipsTranslationsFr = {
  ...pollyFr,
  ...dapperFr,
  ...automapperFr,
  ...xunitFr,
  ...nsubstituteFr,
  ...facetFr,
  ...switchTupleFr,
  ...cpmFr,
  ...collectionFr,
  ...keyValueCollectionFr,
};

export const tipsTranslationsEn = {
  ...pollyEn,
  ...dapperEn,
  ...automapperEn,
  ...xunitEn,
  ...nsubstituteEn,
  ...facetEn,
  ...switchTupleEn,
  ...cpmEn,
  ...collectionEn,
  ...keyValueCollectionEn,
};

// ----- Prompts: translations -----
import craftsmanlabRulesFr from './prompts/craftsmanlab-rules/fr.json';
import craftsmanlabRulesEn from './prompts/craftsmanlab-rules/en.json';
import aspnetGuidancesFr from './prompts/aspnet-core-guidances/fr.json';
import aspnetGuidancesEn from './prompts/aspnet-core-guidances/en.json';
import asyncGuidancesFr from './prompts/async-guidances/fr.json';
import asyncGuidancesEn from './prompts/async-guidances/en.json';

export const promptsTranslationsFr = {
  ...craftsmanlabRulesFr,
  ...aspnetGuidancesFr,
  ...asyncGuidancesFr,
};

export const promptsTranslationsEn = {
  ...craftsmanlabRulesEn,
  ...aspnetGuidancesEn,
  ...asyncGuidancesEn,
};
