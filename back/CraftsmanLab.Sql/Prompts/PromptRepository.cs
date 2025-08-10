using CraftsmanLab.Sql.Configuration;
using CraftsmanLab.Sql.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CraftsmanLab.Sql
{
    public class PromptRepository : BaseRepository, IPromptRepository
    {
        public PromptRepository(ICraftsmanLabConfiguration configuration) : base(configuration)
        {
        }

        public async Task<Prompt> GetPromptByIdAsync(int id)
        {
            const string sql = @"
                SELECT Id, Title, Content, CreatedDate, ModifiedDate 
                FROM Prompts 
                WHERE Id = @Id";

            return await QuerySingleOrDefaultAsync<Prompt>(sql, new { Id = id });
        }

        public async Task<IEnumerable<Prompt>> GetPromptsAsync()
        {
            const string sql = @"
                SELECT Id, Title, Content, CreatedDate, ModifiedDate 
                FROM Prompts 
                ORDER BY CreatedDate DESC";

            return await QueryAsync<Prompt>(sql);
        }

        public async Task<IEnumerable<Prompt>> SearchByTitleAsync(string title)
        {
            const string sql = @"
                SELECT Id, Title, Content, CreatedDate, ModifiedDate 
                FROM Prompts 
                WHERE Title LIKE @Title
                ORDER BY CreatedDate DESC";

            return await QueryAsync<Prompt>(sql, new { Title = $"%{title}%" });
        }

        public async Task<int> AddPromptAsync(Prompt prompt)
        {
            const string sql = @"
                INSERT INTO Prompts (Title, Content, CreatedDate, ModifiedDate)
                OUTPUT INSERTED.Id
                VALUES (@Title, @Content, GETUTCDATE(), GETUTCDATE())";

            return await ExecuteScalarAsync<int>(sql, prompt);
        }

        public async Task<int> UpdatePromptAsync(Prompt prompt)
        {
            const string sql = @"
                UPDATE Prompts 
                SET Title = @Title, 
                    Content = @Content, 
                    ModifiedDate = GETUTCDATE()
                WHERE Id = @Id";

            return await ExecuteAsync(sql, prompt);
        }

        public async Task<int> DeletePromptAsync(int id)
        {
            const string sql = "DELETE FROM Prompts WHERE Id = @Id";
            return await ExecuteAsync(sql, new { Id = id });
        }

        public async Task<int> CountAsync()
        {
            const string sql = "SELECT COUNT(*) FROM Prompts";
            return await ExecuteScalarAsync<int>(sql);
        }

        public async Task<IEnumerable<Prompt>> GetRecentAsync(int count)
        {
            const string sql = @"
                SELECT TOP (@Count) Id, Title, Content, CreatedDate, ModifiedDate 
                FROM Prompts 
                ORDER BY CreatedDate DESC";

            return await QueryAsync<Prompt>(sql, new { Count = count });
        }
    }
}
