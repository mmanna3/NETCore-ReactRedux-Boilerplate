using System.Collections.Generic;

namespace Api.Controllers.DTOs.Habitacion
{
    public class HabitacionDTO
    {
        public int Id { get; set; }

        [YKNRequired, YKNStringLength(Maximo = 30)]
        public string Nombre { get; set; }

        public List<CamaDTO> CamasIndividuales { get; set; }

        public List<CamaCuchetaDTO> CamasCuchetas { get; set; }

        public List<CamaDTO> CamasMatrimoniales { get; set; }

        public int CantidadDeLugaresLibres { get; set; }
    }
}
