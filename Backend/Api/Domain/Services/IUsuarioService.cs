using System.Threading.Tasks;
using Api.Domain.Models;
using Api.Services.Communication;

namespace Api.Domain.Services
{
    public interface IUsuarioService
    {
        Task<UsuarioResponse> Autenticar(string username, string password);
        Task<UsuarioResponse> AddAsync(Usuario usuario, string password);
        Task<UsuarioResponse> GetById(int id);
        string ObtenerToken(int usuarioId);
    }
}
