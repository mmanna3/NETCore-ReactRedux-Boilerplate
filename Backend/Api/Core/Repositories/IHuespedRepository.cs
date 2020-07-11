using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Core.Models;

namespace Api.Core.Repositories
{
    public interface IHuespedRepository
    {
        Task<IEnumerable<Huesped>> ListarAsync();
        void Crear(Huesped habitacion);
        Task<Huesped> BuscarPorIdAsync(int id);
        void Modificar(Huesped original, Huesped actual);
    }
}
