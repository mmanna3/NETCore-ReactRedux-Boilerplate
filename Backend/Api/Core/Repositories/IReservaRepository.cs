using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Core.Models;

namespace Api.Core.Repositories
{
    public interface IReservaRepository : IABMRepository<Reserva>
    {
        Task<IEnumerable<Reserva>> ListarMensuales(int mes);
    }
}
