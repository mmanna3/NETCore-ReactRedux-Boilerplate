using System.Collections.Generic;
using Api.Controllers.DTOs.Habitacion;
using FluentAssertions;
using NUnit.Framework;

namespace Api.UnitTests.Controllers
{
    public class HabitacionDTOTests
    {
        //[Test]
        //public void HayCamasIndividualesSinNombre_EntoncesHayCamasSinNombreDevuelveTrue()
        //{
        //    var sut = new HabitacionDTO
        //    {
        //        CamasIndividuales = new List<CamaIndividualDTO>
        //        {
        //            new CamaIndividualDTO { Nombre = "Individual1" },
        //            new CamaIndividualDTO { Nombre = "" },
        //        }
        //    };

        //    sut.HayCamasSinNombre().Should().Be(true);
        //}

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
            var sut = new HabitacionDTO
            {
                CamasMarineras = new List<CamaMarineraDTO>
                {
                    new CamaMarineraDTO { NombreAbajo = "Abajo1", NombreArriba = "Arriba1"},
                    new CamaMarineraDTO { NombreAbajo = "Abajo1" },
                }
            };
            sut.HayCamasSinNombre().Should().Be(true);

            var sut2 = new HabitacionDTO
            {
                CamasMarineras = new List<CamaMarineraDTO>
                {
                    new CamaMarineraDTO { NombreAbajo = "Abajo1", NombreArriba = "Arriba1"},
                    new CamaMarineraDTO { NombreArriba = "Arriba1" },
                }
            };
            sut2.HayCamasSinNombre().Should().Be(true);

            var sut3 = new HabitacionDTO
            {
                CamasMarineras = new List<CamaMarineraDTO>
                {
                    new CamaMarineraDTO { NombreAbajo = "Abajo1", NombreArriba = "Arriba1"},
                    new CamaMarineraDTO { NombreArriba = "", NombreAbajo = ""},
                }
            };
            sut3.HayCamasSinNombre().Should().Be(true);
        }

        //[Test]
        //public void TodasLasCamasTienenNombre_EntoncesHayCamasSinNombreDevuelveFalse()
        //{
        //    var sut = new HabitacionDTO
        //    {
        //        CamasIndividuales = new List<CamaIndividualDTO>
        //        {
        //            new CamaIndividualDTO { Nombre = "Individual1" },
        //        },
        //        CamasMarineras = new List<CamaMarineraDTO>
        //        {
        //            new CamaMarineraDTO { NombreAbajo = "Abajo1", NombreArriba = "Arriba1"},
        //        }
        //    };

        //    sut.HayCamasSinNombre().Should().Be(false);
        //}

        [Test]
        public void HayCamasDelMismoTipoConIdentificadorRepetido_EntoncesHayCamasConIdentificadorRepetidoDevuelveTrue()
        {
            var sut = new HabitacionDTO
            {
                CamasMatrimoniales = new List<CamaMatrimonialDTO>
                {
                    new CamaMatrimonialDTO { Nombre = "Matrimonial1" },
                    new CamaMatrimonialDTO { Nombre = "Matrimonial1" },
                }
            };

            sut.HayCamasConIdentificadorRepetido().Should().Be(true);
        }

        [Test]
        public void HayCamasDeDistintoTipoConIdentificadorRepetido_EntoncesHayCamasConIdentificadorRepetidoDevuelveTrue()
        {
            var sut = new HabitacionDTO
            {
                CamasIndividuales = new List<CamaIndividualDTO>
                {
                    new CamaIndividualDTO { Nombre = "Individual1" },
                },
                CamasMarineras = new List<CamaMarineraDTO>
                {
                    new CamaMarineraDTO { NombreAbajo = "Individual1", NombreArriba = "Arriba1"},
                }
            };

            sut.HayCamasConIdentificadorRepetido().Should().Be(true);
        }

        [Test]
        public void NoHayCamasConIdentificadorRepetido_EntoncesHayCamasConIdentificadorRepetidoDevuelveFalse()
        {
            var sut = new HabitacionDTO
            {
                CamasIndividuales = new List<CamaIndividualDTO>
                {
                    new CamaIndividualDTO { Nombre = "Individual1" },
                },
                CamasMarineras = new List<CamaMarineraDTO>
                {
                    new CamaMarineraDTO { NombreAbajo = "xasdsad", NombreArriba = "Arriba1"},
                },
                CamasMatrimoniales = new List<CamaMatrimonialDTO>
                {
                    new CamaMatrimonialDTO { Nombre = "aaaaaaa"},
                }
            };

            sut.HayCamasConIdentificadorRepetido().Should().Be(false);
        }
    }
}
