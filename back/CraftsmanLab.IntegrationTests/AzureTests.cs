using CraftsmanLab.Sql.Configuration;
using Microsoft.Extensions.Configuration;
using NSubstitute;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using Xunit;

namespace CraftsmanLab.Sql.Tests
{
    public class AzureTests
    {
        [Fact]
        public void Test_Connection()
        {
            // Arrange - Récupérer la chaîne de connexion depuis app.config
            var connectionString = ConfigurationManager.ConnectionStrings["AzureSqlDb"]?.ConnectionString;
            
            // Assert - Vérifier que la chaîne de connexion existe
            Assert.NotNull(connectionString);
            Assert.NotEmpty(connectionString);
            
            // Act & Assert - Créer une connexion SQL et vérifier qu'il n'y a pas d'exception
            var exception = Record.Exception(() =>
            {
                using (var connection = new SqlConnection(connectionString))
                {
                    // On teste juste la création de la connexion, pas l'ouverture
                    // car cela nécessiterait une vraie connectivité réseau
                    Assert.NotNull(connection);
                    Assert.Equal(connectionString, connection.ConnectionString);
                }
            });
            
            // Assert - Aucune exception ne devrait être levée lors de la création
            Assert.Null(exception);
        }
        
        [Fact]
        public void Test_Connection_WithRealDatabase()
        {
            // Arrange - Récupérer la chaîne de connexion depuis app.config
            var connectionString = ConfigurationManager.ConnectionStrings["AzureSqlDb"]?.ConnectionString;
            
            // Assert - Vérifier que la chaîne de connexion existe
            Assert.NotNull(connectionString);
            Assert.NotEmpty(connectionString);
            
            // Act & Assert - Tenter d'ouvrir une vraie connexion à la base de données
            var exception = Record.Exception(() =>
            {
                using (var connection = new SqlConnection(connectionString))
                {
                    connection.Open();
                    Assert.Equal(System.Data.ConnectionState.Open, connection.State);
                }
            });
            
            // Assert - Aucune exception ne devrait être levée lors de l'ouverture
            Assert.Null(exception);
        }
    }
}