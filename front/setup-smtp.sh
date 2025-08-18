#!/bin/bash

# Script d'aide pour configurer les variables SMTP pour Azure Static Web Apps
# Usage: ./setup-smtp.sh [service]

echo "🔧 Configuration SMTP pour CraftsmanLab (Azure Static Web Apps)"
echo "=============================================================="

SERVICE=${1:-""}

if [ -z "$SERVICE" ]; then
    echo "Services SMTP supportés :"
    echo "  1) mailtrap  - Pour les tests (emails capturés)"
    echo "  2) gmail     - Pour Gmail personnel"
    echo "  3) sendgrid  - Service professionnel"
    echo "  4) custom    - Configuration personnalisée"
    echo ""
    echo "⚠️  IMPORTANT: Ce script configure seulement le .env local pour les tests."
    echo "    Pour la production Azure, configurez ces variables dans le portail Azure."
    echo ""
    read -p "Choisir un service (1-4): " choice
    
    case $choice in
        1) SERVICE="mailtrap" ;;
        2) SERVICE="gmail" ;;
        3) SERVICE="sendgrid" ;;
        4) SERVICE="custom" ;;
        *) echo "❌ Choix invalide"; exit 1 ;;
    esac
fi

# Créer le fichier .env s'il n'existe pas
if [ ! -f .env ]; then
    echo "📝 Création du fichier .env..."
    cp .env.example .env
fi

case $SERVICE in
    "mailtrap")
        echo ""
        echo "🧪 Configuration MAILTRAP (pour tests)"
        echo "--------------------------------------"
        echo "1. Créer un compte sur https://mailtrap.io"
        echo "2. Créer un inbox de test"
        echo "3. Copier les identifiants SMTP"
        echo ""
        read -p "SMTP Host (ex: sandbox.smtp.mailtrap.io): " host
        read -p "SMTP Port (587): " port
        read -p "Username Mailtrap: " user
        read -s -p "Password Mailtrap: " pass
        echo ""
        read -p "Email de contact (pour recevoir): " contact
        
        # Mettre à jour .env
        sed -i '' "s/SMTP_HOST=.*/SMTP_HOST=$host/" .env
        sed -i '' "s/SMTP_PORT=.*/SMTP_PORT=${port:-587}/" .env
        sed -i '' "s/SMTP_USER=.*/SMTP_USER=$user/" .env
        sed -i '' "s/SMTP_PASS=.*/SMTP_PASS=$pass/" .env
        sed -i '' "s/CONTACT_EMAIL=.*/CONTACT_EMAIL=$contact/" .env
        ;;
        
    "gmail")
        echo ""
        echo "📧 Configuration GMAIL"
        echo "----------------------"
        echo "⚠️  IMPORTANT: Vous devez activer l'authentification à 2 facteurs"
        echo "    et créer un 'Mot de passe d'application' dans votre compte Google"
        echo ""
        read -p "Votre email Gmail: " email
        read -s -p "Mot de passe d'application (16 caractères): " pass
        echo ""
        
        # Mettre à jour .env
        sed -i '' "s/SMTP_HOST=.*/SMTP_HOST=smtp.gmail.com/" .env
        sed -i '' "s/SMTP_PORT=.*/SMTP_PORT=587/" .env
        sed -i '' "s/SMTP_USER=.*/SMTP_USER=$email/" .env
        sed -i '' "s/SMTP_PASS=.*/SMTP_PASS=$pass/" .env
        sed -i '' "s/CONTACT_EMAIL=.*/CONTACT_EMAIL=$email/" .env
        ;;
        
    "sendgrid")
        echo ""
        echo "🚀 Configuration SENDGRID"
        echo "-------------------------"
        echo "1. Créer un compte sur https://sendgrid.com"
        echo "2. Créer une clé API"
        echo "3. Vérifier votre domaine d'envoi"
        echo ""
        read -p "Clé API SendGrid: " apikey
        read -p "Email vérifié (sender): " sender
        
        # Mettre à jour .env
        sed -i '' "s/SMTP_HOST=.*/SMTP_HOST=smtp.sendgrid.net/" .env
        sed -i '' "s/SMTP_PORT=.*/SMTP_PORT=587/" .env
        sed -i '' "s/SMTP_USER=.*/SMTP_USER=apikey/" .env
        sed -i '' "s/SMTP_PASS=.*/SMTP_PASS=$apikey/" .env
        sed -i '' "s/CONTACT_EMAIL=.*/CONTACT_EMAIL=$sender/" .env
        ;;
        
    "custom")
        echo ""
        echo "⚙️  Configuration personnalisée"
        echo "-------------------------------"
        read -p "SMTP Host: " host
        read -p "SMTP Port: " port
        read -p "SMTP User: " user
        read -s -p "SMTP Password: " pass
        echo ""
        read -p "Email de contact: " contact
        
        # Mettre à jour .env
        sed -i '' "s/SMTP_HOST=.*/SMTP_HOST=$host/" .env
        sed -i '' "s/SMTP_PORT=.*/SMTP_PORT=$port/" .env
        sed -i '' "s/SMTP_USER=.*/SMTP_USER=$user/" .env
        sed -i '' "s/SMTP_PASS=.*/SMTP_PASS=$pass/" .env
        sed -i '' "s/CONTACT_EMAIL=.*/CONTACT_EMAIL=$contact/" .env
        ;;
esac

echo ""
echo "✅ Configuration locale terminée !"
echo ""
echo "🧪 Pour tester en local avec Azure Functions Core Tools :"
echo "   cd api && func start"
echo "   # Dans un autre terminal:"
echo "   npm run dev"
echo ""
echo "🚀 Pour la production Azure :"
echo "   Portail Azure > Static Web App > Configuration > Variables d'application"
echo "   Ajouter les mêmes variables SMTP configurées dans .env"
echo ""
echo "⚠️  SÉCURITÉ: Le fichier .env est ignoré par Git (ne sera pas committé)"
