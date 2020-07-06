using System.Collections.Generic;
using Api.Controllers.DTOs.Habitacion;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using NUnit.Framework;

namespace Api.UnitTests.Controllers
{
    public class HabitacionDTOTests
    {
        [Test]
        public void HayCamasIndividualesSinNombre_EntoncesHayCamasSinNombreDevuelveTrue()
        {
            var sut = new HabitacionDTO
            {
                CamasIndividuales = new List<CamaIndividualDTO>
                {
                    new CamaIndividualDTO { Nombre = "Individual1" },
                    new CamaIndividualDTO { Nombre = "" },
                }
            };

            sut.HayCamasSinNombre().Should().Be(true);
        }

        [Test]
        public void HayCamasMatrimonialesSinNombre_EntoncesHayCamasSinNombreDevuelveTrue()
        {
            var sut = new HabitacionDTO
            {
                CamasMatrimoniales = new List<CamaMatrimonialDTO>
                {
                    new CamaMatrimonialDTO { Nombre = "Matrimonial1" },
                    new CamaMatrimonialDTO { Nombre = "" },
                }
            };

            sut.HayCamasSinNombre().Should().Be(true);
        }

        [Test]
        public void HayCamasMarinerasSinNombre_EntoncesHayCamasSinNombreDevuelveTrue()
        {

        }

        [Test]
        public void TodasLasCamasTienenNombre_EntoncesHayCamasSinNombreDevuelveTrue()
        {

        }
    }
}
