using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Controllers.DTOs;
using Api.Controllers.Otros;
using AutoMapper;
using Api.Core.Models;
using Api.Core.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [AllowAnonymous]
    public class HabitacionesController : ApiAutenticadoController
    {
        private readonly IHabitacionService _habitacionService;
        private readonly IMapper _mapper;

        public HabitacionesController(IMapper mapper, IHabitacionService habitacionService)
        {
            _mapper = mapper;
            _habitacionService = habitacionService;
        }

        [HttpGet]
        public async Task<IEnumerable<HabitacionDTO>> Listar()
        {
            var habitaciones = await _habitacionService.ListarAsync();
            var habitacionesDTO = _mapper.Map<IEnumerable<HabitacionDTO>>(habitaciones);

            return habitacionesDTO;
        }

        [HttpPost]
        public async Task<IActionResult> Crear([FromBody] HabitacionDTO dto)
        {
            var habitacion = _mapper.Map<Habitacion>(dto);
            var id = await _habitacionService.CrearAsync(habitacion);

            return Ok(id);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Modificar(int id, [FromBody] HabitacionDTO dto)
        {
            var habitacion = _mapper.Map<Habitacion>(dto);
            await _habitacionService.ModificarAsync(id, habitacion);

            return Ok();
        }
    }
}
