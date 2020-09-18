using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Core.Models;

namespace Api.Core.Repositories
{
    public interface IReservaRepository
    {
        Task<IEnumerable<Reserva>> Listar();
        void Crear(Reserva reserva);
    }
}
