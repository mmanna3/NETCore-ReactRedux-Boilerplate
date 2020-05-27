using System.Collections.Generic;
using System.Threading.Tasks;
using Hostelapp.Domain.Models;

namespace Hostelapp.Domain.Repositories
{
    public interface IProductRepository
    {
        Task<IEnumerable<Product>> ListAsync();
    }
}
