using System.ComponentModel.DataAnnotations;

namespace Api.Controllers.Resources.Usuario
{
    public class AutenticarDTO
    {
        [Required]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }
    }
}