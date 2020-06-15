using System.Threading.Tasks;
using Api.Domain.Models;
using Api.Services.Communication;

namespace Api.Domain.Services
{
    public interface IUsuarioService
    {
        Task<Usuario> Autenticar(string username, string password);
        Task<Usuario> AddAsync(Usuario usuario, string password);
        Task<Usuario> GetById(int id);
        string ObtenerToken(int usuarioId);
    }
}
