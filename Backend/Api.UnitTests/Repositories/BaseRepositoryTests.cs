using System;
using Api.Persistence.Config;
using Microsoft.EntityFrameworkCore;
using NUnit.Framework;

namespace Api.UnitTests.Repositories
{
    public class BaseRepositoryTests
    {
        protected AppDbContext _context;

        [SetUp]
        public void InicializarBase()
        {
            var options = new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;

            _context = new AppDbContext(options);

            Inicializar();
        }

        protected virtual void Inicializar()
        {
        }
    }
}