using CraftsmanLab.Sql.Configuration;
using Dapper;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Threading.Tasks;

namespace CraftsmanLab.Sql.Repositories
{
    public abstract class BaseRepository
    {
        private readonly string _connectionString;

        protected BaseRepository(ICraftsmanLabConfiguration configuration)
        {
            if (configuration == null)
                throw new System.ArgumentNullException(nameof(configuration));
            _connectionString = configuration.AzureSqlConnectionString;
        }

        protected SqlConnection CreateConnection()
        {
            return new SqlConnection(_connectionString);
        }

        protected async Task<T> QuerySingleOrDefaultAsync<T>(string sql, object param = null)
        {
            using (var connection = CreateConnection())
            {
                await connection.OpenAsync();
                return await connection.QuerySingleOrDefaultAsync<T>(sql, param);
            }
        }

        protected async Task<IEnumerable<T>> QueryAsync<T>(string sql, object param = null)
        {
            using (var connection = CreateConnection())
            {
                await connection.OpenAsync();
                return await connection.QueryAsync<T>(sql, param);
            }
        }

        protected async Task<int> ExecuteAsync(string sql, object param = null)
        {
            using (var connection = CreateConnection())
            {
                await connection.OpenAsync();
                return await connection.ExecuteAsync(sql, param);
            }
        }

        protected async Task<T> ExecuteScalarAsync<T>(string sql, object param = null)
        {
            using (var connection = CreateConnection())
            {
                await connection.OpenAsync();
                return await connection.ExecuteScalarAsync<T>(sql, param);
            }
        }

        protected async Task<IEnumerable<T>> QueryStoredProcedureAsync<T>(string storedProcedureName, object param = null)
        {
            using (var connection = CreateConnection())
            {
                await connection.OpenAsync();
                return await connection.QueryAsync<T>(storedProcedureName, param, commandType: System.Data.CommandType.StoredProcedure);
            }
        }

        protected async Task<T> QueryStoredProcedureSingleOrDefaultAsync<T>(string storedProcedureName, object param = null)
        {
            using (var connection = CreateConnection())
            {
                await connection.OpenAsync();
                return await connection.QuerySingleOrDefaultAsync<T>(storedProcedureName, param, commandType: System.Data.CommandType.StoredProcedure);
            }
        }

        protected async Task<int> ExecuteStoredProcedureAsync(string storedProcedureName, object param = null)
        {
            using (var connection = CreateConnection())
            {
                await connection.OpenAsync();
                return await connection.ExecuteAsync(storedProcedureName, param, commandType: System.Data.CommandType.StoredProcedure);
            }
        }
    }
}