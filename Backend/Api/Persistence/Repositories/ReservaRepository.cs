using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Core.Models;
using Api.Core.Repositories;
using Api.Persistence.Config;
using Microsoft.EntityFrameworkCore;

namespace Api.Persistence.Repositories
{
    public class ReservaRepository : ABMRepository<Reserva>, IReservaRepository
    {
        public ReservaRepository(AppDbContext context) : base(context)
        {
        }
        public override async Task<IEnumerable<Reserva>> Listar()
        {
            return await _context.Reservas
                .Include(x => x.ReservaCamas)
                .ToListAsync();
        }

        public async Task<IEnumerable<Reserva>> ListarMensuales(int mes)
        {
            return await _context.Reservas
                .Include(x => x.ReservaCamas)
                .Where(x => x.Desde.Month <= mes && x.Hasta.Month >= mes)
                .ToListAsync();
        }
    }
}
