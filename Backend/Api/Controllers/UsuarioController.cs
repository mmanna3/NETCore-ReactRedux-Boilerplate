using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using Api.Controllers.Resources.Usuario;
using Api.Domain;
using Api.Domain.Models;
using Api.Domain.Services;
using Api.Extensions;
using Microsoft.AspNetCore.Authorization;


namespace Api.Controllers
{
    [Authorize]
    [ApiController]
    public class UsuarioController : BaseController
    {
        private readonly IUsuarioService _userService;
        private readonly IMapper _mapper;

        public UsuarioController(IUsuarioService userService, IMapper mapper)
        {
            _userService = userService;
            _mapper = mapper;
        }

        [AllowAnonymous]
        [HttpPost("autenticar")]
        public async Task<IActionResult> Autenticar([FromBody] AutenticarResource model)
        {
            var usuarioResponse = await _userService.Autenticar(model.Username, model.Password);

            if (usuarioResponse == null)
                return BadRequest(new { message = "Username or password is incorrect" });

            var token = _userService.ObtenerToken(usuarioResponse.Usuario.Id);

            return Ok(new
            {
                Id = usuarioResponse.Usuario.Id,
                Username = usuarioResponse.Usuario.Username,
                FirstName = usuarioResponse.Usuario.Nombre,
                LastName = usuarioResponse.Usuario.Apellido,
                Token = token
            });
        }

        [AllowAnonymous]
        [HttpPost("registrar")]
        public async Task<IActionResult> Registrar([FromBody] RegistrarUsuarioDTO dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState.GetErrorMessages());

            try
            {
                var usuario = _mapper.Map<RegistrarUsuarioDTO, Usuario>(dto);
                var result = await _userService.AddAsync(usuario, dto.Password);
                var usuarioDTO = _mapper.Map<Usuario, RegistrarUsuarioDTO>(result);
                return Ok(usuarioDTO);
            }
            catch (AppException e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("okbro")]
        public IActionResult GetAll()
        {
            return Ok("OK bro");
        }

        //[HttpGet("{id}")]
        //public IActionResult GetById(int id)
        //{
        //    var user = _userService.GetById(id);
        //    var model = _mapper.Map<UserModel>(user);
        //    return Ok(model);
        //}

        //[HttpPut("{id}")]
        //public IActionResult Update(int id, [FromBody] UpdateModel model)
        //{
        //    // map model to entity and set id
        //    var user = _mapper.Map<User>(model);
        //    user.Id = id;

        //    try
        //    {
        //        // update user 
        //        _userService.Update(user, model.Password);
        //        return Ok();
        //    }
        //    catch (AppException ex)
        //    {
        //        // return error message if there was an exception
        //        return BadRequest(new { message = ex.Message });
        //    }
        //}

        //[HttpDelete("{id}")]
        //public IActionResult Delete(int id)
        //{
        //    _userService.Delete(id);
        //    return Ok();
        //}
    }
}
