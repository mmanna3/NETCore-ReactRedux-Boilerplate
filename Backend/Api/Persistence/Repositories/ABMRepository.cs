using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Core.Models;
using Api.Core.Repositories;
using Api.Persistence.Config;
using Microsoft.EntityFrameworkCore;

namespace Api.Persistence.Repositories
{
    public abstract class ABMRepository<TModel> : BaseRepository, IABMRepository<TModel>
        where TModel : EntidadConId
    {
        protected ABMRepository(AppDbContext context) : base(context)
        {
        }

        public async Task<IEnumerable<TModel>> Listar()
        {
            return await _context.Set<TModel>().ToListAsync();
        }

        public void Crear(TModel reserva)
        {
            _context.Set<TModel>().Add(reserva);
        }

        public async Task<TModel> ObtenerPorId(int id)
        {
            return await _context.Set<TModel>().SingleOrDefaultAsync(x => x.Id == id);
        }
    }
}
