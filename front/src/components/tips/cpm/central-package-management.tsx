import React from 'react';
import type { TipModule } from '..';
import { Box, Typography } from '@mui/material';

export const meta = {
  slug: 'central-package-management',
  title: 'Central Package Management (CPM)',
  shortDescription: 'Uniformiser les versions NuGet dans votre solution .NET avec CPM',
  writtenOn: '2025-08-16',
  keywords: ['C#' as const],
};

const CentralPackageManagementTip: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>Central Package Management (CPM) pour un projet .NET</Typography>
      <Typography variant="subtitle1" gutterBottom sx={{ fontStyle: 'italic', color: 'text.secondary' }}>
        (Un petit guide sans prise de tête)
      </Typography>
      
      <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>Pourquoi l'utiliser ?</Typography>
      <ul>
        <li><strong>Uniformité :</strong> Toutes les références NuGet dans votre solution pointent vers la même version d'un package. Fini les conflits où ProjectA utilise Newtonsoft.Json v12.x et ProjectB v13.x.</li>
        <li><strong>Maintenance simplifiée :</strong> Vous mettez à jour une seule fois le fichier Directory.Packages.props, pas des dizaines de fichiers .csproj.</li>
        <li><strong>Audit plus clair :</strong> On voit d'un coup d'œil quelles versions sont réellement installées dans la solution.</li>
      </ul>

      <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>Mise en place pas à pas</Typography>
      <Typography paragraph sx={{ fontWeight: 'bold' }}>
        Prérequis : .NET SDK 6+ (ou 7, 8). Visual Studio 2022+ ou VS Code + CLI.
      </Typography>

      <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>1. Créez votre solution (si ce n'est déjà fait)</Typography>
      <Box component="pre" sx={{ bgcolor: 'grey.100', p: 2, borderRadius: 1, overflow: 'auto' }}>
        <code>dotnet new sln -n MySolution</code>
      </Box>
      
      <Typography paragraph sx={{ mt: 2 }}>Ajoutez vos projets :</Typography>
      <Box component="pre" sx={{ bgcolor: 'grey.100', p: 2, borderRadius: 1, overflow: 'auto' }}>
        <code>{`dotnet new classlib -o src/LibA
dotnet new console -o src/App
dotnet sln add src/**/*.csproj`}</code>
      </Box>

      <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>2. Activez CPM</Typography>
      <Typography paragraph>
        Dans la racine de votre solution, créez un fichier <code>Directory.Packages.props</code> :
      </Typography>
      <Box component="pre" sx={{ bgcolor: 'grey.100', p: 2, borderRadius: 1, overflow: 'auto' }}>
        <code>{`<?xml version="1.0" encoding="utf-8"?>
<Project>
  <ItemGroup>
    <!-- Centralized package versions -->
    <PackageVersion Include="Newtonsoft.Json" Version="13.0.3" />
    <PackageVersion Include="Serilog" Version="2.12.0" />
  </ItemGroup>
</Project>`}</code>
      </Box>

      <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>3. Modifiez les projets pour qu'ils utilisent CPM</Typography>
      <Typography paragraph>
        Dans chaque fichier .csproj :
      </Typography>
      <Box component="pre" sx={{ bgcolor: 'grey.100', p: 2, borderRadius: 1, overflow: 'auto' }}>
        <code>{`<Project Sdk="Microsoft.NET.Sdk">
  <ItemGroup>
    <PackageReference Include="Newtonsoft.Json" />
    <PackageReference Include="Serilog" />
  </ItemGroup>
</Project>`}</code>
      </Box>
      <Typography paragraph>
        <strong>Important :</strong> Si un projet avait déjà une version définie, supprimez-la. Le SDK se chargera de récupérer la valeur du fichier central.
      </Typography>

      <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>4. Vérifiez</Typography>
      <Box component="pre" sx={{ bgcolor: 'grey.100', p: 2, borderRadius: 1, overflow: 'auto' }}>
        <code>dotnet restore</code>
      </Box>
      <Typography paragraph>
        Vous devriez voir que les packages sont récupérés à partir des versions déclarées dans Directory.Packages.props. Ouvrez un .csproj ; il n'y aura plus de <code>&lt;PackageReference ... Version="..."&gt;</code>.
      </Typography>

      <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>Que fait CPM en arrière-plan ?</Typography>
      <ul>
        <li>Le SDK intercepte chaque référence de package.</li>
        <li>Il lit les versions dans le fichier central (ou dans des fichiers parents si la solution est hiérarchisée).</li>
        <li>Si aucune version n'est trouvée, l'opération échoue et vous indique où corriger.</li>
      </ul>

      <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>Bonnes pratiques</Typography>
      <Box component="table" sx={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', padding: '8px', borderBottom: '1px solid #ddd' }}>Astuce</th>
            <th style={{ textAlign: 'left', padding: '8px', borderBottom: '1px solid #ddd' }}>Pourquoi</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>Versionnez votre Directory.Packages.props</td>
            <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>Vous pouvez le pousser dans Git avec un tag de release pour garantir que tous les développeurs utilisent la même base.</td>
          </tr>
          <tr>
            <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>Utilisez <code>dotnet list package --outdated</code></td>
            <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>Pour voir rapidement quelles dépendances sont obsolètes par rapport à votre fichier central.</td>
          </tr>
          <tr>
            <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>Bloquez les mises à jour automatiques (<code>RestoreLockedMode="true"</code>)</td>
            <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>Si vous avez des tests de régression, verrouillez la résolution pour éviter que des versions mineures inattendues ne passent en production.</td>
          </tr>
        </tbody>
      </Box>

      <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>Résumé rapide</Typography>
      <ul>
        <li>Créez <code>Directory.Packages.props</code> dans la racine.</li>
        <li>Déclarez les packages et leurs versions une seule fois.</li>
        <li>Retirez toutes les spécifications de version dans chaque .csproj.</li>
        <li>Faites un <code>dotnet restore</code>.</li>
      </ul>

      <Box mt={4} pt={2} borderTop={theme => `1px solid ${theme.palette.divider}`}
        sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="caption" component="div" sx={{ fontStyle: 'italic', color: 'text.secondary' }}>
          <a href="https://learn.microsoft.com/en-us/dotnet/core/packaging/central-package-management" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>
            Source : Microsoft Docs – Central Package Management
          </a>
        </Typography>
        <Typography variant="caption" component="div" sx={{ color: 'text.secondary' }}>
          Écrit le {meta.writtenOn}
        </Typography>
      </Box>
    </Box>
  );
};

const mod: TipModule = { default: CentralPackageManagementTip, meta };
export default CentralPackageManagementTip;
export { mod };
