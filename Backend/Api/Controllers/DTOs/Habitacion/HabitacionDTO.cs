using System;
using System.Collections.Generic;
using System.Linq;

namespace Api.Controllers.DTOs.Habitacion
{
    public class HabitacionDTO
    {
        public int Id { get; set; }

        [YKNRequired, YKNStringLength(Maximo = 30)]
        public string Nombre { get; set; }

        public List<CamaIndividualDTO> CamasIndividuales { get; set; }

        public List<CamaMarineraDTO> CamasMarineras { get; set; }

        public List<CamaMatrimonialDTO> CamasMatrimoniales { get; set; }

        public bool HayCamasSinNombre()
        {
            return CamasIndividuales != null && CamasIndividuales.Exists(x => string.IsNullOrEmpty(x.Nombre)) ||
                   CamasMatrimoniales != null && CamasMatrimoniales.Exists(x => string.IsNullOrEmpty(x.Nombre)) ||
                   CamasMarineras != null && CamasMarineras.Exists(x => string.IsNullOrEmpty(x.NombreArriba) || string.IsNullOrEmpty(x.NombreAbajo))
                ;
        }

        public bool HayCamasConIdentificadorRepetido()
        {
            var nombres = new List<string>();

            if (CamasMatrimoniales != null)
                nombres.AddRange(CamasMatrimoniales?.Select(x => x.Nombre));

            if (CamasMarineras != null)
            {
                nombres.AddRange(CamasMarineras.Select(x => x.NombreAbajo));
                nombres.AddRange(CamasMarineras.Select(x => x.NombreArriba));
            }
                
            if (CamasIndividuales != null)
                nombres.AddRange(CamasIndividuales.Select(x => x.Nombre));

            return nombres.GroupBy(x => x).Any(g => g.Count() > 1);
        }
    }
}
