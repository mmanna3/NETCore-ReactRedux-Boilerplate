using System.ComponentModel.DataAnnotations;

namespace Hostelapp.Controllers.Resources
{
    public class SaveCategoryResource
    {
        [Required]
        [MaxLength(30)]
        public string Name { get; set; }
    }
}
