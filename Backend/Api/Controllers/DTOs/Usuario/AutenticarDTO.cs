using System.ComponentModel;

namespace Api.Controllers.DTOs.Usuario
{
    public class AutenticarDTO
    {
        [YKNRequired]
        [DisplayName("Usuario")]
        public string Username { get; set; }

        [YKNRequired]
        [DisplayName("Contraseña")]
        public string Password { get; set; }
    }
}