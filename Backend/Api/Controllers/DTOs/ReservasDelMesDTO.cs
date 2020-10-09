using System.Collections.Generic;
using Api.Controllers.DTOs.Habitacion;

namespace Api.Controllers.DTOs
{
    public class ReservasDelMesDTO
    {
        public List<ReservaParaConsultaMensualDTO> Reservas { get; set; }
        public int DiasDelMes { get; set; }

        public class ReservaParaConsultaMensualDTO
        {
            public int DiaInicio { get; set; }
            public int DiaFin { get; set; }
            public string ANombreDe { get; set; }
            public List<int> CamasIds { get; set; }
        }
    }
}