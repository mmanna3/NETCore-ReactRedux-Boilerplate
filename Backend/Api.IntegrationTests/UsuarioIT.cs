using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Net.Mime;
using System.Text;
using System.Threading.Tasks;
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
        public async Task RegistraUnUsuarioLuegoAutenticaYLuegoAccedeConSuToken()
        {
            var registroResponse = await RegistraUnUsuario();

            var autenticacionResponse = await AutenticarUsuarioRegistrado();

            dynamic response = await autenticacionResponse.Content.ReadAsAsync<JObject>();
            string token = response.token.ToString();

            await AccederConTokenACualquierMetodoAutenticado(token);
        }

        private async Task<HttpResponseMessage> RegistraUnUsuario()
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

            response.StatusCode.Should().Be(HttpStatusCode.OK);

            return response;
        }

        private async Task<HttpResponseMessage> AutenticarUsuarioRegistrado()
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