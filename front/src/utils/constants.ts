// Centralized application constants
// Add global, reusable constants here to keep configuration and references in one place.

export const CONTACT_EMAIL = 'contact@craftsmanlab.fr';

// Configuration SMTP (noms des variables d'environnement)
// ⚠️ IMPORTANT: Les vraies valeurs doivent être dans .env (local) ou sur la plateforme (production)
export const SMTP_CONFIG = {
  HOST_VAR: 'SMTP_HOST',
  PORT_VAR: 'SMTP_PORT', 
  USER_VAR: 'SMTP_USER',
  PASS_VAR: 'SMTP_PASS',
  CONTACT_EMAIL_VAR: 'CONTACT_EMAIL'
} as const;

// Fonction utilitaire pour valider la configuration SMTP (côté serveur uniquement)
export const validateSmtpConfig = (env: Record<string, string | undefined>) => {
  const missing: string[] = [];
  
  Object.values(SMTP_CONFIG).forEach(varName => {
    if (!env[varName]) {
      missing.push(varName);
    }
  });
  
  if (missing.length > 0) {
    throw new Error(`Variables d'environnement SMTP manquantes: ${missing.join(', ')}`);
  }
  
  return {
    host: env[SMTP_CONFIG.HOST_VAR]!,
    port: parseInt(env[SMTP_CONFIG.PORT_VAR]!),
    user: env[SMTP_CONFIG.USER_VAR]!,
    pass: env[SMTP_CONFIG.PASS_VAR]!,
    contactEmail: env[SMTP_CONFIG.CONTACT_EMAIL_VAR]!
  };
};

// Keywords type for categorizing tips and prompts
export type Keyword = 'C#' | 'SQL';

// Available keywords list
export const AVAILABLE_KEYWORDS: readonly Keyword[] = ['C#', 'SQL'] as const;
