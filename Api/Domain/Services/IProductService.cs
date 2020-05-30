using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Domain.Models;

namespace Api.Domain.Services
{
    public interface IProductService
    {
        Task<IEnumerable<Product>> ListAsync();
    }
}
