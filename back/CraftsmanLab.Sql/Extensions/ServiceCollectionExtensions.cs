using CraftsmanLab.Sql.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace CraftsmanLab.Sql.Extensions
{
    /// <summary>
    /// Extensions pour l'enregistrement des services CraftsmanLab.Sql dans le conteneur IOC
    /// </summary>
    public static class ServiceCollectionExtensions
    {
        /// <summary>
        /// Enregistre tous les services CraftsmanLab.Sql dans le conteneur IOC
        /// </summary>
        /// <param name="services">Collection de services</param>
        /// <returns>Collection de services pour le chaînage</returns>
        public static IServiceCollection AddCraftsmanLabSql(this IServiceCollection services)
        {
            // Configuration
            services.AddSingleton<ICraftsmanLabConfiguration, CraftsmanLabConfiguration>();
            
            // Repositories
            services.AddScoped<IPromptRepository, PromptRepository>();
            
            return services;
        }

        /// <summary>
        /// Enregistre uniquement la configuration CraftsmanLab.Sql dans le conteneur IOC
        /// </summary>
        /// <param name="services">Collection de services</param>
        /// <returns>Collection de services pour le chaînage</returns>
        public static IServiceCollection AddCraftsmanLabConfiguration(this IServiceCollection services)
        {
            services.AddSingleton<ICraftsmanLabConfiguration, CraftsmanLabConfiguration>();
            return services;
        }
    }
}