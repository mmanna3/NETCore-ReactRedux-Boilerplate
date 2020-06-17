using System;
using System.Threading.Tasks;
using Api.Config;
using Api.Core;
using Api.Core.Models;
using Api.Core.Repositories;
using Api.Core.Services;
using Api.Core.Services.Interfaces;
using FluentAssertions;
using Microsoft.Extensions.Options;
using Moq;
using NUnit.Framework;

namespace Api.UnitTests.Services
{
    public class HabitacionServiceTests
    {
        //private IHabitacionService _service;

        //private Mock<IHabitacionRepository> _mockRepo;
        //private Mock<IUnitOfWork> _mockUnitOfWork;

        //[SetUp]
        //public void Inicializar()
        //{
        //    _mockRepo = new Mock<IHabitacionRepository>();
        //    _mockUnitOfWork = new Mock<IUnitOfWork>();
        //    _service = new HabitacionService(_mockRepo.Object, _mockUnitOfWork.Object);
        //}

        //[SetUp]
        //public void Inicializar()
        //{
        //    _mockRepo = new Mock<IUsuarioRepository>();
        //    _mockUnitOfWork = new Mock<IUnitOfWork>();
        //    _mockAppSettingsOption = new Mock<IOptions<AppSettings>>();

        //    var mockAppSettings = new Mock<AppSettings>();
        //    mockAppSettings.SetupGet(x => x.Secret).Returns("this is my custom Secret key for authentication");
        //    _mockAppSettingsOption.Setup(mock => mock.Value).Returns(mockAppSettings.Object);

        //    _service = new UsuarioService(_mockRepo.Object, _mockUnitOfWork.Object, _mockAppSettingsOption.Object);
        //}

        //[Test]
        //public async Task Registra_Ok()
        //{
        //    DadoUnUsuario();

        //    var usuarioRegistroResponse = await _service.AddAsync(_unUsuario, PASSWORD);

        //    usuarioRegistroResponse.Should().NotBe(null);
        //}

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