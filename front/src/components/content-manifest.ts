// AUTO-GENERATED — do not edit manually.
// Run: npm run generate-manifest
//
// Central manifest for tips & prompts: static meta imports, static translation imports,
// and load() functions (dynamic import) for code-splitting without import.meta.glob.

import type { TipMeta } from './tips';
import type { PromptMeta } from './prompts/prompt-types';

// ----- Tips: metas (named imports) -----
import { meta as automapperMeta } from './tips/automapper/meta';
import { meta as avaloniaMeta } from './tips/avalonia/meta';
import { meta as closedxmlMeta } from './tips/closedxml/meta';
import { meta as collectionMeta } from './tips/collection/meta';
import { meta as cpmMeta } from './tips/cpm/meta';
import { meta as csharp11Meta } from './tips/csharp-11/meta';
import { meta as csharp12Meta } from './tips/csharp-12/meta';
import { meta as csharp14Meta } from './tips/csharp-14/meta';
import { meta as csharpDefaultInterfaceMethodsMeta } from './tips/csharp-default-interface-methods/meta';
import { meta as csharpPatternMatchingMeta } from './tips/csharp-pattern-matching/meta';
import { meta as csharpSolidPrinciplesMeta } from './tips/csharp-solid-principles/meta';
import { meta as dapperMeta } from './tips/dapper/meta';
import { meta as diffplexMeta } from './tips/diffplex/meta';
import { meta as dotnet10AsyncZipMeta } from './tips/dotnet-10-async-zip/meta';
import { meta as facetMeta } from './tips/facet/meta';
import { meta as keyValueCollectionMeta } from './tips/keyValueCollection/meta';
import { meta as kokoroSharpMeta } from './tips/kokoro-sharp/meta';
import { meta as mcpServersMeta } from './tips/mcp-servers/meta';
import { meta as microsoftExtensionsAiMeta } from './tips/microsoft-extensions-ai/meta';
import { meta as microsoftExtensionsResilienceMeta } from './tips/microsoft-extensions-resilience/meta';
import { meta as nsubstituteMeta } from './tips/nsubstitute/meta';
import { meta as pollyMeta } from './tips/polly/meta';
import { meta as queueStackMeta } from './tips/queue-stack/meta';
import { meta as ticMeta } from './tips/tic/meta';
import { meta as tickerqMeta } from './tips/tickerq/meta';
import { meta as tsqlApplyMeta } from './tips/tsql-apply/meta';
import { meta as tsqlOpenjsonMeta } from './tips/tsql-openjson/meta';
import { meta as tsqlSchemaOnlyMeta } from './tips/tsql-schema-only/meta';
import { meta as xunitMeta } from './tips/xunit/meta';

export type TipEntry = TipMeta & { load: () => Promise<any> };

export const tipsEntries: TipEntry[] = [
  { ...automapperMeta, load: () => import('./tips/automapper/automapper') },
  { ...avaloniaMeta, load: () => import('./tips/avalonia/avalonia') },
  { ...closedxmlMeta, load: () => import('./tips/closedxml/closedxml') },
  { ...collectionMeta, load: () => import('./tips/collection/collection') },
  { ...cpmMeta, load: () => import('./tips/cpm/central-package-management') },
  { ...csharp11Meta, load: () => import('./tips/csharp-11/csharp-11') },
  { ...csharp12Meta, load: () => import('./tips/csharp-12/csharp-12') },
  { ...csharp14Meta, load: () => import('./tips/csharp-14/csharp-14') },
  { ...csharpDefaultInterfaceMethodsMeta, load: () => import('./tips/csharp-default-interface-methods/csharp-default-interface-methods') },
  { ...csharpPatternMatchingMeta, load: () => import('./tips/csharp-pattern-matching/csharp-pattern-matching') },
  { ...csharpSolidPrinciplesMeta, load: () => import('./tips/csharp-solid-principles/csharp-solid-principles') },
  { ...dapperMeta, load: () => import('./tips/dapper/dapper') },
  { ...diffplexMeta, load: () => import('./tips/diffplex/diffplex') },
  { ...dotnet10AsyncZipMeta, load: () => import('./tips/dotnet-10-async-zip/dotnet-10-async-zip') },
  { ...facetMeta, load: () => import('./tips/facet/facet') },
  { ...keyValueCollectionMeta, load: () => import('./tips/keyValueCollection/key-value-collection') },
  { ...kokoroSharpMeta, load: () => import('./tips/kokoro-sharp/kokoro-sharp') },
  { ...mcpServersMeta, load: () => import('./tips/mcp-servers/mcp-servers') },
  { ...microsoftExtensionsAiMeta, load: () => import('./tips/microsoft-extensions-ai/microsoft-extensions-ai') },
  { ...microsoftExtensionsResilienceMeta, load: () => import('./tips/microsoft-extensions-resilience/microsoft-extensions-resilience') },
  { ...nsubstituteMeta, load: () => import('./tips/nsubstitute/nsubstitute') },
  { ...pollyMeta, load: () => import('./tips/polly/polly') },
  { ...queueStackMeta, load: () => import('./tips/queue-stack/queue-stack') },
  { ...ticMeta, load: () => import('./tips/tic/switch-tuple') },
  { ...tickerqMeta, load: () => import('./tips/tickerq/tickerq') },
  { ...tsqlApplyMeta, load: () => import('./tips/tsql-apply/tsql-apply') },
  { ...tsqlOpenjsonMeta, load: () => import('./tips/tsql-openjson/tsql-openjson') },
  { ...tsqlSchemaOnlyMeta, load: () => import('./tips/tsql-schema-only/tsql-schema-only') },
  { ...xunitMeta, load: () => import('./tips/xunit/xunit') },
];

