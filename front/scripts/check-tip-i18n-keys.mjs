#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

const root = process.cwd();
const tipsRoot = path.join(root, 'src', 'components', 'tips');

/** Known tip files*/
const tipConfigs = [
  { name: 'dapper', tsx: 'dapper/dapper.tsx', jsonDir: 'dapper', keyPrefix: 'dapper' },
  { name: 'xunit', tsx: 'xunit/xunit.tsx', jsonDir: 'xunit', keyPrefix: 'xunit' },
  { name: 'nsubstitute', tsx: 'nsubstitute/nsubstitute.tsx', jsonDir: 'nsubstitute', keyPrefix: 'nsubstitute' },
  { name: 'facet', tsx: 'facet/facet.tsx', jsonDir: 'facet', keyPrefix: 'facet' },
  { name: 'collection', tsx: 'collection/collection.tsx', jsonDir: 'collection', keyPrefix: 'collection' },
  { name: 'key-value-collection', tsx: 'keyValueCollection/key-value-collection.tsx', jsonDir: 'keyValueCollection', keyPrefix: 'keyValueCollection' },
  { name: 'central-package-management', tsx: 'cpm/central-package-management.tsx', jsonDir: 'cpm', keyPrefix: 'cpm' },
  { name: 'automapper', tsx: 'automapper/automapper.tsx', jsonDir: 'automapper', keyPrefix: 'automapper' },
  { name: 'switch-tuple', tsx: 'tic/switch-tuple.tsx', jsonDir: 'tic', keyPrefix: 'switch-tuple' },
];

const read = (p) => fs.readFileSync(p, 'utf8');
const safeJSON = (text, fallback = {}) => { try { return JSON.parse(text); } catch { return fallback; } };

const extractKeys = (code) => {
  const keys = new Set();
  const re = /\bt\(\s*(["'])(.+?)\1/g; // matches t('...') or t("...")
  let m;
  while ((m = re.exec(code)) !== null) {
    keys.add(m[2]);
  }
  return Array.from(keys);
};

const get = (obj, pathStr) => {
  return pathStr.split('.').reduce((acc, k) => (acc && Object.prototype.hasOwnProperty.call(acc, k) ? acc[k] : undefined), obj);
};

const report = [];

for (const tip of tipConfigs) {
  const tsxPath = path.join(tipsRoot, tip.tsx);
  const frPath = path.join(tipsRoot, tip.jsonDir, 'fr.json');
  const enPath = path.join(tipsRoot, tip.jsonDir, 'en.json');

  const entry = { tip: tip.name, tsxPath, frPath, enPath, ok: true, missing: { fr: [], en: [] }, totals: { used: 0 } };

  try {
    if (!fs.existsSync(tsxPath)) throw new Error('TSX not found');
    const code = read(tsxPath);
  const keys = extractKeys(code).filter(k => k.startsWith((tip.keyPrefix || tip.name) + '.'));
    entry.totals.used = keys.length;

    const frJson = fs.existsSync(frPath) ? safeJSON(read(frPath)) : {};
    const enJson = fs.existsSync(enPath) ? safeJSON(read(enPath)) : {};

    for (const key of keys) {
      const frVal = get(frJson, key);
      if (typeof frVal === 'undefined') entry.missing.fr.push(key);
      const enVal = get(enJson, key);
      if (typeof enVal === 'undefined') entry.missing.en.push(key);
    }

    entry.ok = entry.missing.fr.length === 0 && entry.missing.en.length === 0;
  } catch (e) {
    entry.ok = false;
    entry.error = e.message;
  }

  report.push(entry);
}

// Pretty print
console.log('🔎 Vérification des clés i18n des tips (hors Polly)');
console.log('='.repeat(70));
for (const r of report) {
  const status = r.ok ? '✅ OK' : '⚠️  Manquantes';
  console.log(`\n${status}  ${r.tip}`);
  if (r.error) {
    console.log('  ❌ Erreur:', r.error);
    continue;
  }
  console.log(`  Clés utilisées: ${r.totals.used}`);
  if (r.missing.fr.length) {
    console.log('  FR manquantes:');
    r.missing.fr.forEach(k => console.log('   -', k));
  }
  if (r.missing.en.length) {
    console.log('  EN manquantes:');
    r.missing.en.forEach(k => console.log('   -', k));
  }
}

const totalTips = report.length;
const allOk = report.every(r => r.ok);
console.log('\nRésumé');
console.log('-'.repeat(20));
console.log(`Tips vérifiés: ${totalTips}`);
console.log(`Tous OK: ${allOk ? '✅ oui' : '❌ non'}`);
