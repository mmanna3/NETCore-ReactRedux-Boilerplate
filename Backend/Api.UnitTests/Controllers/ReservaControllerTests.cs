using System;
using System.Collections.Generic;
using System.Linq;
using Api.Controllers;
using Api.Controllers.DTOs;
using Api.Controllers.DTOs.Habitacion;
using Api.Core;
using Api.Core.Models;
using Api.Core.Services.Interfaces;
using AutoMapper;
using FluentAssertions;
using Moq;
using NUnit.Framework;

namespace Api.UnitTests.Controllers
{
    public class ReservaControllerTests
    {
        private ReservasController _controller;
        private Mock<IReservaService> _mockService;
        private IMapper _mapper;

        private ReservaDTO _unaReservaDto;
        private IList<Reserva> _unaListaDeReservas;
        private const string A_NOMBRE_DE = "Un nombre";
        private const int UN_CAMA_ID = 1;
        private readonly DateTime DESDE = new DateTime(2020, 09, 17);
        private readonly DateTime HASTA = new DateTime(2020, 09, 17);

        [SetUp]
        public void Inicializar()
        {
            var configuration = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile(new DtoToModelTestProfile());
                cfg.AddProfile(new ModelToDtoTestProfile());
            });
            
            _mapper = new Mapper(configuration);
            _mockService = new Mock<IReservaService>();
            _controller = new ReservasController(_mapper, _mockService.Object);
        }

        [Test]
        public void MapeaCorrectamenteEnLaCreacion()
        {
            DadaUnaReservaDto();

            var reserva = _mapper.Map<Reserva>(_unaReservaDto);

            reserva.ANombreDe.Should().Be(A_NOMBRE_DE);
            reserva.Desde.Should().Be(DESDE);
            reserva.Hasta.Should().Be(HASTA);
            reserva.ReservaCamas.Should().HaveCount(1);
            reserva.ReservaCamas.First().CamaId.Should().Be(UN_CAMA_ID);
        }

        //[Test]
        //public void MapeaCorrectamenteEnLaConsulta()
        //{
        //    DadaUnaListaDeHabitaciones();

        //    var habitacionesDTO = _mapper.Map<IEnumerable<HabitacionDTO>>(_unaListaDeHabitaciones).ToList();

        //    habitacionesDTO.First().CamasMatrimoniales.Count.Should().Be(1);
        //    habitacionesDTO.First().CamasIndividuales.Count.Should().Be(1);
        //    habitacionesDTO.First().CamasCuchetas.Count.Should().Be(1);
        //}

        //private void DadaUnaListaDeHabitaciones()
        //{
        //    _unaListaDeHabitaciones = new List<Habitacion>();

        //    var h1 = new Habitacion
        //    {
        //        Nombre = "Azul",
        //        CamasIndividuales = new List<CamaIndividual>
        //        {
        //            new CamaIndividual
        //            {
        //                Nombre = "Indi"
        //            }
        //        },
        //        CamasCuchetas = new List<CamaCucheta>
        //        {
        //            new CamaCucheta
        //            {
        //                Abajo = new CamaCuchetaDeAbajo
        //                {
        //                    Nombre = "Abajo"
        //                },
        //                Arriba = new CamaCuchetaDeArriba
        //                {
        //                    Nombre = "Arriba"
        //                }
        //            }
        //        },
        //        CamasMatrimoniales = new List<CamaMatrimonial>
        //        {
        //            new CamaMatrimonial
        //            {
        //                Nombre = "Matri"
        //            }
        //        }
        //    };

        //    _unaListaDeHabitaciones.Add(h1);
        //}

        private void DadaUnaReservaDto()
        {
            _unaReservaDto = new ReservaDTO
            {
                ANombreDe = A_NOMBRE_DE,
                CamasIds = new List<int>{UN_CAMA_ID},
                Desde = Utilidades.Convertir(DESDE),
                Hasta = Utilidades.Convertir(HASTA)
            };
        }
    }
}