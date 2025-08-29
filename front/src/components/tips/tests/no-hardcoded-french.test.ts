import * as fs from 'fs';
import * as path from 'path';

const TIPS_DIR = path.join(process.cwd(), 'src', 'components', 'tips');

// Accented characters commonly used in French
const FRENCH_ACCENTS = /[àâäéèêëîïôöùûüçœÀÂÄÉÈÊËÎÏÔÖÙÛÜÇŒ]/;
// Optional: a few French words to catch unaccented cases
const FRENCH_WORDS = /\b(?:et|ou|pour|avec|sans|dans|sur|déjà|très|plus|moins|résumé|écrit)\b/i;

function listFiles(dir: string): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      // skip ui and non-tip subfolders not relevant if any
      files.push(...listFiles(full));
    } else if (e.isFile() && full.endsWith('.tsx')) {
      files.push(full);
    }
  }
  return files;
}

function stripComments(src: string): string {
  // Remove /* */ comments
  let out = src.replace(/\/\*[\s\S]*?\*\//g, '');
  // Remove // comments
  out = out.replace(/(^|[^:])\/\/.*$/gm, '$1');
  return out;
}

function removeI18nCalls(src: string): string {
  // Remove t('...') / t("...") / t(`...`) occurrences
  return src
    .replace(/t\(\s*'[^']*'\s*(?:,\s*\{[^}]*\})?\)/g, 't(REMOVED)')
    .replace(/t\(\s*"[^"]*"\s*(?:,\s*\{[^}]*\})?\)/g, 't(REMOVED)')
    .replace(/t\(\s*`[^`]*`\s*(?:,\s*\{[^}]*\})?\)/g, 't(REMOVED)');
}

function removeMetadataBlocks(src: string): string {
  // Remove metadata: { ... } blocks to ignore localized searchKeywords arrays
  return src.replace(/metadata\s*:\s*\{[\s\S]*?\}\s*,?/g, '');
}

function extractStringLiterals(src: string): string[] {
  const strings: string[] = [];
  const re = /(['"`])((?:\\.|(?!\1)[\s\S])*)\1/gm;
  let m: RegExpExecArray | null;
  while ((m = re.exec(src)) !== null) {
    strings.push(m[2]);
  }
  return strings;
}

function extractJsxTextNodes(src: string): string[] {
  const texts: string[] = [];
  // Collapse whitespace to simplify
  const s = src.replace(/\s+/g, ' ');
  const re = />\s*([^<>{}][^<>]*)\s*</g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(s)) !== null) {
    const text = m[1].trim();
    if (text && /[A-Za-zÀ-ÿ]/.test(text)) {
      texts.push(text);
    }
  }
  return texts;
}

function looksFrench(text: string): boolean {
  if (FRENCH_ACCENTS.test(text)) return true;
  if (FRENCH_WORDS.test(text)) return true;
  return false;
}

describe('No hardcoded French text in tip TSX files', () => {
  const files = listFiles(TIPS_DIR);

  it('should not contain French copy directly in TSX (use i18n keys instead)', () => {
    const violations: { file: string; snippet: string; kind: 'string' | 'jsx' }[] = [];

    for (const file of files) {
      const src = fs.readFileSync(file, 'utf8');
      const noComments = stripComments(src);
      const noMeta = removeMetadataBlocks(noComments);
      const preprocessed = removeI18nCalls(noMeta);

      // 1) Scan string literals
      for (const lit of extractStringLiterals(preprocessed)) {
        // Whitelist common non-copy strings (languages, file paths, code, props)
        if (/^\s*$/.test(lit)) continue;
        if (
          /^([a-zA-Z0-9_\-\.\/:{}\[\]<>#`~!@\$%\^&\*\(\)\?=,+;\s]|\\n|\\t|\\r)+$/.test(lit) &&
          !looksFrench(lit)
        )
          continue;
        if (looksFrench(lit)) violations.push({ file, snippet: lit.slice(0, 160), kind: 'string' });
      }

      // 2) Scan JSX text nodes
      for (const text of extractJsxTextNodes(preprocessed)) {
        // Ignore placeholders like Unknown, ReadOnly, etc.
        if (looksFrench(text)) violations.push({ file, snippet: text.slice(0, 160), kind: 'jsx' });
      }
    }

    const message = violations.map((v) => `- ${v.file} [${v.kind}] -> ${v.snippet}`).join('\n');

    expect({ count: violations.length, details: message }).toEqual({ count: 0, details: '' });
  });
});
