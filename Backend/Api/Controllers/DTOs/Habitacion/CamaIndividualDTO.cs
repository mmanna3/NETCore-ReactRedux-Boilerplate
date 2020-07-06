namespace Api.Controllers.DTOs.Habitacion
{
    public class CamaIndividualDTO
    {
        public int Id { get; set; }

        [YKNRequired, YKNStringLength(Maximo = 30)]
        public string Nombre { get; set; }
    }
}
