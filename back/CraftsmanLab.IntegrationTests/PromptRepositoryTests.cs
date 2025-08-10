using CraftsmanLab.Sql.Configuration;
using NSubstitute;
using NSubstitute.ExceptionExtensions;
using System;
using System.Threading.Tasks;
using Xunit;

namespace CraftsmanLab.Sql.Tests
{
    public class PromptRepositoryTests
    {
        private readonly ICraftsmanLabConfiguration _mockConfig;
        private readonly PromptRepository _repository;

        public PromptRepositoryTests()
        {
            _mockConfig = Substitute.For<ICraftsmanLabConfiguration>();
            _mockConfig.AzureSqlConnectionString.Returns("Server=test;Database=test;User Id=test;Password=test;");
            _repository = new PromptRepository(_mockConfig);
        }

        [Fact]
        public void Constructor_WithNullConfiguration_ShouldThrowArgumentNullException()
        {
            // Act & Assert
            Assert.Throws<ArgumentNullException>(() => new PromptRepository(null));
        }

        [Fact]
        public void Constructor_WithValidConfiguration_ShouldCreateInstance()
        {
            // Act
            var repository = new PromptRepository(_mockConfig);

            // Assert
            Assert.NotNull(repository);
        }

        // Note: The following tests would require integration or partial mocking to simulate connection failures,
        // which is not possible with the current implementation using SqlConnection directly.
        // You may want to implement integration tests for error scenarios.
    }
}