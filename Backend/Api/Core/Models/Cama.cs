using System.ComponentModel.DataAnnotations;

namespace Api.Core.Models
{
    public abstract class Cama
    {
        public int Id { get; set; }

        [Required, MaxLength(30)]
        public string Nombre { get; set; }
    }
}
