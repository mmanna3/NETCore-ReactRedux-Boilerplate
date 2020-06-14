using System.Threading.Tasks;
using Api.Config;
using Api.Domain.Models;
using Api.Domain.Repositories;
using Api.Domain;
using Api.Services;
using FluentAssertions;
using Microsoft.Extensions.Options;
using Moq;
using NUnit.Framework;

namespace Api.UnitTests
{
    public class UsuarioServiceTests
    {
        private const string USERNAME = "Elliot";
        private const string PASSWORD = "Alderson";

        private UsuarioService _service;
        private Usuario _unUsuario;
        
        private Mock<IUsuarioRepository> _mockRepo;
        private Mock<IUnitOfWork> _mockUnitOfWork;
        private Mock<IOptions<AppSettings>> _mockAppSettingsOption;

        [SetUp]
        public void Inicializar()
        {
            _mockRepo = new Mock<IUsuarioRepository>();
            _mockUnitOfWork = new Mock<IUnitOfWork>();
            _mockAppSettingsOption = new Mock<IOptions<AppSettings>>();

            var mockAppSettings = new Mock<AppSettings>();
            mockAppSettings.SetupGet(x => x.Secret).Returns("this is my custom Secret key for authentication");
            _mockAppSettingsOption.Setup(mock => mock.Value).Returns(mockAppSettings.Object);

            _service = new UsuarioService(_mockRepo.Object, _mockUnitOfWork.Object, _mockAppSettingsOption.Object);
        }
        
        [Test]
        public async Task Registra_Ok()
        {
            DadoUnUsuario();

            var usuarioRegistroResponse = await _service.AddAsync(_unUsuario, PASSWORD);

            usuarioRegistroResponse.Success.Should().Be(true);
        }

        [Test]
        public async Task Registra_YDaError_PorqueUsuarioYaExiste()
        {
            await DadoUnUsuarioRegistrado();

            Assert.That(() => _service.AddAsync(_unUsuario, PASSWORD), Throws.Exception.TypeOf<AppException>());
        }

        [Test]
        public async Task Registra_YDaError_PorquePasswordEstaVacio()
        {
            await DadoUnUsuarioRegistrado();

            Assert.That(() => _service.AddAsync(_unUsuario, ""), Throws.Exception.TypeOf<AppException>());
        }

        [Test]
        public async Task AutenticaLuegoDeRegistrar_Ok()
        {
            await DadoUnUsuarioRegistrado();

            var result = await _service.Autenticar(USERNAME, PASSWORD);

            result.Success.Should().Be(true);
        }

        private void DadoUnUsuario()
        {
            _unUsuario = new Usuario
            {
                Username = USERNAME
            };
        }

        private async Task DadoUnUsuarioRegistrado()
        {
            DadoUnUsuario();
            var usuarioRegistroResponse = await _service.AddAsync(_unUsuario, PASSWORD);
            _mockRepo.Setup(repo => repo.FindByUsernameAsync(USERNAME)).ReturnsAsync(usuarioRegistroResponse.Usuario);
        }
    }
}