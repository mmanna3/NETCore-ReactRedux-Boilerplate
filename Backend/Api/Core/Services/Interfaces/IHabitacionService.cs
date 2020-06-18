using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Core.Models;
using Api.Core.Services.Communication;

namespace Api.Core.Services.Interfaces
{
    public interface IHabitacionService
    {
        Task<IEnumerable<Habitacion>> ListarAsync();
        Task<int> CrearAsync(Habitacion category);
        Task ModificarAsync(int id, Habitacion habitacion);
    }
}
