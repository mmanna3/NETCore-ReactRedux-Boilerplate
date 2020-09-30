using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Api.Controllers.DTOs;
using Api.Controllers.DTOs.Habitacion;
using Api.Core;
using FluentAssertions;
using NUnit.Framework;

namespace Api.IntegrationTests
{
    public class ReservasIT : BaseAutenticadoIT
    {
        private const string ENDPOINT = "/api/reservas";
        private const string ENDPOINT_HABITACIONES = "/api/habitaciones";

        private const string A_NOMBRE_DE = "Un nombre";
        private int UN_CAMA_ID;
        private readonly DateTime DESDE = new DateTime(2020, 09, 17);
        private readonly DateTime HASTA = new DateTime(2020, 09, 18);

        [Test]
        public async Task CreaReservaCorrectamente()
        {

            var body = new HabitacionDTO
            {
                Nombre = "Azul",
                CamasIndividuales = new List<CamaDTO>
                {
                    new CamaDTO
                    {
                        Nombre = "Indi"
                    }
                }
            };

            var habitacionId = await _httpClient.PostAsJsonAsync(ENDPOINT_HABITACIONES, body);
            var habitacionesDTO = await (await _httpClient.GetAsync(ENDPOINT_HABITACIONES)).Content.ReadAsAsync<IEnumerable<HabitacionDTO>>();
            UN_CAMA_ID = habitacionesDTO.First().CamasIndividuales.First().Id;

            var response = await CrearReserva();
            response.StatusCode.Should().Be(HttpStatusCode.OK);

            //var consultaResponse = await ListarReservas();
            //consultaResponse.StatusCode.Should().Be(HttpStatusCode.OK);
            //var reservas = await consultaResponse.Content.ReadAsAsync<IEnumerable<ReservaDTO>>();

            //reservas.Count().Should().Be(1);
            //var reserva = reservas.ToList().First();

            //reserva.ANombreDe.Should().Be(A_NOMBRE_DE);
            //reserva.Desde.Should().Be(DESDE.ToShortDateString());
            //reserva.Hasta.Should().Be(HASTA.ToShortDateString());
            //reserva.CamasIds.Should().HaveCount(1);
            //reserva.CamasIds.First().Should().Be(UN_CAMA_ID);
        }

        private async Task<HttpResponseMessage> CrearReserva()
        {
            var body = new ReservaDTO
            {
                ANombreDe = A_NOMBRE_DE,
                CamasIds = new List<int?> { UN_CAMA_ID },
                Desde = Utilidades.Convertir(DESDE),
                Hasta = Utilidades.Convertir(HASTA)
            };

            return await _httpClient.PostAsJsonAsync(ENDPOINT, body);
        }

        private async Task<HttpResponseMessage> ListarReservas()
        {
            return await _httpClient.GetAsync(ENDPOINT);
        }
    }
}