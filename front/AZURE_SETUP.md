# Configuration Azure Static Web Apps - Formulaire de Contact

## 🚀 Configuration pour Azure Static Web Apps

Votre site étant déployé sur **Azure Static Web Apps**, voici la configuration spécifique :

### 📁 Fichiers créés pour Azure

```
api/
├── host.json                    # Configuration Azure Functions
├── package.json                 # Dépendances API
└── send-email/
    ├── function.json           # Configuration de la fonction
    └── index.js                # Code de la fonction
staticwebapp.config.json        # Configuration Azure Static Web Apps
.github/workflows/azure-static-web-apps.yml  # CI/CD
```

### ⚙️ Variables d'environnement à configurer

Dans le **portail Azure** > votre Static Web App > **Configuration** :

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=votre-email@gmail.com
SMTP_PASS=votre-mot-de-passe-app
CONTACT_EMAIL=contact@craftsmanlab.fr
```

### 🔧 Étapes de déploiement

1. **Configurez les variables** dans le portail Azure
2. **Poussez votre code** sur la branche principale
3. **Le workflow GitHub Actions** déploiera automatiquement
4. **L'endpoint sera disponible** sur : `https://votre-site.azurestaticapps.net/api/send-email`

### 🧪 Test en local (Azure Functions Core Tools)

```bash
# Installer Azure Functions Core Tools
npm install -g azure-functions-core-tools@4

# Démarrer l'API Azure localement (dans le dossier api/)
cd api
func start

# Dans un autre terminal, démarrer le frontend
npm run dev
```

### 📋 Checklist de vérification

- [ ] Variables d'environnement configurées dans Azure
- [ ] Workflow GitHub Actions configuré avec `AZURE_STATIC_WEB_APPS_API_TOKEN`
- [ ] Déploiement automatique activé
- [ ] Test du formulaire de contact en production

### 🔍 Debugging

**Logs des fonctions Azure :**
- Portail Azure > Static Web App > Functions > Logs

**Test de l'API :**
```bash
curl -X POST https://votre-site.azurestaticapps.net/api/send-email \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","subject":"Test","message":"Test message"}'
```

### 🆚 Différences avec Vercel/Netlify

| Aspect | Azure Static Web Apps | Vercel | Netlify |
|--------|----------------------|---------|---------|
| **Endpoint** | `/api/send-email` | `/api/send-email` | `/.netlify/functions/send-email` |
| **Runtime** | Azure Functions | Vercel Functions | Netlify Functions |
| **Config** | `staticwebapp.config.json` | `vercel.json` | `netlify.toml` |
| **Variables** | Portail Azure | Dashboard Vercel | Dashboard Netlify |

Le code frontend détecte automatiquement l'environnement Azure ! 🎯
