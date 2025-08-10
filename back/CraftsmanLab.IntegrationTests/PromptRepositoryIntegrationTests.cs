using CraftsmanLab.Sql.Configuration;
using CraftsmanLab.Sql.Repositories;
using Microsoft.Extensions.Configuration;
using NSubstitute;
using System;
using System.Configuration;
using System.Threading.Tasks;
using Xunit;

namespace CraftsmanLab.Sql.Tests
{
    public class PromptRepositoryIntegrationTests
    {
        private readonly IPromptRepository _repository;
        private readonly string _connectionString;

        public PromptRepositoryIntegrationTests()
        {
            // Configuration pour les tests d'int�gration bas�e sur app.config
            var connectionStringInfo = ConfigurationManager.ConnectionStrings["AzureSqlDb"];
            
            if (connectionStringInfo == null)
            {
                throw new InvalidOperationException("La cha�ne de connexion 'AzureSqlDb' n'est pas trouv�e dans app.config");
            }

            _connectionString = connectionStringInfo.ConnectionString;
            
            // Cr�er la configuration CraftsmanLab avec la cha�ne de connexion r�elle
            var mockConfig = Substitute.For<ICraftsmanLabConfiguration>();
            mockConfig.AzureSqlConnectionString.Returns(_connectionString);
            mockConfig.DefaultConnectionTimeout.Returns(30);
            mockConfig.IsLoggingEnabled.Returns(true);

            _repository = new PromptRepository(mockConfig);
        }

        [Fact(Skip = "Test d'int�gration - D�commenter pour tester avec la vraie base")]
        public async Task CreateTable_IfNotExists_ShouldSucceed()
        {
            // Ce test cr�e la table Prompts si elle n'existe pas
            var mockConfig = Substitute.For<ICraftsmanLabConfiguration>();
            mockConfig.AzureSqlConnectionString.Returns(_connectionString);
            
            var baseRepo = new TestableBaseRepository(mockConfig);

            const string createTableSql = @"
                IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Prompts' AND xtype='U')
                CREATE TABLE Prompts (
                    Id int IDENTITY(1,1) PRIMARY KEY,
                    Title nvarchar(255) NOT NULL,
                    Content nvarchar(max) NOT NULL,
                    CreatedDate datetime2 NOT NULL,
                    ModifiedDate datetime2 NOT NULL
                )";

            // Act
            var result = await baseRepo.ExecuteTestAsync(createTableSql);

            // Assert - Si pas d'exception, c'est que �a a march�
            Assert.True(result >= 0);
        }

        [Fact(Skip = "Test d'int�gration - D�commenter pour tester avec la vraie base")]
        public async Task CRUD_Operations_ShouldWork()
        {
            // Arrange
            var newPrompt = new Prompt
            {
                Title = "Test Prompt",
                Content = "Ceci est un prompt de test cr�� par les tests d'int�gration."
            };

            try
            {
                // Act & Assert - Create
                var createdId = await _repository.AddPromptAsync(newPrompt);
                Assert.True(createdId > 0);

                // Act & Assert - Read
                var retrievedPrompt = await _repository.GetPromptByIdAsync(createdId);
                Assert.NotNull(retrievedPrompt);
                Assert.Equal(newPrompt.Title, retrievedPrompt.Title);
                Assert.Equal(newPrompt.Content, retrievedPrompt.Content);

                // Act & Assert - Update
                retrievedPrompt.Title = "Prompt Modifi�";
                retrievedPrompt.Content = "Contenu modifi�";
                var updateResult = await _repository.UpdatePromptAsync(retrievedPrompt);
                Assert.Equal(1, updateResult);

                // V�rifier la modification
                var updatedPrompt = await _repository.GetPromptByIdAsync(createdId);
                Assert.Equal("Prompt Modifi�", updatedPrompt.Title);
                Assert.Equal("Contenu modifi�", updatedPrompt.Content);

                // Act & Assert - Delete
                var deleteResult = await _repository.DeletePromptAsync(createdId);
                Assert.Equal(1, deleteResult);

                // V�rifier la suppression
                var deletedPrompt = await _repository.GetPromptByIdAsync(createdId);
                Assert.Null(deletedPrompt);
            }
            catch (Exception ex)
            {
                throw new InvalidOperationException($"Erreur lors des tests CRUD: {ex.Message}", ex);
            }
        }

        [Fact(Skip = "Test d'int�gration - D�commenter pour tester avec la vraie base")]
        public async Task Count_ShouldReturnNumber()
        {
            // Act
            var count = await _repository.CountAsync();

            // Assert
            Assert.True(count >= 0);
        }

        [Fact(Skip = "Test d'int�gration - D�commenter pour tester avec la vraie base")]
        public async Task SearchByTitle_ShouldReturnResults()
        {
            // Arrange
            var searchTerm = "Test";

            // Act
            var results = await _repository.SearchByTitleAsync(searchTerm);

            // Assert
            Assert.NotNull(results);
        }

        [Fact(Skip = "Test d'int�gration - D�commenter pour tester avec la vraie base")]
        public async Task GetRecent_ShouldReturnResults()
        {
            // Act
            var results = await _repository.GetRecentAsync(5);

            // Assert
            Assert.NotNull(results);
        }

        [Fact]
        public void Configuration_ShouldBeLoadedFromAppConfig()
        {
            // Test pour v�rifier que la configuration est correctement charg�e
            Assert.NotNull(_connectionString);
            Assert.NotEmpty(_connectionString);
            Assert.Contains("craftsmanlabserver.database.windows.net", _connectionString);
        }
    }

    /// <summary>
    /// Classe pour exposer les m�thodes prot�g�es de BaseRepository dans les tests
    /// </summary>
    internal class TestableBaseRepository : BaseRepository
    {
        public TestableBaseRepository(ICraftsmanLabConfiguration configuration) : base(configuration)
        {
        }

        public async Task<int> ExecuteTestAsync(string sql, object param = null)
        {
            return await ExecuteAsync(sql, param);
        }
    }
}