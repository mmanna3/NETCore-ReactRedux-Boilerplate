namespace Api.Controllers.DTOs.Habitacion
{
    public class CamaDTO
    {
        public int Id { get; set; }

        [YKNStringLength(Maximo = 10)]
        public string Nombre { get; set; }

        public string Tipo { get; set; }
    }
}
