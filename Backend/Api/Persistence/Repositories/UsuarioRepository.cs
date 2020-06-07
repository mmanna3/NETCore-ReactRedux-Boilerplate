using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Domain.Models;
using Api.Domain.Repositories;
using Api.Persistence.Contexts;
using Microsoft.EntityFrameworkCore;

namespace Api.Persistence.Repositories
{
    public class UsuarioRepository : BaseRepository, IUsuarioRepository
    {
        public UsuarioRepository(AppDbContext context) : base(context)
        {
        }

        public async Task AddAsync(Usuario usuario)
        {
            await _context.Usuarios.AddAsync(usuario);
        }

        public async Task<Usuario> FindByUsernameAsync(string username)
        {
            return await _context.Usuarios.SingleOrDefaultAsync(x => x.Username == username);
        }
    }
}
