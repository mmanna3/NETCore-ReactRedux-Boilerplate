using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Core.Models;

namespace Api.Core.Repositories
{
    public interface IHabitacionRepository
    {
        Task<IEnumerable<Habitacion>> ListarAsync();
        void Crear(Habitacion habitacion);

        //Task<Habitacion> BuscarPorIdAsync(int id);
        //void Actualizar(Habitacion habitacion);
    }
}
