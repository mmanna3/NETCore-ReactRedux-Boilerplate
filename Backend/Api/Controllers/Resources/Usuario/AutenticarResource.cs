using System.ComponentModel.DataAnnotations;

namespace Api.Controllers.Resources.Usuario
{
    public class AutenticarResource
    {
        [Required]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }
    }
}