import React from 'react';
import { useTheme } from '@mui/material';
import { COLORS } from '../../../styles/colors';

export type SyntaxHighlighterProps = {
  code: string;
  language?: 'csharp' | 'javascript' | 'typescript' | 'json' | 'xml' | 'html' | 'css' | 'bash' | 'sql';
};

/**
 * SyntaxHighlighter
 * - Applique une coloration syntaxique simple basée sur des expressions régulières
 * - Reproduit les couleurs style GitHub pour C#
 */
export const SyntaxHighlighter: React.FC<SyntaxHighlighterProps> = ({
  code,
  language = 'csharp',
}) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  // Utiliser les couleurs centralisées depuis colors.ts
  const colors = isDark ? COLORS.sourceCode.dark : COLORS.sourceCode.light;

  const highlightCSharp = (code: string): JSX.Element[] => {
    const tokens: JSX.Element[] = [];
    let currentIndex = 0;

    // Fonction pour parser le contenu d'un attribut
    const parseAttributeContent = (content: string): JSX.Element[] => {
      const attributeTokens: JSX.Element[] = [];
      let attrIndex = 0;

      // Patterns spécifiques aux attributs
      const attrPatterns = [
        // typeof(), nameof()
        { regex: /\b(typeof|nameof)\s*\(/g, color: colors.keyword },
        // Noms de types/classes spécifiques (Facet, FacetKind, etc.)
        {
          regex:
            /\b(Facet|FacetKind|Person|User|Product|Entity|Point|Order|Customer|Record|Class|Struct)\b/g,
          color: colors.type,
        },
        // Noms de types génériques
        { regex: /\b[A-Z][a-zA-Z0-9]*(?:\.[A-Z][a-zA-Z0-9]*)*\b/g, color: colors.type },
        // Propriétés et champs (avec point)
        { regex: /\b[A-Z][a-zA-Z0-9]*\.[A-Z][a-zA-Z0-9]*\b/g, color: colors.text },
        // Chaînes de caractères
        { regex: /"([^"\\]|\\.)*"/g, color: colors.string },
        // Mots-clés et valeurs spéciales
        {
          regex: /\b(exclude|include|new|true|false|null|Email|Password)\b/g,
          color: colors.keyword,
        },
        // Parenthèses, virgules et opérateurs
        { regex: /[(),.:=]/g, color: colors.operator },
      ];

      const attrMatches: Array<{ start: number; end: number; color: string; text: string }> = [];

      attrPatterns.forEach((pattern) => {
        let match;
        const regex = new RegExp(pattern.regex.source, pattern.regex.flags);
        while ((match = regex.exec(content)) !== null) {
          attrMatches.push({
            start: match.index,
            end: match.index + match[0].length,
            color: pattern.color,
            text: match[0],
          });
        }
      });

      // Trier et éliminer les chevauchements
      attrMatches.sort((a, b) => a.start - b.start || b.end - a.end);
      const nonOverlappingAttr: typeof attrMatches = [];
      for (const match of attrMatches) {
        const hasOverlap = nonOverlappingAttr.some(
          (existing) => match.start < existing.end && match.end > existing.start,
        );
        if (!hasOverlap) {
          nonOverlappingAttr.push(match);
        }
      }

      nonOverlappingAttr.sort((a, b) => a.start - b.start);

      nonOverlappingAttr.forEach((match, index) => {
        if (match.start > attrIndex) {
          attributeTokens.push(
            <span key={`attr-text-${attrIndex}`} style={{ color: colors.attribute }}>
              {content.slice(attrIndex, match.start)}
            </span>,
          );
        }

        attributeTokens.push(
          <span key={`attr-match-${index}`} style={{ color: match.color }}>
            {match.text}
          </span>,
        );

        attrIndex = match.end;
      });

      if (attrIndex < content.length) {
        attributeTokens.push(
          <span key={`attr-text-end`} style={{ color: colors.attribute }}>
            {content.slice(attrIndex)}
          </span>,
        );
      }

      return attributeTokens;
    };

    // Patterns pour C#
    const patterns = [
      // Commentaires ligne
      { regex: /\/\/.*$/gm, color: colors.comment },
      // Commentaires bloc
      { regex: /\/\*[\s\S]*?\*\//g, color: colors.comment },
      // Chaînes interpolées C# ($"...")
      { regex: /\$"([^"\\]|\\.)*"/g, color: colors.string },
      // Chaînes de caractères normales
      { regex: /"([^"\\]|\\.)*"/g, color: colors.string },
      // Attributs (traitement spécial)
      { regex: /\[[^\]]*\]/g, color: colors.attribute, special: 'attribute' },
      // Mots-clés C#
      {
        regex:
          /\b(abstract|as|base|bool|break|byte|case|catch|char|checked|class|const|continue|decimal|default|delegate|do|double|else|enum|event|explicit|extern|false|finally|fixed|float|for|foreach|goto|if|implicit|in|int|interface|internal|is|lock|long|namespace|new|null|object|operator|out|override|params|private|protected|public|readonly|ref|return|sbyte|sealed|short|sizeof|stackalloc|static|string|struct|switch|this|throw|true|try|typeof|uint|ulong|unchecked|unsafe|ushort|using|virtual|void|volatile|while|add|alias|ascending|async|await|by|descending|dynamic|equals|from|get|global|group|into|join|let|nameof|on|orderby|partial|remove|select|set|value|var|when|where|with|yield|record)\b/g,
        color: colors.keyword,
      },
      // Types système
      {
        regex:
          /\b(System|IEnumerable|ICollection|IList|List|Dictionary|Task|Action|Func|Exception|DateTime|TimeSpan|Guid|StringBuilder|IFacetMapConfiguration)\b/g,
        color: colors.type,
      },
      // Nombres
      { regex: /\b\d+\.?\d*[fFdDmM]?\b/g, color: colors.number },
      // Opérateurs
      { regex: /[+\-*/%=<>!&|^~?:;,.(){}]/g, color: colors.operator },
    ];

    const allMatches: Array<{
      start: number;
      end: number;
      color: string;
      text: string;
      special?: string;
    }> = [];

    // Trouver toutes les correspondances
    patterns.forEach((pattern) => {
      let match;
      const regex = new RegExp(pattern.regex.source, pattern.regex.flags);
      while ((match = regex.exec(code)) !== null) {
        allMatches.push({
          start: match.index,
          end: match.index + match[0].length,
          color: pattern.color,
          text: match[0],
          special: (pattern as any).special,
        });
      }
    });

    // Trier les correspondances par position
    allMatches.sort((a, b) => a.start - b.start || b.end - a.end);

    // Éliminer les chevauchements (garder le plus long ou le premier)
    const nonOverlapping: typeof allMatches = [];
    for (const match of allMatches) {
      const hasOverlap = nonOverlapping.some(
        (existing) => match.start < existing.end && match.end > existing.start,
      );
      if (!hasOverlap) {
        nonOverlapping.push(match);
      }
    }

    // Construire les éléments JSX
    nonOverlapping.sort((a, b) => a.start - b.start);

    nonOverlapping.forEach((match, index) => {
      // Ajouter le texte avant la correspondance
      if (match.start > currentIndex) {
        tokens.push(
          <span key={`text-${currentIndex}`} style={{ color: colors.text }}>
            {code.slice(currentIndex, match.start)}
          </span>,
        );
      }

      // Traitement spécial pour les attributs
      if (match.special === 'attribute') {
        // Séparer les crochets du contenu
        const attributeContent = match.text.slice(1, -1); // Enlever [ et ]
        tokens.push(
          <span key={`attr-bracket-open-${index}`} style={{ color: colors.attribute }}>
            [
          </span>,
        );
        // Parser le contenu avec coloration spécialisée
        const attributeTokens = parseAttributeContent(attributeContent);
        attributeTokens.forEach((token, tokenIndex) => {
          tokens.push(<span key={`attr-content-${index}-${tokenIndex}`}>{token}</span>);
        });
        tokens.push(
          <span key={`attr-bracket-close-${index}`} style={{ color: colors.attribute }}>
            ]
          </span>,
        );
      } else {
        // Ajouter la correspondance colorée normalement
        tokens.push(
          <span key={`match-${index}`} style={{ color: match.color }}>
            {match.text}
          </span>,
        );
      }

      currentIndex = match.end;
    });

    // Ajouter le texte restant
    if (currentIndex < code.length) {
      tokens.push(
        <span key={`text-end`} style={{ color: colors.text }}>
          {code.slice(currentIndex)}
        </span>,
      );
    }

    return tokens;
  };

  const highlightBash = (code: string): JSX.Element[] => {
    const tokens: JSX.Element[] = [];
    let currentIndex = 0;

    // Patterns pour Bash
    const patterns = [
      // Commentaires
      { regex: /#.*$/gm, color: colors.comment },
      // Commandes (début de ligne)
      { regex: /^[a-zA-Z][a-zA-Z0-9\-_]*(?=\s|$)/gm, color: colors.keyword },
      // Options avec tirets
      { regex: /--?[a-zA-Z0-9\-_]+/g, color: colors.attribute },
      // Chaînes de caractères
      { regex: /"([^"\\]|\\.)*"/g, color: colors.string },
      { regex: /'([^'\\]|\\.)*'/g, color: colors.string },
    ];

    const allMatches: Array<{ start: number; end: number; color: string; text: string }> = [];

    // Trouver toutes les correspondances
    patterns.forEach((pattern) => {
      let match;
      const regex = new RegExp(pattern.regex.source, pattern.regex.flags);
      while ((match = regex.exec(code)) !== null) {
        allMatches.push({
          start: match.index,
          end: match.index + match[0].length,
          color: pattern.color,
          text: match[0],
        });
      }
    });

    // Trier et éliminer les chevauchements
    allMatches.sort((a, b) => a.start - b.start || b.end - a.end);
    const nonOverlapping: typeof allMatches = [];
    for (const match of allMatches) {
      const hasOverlap = nonOverlapping.some(
        (existing) => match.start < existing.end && match.end > existing.start,
      );
      if (!hasOverlap) {
        nonOverlapping.push(match);
      }
    }

    // Construire les éléments JSX
    nonOverlapping.sort((a, b) => a.start - b.start);

    nonOverlapping.forEach((match, index) => {
      if (match.start > currentIndex) {
        tokens.push(
          <span key={`text-${currentIndex}`} style={{ color: colors.text }}>
            {code.slice(currentIndex, match.start)}
          </span>,
        );
      }

      tokens.push(
        <span key={`match-${index}`} style={{ color: match.color }}>
          {match.text}
        </span>,
      );

      currentIndex = match.end;
    });

    if (currentIndex < code.length) {
      tokens.push(
        <span key={`text-end`} style={{ color: colors.text }}>
          {code.slice(currentIndex)}
        </span>,
      );
    }

    return tokens;
  };

  const highlightXml = (code: string): JSX.Element[] => {
    const tokens: JSX.Element[] = [];
    let currentIndex = 0;

    // Patterns pour XML
    const patterns = [
      // Commentaires XML
      { regex: /<!--[\s\S]*?-->/g, color: colors.comment },
      // Balises (ouverture/fermeture)
      { regex: /<\/?[a-zA-Z][a-zA-Z0-9\-._]*(?:\s[^>]*)?\/?>/g, color: colors.keyword },
      // Attributs et valeurs
      { regex: /(\w+)=(["'])((?:(?!\2)[^\\]|\\.)*)(\2)/g, color: colors.attribute },
      // Chaînes de caractères
      { regex: /"([^"\\]|\\.)*"/g, color: colors.string },
      { regex: /'([^'\\]|\\.)*'/g, color: colors.string },
      // Déclaration XML
      { regex: /<\?xml[^?]*\?>/g, color: colors.type },
    ];

    const allMatches: Array<{ start: number; end: number; color: string; text: string }> = [];

    // Trouver toutes les correspondances
    patterns.forEach((pattern) => {
      let match;
      const regex = new RegExp(pattern.regex.source, pattern.regex.flags);
      while ((match = regex.exec(code)) !== null) {
        allMatches.push({
          start: match.index,
          end: match.index + match[0].length,
          color: pattern.color,
          text: match[0],
        });
      }
    });

    // Trier et éliminer les chevauchements
    allMatches.sort((a, b) => a.start - b.start || b.end - a.end);
    const nonOverlapping: typeof allMatches = [];
    for (const match of allMatches) {
      const hasOverlap = nonOverlapping.some(
        (existing) => match.start < existing.end && match.end > existing.start,
      );
      if (!hasOverlap) {
        nonOverlapping.push(match);
      }
    }

    // Construire les éléments JSX
    nonOverlapping.sort((a, b) => a.start - b.start);

    nonOverlapping.forEach((match, index) => {
      if (match.start > currentIndex) {
        tokens.push(
          <span key={`text-${currentIndex}`} style={{ color: colors.text }}>
            {code.slice(currentIndex, match.start)}
          </span>,
        );
      }

      tokens.push(
        <span key={`match-${index}`} style={{ color: match.color }}>
          {match.text}
        </span>,
      );

      currentIndex = match.end;
    });

    if (currentIndex < code.length) {
      tokens.push(
        <span key={`text-end`} style={{ color: colors.text }}>
          {code.slice(currentIndex)}
        </span>,
      );
    }

    return tokens;
  };

  const highlightCode = (code: string, language: string): JSX.Element[] => {
    switch (language) {
      case 'csharp':
        return highlightCSharp(code);
      case 'bash':
        return highlightBash(code);
      case 'xml':
        return highlightXml(code);
      case 'sql': {
        // Minimal SQL highlighting: comments, strings, keywords, numbers
        const tokens: JSX.Element[] = [];
        let currentIndex = 0;
        const sqlKeywords =
          /(SELECT|FROM|WHERE|JOIN|INNER|LEFT|RIGHT|FULL|OUTER|CROSS|APPLY|TOP|ORDER BY|GROUP BY|HAVING|ON|AS|AND|OR|NOT|NULL|IS|IN|EXISTS|CASE|WHEN|THEN|ELSE|END|INSERT|INTO|VALUES|UPDATE|SET|DELETE|CREATE|TABLE|VIEW|FUNCTION|RETURNS|RETURN|WITH|NOLOCK)\b/gi;
        const patterns = [
          { regex: /--.*$/gm, color: colors.comment },
          { regex: /\/\*[\s\S]*?\*\//g, color: colors.comment },
          { regex: /'([^'\\]|\\.)*'/g, color: colors.string },
          { regex: sqlKeywords, color: colors.keyword },
          { regex: /\b\d+\b/g, color: colors.number },
          { regex: /[(),.*=<>+-]/g, color: colors.operator },
        ];
        const allMatches: Array<{ start: number; end: number; color: string; text: string }> = [];
        patterns.forEach((p) => {
          let m;
          const r = new RegExp(p.regex.source, p.regex.flags);
          while ((m = r.exec(code)) !== null) {
            allMatches.push({ start: m.index, end: m.index + m[0].length, color: p.color, text: m[0] });
          }
        });
        allMatches.sort((a, b) => a.start - b.start || b.end - a.end);
        const nonOverlap: typeof allMatches = [];
        for (const m of allMatches) {
          const overlap = nonOverlap.some((e) => m.start < e.end && m.end > e.start);
          if (!overlap) nonOverlap.push(m);
        }
        nonOverlap.sort((a, b) => a.start - b.start);
        for (const [i, m] of nonOverlap.entries()) {
          if (m.start > currentIndex) {
            tokens.push(
              <span key={`sql-text-${currentIndex}`} style={{ color: colors.text }}>
                {code.slice(currentIndex, m.start)}
              </span>,
            );
          }
          tokens.push(
            <span key={`sql-match-${i}`} style={{ color: m.color }}>
              {m.text}
            </span>,
          );
          currentIndex = m.end;
        }
        if (currentIndex < code.length) {
          tokens.push(
            <span key={`sql-end`} style={{ color: colors.text }}>
              {code.slice(currentIndex)}
            </span>,
          );
        }
        return tokens;
      }
      default:
        // Pour les autres langages, retourner le code sans coloration pour l'instant
        return [
          <span key="plain" style={{ color: colors.text }}>
            {code}
          </span>,
        ];
    }
  };

  return <>{highlightCode(code, language)}</>;
};

export default SyntaxHighlighter;
