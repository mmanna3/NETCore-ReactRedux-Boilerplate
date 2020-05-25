using System.Collections.Generic;
using System.Threading.Tasks;
using Hostelapp.Domain.Models;

namespace Hostelapp.Domain.Services
{
    public interface IProductService
    {
        Task<IEnumerable<Product>> ListAsync();
    }
}
