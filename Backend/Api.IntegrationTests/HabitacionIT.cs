using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Net.Mime;
using System.Text;
using System.Threading.Tasks;
using Api.Config;
using Api.Controllers.DTOs;
using Api.Controllers.Resources;
using FluentAssertions;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using NUnit.Framework;

namespace Api.IntegrationTests
{
    public class HabitacionIT : BaseIT
    {
        private const byte CAMAS_MATRIMONIALES = 2;

        //CreaHabitacionAutenticado

        [Test]
        public async Task CreaHabitacionCorrectamente()
        {
            var response = await CrearUnaHabitacion();
            response.StatusCode.Should().Be(HttpStatusCode.OK);

            var consultarHabitacionesResponse = await ListarHabitaciones();
            consultarHabitacionesResponse.StatusCode.Should().Be(HttpStatusCode.OK);
            var habitaciones = await consultarHabitacionesResponse.Content.ReadAsAsync<IEnumerable<HabitacionDTO>>();
            
            habitaciones.Count().Should().Be(1);
            habitaciones.ToList().First().CamasMatrimoniales.Should().Be(CAMAS_MATRIMONIALES);
        }

        private async Task<HttpResponseMessage> CrearUnaHabitacion()
        {
            var body = new HabitacionDTO
            {
                Nombre = "Azul",
                CamasIndividuales = 1,
                CamasMatrimoniales = CAMAS_MATRIMONIALES,
                CamasMarineras = 3,
            };

            var json = JsonConvert.SerializeObject(body);
            var stringContent = new StringContent(json, Encoding.UTF8, MediaTypeNames.Application.Json);

            var response = await _httpClient.PostAsync("/api/habitacion/crear", stringContent);
            return response;
        }

        private async Task<HttpResponseMessage> ListarHabitaciones()
        {
            return await _httpClient.GetAsync("/api/habitacion/listar");
        }
    }
}