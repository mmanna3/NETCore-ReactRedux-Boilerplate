using System.Collections.Generic;

namespace Api.Controllers.DTOs
{
    public class HabitacionDTO
    {
        public int Id { get; set; }

        [YKNRequired, YKNStringLength(Maximo = 30)]
        public string Nombre { get; set; }

        public List<CamaIndividualDTO> CamasIndividuales { get; set; }

        public byte CamasMarineras { get; set; }
        
        public byte CamasMatrimoniales { get; set; }
    }
}
