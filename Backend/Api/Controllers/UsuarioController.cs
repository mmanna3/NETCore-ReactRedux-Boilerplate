using System.Threading.Tasks;
using Api.Controllers.Resources;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using Microsoft.Extensions.Options;
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
        private readonly AppSettings _appSettings;

        public UsuarioController(IUsuarioService userService, IMapper mapper, IOptions<AppSettings> appSettings)
        {
            _userService = userService;
            _mapper = mapper;
            _appSettings = appSettings.Value;
        }

        //[AllowAnonymous]
        //[HttpPost("authenticate")]
        //public IActionResult Authenticate([FromBody] AuthenticateModel model)
        //{
        //    var user = _userService.Authenticate(model.Username, model.Password);

        //    if (user == null)
        //        return BadRequest(new { message = "Username or password is incorrect" });

        //    var tokenHandler = new JwtSecurityTokenHandler();
        //    var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
        //    var tokenDescriptor = new SecurityTokenDescriptor
        //    {
        //        Subject = new ClaimsIdentity(new Claim[]
        //        {
        //            new Claim(ClaimTypes.Name, user.Id.ToString())
        //        }),
        //        Expires = DateTime.UtcNow.AddDays(7),
        //        SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        //    };
        //    var token = tokenHandler.CreateToken(tokenDescriptor);
        //    var tokenString = tokenHandler.WriteToken(token);

        //    // return basic user info and authentication token
        //    return Ok(new
        //    {
        //        Id = user.Id,
        //        Username = user.Username,
        //        FirstName = user.FirstName,
        //        LastName = user.LastName,
        //        Token = tokenString
        //    });
        //}

        [AllowAnonymous]
        [HttpPost("registrar")]
        public async Task<IActionResult> PostAsync([FromBody] RegistroResource resource)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState.GetErrorMessages());

            var usuario = _mapper.Map<RegistroResource, Usuario>(resource);
            var result = await _userService.AddAsync(usuario, resource.Password);

            if (!result.Success)
                return BadRequest(result.Message);

            var usuarioResource = _mapper.Map<Usuario, RegistroResource>(result.Usuario);
            return Ok(usuarioResource);
        }

        //[HttpGet]
        //public IActionResult GetAll()
        //{
        //    var users = _userService.GetAll();
        //    var model = _mapper.Map<IList<UserModel>>(users);
        //    return Ok(model);
        //}

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
