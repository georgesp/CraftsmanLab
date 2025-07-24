# R�gles de codage pour le projet CraftsmanLab.Sql

- Chaque classe d'impl�mentation doit avoir une interface correspondante dans le m�me dossier que la classe.
- Pour chaque classe d'impl�mentation, il doit exister une classe de test correspondante dans le projet CraftsmanLab.Sql.Tests.

## Conventions de nommage et bonnes pratiques C#
- Les noms de classes utilisent le PascalCase (ex: MaClasseSql).
- Les interfaces commencent par un "I" majuscule et utilisent le PascalCase (ex: IMaClasseSql).
- Les m�thodes et propri�t�s utilisent le PascalCase.
- Les variables locales et param�tres utilisent le camelCase.
- Les noms doivent �tre explicites et refl�ter leur responsabilit�.
- Les fichiers de test reprennent le nom de la classe test�e suivi de "Tests" (ex: MaClasseSqlTests).
- Les espaces de noms suivent la structure du dossier (ex: CraftsmanLab.Sql.MonDossier).

## IOC
- Utiliser l'injection de d�pendances pour les classes qui d�pendent d'autres services ou classes.
- Microsoft.Extensions.DependencyInjection est utilis� pour l'injection de d�pendances.


## Tests
- Les tests doivent utiliser le framework xUnit et NSubstitute.