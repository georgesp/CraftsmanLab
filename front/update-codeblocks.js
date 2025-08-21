#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

// Liste des fichiers à mettre à jour
const files = [
  'src/components/tips/nsubstitute/nsubstitute.tsx',
  'src/components/tips/xunit/xunit.tsx',
  'src/components/tips/dapper/dapper.tsx',
  'src/components/tips/polly/polly.tsx'
];

function updateCodeBlocks(filePath) {
  console.log(`Updating ${filePath}...`);
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Pattern pour trouver les CodeBlock sans language
  const codeBlockRegex = /(<CodeBlock)(\s+(?!language=)[^>]*)(>)/g;
  
  // Remplacer par CodeBlock avec language="csharp"
  const updatedContent = content.replace(codeBlockRegex, (match, openTag, attributes, closeTag) => {
    // Si le CodeBlock contient déjà un attribut language, on ne change rien
    if (attributes.includes('language=')) {
      return match;
    }
    
    // Détecter si c'est probablement du bash/shell (commandes dotnet, npm, etc.)
    const codeMatch = attributes.match(/code=\{`([^`]+)`\}/);
    if (codeMatch) {
      const code = codeMatch[1];
      if (code.includes('dotnet ') || code.includes('npm ') || code.includes('Install-Package')) {
        return `${openTag} language="bash"${attributes}${closeTag}`;
      }
    }
    
    // Par défaut, ajouter language="csharp"
    return `${openTag} language="csharp"${attributes}${closeTag}`;
  });
  
  if (content !== updatedContent) {
    fs.writeFileSync(filePath, updatedContent, 'utf8');
    console.log(`✅ Updated ${filePath}`);
  } else {
    console.log(`⚪ No changes needed for ${filePath}`);
  }
}

// Traiter tous les fichiers
files.forEach(file => {
  const fullPath = path.join(process.cwd(), file);
  if (fs.existsSync(fullPath)) {
    updateCodeBlocks(fullPath);
  } else {
    console.log(`❌ File not found: ${fullPath}`);
  }
});

console.log('✨ All files processed!');
