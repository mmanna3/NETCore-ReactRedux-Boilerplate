using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Core.Models;
using Api.Core.Repositories;
using Api.Persistence.Config;
using Microsoft.EntityFrameworkCore;

namespace Api.Persistence.Repositories
{
    public class HabitacionRepository : ABMRepository<Habitacion>, IHabitacionRepository
    {
        public HabitacionRepository(AppDbContext context) : base(context)
        {
        }

        public override async Task<IEnumerable<Habitacion>> Listar()
        {
            return await _context.Habitaciones
                                    .Include(x => x.CamasIndividuales)
                                    .Include(x => x.CamasCuchetas)
                                        .ThenInclude(x => x.Abajo)
                                    .Include(x => x.CamasCuchetas)
                                        .ThenInclude(x => x.Arriba)
                                    .Include(x => x.CamasMatrimoniales)
                                    .ToListAsync();
        }
    }
}
