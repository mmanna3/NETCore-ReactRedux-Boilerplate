using System.ComponentModel.DataAnnotations;

namespace Api.Controllers.Resources
{
    public class SaveCategoryResource
    {
        [Required]
        [MaxLength(30)]
        public string Name { get; set; }
    }
}
