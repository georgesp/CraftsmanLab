import { useState } from 'react';
import { Box, Typography, Link, IconButton, Snackbar, Alert } from '@mui/material';
import { ContentCopy } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import type { PromptModule } from '..';
import { CodeBlock } from '../../ui/CodeBlock';
import { COLORS } from 'styles/colors';
import { meta } from './meta';

export const promptText = `# Guide et bonnes pratiques — Serveur MCP en C# (SDK officiel v2.0)

## Objectif
- Produire un serveur Model Context Protocol en C# conforme au SDK officiel v2.0 (spécification du 28 juillet 2026)
- Rester déployable en serverless, en multi-instance et derrière un load balancer sans routage collant
- Exposer des outils que le modèle appelle correctement dès le premier essai

---

## 1. Choix des packages (Mots-clés: NuGet, packages)

Cinq packages composables, ciblant .NET 8.0 à .NET 10.0 et netstandard2.0 :
- \`ModelContextProtocol\` — serveur, cœur du SDK
- \`ModelContextProtocol.AspNetCore\` — hébergement HTTP
- \`ModelContextProtocol.Core\` — client minimal
- \`ModelContextProtocol.Extensions.Tasks\` — outils longs
- \`ModelContextProtocol.Extensions.Apps\` — interfaces interactives (expérimental)

### Règles
- N'installe que ce dont tu as besoin : ne référence pas les extensions expérimentales par défaut
- Épingle les versions dans \`Directory.Packages.props\` (Central Package Management)

---

## 2. Stateless par défaut (Mots-clés: session, scalabilité)

La v2.0 supprime le handshake \`initialize\` et l'en-tête \`Mcp-Session-Id\`.

### Règles obligatoires
- Ne stocke aucun état de conversation en mémoire du processus
- Chaque appel d'outil doit être auto-suffisant : tout ce qui est nécessaire arrive dans ses paramètres
- Si un état est indispensable, externalise-le (base, cache distribué) avec une clé passée en paramètre
- Ne suppose jamais que deux appels successifs touchent la même instance

### À proscrire
- Champs statiques mutables partagés entre requêtes
- Caches en mémoire portant des données utilisateur
- Sticky sessions imposées au load balancer

---

## 3. Conception des outils (Mots-clés: tools, description, schéma)

- Un outil = une action précise, nommée en verbe explicite
- La description est lue par le modèle : décris quand utiliser l'outil, pas seulement ce qu'il fait
- Type de retour simple et sérialisable ; évite les graphes d'objets profonds
- Paramètres typés, obligatoires quand ils le sont réellement, avec des valeurs par défaut sinon
- Documente les unités, les formats de date et les bornes directement dans la description
- Accepte un \`CancellationToken\` et propage-le à toutes les opérations asynchrones

### À proscrire
- Un outil fourre-tout piloté par un paramètre \`action\` de type chaîne
- Des descriptions vagues du style « récupère des données »
- Le retour de blobs volumineux non tronqués

---

## 4. En-têtes HTTP standardisés (Mots-clés: Mcp-Method, McpHeader)

Le trafic MCP utilise désormais des en-têtes comme \`Mcp-Method\` et \`Mcp-Name\`, ce qui permet à l'infrastructure HTTP de router sans inspecter le corps de la requête.

### Règles
- Utilise l'attribut \`[McpHeader]\` pour promouvoir un paramètre en en-tête quand le routage géographique ou par tenant en dépend
- Ne mets jamais de secret dans un en-tête promu : il traverse toute la chaîne d'infrastructure
- Conserve la compatibilité : le SDK v2.0 accepte le code v1 et les versions antérieures du protocole

---

## 5. Requêtes multi-aller-retour (Mots-clés: MRTR, InputRequiredException)

Un outil interactif peut demander une saisie sans session persistante.

### Fonctionnement
1. L'outil lève \`InputRequiredException\` en décrivant ce qu'il attend
2. Le client collecte la réponse auprès de l'utilisateur
3. Le client rejoue l'appel avec \`InputResponses\` renseigné

### Règles
- Réserve ce mécanisme aux confirmations, aux consentements et aux choix ambigus
- L'outil doit rester idempotent : il sera appelé plusieurs fois avec les mêmes paramètres
- Ne déclenche jamais l'effet de bord avant d'avoir reçu la confirmation

---

## 6. Erreurs et journalisation (Mots-clés: erreurs, logs)

- Retourne des messages d'erreur exploitables par le modèle : ce qui a échoué et ce qu'il peut tenter ensuite
- Ne renvoie jamais de stack trace ni de détail d'infrastructure au client
- Journalise avec \`ILogger\` en incluant le nom de l'outil et un identifiant de corrélation
- Distingue clairement erreur d'entrée (le modèle peut corriger) et erreur système (inutile de réessayer)

---

## 7. Sécurité (Mots-clés: authentification, autorisation)

- Authentifie au niveau du transport HTTP, jamais dans les paramètres d'outil
- Applique les autorisations à chaque appel : en stateless, aucun contexte n'est hérité
- Valide et borne toutes les entrées : un outil MCP est une surface d'attaque exposée à un modèle
- Limite le débit par appelant et par outil
- Sépare explicitement les outils en lecture seule des outils qui écrivent

---

## 8. Tests (Mots-clés: xUnit, intégration)

- Teste chaque outil comme une méthode ordinaire, sans passer par le protocole
- Ajoute des tests d'intégration sur le transport HTTP, y compris le rejeu MRTR
- Vérifie explicitement l'absence d'état partagé : exécute deux appels concurrents sur la même instance
- Contrôle que les descriptions d'outils restent synchronisées avec le comportement réel

---

## 9. Déploiement (Mots-clés: serverless, multi-instance)

- Cible un hébergement sans affinité de session : conteneur, App Service, Lambda, Container Apps
- Expose une sonde de santé distincte du point d'entrée MCP
- Publie la version du protocole supportée et surveille les avertissements de dépréciation du SDK
- Migre l'extension Tasks si tu utilisais sa version expérimentale : elle a été redessinée en v2.0

---

## Pour aller plus loin
- Documentation du SDK C# MCP et annonce de la v2.0 sur le blog .NET
- Vérifie systématiquement la version de spécification implémentée par ta version du SDK`;

