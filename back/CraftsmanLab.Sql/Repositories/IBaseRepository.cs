using System.Collections.Generic;
using System.Threading.Tasks;

namespace CraftsmanLab.Sql.Repositories
{
    /// <summary>
    /// Interface de base pour tous les repositories utilisant Dapper
    /// </summary>
    public interface IBaseRepository
    {
        // Cette interface peut �tre �tendue avec des m�thodes communes si n�cessaire
        // Pour l'instant, elle sert principalement de marqueur pour l'injection de d�pendances
    }
}