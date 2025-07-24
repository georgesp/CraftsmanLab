# Guide et Bonnes Pratiques Asynchronisme (.NET / ASP.NET Core)

Ce document regroupe les r�gles essentielles et les recommandations pour l�utilisation de l�asynchronisme en .NET et ASP.NET Core dans le projet CraftsmanLab. Il synth�tise l�[AsyncGuidance de David Fowl](https://github.com/davidfowl/AspNetCoreDiagnosticScenarios/blob/master/AsyncGuidance.md).

## Objectif
- Garantir la performance, la fiabilit� et la maintenabilit� du code async
- �viter les pi�ges courants et les erreurs fr�quentes
- Uniformiser les pratiques dans tous les projets .NET du workspace

---

## 1. Utilisation de async/await (Mots-cl�s?: async, await, Task)

### R�gles obligatoires
- Toujours utiliser `async`/`await` pour les op�rations asynchrones
- Retourner `Task` ou `Task<T>` pour les m�thodes asynchrones
- Ne jamais utiliser `.Result` ou `.Wait()` sur une Task (deadlock possible)
- Ne jamais utiliser `async void` sauf pour les gestionnaires d��v�nements

### � proscrire
- Blocage du thread principal avec `.Result` ou `.Wait()`
- Utilisation de `Task.Run` pour simuler l�asynchronisme dans ASP.NET Core

**Exemple correct**
```csharp
public async Task<string> GetDataAsync() => await _service.GetAsync();
```
**Exemple incorrect**
```csharp
public string GetData() => _service.GetAsync().Result; // Deadlock possible
```

---

## 2. Signature et conventions des m�thodes asynchrones (Mots-cl�s?: Async, ValueTask)

- Les m�thodes asynchrones doivent se terminer par "Async" (ex?: `GetUserAsync`)
- Retourner `Task` ou `Task<T>` (jamais `void` sauf pour les events)
- Utiliser `ValueTask<T>` pour les m�thodes qui peuvent compl�ter de fa�on synchrone

---

## 3. Exceptions et async (Mots-cl�s?: try/catch, propagation)

- Les exceptions dans les m�thodes async sont propag�es via la Task
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
    // Gestion de l�erreur
}
```

---

## 4. ConfigureAwait (Mots-cl�s?: ConfigureAwait, contexte de synchronisation)

- Utiliser `ConfigureAwait(false)` dans les biblioth�ques et les services non li�s � l�UI
- Ne pas utiliser `ConfigureAwait(false)` dans le code ASP.NET Core (le contexte n�est pas captur�)

---

## 5. Parall�lisme et concurrence (Mots-cl�s?: Task.WhenAll, synchronisation)

- Utiliser `Task.WhenAll` pour ex�cuter plusieurs t�ches en parall�le
- Attention � la synchronisation des acc�s concurrents (verrous, collections thread-safe)

**Exemple**
```csharp
await Task.WhenAll(task1, task2);
```

---

## 6. Cancellation (Mots-cl�s?: CancellationToken, annulation)

- Toujours accepter un `CancellationToken` dans les m�thodes asynchrones expos�es
- Propager le token � toutes les op�rations asynchrones internes
- V�rifier r�guli�rement l�annulation avec `token.ThrowIfCancellationRequested()`

**Exemple**
```csharp
public async Task DoWorkAsync(CancellationToken cancellationToken)
{
    cancellationToken.ThrowIfCancellationRequested();
    await _service.LongOperationAsync(cancellationToken);
}
```

---

## 7. Deadlocks et synchronisation (Mots-cl�s?: deadlock, thread principal)

- Ne jamais bloquer le thread principal avec `.Result` ou `.Wait()`
- Pr�f�rer l�asynchronisme de bout en bout (end-to-end async)
- Attention aux contextes de synchronisation (UI, ASP.NET, etc.)

---

## 8. Bonnes pratiques g�n�rales (Mots-cl�s?: async, I/O, documentation)

- Utiliser l�asynchronisme uniquement si n�cessaire (I/O, op�rations longues)
- Ne pas rendre une m�thode async si elle n�appelle aucune op�ration asynchrone
- Documenter les m�thodes asynchrones et leur comportement

---

## 9. Tests et async (Mots-cl�s?: xUnit, await, test async)

- Utiliser les m�thodes de test asynchrones (`async Task`) dans xUnit
- Toujours awaiter les op�rations asynchrones dans les tests

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
- Se r�f�rer � la documentation officielle .NET et � l�[AsyncGuidance](https://github.com/davidfowl/AspNetCoreDiagnosticScenarios/blob/master/AsyncGuidance.md)
- Respecter ces r�gles pour garantir la robustesse et la performance du code
