namespace CraftsmanLab.Sql.Configuration
{
    /// <summary>
    /// Interface pour la configuration de CraftsmanLab
    /// </summary>
    public interface ICraftsmanLabConfiguration
    {
        /// <summary>
        /// Chaîne de connexion pour Azure SQL Database
        /// </summary>
        string AzureSqlConnectionString { get; }
        
        /// <summary>
        /// Timeout de connexion par défaut
        /// </summary>
        int DefaultConnectionTimeout { get; }
        
        /// <summary>
        /// Indique si le logging est activé
        /// </summary>
        bool IsLoggingEnabled { get; }
    }
}