// ----- Prompts: metas -----
import { meta as aspnetCoreGuidancesMeta } from './prompts/aspnet-core-guidances/meta';
import { meta as asyncGuidancesMeta } from './prompts/async-guidances/meta';
import { meta as craftsmanlabRulesMeta } from './prompts/craftsmanlab-rules/meta';

export type PromptEntry = PromptMeta & { load: () => Promise<any> };

export const promptsEntries: PromptEntry[] = [
  { ...aspnetCoreGuidancesMeta, load: () => import('./prompts/aspnet-core-guidances/aspnet-core-guidances') },
  { ...asyncGuidancesMeta, load: () => import('./prompts/async-guidances/async-guidances') },
  { ...craftsmanlabRulesMeta, load: () => import('./prompts/craftsmanlab-rules/craftsmanlab-front-rules') },
];

// ----- Tips: translations -----
import automapperFr from './tips/automapper/fr.json';
import automapperEn from './tips/automapper/en.json';
import avaloniaFr from './tips/avalonia/fr.json';
import avaloniaEn from './tips/avalonia/en.json';
import closedxmlFr from './tips/closedxml/fr.json';
import closedxmlEn from './tips/closedxml/en.json';
import collectionFr from './tips/collection/fr.json';
import collectionEn from './tips/collection/en.json';
import cpmFr from './tips/cpm/fr.json';
import cpmEn from './tips/cpm/en.json';
import csharp11Fr from './tips/csharp-11/fr.json';
import csharp11En from './tips/csharp-11/en.json';
import csharp12Fr from './tips/csharp-12/fr.json';
import csharp12En from './tips/csharp-12/en.json';
import csharp14Fr from './tips/csharp-14/fr.json';
import csharp14En from './tips/csharp-14/en.json';
import csharpDefaultInterfaceMethodsFr from './tips/csharp-default-interface-methods/fr.json';
import csharpDefaultInterfaceMethodsEn from './tips/csharp-default-interface-methods/en.json';
import csharpPatternMatchingFr from './tips/csharp-pattern-matching/fr.json';
import csharpPatternMatchingEn from './tips/csharp-pattern-matching/en.json';
import csharpSolidPrinciplesFr from './tips/csharp-solid-principles/fr.json';
import csharpSolidPrinciplesEn from './tips/csharp-solid-principles/en.json';
import dapperFr from './tips/dapper/fr.json';
import dapperEn from './tips/dapper/en.json';
import diffplexFr from './tips/diffplex/fr.json';
import diffplexEn from './tips/diffplex/en.json';
import dotnet10AsyncZipFr from './tips/dotnet-10-async-zip/fr.json';
import dotnet10AsyncZipEn from './tips/dotnet-10-async-zip/en.json';
import facetFr from './tips/facet/fr.json';
import facetEn from './tips/facet/en.json';
import keyValueCollectionFr from './tips/keyValueCollection/fr.json';
import keyValueCollectionEn from './tips/keyValueCollection/en.json';
import kokoroSharpFr from './tips/kokoro-sharp/fr.json';
import kokoroSharpEn from './tips/kokoro-sharp/en.json';
import mcpServersFr from './tips/mcp-servers/fr.json';
import mcpServersEn from './tips/mcp-servers/en.json';
import microsoftExtensionsAiFr from './tips/microsoft-extensions-ai/fr.json';
import microsoftExtensionsAiEn from './tips/microsoft-extensions-ai/en.json';
import microsoftExtensionsResilienceFr from './tips/microsoft-extensions-resilience/fr.json';
import microsoftExtensionsResilienceEn from './tips/microsoft-extensions-resilience/en.json';
import nsubstituteFr from './tips/nsubstitute/fr.json';
import nsubstituteEn from './tips/nsubstitute/en.json';
import pollyFr from './tips/polly/fr.json';
import pollyEn from './tips/polly/en.json';
import queueStackFr from './tips/queue-stack/fr.json';
import queueStackEn from './tips/queue-stack/en.json';
import ticFr from './tips/tic/fr.json';
import ticEn from './tips/tic/en.json';
import tickerqFr from './tips/tickerq/fr.json';
import tickerqEn from './tips/tickerq/en.json';
import tsqlApplyFr from './tips/tsql-apply/fr.json';
import tsqlApplyEn from './tips/tsql-apply/en.json';
import tsqlOpenjsonFr from './tips/tsql-openjson/fr.json';
import tsqlOpenjsonEn from './tips/tsql-openjson/en.json';
import tsqlSchemaOnlyFr from './tips/tsql-schema-only/fr.json';
import tsqlSchemaOnlyEn from './tips/tsql-schema-only/en.json';
import xunitFr from './tips/xunit/fr.json';
import xunitEn from './tips/xunit/en.json';

