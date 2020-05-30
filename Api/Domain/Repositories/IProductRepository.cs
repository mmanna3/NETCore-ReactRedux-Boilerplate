using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Domain.Models;

namespace Api.Domain.Repositories
{
    public interface IProductRepository
    {
        Task<IEnumerable<Product>> ListAsync();
    }
}
