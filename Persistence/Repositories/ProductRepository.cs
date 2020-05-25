using System.Collections.Generic;
using System.Threading.Tasks;
using Hostelapp.Domain.Models;
using Hostelapp.Domain.Repositories;
using Hostelapp.Persistence.Contexts;
using Microsoft.EntityFrameworkCore;

namespace Hostelapp.Persistence.Repositories
{
    public class ProductRepository : BaseRepository, IProductRepository
    {
        public ProductRepository(AppDbContext context) : base(context)
        {
        }

        public async Task<IEnumerable<Product>> ListAsync()
        {
            return await _context.Products.Include(p => p.Category)
                .ToListAsync();
        }
    }
}
