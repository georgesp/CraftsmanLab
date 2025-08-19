# Diagnostic Email - Azure Static Web Apps

## Modifications apportées pour le débogage

### 1. Frontend - Logs détaillés ajoutés
✅ Logs pour l'URL de l'API appelée
✅ Logs des données envoyées  
✅ Logs du status de réponse
✅ Logs des headers de réponse
✅ Messages d'erreur plus détaillés avec status code

### 2. Backend - Azure Function améliorée
✅ Correction de `createTransporter` → `createTransport`
✅ Logs de début de fonction
✅ Logs des variables d'environnement disponibles
✅ Logs de validation de configuration
✅ Logs détaillés des erreurs SMTP
✅ Logs du body reçu et des champs extraits

## Comment diagnostiquer en production

### Étape 1: Tester le formulaire
1. Ouvrez la console développeur du navigateur (F12)
2. Remplissez et soumettez le formulaire de contact
3. Observez les logs dans la console

### Étape 2: Vérifier les logs Azure
1. Connectez-vous au portail Azure
2. Naviguez vers votre Static Web App
3. Allez dans "Functions" → "Monitor"
4. Consultez les logs de la fonction `send-email`

### Étape 3: Diagnostics possibles

#### Si l'erreur est dans le fetch (frontend):
- **404**: La fonction n'est pas trouvée → vérifier le déploiement
- **500**: Erreur serveur → consulter les logs Azure
- **CORS**: Problème de cross-origin → vérifier la config

#### Si l'erreur est dans la fonction Azure:
- **Variables manquantes**: Les variables SMTP ne sont pas configurées
- **Erreur SMTP**: Problème de connexion au serveur mail
- **Erreur de parsing**: Le JSON n'est pas valide

## Variables d'environnement requises

Vérifiez que ces variables sont bien configurées dans Azure:

```
SMTP_HOST=smtp.gmail.com (ou votre serveur SMTP)
SMTP_PORT=587
SMTP_USER=votre-email@gmail.com
SMTP_PASS=votre-mot-de-passe-app
CONTACT_EMAIL=destinataire@example.com
```

## Étapes de dépannage rapide

### 1. Vérifier les variables d'environnement
```bash
# Dans les logs Azure, vous devriez voir :
Variables d'environnement disponibles: ["SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASS", "CONTACT_EMAIL"]
```

### 2. Test de connectivité SMTP
Si les variables sont correctes mais l'email ne part pas, vérifiez :
- Les paramètres SMTP de votre fournisseur
- Les mots de passe d'application (pour Gmail)
- Les restrictions de sécurité

### 3. Erreurs communes

#### "Variables d'environnement SMTP manquantes"
→ Configurez les variables dans Azure Static Web Apps

#### "createTransporter is not a function"
→ Corrigé dans cette version (createTransport)

#### "EAUTH" ou "Invalid login"
→ Vérifiez les identifiants SMTP

#### "ENOTFOUND"
→ Vérifiez l'adresse du serveur SMTP

## Rollback des logs

Une fois le problème résolu, vous pouvez supprimer les logs de débogage en retirant les `console.log` et `context.log` ajoutés.
