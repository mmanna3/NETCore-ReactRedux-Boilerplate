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
        private readonly DateTime DESDE = new DateTime(2020, 07, 17);
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

        [Test]
        public void MapeaCorrectamenteEnLaConsultaMensual()
        {
            DadaUnaListaDeReservas();

            var reservasDTO = _mapper.Map<ReservasDelMesDTO>(_unaListaDeReservas, op =>
            {
                op.Items["mesInicial"] = 8;
                op.Items["mesFinal"] = 8;
                op.Items["diaInicial"] = 1;
                op.Items["diaFinal"] = DateTime.DaysInMonth(2020, 8);
            });
            var primeraReserva = reservasDTO.Reservas.First();

            reservasDTO.DiasDelMes.Should().Be(31);

            primeraReserva.DiaInicio.Should().Be(1);
            primeraReserva.DiaFin.Should().Be(31);
            primeraReserva.ANombreDe.Should().Be(A_NOMBRE_DE);
            primeraReserva.CamasIds.Should().HaveCount(2);
            primeraReserva.CamasIds.First().Should().Be(1);
            primeraReserva.CamasIds.Skip(1).First().Should().Be(2);
        }

        private void DadaUnaListaDeReservas()
        {
            _unaListaDeReservas = new List<Reserva>();

            var cama1 = new CamaCuchetaDeAbajo {Id = 1, Nombre = "a"};
            var cama2 = new CamaIndividual {Id = 2, Nombre = "b"};
            
            var r1 = new Reserva
            {
                Desde = DESDE,
                Hasta = HASTA,
                ANombreDe = A_NOMBRE_DE,
                ReservaCamas = new List<ReservaCama> { new ReservaCama{ Cama = cama1, CamaId = cama1.Id}, new ReservaCama{ Cama = cama2, CamaId = cama2.Id } }
            };

            var r2 = new Reserva
            {
                Desde = DESDE,
                Hasta = HASTA,
                ANombreDe = A_NOMBRE_DE,
                ReservaCamas = new List<ReservaCama> { new ReservaCama { Cama = cama1, CamaId = cama1.Id }, new ReservaCama { Cama = cama2, CamaId = cama2.Id } }
            };

            _unaListaDeReservas.Add(r1);
            _unaListaDeReservas.Add(r2);
        }

        private void DadaUnaReservaDto()
        {
            _unaReservaDto = new ReservaDTO
            {
                ANombreDe = A_NOMBRE_DE,
                CamasIds = new List<int?>{UN_CAMA_ID},
                Desde = Utilidades.ConvertirFecha(DESDE),
                Hasta = Utilidades.ConvertirFecha(HASTA)
            };
        }
    }
}