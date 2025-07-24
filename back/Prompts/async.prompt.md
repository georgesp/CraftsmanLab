# Guide et Bonnes Pratiques Asynchronisme (.NET / ASP.NET Core)

Ce document regroupe les règles essentielles et les recommandations pour l’utilisation de l’asynchronisme en .NET et ASP.NET Core dans le projet CraftsmanLab. Il synthétise l’[AsyncGuidance de David Fowl](https://github.com/davidfowl/AspNetCoreDiagnosticScenarios/blob/master/AsyncGuidance.md).

## Objectif
- Garantir la performance, la fiabilité et la maintenabilité du code async
- Éviter les pièges courants et les erreurs fréquentes
- Uniformiser les pratiques dans tous les projets .NET du workspace

---

## 1. Utilisation de async/await (Mots-clés?: async, await, Task)

### Règles obligatoires
- Toujours utiliser `async`/`await` pour les opérations asynchrones
- Retourner `Task` ou `Task<T>` pour les méthodes asynchrones
- Ne jamais utiliser `.Result` ou `.Wait()` sur une Task (deadlock possible)
- Ne jamais utiliser `async void` sauf pour les gestionnaires d’événements

### À proscrire
- Blocage du thread principal avec `.Result` ou `.Wait()`
- Utilisation de `Task.Run` pour simuler l’asynchronisme dans ASP.NET Core

**Exemple correct**
```csharp
public async Task<string> GetDataAsync() => await _service.GetAsync();
```
**Exemple incorrect**
```csharp
public string GetData() => _service.GetAsync().Result; // Deadlock possible
```

---

## 2. Signature et conventions des méthodes asynchrones (Mots-clés?: Async, ValueTask)

- Les méthodes asynchrones doivent se terminer par "Async" (ex?: `GetUserAsync`)
- Retourner `Task` ou `Task<T>` (jamais `void` sauf pour les events)
- Utiliser `ValueTask<T>` pour les méthodes qui peuvent compléter de façon synchrone

---

## 3. Exceptions et async (Mots-clés?: try/catch, propagation)

- Les exceptions dans les méthodes async sont propagées via la Task
- Toujours utiliser `await` pour capturer les exceptions
- Ne pas envelopper les exceptions asynchrones dans des blocs try/catch synchrones

**Exemple**
```csharp
try
{
    await _service.DoWorkAsync();
}
catch(Exception ex)
{
    // Gestion de l’erreur
}
```

---

## 4. ConfigureAwait (Mots-clés?: ConfigureAwait, contexte de synchronisation)

- Utiliser `ConfigureAwait(false)` dans les bibliothèques et les services non liés à l’UI
- Ne pas utiliser `ConfigureAwait(false)` dans le code ASP.NET Core (le contexte n’est pas capturé)

---

## 5. Parallélisme et concurrence (Mots-clés?: Task.WhenAll, synchronisation)

- Utiliser `Task.WhenAll` pour exécuter plusieurs tâches en parallèle
- Attention à la synchronisation des accès concurrents (verrous, collections thread-safe)

**Exemple**
```csharp
await Task.WhenAll(task1, task2);
```

---

## 6. Cancellation (Mots-clés?: CancellationToken, annulation)

- Toujours accepter un `CancellationToken` dans les méthodes asynchrones exposées
- Propager le token à toutes les opérations asynchrones internes
- Vérifier régulièrement l’annulation avec `token.ThrowIfCancellationRequested()`

**Exemple**
```csharp
public async Task DoWorkAsync(CancellationToken cancellationToken)
{
    cancellationToken.ThrowIfCancellationRequested();
    await _service.LongOperationAsync(cancellationToken);
}
```

---

## 7. Deadlocks et synchronisation (Mots-clés?: deadlock, thread principal)

- Ne jamais bloquer le thread principal avec `.Result` ou `.Wait()`
- Préférer l’asynchronisme de bout en bout (end-to-end async)
- Attention aux contextes de synchronisation (UI, ASP.NET, etc.)

---

## 8. Bonnes pratiques générales (Mots-clés?: async, I/O, documentation)

- Utiliser l’asynchronisme uniquement si nécessaire (I/O, opérations longues)
- Ne pas rendre une méthode async si elle n’appelle aucune opération asynchrone
- Documenter les méthodes asynchrones et leur comportement

---

## 9. Tests et async (Mots-clés?: xUnit, await, test async)

- Utiliser les méthodes de test asynchrones (`async Task`) dans xUnit
- Toujours awaiter les opérations asynchrones dans les tests

**Exemple**
```csharp
[Fact]
public async Task TestAsync()
{
    var result = await _service.GetDataAsync();
    Assert.NotNull(result);
}
```

---

## Pour aller plus loin
- Se référer à la documentation officielle .NET et à l’[AsyncGuidance](https://github.com/davidfowl/AspNetCoreDiagnosticScenarios/blob/master/AsyncGuidance.md)
- Respecter ces règles pour garantir la robustesse et la performance du code
