# Guide et Bonnes Pratiques pour la conception d'API REST (CraftsmanLab)

Ce document synth�tise les meilleures pratiques pour la conception d�API REST, bas� sur l�article Stack Overflow?: [Best practices for REST API design](https://stackoverflow.blog/2020/03/02/best-practices-for-rest-api-design/).

## Objectif
- Garantir la clart�, la coh�rence et la maintenabilit� des APIs REST
- Faciliter l�int�gration et l�utilisation des APIs dans le projet CraftsmanLab
- �viter les pi�ges courants et les erreurs fr�quentes
- Uniformiser les pratiques dans tous les projets .NET du workspace

---

## 1. Utilisation des verbes HTTP (Mots-cl�s?: GET, POST, PUT, PATCH, DELETE)

### R�gles obligatoires
- Utiliser les verbes HTTP standards?:
  - `GET` pour la r�cup�ration de ressources
  - `POST` pour la cr�ation
  - `PUT` pour la mise � jour compl�te
  - `PATCH` pour la mise � jour partielle
  - `DELETE` pour la suppression

### � proscrire
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

## 2. Conventions d�URL et de ressources (Mots-cl�s?: pluriel, identifiant, hi�rarchie)

- Utiliser des noms de ressources au pluriel (ex?: `/users`, `/products`)
- Utiliser des identifiants pour acc�der � une ressource sp�cifique (ex?: `/users/123`)
- �viter les verbes dans les URLs (pr�f�rer `/users` � `/getUsers`)
- Organiser les URLs de fa�on hi�rarchique si besoin (ex?: `/users/123/orders`)

---

## 3. Statuts HTTP (Mots-cl�s?: 200, 201, 204, 400, 404, 500)

### R�gles obligatoires
- Retourner les statuts HTTP appropri�s?:
  - `200 OK` pour une requ�te r�ussie
  - `201 Created` apr�s une cr�ation
  - `204 No Content` apr�s une suppression
  - `400 Bad Request` pour une requ�te invalide
  - `404 Not Found` si la ressource n�existe pas
  - `500 Internal Server Error` pour une erreur serveur

### � proscrire
- Retourner toujours 200 OK, m�me en cas d�erreur

---

## 4. Structuration des r�ponses (Mots-cl�s?: JSON, coh�rence, cl�s explicites)

- Retourner des objets JSON structur�s
- Inclure les donn�es pertinentes et �viter les informations inutiles
- Utiliser des cl�s explicites et coh�rentes
- �viter les informations inutiles ou sensibles

**Exemple de r�ponse**
```json
{
  "id": 123,
  "name": "Jean Dupont",
  "email": "jean.dupont@example.com"
}
```

---

## 5. Gestion des erreurs (Mots-cl�s?: code, message, d�tails)

### R�gles obligatoires
- Retourner des messages d�erreur clairs et structur�s
- Inclure un code d�erreur, un message et �ventuellement des d�tails

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

## 6. Filtrage, tri et pagination (Mots-cl�s?: query params, sort, page)

- Permettre le filtrage, le tri et la pagination via les param�tres de requ�te

**Exemple**
```
GET /users?sort=name&order=asc&page=2&pageSize=50
```

---

## 7. Versionnement de l�API (Mots-cl�s?: v1, Accept header)

- Versionner l�API dans l�URL (ex?: `/v1/users`) ou dans les headers (ex?: `Accept: application/vnd.craftsmanlab.v1+json`)

---

## 8. S�curit� (Mots-cl�s?: HTTPS, authentification, autorisation, donn�es sensibles)

### R�gles obligatoires
- Utiliser HTTPS pour toutes les requ�tes
- Impl�menter l�authentification et l�autorisation (ex?: OAuth, JWT)
- Ne jamais exposer d�informations sensibles dans les r�ponses ou les erreurs

---

## 9. Documentation (Mots-cl�s?: OpenAPI, Swagger, endpoints)

- Documenter l�API avec OpenAPI/Swagger
- D�crire les endpoints, les param�tres, les r�ponses et les erreurs

---

## 10. Bonnes pratiques g�n�rales (Mots-cl�s?: coh�rence, conventions, tests)

- �tre coh�rent dans la structure et le nommage
- Utiliser des conventions CraftsmanLab pour les DTOs et les mod�les
- Tester les endpoints et les sc�narios d�erreur

---

## Pour aller plus loin
- Se r�f�rer � la documentation officielle REST et � l�article Stack Overflow
- Respecter ces r�gles pour garantir la robustesse et la facilit� d�utilisation de l�API
