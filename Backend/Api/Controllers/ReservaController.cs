using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Controllers.DTOs;
using Api.Core;
using Api.Core.Models;
using AutoMapper;
using Api.Core.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    public class ReservasController : ApiAutenticadoController
    {
        private readonly IReservaService _service;
        private readonly IMapper _mapper;

        public ReservasController(IMapper mapper, IReservaService service)
        {
            _mapper = mapper;
            _service = service;
        }

        [HttpGet]
        public async Task<IEnumerable<ReservaDTO>> Listar()
        {
            var reservas = await _service.Listar();
            var reservaDTOs = _mapper.Map<IEnumerable<ReservaDTO>>(reservas);

            return reservaDTOs;
        }

        [HttpGet, Route("mensuales")]
        public async Task<ReservasDelMesDTO> ListarMensuales(int anio, int mes)
        {
            var reservas = await _service.ListarMensuales(anio, mes);
            var reservaDTOs = _mapper.Map<ReservasDelMesDTO>(reservas, op =>
            {
                op.Items["mes"] = mes; 
                op.Items["anio"] = anio;
            });

            return reservaDTOs;
        }

        [HttpPost]
        public async Task<int> Crear([FromBody] ReservaDTO dto)
        {
            if (dto.CamasIds.Count != dto.CamasIds.Distinct().Count())
                throw new AppException("No puede reservarse dos veces la misma cama");

            var reserva = _mapper.Map<Reserva>(dto);
            var id = await _service.Crear(reserva);

            return id;
        }
    }
}
