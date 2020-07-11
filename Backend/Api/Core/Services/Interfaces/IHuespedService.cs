using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Core.Models;

namespace Api.Core.Services.Interfaces
{
    public interface IHuespedService
    {
        Task<IEnumerable<Huesped>> ListarAsync();
        Task<int> CrearAsync(Huesped huesped);
    }
}
