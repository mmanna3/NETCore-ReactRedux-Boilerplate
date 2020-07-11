using System.Collections.Generic;
using Api.Core;
using Api.Core.Models;
using Api.Core.Repositories;
using Api.Core.Services;
using Api.Core.Services.Interfaces;
using Moq;
using NUnit.Framework;

namespace Api.UnitTests.Services
{
    public class HabitacionServiceTests
    {
        private IHabitacionService _service;

        private Mock<IHabitacionRepository> _mockRepo;
        private Mock<IUnitOfWork> _mockUnitOfWork;

        private const string TODAS_LAS_CAMAS_DEBEN_TENER_IDENTIFICADOR = "Todas las camas deben tener Identificador";

        [SetUp]
        public void Inicializar()
        {
            _mockRepo = new Mock<IHabitacionRepository>();
            _mockUnitOfWork = new Mock<IUnitOfWork>();
            _service = new HabitacionService(_mockRepo.Object, _mockUnitOfWork.Object);
        }

        [Test]
        public void HayCamasIndividualesSinNombre_EntoncesHayCamasSinNombreDevuelveTrue()
        {
            var habitacion = new Habitacion
            {
                CamasIndividuales = new List<CamaIndividual>
                {
                    new CamaIndividual { Nombre = "Individual1" },
                    new CamaIndividual { Nombre = "" },
                }
            };

            Assert.That(() => _service.CrearAsync(habitacion),
                Throws.Exception
                    .TypeOf<AppException>()
                    .With.Property("Message").EqualTo(TODAS_LAS_CAMAS_DEBEN_TENER_IDENTIFICADOR))
                ;
        }

        //[Test]
        //public async Task Registra_YDaError_DadoQueUsuarioYaExiste()
        //{
        //    await DadoUnUsuarioRegistrado();

        //    Assert.That(() => _service.AddAsync(_unUsuario, PASSWORD), Throws.Exception.TypeOf<AppException>());
        //}

        //[Test]
        //public async Task Registra_YDaError_DadoUnPasswordVacio()
        //{
        //    await DadoUnUsuarioRegistrado();

        //    Assert.That(() => _service.AddAsync(_unUsuario, ""), Throws.Exception.TypeOf<AppException>());
        //}

        //[Test]
        //public async Task Autentica_Ok_DadoQueEstaRegistrado()
        //{
        //    await DadoUnUsuarioRegistrado();

        //    var result = await _service.Autenticar(USERNAME, PASSWORD);

        //    result.Should().BeOfType<Usuario>();
        //}

        //private void DadoUnUsuario()
        //{
        //    _unUsuario = new Usuario
        //    {
        //        Username = USERNAME
        //    };
        //}

        //private async Task DadoUnUsuarioRegistrado()
        //{
        //    DadoUnUsuario();
        //    var usuarioRegistroResponse = await _service.AddAsync(_unUsuario, PASSWORD);
        //    _mockRepo.Setup(repo => repo.FindByUsernameAsync(USERNAME)).ReturnsAsync(_unUsuario);
        //}
    }
}