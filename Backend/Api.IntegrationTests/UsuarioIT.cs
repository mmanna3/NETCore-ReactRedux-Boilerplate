using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Net.Mime;
using System.Text;
using System.Threading.Tasks;
using Api.Config;
using Api.Controllers.DTOs.Usuario;
using FluentAssertions;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using NUnit.Framework;

namespace Api.IntegrationTests
{
    public class UsuarioIT : BaseIT
    {
        private const string USERNAME = "jackson2";
        private const string PASSWORD = "my-super-secret-password";

        [SetUp]
        public override async Task Setup()
        {
            await ResetearBaseDeDatosExcluyendoMigraciones();
        }

        protected override async Task InicializarHttpClientAutenticado()
        {
            _httpClient = _server.CreateClient();
            await Task.CompletedTask;
        }

        [Test]
        public async Task RegistraUnUsuario()
        {
            var response = await RegistrarUnUsuario();
            response.StatusCode.Should().Be(HttpStatusCode.OK);
        }

        [Test]
        public async Task AutenticaYLuegoAccedeConSuToken_DadoQueEstaRegistrado()
        {
            await DadoQueHayUnUsuarioRegistrado();
            var autenticacionResponse = await DadoQueElUsuarioRegistradoEstaAutenticado();

            dynamic response = await autenticacionResponse.Content.ReadAsAsync<JObject>();
            string token = response.token.ToString();

            await AccederConTokenAUnMetodoAutenticado(token);
        }

        [Test]
        public async Task Error500_AlRegistrarDosVecesAlUsuario()
        {
            await RegistrarUnUsuario();
            
            var response2 = await RegistrarUnUsuario();

            response2.StatusCode.Should().Be((int)HttpStatusCode.InternalServerError);
            var error = await response2.Content.ReadAsAsync<Error>();
            error.Mensaje.Should().Be("Error interno");
            error.StatusCode.Should().Be((int)HttpStatusCode.InternalServerError);
        }

        [Test]
        public async Task Error401_AlIngresarSinTokenAUnMetodo()
        {
            var response = await AccederSinTokenAUnMetodoAutenticado();

            response.StatusCode.Should().Be((int)HttpStatusCode.Unauthorized);
        }

        private async Task DadoQueHayUnUsuarioRegistrado()
        {
            await RegistrarUnUsuario();
        }

        private async Task<HttpResponseMessage> RegistrarUnUsuario()
        {
            var body = new RegistrarDTO
            {
                Nombre = "Jackson",
                Apellido = "Watmore",
                Username = USERNAME,
                Password = PASSWORD
            };

            var json = JsonConvert.SerializeObject(body);
            var stringContent = new StringContent(json, Encoding.UTF8, MediaTypeNames.Application.Json);

            return await _httpClient.PostAsync("/api/usuarios/registrar", stringContent);
        }

        private async Task<HttpResponseMessage> DadoQueElUsuarioRegistradoEstaAutenticado()
        {
            var response = await AutenticarUnUsuario();

            response.StatusCode.Should().Be(HttpStatusCode.OK);

            return response;
        }

        private async Task<HttpResponseMessage> AutenticarUnUsuario()
        {
            var body = new
            {
                username = USERNAME,
                password = PASSWORD
            };

            var json = JsonConvert.SerializeObject(body);
            var stringContent = new StringContent(json, Encoding.UTF8, MediaTypeNames.Application.Json);

            return await _httpClient.PostAsync("/api/usuarios/autenticar", stringContent);
        }

        private async Task<HttpResponseMessage> AccederConTokenAUnMetodoAutenticado(string token)
        {
            _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
            var response = await _httpClient.GetAsync("/api/usuarios/okbro");

            response.StatusCode.Should().Be(HttpStatusCode.OK);

            return response;
        }

        private async Task<HttpResponseMessage> AccederSinTokenAUnMetodoAutenticado()
        {
            return await _httpClient.GetAsync("/api/usuarios/okbro");
        }
    }
}