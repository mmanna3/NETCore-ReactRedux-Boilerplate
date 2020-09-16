namespace Api.Core.Models
{
    public class CamaCucheta
    {
        public int Id { get; set; }
        public CamaCuchetaDeAbajo Abajo { get; set; }
        public CamaCuchetaDeArriba Arriba { get; set; }
    }
}
