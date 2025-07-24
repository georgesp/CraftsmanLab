using System.Collections.Generic;
using System.Threading.Tasks;

namespace CraftsmanLab.Sql
{
    public interface IPromptRepository
    {
        Task<IEnumerable<string>> GetPromptsAsync();
        Task<string> GetPromptByIdAsync(int id);
        Task AddPromptAsync(string prompt);
        Task UpdatePromptAsync(int id, string prompt);
        Task DeletePromptAsync(int id);
    }
}
