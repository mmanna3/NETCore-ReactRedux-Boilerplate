using System.ComponentModel.DataAnnotations;

namespace Api.Controllers.DTOs
{
    public class HabitacionDTO
    {
        public int Id { get; set; }

        [Required, MaxLength(30)]
        public string Nombre { get; set; }
        
        public byte CamasIndividuales { get; set; }
        
        public byte CamasMarineras { get; set; }
        
        public byte CamasMatrimoniales { get; set; }
    }
}
