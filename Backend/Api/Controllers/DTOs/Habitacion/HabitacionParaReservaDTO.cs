using System.Collections.Generic;

namespace Api.Controllers.DTOs.Habitacion
{
    public class HabitacionParaReservaDTO
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public bool EsPrivada { get; set; }
        public List<CamaDTO> Camas { get; set; }
        public int CantidadDeLugaresLibres { get; set; }
    }
}
