using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Hostelapp.Domain.Repositories;
using Hostelapp.Persistence.Contexts;

namespace Hostelapp.Persistence.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly AppDbContext _context;

        public UnitOfWork(AppDbContext context)
        {
            _context = context;
        }

        public async Task CompleteAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
