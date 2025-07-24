# Guide et Bonnes Pratiques pour la conception d'API REST (CraftsmanLab)

Ce document synthétise les meilleures pratiques pour la conception d’API REST, basé sur l’article Stack Overflow?: [Best practices for REST API design](https://stackoverflow.blog/2020/03/02/best-practices-for-rest-api-design/).

## Objectif
- Garantir la clarté, la cohérence et la maintenabilité des APIs REST
- Faciliter l’intégration et l’utilisation des APIs dans le projet CraftsmanLab
- Éviter les pièges courants et les erreurs fréquentes
- Uniformiser les pratiques dans tous les projets .NET du workspace

---

## 1. Utilisation des verbes HTTP (Mots-clés?: GET, POST, PUT, PATCH, DELETE)

### Règles obligatoires
- Utiliser les verbes HTTP standards?:
  - `GET` pour la récupération de ressources
  - `POST` pour la création
  - `PUT` pour la mise à jour complète
  - `PATCH` pour la mise à jour partielle
  - `DELETE` pour la suppression

### À proscrire
- Utiliser des verbes dans les URLs (ex?: `/getUsers` au lieu de `/users`)

**Exemple**
```
GET /users
POST /users
GET /users/{id}
PUT /users/{id}
PATCH /users/{id}
DELETE /users/{id}
```

---

## 2. Conventions d’URL et de ressources (Mots-clés?: pluriel, identifiant, hiérarchie)

- Utiliser des noms de ressources au pluriel (ex?: `/users`, `/products`)
- Utiliser des identifiants pour accéder à une ressource spécifique (ex?: `/users/123`)
- Éviter les verbes dans les URLs (préférer `/users` à `/getUsers`)
- Organiser les URLs de façon hiérarchique si besoin (ex?: `/users/123/orders`)

---

## 3. Statuts HTTP (Mots-clés?: 200, 201, 204, 400, 404, 500)

### Règles obligatoires
- Retourner les statuts HTTP appropriés?:
  - `200 OK` pour une requête réussie
  - `201 Created` après une création
  - `204 No Content` après une suppression
  - `400 Bad Request` pour une requête invalide
  - `404 Not Found` si la ressource n’existe pas
  - `500 Internal Server Error` pour une erreur serveur

### À proscrire
- Retourner toujours 200 OK, même en cas d’erreur

---

## 4. Structuration des réponses (Mots-clés?: JSON, cohérence, clés explicites)

- Retourner des objets JSON structurés
- Inclure les données pertinentes et éviter les informations inutiles
- Utiliser des clés explicites et cohérentes
- Éviter les informations inutiles ou sensibles

**Exemple de réponse**
```json
{
  "id": 123,
  "name": "Jean Dupont",
  "email": "jean.dupont@example.com"
}
```

---

## 5. Gestion des erreurs (Mots-clés?: code, message, détails)

### Règles obligatoires
- Retourner des messages d’erreur clairs et structurés
- Inclure un code d’erreur, un message et éventuellement des détails

**Exemple**
```json
{
  "error": {
    "code": 400,
    "message": "Email is required"
  }
}
```

---

## 6. Filtrage, tri et pagination (Mots-clés?: query params, sort, page)

- Permettre le filtrage, le tri et la pagination via les paramètres de requête

**Exemple**
```
GET /users?sort=name&order=asc&page=2&pageSize=50
```

---

## 7. Versionnement de l’API (Mots-clés?: v1, Accept header)

- Versionner l’API dans l’URL (ex?: `/v1/users`) ou dans les headers (ex?: `Accept: application/vnd.craftsmanlab.v1+json`)

---

## 8. Sécurité (Mots-clés?: HTTPS, authentification, autorisation, données sensibles)

### Règles obligatoires
- Utiliser HTTPS pour toutes les requêtes
- Implémenter l’authentification et l’autorisation (ex?: OAuth, JWT)
- Ne jamais exposer d’informations sensibles dans les réponses ou les erreurs

---

## 9. Documentation (Mots-clés?: OpenAPI, Swagger, endpoints)

- Documenter l’API avec OpenAPI/Swagger
- Décrire les endpoints, les paramètres, les réponses et les erreurs

---

## 10. Bonnes pratiques générales (Mots-clés?: cohérence, conventions, tests)

- Être cohérent dans la structure et le nommage
- Utiliser des conventions CraftsmanLab pour les DTOs et les modèles
- Tester les endpoints et les scénarios d’erreur

---

## Pour aller plus loin
- Se référer à la documentation officielle REST et à l’article Stack Overflow
- Respecter ces règles pour garantir la robustesse et la facilité d’utilisation de l’API
