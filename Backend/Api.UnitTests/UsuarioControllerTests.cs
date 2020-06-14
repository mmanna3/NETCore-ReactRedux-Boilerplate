using System.Threading.Tasks;
using Api.Controllers;
using Api.Controllers.Resources.Usuario;
using Api.Domain.Models;
using Api.Domain.Services;
using Api.Services.Communication;
using AutoMapper;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using Moq;
using NUnit.Framework;

namespace Api.UnitTests
{
    public class UsuarioControllerTests
    {
        private const string USERNAME = "Elliot";
        private const string PASSWORD = "Alderson";

        private UsuarioController _controller;
        private Mock<IUsuarioService> _mockService;
        private IMapper _mapper;

        private Usuario _unUsuario;
        private RegistroResource _unRegistroResource;

        [SetUp]
        public void Inicializar()
        {
            var configuration = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile(new ResourceToModelTestProfile());
                cfg.AddProfile(new ModelToResourceTestProfile());
            });
            
            _mapper = new Mapper(configuration);
            _mockService = new Mock<IUsuarioService>();
            _controller = new UsuarioController(_mockService.Object, _mapper);
        }

        [Test]
        public async Task Registra_Ok()
        {
            DadoUnRegistroResource();
            DadoUnUsuario();
            DadoQueElServicioDevuelveUnUsuario();

            var resultado = await _controller.Registrar(_unRegistroResource);

            var okObjectResult = resultado.Should().BeOfType<OkObjectResult>().Subject;
            okObjectResult.Value.Should().BeAssignableTo<RegistroResource>();
        }

        private void DadoQueElServicioDevuelveUnUsuario()
        {
            _mockService.Setup(x => x.AddAsync(It.IsAny<Usuario>(), It.IsAny<string>()))
                .ReturnsAsync(new UsuarioResponse(_unUsuario));
        }

        private void DadoUnRegistroResource()
        {
            _unRegistroResource = new RegistroResource
            {
                Nombre = "Jackson",
                Apellido = "Watmore",
                Username = USERNAME,
                Password = PASSWORD
            };
        }

        private void DadoUnUsuario()
        {
            _unUsuario = new Usuario
            {
                Username = USERNAME
            };
        }
    }
}