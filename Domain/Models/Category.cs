using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Hostelapp.Domain.Models
{
    public class Category
    {
        public int Id { get; set; }

        [Required, MaxLength(30)]
        public string Name { get; set; }

        public IList<Product> Products { get; set; }

        public Category()
        {
            Products = new List<Product>();
        }
    }
}
