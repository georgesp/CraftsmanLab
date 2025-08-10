using System.Collections.Generic;
using System.Threading.Tasks;

namespace CraftsmanLab.Sql.Repositories
{
    /// <summary>
    /// Interface de base pour tous les repositories utilisant Dapper
    /// </summary>
    public interface IBaseRepository
    {
        // Cette interface peut être étendue avec des méthodes communes si nécessaire
        // Pour l'instant, elle sert principalement de marqueur pour l'injection de dépendances
    }
}