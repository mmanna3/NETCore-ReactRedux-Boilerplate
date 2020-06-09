using System.Threading.Tasks;
using Api.Domain.Models;
using Api.Services.Communication;

namespace Api.Domain.Repositories
{
    public interface IUsuarioRepository
    {
        Task AddAsync(Usuario usuario);
        Task<Usuario> FindByUsernameAsync(string username);
        Task<Usuario> GetById(int id);
    }
}
