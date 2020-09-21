using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace Api.Core.Models
{
    public class Habitacion : EntidadConId
    {
        [Required, MaxLength(30)]
        public string Nombre { get; set; }

        public ICollection<CamaIndividual> CamasIndividuales { get; set; }
        public ICollection<CamaMatrimonial> CamasMatrimoniales { get; set; }
        public ICollection<CamaCucheta> CamasCuchetas { get; set; }

        public int LugaresLibresEntre(DateTime desde, DateTime hasta)
        {
            return CamasIndividuales?.Sum(x => x.LugaresLibresEntre(desde, hasta)) ?? 0 +
                CamasMatrimoniales?.Sum(x => x.LugaresLibresEntre(desde, hasta)) ?? 0 +
                CamasCuchetas?.Sum(x =>
                    x.Abajo.LugaresLibresEntre(desde, hasta) + x.Arriba.LugaresLibresEntre(desde, hasta)) ?? 0;
        }
    }
}
