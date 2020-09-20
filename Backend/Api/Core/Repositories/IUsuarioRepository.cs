using System.Threading.Tasks;
using Api.Core.Models;

namespace Api.Core.Repositories
{
    public interface IUsuarioRepository : IABMRepository<Usuario>
    {
        Task<Usuario> ObtenerPorNombreDeUsuario(string username);
    }
}
