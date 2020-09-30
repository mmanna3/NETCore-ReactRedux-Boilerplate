namespace Api.Controllers.DTOs.Habitacion
{
    public class CamaCuchetaDTO
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public CamaDTO Abajo { get; set; }
        public CamaDTO Arriba { get; set; }
    }
}
