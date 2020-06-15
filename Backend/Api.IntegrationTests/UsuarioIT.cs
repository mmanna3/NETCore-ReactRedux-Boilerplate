using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Net.Mime;
using System.Text;
using System.Threading.Tasks;
using Api.Config;
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

            await AccederConTokenACualquierMetodoAutenticado(token);
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

        private async Task DadoQueHayUnUsuarioRegistrado()
        {
            await RegistrarUnUsuario();
        }

        private async Task<HttpResponseMessage> RegistrarUnUsuario()
        {
            var body = new
            {
                nombre = "Jackson",
                apellido = "Watmore",
                username = USERNAME,
                password = PASSWORD
            };

            var json = JsonConvert.SerializeObject(body);
            var stringContent = new StringContent(json, Encoding.UTF8, MediaTypeNames.Application.Json);

            var response = await _httpClient.PostAsync("/api/usuario/registrar", stringContent);
            return response;
        }

        private async Task<HttpResponseMessage> DadoQueElUsuarioRegistradoEstaAutenticado()
        {
            var body = new
            {
                username = USERNAME,
                password = PASSWORD
            };

            var json = JsonConvert.SerializeObject(body);
            var stringContent = new StringContent(json, Encoding.UTF8, MediaTypeNames.Application.Json);

            var response = await _httpClient.PostAsync("/api/usuario/autenticar", stringContent);

            response.StatusCode.Should().Be(HttpStatusCode.OK);

            return response;
        }

        private async Task<HttpResponseMessage> AccederConTokenACualquierMetodoAutenticado(string token)
        {
            _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
            var response = await _httpClient.GetAsync("/api/usuario/okbro");

            response.StatusCode.Should().Be(HttpStatusCode.OK);

            return response;
        }
    }
}