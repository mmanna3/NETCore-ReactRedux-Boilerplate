using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Core.Models;
using Api.Core.Repositories;
using Api.Persistence.Config;
using Microsoft.EntityFrameworkCore;

namespace Api.Persistence.Repositories
{
    public class ReservaRepository : BaseRepository, IReservaRepository
    {
        public ReservaRepository(AppDbContext context) : base(context)
        {
        }

        public async Task<IEnumerable<Reserva>> Listar()
        {
            return await _context.Reservas.ToListAsync();
        }

        public void Crear(Reserva reserva)
        {
            _context.Reservas.Add(reserva);
        }
    }
}
