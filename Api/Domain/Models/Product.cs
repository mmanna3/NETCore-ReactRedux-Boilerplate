using System.ComponentModel.DataAnnotations;

namespace Api.Domain.Models
{
    public class Product
    {
        public int Id { get; set; }
        
        [Required, MaxLength(50)]
        public string Name { get; set; }
        
        [Required]
        public short QuantityInPackage { get; set; }

        [Required]
        public EUnitOfMeasurement UnitOfMeasurement { get; set; }

        public int CategoryId { get; set; }
        public Category Category { get; set; }
    }
}
