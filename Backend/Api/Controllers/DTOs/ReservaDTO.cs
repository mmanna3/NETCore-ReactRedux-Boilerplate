using System.Collections.Generic;
using System.ComponentModel;
using Api.Controllers.DTOs.Habitacion;

namespace Api.Controllers.DTOs
{
    public class ReservaDTO
    {
        public int Id { get; set; }

        [YKNRequired, YKNStringLength(Maximo = 30)]
        [DisplayName("Huésped")]
        public string ANombreDe { get; set; }
        public string Desde { get; set; }
        public string Hasta { get; set; }
        public List<int?> CamasIds { get; set; }
    }
}
