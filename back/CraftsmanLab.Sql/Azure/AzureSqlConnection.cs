using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;
using System.Threading.Tasks;

namespace CraftsmanLab.Sql.Azure
{
    public class AzureSqlConnection : IAzureSqlConnection
    {
        private readonly string connectionString;

        public AzureSqlConnection(IConfiguration configuration)
        {
            connectionString = configuration.GetConnectionString("AzureSqlDb");
        }

        public async Task<SqlConnection> GetOpenConnectionAsync()
        {
            var connection = new SqlConnection(connectionString);
            await connection.OpenAsync();
            return connection;
        }
    }
}
