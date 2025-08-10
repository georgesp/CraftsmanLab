using Microsoft.Extensions.Configuration;
using System;

namespace CraftsmanLab.Sql.Configuration
{
    /// <summary>
    /// Impl�mentation de la configuration de CraftsmanLab
    /// </summary>
    public class CraftsmanLabConfiguration : ICraftsmanLabConfiguration
    {
        private readonly IConfiguration _configuration;

        public CraftsmanLabConfiguration(IConfiguration configuration)
        {
            _configuration = configuration ?? throw new ArgumentNullException(nameof(configuration));
        }

        /// <summary>
        /// Cha�ne de connexion pour Azure SQL Database
        /// </summary>
        public string AzureSqlConnectionString 
        { 
            get 
            {
                var connectionString = _configuration.GetConnectionString("AzureSqlDb");
                if (string.IsNullOrEmpty(connectionString))
                {
                    throw new InvalidOperationException("La cha�ne de connexion 'AzureSqlDb' est manquante ou vide dans la configuration.");
                }
                return connectionString;
            }
        }

        /// <summary>
        /// Timeout de connexion par d�faut
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
                return 30; // Valeur par d�faut de 30 secondes
            }
        }

        /// <summary>
        /// Indique si le logging est activ�
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
                return true; // Activ� par d�faut
            }
        }
    }
}