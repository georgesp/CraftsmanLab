import React, { useState } from 'react';
import { Box, Typography, Link, IconButton, Snackbar, Alert } from '@mui/material';
import { ContentCopy } from '@mui/icons-material';
import type { PromptModule } from '..';
import { CodeBlock } from '../styles';

export const promptText = `# Guide et Bonnes Pratiques Asynchronisme (.NET / ASP.NET Core)

## Objectif
- Garantir la performance, la fiabilité et la maintenabilité du code async
- Éviter les pièges courants et les erreurs fréquentes
- Uniformiser les pratiques dans tous les projets .NET du workspace

---

## 1. Utilisation de async/await (Mots-clés: async, await, Task)

### Règles obligatoires
- Toujours utiliser \`async\`/\`await\` pour les opérations asynchrones
- Retourner \`Task\` ou \`Task<T>\` pour les méthodes asynchrones
- Ne jamais utiliser \`.Result\` ou \`.Wait()\` sur une Task (deadlock possible)
- Ne jamais utiliser \`async void\` sauf pour les gestionnaires d'événements

### À proscrire
- Blocage du thread principal avec \`.Result\` ou \`.Wait()\`
- Utilisation de \`Task.Run\` pour simuler l'asynchronisme dans ASP.NET Core

**Exemple correct**
\`\`\`csharp
public async Task<string> GetDataAsync() => await _service.GetAsync();
\`\`\`
**Exemple incorrect**
\`\`\`csharp
public string GetData() => _service.GetAsync().Result; // Deadlock possible
\`\`\`

---

## 2. Signature et conventions des méthodes asynchrones (Mots-clés: Async, ValueTask)

- Les méthodes asynchrones doivent se terminer par "Async" (ex: \`GetUserAsync\`)
- Retourner \`Task\` ou \`Task<T>\` (jamais \`void\` sauf pour les events)
- Utiliser \`ValueTask<T>\` pour les méthodes qui peuvent compléter de façon synchrone

---

## 3. Exceptions et async (Mots-clés: try/catch, propagation)

- Les exceptions dans les méthodes async sont propagées via la Task
- Toujours utiliser \`await\` pour capturer les exceptions
- Ne pas envelopper les exceptions asynchrones dans des blocs try/catch synchrones

**Exemple**
\`\`\`csharp
try
{
    await _service.DoWorkAsync();
}
catch(Exception ex)
{
    // Gestion de l'erreur
}
\`\`\`

---

## 4. ConfigureAwait (Mots-clés: ConfigureAwait, contexte de synchronisation)

- Utiliser \`ConfigureAwait(false)\` dans les bibliothèques et les services non liés à l'UI
- Ne pas utiliser \`ConfigureAwait(false)\` dans le code ASP.NET Core (le contexte n'est pas capturé)

---

## 5. Parallélisme et concurrence (Mots-clés: Task.WhenAll, synchronisation)

- Utiliser \`Task.WhenAll\` pour exécuter plusieurs tâches en parallèle
- Attention à la synchronisation des accès concurrents (verrous, collections thread-safe)

**Exemple**
\`\`\`csharp
await Task.WhenAll(task1, task2);
\`\`\`

---

## 6. Cancellation (Mots-clés: CancellationToken, annulation)

- Toujours accepter un \`CancellationToken\` dans les méthodes asynchrones exposées
- Propager le token à toutes les opérations asynchrones internes
- Vérifier régulièrement l'annulation avec \`token.ThrowIfCancellationRequested()\`

**Exemple**
\`\`\`csharp
public async Task DoWorkAsync(CancellationToken cancellationToken)
{
    cancellationToken.ThrowIfCancellationRequested();
    await _service.LongOperationAsync(cancellationToken);
}
\`\`\`

---

## 7. Deadlocks et synchronisation (Mots-clés: deadlock, thread principal)

- Ne jamais bloquer le thread principal avec \`.Result\` ou \`.Wait()\`
- Préférer l'asynchronisme de bout en bout (end-to-end async)
- Attention aux contextes de synchronisation (UI, ASP.NET, etc.)

---

## 8. Bonnes pratiques générales (Mots-clés: async, I/O, documentation)

- Utiliser l'asynchronisme uniquement si nécessaire (I/O, opérations longues)
- Ne pas rendre une méthode async si elle n'appelle aucune opération asynchrone
- Documenter les méthodes asynchrones et leur comportement

---

## 9. Tests et async (Mots-clés: xUnit, await, test async)

- Utiliser les méthodes de test asynchrones (\`async Task\`) dans xUnit
- Toujours awaiter les opérations asynchrones dans les tests

**Exemple**
\`\`\`csharp
[Fact]
public async Task TestAsync()
{
    var result = await _service.GetDataAsync();
    Assert.NotNull(result);
}
\`\`\`

---

## Pour aller plus loin
- Se référer à la documentation officielle .NET et à l'[AsyncGuidance](https://github.com/davidfowl/AspNetCoreDiagnosticScenarios/blob/master/AsyncGuidance.md)
- Respecter ces règles pour garantir la robustesse et la performance du code`;

const PromptBody: React.FC = () => {
  const [showCopySuccess, setShowCopySuccess] = useState(false);
  const writtenOn = new Date().toLocaleDateString('fr-FR');

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(promptText);
      setShowCopySuccess(true);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleCloseSnackbar = () => {
    setShowCopySuccess(false);
  };

  return (
    <Box>

      <Typography variant="body1" sx={{ mb: 2 }}>
        Guide complet des bonnes pratiques pour l'asynchronisme en .NET et ASP.NET Core. 
        Ce document synthétise les règles essentielles pour éviter les pièges courants et 
        garantir la performance des applications.
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
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              borderRadius: 1,
              border: '1px solid',
              borderColor: 'grey.300',
              width: 32,
              height: 32,
              padding: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.2s, color 0.2s',
              color: 'inherit',
              '&:hover': {
                backgroundColor: 'primary.main',
                color: '#fff',
              },
            }}
            size="small"
            title="Copier le prompt"
          >
            <ContentCopy fontSize="small" />
          </IconButton>
        <CodeBlock component="pre" sx={{ border: '1px solid', borderColor: 'grey.300', borderRadius: 1 }}>
          {promptText}
        </CodeBlock>
      </Box>

      <Snackbar
        open={showCopySuccess}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Prompt copié dans le presse-papiers !
        </Alert>
      </Snackbar>

      <Box sx={{ mt: 4, pt: 3, borderTop: '1px solid', borderColor: 'grey.300' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
          <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
            Sources: Tiré de la page de{' '}
            <Link
              href="https://github.com/davidfowl/AspNetCoreDiagnosticScenarios/blob/master/AsyncGuidance.md"
              target="_blank"
              rel="noopener noreferrer"
            >
              David Fowler
            </Link>
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic', textAlign: 'right' }}>
            Écrit le {writtenOn}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export const meta = {
  slug: 'dot-net-async-best-practices',
  title: '.NET Async Best Practices',
  shortDescription: "Guide complet des bonnes pratiques asynchronisme .NET/ASP.NET Core avec exemples concrets.",
};

const moduleExport: PromptModule = {
  default: PromptBody,
  meta,
};

export default PromptBody;
export { moduleExport };
