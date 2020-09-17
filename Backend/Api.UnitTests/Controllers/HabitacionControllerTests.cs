using System.Collections.Generic;
using Api.Controllers;
using Api.Controllers.DTOs.Habitacion;
using Api.Core.Models;
using Api.Core.Services.Interfaces;
using AutoMapper;
using FluentAssertions;
using Moq;
using NUnit.Framework;

namespace Api.UnitTests.Controllers
{
    public class HabitacionControllerTests
    {
        private HabitacionesController _controller;
        private Mock<IHabitacionService> _mockService;
        private IMapper _mapper;

        private HabitacionDTO _unaHabitacionDTO;

        [SetUp]
        public void Inicializar()
        {
            var configuration = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile(new DtoToModelTestProfile());
                cfg.AddProfile(new ModelToDtoTestProfile());
            });
            
            _mapper = new Mapper(configuration);
            _mockService = new Mock<IHabitacionService>();
            _controller = new HabitacionesController(_mapper, _mockService.Object);
        }

        [Test]
        public void MapeaCorrectamenteEnLaCreacion()
        {
            DadoUnHabitacionDto();

            var habitacion = _mapper.Map<Habitacion>(_unaHabitacionDTO);

            habitacion.CamasMatrimoniales.Count.Should().Be(1);
            habitacion.CamasIndividuales.Count.Should().Be(1);
            habitacion.CamasCuchetas.Count.Should().Be(1);
        }

        private void DadoUnHabitacionDto()
        {
            _unaHabitacionDTO = new HabitacionDTO
            {
                Nombre = "Azul",
                CamasIndividuales = new List<CamaDTO>
                {
                    new CamaDTO
                    {
                        Nombre = "Indi"
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
                },
                CamasMatrimoniales = new List<CamaDTO>
                {
                    new CamaDTO
                    {
                        Nombre = "Matri"
                    }
                }
            };
        }
    }
}