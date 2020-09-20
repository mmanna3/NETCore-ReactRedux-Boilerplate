using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Api.Core.Models
{
    public class Habitacion : EntidadConId
    {
        [Required, MaxLength(30)]
        public string Nombre { get; set; }

        public ICollection<CamaIndividual> CamasIndividuales { get; set; }
        public ICollection<CamaMatrimonial> CamasMatrimoniales { get; set; }
        public ICollection<CamaCucheta> CamasCuchetas { get; set; }
    }
}
