using Api.Core.Models;
using Api.Core.Repositories;
using Api.Persistence.Config;

namespace Api.Persistence.Repositories
{
    public class ReservaRepository : ABMRepository<Reserva>, IReservaRepository
    {
        public ReservaRepository(AppDbContext context) : base(context)
        {
        }
    }
}
