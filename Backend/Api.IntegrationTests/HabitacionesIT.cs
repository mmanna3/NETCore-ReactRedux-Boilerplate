using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Api.Controllers.DTOs;
using FluentAssertions;
using NUnit.Framework;

namespace Api.IntegrationTests
{
    public class HabitacionesIT : BaseAutenticadoIT
    {
        private const string ENDPOINT = "/api/habitaciones";
        private const byte CAMAS_MATRIMONIALES = 2;

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

        [Test]
        public async Task ModificaHabitacionCorrectamente()
        {
            var response = await CrearUnaHabitacion();
            var id = await response.Content.ReadAsAsync<int>();

            var body = new HabitacionDTO
            {
                Nombre = "Roja",
                CamasIndividuales = 1,
                CamasMatrimoniales = CAMAS_MATRIMONIALES,
                CamasMarineras = 3,
            };

            var responseModificar = await _httpClient.PutAsJsonAsync($"{ENDPOINT}/{id}", body);
            responseModificar.StatusCode.Should().Be(HttpStatusCode.OK);


            var consultarHabitacionesResponse = await ListarHabitaciones();
            consultarHabitacionesResponse.StatusCode.Should().Be(HttpStatusCode.OK);
            var habitaciones = await consultarHabitacionesResponse.Content.ReadAsAsync<IEnumerable<HabitacionDTO>>();

            habitaciones.Count().Should().Be(1);
            habitaciones.ToList().First().Nombre.Should().Be("Roja");
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

            return await _httpClient.PostAsJsonAsync(ENDPOINT, body);
        }

        private async Task<HttpResponseMessage> ListarHabitaciones()
        {
            return await _httpClient.GetAsync(ENDPOINT);
        }
    }
}