const PromptBody: React.FC = () => {
  const { t } = useTranslation('prompts');
  const [showCopySuccess, setShowCopySuccess] = useState(false);
  const writtenOn = meta.writtenOn
    ? new Date(meta.writtenOn).toLocaleDateString('fr-FR')
    : new Date().toLocaleDateString('fr-FR');

  const useCases = t('mcp-server-csharp-guidances.content.useCases', {
    returnObjects: true,
  }) as string[];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(promptText);
      setShowCopySuccess(true);
    } catch {
      setShowCopySuccess(false);
    }
  };

  const handleCloseSnackbar = () => {
    setShowCopySuccess(false);
  };

  return (
    <Box>
      <Typography variant="body1" sx={{ mb: 2 }}>
        {t('mcp-server-csharp-guidances.content.introduction')}
      </Typography>
      <Box sx={{ borderTop: '1px solid', borderColor: 'grey.300', mb: 3 }} />

      <Box sx={{ position: 'relative' }}>
        <IconButton
          onClick={handleCopy}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            zIndex: 1,
            backgroundColor: COLORS.overlay.lightSemi,
            borderRadius: 0,
            border: '1px solid',
            borderColor: 'grey.300',
            width: 32,
            height: 32,
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background 0.2s, color 0.2s',
            color: COLORS.copyBtnColor,
            '&:hover': {
              color: COLORS.copyBtnColorHover,
            },
          }}
          size="small"
          title={t('mcp-server-csharp-guidances.content.copyButton')}
        >
          <ContentCopy fontSize="small" />
        </IconButton>
        <CodeBlock code={promptText} />
      </Box>

      <Snackbar
        open={showCopySuccess}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          {t('mcp-server-csharp-guidances.content.copySuccess')}
        </Alert>
      </Snackbar>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          {t('mcp-server-csharp-guidances.content.useCasesTitle')}
        </Typography>
        <Box component="ul" sx={{ pl: 3, mb: 0 }}>
          {Array.isArray(useCases) &&
            useCases.map((item, i) => (
              <li key={i}>
                <Typography component="span" variant="body2" color="text.secondary">
                  {item}
                </Typography>
              </li>
            ))}
        </Box>
      </Box>

      <Box sx={{ mt: 4, pt: 3, borderTop: '1px solid', borderColor: 'grey.300' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
            flexWrap: 'wrap',
          }}
        >
          <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
            {t('mcp-server-csharp-guidances.content.sources')}{' '}
            <Link
              href="https://devblogs.microsoft.com/dotnet/announcing-v20-of-the-official-mcp-csharp-sdk/"
              target="_blank"
              rel="noopener noreferrer"
            >
              .NET Blog
            </Link>
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontStyle: 'italic', textAlign: 'left' }}
          >
            {t('mcp-server-csharp-guidances.content.writtenOn')} {writtenOn}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

const moduleExport: PromptModule = {
  default: PromptBody,
  meta,
};

export default PromptBody;
export { moduleExport };