export const tipsTranslationsFr = {
  ...automapperFr,
  ...avaloniaFr,
  ...closedxmlFr,
  ...collectionFr,
  ...cpmFr,
  ...csharp11Fr,
  ...csharp12Fr,
  ...csharp14Fr,
  ...csharpDefaultInterfaceMethodsFr,
  ...csharpPatternMatchingFr,
  ...csharpSolidPrinciplesFr,
  ...dapperFr,
  ...diffplexFr,
  ...dotnet10AsyncZipFr,
  ...facetFr,
  ...keyValueCollectionFr,
  ...kokoroSharpFr,
  ...mcpServersFr,
  ...microsoftExtensionsAiFr,
  ...microsoftExtensionsResilienceFr,
  ...nsubstituteFr,
  ...pollyFr,
  ...queueStackFr,
  ...ticFr,
  ...tickerqFr,
  ...tsqlApplyFr,
  ...tsqlOpenjsonFr,
  ...tsqlSchemaOnlyFr,
  ...xunitFr,
};

export const tipsTranslationsEn = {
  ...automapperEn,
  ...avaloniaEn,
  ...closedxmlEn,
  ...collectionEn,
  ...cpmEn,
  ...csharp11En,
  ...csharp12En,
  ...csharp14En,
  ...csharpDefaultInterfaceMethodsEn,
  ...csharpPatternMatchingEn,
  ...csharpSolidPrinciplesEn,
  ...dapperEn,
  ...diffplexEn,
  ...dotnet10AsyncZipEn,
  ...facetEn,
  ...keyValueCollectionEn,
  ...kokoroSharpEn,
  ...mcpServersEn,
  ...microsoftExtensionsAiEn,
  ...microsoftExtensionsResilienceEn,
  ...nsubstituteEn,
  ...pollyEn,
  ...queueStackEn,
  ...ticEn,
  ...tickerqEn,
  ...tsqlApplyEn,
  ...tsqlOpenjsonEn,
  ...tsqlSchemaOnlyEn,
  ...xunitEn,
};

// ----- Prompts: translations -----
import aspnetCoreGuidancesFr from './prompts/aspnet-core-guidances/fr.json';
import aspnetCoreGuidancesEn from './prompts/aspnet-core-guidances/en.json';
import asyncGuidancesFr from './prompts/async-guidances/fr.json';
import asyncGuidancesEn from './prompts/async-guidances/en.json';
import craftsmanlabRulesFr from './prompts/craftsmanlab-rules/fr.json';
import craftsmanlabRulesEn from './prompts/craftsmanlab-rules/en.json';

export const promptsTranslationsFr = {
  ...aspnetCoreGuidancesFr,
  ...asyncGuidancesFr,
  ...craftsmanlabRulesFr,
};

export const promptsTranslationsEn = {
  ...aspnetCoreGuidancesEn,
  ...asyncGuidancesEn,
  ...craftsmanlabRulesEn,
};
