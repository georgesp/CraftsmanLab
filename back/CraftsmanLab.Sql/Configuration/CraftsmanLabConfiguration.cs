using Microsoft.Extensions.Configuration;
using System;

namespace CraftsmanLab.Sql.Configuration
{
    /// <summary>
    /// Implémentation de la configuration de CraftsmanLab
    /// </summary>
    public class CraftsmanLabConfiguration : ICraftsmanLabConfiguration
    {
        private readonly IConfiguration _configuration;

        public CraftsmanLabConfiguration(IConfiguration configuration)
        {
            _configuration = configuration ?? throw new ArgumentNullException(nameof(configuration));
        }

        /// <summary>
        /// Chaîne de connexion pour Azure SQL Database
        /// </summary>
        public string AzureSqlConnectionString 
        { 
            get 
            {
                var connectionString = _configuration.GetConnectionString("AzureSqlDb");
                if (string.IsNullOrEmpty(connectionString))
                {
                    throw new InvalidOperationException("La chaîne de connexion 'AzureSqlDb' est manquante ou vide dans la configuration.");
                }
                return connectionString;
            }
        }

        /// <summary>
        /// Timeout de connexion par défaut
        /// </summary>
        public int DefaultConnectionTimeout 
        { 
            get 
            {
                var timeoutValue = _configuration["ConnectionTimeout"];
                if (int.TryParse(timeoutValue, out var timeout))
                {
                    return timeout;
                }
                return 30; // Valeur par défaut de 30 secondes
            }
        }

        /// <summary>
        /// Indique si le logging est activé
        /// </summary>
        public bool IsLoggingEnabled 
        { 
            get 
            {
                var loggingValue = _configuration["Logging:Enabled"];
                if (bool.TryParse(loggingValue, out var isEnabled))
                {
                    return isEnabled;
                }
                return true; // Activé par défaut
            }
        }
    }
}