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
        
        //Primera noche
        public DateTime Desde { get; set; }

        //Última noche (puede ser igual a la primera) ¿vas a hacer refactor de nombre?
        public DateTime Hasta { get; set; }

        public bool EstaReservado(DateTime dia)
        {
            return dia >= Desde && dia <= Hasta;
        }
    }
}
