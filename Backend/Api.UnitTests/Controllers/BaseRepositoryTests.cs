using Api.Persistence.Config;
using Microsoft.EntityFrameworkCore;
using NUnit.Framework;

namespace Api.UnitTests.Controllers
{
    public class BaseRepositoryTests
    {
        protected AppDbContext _context;

        [SetUp]
        private void InicializarBase()
        {
            var options = new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(databaseName: "BaseDePrueba")
                .Options;

            _context = new AppDbContext(options);

            Inicializar();
        }

        protected virtual void Inicializar()
        {
        }
    }
}