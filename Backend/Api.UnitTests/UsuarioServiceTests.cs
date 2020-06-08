using System.Net;
using System.Threading.Tasks;
using Api.Controllers;
using Api.Controllers.Resources.Usuario;
using Api.Domain.Models;
using Api.Domain.Repositories;
using Api.Domain.Services;
using Api.Persistence.Contexts;
using Api.Persistence.Repositories;
using Api.Services;
using Api.Services.Communication;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using Moq;
using NUnit.Framework;

namespace Api.UnitTests
{
    public class UsuarioServiceTests
    {
        [Test]
        public async Task DeberiaAutenticarConExito()
        {
            const string username = "pedro";
            const string password = "picapiedra";

            var usuario = new Usuario
            {
                Username = username
            };

            var mockRepo = new Mock<IUsuarioRepository>();
            var mockUnitOfWork = new Mock<IUnitOfWork>();
            var service = new UsuarioService(mockRepo.Object, mockUnitOfWork.Object);

            var usuarioRegistroResponse = await service.AddAsync(usuario, password);
            mockRepo.Setup(repo => repo.FindByUsernameAsync(username)).ReturnsAsync(usuarioRegistroResponse.Usuario);


            var result = await service.Autenticar(username, password);

            result.Success.Should().Be(true);
            mockRepo.Verify();
        }
    }
}