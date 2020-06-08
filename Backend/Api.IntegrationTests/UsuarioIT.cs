using System.Net;
using System.Net.Http;
using System.Net.Mime;
using System.Text;
using System.Threading.Tasks;
using FluentAssertions;
using Newtonsoft.Json;
using NUnit.Framework;

namespace Api.IntegrationTests
{
    public class UsuarioIT : BaseIT
    {
        [Test]
        public async Task RegistraUnUsuario()
        {
            var body = new
            {
                nombre = "Jackson",
                apellido = "Watmore",
                username = "jackson",
                password = "my-super-secret-password"
            };

            var json = JsonConvert.SerializeObject(body);
            var stringContent = new StringContent(json, Encoding.UTF8, MediaTypeNames.Application.Json);

            var response = await _httpClient.PostAsync("/api/usuario/registrar", stringContent);

            response.StatusCode.Should().Be(HttpStatusCode.OK);
        }
    }
}