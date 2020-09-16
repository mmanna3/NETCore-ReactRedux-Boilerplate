namespace Api.Controllers.DTOs.Habitacion
{
    public class CamaDTO
    {
        public int Id { get; set; }

        [YKNStringLength(Maximo = 30)]
        public string Nombre { get; set; }
    }
}
