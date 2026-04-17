// AUTO-GENERATES src/components/content-manifest.ts from the filesystem.
// Run: npm run generate-manifest
//
// Rules:
//  - A "tip" is any subdirectory under src/components/tips/ that contains meta.ts
//  - A "prompt" is any subdirectory under src/components/prompts/ that contains meta.ts
//  - The main component is the single .tsx file at the root of the content folder
//  - Variable names are derived from the folder name (camelCase, dashes removed)

import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Folder name → camelCase variable prefix  (e.g. "csharp-11" → "csharp11")
function toCamelCase(str) {
  return str.replace(/[-_]([a-zA-Z0-9])/g, (_, c) => c.toUpperCase());
}

// Returns the name (without extension) of the single .tsx component file in a folder.
// Throws if none is found.
async function findComponentFile(folderPath, folderName) {
  const files = await fs.readdir(folderPath);
  const tsxFiles = files.filter((f) => f.endsWith('.tsx'));
  if (tsxFiles.length === 0) {
    throw new Error(`No .tsx component file found in ${folderPath}`);
  }
  if (tsxFiles.length > 1) {
    // Prefer file matching the folder name; otherwise take the first one.
    const match = tsxFiles.find((f) => f === `${folderName}.tsx`);
    const chosen = match ?? tsxFiles[0];
    console.warn(`⚠️  Multiple .tsx files in ${folderPath} — using ${chosen}`);
    return chosen.replace('.tsx', '');
  }
  return tsxFiles[0].replace('.tsx', '');
}

// Scans a content directory and returns ordered list of content descriptors.
async function scanContentDir(dirPath) {
  const entries = await fs.readdir(dirPath, { withFileTypes: true });
  const items = [];

  for (const entry of entries.filter((e) => e.isDirectory())) {
    const metaPath = path.join(dirPath, entry.name, 'meta.ts');
    try {
      await fs.access(metaPath);
    } catch {
      continue; // No meta.ts → not a content folder
    }
    const component = await findComponentFile(path.join(dirPath, entry.name), entry.name);
    items.push({ folder: entry.name, component, varPrefix: toCamelCase(entry.name) });
  }

  // Alphabetical order → deterministic diffs
  items.sort((a, b) => a.folder.localeCompare(b.folder));
  return items;
}

function lines(...parts) {
  return parts.join('\n');
}

async function generate(tips, prompts) {
  const out = [];

  out.push(lines(
    '// AUTO-GENERATED — do not edit manually.',
    '// Run: npm run generate-manifest',
    '//',
    '// Central manifest for tips & prompts: static meta imports, static translation imports,',
    '// and load() functions (dynamic import) for code-splitting without import.meta.glob.',
    '',
    "import type { TipMeta } from './tips';",
    "import type { PromptMeta } from './prompts/prompt-types';",
    '',
  ));

  // Tips: meta imports
  out.push('// ----- Tips: metas (named imports) -----');
  for (const t of tips) {
    out.push(`import { meta as ${t.varPrefix}Meta } from './tips/${t.folder}/meta';`);
  }

  out.push(lines(
    '',
    'export type TipEntry = TipMeta & { load: () => Promise<any> };',
    '',
    'export const tipsEntries: TipEntry[] = [',
  ));
  for (const t of tips) {
    out.push(`  { ...${t.varPrefix}Meta, load: () => import('./tips/${t.folder}/${t.component}') },`);
  }
  out.push('];');

  // Prompts: meta imports
  out.push(lines('', '// ----- Prompts: metas -----'));
  for (const p of prompts) {
    out.push(`import { meta as ${p.varPrefix}Meta } from './prompts/${p.folder}/meta';`);
  }

  out.push(lines(
    '',
    'export type PromptEntry = PromptMeta & { load: () => Promise<any> };',
    '',
    'export const promptsEntries: PromptEntry[] = [',
  ));
  for (const p of prompts) {
    out.push(`  { ...${p.varPrefix}Meta, load: () => import('./prompts/${p.folder}/${p.component}') },`);
  }
  out.push('];');

  // Tips: translation imports
  out.push(lines('', '// ----- Tips: translations -----'));
  for (const t of tips) {
    out.push(`import ${t.varPrefix}Fr from './tips/${t.folder}/fr.json';`);
    out.push(`import ${t.varPrefix}En from './tips/${t.folder}/en.json';`);
  }

  out.push(lines('', 'export const tipsTranslationsFr = {'));
  for (const t of tips) out.push(`  ...${t.varPrefix}Fr,`);
  out.push('};');

  out.push(lines('', 'export const tipsTranslationsEn = {'));
  for (const t of tips) out.push(`  ...${t.varPrefix}En,`);
  out.push('};');

  // Prompts: translation imports
  out.push(lines('', '// ----- Prompts: translations -----'));
  for (const p of prompts) {
    out.push(`import ${p.varPrefix}Fr from './prompts/${p.folder}/fr.json';`);
    out.push(`import ${p.varPrefix}En from './prompts/${p.folder}/en.json';`);
  }

  out.push(lines('', 'export const promptsTranslationsFr = {'));
  for (const p of prompts) out.push(`  ...${p.varPrefix}Fr,`);
  out.push('};');

  out.push(lines('', 'export const promptsTranslationsEn = {'));
  for (const p of prompts) out.push(`  ...${p.varPrefix}En,`);
  out.push('};');

  return out.join('\n') + '\n';
}

async function main() {
  const srcDir = path.join(__dirname, '..', 'src', 'components');

  console.log('📋 Scanning content directories…');
  const tips = await scanContentDir(path.join(srcDir, 'tips'));
  const prompts = await scanContentDir(path.join(srcDir, 'prompts'));
  console.log(`   ${tips.length} tips found: ${tips.map((t) => t.folder).join(', ')}`);
  console.log(`   ${prompts.length} prompts found: ${prompts.map((p) => p.folder).join(', ')}`);

  const content = await generate(tips, prompts);

  const outputPath = path.join(srcDir, 'content-manifest.ts');
  await fs.writeFile(outputPath, content, 'utf-8');
  console.log(`\n✅ Generated ${path.relative(process.cwd(), outputPath)}`);
}

main().catch((err) => {
  console.error('❌', err.message);
  process.exit(1);
});
