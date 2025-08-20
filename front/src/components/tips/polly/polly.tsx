import React from 'react';
import type { TipModule } from '..';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { CodeBlock } from '../../ui/CodeBlock/CodeBlock';

export const meta = {
  slug: 'polly',
  title: 'Polly',
  shortDescription: 'Ajouter de la résilience à vos appels : retry, circuit breaker, timeout et fallback.',
  writtenOn: '2025-08-20',
  keywords: ['C#' as const],
};

const PollyTip: React.FC = () => {
  return (
    <Box>
      <Typography variant="h3" gutterBottom>Polly : la stratégie de résilience pour vos appels externes</Typography>
      
      <Typography paragraph>
        Polly est une petite bibliothèque open‑source (NuGet) qui vous permet d'ajouter des stratégies de résilience à votre code, sans y passer tout votre temps.
      </Typography>
      
      <Typography paragraph>
        On l'utilise surtout pour :
      </Typography>
      <Typography component="ul" sx={{ ml: 2 }}>
        <li>les requêtes HTTP qui échouent parfois,</li>
        <li>les appels à des bases de données ou services externes,</li>
        <li>n'importe quelle opération qui peut lancer une exception et que vous ne voulez pas laisser tomber sur le premier échec.</li>
      </Typography>
      
      <Typography paragraph>
        En gros, Polly vous donne un gabarit (retry, circuit breaker, timeout, fallback…) que vous appliquez à votre logique métier. 
        Pas de code répétitif, juste un objet Policy que vous composez.
      </Typography>

  <Typography variant="h4" gutterBottom sx={{ mt: 3 }}>Installation</Typography>
      
  <Typography variant="h5" gutterBottom>NuGet</Typography>
      <CodeBlock
        code={`# Depuis la console du gestionnaire de packages
Install-Package Polly

# ou avec .NET CLI
dotnet add package Polly`}
      />
      
      <Typography paragraph>
        Polly ne dépend d'aucun framework particulier, donc vous pouvez l'utiliser dans un projet .NET Core, .NET 5/6/7 ou même Mono/Xamarin.
        Si vous utilisez ASP.NET Core, il y a aussi <code>Microsoft.Extensions.Http.Polly</code> qui intègre Polly directement aux clients HttpClientFactory.
      </Typography>

  <Typography variant="h4" gutterBottom sx={{ mt: 3 }}>Le principe</Typography>
      
  <Typography variant="h5" gutterBottom>Un Policy = une règle de gestion d'erreur</Typography>
      <CodeBlock
        code={`var retryPolicy = Policy
    .Handle<IOException>()          // on cible les IOException
    .WaitAndRetry(3, attempt => TimeSpan.FromSeconds(Math.Pow(2, attempt)));`}
      />
      
      <Typography component="ul" sx={{ ml: 2, mt: 2 }}>
        <li><code>Handle&lt;TException&gt;()</code> : indique quelles exceptions la politique doit gérer.</li>
        <li><code>WaitAndRetry(...)</code> : définit le nombre de tentatives et l'intervalle entre chaque essai.</li>
      </Typography>
      
      <Typography paragraph sx={{ mt: 2 }}>
        Une fois que vous avez un Policy, vous pouvez l'appliquer à une action :
      </Typography>
      <CodeBlock
        code={`retryPolicy.Execute(() => File.ReadAllText("data.txt"));`}
      />
      
      <Typography paragraph>
        Polly se charge de réexécuter la lambda si une IOException est levée, jusqu'à ce que le nombre d'essais soit épuisé ou que l'opération réussisse.
      </Typography>

  <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>Les types de politiques les plus courants</Typography>
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Type</strong></TableCell>
              <TableCell><strong>Quand l'utiliser ?</strong></TableCell>
              <TableCell><strong>Exemple rapide</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Retry</TableCell>
              <TableCell>Échecs temporaires (timeout, 5xx)</TableCell>
              <TableCell><code>{'Policy.Handle<Exception>().Retry(3)'}</code></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Circuit Breaker</TableCell>
              <TableCell>Besoin d'éviter de surcharger un service qui est déjà en panne</TableCell>
              <TableCell><code>{'Policy.Handle<Exception>().CircuitBreaker(2, TimeSpan.FromSeconds(30))'}</code></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Timeout</TableCell>
              <TableCell>Limiter la durée d'une opération</TableCell>
              <TableCell><code>Policy.Timeout(TimeSpan.FromSeconds(5))</code></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Fallback</TableCell>
              <TableCell>Retourner une valeur par défaut ou lancer une autre action quand tout échoue</TableCell>
              <TableCell><code>{'Policy.Handle<Exception>().Fallback(() => "fallback")'}</code></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

  <Typography variant="h4" gutterBottom sx={{ mt: 3 }}>Exemples concrets</Typography>
      
  <Typography variant="h5" gutterBottom>Retry + Timeout sur un appel HTTP</Typography>
      <CodeBlock
        code={`using Polly;
using System.Net.Http;

// 1) Créez un HttpClient (ou utilisez IHttpClientFactory)
var client = new HttpClient();

// 2) Définissez les politiques
var timeoutPolicy = Policy.Timeout<HttpResponseMessage>(TimeSpan.FromSeconds(3));
var retryPolicy = Policy.Handle<Exception>()
                       .WaitAndRetryAsync(
                           retryCount: 3,
                           sleepDurationProvider: attempt => TimeSpan.FromMilliseconds(200 * attempt)
                       );

// 3) Composez les deux politiques
var policyWrap = Policy.WrapAsync(retryPolicy, timeoutPolicy);

// 4) Exécutez l'appel HTTP avec la politique
var response = await policyWrap.ExecuteAsync(async () =>
{
    return await client.GetAsync("https://example.com/api/data");
});

Console.WriteLine($"Status : {response.StatusCode}");`}
      />
      
      <Typography paragraph sx={{ mt: 2 }}>
        <strong>Astuce :</strong> si vous utilisez ASP.NET Core, créez un HttpClient via IHttpClientFactory, puis enregistrez la politique dans le conteneur. 
        Polly s'intègre automatiquement.
      </Typography>

  <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>Circuit Breaker + Fallback</Typography>
      <CodeBlock
        code={`var circuitBreaker = Policy.Handle<Exception>()
                           .CircuitBreakerAsync(
                               exceptionsAllowedBeforeBreaking: 2,
                               durationOfBreak: TimeSpan.FromSeconds(10)
                           );

var fallback = Policy<string>
               .Handle<Exception>()
               .FallbackAsync("service unavailable");

var policyWrap = Policy.WrapAsync(fallback, circuitBreaker);

string result = await policyWrap.ExecuteAsync(async () =>
{
    // Simulez un appel à un service qui peut échouer
    return await SomeExternalService.GetDataAsync();
});

Console.WriteLine(result);`}
      />
      
      <Typography paragraph sx={{ mt: 2 }}>
        Dans cet exemple :
      </Typography>
      <Typography component="ul" sx={{ ml: 2 }}>
        <li>Si le service lève une exception deux fois de suite, Polly ouvre le circuit et bloque les appels pendant 10 s.</li>
        <li>Pendant que le circuit est ouvert, la fallback renvoie immédiatement "service unavailable" sans appeler le service.</li>
      </Typography>

  <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>Retry avec back‑off exponentiel</Typography>
      <CodeBlock
        code={`var retryPolicy = Policy.Handle<Exception>()
    .WaitAndRetryAsync(
        retryCount: 5,
        sleepDurationProvider: attempt => TimeSpan.FromSeconds(Math.Pow(2, attempt))
    );

await retryPolicy.ExecuteAsync(async () =>
{
    await SomeOperationThatMayFail();
});`}
      />

  <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>Intégration avec HttpClientFactory (ASP.NET Core)</Typography>
      <CodeBlock
        code={`services.AddHttpClient("myclient")
        .AddPolicyHandler(HttpPolicyExtensions
            .HandleTransientHttpError()
            .RetryAsync(3))
        .AddPolicyHandler(HttpPolicyExtensions
            .HandleTransientHttpError()
            .CircuitBreakerAsync(5, TimeSpan.FromSeconds(30)));`}
      />
      
      <Typography paragraph sx={{ mt: 2 }}>
        <code>HandleTransientHttpError()</code> est un raccourci qui cible les 408/500/502/503/504 et TimeoutException.
      </Typography>

  <Typography variant="h4" gutterBottom sx={{ mt: 3 }}>Bonnes pratiques</Typography>
      
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Règle</strong></TableCell>
              <TableCell><strong>Pourquoi</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Ne retry que sur des erreurs transitoires</TableCell>
              <TableCell>Un retry sur une erreur logique (404) n'a aucun sens.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Limitez le nombre d'essais</TableCell>
              <TableCell>Trop de tentatives peuvent retarder votre application inutilement.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Combinez avec un circuit breaker</TableCell>
              <TableCell>Si la cible est réellement hors service, éviter de saturer votre réseau.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Ajoutez un fallback</TableCell>
              <TableCell>Offrez une expérience utilisateur plus fluide plutôt que de tout planter.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Testez vos politiques</TableCell>
              <TableCell>Utilisez des tests unitaires (xUnit + Polly.Testing) pour valider le comportement en cas d'échec.</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

  <Typography variant="h4" gutterBottom sx={{ mt: 3 }}>En résumé</Typography>
      <Typography paragraph>
        Polly vous donne un framework léger mais puissant pour rendre vos appels externes plus robustes : retry, timeout, circuit breaker, fallback… 
        Vous écrivez votre logique métier une seule fois et vous appliquez la politique en un appel Execute. 
        C'est simple à mettre en place, très flexible, et ça s'intègre parfaitement dans l'écosystème .NET.
      </Typography>
      
      <Typography paragraph>
        Prêt à rendre vos services plus résilients ? Lancez les commandes NuGet, créez votre première Policy et voyez la différence !
      </Typography>

      <Box mt={4} pt={2} borderTop={theme => `1px solid ${theme.palette.divider}`}
        sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="caption" component="div" sx={{ fontStyle: 'italic', color: 'text.secondary' }}>
          Sources : <a href="https://github.com/App-vNext/Polly" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>
            Documentation officielle
          </a> • <a href="https://github.com/App-vNext/Polly/blob/main/docs/polly.md" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>
            Guide complet
          </a>
        </Typography>
        <Typography variant="caption" component="div" sx={{ color: 'text.secondary' }}>
          Écrit le {meta.writtenOn}
        </Typography>
      </Box>
    </Box>
  );
};

const mod: TipModule = { default: PollyTip, meta };
export default PollyTip;
export { mod };
