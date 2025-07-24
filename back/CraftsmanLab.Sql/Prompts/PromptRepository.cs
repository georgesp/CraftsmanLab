using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CraftsmanLab.Sql
{
    public class PromptRepository : IPromptRepository
    {
        public Task AddPromptAsync(string prompt)
        {
            throw new NotImplementedException();
        }

        public Task DeletePromptAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task<string> GetPromptByIdAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<string>> GetPromptsAsync()
        {
            throw new NotImplementedException();
        }

        public Task UpdatePromptAsync(int id, string prompt)
        {
            throw new NotImplementedException();
        }
    }
}
