# Règles language
- Parler en français

# Règles de codage pour le projet CraftsmanLab.Sql

- Chaque classe d'implémentation doit avoir une interface correspondante dans le même dossier que la classe.
- Pour chaque classe d'implémentation, il doit exister une classe de test correspondante dans le projet CraftsmanLab.Sql.Tests.

## Conventions de nommage et bonnes pratiques C#
- Les noms de classes utilisent le PascalCase (ex: MaClasseSql).
- Les interfaces commencent par un "I" majuscule et utilisent le PascalCase (ex: IMaClasseSql).
- Les méthodes et propriétés utilisent le PascalCase.
- Les variables locales et paramètres utilisent le camelCase.
- Les noms doivent être explicites et refléter leur responsabilité.
- Les fichiers de test reprennent le nom de la classe testée suivi de "Tests" (ex: MaClasseSqlTests).
- Les espaces de noms suivent la structure du dossier (ex: CraftsmanLab.Sql.MonDossier).
- Chaque classe doit être dans son propre fichier. 

## IOC
- Utiliser l'injection de dépendances pour les classes qui dépendent d'autres services ou classes.
- Microsoft.Extensions.DependencyInjection est utilisé pour l'injection de dépendances.


## Tests
- Les tests doivent utiliser le framework xUnit et NSubstitute avec la dernière version stable.
- Les mock doivent être créés avec NSubstitute seulement pour les méthodes qui sont appelées dans le test.

## DB
- Utiliser Dapper pour les opérations de base de données.
