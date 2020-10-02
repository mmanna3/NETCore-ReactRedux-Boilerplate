using System.Collections.Generic;
using Api.Controllers.DTOs.Habitacion;

namespace Api.Controllers.DTOs
{
    public class ReservaParaConsultaMensualDTO
    {
        public int DiaInicio { get; set; }
        public int DiaFin { get; set; }
        public string ANombreDe { get; set; }
        public List<CamaDTO> Camas { get; set; }
    }
}
