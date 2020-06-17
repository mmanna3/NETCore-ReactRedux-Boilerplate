using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Core.Models;
using Api.Core.Repositories;
using Api.Persistence.Config;
using Microsoft.EntityFrameworkCore;

namespace Api.Persistence.Repositories
{
    public class HabitacionRepository : BaseRepository, IHabitacionRepository
    {
        public HabitacionRepository(AppDbContext context) : base(context)
        {
        }

        public async Task<IEnumerable<Habitacion>> ListarAsync()
        {
            return await _context.Habitaciones.ToListAsync();
        }

        public void Agregar(Habitacion habitacion)
        {
            _context.Habitaciones.Add(habitacion);
        }

        public async Task<Habitacion> BuscarPorIdAsync(int id)
        {
            return await _context.Habitaciones.FindAsync(id);
        }

        public void Actualizar(Habitacion habitacion)
        {
            _context.Habitaciones.Update(habitacion);
        }
    }
}
