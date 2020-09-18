using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Api.Controllers.DTOs.Habitacion;
using FluentAssertions;
using NUnit.Framework;

namespace Api.IntegrationTests
{
    public class HabitacionesIT : BaseAutenticadoIT
    {
        private const string ENDPOINT = "/api/habitaciones";

        [Test]
        public async Task CreaHabitacionCorrectamente()
        {
            var response = await CrearUnaHabitacion();
            response.StatusCode.Should().Be(HttpStatusCode.OK);

            var consultarHabitacionesResponse = await ListarHabitaciones();
            consultarHabitacionesResponse.StatusCode.Should().Be(HttpStatusCode.OK);
            var habitaciones = await consultarHabitacionesResponse.Content.ReadAsAsync<IEnumerable<HabitacionDTO>>();

            habitaciones.Count().Should().Be(1);
            var habitacion = habitaciones.ToList().First();

            habitacion.CamasMatrimoniales.Count.Should().Be(1);
            habitacion.CamasIndividuales.Count.Should().Be(1);

            habitacion.CamasCuchetas.Count.Should().Be(1);
            habitacion.CamasCuchetas.First().Abajo.Should().NotBeNull();
            habitacion.CamasCuchetas.First().Arriba.Should().NotBeNull();
        }

        [Test, Ignore("Esto no funca, cuando hagas la edición, revisalo piola")]
        public void ModificaHabitacionCorrectamente()
        {
            //var response = await CrearUnaHabitacion();
            //var id = await response.Content.ReadAsAsync<int>();

            //var body = new HabitacionDTO
            //{
            //    Nombre = "Roja",
            //    CamasIndividuales = new List<CamaDTO>(),
            //    CamasMatrimoniales = new List<CamaDTO>(),
            //    CamasCuchetas = new List<CamaCuchetaDTO>
            //    {
            //        new CamaCuchetaDTO
            //        {
            //            NombreAbajo = "Abajo",
            //            NombreArriba = "Arriba",
            //        }
            //    }
            //};

            //var responseModificar = await _httpClient.PutAsJsonAsync($"{ENDPOINT}/{id}", body);
            //responseModificar.StatusCode.Should().Be(HttpStatusCode.OK);


            //var consultarHabitacionesResponse = await ListarHabitaciones();
            //consultarHabitacionesResponse.StatusCode.Should().Be(HttpStatusCode.OK);
            //var habitaciones = await consultarHabitacionesResponse.Content.ReadAsAsync<IEnumerable<HabitacionDTO>>();

            //habitaciones.Count().Should().Be(1);

            //var habitacion = habitaciones.ToList().First();
            
            //habitacion.CamasIndividuales.Count.Should().Be(0);
            //habitacion.CamasMatrimoniales.Count.Should().Be(0);
            //habitacion.CamasCuchetas.Count.Should().Be(1);
            //habitacion.Nombre.Should().Be("Roja");
        }

        public async Task<HttpResponseMessage> CrearUnaHabitacion()
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
                },
                CamasMatrimoniales = new List<CamaDTO>
                {
                    new CamaDTO
                    {
                        Nombre = "Matrimonial1"
                    }
                },
                CamasCuchetas = new List<CamaCuchetaDTO>
                {
                    new CamaCuchetaDTO
                    {
                        Abajo = new CamaDTO
                        {
                            Nombre = "Abajo"
                        },
                        Arriba = new CamaDTO
                        {
                            Nombre = "Arriba"
                        }
                    }
                }
            };

            return await _httpClient.PostAsJsonAsync(ENDPOINT, body);
        }

        private async Task<HttpResponseMessage> ListarHabitaciones()
        {
            return await _httpClient.GetAsync(ENDPOINT);
        }
    }
}