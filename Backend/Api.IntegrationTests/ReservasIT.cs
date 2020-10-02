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
        private const string CAMA_TIPO = "Individual";
        private readonly DateTime DESDE = new DateTime(2020, 09, 17);
        private readonly DateTime HASTA = new DateTime(2020, 09, 18);

        [Test]
        public async Task Crear_UnaReserva_Y_Listarla()
        {

            var camaId = await CrearHabitacionConUnaCama();

            var response = await CrearReserva(camaId);
            response.StatusCode.Should().Be(HttpStatusCode.OK);

            var consultaResponse = await ListarReservasMensuales(DESDE.Month);
            consultaResponse.StatusCode.Should().Be(HttpStatusCode.OK);
            var reservasDelMes = await consultaResponse.Content.ReadAsAsync<ReservasDelMesDTO>();

            reservasDelMes.Reservas.Count().Should().Be(1);
            var reserva = reservasDelMes.Reservas.ToList().First();

            reserva.ANombreDe.Should().Be(A_NOMBRE_DE);
            reserva.DiaInicio.Should().Be(17);
            reserva.DiaFin.Should().Be(18);
            reserva.CamasIds.Should().HaveCount(1);
            reserva.CamasIds.First().Should().Be(camaId);
        }

        private async Task<int> CrearHabitacionConUnaCama()
        {
            var body = new HabitacionDTO
            {
                Nombre = "Roja",
                CamasIndividuales = new List<CamaDTO>
                {
                    new CamaDTO
                    {
                        Nombre = "Indios",
                        Tipo = CAMA_TIPO
                    }
                }
            };

            await _httpClient.PostAsJsonAsync(ENDPOINT_HABITACIONES, body);
            var habitacionesDTO = await (await _httpClient.GetAsync(ENDPOINT_HABITACIONES)).Content
                .ReadAsAsync<IEnumerable<HabitacionDTO>>();

            return habitacionesDTO.First().CamasIndividuales.First().Id;
        }

        private async Task<HttpResponseMessage> CrearReserva(int camaId)
        {
            var body = new ReservaDTO
            {
                ANombreDe = A_NOMBRE_DE,
                CamasIds = new List<int?> { camaId },
                Desde = Utilidades.ConvertirFecha(DESDE),
                Hasta = Utilidades.ConvertirFecha(HASTA)
            };

            return await _httpClient.PostAsJsonAsync(ENDPOINT, body);
        }

        private async Task<HttpResponseMessage> ListarReservasMensuales(int mes)
        {
            return await _httpClient.GetAsync(ENDPOINT + $"/mensuales?mes={mes}");
        }
    }
}