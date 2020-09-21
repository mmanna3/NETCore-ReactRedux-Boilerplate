using System;
using System.Collections.Generic;
using Api.Controllers.DTOs;
using Api.Core.Models;
using Api.Core.Services.Interfaces;
using Api.Persistence.Config;
using Api.Persistence.Repositories;
using AutoMapper;
using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using Moq;
using NUnit.Framework;

namespace Api.UnitTests.Controllers
{
    public class ReservaRepositoryTests : BaseRepositoryTests
    {
        private ReservaRepository _repository;
        private readonly DateTime DESDE = new DateTime(2020, 09, 17);
        private readonly DateTime HASTA = new DateTime(2020, 09, 17);

        protected override void Inicializar()
        {
            _repository = new ReservaRepository(_context);
        }

        [Test]
        public void Lista_correctamente_lugares_libres_en_la_fecha()
        {
            _context.Habitaciones.Add(new Habitacion { Id = 1, Nombre = "Azul" });

            var cama = new CamaIndividual {Id = 1, Nombre = "Azul", HabitacionId = 1};
            _context.CamasIndividuales.Add(cama);
            
            var reserva = new Reserva {Id = 1, ANombreDe = "Elliot", Desde = DESDE, Hasta = HASTA};
            _context.Reservas.Add(reserva);

            //_context.ReservasDeCamas.Add(new ReservaCama {Cama = cama, Reserva = reserva});

            _context.SaveChanges();



            //_context.ReservasDeCamas.Should().HaveCount(1);
        }
    }
}