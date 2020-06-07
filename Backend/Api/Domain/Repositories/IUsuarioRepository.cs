using System.Threading.Tasks;
using Api.Domain.Models;

namespace Api.Domain.Repositories
{
    public interface IUsuarioRepository
    {
        Task AddAsync(Usuario usuario);
        Task<Usuario> FindByUsernameAsync(string username);
    }
}
