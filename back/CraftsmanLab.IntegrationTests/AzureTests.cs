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
            // Arrange - R�cup�rer la cha�ne de connexion depuis app.config
            var connectionString = ConfigurationManager.ConnectionStrings["AzureSqlDb"]?.ConnectionString;
            
            // Assert - V�rifier que la cha�ne de connexion existe
            Assert.NotNull(connectionString);
            Assert.NotEmpty(connectionString);
            
            // Act & Assert - Cr�er une connexion SQL et v�rifier qu'il n'y a pas d'exception
            var exception = Record.Exception(() =>
            {
                using (var connection = new SqlConnection(connectionString))
                {
                    // On teste juste la cr�ation de la connexion, pas l'ouverture
                    // car cela n�cessiterait une vraie connectivit� r�seau
                    Assert.NotNull(connection);
                    Assert.Equal(connectionString, connection.ConnectionString);
                }
            });
            
            // Assert - Aucune exception ne devrait �tre lev�e lors de la cr�ation
            Assert.Null(exception);
        }
        
        [Fact]
        public void Test_Connection_WithRealDatabase()
        {
            // Arrange - R�cup�rer la cha�ne de connexion depuis app.config
            var connectionString = ConfigurationManager.ConnectionStrings["AzureSqlDb"]?.ConnectionString;
            
            // Assert - V�rifier que la cha�ne de connexion existe
            Assert.NotNull(connectionString);
            Assert.NotEmpty(connectionString);
            
            // Act & Assert - Tenter d'ouvrir une vraie connexion � la base de donn�es
            var exception = Record.Exception(() =>
            {
                using (var connection = new SqlConnection(connectionString))
                {
                    connection.Open();
                    Assert.Equal(System.Data.ConnectionState.Open, connection.State);
                }
            });
            
            // Assert - Aucune exception ne devrait �tre lev�e lors de l'ouverture
            Assert.Null(exception);
        }
    }
}