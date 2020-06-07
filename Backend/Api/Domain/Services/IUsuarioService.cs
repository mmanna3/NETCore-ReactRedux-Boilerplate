using System.Threading.Tasks;
using Api.Domain.Models;
using Api.Services.Communication;

namespace Api.Domain.Services
{
    public interface IUsuarioService
    {
        //Usuario Autenticar(string username, string password);
        Task<UsuarioResponse> AddAsync(Usuario usuario, string password);
    }
}
