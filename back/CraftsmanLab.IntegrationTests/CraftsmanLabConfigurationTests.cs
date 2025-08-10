using CraftsmanLab.Sql.Configuration;
using Microsoft.Extensions.Configuration;
using NSubstitute;
using System;
using System.Collections.Generic;
using Xunit;

namespace CraftsmanLab.Sql.Tests
{
    public class CraftsmanLabConfigurationTests
    {
        [Fact]
        public void Constructor_WithNullConfiguration_ShouldThrowArgumentNullException()
        {
            // Act & Assert
            Assert.Throws<ArgumentNullException>(() => new CraftsmanLabConfiguration(null));
        }

        [Fact]
        public void Constructor_WithValidConfiguration_ShouldCreateInstance()
        {
            // Arrange
            var mockConfig = Substitute.For<IConfiguration>();

            // Act
            var configuration = new CraftsmanLabConfiguration(mockConfig);

            // Assert
            Assert.NotNull(configuration);
        }

        [Fact]
        public void AzureSqlConnectionString_WithValidConnectionString_ShouldReturnConnectionString()
        {
            // Arrange
            var expectedConnectionString = "Server=test;Database=test;User Id=test;Password=test;";
            var mockConfig = Substitute.For<IConfiguration>();
            mockConfig.GetConnectionString("AzureSqlDb").Returns(expectedConnectionString);
            
            var configuration = new CraftsmanLabConfiguration(mockConfig);

            // Act
            var result = configuration.AzureSqlConnectionString;

            // Assert
            Assert.Equal(expectedConnectionString, result);
        }

        [Fact]
        public void AzureSqlConnectionString_WithNullConnectionString_ShouldThrowException()
        {
            // Arrange
            var mockConfig = Substitute.For<IConfiguration>();
            mockConfig.GetConnectionString("AzureSqlDb").Returns((string)null);
            
            var configuration = new CraftsmanLabConfiguration(mockConfig);

            // Act & Assert
            var ex = Assert.Throws<InvalidOperationException>(() => configuration.AzureSqlConnectionString);
            Assert.Contains("chaîne de connexion", ex.Message);
        }

        [Fact]
        public void AzureSqlConnectionString_WithEmptyConnectionString_ShouldThrowException()
        {
            // Arrange
            var mockConfig = Substitute.For<IConfiguration>();
            mockConfig.GetConnectionString("AzureSqlDb").Returns("");
            
            var configuration = new CraftsmanLabConfiguration(mockConfig);

            // Act & Assert
            var ex = Assert.Throws<InvalidOperationException>(() => configuration.AzureSqlConnectionString);
            Assert.Contains("chaîne de connexion", ex.Message);
        }

        [Fact]
        public void DefaultConnectionTimeout_WithConfiguredValue_ShouldReturnConfiguredValue()
        {
            // Arrange
            var expectedTimeout = 60;
            var mockConfig = Substitute.For<IConfiguration>();
            mockConfig["ConnectionTimeout"].Returns(expectedTimeout.ToString());
            
            var configuration = new CraftsmanLabConfiguration(mockConfig);

            // Act
            var result = configuration.DefaultConnectionTimeout;

            // Assert
            Assert.Equal(expectedTimeout, result);
        }

        [Fact]
        public void DefaultConnectionTimeout_WithoutConfiguredValue_ShouldReturnDefaultValue()
        {
            // Arrange
            var mockConfig = Substitute.For<IConfiguration>();
            mockConfig["ConnectionTimeout"].Returns((string)null);
            
            var configuration = new CraftsmanLabConfiguration(mockConfig);

            // Act
            var result = configuration.DefaultConnectionTimeout;

            // Assert
            Assert.Equal(30, result); // Valeur par défaut
        }

        [Fact]
        public void IsLoggingEnabled_WithConfiguredValue_ShouldReturnConfiguredValue()
        {
            // Arrange
            var expectedValue = false;
            var mockConfig = Substitute.For<IConfiguration>();
            mockConfig["Logging:Enabled"].Returns(expectedValue.ToString().ToLower());
            
            var configuration = new CraftsmanLabConfiguration(mockConfig);

            // Act
            var result = configuration.IsLoggingEnabled;

            // Assert
            Assert.Equal(expectedValue, result);
        }

        [Fact]
        public void IsLoggingEnabled_WithoutConfiguredValue_ShouldReturnDefaultValue()
        {
            // Arrange
            var mockConfig = Substitute.For<IConfiguration>();
            mockConfig["Logging:Enabled"].Returns((string)null);
            
            var configuration = new CraftsmanLabConfiguration(mockConfig);

            // Act
            var result = configuration.IsLoggingEnabled;

            // Assert
            Assert.True(result); // Valeur par défaut
        }
    }
}