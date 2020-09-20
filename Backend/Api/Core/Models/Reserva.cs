using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Api.Core.Models
{
    public class Reserva : EntidadConId
    {
        [Required, MaxLength(30)]
        public string ANombreDe { get; set; }

        public ICollection<ReservaCama> ReservaCamas { get; set; }
        
        public DateTime Desde { get; set; }
        
        public DateTime Hasta { get; set; }
    }
}
