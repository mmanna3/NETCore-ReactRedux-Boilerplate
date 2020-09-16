﻿using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Api.Core.Models
{
    public class Habitacion
    {
        public int Id { get; set; }

        [Required, MaxLength(30)]
        public string Nombre { get; set; }
    }
}
