using System.Collections.Generic;
using System.Threading.Tasks;

namespace CraftsmanLab.Sql
{
    public interface IPromptRepository
    {
        Task<IEnumerable<Prompt>> GetPromptsAsync();
        Task<Prompt> GetPromptByIdAsync(int id);
        Task<int> AddPromptAsync(Prompt prompt);
        Task<int> UpdatePromptAsync(Prompt prompt);
        Task<int> DeletePromptAsync(int id);
        Task<int> CountAsync();
        Task<IEnumerable<Prompt>> SearchByTitleAsync(string title);
        Task<IEnumerable<Prompt>> GetRecentAsync(int count);
    }
}
