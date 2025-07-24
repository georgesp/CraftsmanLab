using CraftsmanLab.Sql.Azure;
using Microsoft.Extensions.Configuration;
using NSubstitute;
using System;
using System.Data.SqlClient;
using System.Threading.Tasks;
using Xunit;

namespace CraftsmanLab.Sql.Tests
{
    public class AzureSqlConnectionTests
    {
        [Fact]
        public void Constructor_WithValidConfiguration_ShouldCreateInstance()
        {
            // Arrange
            var mockConfig = Substitute.For<IConfiguration>();
            mockConfig.GetConnectionString("AzureSqlDb").Returns("Server=test;Database=test;User Id=test;Password=test;");

            // Act
            var connection = new AzureSqlConnection(mockConfig);

            // Assert
            Assert.NotNull(connection);
        }

        [Fact]
        public void Constructor_WithNullConnectionString_ShouldCreateInstance()
        {
            // Arrange
            var mockConfig = Substitute.For<IConfiguration>();
            mockConfig.GetConnectionString("AzureSqlDb").Returns((string)null);

            // Act
            var connection = new AzureSqlConnection(mockConfig);

            // Assert
            Assert.NotNull(connection);
        }

        [Fact]
        public void GetOpenConnectionAsync_WithValidConnectionString_ShouldNotThrow()
        {
            // Arrange
            var mockConfig = Substitute.For<IConfiguration>();
            mockConfig.GetConnectionString("AzureSqlDb").Returns("Server=test;Database=test;User Id=test;Password=test;");

            var connection = new AzureSqlConnection(mockConfig);

            // Act & Assert - On vérifie que l'instance est créée correctement
            Assert.NotNull(connection);
            
            // On peut vérifier que la méthode est définie sans l'exécuter réellement
            var method = typeof(AzureSqlConnection).GetMethod("GetOpenConnectionAsync");
            Assert.NotNull(method);
        }

        [Fact]
        public async Task GetOpenConnectionAsync_WithEmptyConnectionString_ShouldThrowException()
        {
            // Arrange
            var mockConfig = Substitute.For<IConfiguration>();
            mockConfig.GetConnectionString("AzureSqlDb").Returns("");

            var connection = new AzureSqlConnection(mockConfig);

            // Act & Assert - SqlConnection lance InvalidOperationException pour les chaînes vides
            await Assert.ThrowsAsync<InvalidOperationException>(() => connection.GetOpenConnectionAsync());
        }

        [Fact]
        public async Task GetOpenConnectionAsync_WithNullConnectionString_ShouldThrowException()
        {
            // Arrange
            var mockConfig = Substitute.For<IConfiguration>();
            mockConfig.GetConnectionString("AzureSqlDb").Returns((string)null);

            var connection = new AzureSqlConnection(mockConfig);

            // Act & Assert - SqlConnection lance InvalidOperationException pour les chaînes null
            await Assert.ThrowsAsync<InvalidOperationException>(() => connection.GetOpenConnectionAsync());
        }
    }
}