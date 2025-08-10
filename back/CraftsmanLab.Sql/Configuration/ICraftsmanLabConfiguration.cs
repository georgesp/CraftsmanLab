namespace CraftsmanLab.Sql.Configuration
{
    /// <summary>
    /// Interface pour la configuration de CraftsmanLab
    /// </summary>
    public interface ICraftsmanLabConfiguration
    {
        /// <summary>
        /// Cha�ne de connexion pour Azure SQL Database
        /// </summary>
        string AzureSqlConnectionString { get; }
        
        /// <summary>
        /// Timeout de connexion par d�faut
        /// </summary>
        int DefaultConnectionTimeout { get; }
        
        /// <summary>
        /// Indique si le logging est activ�
        /// </summary>
        bool IsLoggingEnabled { get; }
    }
}