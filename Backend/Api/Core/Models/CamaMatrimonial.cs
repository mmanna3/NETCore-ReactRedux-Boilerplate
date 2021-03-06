﻿using System.ComponentModel.DataAnnotations.Schema;

namespace Api.Core.Models
{
    public class CamaMatrimonial : Cama
    {
        [Column("Matrimonial_HabitacionId")]
        public int HabitacionId { get; set; }
        public Habitacion Habitacion { get; set; }
        protected override int Plazas()
        {
            return 2;
        }
        public override string Tipo()
        {
            return "Matrimonial";
        }
    }
}
