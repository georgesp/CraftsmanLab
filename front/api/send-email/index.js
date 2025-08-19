const nodemailer = require('nodemailer');

// Configuration SMTP centralisée
const SMTP_CONFIG = {
  HOST_VAR: 'SMTP_HOST',
  PORT_VAR: 'SMTP_PORT', 
  USER_VAR: 'SMTP_USER',
  PASS_VAR: 'SMTP_PASS',
  CONTACT_EMAIL_VAR: 'CONTACT_EMAIL'
};

const validateSmtpConfig = (env) => {
  const missing = [];
  
  Object.values(SMTP_CONFIG).forEach(varName => {
    if (!env[varName]) {
      missing.push(varName);
    }
  });
  
  if (missing.length > 0) {
    throw new Error(`Variables d'environnement SMTP manquantes: ${missing.join(', ')}`);
  }
  
  return {
    host: env[SMTP_CONFIG.HOST_VAR],
    port: parseInt(env[SMTP_CONFIG.PORT_VAR]),
    user: env[SMTP_CONFIG.USER_VAR],
    pass: env[SMTP_CONFIG.PASS_VAR],
    contactEmail: env[SMTP_CONFIG.CONTACT_EMAIL_VAR]
  };
};

module.exports = async function (context, req) {
    context.log('Fonction send-email appelée');
    context.log('Méthode HTTP:', req.method);
    context.log('URL:', req.url);
    
    // Enable CORS pour Azure Static Web Apps
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    };

    // Handle preflight CORS request
    if (req.method === 'OPTIONS') {
      context.res = {
        status: 200,
        headers: corsHeaders,
        body: ''
      };
      return;
    }

    if (req.method !== 'POST') {
      context.res = {
        status: 405,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Method not allowed' })
      };
      return;
    }

    const body = req.body;
    context.log('Body reçu:', body);
    
    const { name, email, subject, message } = body || {};
    context.log('Champs extraits:', { name, email, subject, message: message ? 'présent' : 'absent' });
    
    if (!name || !email || !subject || !message) {
      context.log.error('Champs manquants détectés');
      context.res = {
        status: 400,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Champs manquants' })
      };
      return;
    }

    // Validation basique de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      context.res = {
        status: 400,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Email invalide' })
      };
      return;
    }

    try {
      context.log('Début du traitement de l\'envoi d\'email');
      context.log('Variables d\'environnement disponibles:', Object.keys(process.env).filter(k => k.startsWith('SMTP_') || k === 'CONTACT_EMAIL'));
      
      // Utilisation de la fonction de validation centralisée
      const config = validateSmtpConfig(process.env);
      context.log('Configuration SMTP validée:', { host: config.host, port: config.port, user: config.user });
      
      const transporter = nodemailer.createTransport({
        host: config.host,
        port: config.port,
        secure: config.port === 465, // true for 465, false for 587
        auth: {
          user: config.user,
          pass: config.pass,
        },
      });

      context.log('Transporter créé, envoi en cours...');

      const mailOptions = {
        from: `"${name}" <${config.user}>`, // Use SMTP user as sender
        replyTo: email, // User's email for replies
        to: config.contactEmail,
        subject: `[Site CraftsmanLab] ${subject}`,
        text: `Message de ${name} <${email}>:\n\n${message}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">Nouveau message depuis le site CraftsmanLab</h2>
            <div style="background: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
              <p><strong>Nom :</strong> ${name}</p>
              <p><strong>Email :</strong> ${email}</p>
              <p><strong>Sujet :</strong> ${subject}</p>
            </div>
            <div style="background: white; padding: 20px; border-left: 4px solid #007bff;">
              <h3>Message :</h3>
              <p style="white-space: pre-wrap;">${message}</p>
            </div>
          </div>
        `,
      };

      const info = await transporter.sendMail(mailOptions);
      context.log('Email envoyé avec succès:', info.messageId);
      context.log('Détails de l\'envoi:', info);
      
      context.res = {
        status: 200,
        headers: corsHeaders,
        body: JSON.stringify({ 
          success: true, 
          message: 'Email envoyé avec succès',
          messageId: info.messageId 
        })
      };

    } catch (error) {
      context.log.error('Erreur détaillée lors de l\'envoi email:', error);
      context.log.error('Stack trace:', error.stack);
      
      // Si erreur de validation SMTP, retourner message spécifique
      if (error.message.includes('Variables d\'environnement SMTP manquantes')) {
        context.log.error('Variables d\'environnement SMTP manquantes');
        context.res = {
          status: 500,
          headers: corsHeaders,
          body: JSON.stringify({ 
            error: 'Configuration serveur manquante',
            details: error.message 
          })
        };
        return;
      }
      
      // Log des erreurs SMTP spécifiques
      if (error.code) {
        context.log.error('Code d\'erreur SMTP:', error.code);
      }
      if (error.response) {
        context.log.error('Réponse du serveur SMTP:', error.response);
      }
      
      context.res = {
        status: 500,
        headers: corsHeaders,
        body: JSON.stringify({ 
          error: 'Erreur lors de l\'envoi de l\'email',
          details: error.message,
          code: error.code || 'UNKNOWN'
        })
      };
    }
};
