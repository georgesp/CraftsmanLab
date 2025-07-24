using System.Data.SqlClient;
using System.Threading.Tasks;

namespace CraftsmanLab.Sql.Azure
{
    public interface IAzureSqlConnection
    {
        Task<SqlConnection> GetOpenConnectionAsync();
    }
}
