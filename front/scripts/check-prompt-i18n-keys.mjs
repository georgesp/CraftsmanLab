#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

const root = process.cwd();
const promptsRoot = path.join(root, 'src', 'components', 'prompts');

const promptConfigs = [
  { name: 'craftsmanlab-rules', tsx: 'craftsmanlab-rules/craftsmanlab-front-rules.tsx', jsonDir: 'craftsmanlab-rules', keyPrefix: 'craftsmanlab-rules' },
  { name: 'aspnet-core-guidances', tsx: 'aspnet-core-guidances/aspnet-core-guidances.tsx', jsonDir: 'aspnet-core-guidances', keyPrefix: 'aspnet-core-guidances' },
  { name: 'dot-net-async-best-practices', tsx: 'async-guidances/async-guidances.tsx', jsonDir: 'async-guidances', keyPrefix: 'dot-net-async-best-practices' },
];

const read = (p) => fs.readFileSync(p, 'utf8');
const safeJSON = (text, fallback = {}) => {
  try { return JSON.parse(text); } catch { return fallback; }
};

const extractKeys = (code) => {
  const keys = new Set();
  const re = /\bt\(\s*(["'])(.+?)\1/g; // t('...') or t("...")
  let m; while ((m = re.exec(code)) !== null) keys.add(m[2]);
  return Array.from(keys);
};

const get = (obj, pathStr) => pathStr.split('.').reduce((acc, k) => (acc && Object.prototype.hasOwnProperty.call(acc, k) ? acc[k] : undefined), obj);

const report = [];

for (const prompt of promptConfigs) {
  const tsxPath = path.join(promptsRoot, prompt.tsx);
  const frPath = path.join(promptsRoot, prompt.jsonDir, 'fr.json');
  const enPath = path.join(promptsRoot, prompt.jsonDir, 'en.json');
  const entry = { prompt: prompt.name, tsxPath, frPath, enPath, ok: true, missing: { fr: [], en: [] }, totals: { used: 0 } };
  try {
    if (!fs.existsSync(tsxPath)) throw new Error('TSX not found');
    const code = read(tsxPath);
    const keys = extractKeys(code).filter((k) => k.startsWith((prompt.keyPrefix || prompt.name) + '.'));
    entry.totals.used = keys.length;
    const frJson = fs.existsSync(frPath) ? safeJSON(read(frPath)) : {};
    const enJson = fs.existsSync(enPath) ? safeJSON(read(enPath)) : {};
    for (const key of keys) {
      if (typeof get(frJson, key) === 'undefined') entry.missing.fr.push(key);
      if (typeof get(enJson, key) === 'undefined') entry.missing.en.push(key);
    }
    entry.ok = !entry.missing.fr.length && !entry.missing.en.length;
  } catch (e) { entry.ok = false; entry.error = e.message; }
  report.push(entry);
}

console.log('🔎 Vérification des clés i18n des prompts');
console.log('='.repeat(70));
for (const r of report) {
  const status = r.ok ? '✅ OK' : '⚠️  Manquantes';
  console.log(`\n${status}  ${r.prompt}`);
  if (r.error) { console.log('  ❌ Erreur:', r.error); continue; }
  console.log(`  Clés utilisées: ${r.totals.used}`);
  if (r.missing.fr.length) { console.log('  FR manquantes:'); r.missing.fr.forEach((k) => console.log('   -', k)); }
  if (r.missing.en.length) { console.log('  EN manquantes:'); r.missing.en.forEach((k) => console.log('   -', k)); }
}

const total = report.length;
const allOk = report.every((r) => r.ok);
console.log('\nRésumé');
console.log('-'.repeat(20));
console.log(`Prompts vérifiés: ${total}`);
console.log(`Tous OK: ${allOk ? '✅ oui' : '❌ non'}`);
